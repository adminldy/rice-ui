import { createApp } from 'vue'
import App from './App.vue'
import componentsPlugin from './packages/index'
import router from './router'

createApp(App).use(router).use(componentsPlugin).mount('#app')
