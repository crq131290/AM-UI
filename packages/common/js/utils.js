// import {Parser } from 'json2csv'

export function getMax(a,b) {//获取最大值
  return a>b?a:b  
}
export function getMin(a,b) {//获取最小值
  return a<b?a:b  
}
export function deepCopy(data){
  return JSON.parse(JSON.stringify(data))
}
export function resultCSV(data){
  let arr = data.split("\n"),keys = arr[0].split(","),result = []
  for(let i=1;i<arr.length-1;i++){
    let obj = {},items = arr[i].split(",")
    for(let j=0;j<items.length;j++){
      obj[keys[j]] = items[j]
    }
    result.push(obj)
  }
  return result
}
export function resultProp(data){
  let arr = data.split("\n")[0].split(",")
  return arr
}

export function download(data){
  let filename = data.filename
  // utf-8保存的csv格式文件要让Excel正常打开的话，必须加入在文件最前面加入BOM(Byte order)。如果接收者收到以EF BB BF开头的字节流，就知道这是UTF-8编码了
  let blob = new Blob(["\uFEFF"+data.result], {type: 'Files'})
  let fileUrl = URL.createObjectURL(blob);
  let link = document.createElement('a');
  link.href = fileUrl;
  link.download = filename;
  link.click();
  fileUrl = null
  link = null
}


export function jsonToCSV(params){
  let fields = params.fields
  const parser = new Parser({fields});
  return parser.parse(params.result);
}

export function arrToOne(arr,key){//数组扁平化
  return arr.reduce((result, item) => {
    return result.concat(Array.isArray(item[key]) ? arrToOne(item[key],key) : item);
  }, []);
}

export default {
  formatDate(data,type){
    const date = new Date(data),
          Y = date.getFullYear(),
          M = date.getMonth()+1,
          d = date.getDate(),
          h = date.getHours(),
          m = date.getMinutes(),
          s = date.getSeconds()
    const strategy = {
      'yyyy-M-d':`${Y}-${M}-${d}`,
      'yyyy-MM-dd':`${Y}-${M<10?'0'+M:M}-${d<10?'0'+d:d}`,
      'yyyy-MM-dd-HH':`${Y}-${M}-${d}-${h<10?'0'+h:h}`,
      'yyyy-MM-dd H:m:s ':`${Y}-${M}-${d} ${h}-${m}-${s}`,
      'yyyy-MM-dd HH:mm:ss ':`${Y}-${M<10?'0'+M:M}-${d<10?'0'+d:d} ${h<10?'0'+h:h}-${m<10?'0'+m:m}-${s<10?'0'+s:s}`,
    }
    return strategy[type]
  },
  formatDateRange(arr,type){//格式化时间
    return arr.map(item=>{
      return this.formatDate(item,type)
    })
  },
  getYearLastDate(Y) {//某年最后一天
    let time = new Date(Y+1,0,1)
    let lastDate =new Date(time.getTime() -1000*60*60*24) 
    return lastDate
  },
  getMonthLastDate(Y,M){//获取每月最后一天
    let time = new Date(Y,M+1,1)
    let lastDate =(new Date(time.getTime() -1000*60*60*24) ).getDate()
    return lastDate
  },
  setSpecialDate(vals,current_type){
    if(current_type ==='5DAY'||current_type ==='10DAY'){
      let len = +current_type.match(/\d+/),
          start = new Date(vals[0],vals[1]-1,(vals[2]-1) * len + 1),
          end = vals[2] * len > 28
                ? new Date(vals[0],vals[1]-1,this.getMonthLastDate(vals[0],vals[1]-1))
                : new Date(vals[0],vals[1]-1,vals[2] * len )
      return this.formatDateRange([start,end],'yyyy-MM-dd') 
    }else if(current_type ==='SEA'){
      let start = new Date(vals[0],(vals[2]-1)*3+2,1),
          end = new Date(vals[0],vals[2]*3+2,0)
      return this.formatDateRange([start,end],'yyyy-MM-dd') 
    }
  }
}