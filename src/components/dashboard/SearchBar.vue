<script setup lang="ts">
import { ref } from "vue";

const activeFilter = ref("All");
const filters = ["All", "Easy", "Medium", "Hard"];

const problemSearch = ref("");

function selectFilter(filter: string) {
  activeFilter.value = filter;
}
</script>

<template>
  <div class="sm:flex gap-3 mt-3">
    <IconField class="grow">
      <InputIcon class="pi pi-search" />
      <InputText
        v-model="problemSearch"
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
