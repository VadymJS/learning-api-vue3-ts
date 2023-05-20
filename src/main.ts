import { createApp } from 'vue'
import 'vue3-toastify/dist/index.css'
import './style.css'
// @ts-ignore
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')

