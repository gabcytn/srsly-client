<script setup lang="ts">
import api from "@/api";
import { ProblemKey } from "@/shared/types";
import isInFuture from "@/utils/is-in-future";
import { Form } from "@primevue/forms";
import { Dialog, Divider, Message, Rating, ToggleSwitch, useToast } from "primevue";
import { inject, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const context = inject(ProblemKey);
if (!context) {
  throw new Error("Could not resolve ProblemContext");
}

const { markAsSolved } = context;

const toast = useToast();
const model = defineModel("isOpen", { type: Boolean, required: true });

const repetitions = ref<number>();
const includeSolution = ref(false);
const isSubmitting = ref(false);

type FormError = {
  message: string;
};
type ErrorResolver = {
  repetitions: FormError[];
  confidence: FormError[];
  lastReviewedAt: FormError[];
  title: FormError[];
  code: FormError[];
};

function resolver({ values }: { values: any }) {
  const errors: ErrorResolver = {
    repetitions: [],
    confidence: [],
    lastReviewedAt: [],
    title: [],
    code: [],
  };

  if (values.repetitions === null) {
    errors.repetitions = [{ message: "Repetitions is required." }];
  } else if (values.repetitions < 0) {
    errors.repetitions = [{ message: "Repetitions must be non-zero" }];
  } else if (values.repetitions > 0 && !values.confidence) {
    errors.confidence = [{ message: "Confidence is required." }];
  } else if (values.repetitions > 0 && !values.lastReviewedAt) {
    errors.lastReviewedAt = [{ message: "Date is required." }];
  } else if (isInFuture(values.lastReviewedAt)) {
    errors.lastReviewedAt = [{ message: "Date must not be from the future." }];
  }

  if (includeSolution.value) {
    if (!values.title) {
      errors.title = [{ message: "Title is required." }];
    } else if (!values.code) {
      errors.code = [{ message: "Code is required." }];
    }
  }

  return {
    values,
    errors,
  };
}

async function onFormSubmit({ valid, values }: { valid: boolean; values: any }) {
  if (!valid) return;
  isSubmitting.value = true;
  try {
    await submit(values);
    includeSolution.value = false;
    model.value = false;
    toast.add({
      severity: "success",
      summary: "Form is submitted",
      life: 3000,
    });
    markAsSolved();
  } catch (e: unknown) {
    if (e instanceof Error) {
      toast.add({
        severity: "error",
        summary: "Something went wrong.",
        detail: e.message,
        life: 3000,
      });
    }
  } finally {
    isSubmitting.value = false;
  }
}

async function submit(values: any) {
  const paramId = Number(route.params.id);
  if (!paramId || Number.isNaN(paramId)) {
    throw new Error("Invalid param id");
  }
  const confidences = ["LOW", "MEDIUM", "HIGH"];
  values.lastReviewedAt = new Date(values.lastReviewedAt).toLocaleDateString("en-CA");
  values.confidence = confidences[values.confidence - 1];

  await api.post(`/problems/${paramId}/solutions/initial`, values);
}
</script>

<template>
  <Dialog v-model:visible="model" modal header="Review" class="max-w-125 w-[90%]">
    <Form v-slot="$form" :resolver @submit="onFormSubmit" class="space-y-3">
      <div class="flex flex-col gap-2">
        <label class="text-xs" for="repetitions"
          >How many times have you <strong>reviewed</strong> this problem? (<strong>NOT</strong>
          including first solve) <span class="text-red-500">*</span></label
        >
        <InputNumber
          inputId="repetitions"
          name="repetitions"
          size="small"
          v-model="repetitions"
          :disabled="isSubmitting"
        />
        <Message v-if="$form.repetitions?.invalid" severity="error" size="small" variant="simple">{{
          $form.repetitions?.error.message
        }}</Message>
      </div>
      <div v-if="repetitions && repetitions > 0" class="flex flex-col gap-2">
        <label class="text-xs" for="confidence"
          >How confident are you to remember the solution the right now?
          <span class="text-red-500">*</span></label
        >
        <Rating :stars="3" id="confidence" name="confidence" :disabled="isSubmitting" />
        <Message v-if="$form.confidence?.invalid" severity="error" size="small" variant="simple">{{
          $form.confidence?.error.message
        }}</Message>
      </div>
      <div v-if="repetitions && repetitions > 0" class="flex flex-col gap-2">
        <label class="text-xs" for="date"
          >When did you last review this problem? <span class="text-red-500">*</span></label
        >
        <DatePicker name="lastReviewedAt" size="small" :disabled="isSubmitting" />
        <Message
          v-if="$form.lastReviewedAt?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.lastReviewedAt?.error.message }}</Message
        >
      </div>

      <Divider align="center" type="solid"
        ><span class="text-xs text-light">Solution (optional)</span></Divider
      >

      <div class="flex items-center gap-2">
        <ToggleSwitch v-model="includeSolution" name="" />
        <span class="text-xs text-light">Include your solution</span>
      </div>

      <!-- SOLUTION -->
      <div v-if="includeSolution" class="space-y-3">
        <div class="">
          <label for="title" class="text-xs">Title <span class="text-red-500">*</span></label>
          <InputText
            id="title"
            name="title"
            type="text"
            class="w-full"
            size="small"
            :disabled="isSubmitting"
          />
          <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">
            <span class="text-xs">{{ $form.title.error?.message }}</span>
          </Message>
        </div>
        <div>
          <label for="code" class="text-xs">Code <span class="text-red-500">*</span></label>
          <Textarea
            id="code"
            name="code"
            rows="8"
            class="w-full"
            size="small"
            style="resize: none"
            :disabled="isSubmitting"
          />
          <Message
            v-if="$form.code?.invalid"
            severity="error"
            size="small"
            variant="simple"
            class="text-xs"
          >
            <span class="text-xs">{{ $form.code.error?.message }}</span>
          </Message>
        </div>
        <div>
          <label for="note" class="text-xs">Note (optional)</label>
          <Textarea
            id="note"
            name="note"
            rows="3"
            class="w-full"
            size="small"
            style="resize: none"
            :disabled="isSubmitting"
          />
        </div>
      </div>

      <div>
        <Button
          size="small"
          label="Submit"
          type="submit"
          class="w-full my-3"
          :disabled="isSubmitting"
        />
      </div>
    </Form>
  </Dialog>
</template>
