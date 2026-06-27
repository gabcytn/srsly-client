<script setup lang="ts">
import { ProblemKey } from "@/shared/types";
import { useReviewStore } from "@/stores/review";
import isInFuture from "@/utils/is-in-future";
import { Form } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { Dialog, Divider, Message, Rating, Select, ToggleSwitch, useToast } from "primevue";
import { inject, ref } from "vue";
import { useRoute } from "vue-router";
import z from "zod";

const route = useRoute();
const reviewStore = useReviewStore();
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

const resolver = zodResolver(
  z
    .object({
      repetitions: z
        .number("This field is required.")
        .min(0, "This field requires a non-negative integer"),
      confidence: z.union([
        z.object({
          value: z.string().min(1, "Confidence is required."),
        }),
        z.any().refine((_) => false, { message: "Confidence is required." }),
      ]),
      lastReviewedAt: z.date().nullable(),
    })
    .superRefine((data, ctx) => {
      if (data.repetitions === 0) {
        return;
      }

      if (!data.confidence) {
        ctx.addIssue({
          code: "custom",
          message: "Confidence is required.",
          path: ["confidence"],
        });
      }

      if (!data.lastReviewedAt) {
        ctx.addIssue({
          code: "custom",
          message: "Review date is required.",
          path: ["lastReviewedAt"],
        });
        return;
      }

      if (isInFuture(data.lastReviewedAt)) {
        ctx.addIssue({
          code: "custom",
          message: "Review date cannot be from the future.",
          path: ["lastReviewedAt"],
        });
      }
    }),
);

const selectedConfidence = ref();
const confidenceOptions = ref([
  { name: "Low", value: "LOW" },
  { name: "Medium", value: "MEDIUM" },
  { name: "High", value: "HIGH" },
]);

async function onFormSubmit({ valid, values }: { valid: boolean; values: any }) {
  if (!valid) return;
  isSubmitting.value = true;
  try {
    await reviewStore.submitProblemReview(Number(route.params.id), values);
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
</script>

<template>
  <Dialog v-model:visible="model" modal header="Review" class="max-w-125 w-[90%]">
    <Form v-slot="$form" :resolver @submit="onFormSubmit" class="space-y-3">
      <FormField class="flex flex-col gap-2" name="repetitions">
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
      </FormField>
      <Message v-if="$form.repetitions?.invalid" severity="error" size="small" variant="simple">{{
        $form.repetitions?.error.message
      }}</Message>
      <FormField
        v-if="repetitions && repetitions > 0"
        class="flex flex-col gap-2"
        name="confidence"
      >
        <label class="text-xs" for="confidence"
          >How confident are you to remember the solution the right now?
          <span class="text-red-500">*</span></label
        >
        <Select
          v-model="selectedConfidence"
          :options="confidenceOptions"
          size="small"
          optionLabel="name"
          placeholder="Confidence level"
          class="w-full"
        />
      </FormField>
      <Message v-if="$form.confidence?.invalid" severity="error" size="small" variant="simple">{{
        $form.confidence?.error.message
      }}</Message>
      <FormField
        v-if="repetitions && repetitions > 0"
        class="flex flex-col gap-2"
        name="lastReviewedAt"
      >
        <label class="text-xs" for="date"
          >When did you last review this problem? <span class="text-red-500">*</span></label
        >
        <DatePicker name="lastReviewedAt" size="small" :disabled="isSubmitting" />
      </FormField>
      <Message
        v-if="$form.lastReviewedAt?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.lastReviewedAt?.error.message }}</Message
      >

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
