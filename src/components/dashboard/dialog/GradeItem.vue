<script setup lang="ts">
const props = defineProps<{
  grade: number;
  selected: boolean;
}>();
defineEmits(["click"]);
</script>
<template>
  <span
    :class="{
      'border-primary bg-primary-100 dark:bg-primary-950': props.selected,
      'border-surface opacity-40': !props.selected,
    }"
    class="border py-2 w-12 rounded cursor-pointer text-center hover:bg-primary-100 dark:hover:bg-primary-950 hover:border-primary transition-colors duration-150"
    @click="$emit('click')"
    >{{ grade }}</span
  >
</template>
