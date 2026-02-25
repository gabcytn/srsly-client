<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <span class="text-xs px-1.75 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded border border-surface">
    {{ label }}</span
  >
</template>
