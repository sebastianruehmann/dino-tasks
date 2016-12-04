import Vue from 'vue'
import VueRouter from 'vue-router'
import Create from './Create.vue'
import Dashboard from './Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/create', component: Create }
]

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  router
}).$mount('#app')
