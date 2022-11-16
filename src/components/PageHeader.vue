<template>
  <div class="wrapper">
    <div class="left">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(path, index) in paths" :key="index">{{
          path.title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <img alt="User icon" src="../assets/user.png" class="user-icon" />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userName}}
          <el-icon size="8px"><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="Plus" @click="logOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { reactive, watch, toRefs, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import { useStore } from 'vuex'

export default {
  components: { ArrowDown },
  setup () {
    const state = reactive({ paths: [] })
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    watch(
      route,
      (route) => {
        state.paths = route.matched.map((item) => ({
          title: item.meta.title || '',
          path: item.path || ''
        }))
      },
      { immediate: true }
    )

    const userName = computed(() => {
      return store.state.user_info.name
    })

    const logOut = () => {
      router.push('/login')
    }

    return {
      ...toRefs(state),
      logOut,
      userName
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  color: #fff;
  .left {
    :deep(.el-breadcrumb__inner) {
      color: #fff;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .user-icon {
      width: 32px;
      height: 32px;
      margin-right: 8px;
      border-radius: 50%;
    }
    .el-dropdown {
      cursor: pointer;
      color: #fff;
    }
  }
}
</style>
