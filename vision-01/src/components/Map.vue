<template>
  <div class="every-content" @dblclick="revertMap">
    <!-- 商家分布  dblclick双击事件-->
    <div>提交</div>

    <div class="every-chart" ref="map_ref"></div>
  </div>
</template>
<script>
import axios from 'axios'
// 地图拼音
import { getProvinceMapInfo } from '../utlis/map_utils'
export default {

  props: {},
  components: {},
  data() {
    return {
      chartInstance: null, // 初始化数据
      allData: null, // 数据列表
      mapData: {} // 地图数据的缓存
    }
  },
  created() {
  },
  computed: {},
  methods: {
    //  初始化
    async initChart() {
      // 初始化  第二个参数  配置的主题
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, 'chalk')
      // 获取地图的数据 在文件的atatic的map/china.json
      //  http://localhost:8999/static/map/china.json
      const res = await axios.get('http://localhost:8999/static/map/china.json')
      console.log('地图', res)
      this.$echarts.registerMap('china', res.data)
      // 基础数据 option
      const initOption = {
        geo: {
          type: 'map', // 类型  地图
          map: 'china',
          top: '5%', // 位置 坐标
          bottom: '5%' // 位置 坐标
        },
        title: { // 标题
          text: '▎ 商家分布',
          left: 20, // 位置 坐标
          top: 20, // 位置 坐标
          itemStyle: { // 每个  样式
            areaColor: '#2e72bf',
            borderColor: '#333'
          }
        },
        legend: { // 图例
          left: '5%', // 位置 坐标
          bottom: '5%', // 位置 坐标
          orient: 'vertical' //  摆放位置 vertical 垂直
        }
      }
      // setOption 设置 option
      this.chartInstance.setOption(initOption)

      // 地图点击事件 切换省份数据
      this.chartInstance.on('click', async arg => {
        // console.log(arg) //中文 getProvinceMapInfo
        const provinceInfo = getProvinceMapInfo(arg.name)
        // console.log('中文转拼音', provinceInfo)

        // 点击的省份 不存在的话发送请求
        if (!this.mapData[provinceInfo.key]) {
          // 请求省市接口数据
          const res = await axios.get('http://localhost:8999' + provinceInfo.path)
          // console.log('res', res)

          // 保存点击的省份缓存
          this.mapData[provinceInfo.key] = res.data

          // 注册地图的数据  registerMap()
          this.$echarts.registerMap(provinceInfo.key, res.data)
        }

        // 设置省份的 option
        const changeOption = {
          geo: {
            map: provinceInfo.key
          }
        }
        this.chartInstance.setOption(changeOption)
      })
    },

    // 获取的数据
    async getData() {
      // 获取接口数据
      const { data } = await this.$http.get('map')
      this.allData = data
      console.log('数据', this.allData)
      // 保存
      // 调用处理数据
      this.updateChart()
    },

    // 处理数据
    updateChart() {
      // 图例数据
      const legendArr = this.allData.map(item => {
        return item.name
      })
      // 数据处理
      const seriesArr = this.allData.map(item => {
        // 地图中 显示散点  需要坐标
        // 需要增加一个配置项 coordinateSystem:geo
        return {
          type: 'effectScatter', // 涟漪动画
          rippleEffect: { // 涟漪效果
            scale: 3,
            brushType: 'stroke'// 空心的涟漪效果
          },
          name: item.name,
          data: item.children,
          coordinateSystem: 'geo'// 散点可以使用地图坐标系统
        }
      })
      // 数据的 Option
      const dataOption = {
        series: seriesArr,
        legend: { // 图例
          data: legendArr // 图例数据
        }
      }
      // setOption   设置 option
      this.chartInstance.setOption(dataOption)
    },

    // 适配 屏幕分辨率
    screenAdapter() {
      // 标题大小

      // 文字大小
      const titleFontSize = this.$refs.map_ref.offsetWidth / 100 * 3.6

      // 屏幕分辨率的 Option
      const adapterOption = {
        title: { // 标题大小
          textStyle: {
            fontSize: titleFontSize
          }
        },
        lebend: { // 图例
          itemWidth: titleFontSize / 2, // 图例 宽
          itemheight: titleFontSize / 2, // 图例 高
          itemGap: titleFontSize / 2, // 图例间隔
          textStyle: { // 图例 样式
            fontSize: titleFontSize / 2
          }
        }
      }
      // setOption 设置 option
      this.chartInstance.setOption(adapterOption)
      // 重新调用 resize
      this.chartInstance.resize()
    },

    // 双击 切换中国地图
    revertMap() {
      const revertOption = {
        geo: {
          map: 'china'
        }
      }
      // 重新设置 中国地图
      this.chartInstance.setOption(revertOption)
    }

  },
  mounted() {
    // 初始化
    this.initChart()
    // 获取数据
    this.getData()
    // 监听屏幕分辨率 事件
    window.addEventListener('resize', this.screenAdapter)
    // 屏幕分辨率 事件
    this.screenAdapter()
  },
  destroyed() {
    // 取消监听屏幕分辨率
    window.removeEventListener('resize', this.screenAdapter)
  }
}
</script>

<style lang="scss" scoped>
</style>
