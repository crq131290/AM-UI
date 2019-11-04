<template>
  <div class="c-tabs ps-rel" :value="value">
    <i v-if="swiper" class="ps-abs left hover el-icon-arrow-left fs-28" @click="turnLeft(data.length*150)"></i>
    <div class="c-tabs__wrapper" :style="{height:swiper?'40px':''}">
      <ul class="c-tabs__inner in-block" :style="getItemsStyle(swiper)">
        <li class="in-block pad-10 c-tabs__item hover" :class="index==activeIndex?'active':''" :style="{color: item.color || ''}"
          @click="selectTab(index,item)" v-for="(item,index) in data" :key="index">
          <i :title="item[defProps.label]" class="in-block w-75">{{item.label}}</i>
          <i v-if="closable" class="el-icon-close" @click.stop="closeTabItem(index)"></i>
        </li>
      </ul>
    </div>
    <i v-if="swiper" class="ps-abs c-tabs__swiper--right hover el-icon-arrow-right fs-28" @click="turnRight(data.length*150)"></i>
    <i v-if="tabline" class="c-tabs__line"></i>
  </div>      
</template>
<script>
export default {
  name:"CTabs",
  props:{
    data:{
      type:Array,
      default:()=>[]
    },
    value:{
      type:[Number,String],
      default:()=>0
    },
    closable:{
      type:Boolean,
      default:()=>false
    },
    tabline:{
      type:Boolean,
      default:()=>false
    },
    defProps:{
      type:Object,
      default:()=>({
        id:'id',
        label:'label'
      })
    },
    swiper:{
      type:Boolean,
      default:()=>false
    },
    maxLen:{
      type:Number,
      default:()=>7
    }
  },
  data(){
    return {
      activeIndex:0,
      left:0
    }
  },
  mounted() {
    this.activeIndex = this.value
  },
  methods: {
    selectTab(index,item){
      this.activeIndex = index
      this.$emit("select-tab",index,item)
    },
    closeTabItem(index){
      // this.data.splice(index,1)
      this.$emit("closeTab",{index})
    },
    turnLeft(){
      if(this.left>=0){
        return
      }
      this.left += 150*3
    },
    turnRight(width){
      let len = (width + this.left)/150
      if(len<=this.maxLen){
        return
      }
      this.left -= 150*3
    },
    getItemsStyle(swiper){
      if(swiper){
        return {width:this.data.length*150+'px',left:this.left+'px',position:'absolute'}
      }else{
        return {width:'100%'}
      }
    }
  },
  watch:{
    value(val){//
    // value就是组件外部传来的值
    //   console.log(val)
      this.activeIndex = val
    },
    activeIndex(val){
      /*使用了v-model的组件会自动监听 input 事件, 
        * 并把这个input事件所携带的值 传递给v-model所绑定的属性,
        * 这样组件内部的值就给到了父组件了
        */
       if(this.data[val]){
         const id = this.data[val][this.defProps.id]
         this.$emit('input',val);//传值给父组件, 让父组件监听到这个变化
       }
    }
  }
}
</script>