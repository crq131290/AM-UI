<template>
  <div class="annular">
    <div :id="element" :style="styleOpt" ></div>
    <slot></slot>
  </div>
</template>
<script>
import Echarts from 'echarts'
const config = {
  style:{
    width:"300px",
    height:"300px"
  },
  label:{
    normal: {
      show: true,
      position: 'outside',
      textStyle: {
        fontSize: '16',
        fontWeight: 'bold'
      },
    },
    emphasis: {
      show: true,
      textStyle: {
        fontSize: '16',
        fontWeight: 'bold'
      },
      formatter:"{d}%"
    },
  },
  labelLine:{
    normal: {
        show: true
    }
  },
  color:["#EEFB03","#FB8C04","#FB0404","#2C03FB","#0FFB03",],
  tooltip:{
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  }
}
export default {
  name:"CPie",
  props:{
    name:{
      type:String,
      default:()=>'到报率'
    },
    element:{
      type:String,
      default:"annular"
    },
    data:{
      type:Array,
      default:()=>[{value:11,name:"test"},{value:13,name:"test2"},{value:16,name:"test3"}]
    },
    radius:{
      type:Array,
      default:()=>['0%', '50%']
    },
    hoverOffset:{
      type:Number,
      default:()=>2
    },
    options:{
      type:Object,
      default:()=>({})
    }
  },
  data(){
    return {
      styleOpt:config.style
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
      let index = 0
      this.annular = Echarts.init(document.querySelector(`#${this.element}`));
      let option = {  
        tooltip: this.options.tooltip ||config.tooltip,
        color:this.options.color||config.color,
        series: [
          {
            name:this.name,
            type:'pie',
            radius: this.radius,
            hoverOffset:this.hoverOffset,
            avoidLabelOverlap: false,
            label:this.options.label||config.label,
            labelLine: this.options.labelLine||config.labelLine,
            data:this.data
          }
        ]
      };
      this.annular.setOption(option);    
      this.annular.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: 0})    
      this.annular.on('mouseover',(v) => {
        if(v.dataIndex != index){
          this.annular.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: index
          });
        }
      });
      this.annular.on('mouseout',(v) => {
        this.annular.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: 0});
      });
    }
  },
}
</script>