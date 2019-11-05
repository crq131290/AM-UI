/**
 * @author crq131290
 * Date 2019/11/04
 */


import CKEditor from "./src/CKEditor"

CKEditor.install = function(Vue){

  Vue.component(CKEditor.name,CKEditor)

}

export default CKEditor