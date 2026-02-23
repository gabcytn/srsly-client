<script setup lang="ts">
import type { Problem } from "@/shared/types";
import addToast from "@/utils/addToast";
import { useToast } from "primevue";
import { ref, watch } from "vue";

const props = defineProps<{
  problem: Problem;
}>();
const model = defineModel("isOpen", { type: Boolean, required: true });
const isLoading = ref(false);
const toast = useToast();
const options = ["Failed / forgotten", "Barely correct", "Correct", "Very easy"];
const keys = ["0-2", "3", "4", "5"];
const selectedGrade = ref<number | null>(null);

function getGradeEquivalentIdx() {
  if (!selectedGrade.value) {
    return -1;
  }
  if (selectedGrade.value <= 2) {
    return 0;
  }
  return selectedGrade.value - 2;
}

function handleClick(idx: number) {
  if (idx < 0 || idx >= 6) {
    throw new Error("ArrayIndexOutOfBounds Exception");
  }
  selectedGrade.value = idx;
}

watch(model, () => {
  resetRating();
});

function resetRating() {
  selectedGrade.value = null;
}

async function onSubmit() {
  if (selectedGrade.value === null) {
    addToast(toast, "error", "Failed", "Select a rating first.", 3000);
    return;
  }
  isLoading.value = true;
  console.warn("submitting...");
  console.warn(props.problem.title);
  console.warn(`grade: ${selectedGrade.value}`);
  await requestSim();
  // TODO: actual API request
  isLoading.value = false;
  model.value = false;
}

async function requestSim() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 1000);
  });
}
</script>

<template>
  <Toast />
  <Dialog v-model:visible="model" modal header="Review" class="max-w-87.5 w-[90%]">
    <h1 class="mb-3">How well did you recall this?</h1>
    <div class="flex justify-center gap-1.5">
      <GradeItem
        v-for="i in 6"
        :key="i"
        :grade="i - 1"
        :selected="selectedGrade === i - 1"
        @click="handleClick(i - 1)"
      />
    </div>
    <Divider />
    <div class="space-y-2 ms-2">
      <div
        v-for="(option, idx) in options"
        :key="idx"
        class="flex items-center gap-1 transition-opacity duration-100"
        :class="{ 'opacity-50': !selectedGrade || idx !== getGradeEquivalentIdx() }"
      >
        <span class="text-xs w-8">{{ keys[idx] }}</span>
        <span
          :class="{
            'opacity-0': !selectedGrade || idx !== getGradeEquivalentIdx(),
          }"
          class="w-0.75 h-0.75 rounded-full bg-primary me-1"
        ></span>
        <span class="text-xs grade-label">{{ option }}</span>
      </div>
    </div>
    <Button
      class="mt-5 w-full"
      label="Submit Rating"
      size="small"
      @click="onSubmit"
      :disabled="selectedGrade === null || isLoading"
    />
  </Dialog>
</template>
