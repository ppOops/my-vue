<template>
  <div class="page-layout">
    <page-sidebar class="left" />
    <div class="right">
      <page-header class="header" />
      <div class="body">
        <div class="content">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageSidebar from '@/components/PageSidebar.vue'
import PageHeader from '@/components/PageHeader.vue'
export default {
  components: {
    PageSidebar,
    PageHeader
  }
}
</script>

<style scoped lang="scss">
.page-layout {
  height: 100%;
  display: flex;
  overflow: hidden;
  .left {
    flex-shrink: 0;
    width: 200px;
    height: 100%;
    background: #ffffff;
  }
  .right {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    .header {
      flex-shrink: 0;
      height: 48px;
      background: #101225;
    }
    .body {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      height: calc(100% - 48px);
      padding: 12px;
      overflow: auto;
      background: #EEEEEE;
      .content {
        flex-grow: 1;
        box-sizing: border-box;
        padding: 24px 16px;
        box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.05);
        background: #FFFFFF;
        border-radius: 4px;
      }
    }
  }
}
</style>
