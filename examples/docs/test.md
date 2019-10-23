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
      legend:[{color:"red",label:1},{color:"green",label:2},{color:"blue",label:3}]
    }
  },
  watch:{
    test(val){
      console.log(val)
    }
  }
}
</script>
<div class="dome-alert demo-block">
  <c-xun v-model="test"></c-xun>
  <c-xun v-model="test"></c-xun>
  <c-xun v-model="test"></c-xun>
  <c-hou v-model="test"></c-hou>
  <c-season v-model="test"></c-season>
  <c-time-picker v-model="xx"></c-time-picker>
</div>

### 基本用法
页面中的非浮层元素，不会自动消失。
<div class="dome-alert demo-block">
  <c-xun v-model="test"></c-xun>
  <c-hou v-model="test"></c-hou>
  <c-season v-model="test"></c-season>
  <c-time-picker v-model="xx"></c-time-picker>
</div>


<el-button @click="dialogVisible=!dialogVisible">111</el-button>
<c-dialog :visible.sync="dialogVisible"></c-dialog>


<c-checkbox-group :data="checkboxData"></c-checkbox-group>

<c-two-col>
  <div slot="left">
    left
  </div>
  <div slot="right">
    right
  </div>
</c-two-col>

<c-rect-legend :data="legend"></c-rect-legend>
<c-map-legend :data="legend" :labelList="[1,2,3,4,5]"></c-map-legend>
<c-liner-legend :data="legend" ></c-liner-legend>
