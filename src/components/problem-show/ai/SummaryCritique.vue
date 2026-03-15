<script setup lang="ts">
import type { Summary } from "@/shared/types";
import capitalizeWord from "@/utils/capitalize-word";
import { Tag } from "primevue";

const props = defineProps<{
  summary: Summary;
}>();

function getTagSeverity() {
  switch (props.summary.verdict) {
    case "Accepted":
      return "success";
    case "Rejected":
      return "danger";
    case "ConditionallyAccepted":
      return "warn";
  }
}
</script>

<template>
  <div class="gap-2 items-center">
    <Tag :severity="getTagSeverity()" :value="summary.verdict" icon="pi pi-circle-fill" />
    <div class="text-sm">
      Rating: <span class="font-bold">{{ summary.overallRating }}</span>
    </div>
    <div class="text-sm">
      Confidence:
      <span class="font-bold">{{ capitalizeWord(summary.confidence) }}</span>
    </div>
  </div>
</template>
