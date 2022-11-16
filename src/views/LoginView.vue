<template>
  <div class="wrapper">
    <div class="left">
      <div class="title">太平洋智能群呼运营系统</div>
      <div class="description">
        <div class="des_1">简洁、高效的智能群呼运营系统</div>
        <div class="des_2">为您提供全面的便捷服务</div>
      </div>
    </div>
    <div class="right">
      <div class="login-section">
        <div class="title">太平洋智能群呼运营系统</div>
        <div class="login-type">密码登录</div>
        <div class="login-form">
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="rules"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入账户"
                type="text"
                autocomplete="off"
                show-password
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                placeholder="请输入密码"
                type="password"
                autocomplete="off"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm" class="login-btn"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const router = useRouter()
    const loginFormRef = ref(null)
    const state = reactive({
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: 'true', message: '账户不能为空', trigger: 'blur' }
        ],
        password: [
          { required: 'true', message: '密码不能为空', trigger: 'blur' }
        ]
      }
    })

    const submitForm = () => {
      loginFormRef.value.validate((valid) => {
        console.log('login', state.loginForm)
        router.push('/')
      })
    }

    return {
      ...toRefs(state),
      loginFormRef,
      submitForm
    }
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
  height: 100%;
  display: flex;
  .left {
    width: 32%;
    padding: 27px 24px;
    background: #297be8;
    .title {
      font-size: 30px;
      font-weight: 600;
      color: #ffffff;
      line-height: 35px;
      text-align: left;
    }
    .description {
      margin-top: 142px;
      text-align: center;
      .des_1 {
        font-size: 22px;
        font-weight: 500;
        color: #ffffff;
        line-height: 30px;
      }
      .des_2 {
        font-size: 16px;
        font-weight: 400;
        color: #ffffff;
        line-height: 30px;
      }
    }
  }
  .right {
    width: 68%;
    .login-section {
      margin: 200px auto 0;
      width: 400px;
      text-align: left;
      .title {
        margin-bottom: 40px;
        font-size: 36px;
        font-weight: 600;
        color: #333333;
        line-height: 42px;
      }
      .login-type {
        position: relative;
        display: inline-block;
        margin-bottom: 24px;
        font-size: 28px;
        font-weight: 500;
        color: #333333;
        line-height: 33px;
        &::after {
          content: "";
          display: block;
          height: 5px;
          margin-top: 4px;
          background: #297be8;
          border-radius: 100px 100px 100px 100px;
          opacity: 1;
        }
      }
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
