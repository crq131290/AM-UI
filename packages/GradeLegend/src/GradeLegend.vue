<template>
  <div class="c-legend--grade">
    <div class="c-legend--grade__wrapper">
      <div class="c-legend--grade__inner">
        <ul  class="c-legend--grade__body"  @click="bounceColorList">
          <li :style="{background:item}" v-for="(item,index) in legendBg" :key="index"></li>
        </ul>
        <ul class="c-legend--grade__label">
          <li  v-for="(l,i) in labelList" :key="i">{{l}}</li>
        </ul>
        <a class="c-legend--grade__unit">
          {{unit}}
        </a>
      </div>
    </div>
    <transition name="el-zoom-in-top">
      <ul class="c-legend--grade__colors" :class="positionClass" v-show="visible" >
        <li v-for="items in colors" :key='items.id'
          :class="items.id==selectId?'is-actived':''"
          @click="selectColor($event,items.id)">
          <span v-for="(item,index) in items.values" :key="index" 
          :style="{background:item}"></span>
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
import {legendColos} from '../../common/js/am-ui.config'
export default {
  name: "CGradeLegend", 
  props:{
    unit:{
      type:[String],
      default:()=>"mm"
    },
    labelList:{
      type:[Object,Array],
      default:()=>[]
    },
    position:{
      type:String,
      default:"bottom"
    },
    active:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      legendBg:['red','green','blue'],
      colors: legendColos,
      visible:false,
      selectId:3,
    }
  },
  computed:{
    labels(){
      return this.labelList || []
    },
    positionClass(){
      return `is-${this.position}`
    }
  },
  methods:{
      bounceColorList(){
        if(!this.active) return
        this.visible = !this.visible
      },
      selectColor(e,id){
        this.selectId = id
        this.colors.forEach((item)=> {
          if(item.id == id){
            this.legendBg = item.values
            this.$emit("changeLegend",item.values)
          }
        })
        this.visible = false
      }
    },
}
</script>