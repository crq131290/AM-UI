const d3 = require("d3")
const GeoTIFF = require("geotiff")
const chroma = require("chroma-js")
class CGP {
  /**
   * 
   * @param {Object} options 
   */
  constructor(el,options,regionList){
    this._el = el
    this._readerData = options.readerData
    this._colors = options.colors ||  ["#0000ff", "#00fff7", "#00ff08", "#ffff00", "#ff0000"]
    this._width = options.width
    this._height = options.height
    this._scale = chroma.scale(this._colors)
    this._current_region = {crs:options.crs,type:options.type}
    this._projection = d3[options.projection]() 
    this._geometry = regionList
    this.inilize()
  }

  inilize(){//初始化数据
    let _self = this
    _self.canvas = d3.select(_self._el).append("canvas")
                     .attr("width",_self._width)
                     .attr("height",_self._height)
                     .attr("transform","translate(0,20)")
    _self.context = _self.canvas.node().getContext("2d")
  }

  /**
   * 
   * @param {Number} index 
   */
  getMinMax(index){
    let tempData = this.tempData[0],//index
        min = tempData[0][0],
        max = tempData[0][0];
    // const projection = d3.geoEquirectangular()//投影
    const projection = this._projection
    projection.fitExtent([[0, 0], [this._width, this._height]], this._current_region)
    for(let h=0;h<this._height;h++){
      for(let w=0;w<this._width;w++){
        var pointCoords = projection.invert([w,h]);//反转成经纬度，
        var px = (pointCoords[0] - this.geoTransform[0]) / this.geoTransform[1]
        var py = (pointCoords[1] - this.geoTransform[3]) / this.geoTransform[5]
        let [x,y] = [Math.floor(px),Math.floor(py)]
        if(tempData[y]){//部分数据无
          min = this.getMin(tempData[y][x],min)
          max = this.getMax(tempData[y][x],max)
        }
      }
    }
    return [min,max]
  }
  /**
   * 
   * @param {Number} code 
   * @param {ArrayBuffer} res 
   * @param {Object} options 
   * @param {Number} i 
   * 
   */
  drawImg(code,res,options,i){
    let _self = this, scale,index = i || 0;
    if(!res){
      return 
    }
    (async function() {
      const tiff = await GeoTIFF.fromArrayBuffer(res)//tiff数据
      const image = await tiff.getImage();//image数据  ，width:800,height:520 
      const data = await image.readRasters();//data,每个点的值
      const tiepoint = image.getTiePoints()[0];//i: 0,j: 0,k: 0,x: 60,y: 65,z: 0    y维度，x经度
      const pixelScale = image.getFileDirectory().ModelPixelScale;//[0.125,0.125,0]
      _self.imgW = image.getWidth()
      _self.imgH = image.getHeight()
      _self.geoTransform = [tiepoint.x, pixelScale[0], 0, tiepoint.y, 0, -1 * pixelScale[1]]
      _self.tempData = new Array(data.length)
      for(let level = 0;level<data.length;level++){
        let arr = new Array(_self.imgH)
        for(let h = 0;h<_self.imgH;h++){
          arr[h] = new Array(_self.imgW)
          for(let w = 0;w<_self.imgW;w++){
            arr[h][w] = data[level][h*_self.imgW+w]
          }
        }
        _self.tempData[level] = arr
      }
      
      const imgdata = _self.context.createImageData(_self._width, _self._height);
      const feature = _self._geometry.filter(f => f.properties.code == code)
      
      _self.context.clearRect(0,0,_self._width,_self._height)
      _self._current_region.features = feature
      
      let projection;
      if(options){
        const [min,max] = _self.getMinMax(index)//index
        _self._colors = options.colors
        _self._scale_range = [-Infinity,...options.values,Infinity]
        scale = options.type==1
                ? chroma.scale(_self._colors).classes(_self._scale_range)
                : chroma.scale(_self._colors).domain([min,max])
        projection = options.projection || _self._projection
      }else{
        const [min,max] = _self.getMinMax(index)
        scale = _self._scale.domain([min,max])
        projection = _self._projection
      }

      // const projection = d3.geoEquirectangular()//投影
      projection.fitExtent([[0, 0], [_self._width, _self._height]], _self._current_region)
      const path = d3.geoPath().projection(projection).context(_self.context);
      const t = new Date()
      // let bounds = d3.geoPath().bounds(_self._current_region)
      // console.log(bounds)
      // let s = d3.scaleLinear().domain([0,450]).range([0,10000000])
      // console.log(s(10))

      
      
      let pos = 0
      // let mps = {}
      // console.log(projection([119.760822,49.201636]))将经纬度投影到平面

      for(let h=0;h<_self._height;h++){
        for(let w=0;w<_self._width;w++){
          var pointCoords = projection.invert([w,h]);//反转成经纬度，将平面点取消投影，即转成经纬度
          var px = (pointCoords[0] - _self.geoTransform[0]) / _self.geoTransform[1]
          var py = (pointCoords[1] - _self.geoTransform[3]) / _self.geoTransform[5] 
          py = py>0 ? py:0 //边界值
          let [R, G, B, A] = _self.getColor(scale,_self.interpolatedValueAtIndexes(px,py,index));//index
          imgdata.data[pos] = R
          imgdata.data[pos+1] = G
          imgdata.data[pos+2] = B
          imgdata.data[pos+3] = 255
          pos +=4
          // let xkey = Math.floor(pointCoords[0]),ykey = Math.floor(pointCoords[1])
          // if(!mps[xkey]){
          //   mps[xkey] = {}
          // }
          // if(!mps[xkey][ykey]){
          //   mps[xkey][ykey]=[w,h]
          // }
        }
      }
      _self.context.putImageData(imgdata, 0, 0)
      _self.context.beginPath();
      _self.context.globalCompositeOperation = 'destination-atop';
      _self.context.fillStyle = "rgba(0,255,0,1)";
      path(_self._current_region);
      _self.context.fill();

      _self.context.globalCompositeOperation = 'source-over'
      _self.context.strokeStyle = "#777";
      _self.context.stroke();
      // console.log(_self._current_region.features)
      // let bounds = d3.geoPath().bounds(_self._current_region)
      // console.log(bounds)
      // const arr = projection([119.760822,49.201636])
      // _self.context.fillText(_self._current_region.features[0].properties.NAME,arr[0], arr[1])
      console.log(new Date() - t)
    })()
  }

