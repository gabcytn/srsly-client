<script setup lang="ts">
import api from "@/api";
import ProblemCard from "@/components/dashboard/ProblemCard.vue";
import SkeletonLoader from "@/components/problem-show/SkeletonLoader.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import router from "@/router";
import type { PaginatedProblem } from "@/shared/types";
import { IconField, InputIcon, useToast } from "primevue";
import { computed, onMounted, ref, watch } from "vue";

const toast = useToast();
const isLoading = ref(false);
const search = ref();
const paginationPage = ref(0);
const problems = ref<PaginatedProblem>();
const rows = computed(() => problems.value?.size);
const totalRecords = computed(() => problems.value?.totalElements);

async function fetchProblems(page: number): Promise<PaginatedProblem> {
  const data = (await api.get(`/problems?page=${page}`)) as PaginatedProblem;
  return data;
}

function onFormSubmit({ values }: { values: any }) {
  if (!values.search) return;
  if (Number.isNaN(values.search)) return;
  router.push(`/problems/${values.search}`);
}

async function loadProblems(page = 0) {
  try {
    isLoading.value = true;
    const data = await fetchProblems(page);
    problems.value = data;
  } catch (e: unknown) {
    toast.add({
      severity: "error",
      summary: "Something went wrong",
      detail: e instanceof Error ? e.message : "Unknown error occured",
    });
  } finally {
    isLoading.value = false;
  }
}

watch(paginationPage, (val) => {
  const newPage = val / (rows.value || 1);
  loadProblems(newPage);
});

onMounted(loadProblems);
</script>

<template>
  <AppLayout>
    <SkeletonLoader v-if="isLoading" />
    <section v-else class="space-y-5 my-3">
      <Form @submit="onFormSubmit" class="sm:flex sm:gap-2 max-sm:space-y-3">
        <IconField class="grow">
          <InputIcon class="pi pi-search" />
          <InputNumber
            name="search"
            v-model="search"
            class="w-full"
            placeholder="Search LeetCode ID"
            size="small"
          />
        </IconField>
        <Button type="submit" size="small" label="Search" class="max-sm:w-full" />
      </Form>
      <div class="space-y-3">
        <ProblemCard
          v-for="problem in problems?.content"
          :problem
          :key="problem.questionFrontendId"
        />
      </div>

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
    </section>
  </AppLayout>
</template>
