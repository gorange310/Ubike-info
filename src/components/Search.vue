<template>
  <p>
    站點名稱搜尋:
    <input type="text" v-model="searchText" />
  </p>
</template>

<script>
import store from '../store.js'

export default {
  computed: {
    searchText: {
      get() {
        return store.state.searchText;
      },
      set(val) {
        store.commit('setSearchText', val);
      }
    }
  }
}
</script>

<style>
</style>