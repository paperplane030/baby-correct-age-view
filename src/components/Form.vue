<template>
  <div class="form">
    <div class="form-inner row justify-center items-center">
      <q-card class="form-card">
        <q-card-section class="text-center">
          <q-card-title class="text-h6">5AI新生兒加護病房</q-card-title>
        </q-card-section>
        <q-card-section>
          <q-form @submit="pageStore.next" class="q-gutter-md text-body1">
            <div class="form-item row items-center text-dark">
              <div class="col-auto">
                <div class="label q-mr-md">出生日期</div>
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  v-model="pageStore.form.date"
                  lazy-rules
                  :rules="[(val) => !!val || '必填']"
                  hide-bottom-space
                >
                  <template v-slot:append>
                    <q-icon name="calendar_month" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                        ref="qDate"
                      >
                        <q-date
                          class="text-dark"
                          today-btn
                          v-model="pageStore.form.date"
                          mask="YYYY/MM/DD"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            ></q-btn>
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="form-item row items-center text-dark">
              <div class="col-auto">
                <div class="label q-mr-md text-dark text-body1">出生週數</div>
              </div>
              <div class="row items-center">
                <div class="col col-md-auto">
                  <q-input
                    outlined
                    dense
                    type="number"
                    v-model.number="pageStore.form.week"
                    lazy-rules
                    :rules="[(val) => !!val || '必填']"
                    hide-bottom-space
                  >
                  </q-input>
                </div>
                <div class="col-auto q-mx-md">周</div>
                <div class="col">
                  <q-select
                    outlined
                    dense
                    v-model="pageStore.form.days"
                    :options="pageStore.options"
                    lazy-rules
                    hide-bottom-space
                  >
                  </q-select>
                </div>
                <div class="col-auto q-ml-md">天</div>
              </div>
            </div>
            <div class="form-item row items-center text-dark">
              <div class="col-auto">
                <div class="label q-mr-md text-dark text-body1">前次體重</div>
              </div>
              <div class="row items-center">
                <div class="col col-md-auto">
                  <q-input
                    outlined
                    dense
                    type="number"
                    v-model.number="pageStore.prevWeight"
                    lazy-rules
                    :rules="[(val) => !!val || '必填']"
                    hide-bottom-space
                  >
                  </q-input>
                </div>
                <div class="col-auto q-mx-md">克</div>
              </div>
            </div>
            <div class="form-item row items-center text-dark">
              <div class="col-auto">
                <div class="label q-mr-md text-dark text-body1">本日體重</div>
              </div>
              <div class="row items-center">
                <div class="col col-md-auto">
                  <q-input
                    outlined
                    dense
                    type="number"
                    v-model.number="pageStore.todayWeight"
                    lazy-rules
                    :rules="[(val) => !!val || '必填']"
                    hide-bottom-space
                  >
                  </q-input>
                </div>
                <div class="col-auto q-mx-md">克</div>
              </div>
            </div>
            <div class="form-item row items-center text-dark">
              <div class="col-auto">
                <div class="label q-mr-md text-dark text-body1">餵食量</div>
              </div>
              <div class="row items-center">
                <div class="col col-md-auto">
                  <q-input
                    outlined
                    dense
                    type="number"
                    v-model.number="pageStore.feedCount"
                    lazy-rules
                    :rules="[(val) => !!val || '必填']"
                    hide-bottom-space
                  >
                  </q-input>
                </div>
                <div class="col-auto q-mx-md">毫升</div>

                <div class="col-auto q-mx-md">每</div>
                <div class="col col-md-auto">
                  <q-input
                    outlined
                    dense
                    type="number"
                    v-model.number="pageStore.feedPerHour"
                    lazy-rules
                    :rules="[(val) => !!val || '必填']"
                    hide-bottom-space
                  >
                  </q-input>
                </div>
                <div class="col-auto q-mx-md">小時</div>
              </div>
            </div>
            <div class="form-item row items-center text-dark">
              <div class="col-auto">
                <div class="label q-mr-md text-dark text-body1">主護</div>
              </div>
              <div class="row items-center q-mr-md">
                <div class="col col-md-auto">
                  <q-input
                    outlined
                    dense
                    type="text"
                    v-model.number="pageStore.nurse"
                    lazy-rules
                    :rules="[(val) => !!val || '必填']"
                    hide-bottom-space
                  >
                  </q-input>
                </div>
              </div>
              <div class="col-auto">
                <q-btn
                  type="button"
                  no-caps
                  unelevated
                  label="編輯護理師"
                  color="accent"
                  @click="pageStore.isShowNurseDialog = true"
                />
              </div>
            </div>
            <div class="form-item row justify-between q-mt-lg">
              <q-btn
                class="text-body1 q-mr-xl"
                type="button"
                no-caps
                unelevated
                label="清空資料"
                color="negative"
                @click="pageStore.$reset()"
              />
              <q-btn
                class="text-body1"
                type="submit"
                no-caps
                unelevated
                label="顯示頁面"
                color="primary"
              />
              <q-btn
                class="text-body1"
                type="button"
                no-caps
                unelevated
                label="顯示頁面"
                color="primary"
                @click="pageStore.isShowResult = true"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
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
.form {
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  &-inner {
    height: 100vh;
  }
  &-card {
    width: 800px;
    .form-item {
      .label {
        min-width: 5em;
      }
    }
  }
}
</style>
