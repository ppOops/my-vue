<template>
  <div>
    <el-dialog
      v-model="visible"
      title="详情"
      width="480px"
      @close="handleClose"
    >
      <el-form
        ref="formRef"
        :model="ruleForm"
        :rules="rules"
        label-position="top"
        label-width="100px"
        class="good-form"
      >
        <el-form-item label="当前账号名称">
          <el-input v-model="ruleForm.account" disabled></el-input>
        </el-form-item>
        <el-form-item label="人员名称">
          <el-input v-model="ruleForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="人员号码">
          <el-input v-model="ruleForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="ruleForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="话术模板">
          <el-input v-model="ruleForm.name" disabled></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="close">确定</el-button>
          <el-button @click="close">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'

export default {
  setup () {
    const formRef = ref(null)
    const state = reactive({
      visible: false,
      ruleForm: {
        id: '',
        name: '',
        account: '',
        pass: '',
        checkPass: ''
      }
    })

    const open = (val) => {
      console.log(val)
      state.ruleForm.account = val.account || ''
      state.ruleForm.name = val.name || ''
      state.ruleForm.phone = val.phone || ''
      state.visible = true
    }

    const close = () => {
      state.visible = false
    }

    return {
      ...toRefs(state),
      open,
      close,
      formRef
    }
  }
}
</script>

<style scoped lang="scss">
:deep {
  .el-dialog__header {
    padding: 17px 20px;
  }
  .el-dialog__body {
    border-top: 1px solid #e4e4e4;
  }
}
</style>
