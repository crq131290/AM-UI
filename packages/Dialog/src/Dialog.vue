<template>
  <div class="c-dialog" >
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="cocm"
      :width="width">
      <slot></slot>
      <span slot="footer" class="c-dialog--footer">
        <slot name="btn">
          <el-button type="info" @click="hiden" :size="size">取 消</el-button>
          <el-button type="success" @click="confirm" :size="size">确 定</el-button>
        </slot>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name:"CDialog",
  props:{
    width:{
      type:String,
      default:()=>"500px"
    },
    title:{
      type:String,
      default:()=>"提示"
    },
    cocm:{
      type:Boolean,
      default:()=>false
    },
    size:{
      type:String,
      default:()=>"small"
    },
    visible:{
      type:Boolean,
      default:()=>false
    }
  },
  data(){
    return {
    }
  },
  methods:{
    show(){
      this.$emit('update:visible', true)
    },
    hiden(){
      this.$emit('update:visible', false)
    },
    confirm(){
      this.$emit("confirm")
      this.hiden()
    }
  }
}
</script>
