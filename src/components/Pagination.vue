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
import { computed, ref } from 'vue';

export default {
  // methods: {

  // },
  setup() {
    const pagerEnd = computed(() => store.getters.pagerEnd);
    const pagerAddAmount = computed(() => store.getters.pagerAddAmount);
    const currentPage = computed({
      get: () => store.state.currentPage,
      set: val => store.commit('setCurrentPage', val)
    });
    const totalPageCount = computed(() => store.getters.totalPageCount);

    const setPage = (page) => {
      // 設定目前頁數
      if (page < 1 || page > totalPageCount.value) {
        return;
      }
      currentPage.value = page;
    };


    return {
      pagerEnd,
      pagerAddAmount,
      currentPage,
      setPage
    }
  }
}
</script>

<style>
</style>