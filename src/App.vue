<script setup>
import zh from 'element-plus/lib/locale/lang/zh-cn';
// import Other from './views/Other.vue';
import List from './views/List.vue';
import LayoutForm from './views/Form.vue';

const locale = zh;
</script>

<template>
  <el-config-provider :locale="locale">
    <div id="app">
      <!-- 其他 -->
      <!-- <other /> -->
      <!-- layout-list -->
      <list />
      <!-- layout-form -->
      <layout-form />
    </div>
  </el-config-provider>
</template>

<style lang="less" scoped>
#app {
  margin-top: 60px;

  #nav {
    cursor: pointer;
  }
}
</style>
