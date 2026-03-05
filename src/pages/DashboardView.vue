<script setup lang="ts">
import api from "@/api";
import DashboardToday from "@/components/dashboard/DashboardToday.vue";
import SkeletonLoader from "@/components/problem-show/SkeletonLoader.vue";
import type { ReviewProgress, PaginatedSrsProblem } from "@/shared/types";
import { useToast } from "primevue";
import { computed, onMounted, ref } from "vue";

const toast = useToast();
const isLoading = ref(false);
const problems = ref<PaginatedSrsProblem>();
const progress = ref<ReviewProgress>({
  solved: 0,
  unsolved: 0,
});
const numerator = computed(() => progress.value.solved);
const denominator = computed(() => progress.value.solved + progress.value.unsolved);

function incrementProgress() {
  const solved = progress.value.solved + 1;
  const unsolved = progress.value.unsolved - 1;
  progress.value = { solved, unsolved };
}

async function fetchDashboardData(path: string) {
  const data = (await api.get(path)) as PaginatedSrsProblem;
  return data;
}

async function fetchProgress() {
  const data = (await api.get("/problems/srs/progress")) as ReviewProgress;
  return data;
}

async function loadReviewProgress() {
  const data = await fetchProgress();
  progress.value = data;
}

async function loadReviewProblems(
  page = 0,
  difficulty = "all",
  title: string | undefined = undefined,
) {
  let path = `/problems/srs?page=${page}&difficulty=${difficulty}`;
  if (title) {
    path += `&title=${title}`;
  }
  const data = await fetchDashboardData(path);
  problems.value = data;
}

async function loadDashboardData() {
  try {
    isLoading.value = true;
    await Promise.all([loadReviewProblems(), loadReviewProgress()]);
  } catch (e: unknown) {
    toast.add({
      severity: "error",
      summary: "Something went wrong.",
      detail: e instanceof Error ? e.message : "Unknown error occured",
      life: 3000,
    });
  } finally {
    isLoading.value = false;
  }
}

onMounted(loadDashboardData);
</script>
<template>
  <div class="md:flex">
    <SidebarNav />
    <main class="max-w-275 w-full mx-auto p-5">
      <SkeletonLoader v-if="isLoading" />
      <DashboardHeader v-if="!isLoading" />
      <TodaysProgress v-if="!isLoading && progress" :numerator :denominator />
      <DashboardToday
        v-if="!isLoading && problems"
        :problems
        @update:problems-page="loadReviewProblems"
        @increment:progress="incrementProgress"
      />
      <SuggestedProblems />
    </main>
  </div>
</template>
