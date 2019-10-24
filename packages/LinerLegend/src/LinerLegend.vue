<template>
  <div class="c-legend--liner">
    <div v-if="type=='col'" class="c-legend--liner--col__wrapper">
      <div class="c-legend--liner--col__inner clear">
        <a class="c-legend--liner--col__liner f-left" :style="{background:getLinerCol,width:col.width,height:col.height}"></a>
        <ul class="c-legend--liner--col__label f-left" :style="{height:col.height||'350px'}">
          <li v-for="(item,index) in data" :key="index">
            {{item.label}} {{unit}}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="type=='row'" class="c-legend--liner--row__wrapper">
      <div class="c-legend--liner--row__inner clear" >
        <div class="c-legend--liner--row__liner" :style="{background:getLinerRow,width:row.width,height:row.height}"></div>
        <ul class="c-legend--liner--row__label">
          <li v-for="(item,index) in data" :key="index">{{item.label}}</li>
        </ul>
        <span class="c-legend--liner--row__unit">
          {{unit}}
        </span>
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
    col:{
      type:Object,
      default:()=>({height:'350px',width:'20px'})
    },
    row:{
      type:Object,
      default:()=>({height:'20px',width:'350px'})
    },
    unit:{
      type:String,
      default:()=>"℃"
    },
    type:{
      type:String,
      default:()=>"col"
    },
    notValue:{
      type:Object,
      default:()=>({
        color:"#efefef",
        isWhite:false
      })
    }
  },
  computed:{
    getLinerCol(){
      let liner = this.data.map(item=>item.color)
      if(this.notValue.isWhite) liner.unshift(this.notValue.color)
      return 'linear-gradient(to top,'+ liner.join(',')+')'
    },
    getLinerRow(){
      let liner = this.data.map(item=>item.color)
      liner.push(this.data[this.data.length-1].color)
      if(this.notValue.isWhite) liner.unshift(this.notValue.color)
      return 'linear-gradient(to right,'+ liner.join(',')+')'
    },
  },
}
</script>

