<script setup lang="ts">
import type { Problem } from "@/shared/types";
import DifficultyTag from "../DifficultyTag.vue";
import ProblemTag from "../ProblemTag.vue";
import { ref } from "vue";
import InitialReviewModal from "./InitialReviewModal.vue";
import isNow from "@/utils/is-now";
import ReviewDialog from "../dashboard/dialog/ReviewDialog.vue";

const props = defineProps<{
  problem: Problem;
  refreshProblem: () => void;
}>();

const initialReviewModalOpen = ref(false);
const reviewNowModalOpen = ref(false);

function reviewButtonPresent() {
  const p = props.problem;
  return p.isSolved && p.nextAttemptAt && isNow(p.nextAttemptAt);
}
</script>
<template>
  <div class="mt-5">
    <div class="flex gap-2">
      <span class="sm:inline font-jetbrains-mono text-sm text-light"
        >#{{ problem.questionFrontendId }}</span
      >
      <DifficultyTag :label="problem?.difficulty" />
    </div>

    <div class="flex justify-between items-center">
      <h1 class="font-bold text-3xl mt-3">{{ problem?.title }}</h1>
      <Button
        v-if="!problem.isSolved"
        label="Start Reviewing"
        size="small"
        @click="initialReviewModalOpen = true"
      />
      <Button
        v-if="reviewButtonPresent()"
        label="Review"
        size="small"
        @click="reviewNowModalOpen = true"
      />
      <InitialReviewModal v-if="!problem.isSolved" v-model:is-open="initialReviewModalOpen" />
      <ReviewDialog
        v-if="problem.srsId && reviewButtonPresent()"
        :srs-id="problem.srsId"
        :is-from-problem-show="true"
        @refresh:data="refreshProblem"
        v-model:is-open="reviewNowModalOpen"
      />
    </div>

    <div class="flex flex-wrap gap-1.25 mt-3">
      <ProblemTag v-for="(tag, idx) in problem.topicTags" :label="tag.name" :key="idx" />
    </div>

    <div class="mt-3 mb-8">
      <a
        :href="problem.url"
        target="_blank"
        class="text-xs opacity-50 hover:opacity-80 pb-1 border-b border-b-surface-400"
        >View in LeetCode <span class="ms-1 pi pi-external-link" style="font-size: 0.65rem"></span
      ></a>
    </div>

    <Divider />

    <div class="problem-content mb-8" v-html="problem.content"></div>

    <Divider />
  </div>
</template>

<style lang="css">
pre {
  background-color: #202020;
  color: #eee;
  padding: 0.75rem;
  border-radius: 0.5rem;

  font-family: monospace;
  font-size: 0.85rem;
}
.problem-content p,
.problem-content strong {
  font-size: 0.95rem;
}
.problem-content ul {
  list-style-type: disc;
  margin-left: 1rem;
}

.problem-content li {
  margin-top: 0.9rem;
}

.problem-content li code {
  background-color: var(--constraint);
  padding: 0.5rem;
  font-size: 0.8rem;
  border-radius: 0.25rem;
}
</style>