  getXiasYias(){//获取经纬度对应屏幕坐标

  }

  getMin(val,min){
    return min > val ? val:min
  }

  getMax(val,max){
    if(val){
      return max > val ? max:val
    }
    return max
  }

  getColor(scale,v){
    return scale(v).rgba()
  }

  changeColor(options){
    this._scale = options.scale
  }

  /**
   * 
   * @param {Number} i 
   * @param {Number} j 
   * @param {Number} index 
   */
  interpolatedValueAtIndexes(i,j,index){
    const raster = this.tempData[index]
    let tiff_width = this.imgW
    let tiff_height = this.imgH
    let fi,fj,ci,cj
    let g00, g10, g01, g11
    if(i >= tiff_width - 1){
        fi = ci =  tiff_width - 1
    }else{
        fi = Math.floor(i)
        ci = fi + 1
    }
    if(j >= tiff_height - 1){
        fj = cj =  tiff_height - 1
    }else{
        fj = Math.floor(j)
        cj = fj + 1
    }
    const row0 = raster[fj]
    g00 = row0[fi]
    g10 = row0[ci];
    const row1 = raster[cj]
    g01 = row1[fi]
    g11 = row1[ci];
    return this._doInterpolation(i-fi,j-fj,g00, g10, g01, g11)
  }
  /**
  * Bilinear interpolation for Number
  * https://en.wikipedia.org/wiki/Bilinear_interpolation
  * @param   {Number} x
  * @param   {Number} y
  * @param   {Number} g00
  * @param   {Number} g10
  * @param   {Number} g01
  * @param   {Number} g11
  * @returns {Number}
  */
  _doInterpolation(x, y, g00, g10, g01, g11) {
    const  rx = 1 - x;
    const  ry = 1 - y;
    //debugger;
    const value = g00 * rx * ry + g10 * x * ry + g01 * rx * y + g11 * x * y;
    if(isNaN(value)){//插值算法无值的情况会产生NaN
      return g00
    }
    return value
  }
}

export default CGP