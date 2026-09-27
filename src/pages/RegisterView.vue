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
    <section class="max-w-120 mx-auto sm:w-[95%] max-sm:w-full sm:p-10 max-sm:p-5">
      <div class="space-y-3">
        <h4 class="font-bold text-sm text-primary tracking-wider">Get Started</h4>
        <h2 class="text-5xl font-bold font-cormorant-garamond">Create your account</h2>
        <p>Stop grinding new questions. Start retaining the ones you've solved.</p>
      </div>
      <Form
        :initial-values
        :resolver
        @submit="onSubmit"
        :validate-on-value-update="false"
        class="space-y-3 mt-5"
      >
        <FormField v-slot="$field" name="email">
          <label class="text-sm ps-1">Email</label>
          <InputText
            type="email"
            class="w-full bg-white"
            size="small"
            placeholder="you@example.com"
          />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
            $field.error?.message
          }}</Message>
        </FormField>
        <FormField v-slot="$field" name="password">
          <label class="text-sm ps-1">Password</label>
          <Password
            id="password"
            size="small"
            class="w-full!"
            :feedback="false"
            toggle-mask
            fluid
            placeholder="At least 8 characters"
          />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
            $field.error?.message
          }}</Message>
        </FormField>
        <FormField v-slot="$field" name="confirmPassword">
          <label class="text-sm ps-1">Confirm Password</label>
          <Password
            size="small"
            class="w-full!"
            :feedback="false"
            toggle-mask
            fluid
            placeholder="Repeat your password"
          />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
            $field.error?.message
          }}</Message>
        </FormField>
        <Button
          type="submit"
          label="Create account"
          size="small"
          severity="contrast"
          :disabled="isFormSubmitting"
          icon="pi pi-user"
          class="w-full mt-3"
        />
        <div class="text-center mt-5 text-sm">
          Already have an account?
          <router-link to="/auth/login"
            ><span class="text-primary font-bold">Sign in</span></router-link
          >
        </div>
      </Form>
    </section>
  </AuthLayout>
</template>
