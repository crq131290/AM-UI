<template>
  <div class="set-gis-pic">
    <div class="ps-rel">
      <vue-draggable-resizable
        style="width:6rem"
        class="hover h-50-p"
        :x="100"
        :y="-50"
        :resizable="false"
      >
        <h3 class="text-left m-t-5 fs-18 fw-700 color-111">{{title}}</h3>
      </vue-draggable-resizable>
      <vue-draggable-resizable
        style="width:6rem"
        class="hover h-50-p"
        :x="610"
        :y="-70"
        :resizable="false"
      >
        <img
          class="compass"
          :src="compass"
          alt=""
        >
      </vue-draggable-resizable>
      <vue-draggable-resizable
        style="width:3rem"
        class="hover"
        :x="-20"
        :y="250"
        :resizable="false"
      >
        <keep-alive>
          <rect-legend
            v-if="legendType==1"
            :legend="legend"
          ></rect-legend>
          <liner-legend
            v-else
            :legend="legend"
          ></liner-legend>
        </keep-alive>
      </vue-draggable-resizable>
      <vue-draggable-resizable
        style="width:3rem"
        class="hover"
        :x="560"
        :y="385"
        :resizable="false"
      >
        <div id="scale"></div>
      </vue-draggable-resizable>
      <vue-draggable-resizable
        style="width:3rem"
        class="hover"
        :x="-10"
        :y="-70"
        :resizable="false"
      >
        <h1>
          <img
            :src="unit.url"
            alt=""
          >
          <span>{{unit}}</span>
        </h1>
      </vue-draggable-resizable>
    </div>
    <div
      :id="config.el"
      class="text-center"
    ></div>
  </div>
</template>
<script>
import * as GeoTIFF from 'geotiff'
import * as d3 from 'd3'
import chroma from 'chroma-js'
import VueDraggableResizable from 'vue-draggable-resizable'
import CGP from '@/common/js/create-gis-pic.boundle'
import RectLegend from '../../RectLegend/RectLegend'
import LinerLegend from '../../LinerLegend/LinerLegend'
export default {
  name: "SetGisPic",
  components: {
    VueDraggableResizable,
    RectLegend,
    LinerLegend
  },
  props: {
    config: {
      el: "#gis-map",
      width: 400,
      height: 340,
      readerData: data,
      features: this.regionList,
      scale: chroma.scale(this.colors),
      type: "FeatureCollection"
    },
    options:{
      type:Object,
      default:()=>({
        unit:{ label: "联智科技", url: "/static/images/unit.jpg" ,position:[]},
        compass:{url:"/static/images/timg.jpg",position:[]},
        title:{label:"",position:[]},
        legend:{label:"",type:1,position:[]},
      })
    },
    regionList: {
      type: Array,
      default: () => []
    },
    legend: {
      type: Array,
      default: () => []
    },
    legendType: {
      type: Number,
      default: () => 1
    },
    title: {
      type: [String, Object],
      default: () => ""
    }
  },
  data() {
    return {
      colors: ["#0000ff", "#00fff7", "#00ff08", "#ffff00", "#ff0000"],
      cgp: null
    };
  },
  computed:{
    unit(){
      return this.options.unit || {}
    },
    compass(){
      return this.options.compass
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {//初始化区域列表geojson

    },
    initCutLayer(code, data, options) {
      const config = this.config
      this.cgp = new CGP(config)
      let timer = setTimeout(() => {
        this.changeRegion(code, data, options, 0)
        clearTimeout(timer)
      }, 200)
    },
    drawImg(code, data, options, index) {
      if (this.cgp) {
        this.changeRegion(code, data, options, index)
      } else {
        this.initCutLayer(code, data, options, index)
      }
    },
    changeRegion(code, data, options, index) {
      this.cgp.drawImg(code, data, options, index)
      this.getScale(code)
    },
    getScale(code) {
      const [width, height] = [400, 340]
      let PIX = 6.8
      let region = {
        type: "FeatureCollection",
        features: this.regionList.filter(item => item.properties.code == code)
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
      this.svg = d3.select("#scale").append("svg")
        .attr("width", 100)
        .attr("height", 100)
      let xScale = d3.scaleOrdinal().domain([0, distance]).range([0, 50])
      let xAias = d3.axisBottom(xScale)
      this.svg.append("g")
        .attr("transform", `translate(10,10)`)
        .call(xAias)
    }
  },
}
</script>
<style lang="less" scoped>
.set-gis-pic {
  padding: 0.8rem 0.2rem 0.2rem;
  width: 6.65rem;
  height: 5rem;
  border: 2px solid #111;
  .compass {
    width: 0.2rem;
    height: 0.35rem;
  }
  h1 {
    display: flex;
    align-items: center;
    img {
      width: 16px;
      margin-right: 5px;
    }
    span {
      line-height: 20px;
    }
  }
}
</style>