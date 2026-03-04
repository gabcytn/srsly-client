<script setup lang="ts">
import type { Solution } from "@/shared/types";
import { ref } from "vue";
import AiCritique from "./ai/AiCritique.vue";
import { sampleCritique } from "@/shared/sample-api-response";
import type { MenuItem } from "primevue/menuitem";
import { useConfirm, useToast } from "primevue";

const props = defineProps<{
  solution: Solution;
}>();
const emit = defineEmits([
  "update:solution",
  "delete:solution",
  "click:edit-button",
  "click:delete-button",
]);

const toast = useToast();
const confirm = useConfirm();

const aiVisible = ref(false);
const aiCritiqueLoading = ref(false);

const menu = ref();
const menuPopoverItems: MenuItem[] = [
  {
    label: "Actions",
    items: [
      {
        label: "Edit",
        icon: "pi pi-pen-to-square",
        class: "text-xs",
        command: () => {
          emit("click:edit-button");
        },
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        class: "text-xs",
        command: confirmDelete,
      },
    ],
  },
];
function toggleMenu(event: Event) {
  menu.value.toggle(event);
}

function confirmDelete() {
  confirm.require({
    message: "Do you want to delete this solution?",
    header: "Danger Zone",
    icon: "pi pi-info-circle",
    rejectLabel: "Cancel",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Delete",
      severity: "danger",
    },
    accept: () => {
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: `Record ${props.solution.title} deleted`,
        life: 3000,
      });
      emit("delete:solution", props.solution);
    },
  });
}

function getButtonLabel() {
  if (props.solution.aiCritique) {
    return aiVisible.value ? "Hide AI Critique" : "Show AI Critique";
  }
  return "AI Code Critique";
}

async function handleAiClick() {
  if (props.solution.aiCritique) {
    aiVisible.value = !aiVisible.value;
    return;
  }

  aiCritiqueLoading.value = true;
  await generateAiCritique();
  aiCritiqueLoading.value = false;
  aiVisible.value = true;
}

async function generateAiCritique() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // FIX: mutate solution w/ new ai critique
      const solution: Solution = {
        id: props.solution.id,
        title: props.solution.title,
        code: props.solution.code,
        aiCritique: sampleCritique,
        note: props.solution.note,
      };
      emit("update:solution", solution);
      resolve("Done");
    }, 1000);
  });
}
</script>

<template>
  <highlightjs autodetect :code="solution.code" />
  <div v-if="solution.note" class="note-container p-4 mt-5 rounded-lg">
    <p class="text-xs text-light mb-2">NOTES</p>
    <p class="text-sm">{{ solution.note }}</p>
  </div>
  <div class="flex justify-end mt-3 gap-2">
    <Button
      severity="secondary"
      size="small"
      :label="getButtonLabel()"
      class="border-surface! px-3!"
      :icon="solution.aiCritique ? '' : 'pi pi-arrow-right'"
      icon-pos="right"
      :disabled="aiCritiqueLoading"
      @click="handleAiClick"
    />
    <div class="flex justify-center">
      <Button
        type="button"
        icon="pi pi-ellipsis-v"
        size="small"
        severity="secondary"
        @click="toggleMenu"
        aria-haspopup="true"
        aria-controls="overlay_menu"
      />
      <Menu ref="menu" :model="menuPopoverItems" popup id="overlay_menu" />
    </div>
  </div>
  <div v-if="aiCritiqueLoading" class="note-container mt-3 p-3 rounded-lg text-xs text-light">
    Analyzing your solution...
  </div>
  <AiCritique v-if="aiVisible && solution.aiCritique" :critique="solution.aiCritique" />
</template>

<style lang="css" scoped>
.note-container {
  background-color: var(--constraint);
}
</style>

<style lang="css">
pre,
pre code {
  white-space: pre-wrap;
}
</style>
