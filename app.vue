<script setup lang="ts">
import { provideUseId } from '@headlessui/vue'

const layout = useLayout();

provideUseId(() => useId())
</script>

<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
