/**
 * @author crq131290
 * Date: 2019/10/21
 */

import Season from "./src/Season";

Season.install = function(Vue){
  Vue.component(Season.name,Season)
}

export default Season;