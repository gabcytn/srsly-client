<script setup lang="ts">
import type { AiCritique } from "@/shared/types";
import SummaryCritique from "./SummaryCritique.vue";
import CorrectnessCritique from "./CorrectnessCritique.vue";
import ComplexityCritique from "./ComplexityCritique.vue";
import BugsCritique from "./BugsCritique.vue";
import ReadabilityCritique from "./ReadabilityCritique.vue";
import ImprovementCritique from "./ImprovementCritique.vue";

defineProps<{
  critique: AiCritique;
}>();
</script>

<template>
  <div class="note-container rounded-lg p-5 space-y-3 mt-3">
    <SummaryCritique :summary="critique.summary" class="sm:flex max-sm:space-y-3" />
    <div class="sm:flex gap-2 max-sm:space-y-3">
      <CorrectnessCritique
        :correctness="critique.correctness"
        class="sm:w-[50%] grow p-3 rounded-lg"
      />
      <ComplexityCritique
        :complexity="critique.complexity"
        class="sm:w-[50%] grow p-3 rounded-lg"
      />
    </div>
    <div class="sm:flex gap-2 max-sm:space-y-3">
      <ReadabilityCritique
        :readability="critique.readability"
        class="sm:w-[50%] grow p-3 rounded-lg"
      />
      <BugsCritique :bugs="critique.bugs" class="sm:w-[50%] grow p-3 rounded-lg" />
    </div>
    <Divider />
    <div class="sm:flex gap-2 max-sm:space-y-5">
      <ImprovementCritique
        class="sm:w-[50%] grow p-3"
        title="Suggested Changes"
        :improvements="critique.improvements.suggestedChanges"
      />
      <ImprovementCritique
        class="sm:w-[50%] grow p-3"
        title="Alternative Approaches"
        :improvements="critique.improvements.alternativeApproaches"
      />
    </div>
  </div>
</template>
