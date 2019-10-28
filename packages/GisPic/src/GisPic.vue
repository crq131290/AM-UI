<template>
  <div class="c-gis-pic">
    <div class="ps-rel">
      <vue-draggable-resizable
        style="width:6rem;height:50px;"
        class="hover"
        :x="0"
        :y="-50"
        :resizable="false"
      >
        <h3 class="text-center m-t-5 fs-18 fw-700 color-111">{{title}}</h3>
      </vue-draggable-resizable>
      <vue-draggable-resizable
        style="width:50px;height:50px"
        class="hover"
        :x="550"
        :y="-70"
        :resizable="false"
      >
        <img
          class="c-gis-pic__compass"
          :src="compass.url"
          alt=""
        >
      </vue-draggable-resizable>
      <vue-draggable-resizable
        style="width:3rem"
        class="hover"
        :x="-10"
        :y="legend.type==1?250:50"
        :resizable="false"
      >
        <keep-alive>
          <c-rect-legend v-if="legend.type==1" :data="legend.data"></c-rect-legend>
          <c-liner-legend v-else :data="legend.data" ></c-liner-legend>
        </keep-alive>
      </vue-draggable-resizable>
      <vue-draggable-resizable
        style="width:100px;height:30px;overflow:hidden"
        class="hover"
        :x="550"
        :y="385"
        :resizable="false"
      >
        <div :id="element.scale"></div>
      </vue-draggable-resizable>
      <vue-draggable-resizable
        style="width:150px;height:20px"
        class="hover"
        :x="-10"
        :y="-70"
        :resizable="false"
      >
        <div class="c-gis-pic__unit">
          <img
            :src="unit.url"
            alt=""
          >
          <span>{{unit.label}}</span>
        </div>
      </vue-draggable-resizable>
    </div>
    <div
      :id="element.map"
      class="text-center"
    ></div>
  </div>
</template>
<script>
import * as GeoTIFF from 'geotiff'
import * as d3 from 'd3'
import chroma from 'chroma-js'
import VueDraggableResizable from 'vue-draggable-resizable'
import CGP from '../../common/js/create-gis-pic.boundle'
import RectLegend from '../../RectLegend'
import LinerLegend from '../../LinerLegend'
export default {
  name: "CGisPic",
  components: {
    VueDraggableResizable,
    RectLegend,
    LinerLegend
  },
  props: {
    config: {
      type:Object,
      default:()=>({
        width: 480,
        height: 360,
        features: [],
        colors:["#0000ff", "#00fff7", "#00ff08", "#ffff00", "#ff0000"],
        type: "FeatureCollection",
        projection:"geoMercator",
        scale:"#scale"
      })
    },
    options:{
      type:Object,
      default:()=>({code:150000,colors:["#0000ff", "#00fff7", "#00ff08", "#ffff00", "#ff0000"],type:2,values:[]})
    },
    compass:{
      type:Object,
      default:()=>({url:"/static/timg.jpg",position:[]})
    },
    unit:{
      type:Object,
      default:()=>({ label: "联智科技", url: "/static/images/unit.jpg" ,position:[]})
    },
    regionList: {
      type: Array,
      default: () => []
    },
    legend: {
      type: Object,
      default: () => ({
        type:1,
        data:[]
      })
    },
    title: {
      type: [String, Object],
      default: () => ""
    },
    element:{
      type:Object,
      default:()=>({map:"map",scale:"scale"})
    },
    data:{
      type:ArrayBuffer,
      default:()=>([])
    }
  },
  data() {
    return {
      cgp: null
    };
  },
  mounted(){
    this.$nextTick(()=>{
      this.initLayer(this.options.code,this.data,this.options)
    })
  },
  methods: {
    initLayer(code, buffer, options) {//region,buffer,gisOpt
      const config = this.config
      this.cgp = new CGP(`#${this.element.map}`,config,this.regionList)
      this.changeRegion(code, buffer, options, 0)
    },
    drawImg(code, buffer, options, index) {
      if (this.cgp) {
        this.changeRegion(code, buffer, options, index)
      } else {
        this.initCutLayer(code, buffer, options, index)
      }
    },
    changeRegion(code, buffer, options, index) {
      this.cgp.drawImg(code, buffer, options, index)
      this.getScale(code)
    },
    getScale(code) {
      const [width, height] = [this.config.width, this.config.height]
      let PIX = 6.8
      let region = {
        type: "FeatureCollection",
        features: this.regionList.filter(item => item.properties.code === code)
      }
      const projection = d3.geoMercator().fitExtent([[0, 0], [width, height]], region)
      const bounds = [projection.invert([0, 0]), projection.invert([0, height])]
      const [[MLonB, MLatB], [MLonA, MLatA]] = [bounds[0], bounds[1]]
      const distance = Math.floor(111 * (MLatB - MLatA) / PIX) + 'km'
      this.setScale(distance)
    },
    setScale(distance) {
      if (this.svg) {
        this.svg.remove()
      }
      this.svg = d3.select(`#${this.element.scale}`).append("svg")
        .attr("width", 100)
        .attr("height", 100)
      let xScale = d3.scaleOrdinal().domain([0, distance]).range([0, 50])
      let xAias = d3.axisBottom(xScale)
      this.svg.append("g")
        .attr("transform", `translate(10,10)`)
        .call(xAias)
    }
  }
}
</script>