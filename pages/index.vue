<script setup lang="ts">
const user = useSupabaseUser()
console.log(user.value)

watchEffect(() => {
  if (!user.value) {
    navigateTo('/login')
  }
})
</script>

<template>
  <Account />
</template>