<template>
  <div class="selected-tip" v-show="num > 0">
    <el-icon size="16px"><WarningFilled /></el-icon>
    <span class="label"
      >已选择<span class="num">{{ num }}</span
      >项</span
    >
    <el-button link type="primary" @click="handleClearSelection"
      >清空</el-button
    >
  </div>
</template>

<script>
import { WarningFilled } from '@element-plus/icons-vue'
export default {
  name: 'selectedPrompt',
  components: {
    WarningFilled
  },
  props: {
    num: {
      type: Number
    }
  },
  setup (props, context) {
    const handleClearSelection = () => {
      context.emit('clearSelection')
    }
    return {
      handleClearSelection
    }
  }
}
</script>

<style scoped lang="scss">
.selected-tip {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 18px;
  margin-bottom: 16px;
  background: #eaf2fd;
  border-radius: 8px 8px 8px 8px;
  border: 1px solid #297be8;
  font-size: 14px;
  .el-icon {
    margin-right: 8px;
    svg {
      color: #297be8;
    }
  }
  .label {
    margin-right: 24px;
    font-weight: 400;
    color: #333333;
    .num {
      color: #297be8;
    }
  }
}
</style>
