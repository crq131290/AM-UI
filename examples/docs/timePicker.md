<style>
.dome-date>div:not(:first-child){
  margin-top: 10px;
}
.mw-250{
  max-width:250px;
}
</style>
<script>
export default{
  data(){
    return {
      hour:"2019-01-01 11",
      date:"2019-01-01",
      paramTime:["2019-10-11", "2019-10-20"],
    }
  }
}
</script>

# TimePicker 时间选择器
----提供小时、日、候、旬、月、季、年七种粒度

### 基本用法

<div class="dome-date demo-block">
  <c-time-picker class="mw-250" v-model="hour" :type="1"></c-time-picker>
  <c-time-picker class="mw-250" v-model="date" :type="2"></c-time-picker>
</div>

:::demo
```html
<div>
  <c-time-picker v-model="hour" :type="1"></c-time-picker>
  <c-time-picker v-model="date" :type="2"></c-time-picker>
</div>
<script>
export default{
  data(){
    return {
      hour:"2019-01-01 11",
      date:"2019-01-01",
    }
  }
}
</script>
```
:::


### Attributes
|参数|说明|类型|可选值|默认值|
|----|---|----|-----|------|
|type|类型|num|1~7|1|
|position|选择器位置|str|bottom/top|bottom|
|size|尺寸|str| |small|


### 候值选择器
----提供候值选择器，返回类型是字符数组

### 基本用法

<div class="dome-date demo-block">
  <c-hou  class="mw-250"  v-model="paramTime"></c-hou>
</div>

:::demo
```html
<div>
  <c-hou v-model="paramTime"></c-hou>
</div>
<script>
export default{
  data(){
    return {
      paramTime:"2019-01-01",
    }
  }
}
</script>
```
:::

### 旬值选择器
----提供旬值选择器，返回类型是字符数组

### 基本用法
<div class="dome-date demo-block">
  <c-xun  class="mw-250"  v-model="paramTime"></c-xun>
</div>

:::demo
```html
<div>
  <c-xun v-model="paramTime"></c-xun>
</div>
<script>
export default{
  data(){
    return {
      paramTime:"2019-01-01",
    }
  }
}
</script>
```
:::
### 季值选择器
----提供季值选择器，返回类型是字符数组

### 基本用法
<div class="dome-date demo-block">
  <c-season  class="mw-250"  v-model="paramTime"></c-season>
</div>


:::demo
```html
<div>
  <c-season v-model="paramTime"></c-season>
</div>
<script>
export default{
  data(){
    return {
      paramTime:"2019-01-01",
    }
  }
}
</script>
```
:::