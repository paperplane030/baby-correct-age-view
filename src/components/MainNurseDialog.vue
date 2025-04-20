<template>
  <q-dialog
    v-model="pageStore.isShowMainNurseDialog"
    class="nurse-options-dialog"
  >
    <q-card>
      <q-card-section>
        <div class="text-center text-h6">編輯專科護理師名單</div>
      </q-card-section>
      <q-card-section>
        <q-input
          outlined
          dense
          type="text"
          v-model="mainNurseInput"
          lazy-rules
          hide-bottom-space
        >
          <template v-slot:append>
            <q-icon
              name="add"
              class="cursor-pointer"
              @click="
                pageStore.addMainNurseOption(mainNurseInput);
                mainNurseInput = '';
              "
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="row" v-if="pageStore.mainNurseOptions.length > 0">
        <div class="col">
          <q-list bordered separator>
            <q-item
              v-for="mainNurse in pageStore.mainNurseOptions"
              :active="pageStore.mainNurse === mainNurse"
              active-class="bg-grey-3"
              clickable
              v-ripple
              @click="pageStore.selectMainNurse(mainNurse)"
            >
              <q-item-section class="text-center text-body1">{{
                mainNurse
              }}</q-item-section>
              <q-item-section avatar side>
                <q-icon
                  color="negative"
                  name="delete"
                  class="cursor-pointer"
                  @click="pageStore.deleteMainNurseOption(mainNurse)"
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
          @click="pageStore.addDefaultMainNurseOptions"
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
const mainNurseInput = ref('');
</script>

<style lang="scss" scoped>
.nurse-options-dialog {
  width: 600px;
}
</style>
