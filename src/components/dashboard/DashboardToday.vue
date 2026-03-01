<script setup lang="ts">
import { paginatedSrsProblem } from "@/shared/sample-api-response";
import type { PaginatedSrsProblem, Problem } from "@/shared/types";
import { computed, ref, watch } from "vue";
import ReviewDialog from "./dialog/ReviewDialog.vue";

const completed = ref(3);
const reviews = ref(7);

const paginatedReviewProblems = ref<PaginatedSrsProblem>(paginatedSrsProblem);
const reviewProblems = computed(() => paginatedReviewProblems.value.content);

const first = ref(0);
watch(first, (newVal) => {
  const newPage = newVal / 5;
  console.warn(newPage);
  // TODO: query for next page
});
// const elementsPerRow = computed(() => paginatedReviewProblems.value.size)
// const totalElements = computed(() => paginatedReviewProblems.value.totalElements)

const showReviewDialog = ref(false);
const selectedProblem = ref<Problem | null>(null);

function clickReview(problem: Problem) {
  showReviewDialog.value = true;
  selectedProblem.value = problem;
}

function getSrsId() {
  if (selectedProblem.value) {
    const found = paginatedReviewProblems.value.content.find(
      (p) => p.problem.questionFrontendId === selectedProblem.value?.questionFrontendId,
    );
    if (!found) throw new Error("SRS Problem Not Found.");

    return found.id;
  }

  throw new Error("No Selected Problem Yet.");
}
</script>

<template>
  <TodaysProgress :numerator="completed" :denominator="reviews" />
  <div class="mt-5">
    <h1 class="font-bold text-xl">Review Today</h1>
    <SearchBar />
  </div>
  <div class="mt-5 space-y-2">
    <ReviewDialog v-if="selectedProblem" v-model:is-open="showReviewDialog" :srs-id="getSrsId()" />
    <ProblemCard
      v-for="reviewProblem in reviewProblems"
      :key="reviewProblem.problem.questionFrontendId"
      :problem="reviewProblem.problem"
      :review-date="reviewProblem.nextAttemptAt"
      button-label="Review"
      @click-review="clickReview"
    />
    <p v-if="reviewProblems.length === 0" class="text-center text-sm text-light">
      No problems to review today
    </p>
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
