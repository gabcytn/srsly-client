<script setup lang="ts">
import debounce from "lodash.debounce";
import { watch } from "vue";

const emit = defineEmits(["refresh:problems"]);
const searchModel = defineModel("search", { type: String, required: true });
const activeFilter = defineModel("difficulty", { type: String, required: true });

const filters = ["All", "Easy", "Medium", "Hard"];

function selectFilter(filter: string) {
  if (filter === activeFilter.value) return;
  activeFilter.value = filter;
  emit("refresh:problems");
}

const searchForProblem = debounce(() => {
  emit("refresh:problems");
}, 750);

watch(searchModel, () => {
  searchForProblem();
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
