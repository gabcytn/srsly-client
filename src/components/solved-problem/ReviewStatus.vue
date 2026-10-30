<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  status: string;
}>();

const statusConfig = {
  NEW: {
    label: "New",
    color: "#929b95",
  },
  LEARNING: {
    label: "Learning",
    color: "#d9aa4b",
  },
  REVIEWING: {
    label: "Reviewing",
    color: "#8b9bd7",
  },
  MASTERED: {
    label: "Mastered",
    color: "#65c28b",
  },
} as const;

const sanitizedStatus = computed(() => {
  const status = props.status?.trim().toUpperCase();

  if (!status) return null;

  if (!(status in statusConfig)) {
    throw new Error("Invalid review status.");
  }

  return statusConfig[status as keyof typeof statusConfig];
});
</script>

<template>
  <span class="inline-flex items-center gap-2 text-[14px] whitespace-nowrap">
    <template v-if="sanitizedStatus">
      <span
        class="w-1.75 h-1.75 shrink-0 rounded-[50%]"
        :style="{ backgroundColor: sanitizedStatus.color }"
      />
      <span>{{ sanitizedStatus.label }}</span>
    </template>

    <span v-else>-</span>
  </span>
</template>
