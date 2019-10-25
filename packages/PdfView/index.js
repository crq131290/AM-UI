/**
 * @author crq131290
 * Date 2019/10/25
 */

import PdfView from './src/PdfView'

PdfView.install = function(Vue){
  Vue.component(PdfView.name,PdfView)
}

export default PdfView