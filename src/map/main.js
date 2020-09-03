import React, { useEffect, useState, useCallback } from 'react'
import provinces from './src/areaName/provinces' //定义省份的数组
import provincesText from './src/areaName/provincesText'
import echarts from 'echarts';
import './main.css'

const china = require('./src/china.json')

//地图区域色块数据
const mapData = [
  { name: '茂名市', value: 3368 },
  { name: '广东省', value: 2180.98 },
  { name: '福建省', value: 806.98 },
  { name: '湖北省', value: 44045.98 },
  { name: '黑龙江省', value: 55204.98 },
  { name: '新疆维吾尔自治区', value: 6992.98 },
  { name: '广西省', value: 806.98 },
  { name: '吉林省', value: 9172.98 },
  { name: '四川省', value: 806.98 },
  { name: '甘肃省', value: 9172.98 },
  { name: '山西省', value: 37659.98 },
  { name: '内蒙古自治区', value: 21900.98 },

  { name: '中西区', value: 20057.34 },
  { name: '湾仔区', value: 15477.48 },
  { name: '东区', value: 31686.1 },
  { name: '南区', value: 6992.6 },
  { name: '油尖旺区', value: 44045.49 },
  { name: '深水埗区', value: 40689.64 },
  { name: '九龙城区', value: 37659.78 },
  { name: '黄大仙区', value: 45180.97 },
  { name: '观塘区', value: 55204.26 },
  { name: '葵青区', value: 21900.9 },
  { name: '荃湾区', value: 4918.26 },
  { name: '屯门区', value: 5881.84 },
  { name: '元朗区', value: 4178.01 },
  { name: '北区', value: 2227.92 },
  { name: '大埔区', value: 2180.98 },
  { name: '沙田区', value: 9172.94 },
  { name: '西贡区', value: 3368 },
  { name: '离岛区', value: 806.98 },
  { name: '深圳市', value: 20057.34 },
  { name: '珠海市', value: 15477.48 },
  { name: '中山市', value: 31686.1 },
  { name: '东莞市', value: 6992.6 },
  { name: '广州市', value: 44045.49 },
  { name: '梅州市', value: 40689.64 },
  { name: '佛山市', value: 37659.78 },
  { name: '台山市', value: 45180.97 },
  { name: '潮州市', value: 55204.26 },
  { name: '汕头市', value: 21900.9 },
  { name: '汕尾市', value: 4918.26 },
  { name: '普宁市', value: 5881.84 },
  { name: '惠州市', value: 4178.01 },
  { name: '兴宁市', value: 2227.92 },
  { name: '河源市', value: 2180.98 },
  { name: '江门市', value: 9172.94 },
  { name: '茂名市', value: 3368 },
  { name: '广东省', value: 2180.98 },
  { name: '福建省', value: 806.98 },
  { name: '湖北省', value: 44045.98 },
  { name: '黑龙江省', value: 55204.98 },
  { name: '新疆维吾尔自治区', value: 6992.98 },
  { name: '广西省', value: 806.98 },
  { name: '吉林省', value: 9172.98 },
  { name: '四川省', value: 806.98 },
  { name: '甘肃省', value: 9172.98 },
  { name: '山西省', value: 37659.98 },
  { name: '内蒙古自治区', value: 21900.98 },

];

//地图标记数据
var markPointData = [{
  "name": "齐齐哈尔",
  "coord": [
    123.97, 47.33
  ],
},
{
  "name":"玉树",
  "coord":[97.380958,32.80069],
},{
  "name":"深圳",
  "coord":[113.935313,22.838412]
},
{
  "name": "青岛",
  "coord": [
    120.33, 36.07
  ],
},
{
  "name": "温州",
  "coord": [
    120.65, 28.01
  ],
}
  ,
{
  "name": "珠海",
  "coord": [ //指定数据在相应坐标系上的坐标位置 单个维度支持min max average
    113.50126,22.274211
  ],
},{
  "name":"周口市",
  "coord":[
    115.596928,33.671723
  ],
},{
  "name":"塔城地区",
  "coord":[
    85.675693,44.919334
  ]
}


];


//地图配置信息
/**
 * 
 * @param {json} mapData  地图数据
 * @param {string} mapType 图表类型
 * @param {number} zoom 地图缩放比例
 */
