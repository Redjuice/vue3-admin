<script setup>
import { computed, getCurrentInstance } from 'vue';
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
const msg = '这是复制的内容';
const success = (value) => {
  console.log(value);
};

const {
  appContext: {
    config: {
      globalProperties: { $filters }
    }
  }
} = getCurrentInstance();

const formatDate = $filters.formatDate(1637749950);

console.log(formatDate);
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
    <el-button v-copy:[success]="msg">指令: 点击复制</el-button>
    <div>过滤器: {{ $filters.formatDate(1637749950) }}</div>
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
