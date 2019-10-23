<template>
  <div class="c-checkbox-group">
    <el-checkbox-group  :class="[typeClass]" v-model="checkList">
      <el-checkbox :label="item[defProps.id]" :disabled="item.disabled" v-for="item in data" :key="item[defProps.id]">{{item[defProps.label]}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  name: "CCheckboxGroup",
  props:{
    data:{
      type:Array,
      default:()=>[]
    },
    defProps:{
      type:Object,
      default:()=>({
        id:'id',
        label:'label'
      })
    },
    type:{
      type:String,
      default:"info"
    }
  },
  data () {
    return {
      checkList:[]
    };
  },
  computed: {
    typeClass(){
      return `.c-checkbox-group--${this.type}`
    }
  },
  methods:{
    resetCheckList(){
      this.checkList = []
    },
    setCheckList(data){
      this.checkList = data
    },
    getCheckList(){
      return this.checkList
    }
  },
  watch: {
    checkList(val){
      this.$emit("selectFactor",val)
    }
  },
}
</script>
<style lang="less">

</style>