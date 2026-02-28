<script setup lang="ts">
import type { Bugs } from "@/shared/types";
import MiniCard from "./MiniCard.vue";

defineProps<{
  bugs: Bugs;
}>();
</script>

<template>
  <MiniCard label="Bug Analysis">
    <div class="flex items-center gap-1">
      <span
        class="pi pi-circle-fill"
        :class="{
          'text-green-500': !bugs.hasBugs,
          'text-red-500': bugs.hasBugs,
        }"
        style="font-size: 0.5rem"
      ></span>
      <span class="text-xs">{{ bugs.hasBugs ? "Bugs found" : "No bugs found" }}</span>
    </div>
    <div v-if="bugs.riskDetails.length > 0">
      <ul class="list-disc ms-3">
        <li v-for="(bug, idx) in bugs.riskDetails" :key="idx" class="text-xs">{{ bug }}</li>
      </ul>
    </div>
  </MiniCard>
</template>