function setOption(mapData, mapType) {
  let option = {}
  return option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{c} (p / km2)'
    },
    toolbox: {//工具栏
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    visualMap: { //将数据映射到视觉元素
      min: 800, //指定 visualMapContinuous 组件的允许的最小值
      max: 50000, //最大值
      text: ['High', 'Low'],//两端的文本
      realtime: true, //是否实时更新
      calculable: true,//是否显示拖拽用的手柄
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered']
      }
    },
    series: [
      {
        name: '香港18区人口密度',
        type: 'map',
        mapType: mapType, // 自定义扩展图表类型
        roam: true,
        zoom: 1,
        data: mapData,
        // 自定义名称映射
        nameMap: {
          'Central and Western': '中西区',
          'Eastern': '东区',
          'Islands': '离岛',
          'Kowloon City': '九龙城',
          'Kwai Tsing': '葵青',
          'Kwun Tong': '观塘',
          'North': '北区',
          'Sai Kung': '西贡',
          'Sha Tin': '沙田',
          'Sham Shui Po': '深水埗',
          'Southern': '南区',
          'Tai Po': '大埔',
          'Tsuen Wan': '荃湾',
          'Tuen Mun': '屯门',
          'Wan Chai': '湾仔',
          'Wong Tai Sin': '黄大仙',
          'Yau Tsim Mong': '油尖旺',
          'Yuen Long': '元朗'
        },
        emphasis: {
          show: true
        },
        markPoint: { //图表标注
          symbol: 'path://M512 39.384615l169.353846 295.384615 342.646154 63.015385-240.246154 248.123077L827.076923 984.615385l-315.076923-145.723077L196.923077 984.615385l43.323077-334.769231L0 401.723077l342.646154-63.015385L512 39.384615',
          symbolSize: 14, //图形大小
          label: {
            normal: {
              show: true,
            },
            emphasis: {
              show: true,
            }
          },
          itemStyle: {
            normal: {
              color: 'red'
            }
          },
          "data": markPointData
        }
      }
    ]
  }

}


//地图对象
let myChart = null;

//判断是否为省份
const isProvince = (name) => provincesText.some(provinces => provinces === name)

//加载省份地图文件
const loadProvinceMap = (name, callback) => {
  //获取省份名字
  let pname = provinces[provincesText.indexOf(name)]
  let currentMap = require(`./src/detailMap/provinces/${pname}.json`)
  callback(pname, currentMap)
}









export default function JYMap() {
  useEffect(() => {
    let echartElement = document.getElementById('jyMap'); //节点获取
    myChart = echarts.init(echartElement)   //初始化图表
    drawMap('china', china)


  }, [])

  useEffect(() => {
    //监听放大缩小事件
    myChart.on('georoam', onDatazoom)
    //监听点击事件
    myChart.on('click', getCurrentName)

    return () => { //清除监听事件
      myChart.off('georoam', onDatazoom)
      myChart.off('click', getCurrentName)
    }
  })

  const [currName, setCurrName] = useState('china')
  const [prevName, setPrevName] = useState('china') //上一级

  //绘制地图
  const drawMap = (name, json) => {

    echarts.registerMap(name, json) //注册地图信息

    myChart.setOption(setOption(mapData, name), true) //配置地图信息

    setCurrName(name);       //当前显示的区域名



  }

  //地图点击事件,获取当前地区名
  const getCurrentName = (e) => {
    let name = e.name;
    if (name) {
      if (isProvince(name)) {
        setPrevName(name)
        loadProvinceMap(name, drawMap)
      } else {
        let mapJson = require(`./src/detailMap/市/${name}.json`)
        if (mapJson) {
          drawMap(name, mapJson)
        }
      }
    }
  }

  /*
      获取zoom和center
      zoom:地图缩放值，
  */
  const getZoom = () => {
    if (myChart) {
      let zoom = myChart.getOption().series[0].zoom;
      return zoom
    }
    return;
  }
  //地图放大缩小事件 缩小返回上一级地图
  const onDatazoom = () => {
    const zoom = getZoom()
    let pname = provinces[provincesText.indexOf(prevName)]
    console.log({ zoom, prevName, currName })
    if (currName !== 'china') {
      if (pname === currName) {
        if (zoom < 0.3) {
          drawMap('china', china)
        }
      } else if (zoom < 0.3) {
        loadProvinceMap(prevName, drawMap)
      }
    }
  }



  return (
    <div>
      <div className="App" style={{ background: 'black' }}>
        <div id="jyMap" style={{ width: '100%', height: '100vh' }}></div>
        <div className="map" id="Map" style={{ width: '100%', height: '100vh' }}></div>
      </div>
    </div>

  );
}

