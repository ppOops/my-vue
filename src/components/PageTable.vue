<template>
  <div class="page-table">
    <el-table
      ref="tableRef"
      :data="tableData"
      style="width: 100%"
      scrollbar-always-on
      size="large"
      header-row-class-name="page-table-header"
      @selection-change="handleSelectionChange"
    >
      <slot></slot>
    </el-table>
    <el-pagination
      background
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    tableData: Array,
    currentPage: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 30, 40]
      }
    },
    pageSize: {
      type: Number,
      default () {
        return 10
      }
    },
    layout: {
      type: String,
      default () {
        return 'total, prev, pager, next, sizes'
      }
    },
    total: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  setup (props, context) {
    console.log(props)
    const tableRef = ref(null)
    const handleSizeChange = (val) => {
      context.emit('sizeChange', val)
    }
    const handleCurrentChange = (val) => {
      context.emit('pageChange', val)
    }

    const handleSelectionChange = (val) => {
      context.emit('selectionChange', val)
    }

    const clearSelection = () => {
      tableRef.value.clearSelection()
    }

    return {
      tableRef,
      handleSizeChange,
      handleCurrentChange,
      handleSelectionChange,
      clearSelection
    }
  }
}
</script>

<style scoped  lang="scss">
.page-table {
  .el-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
  .el-table__row {
    background: red;
    .link {
      background: red;
    }
  }
}
:deep {
  .caret-wrapper {
    height: 9px;
    width: auto;
  }
  .el-table .sort-caret {
    border-width: 3.5px;
  }
  .page-table-header {
    th {
      background-color: #f7f7f8 !important;
    }
  }
  .action-link {
    cursor: pointer;
    color: #297be8;
  }
}
</style>
