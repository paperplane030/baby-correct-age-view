<template>
  <Form v-show="!pageStore.isShowResult" />
  <Display v-show="pageStore.isShowResult" />
  <NurseOptionsDialog />
</template>

<script setup>
import Form from './components/Form.vue';
import NurseOptionsDialog from './components/NurseOptionsDialog.vue';
import Display from './components/Display.vue';

import { useMainStoreStore } from '@/stores/mainStore';
const pageStore = useMainStoreStore();
</script>

<style lang="scss" scoped></style>
