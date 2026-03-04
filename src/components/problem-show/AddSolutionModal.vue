<script setup lang="ts">
import { Form } from "@primevue/forms";
import { Dialog, InputText, Textarea, useToast } from "primevue";
import { reactive, ref } from "vue";

const toast = useToast();
const model = defineModel("isOpen", { type: Boolean, required: true });
const initialValues = reactive({
  title: "",
  code: "",
  notes: "",
});
const isSubmitting = ref(false);

function resolver({ values }: { values: any }) {
  const errors: any = {};

  if (!values.title) {
    errors.title = [{ message: "Title is required." }];
  } else if (!values.code) {
    errors.code = [{ message: "Code is required." }];
  }

  return {
    values,
    errors,
  };
}

async function onFormSubmit({ valid }: { valid: boolean }) {
  if (valid) {
    isSubmitting.value = true;
    await simulateSubmit();
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Form is submitted.",
      life: 3000,
    });
    model.value = false;
  }
}

async function simulateSubmit() {
  return new Promise((resolve) => {
    setTimeout(() => {
      isSubmitting.value = false;
      resolve("Done");
    }, 1000);
  });
}
</script>

<template>
  <Dialog v-model:visible="model" modal header="Add Solution" class="max-w-100 w-[90%]">
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
        <Textarea id="code" name="code" rows="8" class="w-full" size="small" style="resize: none" />
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
