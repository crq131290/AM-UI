<template>
  <div class="c-classify" >
    <ul class="c-classify__wrapper">
      <li class="flex c-classify__inner m-b-10" :class="{last:index==labelList.length,first:index==0}" v-for="(item,index) in labelList" :key="index">
        <div class="left">
          <el-color-picker class=" m-r-10" v-model="colorList[index]" size="small"></el-color-picker>
          <el-input class="w-50 in-block" v-model="labelList[index]" size="small"></el-input>
          <span class="in-block m-l-10">{{unit}}</span>
        </div>
        <div class="right text-right">
          <span v-if="mode==1">
            <el-input :disabled="index==0" @change="changeMin(minList[index],index)" class="w-30 v-middle in-block" v-model="minList[index]" size="small"></el-input>
            -
            <el-input :disabled="index==labelList.length-1" @change="changeMax(maxList[index],index)"  class="w-30 v-middle in-block" v-model="maxList[index]" size="small"></el-input> 
            <!-- {{unit}} -->
          </span>
          <i class="hover el-icon-plus pad-1 color-fff  bg-84c309 m-0-5" v-if="index!=labelList.length-1" @click="add(index)"></i>
          <i class="hover el-icon-minus pad-1 color-fff bg-f34949 m-0-5" v-if="index!=labelList.length-1 &&index!=0" @click="del(index)"></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name:"CClassify",
  components:{
  },
  props:{
    data:{
      type:Array,
      default:()=>[]
    },
    level:{
      type:Number,
      default:()=>1
    },
    unit:{
      type:String,
      default:()=>""
    },
    mode:{
      type:Number,
      default:()=>1
    },
    defProp:{
      type:Object,
      default:()=>({
        colors:'colorList',
        labels:'labelList',
        values:'valueList',
        maxs:'maxList',
        mins:'minList',
      })
    }
  },
  data(){
    return {
      classify:[],
      maxList:[],
      minList:[],
      colorList:[],
      labelList:[]
    }
  },
  created(){
    const data = this.data
    let index = this.getIndexById(this.level,data)
    this.changeData(data,index)
  },
  methods: {
    changeData(data,index=0){
      this.classify = data
      this.colorList = data[index][this.defProp.colors]
      this.labelList = data[index][this.defProp.labels]
      if(data[index][this.defProp.values]){
        this.maxList = [...data[index][this.defProp.values],'+∞']
        this.minList = ['-∞',...data[index][this.defProp.values]]
      }
    },
    add(index){//增加分级
      if(index==0){
        this.maxList.splice(index+1,0,0)
        this.minList.splice(index+2,0,0)
        this.colorList.splice(index+1,0,"#FFF")
        this.labelList.splice(index+1,0,"")
      }else{
        this.maxList.splice(index,0,0)
        this.minList.splice(index+1,0,0)
        this.colorList.splice(index,0,"#FFF")
        this.labelList.splice(index,0,"")
      }
    },
    del(index){//删除分级
      let list = [0,this.classify.length-1]
      this.maxList.splice(index,1)
      this.minList.splice(index+1,1)
      this.colorList.splice(index,1)
      this.labelList.splice(index,1)
    },
    changeMin(min,index){//修改minValue
      this.maxList.splice(index-1,1,min)
    },
    changeMax(max,index){//修改maxValue
      this.minList.splice(index+1,1,max)
    },
    getIndexById(id,data){
      let index = data.findIndex(item=>{
        return id == item.id
      })
      return index
    }
  },
  watch:{
    level(newLevel){
      let index = this.getIndexById(newLevel,this.classify)
      this.changeData(this.classify,index)
    },
    minList(newValue){
      let index = this.getIndexById(this.level,this.classify)
      if(this.classify[index]){
        this.classify[index][this.defProp.values] = newValue.slice(1)
      }
    }
  }
}
</script>