<template>
  <div class="c-legend">
    <div class="c-legend--rect">
      <ul class="c-legend--rect__wrapper">
        <li class="c-legend--rect__inner" v-for="(item,index) in data" :key="index">
          <a class="c-legend--rect__inner__rect" :style="{background:item[defProp.color]}"></a>
          <span class="c-legend--rect__label">{{item[defProp.label]}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name:'CRectLegend',
  props:{
    data:{
      type:Array,
      default:()=>[]
    },
    defProp:{
      type:Object,
      default:()=>({color:'color',label:'label'})
    },
    options:{
      type:Object,
      default:()=>({})
    }
  },
}
</script>

