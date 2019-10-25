<template>
  <div class="c-select-tree rx-3">
    <el-row class="m-b-10 c-select-tree__title__wrapper pad-5">
      <el-col :span="8">
        <slot name="title">
          <h3 class="c-select-tree__title m-0 color-fff">{{title}}选择</h3>
        </slot>
      </el-col>
      <el-col :span="16">
        <el-autocomplete
          class="search-input w-100"
          size="small"
          v-model="search_input"
          :fetch-suggestions="querySearchAsync"
          :placeholder="placeholder"
          :trigger-on-focus="false"
          suffix-icon="el-icon-search"
          @select="handleSelect"
        ></el-autocomplete>
      </el-col>
    </el-row>
    <div class="c-select-tree__wrapper bg-fff" :style="{height}">
      <el-tree
        ref="tree"
        :data="data"
        show-checkbox
        :node-key="defaultProps.value"
        :default-expanded-keys="defExpKeys"
        :default-expand-all="isExpand"
        @check="checkChange"
        :props="defaultProps">
      </el-tree>
    </div>
  </div>
</template>
<script>
export default {
  name:"CSelectTree",
  props:{
    data:{
      type:[Array,Object],
      default:()=>[]
    },
    title:{
      type:String,
      default:()=>"区域"
    },
    defaultProps:{
      type:Object,
      default:()=>({
        children: 'children',
        label: 'label',
        value:'id'
      })
    },
    queryData:{
      type:Array,
      default:()=>[]
    },
    defExpKeys:{
      type:Array,
      default:()=>['150000']
    },
    mode:{
      type:Number,
      default:()=>2
    },
    selectNode:{
      type:[Array],
      default:()=>[]
    },
    height:{
      type:String,
      default:()=>'300px'
    }
  },
  data(){
    return {
      search_input:"",
      isExpand:false,
    }
  },
  computed:{
    placeholder(){
      return `请输入${this.title}名称`
    }
  },
  mounted(){
    this.$refs.tree.setCheckedKeys(this.selectNode)
  },
  methods:{
    checkChange(node,data){//a是当前的
      if(data.checkedNodes.length!=0 && this.mode==1){//单选模式
        this.$refs.tree.setCheckedKeys([]);
        this.$refs.tree.setCheckedKeys([node[this.defaultProps.value]]);
        let keys = this.getCheckedKeys()
        this.$emit("checkChange",keys[0])
      }else{
        let keys = this.getCheckedKeys(true)
        this.$emit("checkChange",keys)
      }
    },
    getCheckedNodes(leaf,half){
      return this.$refs.tree.getCheckedNodes(leaf,half)
    },
    getCheckedKeys(leaf){
      return this.$refs.tree.getCheckedKeys(leaf)
    },
    querySearchAsync(queryString, cb) {
      var queryData = this.queryData;
      var results = queryString ? queryData.filter(this.createStateFilter(queryString)) : queryData;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {//选择对应的node
      if(this.mode==1){
        this.$refs.tree.setCheckedKeys([]);
      }
      this.$refs.tree.setChecked(item.id,true,true)
    },
    setCheckedNodes(data){
      this.$refs.tree.setCheckedNodes(data)
    }
  },
}
</script>
