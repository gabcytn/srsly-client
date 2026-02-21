<script setup lang="ts">
import { ref } from "vue";
import navItems from "@/shared/nav-items";

const showDrawer = ref(false);
</script>
<template>
  <Drawer v-model:visible="showDrawer" header="srsly">
    <ul class="p-menu-list">
      <DrawerNavItem
        v-for="(item, idx) in navItems.filter((i) => !i.separator)"
        v-bind:key="idx"
        :icon-class="item.icon"
        :label="item.label"
        @click="item.command"
      />
    </ul>
  </Drawer>
  <div class="md:hidden ms-5 mt-5">
    <span
      class="pi pi-bars cursor-pointer"
      style="font-size: 1.25rem"
      @click="showDrawer = true"
    ></span>
  </div>
</template>

<style lang="css">
.p-drawer-title {
  font-family: "JetBrains Mono", sans-serif;
  color: var(--color-primary);
}

.p-drawer-content {
  display: flex;
  flex-direction: column;
}
</style>
