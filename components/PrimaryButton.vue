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
    class="rounded-md bg-indigo-600 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    :class="classes"
   >
    <slot></slot>
  </button>
</template>
