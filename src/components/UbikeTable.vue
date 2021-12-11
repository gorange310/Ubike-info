<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th @click="setSort('sno')">
          #
          <span v-show="currentSort === 'sno'">
            <i class="fa" :class="isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc'" aria-hidden="true"></i>
          </span>
        </th>
        <th>場站名稱</th>
        <th>場站區域</th>
        <th @click="setSort('sbi')" class="pointer">
          目前可用車輛
          <span v-show="currentSort === 'sbi'">
            <i class="fa" :class="isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc'" aria-hidden="true"></i>
          </span>
        </th>
        <th @click="setSort('tot')" class="pointer">
          總停車格
          <span v-show="currentSort === 'tot'">
            <i class="fa" :class="isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc'" aria-hidden="true"></i>
          </span>
        </th>
        <th>資料更新時間</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="s in slicedUbikeStops" :key="s.sno">
        <td>{{ s.sno }}</td>
        <td>{{ s.sna }}</td>
        <td>{{ s.sarea }}</td>
        <td>{{ s.sbi }}</td>
        <td>{{ s.tot }}</td>
        <td>{{ timeFormat(s.mday) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import store from '../store';

export default {
  computed: {
    ubikeStops() {
      return store.state.ubikeStops;
    },
    isSortDesc: {
      get() { return store.state.isSortDesc; },
      set(val) {
        store.commit('setIsSortDesc', val);
      }
    },
    currentSort: {
      get() { return store.state.currentSort; },
      set(val) {
        store.commit('setCurrentSort', val);
      }
    },
    slicedUbikeStops() {
      return store.getters.slicedUbikeStops;
    },
    sortedUbikeStops() {
      return store.getters.sortedUbikeStops;
    }
  },
  methods: {
    timeFormat(val) {
      // 時間格式
      const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
      return val.replace(pattern, "$1/$2/$3 $4:$5:$6");
    },
    setSort(sortType) {
      // 切換排序
      if (sortType === this.currentSort) {
        this.isSortDesc = !this.isSortDesc;
      } else {
        this.currentSort = sortType;
        this.isSortDesc = false;
      }
    }
  },
  watch: {
    sortedUbikeStops() {
      // 當搜尋條件、排序變更時，強制切到第一頁
      // this.setPage(1);
      store.commit('setCurrentPage', 1);
    }
  },
}
</script>

<style>
</style>