<script setup lang="ts">
import type { PaginatedReviewProblem, Problem, ProblemSearchQuery } from "@/shared/types";
import { computed, ref, watch } from "vue";
import ReviewDialog from "./dialog/ReviewDialog.vue";
import SearchBar from "./SearchBar.vue";
import { useReviewStore } from "@/stores/review";

const props = defineProps<{ problems: PaginatedReviewProblem }>();
const reviewStore = useReviewStore();

const reviewProblems = computed(() => props.problems.content);
const selectedProblemForReview = ref<Problem>();
const selectedReviewProblemId = computed(() => getReviewProblemId());

const showReviewDialog = ref(false);

/** Problem Search Filters */
const activeFilter = ref("All");
const problemSearch = ref("");
const paginationPage = ref(0);

/** Pagination Metadata */
const rows = computed(() => props.problems.size);
const totalRecords = computed(() => props.problems.totalElements);

function handleClickOnReviewButton(problem: Problem) {
  selectedProblemForReview.value = problem;
  showReviewDialog.value = true;
}

function getReviewProblemId() {
  if (!selectedProblemForReview.value) {
    return -1;
  }

  const found = reviewProblems.value.find(
    (p) => p.problem.questionFrontendId === selectedProblemForReview.value?.questionFrontendId,
  );

  if (!found) {
    throw new Error("SRS Problem Not Found. AYO");
  }

  return found.id;
}

function handleReview() {
  unselectReviewedProblem();
  reviewStore.loadReviewProblems();
  reviewStore.incrementProgress();
}

function unselectReviewedProblem() {
  selectedProblemForReview.value = undefined;
}

function refreshReviewProblems(page = 0) {
  const searchQuery: ProblemSearchQuery = {
    page,
    difficulty: activeFilter.value.toLowerCase(),
    title: problemSearch.value.trim(),
  };

  reviewStore.loadReviewProblems(searchQuery);
}

watch(paginationPage, (newVal) => {
  const newPage = newVal / 5;
  refreshReviewProblems(newPage);
});

watch(showReviewDialog, (isOpen) => {
  if (!isOpen) {
    unselectReviewedProblem();
  }
});

watch(selectedProblemForReview, () => console.warn(selectedReviewProblemId.value));
</script>

<template>
  <div class="mt-5">
    <h1 class="font-bold text-xl">Review Today</h1>
    <SearchBar
      v-model:search="problemSearch"
      v-model:difficulty="activeFilter"
      @refresh:problems="refreshReviewProblems"
    />
  </div>
  <div class="mt-5 space-y-2">
    <ReviewDialog
      v-model:is-open="showReviewDialog"
      :review-id="selectedReviewProblemId"
      @refresh:data="handleReview"
    />
    <ProblemCard
      v-for="reviewProblem in reviewProblems"
      :key="reviewProblem.problem.srsId"
      :problem="reviewProblem.problem"
      :review-date="reviewProblem.nextAttemptAt"
      button-label="Review"
      @click-review="handleClickOnReviewButton"
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
        v-model:first="paginationPage"
        :rows
        :totalRecords
        class="text-xs"
      >
      </Paginator>
    </div>
  </div>
</template>
