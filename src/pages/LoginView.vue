<script lang="ts" setup>
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import addToast from "@/utils/addToast";
import { Form } from "@primevue/forms";
import { useToast } from "primevue/usetoast";
import { reactive, ref } from "vue";

const auth = useAuthStore();
const isLoading = ref(false);
const initialValues = reactive({
  email: "",
  password: "",
});
const toast = useToast();

type LoginErrors = {
  email: { message: string }[];
  password: { message: string }[];
};

const resolver = ({ values }) => {
  const errors: LoginErrors = {
    email: [],
    password: [],
  };

  if (!values.email) {
    errors.email = [{ message: "Email is required." }];
  } else if (!values.password) {
    errors.password = [{ message: "Password is required." }];
  }

  return {
    values, // (Optional) Used to pass current form values to submit event.
    errors,
  };
};
async function onFormSubmit({ valid, values }) {
  if (!valid) {
    addToast(toast, "error", "Login Failed", undefined, 3000);
    return;
  }
  try {
    isLoading.value = true;
    await auth.login(values.email, values.password);
    router.push({ path: "/home" });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error occured";
    addToast(toast, "error", "Login Failed", errorMessage, 3000);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <section
    class="max-w-175 mx-auto w-[90%] p-10 mt-10 rounded border border-gray-300 section-container"
  >
    <Toast class="text-xs" />
    <div class="text-center">
      <h1 class="font-bold text-lg">Welcome Back</h1>
      <p class="text-sm">
        Don't have an account?
        <RouterLink to="/auth/register" class="text-primary">Create Today</RouterLink>
      </p>
    </div>
    <Form v-slot="$form" :initial-values :resolver @submit="onFormSubmit" class="space-y-3 mt-3">
      <div>
        <label class="text-sm ps-1" for="email">Email</label>
        <InputText id="email" name="email" type="email" class="w-full" size="small" required />
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
          $form.email.error?.message
        }}</Message>
      </div>
      <div>
        <label class="text-sm ps-1" for="password">Password</label>
        <Password
          id="password"
          name="password"
          size="small"
          class="w-full!"
          :feedback="false"
          toggle-mask
          fluid
          required
        />
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
          $form.password.error?.message
        }}</Message>
      </div>
      <div class="text-right">
        <RouterLink to="/auth/forgot-password" class="text-primary text-sm"
          >Forgot your password?</RouterLink
        >
      </div>
      <Button
        type="submit"
        label="Sign In"
        size="small"
        :disabled="isLoading"
        icon="pi pi-user"
        class="w-full mt-3"
      />
    </Form>
  </section>
</template>

<style scoped lang="css">
.section-container {
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.05);
}
</style>
