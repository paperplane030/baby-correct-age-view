<template>
  <div class="form" v-if="!pageStore.isShowResult">
    <div class="form-inner row justify-center items-center">
      <q-card class="form-card">
        <q-card-section class="text-center">
          <div class="text-h5 text-weight-medium">5AI新生兒加護病房</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="pageStore.next" class="q-gutter-md text-h6">
            <div class="form-item row items-center text-dark">
              <div class="col-auto">
                <div class="label q-mr-md text-dark">床號</div>
              </div>
              <div class="q-mr-md">5A99-</div>
              <div class="row items-center">
                <div class="col col-md-auto">
                  <q-select
                    class="select"
                    outlined
                    dense
                    v-model="pageStore.bed"
                    :options="pageStore.bedOptions"
                    lazy-rules
                    hide-bottom-space
                  >
                  </q-select>
                </div>
              </div>
            </div>
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
                          v-model="pageStore.form.date"
                          mask="YYYY/MM/DD"
                          v-close-popup
                        >
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="form-item row items-center text-dark">
              <div class="col-auto">
                <div class="label q-mr-md text-dark">出生週數</div>
              </div>
              <div class="row items-center q-mr-md">
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
                    class="select"
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
              <q-checkbox
                class="checkbox"
                v-model="pageStore.isShowFromBirth"
                label="顯示矯正年齡"
              ></q-checkbox>
            </div>
            <div class="form-item row items-center text-dark">
              <div class="col-auto">
                <div class="label q-mr-md text-dark">前次體重</div>
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
                <div class="label q-mr-md text-dark">本日體重</div>
              </div>
              <div class="row items-center q-mb-md">
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
                <q-icon
                  class="arrow_upward cursor-pointer"
                  name="arrow_upward"
                  color="primary"
                  @click="pageStore.updateWeight"
                ></q-icon>
              </div>
              <div class="row items-center">
                <div class="label q-ml-md text-dark"></div>
                <q-checkbox
                  class="q-mr-md"
                  v-model="pageStore.isNotTodayMeasure"
                  @update:model-value="pageStore.measureDate = ''"
                  label="非當日測量，測量日"
                ></q-checkbox>
                <q-input
                  outlined
                  dense
                  v-model="pageStore.measureDate"
                  lazy-rules
                  hide-bottom-space
                  :disable="!pageStore.isNotTodayMeasure"
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
                          v-model="pageStore.measureDate"
                          mask="YYYY/MM/DD"
                          v-close-popup
                        >
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="form-item row items-center text-dark">
              <div class="col-auto">
                <div class="label q-mr-md text-dark">餵食量</div>
              </div>
              <div class="row items-center">
                <div class="col col-md-auto">
                  <q-input
                    outlined
                    dense
                    v-model="pageStore.feedCount"
                    lazy-rules
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
                    hide-bottom-space
                  >
                  </q-input>
                </div>
                <div class="col-auto q-mx-md">小時</div>
              </div>
            </div>
            <div class="form-item row items-center text-dark">
              <div class="col-auto">
                <div class="label q-mr-md text-dark">主護</div>
              </div>
              <div class="row items-center q-mr-md">
                <div class="col col-md-auto">
                  <q-input
                    outlined
                    dense
                    type="text"
                    v-model.number="pageStore.nurse"
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
                @click="pageStore.isShowClearDialog = true"
              />
              <q-btn
                class="text-body1"
                type="submit"
                no-caps
                unelevated
                label="顯示頁面"
                color="primary"
              />
              <!-- <q-btn
                class="text-body1"
                type="button"
                no-caps
                unelevated
                label="顯示頁面1"
                color="primary"
                @click="pageStore.isShowResult = true"
              /> -->
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-dialog ref="dialogRef" v-model="pageStore.isShowClearDialog">
    <q-card class="q-dialog-plugin q-pa-md">
      <q-card-actions align="center" class="text-h6">
        確定要清除資料嗎？
      </q-card-actions>
      <q-card-actions class="row justify-center">
        <q-btn
          no-caps
          unelevated
          class="text-body1 q-mr-md"
          color="negative"
          label="確定"
          @click="pageStore.$reset()"
        />
        <q-btn
          no-caps
          unelevated
          class="text-body1"
          color="grey-8"
          label="取消"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
// vue 相關
// 元件 相關
// lib 相關
// store 相關
import { useMainStoreStore } from '@/stores/mainStore';
// data 相關

const pageStore = useMainStoreStore();
pageStore.init();
</script>

<style lang="scss" scoped>
.form {
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  &-inner {
    height: 100vh;
  }
  &-item {
    .checkbox {
      border-left: 1px dashed #000;
    }
    .arrow_upward {
      font-size: 24px;
    }
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
