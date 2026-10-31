import api from "@/api";
import type { UserSettingsInfo } from "@/shared/types";

export const SettingService = {
  getSettingsData: async () => (await api.get("/settings")) as UserSettingsInfo,
  patchName: async (name: string) => await api.patch("/settings/user", { name }),
  deleteUserAccount: async () => await api.delete("/settings/user"),
  subscribeToReminders: async () => await api.patch("/mails/reminders/subscribe"),
  unsubscribeToReminders: async () => await api.patch("/mails/reminders/unsubscribe")
};
