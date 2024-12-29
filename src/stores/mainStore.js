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
    // 出生體重
    birthWeight: '',
    // 前次體重
    prevWeight: '',
    // 本日體重
    todayWeight: '',
    // 是否當日測量
    isNotTodayMeasure: false,
    // 非當日測量日期
    measureDate: '',
    // 餵食量
    feedCount: '',
    // 每小時餵食量
    feedPerHour: '',
    // 主護理師
    nurse: '',
    // 床號
    bed: '',
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
      '蘇易秀',
      '林芯瑜',
      '陳予婷',
    ],
    // 是否顯示修改護理師選項彈窗
    isShowNurseDialog: false,
    // 是否輸出結果
    isShowResult: false,
    // 是否顯示矯正年齡
    isShowFromBirth: true,
    // data 從 cookie 紀錄的資料
    data: Cookies.get('data') || {},
    // 是否顯示確認清除視窗
    isShowClearDialog: false,
    // 時鐘
    clock: moment(),
    // 是否顯示手術日期
    isShowSurgeryDate: false,
    // 手術日期
    surgeryDate: '',
    // 術後第幾天
    fromSurgery: null,
  }),
  getters: {
    weightDiff(state) {
      return state.todayWeight - state.prevWeight;
    },
    bedOptions() {
      // 1~18，除去4、13、14
      return Array.from({ length: 18 }, (_, i) => i + 1).filter(
        (n) => ![4, 13, 14].includes(n)
      );
    },
  },
  actions: {
    init() {
      this.data = Cookies.get('data') || {};
      // 如果 data 有值，則將 data 資料填入 state
      if (Object.keys(this.data).length !== 0) {
        this.form.date = this.data.date || '';
        this.form.week = this.data.week || 0;
        this.form.days = this.data.days || 0;
        this.bed = this.data.bed || '';
        this.prevWeight = this.data.prevWeight || '';
        this.todayWeight = this.data.todayWeight || '';
        this.nurse = this.data.nurse || '';
        this.feedCount = this.data.feedCount || '';
        this.feedPerHour = this.data.feedPerHour || '';
        this.isNotTodayMeasure = this.data.isNotTodayMeasure || false;
        this.measureDate = this.data.measureDate || '';
        this.isShowSurgeryDate = this.data.isShowSurgeryDate || false;
        this.surgeryDate = this.data.surgeryDate || '';
        this.birthWeight = this.data.birthWeight || '';
      }
    },
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
      const today = moment();
      // 結果 1
      this.result.fromBirth = today.diff(moment(this.form.date), 'days') + 1;
      this.fromSurgery = today.diff(moment(this.surgeryDate), 'days');
      // 今天跟足月日期的關係
      const base = this.form.week * 7 + this.form.days;
      const fullMonthDays = 280 - base;
      const fullMonthDate = moment(this.form.date).add(fullMonthDays, 'days');
      this.result.fullMonthDate = moment(fullMonthDate).format('YYYY-MM-DD');
      this.result.isFullMonth = today.isAfter(fullMonthDate);
      // 結果 2 - 未足月
      const fixAge = base + this.result.fromBirth - 1;
      this.result.week = Math.floor(fixAge / 7);
      this.result.days = fixAge - this.result.week * 7;
      // 結果 2 - 足月
      // 計算兩者差異年數
      const years = today.diff(fullMonthDate, 'years');
      // 計算兩者差異月數，這邊要扣掉上面計算的差異年，否則會得到12個月
      const months = today.diff(fullMonthDate, 'months') - years * 12;
      // 把差異的年、月數加回來，否則會變成計算起訖日相差的天數(365天)
      fullMonthDate.add(years, 'years').add(months, 'months');
      const days = today.diff(fullMonthDate, 'days') + 1;
      this.result.fullMonth_year = years;
      this.result.fullMonth_month = months;
      this.result.fullMonth_days = days;
      // show 下一頁
      this.isShowResult = true;
      // 紀錄Cookie date、bed、form.week、form.days、prevWeight、todayWeight、nurse、feedCount、feedPerHour
      Cookies.set('data', {
        date: this.form.date,
        bed: this.bed,
        week: this.form.week,
        days: this.form.days,
        prevWeight: this.prevWeight,
        todayWeight: this.todayWeight,
        nurse: this.nurse,
        feedCount: this.feedCount,
        feedPerHour: this.feedPerHour,
        isNotTodayMeasure: this.isNotTodayMeasure,
        measureDate: this.measureDate,
        isShowSurgeryDate: this.isShowSurgeryDate,
        surgeryDate: this.surgeryDate,
        birthWeight: this.birthWeight,
      });
    },
  },
});
