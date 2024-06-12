<script setup lang="ts">
import type { UpcomingOccurrences } from '#build/components';

const user = useSupabaseUser()

watchEffect(() => {
  if (!user.value) {
    navigateTo('/login')
  }
})
</script>

<template>
  <UpcomingOccurrences />
</template>