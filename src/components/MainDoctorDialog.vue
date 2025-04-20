<template>
  <q-dialog
    v-model="pageStore.isShowMainDoctorDialog"
    class="nurse-options-dialog"
  >
    <q-card>
      <q-card-section>
        <div class="text-center text-h6">編輯主治醫師名單</div>
      </q-card-section>
      <q-card-section>
        <q-input
          outlined
          dense
          type="text"
          v-model="mainDoctorInput"
          lazy-rules
          hide-bottom-space
        >
          <template v-slot:append>
            <q-icon
              name="add"
              class="cursor-pointer"
              @click="
                pageStore.addMainDoctorOption(mainDoctorInput);
                mainDoctorInput = '';
              "
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="row" v-if="pageStore.mainDoctorOptions.length > 0">
        <div class="col">
          <q-list bordered separator>
            <q-item
              v-for="mainDoctor in pageStore.mainDoctorOptions"
              :active="pageStore.mainDoctor === mainDoctor"
              active-class="bg-grey-3"
              clickable
              v-ripple
              @click="pageStore.selectMainDoctor(mainDoctor)"
            >
              <q-item-section class="text-center text-body1">{{
                mainDoctor
              }}</q-item-section>
              <q-item-section avatar side>
                <q-icon
                  color="negative"
                  name="delete"
                  class="cursor-pointer"
                  @click="pageStore.deleteMainDoctorOption(mainDoctor)"
                ></q-icon>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
      <q-card-actions class="row justify-between q-mt-md">
        <q-btn
          label="載入預設名單"
          color="primary"
          @click="pageStore.addDefaultMainDoctorOptions"
        />
        <q-btn label="關閉" color="secondary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
// vue 相關
import { ref } from 'vue';
// 元件 相關
// lib 相關
// store 相關
import { useMainStoreStore } from '@/stores/mainStore';
// data 相關
const pageStore = useMainStoreStore();
const mainDoctorInput = ref('');
</script>

<style lang="scss" scoped>
.nurse-options-dialog {
  width: 600px;
}
</style>
