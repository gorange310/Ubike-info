<template>
  <div>
    <h1>YouBike 臺北市公共自行車即時資訊</h1>

    <!-- 搜尋框 -->
    <search></search>

    <!-- 表格 -->
    <ubike-table></ubike-table>

    <!-- 頁籤 -->
    <pagination></pagination>
  </div>
</template>

<script>
import store from './store';

import Pagination from './components/Pagination.vue';
import Search from './components/Search.vue';
import UbikeTable from './components/UbikeTable.vue';

export default {
  components: {
    Search,
    UbikeTable,
    Pagination
  },
  created() {
    store.dispatch('fetchUbike');
  }
}
</script>

