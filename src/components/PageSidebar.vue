<template>
  <div class="wrapper">
    <div class="logo">太平洋智能群呼运营系统</div>
    <div class="menu">
      <el-menu :default-active="activeMenu" router>
        <el-sub-menu index="1">
          <template #title>
            <!-- <el-icon><location /></el-icon> -->
            <span>数据查询</span>
          </template>
          <el-menu-item index="/login">LoginPage</el-menu-item>
          <el-menu-item index="/data/call-summary">外呼记录汇总</el-menu-item>
          <el-menu-item index="/data/call-statistics"
            >人员外呼统计</el-menu-item
          >
          <el-menu-item index="/data/call-detail">外呼记录详情</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <!-- <el-icon><location /></el-icon> -->
            <span>账号管理</span>
          </template>
          <el-menu-item index="/account/account-statistics"
            >账号统计</el-menu-item
          >
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { useRoute } from 'vue-router'
export default {
  setup () {
    const route = useRoute()
    const state = reactive({})

    const activeMenu = computed(() => route.path)

    return {
      ...toRefs(state),
      activeMenu
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  .logo {
    height: 48px;
    line-height: 48px;
    background: #297be8;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
  }

  .el-sub-menu .el-menu-item {
    position: relative;
    height: 44px;
    line-height: 44px;
    &.is-active::after {
      content: "";
      position: absolute;
      left: 8px;
      width: 4px;
      height: 100%;
      background: #297be8;
      border-radius: 2px 2px 2px 2px;
    }
  }
}
</style>
