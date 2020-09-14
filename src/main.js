import store from './store'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import { messages } from './components/common/i18n'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css'
import './components/common/directives'
import 'babel-polyfill'

import '@/permission' // permission control

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(ElementUI, {
  size: 'small'
})
const i18n = new VueI18n({
  locale: 'zh',
  messages
})

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
