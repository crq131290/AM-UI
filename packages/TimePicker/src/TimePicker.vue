<template>
  <div class="c-time-picker" :value="value">
     <el-date-picker
      v-if="getDataType"
      class="w-100"
      :size="size"
      v-model="date"
      :format='format'
      :value-format='vFormat'
      :type="current_type"
      @change="changeDate"
      placeholder="请选择时间">
    </el-date-picker>
    <c-xun :position="position" v-if="type==4" :size="size" v-model="paramsDate"></c-xun>
    <c-hou :position="position" v-if="type==3" :size="size" v-model="paramsDate"></c-hou>
    <c-season :position="position" v-if="type==6" :size="size" v-model="paramsDate"></c-season>
  </div>
</template>
<script>
import utils from '../../common/js/utils'
export default {
  name: "CTimePicker",
  props:{
    dataTypes:{
      type:Array,
      default:()=>[
        {id:1,label:'时',type:'datetime',format:"yyyy-MM-dd HH",vFormat:'yyyy-MM-dd HH'},
        {id:2,label:'日',type:'date',format:"yyyy-MM-dd",vFormat:'yyyy-MM-dd'},
        {id:3,label:'候',type:'5DAY'},
        {id:4,label:'旬',type:'10DAY'},
        {id:5,label:'月',type:'month',format:"yyyy-MM",vFormat:'yyyy-MM'},
        {id:6,label:'季',type:'SEA'},
        {id:7,label:'年',type:'year',format:"yyyy",vFormat:'yyyy'},
      ]
    },
    type:{
      type:[String,Number],
      default:()=>2
    },
    value:{
      type:[String,Number,Array],
      default:()=>""
    },
    position:{
      type:String,
      default:()=>'bottom'
    },
    size:{
      type:String,
      default:()=>''
    }
  },
  data () {
    return {
      date:"",
      format:'yyyy-MM-dd',
      current_type:'date',
      vFormat:'yyyy-MM-dd',
      paramsDate:["2019-10-11", "2019-10-20"],
    };
  },
  created(){
    this.init()
  },
  computed:{
    getDataType(){
      const list = [1,2,5,7]
      return list.includes(this.type)
    }
  },
  methods:{
    init(){
      this.date = this.value || utils.formatDate(new Date(),'yyyy-MM-dd')
      this.initTime(this.dataTypes[this.type-1])
    },
    changeType(type){
      this.current_type = type
    },
    initTime(data){
      this.current_type = data.type
      this.date = data.date
      this.format = data.format
      this.vFormat = data.vFormat
    },
    changeDate(date){
      this.$emit("input",date)
    }
  },
  watch: {
    type(newVal){//change current_type
      let type = this.dataTypes.filter(item=>{
        return item.id == newVal
      })[0]
      this.date = ""
      this.current_type = type.type || 'daterange'
      this.format = type.format || 'yyyy-MM-dd'
      this.vFormat = type.vFormat || 'yyyy-MM-dd'
    },
    value(val){
      if(this.getDataType){
        this.date = val
      }else{
        this.paramsDate = val
      }
    },
    paramsDate(val){
      this.$emit("input",val)
    }
  },
}
</script>
<style>
.c-time-picker .el-date-editor.el-input{
  width: 100%;
}
</style>