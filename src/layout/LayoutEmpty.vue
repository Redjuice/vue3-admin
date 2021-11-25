<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  // 缺省文案
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  /**
   * 缺省类别
   * list: 列表
   * 404: 404
   */
  emptyType: {
    type: String,
    default: 'list'
  }
});
const emptys = ['list', '404'];
// @ts-ignore
const img = import.meta.globEager('../assets/empty/*')[
  `../assets/empty/empty-${props.emptyType}.png`
];
</script>

<template>
  <div class="layout-empty">
    <template v-for="item in emptys" :key="item">
      <img
        v-if="emptyType === item"
        class="layout-empty-img"
        :src="img.default"
      />
    </template>
    <slot>
      <div class="layout-empty-text">{{ emptyText }}</div>
    </slot>
  </div>
</template>

<style lang="less" scoped>
.layout-empty {
  .flex-column-center();

  width: 100%;
  height: 100%;

  &-img {
    width: 230px;
    height: 200px;
  }

  &-text {
    font-size: 14px;
    color: #292a32;
  }
}
</style>
