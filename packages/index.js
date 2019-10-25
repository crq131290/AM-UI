/**
 * @author crq131290
 * Date: 2019/10/18
 */

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import CheckboxGroup from "./CheckboxGroup"
import Dialog from "./Dialog"
import GradeLegend from './GradeLegend'
import Hou from "./Hou";
import LinerLegend from "./LinerLegend"
import MapLegend from "./MapLegend"
import PageSign from "./PageSign"
import Panl from "./Panl"
import PdfView from "./PdfView"
import ProgressBar from "./ProgressBar"

import RectLegend from "./RectLegend"
import Season from "./Season";
import SelectTree from "./SelectTree";
import TimePicker from "./TimePicker"
import TwoCol from "./TwoCol"
import Xun from "./Xun";

const components = [
  CheckboxGroup,
  Dialog,
  GradeLegend,
  Hou,
  LinerLegend,
  PageSign,
  Panl,
  PdfView,
  ProgressBar,
  MapLegend,
  RectLegend,
  Season,
  SelectTree,
  TimePicker,
  TwoCol,
  Xun,
];

const install = function(Vue) {
  Vue.use(Element)
  if (install.installed) return;
  install.installed = true; //自定义变量 用来识别是否已经进行过安装
  components.map(component => Vue.component(component.name, component));
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.vue);
}

export default {
  install
};
