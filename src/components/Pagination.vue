<template>
  <nav v-if="pagerEnd > 0">
    <ul class="pagination">
      <li @click.prevent="setPage(currentPage - 1)" class="page-item">
        <a class="page-link" href>Previous</a>
      </li>

      <li
        v-for="i in pagerEnd"
        :class="{ active: i + pagerAddAmount === currentPage }"
        :key="i"
        @click.prevent="setPage(i + pagerAddAmount)"
        class="page-item"
      >
        <a class="page-link" href>{{ i + pagerAddAmount }}</a>
      </li>

      <li @click.prevent="setPage(currentPage + 1)" class="page-item">
        <a class="page-link" href>Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import store from '../store';

export default {
  computed: {
    pagerEnd() { return store.getters.pagerEnd },
    pagerAddAmount() {
      return store.getters.pagerAddAmount
    },
    currentPage: {
      get() {
        return store.state.currentPage
      },
      set(val) {
        store.commit('setCurrentPage', val);
      }
    }
  },
  methods: {
    setPage(page) {
      // 設定目前頁數
      if (page < 1 || page > this.totalPageCount) {
        return;
      }
      this.currentPage = page;
    },
  },

}
</script>

<style>
</style>