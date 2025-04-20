<template>
  <div class="form">
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
                  :rules="[(val) => !!val || '必填']"
                >
                  <template v-slot:append>
                    <q-icon name="calendar_month" class="cursor-pointer">
                      <q-popup-proxy ref="qDatePicker">
                        <q-date
                          class="text-dark"
                          v-model="pageStore.form.date"
                          mask="YYYY/MM/DD"
                          @update:model-value="qDatePicker?.hide()"
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
              <div class="row items-center q-mt-md">
                <div class="label q-ml-md text-dark"></div>
                <q-checkbox
                  class="q-mr-md"
                  v-model="pageStore.isShowSurgeryDate"
                  @update:model-value="pageStore.surgeryDate = ''"
                  label="顯示手術日期，手術日期"
                ></q-checkbox>
                <q-input
                  outlined
                  dense
                  v-model="pageStore.surgeryDate"
                  hide-bottom-space
                  :rules="[(val) => !!val || '必填']"
                  :disable="!pageStore.isShowSurgeryDate"
                >
                  <template v-slot:append>
                    <q-icon name="calendar_month" class="cursor-pointer">
                      <q-popup-proxy ref="qDatePicker3">
                        <q-date
                          class="text-dark"
                          v-model="pageStore.surgeryDate"
                          mask="YYYY/MM/DD"
                          :options="
                            (date) =>
                              date <=
                              moment(pageStore.clock).format('YYYY/MM/DD')
                          "
                          @update:model-value="qDatePicker3?.hide()"
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
                <div class="label q-mr-md text-dark">出生體重</div>
              </div>
              <div class="row items-center">
                <div class="col col-md-auto">
                  <q-input
                    outlined
                    dense
                    type="number"
                    v-model.number="pageStore.birthWeight"
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
                  :rules="[(val) => !!val || '必填']"
                >
                  <template v-slot:append>
                    <q-icon name="calendar_month" class="cursor-pointer">
                      <q-popup-proxy ref="qDatePicker2">
                        <q-date
                          class="text-dark"
                          v-model="pageStore.measureDate"
                          mask="YYYY/MM/DD"
                          :options="
                            (date) =>
                              date <=
                              moment(pageStore.clock).format('YYYY/MM/DD')
                          "
                          @update:model-value="qDatePicker2?.hide()"
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
            <div class="form-item row items-center text-dark">
              <div class="col-auto">
                <div class="label q-mr-md text-dark">主治醫師</div>
              </div>
              <div class="row items-center q-mr-md">
                <div class="col col-md-auto">
                  <q-input
                    outlined
                    dense
                    type="text"
                    v-model.number="pageStore.mainDoctor"
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
                  label="編輯主治醫師"
                  color="accent"
                  @click="pageStore.isShowMainDoctorDialog = true"
                />
              </div>
              <div class="col-auto q-ml-md">
                <q-checkbox
                  class="checkbox"
                  v-model="pageStore.isShowMainDoctor"
                  label="顯示主治醫師"
                ></q-checkbox>
              </div>
            </div>
            <div class="form-item row items-center text-dark">
              <div class="col-auto">
                <div class="label q-mr-md text-dark">住院醫師</div>
              </div>
              <div class="row items-center q-mr-md">
                <div class="col col-md-auto">
                  <q-input
                    outlined
                    dense
                    type="text"
                    v-model="pageStore.residentDoctor"
                    lazy-rules
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
                  label="編輯住院醫師"
                  color="accent"
                  @click="pageStore.isShowResidentDoctorDialog = true"
                />
              </div>
              <div class="col-auto q-ml-md">
                <q-checkbox
                  class="checkbox"
                  v-model="pageStore.isShowResidentDoctor"
                  label="顯示住院醫師"
                  @update:model-value="handleUpdateResidentDoctor"
                ></q-checkbox>
              </div>
            </div>
            <div class="form-item row items-center text-dark">
              <div class="col-auto">
                <div class="label q-mr-md text-dark">專科護理師</div>
              </div>
              <div class="row items-center q-mr-md">
                <div class="col col-md-auto">
                  <q-input
                    outlined
                    dense
                    type="text"
                    v-model.number="pageStore.mainNurse"
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
                  label="編輯專科護理師"
                  color="accent"
                  @click="pageStore.isShowMainNurseDialog = true"
                />
              </div>
              <div class="col-auto q-ml-md">
                <q-checkbox
                  class="checkbox"
                  v-model="pageStore.isShowMainNurse"
                  label="顯示專科護理師"
                  @update:model-value="handleUpdateMainNurse"
                ></q-checkbox>
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
import { ref } from 'vue';
// 元件 相關
// lib 相關
import moment from 'moment';
// store 相關
import { useMainStoreStore } from '@/stores/mainStore';
// data 相關

const pageStore = useMainStoreStore();
pageStore.init();

const qDatePicker = ref(null);
const qDatePicker2 = ref(null);
const qDatePicker3 = ref(null);

const handleUpdateResidentDoctor = (val) => {
  pageStore.isShowResidentDoctor = val;
  if (pageStore.isShowMainNurse) {
    pageStore.isShowMainNurse = false;
  }
};
const handleUpdateMainNurse = (val) => {
  pageStore.isShowMainNurse = val;
  if (pageStore.isShowResidentDoctor) {
    pageStore.isShowResidentDoctor = false;
  }
};
</script>

<style lang="scss" scoped>
.form {
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  &-inner {
    min-height: 100vh;
    padding: 16px 0px;
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
