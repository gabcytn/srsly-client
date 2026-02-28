<script setup lang="ts">
import type { Readability } from "@/shared/types";
import { computed } from "vue";
import MiniCard from "./MiniCard.vue";

const props = defineProps<{
  readability: Readability;
}>();

const namingQualityClass = computed(() => {
  const map = {
    Excellent: "text-green-500",
    Good: "text-green-500",
    Fair: "text-yellow-500",
    Poor: "text-red-500",
  };

  return map[props.readability?.namingQuality] || "";
});
</script>

<template>
  <MiniCard label="Readability">
    <div class="flex justify-between">
      <span class="text-xs">Naming</span>
      <span class="text-xs font-bold" :class="namingQualityClass">{{
        readability.namingQuality
      }}</span>
    </div>
    <div class="flex justify-between">
      <span class="text-xs">Structure</span>
      <span class="text-xs font-bold" :class="namingQualityClass">{{
        readability.codeStructure
      }}</span>
    </div>
    <div class="flex items-center gap-1">
      <span
        class="pi pi-circle-fill"
        :class="{
          'text-green-500': !readability.commentsNeeded,
          'text-red-500': readability.commentsNeeded,
        }"
        style="font-size: 0.5rem"
      ></span>
      <span class="text-xs">{{
        readability.commentsNeeded ? "Comments needed" : "No comments needed"
      }}</span>
    </div>
  </MiniCard>
</template>
