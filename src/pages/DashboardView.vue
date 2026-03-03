<script setup lang="ts">
import DashboardToday from "@/components/dashboard/DashboardToday.vue";
import SkeletonLoader from "@/components/problem-show/SkeletonLoader.vue";
import { paginatedSrsProblem, reviewProgress } from "@/shared/sample-api-response";
import type { ReviewProgress, PaginatedSrsProblem } from "@/shared/types";
import { useToast } from "primevue";
import { onMounted, ref } from "vue";

const toast = useToast();
const isLoading = ref(false);
const problems = ref<PaginatedSrsProblem>();
const progress = ref<ReviewProgress>();

async function fetchDashboardData(page: number = 0) {
  console.log(`page number: ${page}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(paginatedSrsProblem);
    }, 1000);
  });
}

async function fetchProgress() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(reviewProgress);
    }, 1000);
  });
}

async function getReviewProgress() {
  const data = (await fetchProgress()) as ReviewProgress;
  progress.value = data;
}

async function getReviewProblems() {
  const data = (await fetchDashboardData()) as PaginatedSrsProblem;
  problems.value = data;
}

async function loadDashboardData() {
  try {
    isLoading.value = true;
    await Promise.all([getReviewProblems(), getReviewProgress()]);
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
    <Toast />
    <SidebarNav />
    <main class="max-w-275 w-full mx-auto p-5">
      <SkeletonLoader v-if="isLoading" />
      <DashboardHeader v-if="!isLoading" />
      <TodaysProgress
        v-if="progress"
        :numerator="progress.solved"
        :denominator="progress.solved + progress.unsolved"
      />
      <DashboardToday
        v-if="!isLoading && problems"
        :problems
        @update:problems-page="fetchDashboardData"
      />
      <SuggestedProblems v-if="!isLoading && problems" />
    </main>
  </div>
</template>
