<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import Icon from '@/components/Icon/index.vue';

defineProps({
  title: {
    type: String,
    default: ''
  },
  back: {
    type: Boolean,
    default: false
  }
});

const route = useRouter();
const goBack = () => {
  route.go(-1);
};
</script>

<template>
  <div class="layout-list">
    <div class="title">
      <template v-if="back">
        <icon name="ArrowLeftBold" />
        <span class="back" @click="goBack">返回</span>
      </template>
      <span v-if="!!title">{{ title }}</span>
      <div class="header-btns fr">
        <slot name="header"></slot>
      </div>
    </div>
    <div class="container">
      <div class="search">
        <slot name="search"></slot>
      </div>
      <div class="tabs">
        <slot name="tabs"></slot>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout-list {
  .title {
    padding-bottom: 20px;
    font-weight: 600;
    font-size: 20px;
    color: #33363c;

    .el-icon {
      vertical-align: middle;
    }

    .back {
      margin-right: 10px;
      cursor: pointer;
      font-size: 14px;
    }
  }

  .container {
    position: relative;
    padding: 30px;
    background-color: #ffffff;
    box-shadow: 0 1px 20px rgba(0, 0, 0, 0.1);
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
  }
}
</style>
