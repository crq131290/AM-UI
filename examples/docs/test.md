<style>
.dome-alert .c-date:not(:first-child){
  margin-top: 10px;
}
</style>
<script>
export default{
  data(){
    return {
      xx:"2019-01-01",
      test:["2019-10-11", "2019-10-20"],
      dialogVisible:false,
      checkboxData:[{id:1,label:'1111'}],
      legend:[{color:"red",label:111},{color:"green",label:211111111},{color:"blue",label:3333}],
      tree:[{id:1,label:123},{id:2,label:123},{id:3,label:123}],
      regionList:[],
      legendOpt:{data:[{color:"red",label:111},{color:"green",label:211111111},{color:"blue",label:3333}],type:1},
      gis:null,
      pieData:[{value:11,name:"test"},{value:13,name:"test2"},{value:16,name:"test3"},],
      tableStructure:[{label:"x1",prop:"x1"},{label:"b",prop:"b"}],
      tableData:[{x1:{label:111,code:1},b:321},{x1:{label:111,code:122},b:321},{x1:{label:111,code:12},b:321},{x1:{label:111,code:122},b:321},]
    }
  },
  created(){
    fetch("/static/neimeng.geojson").then(res=>{
      return res.json()
    }).then(res=>{
      this.regionList = res.features
      return fetch("/static/temp.tif")
    }).then(res=>{
      let that = this;
      (async function(){
        const buffer = await res.arrayBuffer()
        that.gis = buffer
        that.$nextTick(()=>{
          // that.$refs.GP.initLayer(150000,buffer)
        })
      })()
    })
  },
  watch:{
    test(val){
      console.log(val)
    }
  }
}
</script>

### 基本用法
页面中的非浮层元素，不会自动消失。
<div class="dome-alert demo-block">
  <c-xun v-model="test"></c-xun>
  <c-hou v-model="test"></c-hou>
  <c-season v-model="test"></c-season>
  <c-time-picker v-model="xx"></c-time-picker>
</div>


<br>
<el-button @click="dialogVisible=!dialogVisible">dialog</el-button>
<br>
<c-dialog :visible.sync="dialogVisible"></c-dialog>

<br>
<c-checkbox-group :data="checkboxData"></c-checkbox-group>

<br>
<c-two-col>
  <div slot="left">
    left
  </div>
  <div slot="right">
    right
  </div>
</c-two-col>
<br>

### rect色斑图例
<c-rect-legend :data="legend"></c-rect-legend>
<br>
### map色系图例
<c-map-legend :data="legend" :labelList="[1,2,3,4,5]"></c-map-legend>
<br>
### col色系图例
<c-liner-legend :data="legend" ></c-liner-legend>
<br>
### row色系图例
<c-liner-legend :data="legend" type="row"></c-liner-legend>
<br>
### map色斑图例
<c-grade-legend :data="legend" :labelList="[1,2,3]"></c-grade-legend>
### progress精度条
<c-progress-bar ></c-progress-bar>
### 页签按钮
<c-page-sign ></c-page-sign>
<br>

### panl
<c-panl></c-panl>

### pdfView
<c-pdf-view class="w-50" pdf-url="/static/test .pdf"></c-pdf-view>

### SelectTree
<c-select-tree :data="tree" class="w-30"></c-select-tree>
### GIS
<c-gis-pic v-if="gis" :data="gis" title="内蒙古自治区" :legend="legendOpt"  :region-list="regionList"></c-gis-pic>

### 饼图
<c-pie ></c-pie>

### 表格组件
<c-table :fields="tableStructure" :data="tableData"></c-table>

<!-- ### test

<c-test></c-test> -->