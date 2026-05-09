<script setup lang="ts">
import { UserCredentials } from "@/DTO/UserCredentials";
import AuthLayout from "@/layouts/AuthLayout.vue";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { FormField } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import z from "zod";

const props = defineProps<{
  title: string;
  subTitle: string;
  linkText: string;
  action: "login" | "register";
}>();

const initialValues = reactive({
  email: "",
  password: "",
});

const resolver = zodResolver(
  z.object({
    email: z.email(),
    password: z.string().min(1, { message: "Password is required." }),
  }),
);

const auth = useAuthStore();
const { isFormSubmitting } = storeToRefs(auth);

async function onSubmit({ valid, values }) {
  if (!valid) return;

  const userCredentials = new UserCredentials(values.email, values.password);
  await auth.onFormSubmit(props.action, userCredentials);
  router.push("/dashboard");
}
</script>

<template>
  <AuthLayout>
    <section
      class="max-w-120 mx-auto sm:w-[95%] max-sm:w-full sm:p-10 max-sm:p-5 bg-[#FEFEFE] dark:bg-[#1A1A1A] rounded-xl section-container"
    >
      <div class="text-center">
        <h1 class="font-bold text-lg">{{ title }}</h1>
        <p class="text-sm">
          {{ subTitle }}
          <RouterLink
            :to="`/auth/${action === 'login' ? 'register' : 'login'}`"
            class="text-primary"
            >{{ linkText }}</RouterLink
          >
        </p>
      </div>
      <Form
        v-slot="$form"
        :initial-values
        :resolver
        @submit="onSubmit"
        :validate-on-value-update="false"
        class="space-y-3 mt-3"
      >
        <FormField v-slot="$field" name="email">
          <label class="text-sm ps-1">Email</label>
          <InputText id="email" type="email" class="w-full bg-white" size="small" />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
            $field.error?.message
          }}</Message>
        </FormField>
        <FormField v-slot="$field" name="password">
          <label class="text-sm ps-1">Password</label>
          <Password size="small" class="w-full!" :feedback="false" toggle-mask fluid />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
            $field.error?.message
          }}</Message>
        </FormField>
        <div v-if="action === 'register'">
          <label class="text-sm ps-1" for="confirm">Confirm Password</label>
          <Password
            id="confirm"
            name="confirm"
            size="small"
            class="w-full!"
            :feedback="false"
            toggle-mask
            fluid
            required
          />
          <Message v-if="$form.confirm?.invalid" severity="error" size="small" variant="simple">{{
            $form.confirm.error?.message
          }}</Message>
        </div>
        <Button
          type="submit"
          label="Sign In"
          size="small"
          :disabled="isFormSubmitting"
          icon="pi pi-user"
          class="w-full mt-3"
        />
      </Form>
    </section>
  </AuthLayout>
</template>

<style scoped lang="css">
.section-container {
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.05);
}
</style>
