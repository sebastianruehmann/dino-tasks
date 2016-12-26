import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import TasklistForm from './TasklistForm.vue'
import Dashboard from './Dashboard.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  { path: '/', name: 'dashboard', component: Dashboard },
  { path: '/tasklist/add', name: 'tasklist.add', component: TasklistForm },
  { path: '/tasklist/:id', name: 'tasklist.edit', component: TasklistForm }
]

const router = new VueRouter({
  routes
})

new Vue({
  components: {
    App
  },
  router
}).$mount('#app')
