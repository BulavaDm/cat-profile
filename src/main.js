import './styles/app.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "./config/firebase"

import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import "primevue/resources/themes/saga-orange/theme.css"
import "primevue/resources/primevue.min.css"
import "/node_modules/primeflex/primeflex.css"
import 'primeicons/primeicons.css'

const pinia = createPinia()
const app = createApp(App)

app
    .use(pinia)
    .use(PrimeVue)
    .use(router)
    .mount('#app')
