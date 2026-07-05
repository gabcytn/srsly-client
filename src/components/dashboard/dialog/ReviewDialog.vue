<script setup lang="ts">
import { useReviewStore } from "@/stores/review";
import normalizeErrorMessage from "@/utils/errors/normalize-error-message";
import { AxiosError } from "axios";
import { storeToRefs } from "pinia";
import { useToast } from "primevue";
import { ref, watch } from "vue";

const props = defineProps<{ reviewId: number }>();

const reviewStore = useReviewStore();
const isFormSubmitting = ref(false);

const emit = defineEmits(["refresh:data"]);
const isDialogOpen = defineModel("isOpen", { type: Boolean, required: true });
const toast = useToast();
const options = ["Failed / forgotten", "Barely correct", "Correct", "Very easy"];
const keys = ["0-2", "3", "4", "5"];
const selectedGrade = ref<number | null>(null);

function getGradeEquivalentIdx() {
  if (selectedGrade.value === null) {
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

watch(isDialogOpen, resetRating);

function resetRating() {
  selectedGrade.value = null;
}

async function onSubmit() {
  ensureValidReviewId();
  if (selectedGrade.value === null) {
    toast.add({
      severity: "error",
      summary: "Failed",
      detail: "Select a rating first.",
      life: 3000,
    });
    return;
  }

  isFormSubmitting.value = true;
  try {
    emit("refresh:data");
    await reviewStore.handleNonInitialProblemReview(props.reviewId, selectedGrade.value);
    isDialogOpen.value = false;
  } catch (e: unknown) {
    toast.add({
      severity: "error",
      summary: "Failed",
      detail: normalizeErrorMessage(e),
      life: 3000,
    });
  } finally {
    isFormSubmitting.value = false;
  }
}

function ensureValidReviewId() {
  if (props.reviewId <= 0) {
    throw new Error("Invalid review id.");
  }
}
</script>

<template>
  <Dialog v-model:visible="isDialogOpen" modal header="Review" class="max-w-87.5 w-[90%]">
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
        :class="{ 'opacity-50': selectedGrade === null || idx !== getGradeEquivalentIdx() }"
      >
        <span class="text-xs w-8">{{ keys[idx] }}</span>
        <span
          :class="{
            'opacity-0': selectedGrade === null || idx !== getGradeEquivalentIdx(),
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
      :disabled="selectedGrade === null || isFormSubmitting"
    />
  </Dialog>
</template>
