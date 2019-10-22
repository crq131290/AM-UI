<template>
  <div class="c-date"  :value="value">
    <el-input
      :size="size"
      v-model="input"
      placeholder="选择候值"
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
                    data-hou="1"
                    data-name="初候"
                  >初候</span></td>
                <td><span
                    class="c-date__cell"
                    data-hou="2"
                    data-name="第二候"
                  >二候</span></td>
                <td><span
                    class="c-date__cell"
                    data-hou="3"
                    data-name="第三候"
                  >三候</span></td>
              </tr>
              <tr>
                <td><span
                    class="c-date__cell"
                    data-hou="4"
                    data-name="第四候"
                  >四候</span></td>
                <td><span
                    class="c-date__cell"
                    data-hou="5"
                    data-name="第五候"
                  >五候</span></td>
                <td><span
                    class="c-date__cell"
                    data-hou="6"
                    data-name="末候"
                  >末候</span></td>
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
                <td v-for="j in 4" :key="j" class="c-date__month">
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
  name:'CHou',
  props:{
    size:{
      type:String,
      default:()=>""
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
  data(){
    return {
      houLabel:{
        "1":"初候",
        "2":"第二候",
        "3":"第三候",
        "4":"第四候",
        "5":"第五候",
        "6":"末候",
      },
    }
  },
  mixins: [DatePickerMixin],
  created(){
    this.paramsDate = this.value
    this.initInputLabel(5)
  },
  methods: {
    initInputLabel(step){
      let [y,m,d] = this.value[0].split("-")
      this.input = `${y}年${m}月${this.houLabel[Math.floor(d/step)+1]}`
    },
    cellClick(e) {
      if (e.target.nodeName === 'SPAN') {
        this.input =`${this.values[0]}年${this.values[1]}月${this.houLabel[e.target.dataset.hou]}`          
        this.$emit('setHou', this.input)
        this.values[2] = e.target.dataset.hou
        this.show = false
        this.paramsDate = utils.setSpecialDate(this.values,'5DAY')
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
        this.initInputLabel(5)
      }
    }
  }
}
</script>