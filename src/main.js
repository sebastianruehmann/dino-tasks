import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import FastClick from 'fastclick'
import StatusBar from './plugins/statusbar'

import App from './App.vue'
import TasklistForm from './TasklistForm.vue'
import Dashboard from './Dashboard.vue'
import Scanner from './Scanner.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

window.apiRoot = 'http://192.168.2.51:5000/api/v1'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

document.addEventListener('deviceready', () => {
  const Statusbar = new StatusBar().$
  if (Statusbar) {
    Statusbar.overlaysWebView(false)
    Statusbar.backgroundColorByHexString('#ffffff')
    Statusbar.styleDefault()
  }
})

// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

const routes = [
  { path: '/', name: 'dashboard', component: Dashboard },
  { path: '/scanner', name: 'scanner', component: Scanner },
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
