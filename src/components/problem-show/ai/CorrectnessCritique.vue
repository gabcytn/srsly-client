<script setup lang="ts">
import type { Correctness } from "@/shared/types";
import MiniCard from "./MiniCard.vue";

defineProps<{
  correctness: Correctness;
}>();
</script>

<template>
  <MiniCard label="Correctness">
    <div class="flex items-center gap-1">
      <span
        class="pi pi-circle-fill"
        :class="{
          'text-primary': correctness.isCorrect,
          'text-red-500': !correctness.isCorrect,
        }"
        style="font-size: 0.5rem"
      ></span>
      <p class="text-xs">{{ correctness.isCorrect ? "Correct" : "Incorrect" }}</p>
    </div>
    <div v-if="correctness.issues.length > 0">
      <ul class="list-disc ms-3">
        <li v-for="(issue, idx) in correctness.issues" :key="idx" class="text-xs">{{ issue }}</li>
      </ul>
    </div>
  </MiniCard>
</template>
