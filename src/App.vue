<template>
  <el-config-provider :locale="locale">
    <div class="container">
      <router-view />
    </div>
  </el-config-provider>
</template>
<script>
// 国际化 中文
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default {
  setup () {
    const locale = zhCn
    return {
      locale
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.container {
  height: 100vh;
}
</style>
