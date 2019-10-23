<template>
  <div class="c-liner-legend">
    <div class="c-liner-legend__wrapper">
      <div class="c-liner-legend__inner clear" :style="options">
        <a class="c-liner-legend__liner f-left" :style="{background:getLinerBg}"></a>
        <ul class="c-liner-legend__unit f-left">
          <li class="c-liner-legend__label" v-for="(item,index) in data" :key="index">
            {{item.label}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'CLinerLegend',
  props:{
    data:{
      type:Array,
      default:()=>[]
    },
    options:{
      type:Object,
      default:()=>({height:'350px'})
    }
  },
  computed:{
    getLinerBg(){
      let liner = this.data.map(item=>item.color)
      return 'linear-gradient(to top,'+ liner.join(',')+')'
    },
  },
}
</script>
<style lang="less" scoped>
  .c-liner-legend{
    .c-liner-legend__wrapper{
      position: absolute;
      padding:10px;
      cursor: pointer;
      border: 1px solid transparent;
      user-select: none;
    }
    .c-liner-legend__inner{
      position: relative;
      height:350px;
    }
    .c-liner-legend__inner .c-liner-legend__liner{
      width: 20px;
      height: 100%;
      border-radius:30px; 
      margin-right: 10px;
    }
    .c-liner-legend__inner .c-liner-legend__unit {
      display: flex;
      flex-direction: column-reverse;
      justify-content: space-between;
      margin: 0;
      padding: 0;
      height: 100%;
      font-size: 10px;
      line-height:0;
      text-align: left;
    }
  }
</style>

