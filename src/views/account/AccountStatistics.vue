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
        <el-form-item label="创建时间" prop="callTime" class="date-time-picker">
          <el-date-picker
            v-model="searchForm.callTime"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item label="角色" prop="tag">
          <el-select v-model="searchForm.tag" placeholder="请选择角色">
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

    <page-table
      ref="tableRef"
      :tableData="listData"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
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
      <el-table-column prop="name" label="地市" min-width="92">
      </el-table-column>
      <el-table-column prop="name" label="角色" min-width="80">
      </el-table-column>
      <el-table-column prop="account" label="创建时间" sortable min-width="180">
      </el-table-column>
      <el-table-column prop="name" label="创建人员" min-width="92">
      </el-table-column>
      <el-table-column
        prop="account"
        label="最近登录时间"
        sortable
        min-width="180"
      >
      </el-table-column>
      <el-table-column
        prop="template"
        label="话术模板"
        min-width="172"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="128">
        <template #default="scope">
          <el-link
            class="operate"
            @click="resetPassword(scope.row)"
            :disabled="operateDisabled(scope.row.account)"
            :underline="false"
            >重置密码</el-link
          >
          <el-link
            class="operate"
            @click="showDetail(scope.row)"
            :disabled="operateDisabled(scope.row.account)"
            :underline="false"
            >详情</el-link
          >
        </template>
      </el-table-column>
    </page-table>
    <reset-password ref="resetPasswordRef" />
    <account-detail ref="accountDetailRef" />
  </div>
</template>

<script>
import { reactive, toRefs, ref, computed, onMounted } from 'vue'
import PageTable from '@/components/PageTable.vue'
import ResetPassword from './components/ResetPassword.vue'
import AccountDetail from './components/AccountDetail.vue'
import { useStore } from 'vuex'
import * as _ from 'lodash'
import SelectedPrompt from '@/components/SelectedPrompt.vue'
import dayjs from 'dayjs'

const mockTableData = [
  {
    id: 111,
    phone: '11111111',
    name: '张三',
    account: 'admin',
    template: '太平洋保险'
  },
  {
    id: 222,
    phone: '22222222',
    name: '李四',
    account: 'lisi',
    template: '太平洋保险'
  },
  {
    id: 111,
    phone: '11111111',
    name: '张三',
    account: 'zhangsan',
    template: '太平洋保险'
  }
]
export default {
  components: {
    PageTable,
    ResetPassword,
    AccountDetail,
    SelectedPrompt
  },
  setup () {
    const tableRef = ref(null)
    const resetPasswordRef = ref(null)
    const accountDetailRef = ref(null)
    const formRef = ref(null)
    const store = useStore()
    const state = reactive({
      searchForm: {
        phone: '',
        name: '',
        regin: '',
        callNumber: '',
        callTime: [dayjs().subtract(2, 'week'), dayjs()],
        importTime: [],
        tag: '',
        callResult: ''
      },
      listData: [],
      multSelection: [],
      total: 0,
      pageSize: 10,
      currentPage: 1
    })

    const userId = computed(() => {
      return store.state.user_info.id
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

    const operateDisabled = (id) => {
      return userId.value === id
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

    const resetPassword = (val) => {
      resetPasswordRef.value.open(val)
    }

    const showDetail = (val) => {
      accountDetailRef.value.open(val)
    }

    const onSearch = () => {
      console.log('onSearch')
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
      onSizeChange,
      onPageChange,
      onSelectionChange,
      resetPassword,
      showDetail,
      resetPasswordRef,
      accountDetailRef,
      operateDisabled,
      onSearch,
      resetForm,
      exportAll,
      exprotSelections,
      formRef,
      getData,
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
.operate {
  &:not(.is-disabled) {
    cursor: pointer;
    color: #297be8;
  }
  &:not(:last-child) {
    margin-right: 12px;
  }
}
.action-section {
  margin-top: 30px;
  .search-btn {
    margin-right: 8px;
  }
}
</style>
