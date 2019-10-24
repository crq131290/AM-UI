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
      legend:[{color:"red",label:111},{color:"green",label:211111111},{color:"blue",label:3333}]
    }
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
### 页签按钮
<c-page-sign ></c-page-sign>

