<template>
  <div class="c-two-column">
    <div class="c-two-column__left " :style="{width:width,background:getBackground.left}">
      <slot name="left"></slot>
    </div>
    <div class="c-two-column__right" :style="{background:getBackground.right}">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name:"CTwoCol",
  props:{
    bgcolor:{
      type:String,
      default:()=>"fff"
    },
    width:{
      type:String,
      default:()=>"150px"
    },
    options:{
      type:[Object],
      default:()=>({})
    }
  },
  data(){
    return {
    }
  },
  computed: {
    getBackground(){
      return this.options.background || { left:"#50bfff",right:"#fff" }
    }
  }
}
</script>
