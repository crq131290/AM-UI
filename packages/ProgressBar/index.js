/**
 * @author crq131290
 * Date 2019/10/24
 */

import ProgressBar from './src/ProgressBar'

ProgressBar.install = function(Vue){
  Vue.component(ProgressBar.name,ProgressBar)
}

export default ProgressBar