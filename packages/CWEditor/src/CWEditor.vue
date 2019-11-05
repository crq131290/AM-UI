<template>
  <div class="c-w-editor">
    <div id="editor"></div>
  </div>
</template>
<script>  
import E from 'wangeditor'
export default {
  name:'CWEditor',
  mounted(){
    this.init()
  },
  methods:{
    init(){
      let vm = this
      this.editor = new E("#editor")
      this.editor.customConfig.fontNames = [
        '宋体',
        '微软雅黑',
        'Arial',
        'Tahoma',
        'Verdana'
      ]
      this.editor.customConfig.colors = [
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b',
        '#ffffff'
      ]
      // 关闭粘贴样式的过滤
      this.editor.customConfig.pasteFilterStyle = false;
      this.editor.customConfig.uploadImgShowBase64 = true

      this.editor.customConfig.onchange = function (html) {
          // html 即变化之后的内容
        localStorage.setItem('pro_acticle',html)
        vm.$emit("changePro",html)
      }

      this.editor.create()
      // let text = localStorage.getItem('pro_acticle') || ""
      // this.editor.txt.html(text)
    },
    setTextHtml(content){
      this.editor.txt.html(content)
    },
    getTextHtml(){
      return this.editor.txt.html()
    },
    getText(){
      return this.editor.txt.text()
    },
    changEditor(type){
      let status = type == 0 ? true : false
      this.editor.$textElem.attr('contenteditable', status)
    }
  },
}
</script>
