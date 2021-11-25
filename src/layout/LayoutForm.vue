<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import Icon from '@/components/Icon/index.vue';
defineProps({
  title: {
    type: String,
    default: ''
  },
  contentName: {
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
  <div class="main-layout">
    <div class="title">
      <template v-if="back">
        <icon name="ArrowLeftBold" />
        <span class="back" @click="goBack">返回</span>
      </template>
      <span v-if="!!title">{{ title }}</span>
    </div>
    <div class="container">
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
.main-layout {
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

    .footer {
      padding-top: 20px;
    }
  }
}
</style>
