import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import router from "./router";
import { definePreset } from "@primeuix/themes";
import { createPinia } from "pinia";
import AnimateOnScroll from "primevue/animateonscroll";
import ToastService from "primevue/toastservice";
import "highlight.js/styles/stackoverflow-dark.css";
import "highlight.js/lib/common";
// import hljs from "highlight.js/lib/core";
// import javascript from "highlight.js/lib/languages/javascript";
// import java from "highlight.js/lib/languages/java";
import hljsVuePlugin from "@highlightjs/vue-plugin";

const app = createApp(App);
const pinia = createPinia();

const CustomizedAura = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{green.50}",
      100: "{green.100}",
      200: "{green.200}",
      300: "{green.300}",
      400: "{green.400}",
      500: "{green.500}",
      600: "{green.600}",
      700: "{green.700}",
      800: "{green.800}",
      900: "{green.900}",
      950: "{green.950}",
    },
    colorScheme: {
      light: {
        content: {
          background: "#FAFAF8",
          cardBackground: "#FEFEFE",
        },
      },
      dark: {
        content: {
          cardBackground: "#18181B",
        },
      },
    },
  },
});

app.use(PrimeVue, {
  theme: {
    preset: CustomizedAura,
    options: {
      prefix: "p",
      darkModeSelector: ".app-dark",
      cssLayer: false,
    },
  },
});
app.use(ToastService);
app.use(pinia);
app.use(router);
app.use(hljsVuePlugin);
app.directive("animateonscroll", AnimateOnScroll);

app.mount("#app");
