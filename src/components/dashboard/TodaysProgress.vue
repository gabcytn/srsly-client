<script setup lang="ts">
defineProps<{
  numerator: number;
  denominator: number;
}>();
</script>
<template>
  <div class="bg-mycard mt-5 p-3 rounded border border-surface">
    <span class="text-light text-xs inline-block mb-2">Today's progress</span>
    <div class="flex justify-between gap-3 items-center">
      <ProgressBar class="grow" :value="(numerator / denominator) * 100">{{}}</ProgressBar>
      <p>
        <span class="font-bold me-2 text-xl">{{ numerator }}</span
        ><span class="text-xs text-light">/ {{ denominator }} reviewed</span>
      </p>
    </div>
  </div>
</template>
