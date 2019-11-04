<template>
  <div class="c-steps">
    <ul class="c-steps__wrapper flex">
      <li v-for="(item,index) in data" :key="index" class="c-steps__item" :class="{'active':active>index}">
        <div class="flex s-steps__inner text-center">
          <i v-if="index!=0" class="in-block c-steps__line ps-rel" :class="{'active':active>=index}"></i>
          <div>
            <i v-show="active<=index" class="in-block c-steps__icon text-center" >{{item[defProp.step]}}</i>
            <i v-show="active>index" class="in-block c-steps__icon text-center">√</i>
            <div class="c-steps__label m-t-10">{{item[defProp.label]}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name:"CSteps",
  props:{
    data:{
      type:Array,
      default:()=>[]
    },
    active:{
      type:Number,
      default:()=>0
    },
    defProp:{
      type:Object,
      default:()=>({
        "step":'step',
        "label":"label"
      })
    }
  }
}
</script>
