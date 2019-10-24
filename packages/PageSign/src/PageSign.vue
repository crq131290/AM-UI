<template>
  <div class="c-page-sign">
    <ul  @click="expand" class="ps-rel hover">
      <li class="c-page-sign--btn">
        <div class="c-page-sign--btn--before" :style="{border: '.15rem solid '+ bodyColor}">{{title}}</div>
        <div class="c-page-sign--btn--after" ></div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name:'CPageSign',
  props:{
    title:{
      type:String,
      default:()=>'页签'
    },
    bodyColor:{
      type:String,
      default:()=>'orange'
    }
  },
  methods:{
    expand(){
      this.$emit("expand")
    }
  }
}
</script>
