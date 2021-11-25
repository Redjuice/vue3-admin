<script setup>
import { defineProps } from 'vue';
import * as Icons from '@element-plus/icons';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  }
});

const icon = Icons[props.name];
</script>

<template>
  <el-icon :size="size" :color="color">
    <component :is="icon"></component>
  </el-icon>
</template>

<style lang="less" scoped></style>
