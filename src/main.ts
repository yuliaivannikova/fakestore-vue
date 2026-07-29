import './styles/main.scss'
import '@fontsource/inter'
import { useTheme } from './composables/useTheme'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const { theme } = useTheme()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide('theme', theme)
app.mount('#app')
