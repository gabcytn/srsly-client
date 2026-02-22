<script setup lang="ts">
import { paginatedSrsProblem } from "@/shared/sample-api-response";
import { computed, ref, watch } from "vue";
import TodaysProgress from "./TodaysProgress.vue";

const completed = ref(3);
const reviews = ref(7);

const paginatedReviewProblems = ref(paginatedSrsProblem);
const reviewProblems = computed(() => paginatedReviewProblems.value.content);

const first = ref(0);
watch(first, (newVal) => {
  const newPage = newVal / 5;
  console.warn(newPage);
  // TODO: query for next page
});
// const elementsPerRow = computed(() => paginatedReviewProblems.value.size)
// const totalElements = computed(() => paginatedReviewProblems.value.totalElements)
</script>

<template>
  <TodaysProgress :numerator="completed" :denominator="reviews" />
  <div class="mt-5">
    <h1 class="font-bold text-xl">Review Today</h1>
    <SearchBar />
  </div>
  <div class="mt-5 space-y-2">
    <ProblemCard
      v-for="reviewProblem in reviewProblems"
      :key="reviewProblem.problem.questionFrontendId"
      :problem="reviewProblem.problem"
      :review-date="reviewProblem.nextAttemptAt"
    />
    <div class="flex justify-end">
      <Paginator
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
          '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
          default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        }"
        v-model:first="first"
        :rows="5"
        :totalRecords="30"
        class="text-xs"
      >
      </Paginator>
    </div>
  </div>
</template>
