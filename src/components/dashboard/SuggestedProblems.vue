<script lang="ts" setup>
import type { Problem } from "@/shared/types";
import { onMounted, ref } from "vue";
import ProblemCard from "./ProblemCard.vue";
import api from "@/api";
import { useToast } from "primevue";

const toast = useToast();
const items = ref<Problem[]>([]);

onMounted(async () => {
  try {
    const data = (await api.get("/problems/suggested")) as Problem[];
    items.value = data;
  } catch (e: unknown) {
    toast.add({
      severity: "error",
      summary: "Something went wrong.",
      detail: e instanceof Error ? e.message : "Unknown error occured",
      life: 3000,
    });
  }
});
</script>

<template>
  <div class="flex justify-between items-end mt-5">
    <h1 class="font-bold text-xl">Suggested</h1>
    <p class="text-light text-xs">Problems solved by other users</p>
  </div>
  <div class="mt-5 mb-10 space-y-2">
    <ProblemCard v-for="item in items" :key="item.questionFrontendId" :problem="item" />
    <p v-if="items.length === 0" class="text-center text-sm text-light mt-3">
      There are no other problems in store for you. Come back again tomorrow.
    </p>
  </div>
</template>
