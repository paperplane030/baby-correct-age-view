import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useMainStoreStore = defineStore('mainStore', {
  state: () => ({
    // 出生日期
    form: {
      date: '',
      week: 0,
      days: 0,
    },
    // 天數選項
    options: [0, 1, 2, 3, 4, 5, 6],
    // 矯正年齡
    result: {
      isfullMonth: false,
      fromBirth: null,
      week: null,
      days: null,
      fullMonth_year: null,
      fullMonth_month: null,
      fullMonth_days: null,
      fullMonthDate: null,
    },
    // 前次體重
    prevWeight: '',
    // 本日體重
    todayWeight: '',
    // 餵食量
    feedCount: '',
    // 每小時餵食量
    feedPerHour: '',
    // 主護理師
    nurse: '',
    // 護理師選項
    nurseOptions: [],
    // 已選擇護理師選項
    selectedNurseOptions: [],
    // 是否顯示修改護理師選項彈窗
    isShowNurseDialog: false,
    // 是否輸出結果
    isShowResult: false,
  }),
  getters: {},
  actions: {},
});
