<template>
  <div>
    <div class="search-section">
      <el-form
        ref="formRef"
        label-position="top"
        :inline="true"
        :model="searchForm"
      >
        <el-form-item label="业务员手机号" prop="phone">
          <el-input
            v-model="searchForm.phone"
            placeholder="请输入业务员手机号"
          />
        </el-form-item>
        <el-form-item label="人员名称" prop="neme">
          <el-input v-model="searchForm.neme" placeholder="请输入人员名称" />
        </el-form-item>
        <el-form-item label="被叫号码" prop="callNumber">
          <el-input
            v-model="searchForm.callNumber"
            placeholder="请输入被叫号码"
          />
        </el-form-item>
        <el-form-item label="呼叫时间" prop="callTime" class="date-time-picker">
          <el-date-picker
            v-model="searchForm.callTime"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="导入时间"
          prop="importTime"
          class="date-time-picker"
        >
          <el-date-picker
            v-model="searchForm.importTime"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="意向标签" prop="tag">
          <el-select
            v-model="searchForm.tag"
            multiple
            collapse-tags
            clearable
            placeholder="请选择意向标签"
          >
            <el-option
              v-for="item in [
                { value: 'Option1', label: 'Option1' },
                { value: 'Option2', label: 'Option2' },
              ]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="呼叫结果" prop="callResult">
          <el-select
            v-model="searchForm.callResult"
            placeholder="请选择呼叫结果"
            multiple
            collapse-tags
            clearable
          >
            <el-option
              v-for="item in [
                { value: 'Option1', label: 'Option1' },
                { value: 'Option2', label: 'Option2' },
              ]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <div class="action-section">
          <el-button @click="onSearch" type="primary" class="search-btn"
            >搜索</el-button
          >
          <el-button-group>
            <el-button @click="resetForm">重置</el-button>
            <el-button @click="download">下载</el-button>
            <el-button @click="exportAll">全部导出</el-button>
            <el-button @click="exprotSelections">批量导出</el-button>
          </el-button-group>
        </div>
      </el-form>
    </div>

    <selected-prompt
      :num="multSelection.length"
      @clearSelection="onClearSelection"
    ></selected-prompt>

    <div class="table-section">
      <page-table
        ref="tableRef"
        :tableData="listData"
        :total="total"
        @sizeChange="onSizeChange"
        @pageChange="onPageChange"
        @selectionChange="onSelectionChange"
      >
        <el-table-column fixed type="selection" width="48"></el-table-column>
        <el-table-column
          prop="phone"
          label="业务员手机号"
          min-width="124"
        ></el-table-column>
        <el-table-column prop="name" label="人员" min-width="100">
        </el-table-column>
        <el-table-column prop="account" label="账号" min-width="140">
        </el-table-column>
        <el-table-column prop="neme" label="地市" min-width="92">
        </el-table-column>
        <el-table-column
          prop="account"
          label="导入时间"
          min-width="180"
          sortable
        >
        </el-table-column>
        <el-table-column prop="account" label="被叫号码" min-width="124">
        </el-table-column>
        <el-table-column prop="account" label="呼叫次数" min-width="88">
        </el-table-column>
        <el-table-column
          prop="account"
          label="呼叫时间"
          min-width="180"
          sortable
        >
        </el-table-column>
        <el-table-column prop="result" label="呼叫结果" min-width="98">
          <template #default="scope">
            <el-tag :color="getResultBg(scope.row.result)" round>{{
              scope.row.result
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="意向标签" min-width="92">
        </el-table-column>
      </page-table>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted } from 'vue'
import PageTable from '@/components/PageTable.vue'
import SelectedPrompt from '@/components/SelectedPrompt.vue'
import dayjs from 'dayjs'

const mockTableData = [
  {
    id: 111,
    phone: '11111111',
    name: '张三',
    account: 'zhangsan',
    result: '已接通'
  },
  {
    id: 222,
    phone: '22222222',
    name: '李四',
    account: 'lisi',
    result: '未接通'
  },
  {
    id: 111,
    phone: '11111111',
    name: '张三',
    account: 'zhangsan',
    result: '已接通'
  },
  {
    id: 222,
    phone: '22222222',
    name: '李四',
    account: 'lisi',
    result: '未接通'
  },
  {
    id: 111,
    phone: '11111111',
    name: '张三',
    account: 'zhangsan',
    result: '已接通'
  },
  {
    id: 222,
    phone: '22222222',
    name: '李四',
    account: 'lisi',
    result: '未接通'
  },
  {
    id: 111,
    phone: '11111111',
    name: '张三',
    account: 'zhangsan',
    result: '已接通'
  },
  {
    id: 222,
    phone: '22222222',
    name: '李四',
    account: 'lisi',
    result: '未接通'
  },
  {
    id: 111,
    phone: '11111111',
    name: '张三',
    account: 'zhangsan',
    result: '未接通'
  },
  {
    id: 222,
    phone: '22222222',
    name: '李四',
    account: 'lisi',
    result: '未接通'
  },
  {
    id: 111,
    phone: '11111111',
    name: '张三',
    account: 'zhangsan',
    result: '未接通'
  },
  {
    id: 222,
    phone: '22222222',
    name: '李四',
    account: 'lisi',
    result: '其他状态'
  }
]

const resultColorMap = {
  已接通: '#CDF3E1',
  未接通: '#FAD9DA'
}

export default {
  components: { PageTable, SelectedPrompt },
  setup () {
    const tableRef = ref(null)
    const formRef = ref(null)
    const state = reactive({
      searchForm: {
        phone: '',
        neme: '',
        regin: '',
        callNumber: '',
        callTime: [dayjs().subtract(2, 'week'), dayjs()],
        importTime: [],
        tag: '',
        callResult: ''
      },
      listData: mockTableData,
      multSelection: [],
      total: 0,
      pageSize: 10,
      currentPage: 1
    })

    onMounted(() => {
      getData()
    })

    const getData = () => {
      const paging = {
        currentPage: state.currentPage,
        pageSize: state.pageSize
      }
      const params = Object.assign(state.searchForm, paging)
      console.log(params)
      state.listData = mockTableData
      state.total = 10
    }

    const onSizeChange = (val) => {
      console.log(val)
    }

    const onPageChange = (val) => {
      state.currentPage = val
    }

    const onSelectionChange = (val) => {
      console.log(val)
      state.multSelection = val
    }

    const getResultBg = (res) => {
      return resultColorMap[res]
    }

    const onSearch = () => {
      getData()
    }

    const resetForm = () => {
      formRef.value.resetFields()
      getData()
    }

    const download = () => {
      console.log('download')
    }

    const exportAll = () => {
      console.log('exportAll')
    }

    const exprotSelections = () => {
      console.log('exprotSelections')
    }

    const onClearSelection = () => {
      tableRef.value.clearSelection()
    }

    return {
      ...toRefs(state),
      tableRef,
      onSizeChange,
      onPageChange,
      onSelectionChange,
      getResultBg,
      onSearch,
      resetForm,
      download,
      exportAll,
      exprotSelections,
      formRef,
      onClearSelection
    }
  }
}
</script>

<style scoped lang="scss">
.search-section {
  max-width: 1000px;
  .el-form-item {
    margin: 0 16px 16px 0;
    &:not(.date-time-picker) {
      width: 220px;
      .el-select {
        width: 100%;
      }
    }
    &.date-time-picker {
      width: 456px;
      :deep(.el-date-editor) {
        width: 100%;
        .el-input__wrapper {
          width: calc(100% - 22px);
        }
      }
    }
  }
}
.action-section {
  margin-top: 30px;
  .search-btn {
    margin-right: 8px;
  }
}
.el-tag {
  border: none;
  color: #333333;
  font-size: 12px;
}
</style>
