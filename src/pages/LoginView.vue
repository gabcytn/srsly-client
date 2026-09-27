<script lang="ts" setup>
import OauthOption from "@/components/auth/OauthOption.vue";
import { UserCredentials } from "@/DTO/UserCredentials";
import AuthLayout from "@/layouts/AuthLayout.vue";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { storeToRefs } from "pinia";
import { Divider } from "primevue";
import { reactive } from "vue";
import z from "zod";

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

async function onSubmit({ valid, values }: any) {
  if (!valid) return;

  const userCredentials = new UserCredentials(values.email, values.password);
  await auth.login(userCredentials);
  router.push("/dashboard");
}
</script>
<template>
  <AuthLayout>
    <section class="max-w-120 mx-auto sm:w-[95%] max-sm:w-full sm:p-10 max-sm:p-5">
      <div class="space-y-3">
        <h4 class="font-bold text-sm text-primary tracking-wider">Welcome Back</h4>
        <h2 class="text-5xl font-bold font-cormorant-garamond">Sign in to srsly</h2>
        <p>Pick up right where you left off — your reviews are waiting.</p>
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
            id="email"
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
            size="small"
            class="w-full!"
            :feedback="false"
            toggle-mask
            fluid
            placeholder="******"
          />
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
          class="w-full mt-3 py-5"
          severity="contrast"
        />
      </Form>
      <Divider align="center">
        <span class="text-xs">or continue with</span>
      </Divider>
      <div class="flex gap-2">
        <OauthOption sign-in-method="github" />
        <OauthOption sign-in-method="google" />
      </div>
      <div class="text-center mt-5 text-sm">
        New to srsly?
        <router-link to="/auth/register"><span class="text-primary font-bold">Create an account</span></router-link>
      </div>
    </section>
  </AuthLayout>
</template>
