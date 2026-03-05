<script setup lang="ts">
import type { PaginatedSrsProblem, Problem } from "@/shared/types";
import { computed, ref, watch } from "vue";
import ReviewDialog from "./dialog/ReviewDialog.vue";
import SearchBar from "./SearchBar.vue";

const props = defineProps<{
  problems: PaginatedSrsProblem;
}>();
const emit = defineEmits(["update:problems-page", "increment:progress"]);

const showReviewDialog = ref(false);
const selectedProblem = ref<Problem>();

const activeFilter = ref("All");
const problemSearch = ref("");

const reviewProblems = computed(() => props.problems.content);

const first = ref(0);
watch(first, (newVal) => {
  if (problemSearch.value !== "" || activeFilter.value !== "All") {
    return; // prevents disregarding filter
  }
  const newPage = newVal / 5;
  emit("update:problems-page", newPage);
});
const rows = computed(() => props.problems.size);
const totalRecords = computed(() => props.problems.totalElements);

function clickReview(problem: Problem) {
  selectedProblem.value = problem;
  showReviewDialog.value = true;
}

function getSrsId() {
  if (selectedProblem.value) {
    const found = reviewProblems.value.find(
      (p) => p.problem.questionFrontendId === selectedProblem.value?.questionFrontendId,
    );
    if (!found) throw new Error("SRS Problem Not Found.");

    return found.id;
  }

  throw new Error("No Selected Problem Yet.");
}

function handleReview() {
  selectedProblem.value = undefined; // unselect reviewed problem
  emit("update:problems-page", 0);
  emit("increment:progress");
}
</script>

<template>
  <div class="mt-5">
    <h1 class="font-bold text-xl">Review Today</h1>
    <SearchBar v-model:search="problemSearch" v-model:difficulty="activeFilter" />
  </div>
  <div class="mt-5 space-y-2">
    <ReviewDialog
      v-if="selectedProblem"
      v-model:is-open="showReviewDialog"
      :srs-id="getSrsId()"
      @refresh:data="handleReview"
    />
    <ProblemCard
      v-for="reviewProblem in reviewProblems"
      :key="reviewProblem.problem.srsId"
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
        :rows
        :totalRecords
        class="text-xs"
      >
      </Paginator>
    </div>
  </div>
</template>
