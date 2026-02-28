<script setup lang="ts">
defineProps<{
  title: string;
  improvements: string[];
}>();
</script>

<template>
  <div class="py-0! space-y-2">
    <p class="text-xs text-light font-jetbrains-mono">{{ title.toUpperCase() }}</p>
    <ul class="list-disc ms-3 space-y-2">
      <li v-for="(change, idx) in improvements" :key="idx" class="text-xs">
        {{ change }}
      </li>
    </ul>
  </div>
</template>
