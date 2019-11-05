<template>
  <div class="ck-editor__wrapper">
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" :disabled="editorDisabled"></ckeditor>
  </div>
</template>
<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';
import ckeConfig from './cke.config'
export default {
  name: "CKEditor",
  components:{
    ckeditor: CKEditor.component
  },
  data () {
    return {
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorDisabled: false,
      editorConfig: ckeConfig
    };
  },
  created(){
    this.init()
  },
  methods:{
    init(){
    },
  },
}
</script>