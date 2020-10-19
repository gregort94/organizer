import './scss/main.scss'
import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false

import { store } from './store/'
import { router } from './routes'
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
//test