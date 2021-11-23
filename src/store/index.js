import { createStore } from 'vuex';

export default createStore({
  // 单一状态树
  state: {
    count: 0
  },
  // getters 暴露出去计算属性
  getters: {
    doubleCount: (state) => state.count * 2
  },
  // mutations 同步方法
  mutations: {
    increment(state, value) {
      state.count += value;
    }
  },
  // actions 异步方法
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment', 1);
      }, 1000);
    }
  }
});
