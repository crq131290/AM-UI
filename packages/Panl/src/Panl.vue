<template>
  <div class="c-panl flex" :style="{background:bgcolor}">
    <span class="c-panl__wrapper">
      <i class="in-block c-panl__rect" :style="{background:rectColor}"></i>
      <span class="c-panl__title" :style="{fontWeight:weight,color:color}">{{title}}</span>
      <keep-alive>
        <span class="c-panl__tip" v-if="tip">({{tip}})</span>
      </keep-alive>
    </span>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:"CPanl",
  props:{
    title:{
      type:String,
      default:()=>"数据权限"
    },
    weight:{
      type:String,
      default:()=>"400"
    },
    color:{
      type:String,
      default:()=>"#fff"
    },
    bgcolor:{
      type:String,
      default:()=>"#2f3237"
    },
    tip:{
      type:String,
      default:()=>""
    },
    rectColor:{
      type:String,
      default:()=>"#13ce66"
    },
    options:{
      type:Object,
      default:()=>({})
    }
  }
}
</script>
