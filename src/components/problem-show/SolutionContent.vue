<script setup lang="ts">
import type { Solution } from "@/shared/types";
import { ref } from "vue";
import AiCritique from "./ai/AiCritique.vue";
import { sampleCritique } from "@/shared/sample-api-response";

const props = defineProps<{
  solution: Solution;
}>();
const emit = defineEmits(["update:solution", "click:edit-button"]);

const aiVisible = ref(false);
const aiCritiqueLoading = ref(false);

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
    <Button severity="warn" size="small" label="Edit" @click="$emit('click:edit-button')" />
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
