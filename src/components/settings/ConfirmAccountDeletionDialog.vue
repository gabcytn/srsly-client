<script setup lang="ts">
import { useSettingsStore } from "@/stores/settings";
import { ref, computed } from "vue";

const props = defineProps<{
  email: string;
  closeDeleteDialog: () => void;
}>();

const isDialogOpen = defineModel("isOpen", { type: Boolean, required: true });

const settingsStore = useSettingsStore();

const canDelete = computed(() => confirmEmail.value.trim() === props.email);
const confirmEmail = ref("");

function onConfirmDeletion() {
  settingsStore.deleteAccount();
}
</script>

<template>
  <Dialog
    v-model:visible="isDialogOpen"
    modal
    header="Delete your account?"
    class="max-w-100 w-[90%] rounded-lg"
    :pt="{
      header: { class: '!bg-transparent' },
      title: { class: '!text-[17px] !font-semibold' },
      content: { class: '!bg-transparent' },
      footer: { class: '!bg-transparent' },
    }"
    @hide="confirmEmail = ''"
  >
    <p class="mb-4 text-sm leading-relaxed">
      <span class="text-[#8d9692]"
        >This permanently deletes all your data. To confirm, type your email:
      </span>
      <strong>{{ email }}</strong>
    </p>
    <InputText v-model="confirmEmail" autofocus fluid autocomplete="off" />
    <template #footer>
      <Button severity="secondary" label="Cancel" @click="closeDeleteDialog" />
      <Button
        severity="danger"
        label="Delete account"
        :disabled="!canDelete"
        @click="onConfirmDeletion"
      />
    </template>
  </Dialog>
</template>
