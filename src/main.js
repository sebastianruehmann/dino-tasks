import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import FastClick from 'fastclick'
import StatusBar from './plugins/statusbar'

import routes from './routes.js'
import App from './App.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

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

  window.cordova.deviceready = true
})

window.apiRoot = 'http://localhost:5000/api/v1'

// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:') {
  window.apiRoot = 'http://192.168.2.51:5000/api/v1'
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

const router = new VueRouter({
  routes
})

new Vue({
  components: {
    App
  },
  router
}).$mount('#app')
