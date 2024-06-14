<script setup lang="ts">
type Props = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const props = withDefaults(defineProps<Props>(), {
  size: "md",
});

const classes = computed(() => {
  return {
    xs: "px-2 py-1 text-xs",
    sm: "px-2 py-1 text-sm",
    md: "px-2.5 py-1.5 text-sm",
    lg: "px-3 py-2 text-sm",
    xl: "px-3.5 py-2.5 text-sm",
  }[props.size];
});
</script>
<template>
  <button
    type="button"
    class="rounded bg-white font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    :class="classes"
  >
    <slot></slot>
  </button>
</template>
