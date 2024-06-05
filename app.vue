<script setup lang="ts">
const user = useSupabaseUser()
console.log(user.value)
</script>

<template>
  <div>
    <Account v-if="user" />
    <Auth v-else />
  </div>
</template>