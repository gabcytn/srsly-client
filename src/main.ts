import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import router from './router'
import { definePreset } from '@primeuix/themes'
import AnimateOnScroll from 'primevue/animateonscroll'

const app = createApp(App)

const CustomizedAura = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{red.50}',
      100: '{red.100}',
      200: '{red.200}',
      300: '{red.300}',
      400: '{red.400}',
      500: '{red.500}',
      600: '{red.600}',
      700: '{red.700}',
      800: '{red.800}',
      900: '{red.900}',
      950: '{red.950}',
    },
    colorScheme: {
      light: {
        content: {
          background: '#FAFAF8',
        },
      },
    },
  },
})

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: CustomizedAura,
    options: {
      prefix: 'p',
      darkModeSelector: '.app-dark',
      cssLayer: false,
    },
  },
})
app.directive('animateonscroll', AnimateOnScroll)

app.mount('#app')
