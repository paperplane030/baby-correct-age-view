import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Cookies, Notify } from 'quasar';
import moment from 'moment';

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
      isFullMonth: false,
      fromBirth: null,
      week: null,
      days: null,
      fullMonth_year: null,
      fullMonth_month: null,
      fullMonth_days: null,
      fullMonthDate: null,
    },
    // 今天
    today: moment(),
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
    nurseOptions: Cookies.get('nurse_options') || [],
    // 預設護理師選項
    defaultNurseOptions: [
      '陳香伶',
      '朱月碧',
      '魏秀芳',
      '柯美蓮',
      '王儷蓉',
      '潘珈玲',
      '鍾宜君',
      '張如華',
      '莊珮宜',
      '邱虹惠',
      '楊雅文',
      '李佳玲',
      '謝雨宸',
      '陳怡如',
      '康詩芳',
      '薛梅雲',
      '涂依萍',
      '劉筱涵',
      '馮靖雯',
      '呂宜臻',
      '塗奕婷',
      '孫瑜霙',
      '歐真妤',
      '林亞慧',
      '黃穎萍',
      '陳子涵',
      '林詠淇',
      '王玉婷',
      '賴莘妮',
    ],
    // 是否顯示修改護理師選項彈窗
    isShowNurseDialog: false,
    // 是否輸出結果
    isShowResult: false,
    // 是否顯示矯正年齡
    isShowFromBirth: true,
  }),
  getters: {
    weightDiff(state) {
      return state.todayWeight - state.prevWeight;
    },
  },
  actions: {
    addDefaultNurseOptions() {
      this.nurseOptions = [];
      this.nurseOptions = this.defaultNurseOptions;
      Cookies.set('nurse_options', this.nurseOptions);
    },
    addNurseOption(option) {
      if (!option) {
        Notify.create({
          message: '請輸入護理師姓名',
          color: 'negative',
          position: 'top',
          timeout: 3000,
        });
        return;
      }
      if (this.nurseOptions.includes(option)) {
        return;
      }
      this.nurseOptions.push(option);
      Cookies.set('nurse_options', this.nurseOptions);
    },
    deleteNurseOption(option) {
      this.nurseOptions = this.nurseOptions.filter((item) => item !== option);
      Cookies.set('nurse_options', this.nurseOptions);
      if (this.nurseOptions.length === 0) {
        this.nurse = '';
      }
    },
    selectNurse(option) {
      this.nurse = option;
      this.isShowNurseDialog = false;
    },
    updateWeight() {
      if (!this.todayWeight) {
        return;
      }
      this.prevWeight = this.todayWeight;
      this.todayWeight = '';
    },
    next() {
      if (!this.form.date) {
        Notify.create({
          message: '請輸入出生日期',
          color: 'negative',
          position: 'top',
          timeout: 3000,
        });
        return;
      }
      // 結果 1
      this.result.fromBirth =
        this.today.diff(moment(this.form.date), 'days') + 1;
      // 今天跟足月日期的關係
      const base = this.form.week * 7 + this.form.days;
      const fullMonthDays = 280 - base;
      const fullMonthDate = moment(this.form.date).add(fullMonthDays, 'days');
      this.result.fullMonthDate = moment(fullMonthDate).format('YYYY-MM-DD');
      this.result.isFullMonth = this.today.isAfter(fullMonthDate);
      // 結果 2 - 未足月
      const fixAge = base + this.result.fromBirth - 1;
      this.result.week = Math.floor(fixAge / 7);
      this.result.days = fixAge - this.result.week * 7;
      // 結果 2 - 足月
      // 計算兩者差異年數
      const years = this.today.diff(fullMonthDate, 'years');
      // 計算兩者差異月數，這邊要扣掉上面計算的差異年，否則會得到12個月
      const months = this.today.diff(fullMonthDate, 'months') - years * 12;
      // 把差異的年、月數加回來，否則會變成計算起訖日相差的天數(365天)
      fullMonthDate.add(years, 'years').add(months, 'months');
      const days = this.today.diff(fullMonthDate, 'days') + 1;
      this.result.fullMonth_year = years;
      this.result.fullMonth_month = months;
      this.result.fullMonth_days = days;
      // show 下一頁
      this.isShowResult = true;
    },
  },
});
