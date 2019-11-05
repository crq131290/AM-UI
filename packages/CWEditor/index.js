/**
 * @author crq131290
 * Date 2019/11/04
 */

import CWEditor from './src/CWEditor'

CWEditor.install = function(Vue){
  Vue.component(CWEditor.name,CWEditor)
}

export default CWEditor