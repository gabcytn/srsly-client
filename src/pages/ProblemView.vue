<script setup lang="ts">
import SolutionSection from "@/components/problem-show/SolutionSection.vue";
import { ProblemKey, type Problem } from "@/shared/types";
import { onMounted, provide, ref } from "vue";
import { useRoute } from "vue-router";
import QuestionSection from "@/components/problem-show/QuestionSection.vue";
import api from "@/api";

const route = useRoute();
const isLoading = ref(false);
const problem = ref<Problem>();

async function fetchProblem() {
  console.warn("refetching problem...");
  const data = await reqProblemFromServer();
  problem.value = data;
}

async function reqProblemFromServer() {
  const paramId = Number(route.params.id);
  if (!paramId || Number.isNaN(paramId)) {
    throw new Error("Invalid param id");
  }
  const data = (await api.get(`/problems/${paramId}`)) as Problem;
  return data;
}

function markAsSolved() {
  if (!problem.value) return;
  problem.value = { ...problem.value, isSolved: true };
}

provide(ProblemKey, {
  problem,
  markAsSolved,
});

onMounted(async () => {
  isLoading.value = true;
  await fetchProblem();
  isLoading.value = false;
});
</script>

<template>
  <div class="md:flex">
    <SidebarNav />
    <main class="max-w-275 w-full mx-auto p-5">
      <SkeletonLoader v-if="isLoading" />
      <QuestionSection v-if="!isLoading && problem" :problem :refresh-problem="fetchProblem" />
      <SolutionSection v-if="!isLoading && problem && problem.isSolved" :problem />
    </main>
  </div>
</template>
