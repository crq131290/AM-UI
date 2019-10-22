/**
 * @author crq131290
 * Date: 2019/10/21
 */
import Hou from './src/Hou.vue';

Hou.install = function (Vue) {
  Vue.component(Hou.name, Hou);
};

export default Hou;