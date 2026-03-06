<script setup lang="ts">
import type { Solution } from "@/shared/types";
import { Form } from "@primevue/forms";
import { Dialog, InputText, Textarea, useToast } from "primevue";
import { reactive, ref } from "vue";

const props = defineProps<{
  solution: Solution | undefined;
}>();
const emit = defineEmits(["update:solution", "add:solution"]);

const toast = useToast();
const model = defineModel("isOpen", { type: Boolean, required: true });
const initialValues = reactive({
  title: props.solution?.title ?? "",
  code: props.solution?.code ?? "",
  note: props.solution?.note ?? "",
});
const isSubmitting = ref(false);

function resolver({ values }: { values: any }) {
  const errors: any = {};

  if (!values.title) {
    errors.title = [{ message: "Title is required." }];
  } else if (!values.code && !isCodeDisabled()) {
    errors.code = [{ message: "Code is required." }];
  }

  return {
    values,
    errors,
  };
}

async function onFormSubmit({ valid, values }: { valid: boolean; values: any }) {
  if (!valid) return;
  try {
    isSubmitting.value = true;
    await solutionNetworkRequest(values);
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Form is submitted.",
      life: 3000,
    });
    model.value = false;
  } catch (e: unknown) {
    toast.add({
      severity: "error",
      summary: "Something went wrong",
      detail: e instanceof Error ? e.message : "Unknown error occured",
      life: 3000,
    });
    console.error(e);
  } finally {
    isSubmitting.value = false;
  }
}

async function solutionNetworkRequest(values: any) {
  if (props.solution) {
    emit("update:solution", {
      ...values,
      id: props.solution.id,
      aiCritique: props.solution.aiCritique,
    } as Solution);
  } else {
    emit("add:solution", {
      ...values,
      id: crypto.randomUUID(),
    });
  }
}

function isCodeDisabled() {
  if (!props.solution) return false;
  if (props.solution.aiCritique) return true;
  return false;
}
</script>

<template>
  <Dialog
    v-model:visible="model"
    modal
    :header="solution ? 'Edit Solution' : 'Add Solution'"
    class="max-w-100 w-[90%]"
  >
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="space-y-2">
      <div class="">
        <label for="title" class="text-sm">Title <span class="text-red-500">*</span></label>
        <InputText id="title" name="title" type="text" class="w-full" size="small" />
        <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">
          <span class="text-xs">{{ $form.title.error?.message }}</span>
        </Message>
      </div>
      <div>
        <label for="code" class="text-sm">Code <span class="text-red-500">*</span></label>
        <Textarea
          id="code"
          name="code"
          rows="8"
          class="w-full"
          size="small"
          style="resize: none"
          :disabled="isCodeDisabled()"
          :title="isCodeDisabled() ? 'Code is not modifiable if already critiqued by AI' : ''"
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
        <label for="note" class="text-sm">Note (optional)</label>
        <Textarea id="note" name="note" rows="3" class="w-full" size="small" style="resize: none" />
      </div>
      <div class="mt-5">
        <Button label="Submit" class="w-full" size="small" type="submit" :disabled="isSubmitting" />
      </div>
    </Form>
  </Dialog>
</template>
