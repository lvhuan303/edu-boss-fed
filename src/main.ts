import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

import dayjs from 'dayjs'

Vue.filter('date', (value: string | number | Date | dayjs.Dayjs | null | undefined, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
