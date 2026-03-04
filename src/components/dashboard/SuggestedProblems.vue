<script lang="ts" setup>
import { suggestedProblems } from "@/shared/sample-api-response";
import type { Problem } from "@/shared/types";
import { ref } from "vue";
import ProblemCard from "./ProblemCard.vue";

const items = ref<Problem[] | []>(suggestedProblems);
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
