<script setup lang="ts">
import SkeletonLoader from "@/components/problem-show/SkeletonLoader.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import { FilterMatchMode } from "@primevue/core/api";
import { useProblemsStore } from "@/stores/problems";
import { storeToRefs } from "pinia";
import { Column, DataTable } from "primevue";
import { computed, onMounted, ref, watch } from "vue";
import router from "@/router";
import DifficultyTag from "@/components/DifficultyTag.vue";
import getMonthAndDate from "@/utils/get-month-and-date";

const problemsStore = useProblemsStore();
const { isLoading, solvedProblems } = storeToRefs(problemsStore);

const paginationPage = ref(0);
const rows = computed(() => solvedProblems.value?.size);
const totalRecords = computed(() => solvedProblems.value?.totalElements);

async function init() {
  await problemsStore.getSolved();
}

const filters = ref({
  global: {
    value: null,
    matchMode: FilterMatchMode.CONTAINS,
  },
});

onMounted(init);

watch(paginationPage, async (newPage) => {
  const page = newPage / (rows.value ?? 1);
  console.warn(`page: ${page}`);
  await problemsStore.getSolved(page);
});
</script>

<template>
  <AppLayout>
    <SkeletonLoader v-if="isLoading" />
    <div v-if="!isLoading && solvedProblems" class="card">
      <DataTable
        :value="solvedProblems.content"
        :rows="1"
        :total-records="4"
        table-style="min-width: 50rem"
        v-model:filters="filters"
        :global-filter-fields="['problem.title']"
      >
        <template #header>
          <div class="flex justify-end">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
            </IconField>
          </div>
        </template>
        <Column field="problem.title" header="Title" style="width: 25%"></Column>
        <Column field="problem.difficulty" header="Difficulty" style="width: 15%">
          <template #body="slot">
            <DifficultyTag :label="slot.data.problem.difficulty" />
          </template>
        </Column>
        <Column field="reviewDetails.status" header="Status" style="width: 15%"></Column>
        <Column field="solvedAt" header="Solved At" style="width: 15%">
          <template #body="slot">
            <span>{{ getMonthAndDate(slot.data.solvedAt) }}</span>
          </template>
        </Column>
        <Column field="reviewDetails.nextAttemptAt" header="Next Review" style="width: 15%">
          <template #body="slot">
            <span v-if="slot.data.reviewDetails">{{
              getMonthAndDate(slot.data.reviewDetails.nextAttemptAt)
            }}</span>
          </template>
        </Column>
        <Column header="Action" style="width: 15%">
          <template #body="slot">
            <Button
              icon="pi pi-eye"
              variant="outlined"
              rounded
              class="mr-2"
              @click="router.push(`/problems/${slot.data.problem.questionFrontendId}`)"
            />
            <a :href="slot.data.problem.url" target="_blank">
              <Button
                icon="pi pi-external-link"
                severity="info"
                variant="outlined"
                rounded
                class="mr-2"
                link
            /></a>
          </template>
        </Column>
      </DataTable>

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
  </AppLayout>
</template>
