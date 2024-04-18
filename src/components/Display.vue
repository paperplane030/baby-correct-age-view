<template>
  <div class="display column justify-center">
    <div class="text-h1 text-center text-weight-bolder">
      {{ pageStore.today.format('YYYY 年 M 月 DD 日') }}
    </div>
    <div class="detail column">
      <div class="detail-item row text-h2 text-weight-bold">
        <div class="text-center">出生第</div>
        <div class="text-center text-primary">
          &nbsp;{{ pageStore.result.fromBirth }}&nbsp;
        </div>
        天
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
        <div class="text-center">今日體重</div>
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
    <p class="bottom-right text-h3 text-weight-bold">5AI新生兒加護病房</p>
  </div>
</template>

<script setup lang="ts">
// vue 相關
// 元件 相關
// lib 相關
// store 相關
import { useMainStoreStore } from '@/stores/mainStore';
// data 相關

const pageStore = useMainStoreStore();
</script>

<style lang="scss" scoped>
.display {
  position: relative;
  height: 100vh;
  .detail {
    gap: 5rem;
    width: 1500px;
    margin: 5rem auto 0px;
  }
  .back-btn {
    position: fixed;
    bottom: 12px;
    left: 10px;
    font-size: 96px;
  }
  .bottom-right {
    position: fixed;
    bottom: 12px;
    right: 24px;
  }
}
</style>
