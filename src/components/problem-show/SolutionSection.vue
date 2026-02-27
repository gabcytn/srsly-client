<script setup lang="ts">
import { solutionList } from "@/shared/sample-api-response";
import type { Problem, Solution } from "@/shared/types";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import AddSolutionModal from "./AddSolutionModal.vue";

defineProps<{
  problem: Problem;
}>();

const route = useRoute();
const solutions = ref<Solution[]>();
const isLoading = ref(false);
const solutionModalOpen = ref(false);
const openSolution = ref<string[]>(["0"]);

onMounted(async () => {
  isLoading.value = true;
  await fetchSolutions();
  solutions.value = solutionList;
  isLoading.value = false;
});

async function fetchSolutions() {
  isLoading.value = true;
  return new Promise((resolve) => {
    setTimeout(() => {
      isLoading.value = false;
      resolve(route.params.id);
    }, 1000);
  });
}

function toggleSolutionModal() {
  solutionModalOpen.value = true;
  console.log("hi");
}
</script>

<template>
  <AddSolutionModal v-model:is-open="solutionModalOpen" />
  <div class="flex justify-between">
    <h1 class="font-bold text-xl">Solutions</h1>
    <Button label="Add Solution" size="small" @click="toggleSolutionModal" />
  </div>
  <p v-if="!isLoading && !solutions" class="text-center text-sm mt-3 mb-5">
    You have no solution for this problem yet. Click 'Add Solution' to add one.
  </p>
  <Accordion :value="openSolution" multiple>
    <AccordionPanel v-for="(solution, idx) in solutionList" :key="solution.id" :value="String(idx)">
      <AccordionHeader>{{ solution.title }}</AccordionHeader>
      <AccordionContent>
        <highlightjs autodetect :code="solution.code" />
        <div class="note-container p-4 mt-5 rounded-lg">
          <p class="text-xs text-light mb-2">NOTES</p>
          <p class="text-sm">{{ solution.note }}</p>
        </div>
        <div class="flex justify-end mt-3">
          <Button
            severity="secondary"
            size="small"
            label="AI Code Critique"
            class="border-surface! px-3!"
            icon="pi pi-arrow-right"
            icon-pos="right"
          />
        </div>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<style lang="css" scoped>
.note-container {
  background-color: var(--constraint);
}
</style>

<style lang="css">
span[class^="hljs"],
span[class*=" hljs"] {
  font-family: monospace;
}

.hljs {
  background-color: transparent;
}
</style>
