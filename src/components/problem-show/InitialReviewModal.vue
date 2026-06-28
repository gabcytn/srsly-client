<script setup lang="ts">
import { ProblemKey } from "@/shared/types";
import { useReviewStore } from "@/stores/review";
import isInFuture from "@/utils/is-in-future";
import { Form } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { storeToRefs } from "pinia";
import { Dialog, Divider, Message, Select, ToggleSwitch, useToast } from "primevue";
import { inject, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import z from "zod";

const route = useRoute();
const reviewStore = useReviewStore();
const { isLoading } = storeToRefs(reviewStore);
const context = inject(ProblemKey);
if (!context) {
  throw new Error("Could not resolve ProblemContext");
}

const { markAsSolved } = context;

const toast = useToast();
const isDialogOpen = defineModel("isOpen", { type: Boolean, required: true });

const initialValues = reactive({
  confidence: null,
  lastReviewedAt: null,
  includeSolution: false,
  title: "",
  code: "",
  note: "",
});
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
      ]).nullable(),
      lastReviewedAt: z.date().nullable(),
      includeSolution: z.boolean(),
      title: z.string().min(1, "Title is required.").nullable(),
      code: z.string().min(1, "Code is required.").nullable(),
      note: z.string().nullable(),
    })
    .superRefine((data, ctx) => {
      if (data.repetitions === 0) {
        return;
      }

      if (!data.confidence) {
        console.warn(`reps; ${data.repetitions}`);
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

      if (!data.includeSolution) {
        return;
      }

      if (!data.title) {
        ctx.addIssue({
          code: "custom",
          message: "Solution title is required.",
          path: ["title"],
        });
      }

      if (!data.code) {
        ctx.addIssue({
          code: "custom",
          message: "Solution code is required.",
          path: ["code"],
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
  try {
    await reviewStore.submitProblemReview(Number(route.params.id), values);
    isDialogOpen.value = false;
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
  }
}
</script>

<template>
  <Dialog v-model:visible="isDialogOpen" modal header="Review" class="max-w-125 w-[90%]">
    <Form v-slot="$form" :resolver @submit="onFormSubmit" :initialValues class="space-y-3">
      <FormField class="flex flex-col gap-2" name="repetitions">
        <label class="text-xs" for="repetitions"
          >How many times have you <strong>reviewed</strong> this problem? (<strong>NOT</strong>
          including first solve) <span class="text-red-500">*</span></label
        >
        <InputNumber inputId="repetitions" name="repetitions" size="small" />
      </FormField>
      <Message v-if="$form.repetitions?.invalid" severity="error" size="small" variant="simple">{{
        $form.repetitions?.error.message
      }}</Message>
      <FormField
        v-if="$form.repetitions && $form.repetitions.value > 0"
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
        v-if="$form.repetitions && $form.repetitions.value > 0"
        class="flex flex-col gap-2"
        name="lastReviewedAt"
      >
        <label class="text-xs" for="date"
          >When did you last review this problem? <span class="text-red-500">*</span></label
        >
        <DatePicker name="lastReviewedAt" size="small" :disabled="isLoading" />
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

      <FormField name="includeSolution" class="flex items-center gap-2">
        <ToggleSwitch />
        <span class="text-xs text-light">Include your solution</span>
      </FormField>

      <!-- SOLUTION -->
      <div v-if="$form.includeSolution?.value" class="space-y-3">
        <FormField name="title">
          <label for="title" class="text-xs">Title <span class="text-red-500">*</span></label>
          <InputText id="title" type="text" class="w-full" size="small" />
          <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">
            <span class="text-xs">{{ $form.title.error?.message }}</span>
          </Message>
        </FormField>
        <FormField name="code">
          <label for="code" class="text-xs">Code <span class="text-red-500">*</span></label>
          <Textarea id="code" rows="8" class="w-full" size="small" style="resize: none" />
          <Message
            v-if="$form.code?.invalid"
            severity="error"
            size="small"
            variant="simple"
            class="text-xs"
          >
            <span class="text-xs">{{ $form.code.error?.message }}</span>
          </Message>
        </FormField>
        <FormField name="note">
          <label for="note" class="text-xs">Note (optional)</label>
          <Textarea id="note" rows="3" class="w-full" size="small" style="resize: none" />
        </FormField>
      </div>

      <div>
        <Button
          size="small"
          label="Submit"
          type="submit"
          class="w-full my-3"
          :disabled="isLoading"
        />
      </div>
    </Form>
  </Dialog>
</template>
