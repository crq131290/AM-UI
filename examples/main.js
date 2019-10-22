// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import DemoBlock from './components/DemoBlock'
import AM from '../packages/index'
import "../packages/theme-default/lib/index.css"
Vue.config.productionTip = false

Vue.component(DemoBlock.name, DemoBlock)
//也就是说，如果传入的是对象，那就调用插件的install方法并通过apply()方法将install方法改变this的指向为plugin。
//插件类型为function时，插件运行的上下文this指向null(严格模式下；非严格模式下指向window),installedPlugins.push(plugin)在这之后将插件push到插件数组中，表示已注册。
Vue.use(AM)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
