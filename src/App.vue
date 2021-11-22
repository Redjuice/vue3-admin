<script setup></script>

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  margin-top: 60px;
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: @primary-color;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
