<template>
  <el-table
    v-if="showTable"
    v-click-out-side="handler"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="c-table"
    :stripe="stripe"
    :border="border"
    :height="height"
    :class="['c-table__th--text--'+thAlign,'c-table__td--text--'+tdAlign,'c-table__th--bg--'+thbgColor,'c-table__th--color--'+thColor]"
    :data="data"
    :row-class-name="tableRowClassName"
    @selection-change="handleSelectionChange"
    style="width: 100%;text-align:center"
  >
    <el-table-column
      v-if="expand"
      type="expand"
    >
      <template slot-scope="scope">
        <slot
          name="expend"
          :scope="scope"
        >
        </slot>
      </template>
    </el-table-column>
    <el-table-column
      v-if="index"
      type="index"
      :index="indexMethod"
    >
    </el-table-column>
    <el-table-column
      v-if="selection"
      type="selection"
      width="55"
    >
    </el-table-column>

    <el-table-column
      v-for="(col,index) in fields"
      :key="index"
      :prop="col.prop"
      :fixed="col.fixed"
      :sortable="col.sortable"
      :label="col.label"
    >
      <template
        slot="header"
        slot-scope="scope"
      >
        <slot
          :name="'th_'+col.prop"
          :scope="scope"
        >
          {{col.label}}
        </slot>
      </template>
      <template slot-scope="scope">
        <slot
          :name="col.prop"
          :scope="scope"
        >
          <div
            v-if="type=='normal'"
            @click="clickGird(scope.$index,scope.row,col.prop)"
          > {{scope.row[col.prop]}}</div>
          <div
            v-if="type=='input'"
            @click="activeInput(scope,col.prop)"
          >
            <el-input
              v-if="show && showInput(scope.$index,col.prop)"
              :ref="col.prop"
              v-model="form[col.prop]"
              @blur="putInputData(scope,col.prop)"
              size="mini"
            ></el-input>
            <p v-show="!(show && showInput(scope.$index,col.prop))">{{scope.row[col.prop]}}</p>
          </div>
          <div
            v-if="type=='select'"
            class="select"
            @click.stop="activeSelect(scope,col.prop)"
          >
            <div v-if="!col.multiple">
              <el-select
                size="mini"
                :ref="col.prop"
                v-if="show && showInput(scope.$index,col.prop)"
                v-model="form[col.prop]"
                @change="putSelectData(scope,col.prop)"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item,index) in tableSelList[col.prop]"
                  :key="index"
                  :label="item.label"
                  :value="item[defProp.code]"
                >
                </el-option>
              </el-select>
              <p
                :title="scope.row[col.prop].label"
                v-show="!(show && showInput(scope.$index,col.prop))"
              >{{scope.row[col.prop].label}}</p>
            </div>
            <div
              v-else
              @click.stop="activeMulSelect(scope,col.prop)"
            >
              <el-select
                size="mini"
                :ref="col.prop"
                collapse-tags
                multiple
                v-if="show && showInput(scope.$index,col.prop)"
                v-model="form[col.prop]"
                @change="putMulSelectData(scope,col.prop)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in tableSelList[col.prop]"
                  :key="item[defProp.code]"
                  :label="item.label"
                  :value="item[defProp.code]"
                >
                </el-option>
              </el-select>
              <p
                :title="scope.row[col.prop]|labelFilter"
                v-show="!(show && showInput(scope.$index,col.prop))"
              >{{scope.row[col.prop]|labelFilter}}</p>
            </div>
          </div>
        </slot>
      </template>
    </el-table-column>
    <!-- width="180" -->
    <el-table-column
      v-if="operate"
      :label="operate"
      prop="operate"
    >
      <template slot-scope="scope">
        <slot
          name="operate"
          :scope="scope"
        ></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import clickOutSide from '../../common/js/click-outside'
