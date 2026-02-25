<script setup lang="ts">
import { problem as p } from "@/shared/sample-api-response";
import SolutionSection from "@/components/problem-show/SolutionSection.vue";
import type { Problem } from "@/shared/types";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import QuestionSection from "@/components/problem-show/QuestionSection.vue";

const route = useRoute();
const isLoading = ref(false);
const problem = ref<Problem>();

async function fetchProblem() {
  return new Promise((resolve) => {
    setTimeout(() => {
      problem.value = p;
      resolve(route.params.id);
    }, 1000);
  });
}

onMounted(async () => {
  isLoading.value = true;
  const res = await fetchProblem();
  console.log(`param: ${res}`);
  isLoading.value = false;
});
</script>

<template>
  <div class="md:flex">
    <SidebarNav />
    <main class="max-w-275 w-full mx-auto p-5">
      <SkeletonLoader v-if="isLoading" />
      <QuestionSection v-if="!isLoading && problem" :problem="problem" />
      <SolutionSection v-if="!isLoading && problem && problem.isSolved" :problem="problem" />
    </main>
  </div>
</template>
