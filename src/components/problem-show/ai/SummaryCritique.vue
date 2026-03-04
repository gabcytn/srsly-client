<script setup lang="ts">
import type { Summary } from "@/shared/types";
import capitalizeWord from "@/utils/capitalize-word";
import { Tag } from "primevue";

defineProps<{
  summary: Summary;
}>();
</script>

<template>
  <div class="gap-2 items-center">
    <Tag severity="success" :value="summary.verdict" icon="pi pi-circle-fill" />
    <div class="text-sm">
      Rating: <span class="font-bold">{{ summary.overallRating }}</span>
    </div>
    <div class="text-sm">
      Confidence:
      <span class="font-bold">{{ capitalizeWord(summary.confidence) }}</span>
    </div>
  </div>
</template>
