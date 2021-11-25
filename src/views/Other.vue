<script setup>
import { computed, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
// 路由
const goAbout = () => {
  router.push('/about');
};
const router = useRouter();
// vuex
const { state, getters, commit, dispatch } = useStore();
const count = computed(() => state.count);
const doubleCount = computed(() => getters.doubleCount);
const increment = () => {
  commit('increment', 1);
};
const incrementAsync = () => {
  dispatch('incrementAsync', 1);
};
// 指令
const msg = '这是复制的内容';
const success = (value) => {
  console.log(value);
};

// 过滤器
const {
  appContext: {
    config: {
      globalProperties: { $filters }
    }
  }
} = getCurrentInstance();

// console.log($filters.formatDate(1637749950));
</script>

<template>
  <router-view />
  <!-- 路由 -->
  <div id="nav">
    <router-link to="/home">Home</router-link>
    |
    <router-link to="/about">About</router-link>
    |
    <div @click="goAbout">goAbout</div>
  </div>
  <!-- vuex -->
  <div>count: {{ count }}</div>
  <div>doubleCount: {{ doubleCount }}</div>
  <el-button @click="increment">increment</el-button>
  <el-button @click="incrementAsync">incrementAsync</el-button>
  <!-- 指令 -->
  <el-button v-copy:[success]="msg">指令: 点击复制</el-button>
  <!-- 过滤 -->
  <div>过滤器: {{ $filters.formatDate(1637749950) }}</div>
</template>

<style lang="less" scoped></style>
