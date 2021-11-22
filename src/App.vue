<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goAbout = () => {
  router.push('/about');
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
