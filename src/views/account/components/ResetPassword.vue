<template>
  <div>
    <el-dialog
      v-model="visible"
      title="重置密码"
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
          <el-input v-model="ruleForm.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="话术模板">
          <el-input v-model="ruleForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
            placeholder="请输入新密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="二次确认新密码" prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
            placeholder="请再次输入相同密码"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm">修改</el-button>
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
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (state.ruleForm.checkPass !== '') {
          if (!formRef.value) return
          formRef.value.validateField('checkPass', () => null)
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== state.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    const state = reactive({
      visible: false,
      ruleForm: {
        id: '',
        name: '',
        account: '',
        phone: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
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
      formRef.value.resetFields()
      state.visible = false
    }

    const submitForm = () => {
      close()
    }

    return {
      ...toRefs(state),
      open,
      close,
      formRef,
      submitForm
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
