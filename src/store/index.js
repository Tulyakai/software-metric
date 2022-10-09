import { createStore } from "vuex";
export default createStore({
  state: {
    repos: {},
  },
  getters: {
    getRepos(state) {
      return state.repos;
    },
  },
  mutations: {
    setRepos(state, value) {
      state.repos = value;
    },
  },
  actions: {
    setRepos(context, value) {
      context.commit("setRepos", value);
    },
  },
});
