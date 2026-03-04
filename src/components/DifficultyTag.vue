<script lang="ts" setup>
defineProps<{
  label: "Easy" | "Medium" | "Hard";
}>();
</script>
<template>
  <span
    class="text-xs font-bold py-0.75 px-2.25 rounded"
    :class="`text-${label.toLowerCase()} bg-${label.toLowerCase()}`"
    >{{ label === "Medium" ? "Med." : label }}</span
  >
</template>
