<script setup lang="ts">
defineProps<{
  label: string;
  selected: boolean;
}>();
defineEmits(["click"]);
</script>
<template>
  <div
    class="rounded border sm:px-5 text-center py-1 hover:border-primary cursor-pointer sm:grow-0 grow"
    :class="{
      'border-primary bg-primary-100 dark:bg-primary-950': selected,
      'border-surface bg-mycard': !selected,
    }"
    @click="$emit('click', label)"
  >
    <span class="text-xs">{{ label }}</span>
  </div>
</template>
