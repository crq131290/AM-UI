// import {clickOutside} from './directives'
import clickOutside from './click-outside'
// datepicker mixin
export const DatePickerMixin = {
  directives:{//custom directives
    clickOutside
  },
  data() {
    return {
      input: '',
      date:new Date(),
      show:false,
      config:{
        handler: this.handler,
        middleware: this.middleware,
        events: ["dblclick", "click"]
      },
      values:[],//y , m ,ho,
      startYear:'',//年份列表title
      yearList:[],
      mode:1,//1:year,2:month,3:hou
      monthLabels:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
      paramsDate:[]
    }
  },
  created(){
    this.values = [this.date.getFullYear(),this.date.getMonth()+1]
  },
  methods:{
    
    showPicker(e){
      this.show = true
      // let x = this.getElementToPageTop(e.srcElement)
    },
    initYearList(year){
      let start = Math.floor(year/10)*10,end = start+9
      this.startYear = start
      let arr = new Array(3)
      for(let i=0;i<3;i++){
        arr[i] = new Array(4)
        for(let j=0;j<4;j++){
          arr[i][j] = start+4*i+j
        }
      }
      this.yearList = arr
    },
    // getElementToPageTop(el){
    //   if(el.parentElement){
    //     return this.getElementToPageTop(el.parentElement) + el.offsetTop
    //   }
    //   return el.offsetTop
    // },
    changeHeader(i){ // 1:previous year,2:previous month,3:next year,4:next month\
      switch(i){
        case 1:this.date.setFullYear(this.date.getFullYear() - 1)
          break;
        case 2:this.date.setMonth(this.date.getMonth() - 1)
          break;
        case 3:this.date.setFullYear(this.date.getFullYear() + 1)
          break;
        case 4:this.date.setMonth(this.date.getMonth() + 1)
          break;
        case 5:this.date.setFullYear(this.date.getFullYear() - 10)
        break;
        case 6:this.date.setFullYear(this.date.getFullYear() + 10)
        break;
      }
      this.values = [this.date.getFullYear(),this.date.getMonth()+1]
    },
    handler(e, el) {
      this.show = false
    },
    middleware(e, el) {
      return e.target.className !== 'el-input__inner'
    },
    checkYear(e){//select tear
      if(e.target.nodeName==='SPAN'){
        this.$set(this.values,0,e.target.dataset.year)
        this.mode=3
      }
    },
    checkMonth(e){//select month
      if(e.target.nodeName==='SPAN'){
        this.$set(this.values,1,e.target.dataset.month)
        this.mode=1
      }
    },
    changeYearMode(){//change year mode
      this.mode=2
    },
    changeMonthMode(){//change month mode
      this.mode=3
    },
  },
  watch: {
    values(val){
      this.initYearList(val[0])
    },
    value(val){//outside
      this.paramsDate = val
      if(val[0]){
        this.initInputLabel(5)
      }
    },
    paramsDate(val){//inside
      this.$emit("input",val)
    }
  },
}