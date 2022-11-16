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
        <el-form-item label="人员名称" prop="name">
          <el-input v-model="searchForm.name" placeholder="请输入人员名称" />
        </el-form-item>
        <el-form-item label="地市" prop="regin">
          <el-input v-model="searchForm.regin" placeholder="请输入地市" />
        </el-form-item>
        <el-form-item label="外呼时间" prop="callTime" class="date-time-picker">
          <el-date-picker
            v-model="searchForm.callTime"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item label="账号名称" prop="callNumber">
          <el-input
            v-model="searchForm.callNumber"
            placeholder="请输入账号名称"
          />
        </el-form-item>
      </el-form>
    </div>

    <div class="action-section">
      <el-button @click="onSearch" type="primary" class="search-btn"
        >搜索</el-button
      >
      <el-button-group>
        <el-button @click="resetForm">重置</el-button>
        <el-button @click="exportAll">全部导出</el-button>
        <el-button @click="exprotSelections">批量导出</el-button>
      </el-button-group>
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
        <el-table-column prop="name" label="地市" sortable min-width="92">
        </el-table-column>
        <el-table-column
          prop="account"
          label="外呼总人数"
          sortable
          min-width="124"
        >
          <template #default="scope">
            <a @click="jumpToDetail(scope.row)" class="action-link">{{
              scope.row.account
            }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="接通人数"
          sortable
          min-width="112"
        >
          <template #default="scope">
            <a @click="jumpToDetail(scope.row)" class="action-link">{{
              scope.row.account
            }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="未接通人数"
          sortable
          min-width="124"
        >
          <template #default="scope">
            <a @click="jumpToDetail(scope.row)" class="action-link">{{
              scope.row.account
            }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="接通率"
          sortable
          min-width="112"
        ></el-table-column>
        <el-table-column
          prop="account"
          label="高意向人数"
          sortable
          min-width="124"
        >
          <template #default="scope">
            <a @click="jumpToDetail(scope.row)" class="action-link">{{
              scope.row.account
            }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="中意向人数"
          sortable
          min-width="124"
        >
          <template #default="scope">
            <a @click="jumpToDetail(scope.row)" class="action-link">{{
              scope.row.account
            }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="低意向人数"
          sortable
          min-width="124"
        >
          <template #default="scope">
            <a @click="jumpToDetail(scope.row)" class="action-link">{{
              scope.row.account
            }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="其他意向人数"
          sortable
          min-width="136"
        >
          <template #default="scope">
            <a @click="jumpToDetail(scope.row)" class="action-link">{{
              scope.row.account
            }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="总通话时长" min-width="124">
        </el-table-column>
      </page-table>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PageTable from '@/components/PageTable.vue'
import * as _ from 'lodash'
import SelectedPrompt from '@/components/SelectedPrompt.vue'
import dayjs from 'dayjs'

const mockTableData = [
  {
    id: 111,
    phone: '11111111',
    name: '张三',
    account: 'zhangsan'
  },
  {
    id: 222,
    phone: '22222222',
    name: '李四',
    account: 'lisi'
  },
  {
    id: 111,
    phone: '11111111',
    name: '张三',
    account: 'zhangsan'
  }
]

export default {
  components: {
    PageTable,
    SelectedPrompt
  },
  setup () {
    const tableRef = ref(null)
    const currentPage = ref(1)
    const pageSize = ref(100)
    const formRef = ref(null)
    const router = useRouter()

    const state = reactive({
      searchForm: {
        phone: '',
        name: '',
        regin: '',
        callNumber: '',
        callTime: [dayjs().subtract(2, 'week'), dayjs()],
        importTime: '',
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
      const params = _.assign(state.searchForm, paging)
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

    const jumpToDetail = (val) => {
      console.log(val)
      router.push({
        path: '/data/call-detail',
        query: { account: val.account }
      })
    }

    const onSearch = () => {
      getData()
    }

    const resetForm = () => {
      formRef.value.resetFields()
      getData()
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
      currentPage,
      pageSize,
      onSizeChange,
      onPageChange,
      onSelectionChange,
      jumpToDetail,
      onSearch,
      resetForm,
      exportAll,
      exprotSelections,
      formRef,
      tableRef,
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
  margin-bottom: 24px;
  .search-btn {
    margin-right: 8px;
  }
}
</style>
