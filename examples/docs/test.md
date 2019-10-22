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
      test:["2019-10-11", "2019-10-20"]
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

::: demo
```html
<div>
  <c-xun v-model="test"></c-xun>
  <c-hou v-model="test"></c-hou>
  <c-season v-model="test"></c-season>
  <c-time-picker v-model="xx"></c-time-picker>
</div>
```
:::

