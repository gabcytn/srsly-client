<script setup lang="ts">
import AuthLayout from "@/layouts/AuthLayout.vue";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { useToast } from "primevue";
import { ref } from "vue";

const props = defineProps<{
  title: string;
  subTitle: string;
  linkText: string;
  action: "login" | "register";
}>();

const auth = useAuthStore();
const isLoading = ref(false);
const toast = useToast();

type FormErrors = {
  email: { message: string }[];
  password: { message: string }[];
  confirm: { message: string }[];
};

const resolver = ({ values }: { values: any }) => {
  const errors: FormErrors = {
    email: [],
    password: [],
    confirm: [],
  };

  if (!values.email) {
    errors.email = [{ message: "Email is required." }];
  } else if (!values.password) {
    errors.password = [{ message: "Password is required." }];
  } else if (props.action === "register" && values.password.length < 8) {
    errors.password = [{ message: "Password must be at least 8 characters." }];
  } else if (!values.confirm) {
    errors.confirm = [{ message: "Confirm Password is required." }];
  } else if (values.confirm !== values.password) {
    errors.confirm = [{ message: "Passwords do not match." }];
  }

  return {
    values,
    errors,
  };
};
async function onFormSubmit({ valid, values }: { valid: boolean; values: any }) {
  if (!valid) {
    toast.add({
      severity: "error",
      summary: "Login Failed",
      life: 3000,
    });
    return;
  }
  try {
    isLoading.value = true;
    await submit(values.email, values.password);
    router.push({ path: "/dashboard" });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error occured";
    toast.add({
      severity: "error",
      summary: "Login Failed",
      detail: errorMessage,
      life: 3000,
    });
  } finally {
    isLoading.value = false;
  }
}

async function submit(email: string, password: string) {
  if (props.action === "login") {
    await auth.login(email, password);
  } else if (props.action === "register") {
    await auth.register(email, password);
  } else {
    throw new Error("Invalid props value.");
  }
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
      <Form v-slot="$form" :resolver @submit="onFormSubmit" class="space-y-3 mt-3">
        <div>
          <label class="text-sm ps-1" for="email">Email</label>
          <InputText
            id="email"
            name="email"
            type="email"
            class="w-full bg-white"
            size="small"
            required
          />
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
          :disabled="isLoading"
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
