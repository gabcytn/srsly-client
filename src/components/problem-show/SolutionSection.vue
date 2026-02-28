<script setup lang="ts">
import { solutionList } from "@/shared/sample-api-response";
import type { Problem, Solution } from "@/shared/types";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import AddSolutionModal from "./AddSolutionModal.vue";
import SolutionContent from "./SolutionContent.vue";

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

function updateSolution(solution: Solution) {
  solutions.value?.map((s) => {
    if (s.id === solution.id) {
      s.code = solution.code;
      s.note = solution.note;
      s.aiCritique = solution.aiCritique;
    }
    return s;
  });
}
</script>

<template>
  <AddSolutionModal v-model:is-open="solutionModalOpen" />
  <div class="flex justify-between">
    <h1 class="font-bold text-xl">Solutions</h1>
    <Button
      label="Add Solution"
      size="small"
      @click="solutionModalOpen = true"
      :disabled="solutions && solutions?.length >= 5"
    />
  </div>
  <p v-if="!isLoading && !solutions" class="text-center text-sm mt-3 mb-5">
    You have no solution for this problem yet. Click 'Add Solution' to add one.
  </p>
  <Accordion :value="openSolution" multiple v-if="solutionList.length > 0">
    <AccordionPanel v-for="(solution, idx) in solutionList" :key="solution.id" :value="String(idx)">
      <AccordionHeader>{{ solution.title }}</AccordionHeader>
      <AccordionContent>
        <SolutionContent :solution @update:solution="updateSolution" />
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
