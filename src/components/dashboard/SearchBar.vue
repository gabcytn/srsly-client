<script setup lang="ts">
import debounce from "lodash.debounce";
import { LoadReviewProblemsKey } from "@/shared/types";
import { inject, watch } from "vue";

const searchModel = defineModel("search", { type: String, required: true });
const activeFilter = defineModel("difficulty", { type: String, required: true });

const filters = ["All", "Easy", "Medium", "Hard"];

const context = inject(LoadReviewProblemsKey);
if (!context) throw new Error("Filter context not found.");
const { loadReviewProblems } = context;

function selectFilter(filter: string) {
  if (filter === activeFilter.value) return;
  activeFilter.value = filter;
  loadReviewProblems(0, filter.toLowerCase(), searchModel.value || undefined);
}

const searchForProblem = debounce((val: string) => {
  loadReviewProblems(0, activeFilter.value.toLowerCase(), val);
}, 750);

watch(searchModel, (val) => {
  searchForProblem(val);
});
</script>

<template>
  <div class="sm:flex gap-3 mt-3">
    <IconField class="grow">
      <InputIcon class="pi pi-search" />
      <InputText
        type="search"
        v-model="searchModel"
        placeholder="Search review problems..."
        size="small"
        class="w-full"
      />
    </IconField>
    <div class="flex gap-1 sm:mt-0 mt-3">
      <SearchFilter
        v-for="(filter, idx) in filters"
        :key="idx"
        :label="filter"
        :selected="filter === activeFilter"
        @click="selectFilter"
      />
    </div>
  </div>
</template>
