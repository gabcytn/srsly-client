<script lang="ts" setup>
import type { Difficulty } from "@/shared/types";
import capitalizeWord from "@/utils/capitalize-word";

defineProps<{ label: Difficulty }>();
</script>
<template>
  <span
    class="text-xs font-bold py-0.75 px-2.25 rounded"
    :class="`text-${label.toLowerCase()} bg-${label.toLowerCase()}`"
    >{{ label === "MEDIUM" ? "Med." : capitalizeWord(label) }}</span
  >
</template>
