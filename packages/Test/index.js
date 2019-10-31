/**
 * @author crq131290
 * Date 2019/10/30
 */

import Test from './src/Test'

Test.install = function(Vue){
  Vue.component(Test.name,Test)
}

export default Test