import { createStore } from "vuex";

// 單頁顯示筆數
const COUNT_OF_PAGE = 10;
// 頁碼最大數量
const PAGINATION_MAX = 10;

export default createStore({
  state: {
    currentSort: "sno",
    isSortDesc: false,
    ubikeStops: [],
    searchText: "",
    currentPage: 1,
  },
  getters: {
    filtedUbikeStops(state) {
      // 過濾搜尋
      return state.ubikeStops.length === 0
        ? []
        : state.ubikeStops.filter((d) => d.sna.includes(state.searchText));
    },
    sortedUbikeStops(state, getters) {
      // 拿過濾的結果做排序
      const filtedStops = [...getters.filtedUbikeStops];

      return state.isSortDesc
        ? filtedStops.sort((a, b) => b[state.currentSort] - a[state.currentSort])
        : filtedStops.sort((a, b) => a[state.currentSort] - b[state.currentSort]);
    },
    slicedUbikeStops(state, getters) {
      // 將排序的結果做分頁切割
      const start = (state.currentPage - 1) * COUNT_OF_PAGE;
      const end =
        start + COUNT_OF_PAGE <= getters.sortedUbikeStops.length
          ? start + COUNT_OF_PAGE
          : getters.sortedUbikeStops.length;

      return getters.sortedUbikeStops.slice(start, end);
    },
    totalPageCount(state, getters) {
      // 計算總頁數
      return Math.ceil(getters.filtedUbikeStops.length / COUNT_OF_PAGE);
    },
    pagerEnd(state, getters) {
      // 頁碼尾端
      return getters.totalPageCount <= PAGINATION_MAX ? getters.totalPageCount : PAGINATION_MAX;
    },
    pagerAddAmount(state, getters) {
      // 頁碼位移
      const tmp =
        getters.totalPageCount <= PAGINATION_MAX ? 0 : state.currentPage + 4 - getters.pagerEnd;

      return tmp <= 0
        ? 0
        : getters.totalPageCount - (PAGINATION_MAX + tmp) < 0
        ? getters.totalPageCount - PAGINATION_MAX
        : tmp;
    },
  },
  actions: {
    fetchUbike(context) {
      // 欄位說明請參照:
      // http://data.taipei/opendata/datalist/datasetMeta?oid=8ef1626a-892a-4218-8344-f7ac46e1aa48

      // sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
      // sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
      // lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
      // snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態

      fetch("https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz")
        .then((res) => res.json())
        .then((res) => {
          // 將 json 轉陣列後存入 this.ubikeStops
          // this.ubikeStops = Object.keys(res.retVal).map(key => res.retVal[key]);
          context.commit(
            "setUbikeStops",
            Object.keys(res.retVal).map((key) => res.retVal[key])
          );
        });
    },
  },
  mutations: {
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
    setIsSortDesc(state, payload) {
      state.isSortDesc = payload;
    },
    setCurrentSort(state, payload) {
      state.currentSort = payload;
    },
    setUbikeStops(state, payload) {
      state.ubikeStops = payload;
    },
    setSearchText(state, payload) {
      state.searchText = payload;
    },
  },
});
