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
        <el-form-item label="地市" prop="regin">
          <el-input v-model="searchForm.regin" placeholder="请输入地市" />
        </el-form-item>
        <el-form-item label="外呼手机号" prop="regin">
          <el-input v-model="searchForm.regin" placeholder="请输入外呼手机号" />
        </el-form-item>
        <el-form-item label="账号" prop="callNumber">
          <el-input v-model="searchForm.callNumber" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="意向标签" prop="tag">
          <el-select
            v-model="searchForm.tag"
            placeholder="请选择意向标签"
            multiple
            collapse-tags
            clearable
          >
            <el-option
              v-for="item in [
                { value: 'Option1', label: 'Option1' },
                { value: 'Option2', label: 'Option2' },
                { value: 'Option3', label: 'Option3' },
              ]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="外呼时间" prop="callTime" class="date-time-picker">
          <el-date-picker
            v-model="searchForm.callTime"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
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
        <el-form-item label="通话ID" prop="callNumber">
          <el-input
            v-model="searchForm.callNumber"
            placeholder="请输入通话ID"
          />
        </el-form-item>
        <el-form-item label="通话时长" prop="callDurationTime">
          <el-time-picker
            v-model="searchForm.callDurationTime"
            is-range
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item label="话术模板">
          <el-select placeholder="请选择话术模板">
            <el-option
              v-for="item in [{ value: 'all', label: '全部' }]"
              :key="item.value"
              :label="item.label"
              :value="all"
            />
          </el-select>
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
      <el-table-column prop="account" label="外呼手机号" min-width="124">
      </el-table-column>
      <el-table-column prop="account" label="外呼时间" sortable min-width="180">
      </el-table-column>
      <el-table-column prop="account" label="意向标签" min-width="100">
      </el-table-column>
      <el-table-column prop="account" label="录音文件" min-width="300">
        <template #default="scope">
          <audio
            :ref="
              (el) => {
                audiosRef[scope.row.id] = el;
              }
            "
            @play="onPlay(scope.row.id)"
            controls
            class="audio"
          >
            <source :src="scope.row.srcFile" />
            您的浏览器不支持 audio 元素。
          </audio>
        </template>
      </el-table-column>
      <el-table-column prop="account" label="通话时长" min-width="100">
      </el-table-column>
      <el-table-column prop="account" label="通话ID" min-width="128">
      </el-table-column>
      <el-table-column
        prop="template"
        label="话术模板"
        min-width="172"
        show-overflow-tooltip
      >
      </el-table-column>
    </page-table>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from 'vue'
import PageTable from '@/components/PageTable.vue'
import * as _ from 'lodash'
import SelectedPrompt from '@/components/SelectedPrompt.vue'
import dayjs from 'dayjs'

const mockTableData = [
  {
    id: 111,
    phone: '11111111',
    name: '张三',
    account: 'zhangsan',
    srcFile: 'https://wdd.js.org/element-audio/static/falling-star.mp3',
    template: '太平洋保险'
  },
  {
    id: 222,
    phone: '22222222',
    name: '李四',
    account: 'lisi',
    srcFile: 'http://music.163.com/song/media/outer/url?id=447925558.mp3',
    template: '太平洋保险'
  },
  {
    id: 333,
    phone: '11111111',
    name: '张三',
    account: 'zhangsan',
    srcFile: 'http://music.163.com/song/media/outer/url?id=447925558.mp3',
    template: '太平洋保险'
  }
]
export default {
  components: {
    PageTable,
    SelectedPrompt
  },
  setup () {
    const tableRef = ref(null)
    const formRef = ref(null)
    const audiosRef = ref({})
    const state = reactive({
      searchForm: {
        phone: '',
        neme: '',
        regin: '',
        callNumber: '',
        callTime: [dayjs().subtract(2, 'week'), dayjs()],
        callDurationTime: [],
        tag: '',
        callResult: ''
      },
      listData: [],
      multSelection: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      currentPlayIndex: 0
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

    const onPlay = (curIndex) => {
      pauseOtherAudios(curIndex)
    }

    const pauseOtherAudios = (excludeId) => {
      state.listData.forEach((item) => {
        if (item.id !== excludeId) {
          audiosRef.value[item.id].pause()
        }
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
      onSizeChange,
      onPageChange,
      onSelectionChange,
      onPlay,
      pauseOtherAudios,
      onSearch,
      resetForm,
      exportAll,
      exprotSelections,
      formRef,
      audiosRef,
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
.audio {
  position: relative;
  top: 4px;
  width: 260px;
  height: 30px;
}
</style>
