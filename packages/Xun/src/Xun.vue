<template>
  <div class="c-date" :value="value">
    <el-input
      v-model="input"
      :size="size"
      placeholder="选择旬值"
      prefix-icon="el-icon-date"
      @focus="showPicker"
    >
    </el-input>
    <transition :name="'el-zoom-in-'+position">
      <div
        class="c-date__wrapper"
        v-if="show"
        v-click-outside="config"
      >
        <div v-if="mode==1" class="c-date__header">
          <i
            class="f-left c-date__icon el-icon-d-arrow-left"
            @click="changeHeader(1)"
          ></i>
          <i
            class="f-left c-date__icon el-icon-arrow-left"
            @click="changeHeader(2)"
          ></i>
          <span class="c-date__label">
            <i @click.stop="changeYearMode">{{values[0]}}年</i>
            <i @click.stop="changeMonthMode">{{values[1]}}月</i>
          </span>

          <i
            class="f-right c-date__icon el-icon-d-arrow-right"
            @click="changeHeader(3)"
          ></i>
          <i
            class="f-right c-date__icon  el-icon-arrow-right"
            @click="changeHeader(4)"
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
        <div v-if="mode==3" class="c-date__header">
          <i
            class="f-left c-date__icon el-icon-d-arrow-left"
            @click.stop="changeHeader(1)"
          ></i>
          <span class="c-date__label c-date--year">
            <i @click.stop="changeYearMode">{{values[0]}}年</i>
          </span>
          <i
            class="f-right c-date__icon el-icon-d-arrow-right"
            @click.stop="changeHeader(3)"
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
                  >上旬</span></td>
                <td><span
                    class="c-date__cell"
                    data-value="2"
                  >中旬</span></td>
                <td><span
                    class="c-date__cell"
                    data-value="3"
                  >下旬</span></td>
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
            <tbody v-show="mode==3" @click.stop="checkMonth">
              <tr v-for="i in 3" :key="i">
                <td v-for="j in 4" :key="j" class="month">
                  <span
                    class="c-date__cell"
                    :data-month="(i-1)*4+j"
                    :data-name="i*j"
                  >{{monthLabels[(i-1)*4+j-1]}}</span></td>
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
  name:'CXun',
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
      xunLabel:{
        "1":"上旬",
        "2":"中旬",
        "3":"下旬",
      },
    }
  },
  mixins: [DatePickerMixin],

  created(){
    this.paramsDate = this.value
    this.initInputLabel(10)
  },
  methods: {
    initInputLabel(step){
      let [y,m,d] = this.value[0].split("-")
      this.input = `${y}年${m}月${this.xunLabel[Math.floor(d/step)+1]}`
    },
    cellClick(e) {
      if (e.target.nodeName === 'SPAN') {
        let v = e.target.dataset.value
        let xunLabel =  this.xunLabel[v]|| '上旬'
        this.input =`${this.values[0]}年${this.values[1]}月${xunLabel}`
        this.$emit('setXun', this.input)
        this.values[2] = v
        this.show = false
        this.paramsDate = utils.setSpecialDate(this.values,'10DAY')
      }
    },
  },
  watch:{
    value(val){//outside
      this.paramsDate = val
      if(val[0]){
        this.initInputLabel(10)
      }
    }
  }
}
</script>
