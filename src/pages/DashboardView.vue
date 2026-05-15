<script setup lang="ts">
import DashboardToday from "@/components/dashboard/DashboardToday.vue";
import SkeletonLoader from "@/components/problem-show/SkeletonLoader.vue";
import { useReviewStore } from "@/stores/review";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const review = useReviewStore();
const { isLoading, problems, progress, problemsSolvedToday, problemsToSolveToday } =
  storeToRefs(review);

onMounted(() => review.initializeDashboard());
</script>
<template>
  <div class="md:flex">
    <SidebarNav />
    <main class="max-w-275 w-full mx-auto p-5">
      <SkeletonLoader v-if="isLoading" />
      <DashboardHeader v-if="!isLoading" />
      <TodaysProgress
        v-if="!isLoading && progress"
        :numerator="problemsSolvedToday"
        :denominator="problemsToSolveToday"
      />
      <DashboardToday v-if="!isLoading && problems" :problems />
      <SuggestedProblems />
    </main>
  </div>
</template>
