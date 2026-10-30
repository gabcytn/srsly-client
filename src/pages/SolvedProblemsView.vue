<script setup lang="ts">
import SkeletonLoader from "@/components/problem-show/SkeletonLoader.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import { useProblemsStore } from "@/stores/problems";
import { storeToRefs } from "pinia";
import { Column, DataTable, InputText, Select } from "primevue";
import { computed, onMounted, ref, watch } from "vue";
import router from "@/router";
import DifficultyTag from "@/components/DifficultyTag.vue";
import getMonthAndDate from "@/utils/get-month-and-date";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import z from "zod";
import isNumeric from "@/utils/is-numeric";

const problemsStore = useProblemsStore();
const { isLoading, solvedProblems } = storeToRefs(problemsStore);

const paginationPage = ref(0);
const rows = computed(() => solvedProblems.value?.size);
const totalRecords = computed(() => solvedProblems.value?.totalElements);

watch(paginationPage, async (newPage) => {
  const page = newPage / (rows.value ?? 1);
  await problemsStore.getSolved(page);
});

const difficulties = ref([
  { name: "Any difficulty", value: "all" },
  { name: "Easy", value: "easy" },
  { name: "Medium", value: "medium" },
  { name: "Hard", value: "hard" },
]);

const initialValues = ref({
  searchInput: "",
  difficulty: difficulties.value[0],
});

const resolver = zodResolver(
  z.object({
    searchInput: z.string(),
    difficulty: z.object(
      { name: z.string(), value: z.string() },
      { message: "Difficulty is required." },
    ),
  }),
);

async function submitProblemSearch({ valid, values }: any) {
  if (!valid) {
    return;
  }

  if (isNumeric(values.searchInput)) {
    router.push(`/problems/${values.searchInput}`);
    return;
  }

  await problemsStore.getSolved(0, values.difficulty.value, values.searchInput);
}

onMounted(async () => {
  await problemsStore.getSolved();
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
      >
        <template #empty>
          <div class="p-3 text-center">No records found.</div>
        </template>
        <template #header>
          <h1 class="text-xl mb-5">Solved Problems</h1>
          <Form :resolver :initialValues @submit="submitProblemSearch" class="flex gap-2">
            <FormField name="searchInput" class="w-[60%]">
              <IconField class="w-full">
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText
                  size="small"
                  placeholder="Search by title or type the ID to open a problem"
                  fluid
                />
              </IconField>
            </FormField>
            <FormField name="difficulty" class="w-[40%]">
              <Select
                size="small"
                :options="difficulties"
                optionLabel="name"
                placeholder="Select a Difficulty"
                fluid
                class="w-full"
              />
            </FormField>
          </Form>
        </template>
        <Column field="problem.questionFrontendId" style="width: 5%"></Column>
        <Column field="problem.title" header="Title" sortable style="width: 25%"></Column>
        <Column field="problem.difficulty" header="Difficulty" style="width: 10%">
          <template #body="slot">
            <DifficultyTag :label="slot.data.problem.difficulty" />
          </template>
        </Column>
        <Column field="reviewDetails.status" header="Status" style="width: 15%"></Column>
        <Column field="solvedAt" header="Solved At" sortable style="width: 15%">
          <template #body="slot">
            <span>{{ getMonthAndDate(slot.data.solvedAt) }}</span>
          </template>
        </Column>
        <Column
          field="reviewDetails.nextAttemptAt"
          sortable
          header="Next Review"
          style="width: 15%"
        >
          <template #body="slot">
            <span v-if="slot.data.reviewDetails">{{
              getMonthAndDate(slot.data.reviewDetails.nextAttemptAt)
            }}</span>
          </template>
        </Column>
        <Column style="width: 15%">
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
