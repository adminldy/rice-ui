import { createApp } from 'vue'
import App from './App.vue'
import componentsPlugin from './packages/index'

createApp(App).use(componentsPlugin).mount('#app')
