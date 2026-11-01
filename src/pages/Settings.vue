<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ToggleSwitch from "primevue/toggleswitch";
import AppLayout from "@/layouts/AppLayout.vue";
import { useSettingsStore } from "@/stores/settings";
import { storeToRefs } from "pinia";
import { Divider } from "primevue";
import ConfirmAccountDeletionDialog from "@/components/settings/ConfirmAccountDeletionDialog.vue";

const settingsStore = useSettingsStore();
const { email, name, savedName, subscribedToMails: reviewReminders } = storeToRefs(settingsStore);

const showDeleteDialog = ref(false);
const confirmEmail = ref("");

const nameChanged = computed(() => name.value.trim() !== savedName.value);

function openDeleteDialog() {
  confirmEmail.value = "";
  showDeleteDialog.value = true;
}

function closeDeleteDialog() {
  showDeleteDialog.value = false;
  confirmEmail.value = "";
}

onMounted(async () => {
  await settingsStore.loadSettings();
});
</script>

<template>
  <AppLayout>
    <h1 class="mb-7 max-w-3xl text-xl font-bold">Settings</h1>

    <Divider class="w-3xl!" />
    <!-- Personal info -->
    <section class="sm:flex sm:gap-20 py-6">
      <div class="mb-5 w-[15%]">
        <h2 class="mb-1.5 text-md font-semibold">Personal info</h2>
        <p class="text-sm text-[#8d9692]">How you appear in srsly.</p>
      </div>
      <form class="flex flex-col gap-5 sm:w-sm" @submit.prevent="() => settingsStore.saveName()">
        <div name="email" class="flex flex-col gap-1.5">
          <label for="email" class="text-sm font-semibold">Email</label>
          <InputText id="email" :modelValue="email" disabled fluid />
          <small class="text-xs text-[#8d9692]">Your email can’t be changed.</small>
        </div>

        <div name="name" class="flex flex-col gap-1.5">
          <label for="name" class="text-sm font-semibold">Name</label>
          <InputText id="name" v-model="name" fluid />
        </div>

        <Button
          :severity="!nameChanged ? 'secondary' : 'primary'"
          type="submit"
          label="Save changes"
          :disabled="!nameChanged"
          class="self-start font-semibold disabled:cursor-not-allowed!"
        />
      </form>
    </section>

    <Divider class="w-3xl!" />

    <!-- Email -->
    <section class="sm:flex sm:gap-20 py-6">
      <div class="mb-5 w-[15%]">
        <h2 class="mb-1.5 text-md font-semibold">Email</h2>
        <p class="text-sm text-[#8d9692]">What srsly sends you.</p>
      </div>
      <div class="flex max-w-sm items-start justify-between gap-6">
        <div>
          <label for="reminders" class="text-[15px] font-semibold">Review reminders</label>
          <p class="mt-1 text-sm text-[#8d9692]">
            Get an email on days when problems are due for review.
          </p>
        </div>
        <ToggleSwitch
          v-model="reviewReminders"
          inputId="reminders"
          class="shrink-0"
          @update:modelValue="() => settingsStore.updateReminders(reviewReminders)"
        />
      </div>
    </section>

    <Divider class="w-3xl!" />

    <!-- Delete account -->
    <section class="sm:flex sm:gap-20 py-6">
      <div class="mb-5 w-[15%]">
        <h2 class="mb-1.5 text-md font-semibold">Delete account</h2>
        <p class="text-sm text-[#8d9692]">This can’t be undone.</p>
      </div>
      <div class="max-w-sm">
        <p class="mb-4 text-sm leading-relaxed text-[#8d9692]">
          Deleting your account permanently removes your solved problems, review history, and
          settings.
        </p>
        <Button severity="danger" label="Delete account" @click="openDeleteDialog" />
      </div>
    </section>

    <ConfirmAccountDeletionDialog v-model:isOpen="showDeleteDialog" :email :closeDeleteDialog />
  </AppLayout>
</template>
