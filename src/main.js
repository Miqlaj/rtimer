import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faPlay, faTrashAlt } from '@fortawesome/free-solid-svg-icons'


library.add(
    faEdit,
    faTrashAlt,
    faPlay
  )
  
const app = createApp(App);
app.use(router);
app.mount('#app');