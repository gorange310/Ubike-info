<template>
  <p>
    站點名稱搜尋:
    <input type="text" v-model="searchText" />
  </p>
</template>

<script>
import store from '../store.js'
import { computed } from 'vue';

export default {
  setup() {
    const searchText = computed({
      get: () => store.state.searchText,
      set: val => store.commit('setSearchText', val)
    });

    return {
      searchText
    }
  }
}
</script>

<style>
</style>