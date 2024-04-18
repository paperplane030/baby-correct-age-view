<template>
  <q-dialog
    v-model="pageStore.isShowNurseDialog"
    class="nurse-options-dialog"
    persistent
  >
    <q-card>
      <q-card-section>
        <q-card-title>
          <div class="text-h6">編輯護理師</div>
        </q-card-title>
        <q-card-section>
          <!-- <q-list>
              <q-item clickable v-for='(option, index) in options' :key='index'>
                <q-item-section>
                  <q-item-label>
                    <div class='text-body1'>{{ option }}</div>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list> -->
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="取消" color="secondary" flat v-close-popup />
          <q-btn label="確定" color="primary" flat />
        </q-card-actions>
      </q-card-section>
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
</script>

<style lang="scss" scoped>
.nurse-options-dialog {
}
</style>
