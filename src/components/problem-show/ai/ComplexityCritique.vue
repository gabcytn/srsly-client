<script setup lang="ts">
import type { Complexity } from "@/shared/types";
import { Chip } from "primevue";
import MiniCard from "./MiniCard.vue";

defineProps<{
  complexity: Complexity;
}>();
</script>

<template>
  <MiniCard label="Complexity">
    <div>
      <Chip :label="`Time: ${complexity.timeComplexity}`" class="text-xs" />
      <Chip :label="`Space: ${complexity.spaceComplexity}`" class="text-xs" />
    </div>
    <div class="flex items-center gap-1">
      <span
        class="pi pi-circle-fill"
        :class="{
          'text-primary': complexity.isComplexityOptimal,
          'text-red-500': !complexity.isComplexityOptimal,
        }"
        style="font-size: 0.5rem"
      ></span>
      <span class="text-xs">{{ complexity.isComplexityOptimal ? "Optimal" : "Suboptimal" }}</span>
    </div>
  </MiniCard>
</template>
