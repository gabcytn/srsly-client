<script setup lang="ts">
import type { Problem } from "@/shared/types";
import getMonthAndDate from "@/utils/get-month-and-date";
import type { MenuItem } from "primevue/menuitem";
import { ref } from "vue";

const props = defineProps<{
  problem: Problem;
  reviewDate: string;
}>();

defineEmits(["clickReview"]);

const menu = ref();
const menuPopoverItems: MenuItem[] = [
  {
    label: "Actions",
    items: [
      {
        label: "View Full Problem",
        icon: "pi pi-eye",
        class: "text-xs",
      },
      {
        label: "Open in LeetCode",
        icon: "pi pi-external-link",
        class: "text-xs",
        url: props.problem.url,
        target: "_blank",
      },
    ],
  },
];
function toggle(event: Event) {
  menu.value.toggle(event);
}
</script>
<template>
  <div
    class="bg-mycard flex items-center gap-[0.85rem] p-3.5 rounded border border-surface hover:bg-zinc-100! dark:hover:bg-zinc-800! transition-all duration-100"
  >
    <span class="sm:inline hidden font-jetbrains-mono text-xs text-light min-w-10"
      >#{{ problem.questionFrontendId }}</span
    >
    <div class="shrink grow">
      <div
        class="font-bold sm:text-md text-sm overflow-hidden text-ellipsis problem-title"
        :title="problem.title"
      >
        {{ problem.title }}
      </div>
      <div class="hidden sm:flex flex-wrap gap-1.25 mt-1">
        <span
          v-for="(tag, idx) in problem.topicTags"
          :key="idx"
          class="text-xs px-1.75 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded border border-surface"
        >
          {{ tag.name }}</span
        >
      </div>
    </div>
    <span
      class="text-xs font-bold py-0.75 px-2.25 rounded"
      :class="`text-${problem.difficulty.toLowerCase()} bg-${problem.difficulty.toLowerCase()}`"
      >{{ problem.difficulty === "Medium" ? "Med." : problem.difficulty }}</span
    >
    <span class="hidden sm:inline text-xs text-light text-right">{{
      getMonthAndDate(reviewDate)
    }}</span>
    <div class="flex items-center gap-1">
      <Button label="Review" size="small" @click="$emit('clickReview', problem)" />
      <div class="flex justify-center">
        <Button
          type="button"
          icon="pi pi-ellipsis-v"
          size="small"
          severity="secondary"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        />
        <Menu ref="menu" :model="menuPopoverItems" popup id="overlay_menu" />
      </div>
    </div>
  </div>
</template>

<style lang="css">
.p-menu-submenu-label {
  font-size: 0.85rem;
}

.p-menu-item-icon {
  font-size: 0.75rem;
}
</style>

<style lang="css" scoped>
@media (max-width: 440px) {
  .problem-title {
    white-space: nowrap;
    max-width: 10rem;
  }
}

@media (max-width: 410px) {
  .problem-title {
    max-width: 7.5rem;
  }
}

@media (max-width: 370px) {
  .problem-title {
    max-width: 5rem;
  }
}

@media (max-width: 330px) {
  .problem-title {
    max-width: 3.5rem;
  }
}
</style>
