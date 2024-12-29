<template>
  <div class="display column justify-center">
    <p class="top-right text-h2 text-weight-bold">
      床號 :5A99- {{ pageStore.bed }}
    </p>
    <p class="top-right-sub text-h4 text-weight-bold">
      出生體重 : {{ pageStore.birthWeight }} 公克 <br />
      出生週數 : {{ pageStore.form.week }} 週
    </p>
    <div class="text-h1 text-center text-weight-bolder">
      {{ pageStore.clock?.format('YYYY 年 M 月 DD 日') }}
    </div>
    <div class="detail column">
      <div class="detail-item row text-h2 text-weight-bold">
        <div class="text-center">出生第</div>
        <div class="text-center text-primary">
          &nbsp;{{ pageStore.result.fromBirth }}&nbsp;
        </div>
        天
        <template v-if="pageStore.isShowSurgeryDate">
          <div class="text-center">，術後第</div>
          <div class="text-center text-primary">
            &nbsp;{{ pageStore.fromSurgery }}&nbsp;
          </div>
          天
        </template>
      </div>
      <div
        class="detail-item row text-h2 text-weight-bold"
        v-if="pageStore.isShowFromBirth"
      >
        <div class="text-center">矯正年齡</div>
        <template v-if="!pageStore.result.isFullMonth">
          <div class="text-center text-primary">
            &nbsp;{{ pageStore.result.week }}&nbsp;
          </div>
          週
          <div class="text-center text-primary">
            &nbsp;{{ pageStore.result.days }}&nbsp;
          </div>
          天
        </template>
        <template v-else>
          <div class="text-center text-primary">&nbsp;足月</div>
          <template v-if="pageStore.result.fullMonth_year">
            <div class="text-center text-primary">
              &nbsp;{{ pageStore.result.fullMonth_year }}&nbsp;
            </div>
            歲
          </template>
          <div class="text-center text-primary">
            &nbsp;{{ pageStore.result.fullMonth_month }}&nbsp;
          </div>
          月
          <div class="text-center text-primary">
            &nbsp;{{ pageStore.result.fullMonth_days }}&nbsp;
          </div>
          天
        </template>
      </div>
      <div class="detail-item row text-h2 text-weight-bold">
        <div class="text-center">
          {{
            pageStore.isNotTodayMeasure
              ? moment(pageStore.measureDate).format('MM/DD')
              : '今日'
          }}
          體重
        </div>
        <div class="text-center text-primary">
          &nbsp;{{ pageStore.todayWeight }}&nbsp;
        </div>
        公克 ({{ pageStore.weightDiff > 0 ? '上升' : '下降' }}
        <div class="text-center text-primary">
          &nbsp;{{ Math.abs(pageStore.weightDiff) }}&nbsp;
        </div>
        公克)
      </div>
      <div class="detail-item row text-h2 text-weight-bold">
        <div class="text-center">餵食量</div>
        <template v-if="pageStore.feedCount">
          <div class="text-center text-primary">
            &nbsp;{{ pageStore.feedCount }}&nbsp;
          </div>
          毫升 (每&nbsp;
          <div class="text-center text-primary">
            {{ pageStore.feedPerHour }}
          </div>
          &nbsp;小時)
        </template>
        <div class="text-center text-primary" v-else>&nbsp;禁食中</div>
      </div>
      <div class="detail-item row text-h2 text-weight-bold">
        <div class="text-center">護理師</div>
        &nbsp;
        <div class="text-center text-primary">{{ pageStore.nurse }}</div>
      </div>
    </div>

    <q-icon
      name="west"
      class="back-btn cursor-pointer"
      color="positive"
      @click="pageStore.isShowResult = false"
    />
    <div class="bottom-right text-h3 text-weight-bold text-center">
      <p class="text-h2 text-weight-bold">
        {{ pageStore.clock.format('HH:mm') }}
      </p>
      5AI新生兒加護病房
    </div>
  </div>
</template>

<script setup lang="ts">
// vue 相關
import { onUnmounted, ref } from 'vue';
// 元件 相關
// lib 相關
import moment from 'moment';
// store 相關
import { useMainStoreStore } from '@/stores/mainStore';
// data 相關

const pageStore = useMainStoreStore();
const clockStart = setInterval(() => {
  pageStore.clock = moment();
}, 1000);

onUnmounted(() => {
  clearInterval(clockStart);
});
</script>

<style lang="scss" scoped>
.display {
  position: relative;
  height: 100vh;
  .detail {
    gap: 5rem;
    width: 1500px;
    margin: 5rem auto 0px;
    background-color: rgba(255, 255, 255, 0.4);
  }
  .back-btn {
    position: fixed;
    bottom: 12px;
    left: 10px;
    font-size: 96px;
  }
  .top-right {
    position: fixed;
    top: 32px;
    left: 24px;
  }
  .top-right-sub {
    position: fixed;
    top: 128px;
    left: 24px;
  }
  .bottom-right {
    position: fixed;
    bottom: 24px;
    right: 24px;
    p {
      margin-bottom: 24px;
    }
  }
}
</style>
