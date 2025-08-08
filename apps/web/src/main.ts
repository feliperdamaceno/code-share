import { createApp } from 'vue'

import App from '@/app.vue'
import { pinia } from '@/pinia'
import { router } from '@/routes'

import '@/assets/css/main.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
