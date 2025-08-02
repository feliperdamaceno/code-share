import { createApp } from 'vue'

import App from '@/app.vue'
import { router } from '@/routes'

import '@/assets/css/main.css'

createApp(App).use(router).mount('#app')
