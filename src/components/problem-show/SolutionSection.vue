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

onMounted(async () => {
  isLoading.value = true;
  await fetchSolutions();
  // solutions.value = solutionList;
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
</template>
