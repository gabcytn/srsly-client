<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="bg-mycard border border-surface flex flex-col gap-2 space-y-1">
    <p class="text-xs text-light font-jetbrains-mono">{{ label.toUpperCase() }}</p>
    <slot></slot>
  </div>
</template>
