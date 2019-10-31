<template>
  <div class="c-date" :value="value" v-click-outside="handler">
    <el-input
      v-model="input"
      :size="size"
      placeholder="选择季度值"
      prefix-icon="el-icon-date"
      @focus="showPicker"
    >
    </el-input>
    <transition :name="'el-zoom-in-'+position">
      <div
        class="c-date__wrapper"
        v-if="show"
      >
        <div v-if="mode==1" class="c-date__header">
          <i
            class="f-left c-date__icon el-icon-d-arrow-left"
            @click="changeHeader(1)"
          ></i>
          <span class="c-date__label">
            <i @click.stop="changeYearMode">{{values[0]}}年</i>
          </span>
          <i
            class="f-right c-date__icon el-icon-d-arrow-right"
            @click="changeHeader(3)"
          ></i>
        </div>
        <div v-if="mode==2" class="c-date__header">
          <i
            class="f-left c-date__icon el-icon-d-arrow-left"
            @click.stop="changeHeader(5)"
          ></i>
          <span class="c-date__label c-date--year">
            <i>{{startYear}}年</i>
            -
            <i >{{startYear+9}}年</i>
          </span>
          <i
            class="f-right c-date__icon el-icon-d-arrow-right"
            @click.stop="changeHeader(6)"
          ></i>
        </div>
        <div class="c-date__body">
          <table
            class="c-date__tab"
          >
            <tbody v-show="mode==1" @click.stop="cellClick">
              <tr>
                <td><span
                    class="c-date__cell"
                    data-value="1"
                    data-name="春季"
                  >春季</span></td>
                <td><span
                    class="c-date__cell"
                    data-value="2"
                    data-name="夏季"
                  >夏季</span></td>
              </tr>
              <tr>
                <td><span
                    class="c-date__cell"
                    data-value="3"
                    data-name="秋季"
                  >秋季</span></td>
                <td><span
                    class="c-date__cell"
                    data-value="4"
                    data-name="冬季"
                  >冬季</span></td>
              </tr>
            </tbody>
            <tbody v-show="mode==2" @click.stop="checkYear">
              <tr v-for="(items,row) in yearList" :key="row" >
                <td v-for="(item,col) in items" :key="col" class="c-date__year" :class="{active:values[0]==item}">
                  <span
                    v-if="!(row==2&&col>1)"
                    class="c-date__cell"
                    :data-year="item"
                    :data-name="item"
                  >{{item}}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { DatePickerMixin } from '../../common/js/mixins'
import utils from '../../common/js/utils'
export default {
  name:"CSeason",
  props: {
    size: {
      type: String,
      default: () => ""
    },
    position:{
      type:String,
      default:()=>'bottom'
    },
    value:{
      type:[Array],
      default:()=>""
    },
  },
  data() {
    return {
      seasonLabel:{
        1:"春季",
        2:"夏季",
        3:"秋季",
        4:"冬季",
      },
    }
  },
  mixins: [DatePickerMixin],
  created(){
    this.paramsDate = this.value
    this.initInputLabel(3)
  },
  methods: {
    initInputLabel(step){
      let [y,m,d] = this.value[0].split("-")
      this.input = `${y}年${this.seasonLabel[Math.floor(m/step)]}`
    },
    cellClick(e) {
      if (e.target.nodeName === 'SPAN') {
        this.input = `${this.values[0]}年${this.seasonLabel[e.target.dataset.value]}`
        this.$emit('setSeason', this.input)
        this.values[2] = e.target.dataset.value
        this.show = false
        this.paramsDate = utils.setSpecialDate(this.values,'SEA')
      }
    },
    checkYear(e){//select year
      if(e.target.nodeName==='SPAN'){
        this.$set(this.values,0,e.target.dataset.year)
        this.mode=1
      }
    },
  },
  watch:{
    show(val){
      if(!val){
        this.mode=1
      }
    },
    value(val){//outside
      this.paramsDate = val
      if(val[0]){
        this.initInputLabel(3)
      }
    }
  }
}
</script>
