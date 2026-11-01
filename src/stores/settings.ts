import { SettingService } from "@/service/SettingService";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { useToast } from "primevue";
import { ref } from "vue";
import { useAuthStore } from "./auth";
import router from "@/router";

export const useSettingsStore = defineStore("settings", () => {
  const toast = useToast();
  const authStore = useAuthStore();
  const name = ref("");
  const savedName = ref("");
  const email = ref("");
  const subscribedToMails = ref(true);

  async function loadSettings() {
    const data = await SettingService.getSettingsData();
    name.value = data.name;
    savedName.value = data.name;
    email.value = data.email;
    subscribedToMails.value = data.subscribedToMails;
  }

  async function saveName() {
    try {
      await SettingService.patchName(name.value.trim());
      savedName.value = name.value.trim();
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Name was successfully updated.",
        life: 3000,
      });
    } catch (e: unknown) {
      handleError(e);
    }
  }

  async function updateReminders(value: boolean) {
    try {
      if (value) {
        await SettingService.subscribeToReminders();
      } else {
        await SettingService.unsubscribeToReminders();
      }
    } catch (e) {
      handleError(e);
    }
  }

  async function deleteAccount() {
    try {
      await SettingService.deleteUserAccount();
      authStore.resetAccessToken();
      router.replace("/");
    } catch (e) {
      handleError(e);
    }
  }

  function handleError(e: unknown) {
    let errMessage = "Unknown error occurred.";
    if (e instanceof AxiosError) {
      errMessage = e.response?.data.detail;
    }

    toast.add({
      severity: "error",
      summary: "Error",
      detail: errMessage,
      life: 5000,
    });
  }

  return {
    loadSettings,
    name,
    savedName,
    email,
    subscribedToMails,

    saveName,
    updateReminders,
    deleteAccount,
  };
});
