<template>
  <Form v-show="!pageStore.isShowResult" />
  <Display v-show="pageStore.isShowResult" />
  <NurseOptionsDialog />
  <q-icon
    :name="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
    class="full-screen"
    @click="$q.fullscreen.toggle()"
  ></q-icon>
</template>

<script setup>
import Form from './components/Form.vue';
import NurseOptionsDialog from './components/NurseOptionsDialog.vue';
import Display from './components/Display.vue';

import { AppFullscreen } from 'quasar';

import { useMainStoreStore } from '@/stores/mainStore';
const pageStore = useMainStoreStore();
</script>

<style lang="scss" scoped>
.full-screen {
  position: fixed;
  right: 10px;
  top: 10px;
  font-size: 60px;
  cursor: pointer;
}
</style>
