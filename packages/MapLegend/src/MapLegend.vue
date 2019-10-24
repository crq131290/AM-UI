<template>
  <div class="c-legend--map">
    <div class="c-legend--map__wrapper">
       <div class="c-legend--map__body" >
         <div class="c-legend--map__inner" @click="bounceColorList" :style="{background:legendBg}"></div>
       </div>
       <ul class="c-legend--map__label">
         <li  v-for="(l,i) in labels" :key="i">{{l}}</li>
       </ul>
      <a class="c-legend--map__unit">
        {{unit}}
      </a>
    </div>
    <transition name="el-zoom-in-top">
      <ul class="c-legend--map__colors" :class="positionClass" v-show="visible" >
        <li v-for="item in colorList" :key='item.id'
          :class="item.id==selectId?'is-actived':''"
          :style="{background:item.value}"
          @click="selectColor($event,item.id)">
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
import {legendColos} from '../../common/js/am-ui.config'
  export default {
    name:"CMapLegend",
    props:{
      unit:{
        type:[String],
        default:()=>"℃"
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
      },
      addLast:{
        type:Boolean,
        default:true
      }
    },
    data(){
      return {
        legendBg:`linear-gradient(to right,rgb(0,0,255),rgb(0,255,255),rgb(255,255,0),rgb(255,0,0),rgb(255,0,0))`,
        colors: legendColos,
        visible:false,
        selectId:3,
      }
    },
    computed:{
      colorList(){
        const arr = []
        this.colors.forEach((item)=>{
          let value = this.addLast ? this.addLastMethod(item.values) :item.values
          arr.push({
            id:item.id,
            value:'linear-gradient(to right,'+value.join(',')+')'
          })
        })
        return arr
      },
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
            let value = this.addLast ? this.addLastMethod(item.values) :item.values
            this.legendBg = 'linear-gradient(to right,'+value.join(',')+')'
            this.$emit("changeLegend",value)
          }
        })
        this.visible = false
      },
      addLastMethod(arr){
        let newArr = arr.slice(0)
        newArr.push(arr[arr.length-1])
        return newArr
      }
    },
  }
</script>
