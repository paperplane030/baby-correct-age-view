<template>
  <q-dialog v-model="pageStore.isShowNurseDialog" class="nurse-options-dialog">
    <q-card>
      <q-card-section>
        <div class="text-center text-h6">編輯護理師名單</div>
      </q-card-section>
      <q-card-section>
        <q-input
          outlined
          dense
          type="text"
          v-model="nurseInput"
          lazy-rules
          hide-bottom-space
        >
          <template v-slot:append>
            <q-icon
              name="add"
              class="cursor-pointer"
              @click="
                pageStore.addNurseOption(nurseInput);
                nurseInput = '';
              "
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="row" v-if="pageStore.nurseOptions.length > 0">
        <div class="col">
          <q-list bordered separator>
            <q-item
              v-for="nurse in pageStore.nurseOptions"
              :active="pageStore.nurse === nurse"
              active-class="bg-grey-3"
              clickable
              v-ripple
              @click="pageStore.selectNurse(nurse)"
            >
              <q-item-section class="text-center text-body1">{{
                nurse
              }}</q-item-section>
              <q-item-section avatar side>
                <q-icon
                  color="negative"
                  name="delete"
                  class="cursor-pointer"
                  @click="pageStore.deleteNurseOption(nurse)"
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
          @click="pageStore.addDefaultNurseOptions"
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
const nurseInput = ref('');
</script>

<style lang="scss" scoped>
.nurse-options-dialog {
  width: 600px;
}
</style>
