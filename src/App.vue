<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const goAbout = () => {
  router.push('/about');
};
const router = useRouter();
const { state, getters, commit, dispatch } = useStore();
const count = computed(() => state.count);
const doubleCount = computed(() => getters.doubleCount);
const increment = () => {
  commit('increment', 1);
};
const incrementAsync = () => {
  dispatch('incrementAsync', 1);
};
</script>

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
      <div @click="goAbout">goAbout</div>
    </div>
    <router-view />
    <div>count: {{ count }}</div>
    <div>doubleCount: {{ doubleCount }}</div>
    <el-button @click="increment">increment</el-button>
    <el-button @click="incrementAsync">incrementAsync</el-button>
  </div>
</template>

<style lang="less">
#app {
  margin-top: 60px;
  text-align: center;
  color: @primary-color;

  #nav {
    .flex-center();

    cursor: pointer;
  }
}
</style>
