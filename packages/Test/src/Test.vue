<template>
  <div class="test">
    <div class="outer">
      <div v-click-out-side="config" class="inner">
        <div class="inner__box"></div>
      </div>
    </div>
  </div>
</template>
<script>
import clickOutSide from '../../common/js/click-outside'
export default {
  name: "CTest",
  directives:{
    clickOutSide
  },
  data(){
    return {
    }
  },
  methods:{
    config(){
      console.log(123)
    }
  }
  
}
</script>
<style lang="less" scope>
.outer{
  margin-bottom: 300px;
  padding: 100px;
  width: 500px;
  height: 500px;
  background-color: aqua;
  .inner{
    width: 250px;
    height: 250px;
    background-color: rgb(255, 115, 0);
    .inner__box{
       width: 125px;
      height: 125px;
      background-color: rgb(0, 255, 106);
    }
  }
}
</style>
  