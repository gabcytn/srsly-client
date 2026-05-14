<script lang="ts" setup>
import { UserCredentials } from "@/DTO/UserCredentials";
import AuthLayout from "@/layouts/AuthLayout.vue";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import z from "zod";

const initialValues = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});

const resolver = zodResolver(
  z
    .object({
      email: z.email(),
      password: z.string().min(1, { message: "Password is required." }),
      confirmPassword: z.string().min(1, { message: "Password confirmation is required." }),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Passwords do not match",
          path: ["confirmPassword"],
        });
      }
    }),
);

const auth = useAuthStore();
const { isFormSubmitting } = storeToRefs(auth);

async function onSubmit({ valid, values }: any) {
  if (!valid) return;

  const userCredentials = new UserCredentials(values.email, values.password);
  await auth.register(userCredentials);
  router.push("/dashboard");
}
</script>

<template>
  <AuthLayout>
    <section
      class="max-w-120 mx-auto sm:w-[95%] max-sm:w-full sm:p-10 max-sm:p-5 bg-[#FEFEFE] dark:bg-[#1A1A1A] rounded-xl section-container"
    >
      <div class="text-center">
        <h1 class="font-bold text-lg">Sign Up</h1>
        <p class="text-sm">
          Already have an account?
          <RouterLink to="/auth/login" class="text-primary">Login</RouterLink>
        </p>
      </div>
      <Form
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
        <FormField v-slot="$field" name="confirmPassword">
          <label class="text-sm ps-1">Confirm Password</label>
          <Password size="small" class="w-full!" :feedback="false" toggle-mask fluid />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
            $field.error?.message
          }}</Message>
        </FormField>
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
