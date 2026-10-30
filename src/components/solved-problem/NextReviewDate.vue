<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  date: string | undefined;
}>();

const parsedDate = computed(() => {
  if (!props.date) return null;

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(props.date);
  if (!match) {
    throw new Error("Invalid date format. Expected YYYY-MM-DD.");
  }

  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  // Prevent invalid dates such as 2026-02-30.
  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    throw new Error("Invalid date.");
  }

  return date;
});

const today = computed(() => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
});

const dateStatus = computed(() => {
  if (!parsedDate.value) return null;

  const diff = parsedDate.value.getTime() - today.value.getTime();

  const days = diff / (1000 * 60 * 60 * 24);

  if (days < 0) return "overdue";
  if (days === 0) return "today";
  if (days === 1) return "tomorrow";

  return "future";
});

const formattedDate = computed(() => {
  if (!parsedDate.value) return "-";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(parsedDate.value);
});
</script>

<template>
  <span v-if="dateStatus === 'overdue'" class="font-semibold text-red-500">
    {{ formattedDate }}
  </span>

  <span v-else-if="dateStatus === 'tomorrow'"> Tomorrow </span>

  <span v-else-if="dateStatus === 'today'" class="font-semibold text-primary"> Today </span>

  <span v-else-if="dateStatus === 'future'">
    {{ formattedDate }}
  </span>

  <span v-else>-</span>
</template>
