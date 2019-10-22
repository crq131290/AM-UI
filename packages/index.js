/**
 * @author crq131290
 * Date: 2019/10/18
 */

import HelloWorld from "./HelloWorld";
import Xun from "./Xun";
import Hou from "./Hou";
import Season from "./Season";
import TimePicker from "./TimePicker"
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

const components = [HelloWorld,Xun,Hou,Season,TimePicker];

const install = function(Vue) {
  Vue.use(Element)
  if (install.installed) return;
  install.installed = true; //自定义变量 用来识别是否已经进行过安装
  components.map(component => Vue.component(component.name, component));
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.vue);
}

export default {
  install,
  HelloWorld
};
