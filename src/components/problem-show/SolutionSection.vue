<script setup lang="ts">
import type { Problem, Solution } from "@/shared/types";
import { onMounted, ref } from "vue";
import AddSolutionModal from "./AddSolutionModal.vue";
import SolutionContent from "./SolutionContent.vue";
import api from "@/api";
import { useToast } from "primevue";

const props = defineProps<{
  problem: Problem;
}>();

const toast = useToast();
const solutions = ref<Solution[]>([]);
const isLoading = ref(false);
const selectedSolution = ref<Solution>();
const solutionModalOpen = ref(false);
const openSolution = ref<string[]>(["0"]);

async function updateSolution(solution: Solution) {
  await api.patch(`/solutions/${solution.id}`, {
    title: solution.title,
    code: solution.code,
    note: solution.note,
  });
  solutions.value = solutions.value.map((s) => (s.id === solution.id ? { ...solution } : s));
}

async function deleteSolution(solution: Solution) {
  await api.delete(`/solutions/${solution.id}`);
  solutions.value = solutions.value.filter((s) => s.id !== solution.id);
}

async function createSolution(solution: Solution) {
  const s = (await api.post(`/problems/${props.problem.questionFrontendId}/solutions`, {
    title: solution.title,
    code: solution.code,
    note: solution.note,
  })) as Solution;
  console.log("s");
  console.log(s);
  const existingSolutions = solutions.value;
  existingSolutions.push(s);
  solutions.value = existingSolutions;
}

function openEditSolutionModal(solution: Solution) {
  selectedSolution.value = solution;
  openSolutionModal();
}

function openAddSolutionModal() {
  selectedSolution.value = undefined;
  openSolutionModal();
}

function openSolutionModal() {
  solutionModalOpen.value = true;
}

onMounted(async () => {
  try {
    isLoading.value = true;
    const data = (await api.get(
      `/problems/${props.problem.questionFrontendId}/solutions`,
    )) as Solution[];
    solutions.value = data;
  } catch (e: unknown) {
    toast.add({
      severity: "error",
      summary: "Something went wrong",
      detail: e instanceof Error ? e.message : "Unknown error occured",
    });
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <ConfirmDialog></ConfirmDialog>
  <AddSolutionModal
    :key="selectedSolution?.id ?? 'new'"
    v-model:is-open="solutionModalOpen"
    :solution="selectedSolution"
    @update:solution="updateSolution"
    @add:solution="createSolution"
  />
  <div class="flex justify-between">
    <h1 class="font-bold text-xl">Solutions</h1>
    <Button
      label="Add Solution"
      size="small"
      @click="openAddSolutionModal"
      :disabled="solutions && solutions?.length >= 5"
    />
  </div>
  <p v-if="!isLoading && !solutions" class="text-center text-sm mt-3 mb-5">
    You have no solution for this problem yet. Click 'Add Solution' to add one.
  </p>
  <Accordion :value="openSolution" multiple v-if="solutions.length > 0">
    <AccordionPanel v-for="(solution, idx) in solutions" :key="solution.id" :value="String(idx)">
      <AccordionHeader>{{ solution.title }}</AccordionHeader>
      <AccordionContent>
        <SolutionContent
          :solution
          @update:solution="updateSolution"
          @delete:solution="deleteSolution"
          @click:edit-button="openEditSolutionModal(solution)"
        />
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<style lang="css">
span[class^="hljs"],
span[class*=" hljs"] {
  font-family: monospace;
}

.hljs {
  background-color: transparent;
}
</style>
