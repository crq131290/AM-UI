<template>
  <div class="c-legend--map">
    <div class="c-legend--map__wrapper">
       <div class="c-legend--map__body" @click="bounceColorList" :style="{background:legendBg}"></div>
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
      }
    },
    data(){
      return {
        legendBg:`linear-gradient(to right,rgb(0,0,255),rgb(0,255,255),rgb(255,255,0),rgb(255,0,0),rgb(255,0,0))`,
        colors: [
          {
            id:1,
            values:['#3b7ba1','#3a99a1','#32a66e','#a1a13b','#a13b3b','#a4399a','#a4399a']
          },
          {
            id:2,
            values:['#a50026','#f6fbd0','#313695','#313695']
          },
          {
            id:3,
            values:['rgb(0,0,255)','rgb(0,255,255)','rgb(255,255,0)','rgb(255,0,0)','rgb(255,0,0)']
          },
          {
            id:4,
            values:['rgb(12,16,120)','rgb(26,147,171)','rgb(56,224,9)','rgb(255,255,128)','rgb(255,255,128)']
          },
          {
            id:5,
            values:['#ffffe5','#90ee90','#008ae5','#008ae5'],

          },
          {
            id:6,
            values:['rgb(153,153,255)','rgb(153,255,255)','rgb(255,255,153)','rgb(255,153,153)','rgb(255,153,153)'],

          },
          {
            id:7,
            values:['rgb(116,219,211)','rgb(255,255,199)','rgb(255,255,128)','rgb(217,194,121)',
                    'rgb(135,96,38)','rgb(150,150,181)','rgb(181,150,181)','rgb(252,252,252)','rgb(252,252,252)'],
          },
          {
            id:8,
            values:['rgb(242,241,162)','rgb(255,255,0)','rgb(252,3,69)','rgb(176,7,237)','rgb(7,29,173)','rgb(7,29,173)'],
          },
          {
            id:9,
            values:['rgb(0,245,245)','rgb(0,0,245)','rgb(245,0,245)','rgb(245,0,245)']
          },
        ],
        visible:false,
        selectId:3,
      }
    },
    computed:{
      colorList(){
        const arr = []
        this.colors.forEach((item)=>{
          arr.push({
            id:item.id,
            value:'linear-gradient(to right,'+item.values.join(',')+')'
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
        this.visible = !this.visible
      },
      selectColor(e,id){
        this.selectId = id
        this.colors.forEach((item)=> {
          if(item.id == id){
            this.legendBg = 'linear-gradient(to right,'+item.values.join(',')+')'
            this.$emit("changeLegend",item.values)
          }
        })
        this.visible = false
      }
    },
  }
</script>