export default {
  name: "CTable",
  directives: {
    clickOutSide
  },
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    stripe: {
      type: Boolean,
      default: () => true
    },
    selection: {
      type: Boolean,
      default: () => false
    },
    index: {
      type: Boolean,
      default: () => false
    },
    border: {
      type: Boolean,
      default: () => false
    },
    height: {
      type: String,
      default: () => null
    },
    expand: {
      type: Boolean,
      default: () => false
    },
    operate: {
      type: String,
      default: () => null
    },
    thAlign: {
      type: String,
      default: () => "center"
    },
    tdAlign: {
      type: String,
      default: () => "center"
    },
    thbgColor: {
      type: String,
      default: () => "gray"
    },
    thColor: {
      type: String,
      default: () => ""
    },
    tableRowClassName: {
      type: Function,
      default: function tableRowClassName({ row, rowIndex }) {
        if (row.active) {
          return 'is-acitive';
        }
        return '';
      }
    },
    indexMethod: {
      type: [Function],
      default: index => index + 1
    },
    loading: {
      type: [Boolean],
      default: () => false
    },
    type: {
      type: String,
      default: () => "normal"
    },
    tableSelList: {
      type: Object,
      default: () => ({ x1: [{ id: 1, label: "name" }] })
    },
    defProp: {
      type: Object,
      default: () => ({
        label: 'label',
        code: 'code'
      })
    }
  },
  data() {
    return {
      showTable: true,
      show: false,
      form: {}
    }
  },
  computed: {
    showInput2: {
      get() {
        return this.lastRowIndex
      },
      set(newValue) {
        this.lastRowIndex = newValue
      }
    }
  },
  created() {
    if (this.type !== 'normal') {
      this.fields.forEach(item => {
        this.$set(this.form, item.prop, "")
      })
    }
  },
  methods: {
    handleSelectionChange(val) {
      let list = val.map(item => {
        return item.id
      })
      this.$emit("selRow", list)
    },
    clickGird(data, index, prop) {
      this.$emit("clickCol", { data, index, prop })
    },
    activeInput(scope, type) {//激活
      if (this.show && this.showInput(scope.$index, type)) {
        return
      }
      this.activeRowIndex = scope.$index
      this.activeCol = type
      this.show = true
      this.form[type] = scope.row[type]
      this.$nextTick(() => {
        this.$refs[type][0].focus()
      })
    },
    activeSelect(scope, type) {
      if (this.show && this.showInput(scope.$index, type)) {
        return
      }
      this.activeRowIndex = scope.$index
      this.activeCol = type
      this.show = true
      this.form[type] = scope.row[type][this.defProp.code]
      this.$nextTick(() => {
        this.$refs[type][0].focus()
      })
    },
    activeMulSelect(scope, type) {
      if (this.show && this.showInput(scope.$index, type)) {
        return
      }
      this.activeRowIndex = scope.$index
      this.activeCol = type
      this.show = true
      this.form[type] = this.getCodeByArr(scope.row[type])
      console.log(this.form[type])
      this.$nextTick(() => {
        this.$refs[type][0].focus()
      })
    },
    handler() {
      this.show = false
    },
    putInputData(scope, type) {//change数据
      scope.row[type] = this.form[type]
      this.handler()
    },
    putSelectData(scope, type) {//change数据
      scope.row[type] = this.getDataByCode(this.tableSelList[type], this.form[type])
    },
    putMulSelectData(scope, type) {
      console.log(this.form[type])
      scope.row[type] = this.getDataByCodeList(this.tableSelList[type], this.form[type])
    },
    showInput(rowIndex, col) {//显示select框
      return rowIndex == this.activeRowIndex && col == this.activeCol
    },
    getDataByCode(arr, code) {//根据code获取
      return arr.filter(item => {
        return item[this.defProp.code] == code
      })[0]
    },
    getDataByCodeList(data, list) {
      let arr = []
      data.forEach(item => {
        list.forEach(code => {
          if (code == item[this.defProp.code]) {
            arr.push(item)
          }
        })
      })
      return arr
    },
    getCodeByArr(data) {
      let arr = []
      if (data) {
        data.forEach(item => {
          arr.push(item[this.defProp.code])
        })
      }
      return arr
    }
  },
  watch: {
    fields() {
      this.showTable = false
      this.$nextTick(() => {
        this.showTable = true
      })
    },
    activeRowIndex(val) {
      console.log(11122)
    }
  },
  filters: {
    labelFilter(data) {
      let arr = []
      if (data && Array.isArray(data)) {
        data.forEach(item => {
          arr.push(item.label)
        })
        return arr.join(",")
      }
      return ""
    }
  }
}
</script>

  