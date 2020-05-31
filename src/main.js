import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import DefaultLayout from './layouts/DefaultLayout.vue'
import FeaturedLayout from './layouts/FeaturedLayout.vue'

Vue.component('default-layout', DefaultLayout)
Vue.component('auth-layout', FeaturedLayout)

Vue.config.productionTip = false

Vue.directive('scroll', {
  inserted: function (el, binding) {
    const f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
