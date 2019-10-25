<template>
  <div class="c-pdf-view">
    <ul class="c-pdf-view__tab text-center pad-0-15 ps-rel ">
      <li v-if="showOptions.pre" class="in-block hover  m-l-15" @click.stop="prePage">上一页</li>
      <li v-if="showOptions.next" class="in-block hover m-l-15"  @click.stop="nextPage">下一页</li>
      <li v-if="showOptions.print" class="in-block hover btn-next m-l-15" @click.stop="pdfPrintAll">
        <i class="el-icon-printer"></i>
        打印
      </li>
      <li v-if="showOptions.down"  class="in-block hover m-l-15" @click.stop="downLoad">
        <i class="el-icon-download"></i> 下载
      </li>
    </ul>
    <div class="c-pdf-view__wrapper over-hidden">
      <pdf
        class="w-100"
        ref="pdf"
        :src="pdfUrl"
        :page="pageNum"
        :rotate="pageRotate"
        @password="password"
        @progress="loadedRatio = $event"
        @page-loaded="pageLoaded($event)"
        @num-pages="pageTotalNum=$event" 
        @error="pdfError($event)"
        @link-clicked="page = $event">
      </pdf>
    </div>
    <div class="ps-rel c-pdf-view__footer text-center">
      <div class="m-b-5 c-pdf-view__num">{{pageNum}}/{{pageTotalNum}}</div>
      <ul class="">
        <li class="in-block hover  m-r-15" @click.stop="prePage">上一页</li>
        <li class="in-block hover m-l-15"  @click.stop="nextPage">下一页</li>
      </ul>
    </div>
    <!-- <iframe style="display:none" :src="pdfUrl" id="printIframe" type="application/pdf"></iframe> -->
  </div>
</template>
<script>
import pdf from 'vue-pdf'
export default {
  name: 'CPdfView',
  components:{
    pdf
  },
  props:{
    title:{
      type:String,
      default:()=>"test"
    },
    pdfUrl:{
      type:String,
      default:()=>""
    },
    showOptions:{
      type:Object,
      default:()=>({
        pre:true,
        next:true
      })
    }
  },
  data(){
    return {
      pageNum:1,
      pageTotalNum:1,
      pageRotate:0,
      loadedRatio:0,
      curPageNum:0,
      show:false,
    }
  },
  methods: {
    prePage(){
      let p = this.pageNum
      p = p>1?p-1:1
      this.pageNum = p
    },
    nextPage(){
      let p = this.pageNum
      p = p<this.pageTotalNum?p+1:this.pageTotalNum
      this.pageNum = p
    },
    clock(){
      this.pageRotate += 90 
    },
    counterClock(){
      this.pageRotate -= 90 
    },
    password(updatePassword, reason) {
      updatePassword(prompt('password is "123456"'))
      console.log('...reason...')
      console.log(reason)
      console.log('...reason...')
    },
    pageLoaded(e){
      this.curPageNum = e
    },
    pdfError(error){
      console.error(error)
    },
    // pdfPrintAll(){
    //   this.$refs.pdf.print()
    // },
    // pdfPrint(){
    //   this.$refs.pdf.print(100,[1,2])
    // },
    downLoad(){
      this.$axios.get(this.pdfUrl,{responseType:"blob"}).then(res=>{
        let filename = this.title +'.pdf'
        console.log(filename)
        let blob = new Blob([res.data], {type: 'Files'})
        let csvUrl = URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.href = csvUrl;
        link.download = filename;
        link.click();
        csvUrl = null
        link = null
      })
    },
    pdfPrintAll(){
      let dom = document.querySelector("#printIframe")
      dom.contentWindow.print()
    }
  },
  watch:{
    pdfUrl(val){
      if(val){
        this.pageNum = 1
      }
    }
  }
}
</script>
