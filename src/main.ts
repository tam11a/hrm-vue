import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(PrimeVue)

//theme
import 'primevue/resources/themes/lara-light-blue/theme.css'
//icon
import 'primeicons/primeicons.css'
//core
import 'primevue/resources/primevue.min.css'

app.use(VueQueryPlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
