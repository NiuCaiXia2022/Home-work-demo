<template>
  <div class="every-content">
    <!-- 销量趋势 -->
    <div class="title">
      <span>我是标题</span>
      <span>下拉箭头</span>
      <div class="select-com">
        <div class="select-item">我是选择1</div>
        <div class="select-item">我是选择2</div>
        <div class="select-item">我是选择3</div>
      </div>
    </div>
    <div class="every-chart" ref="trend_ref"></div>

  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      chartInstance: null, // 初始化数据
      allData: null // 数据列表
    }
  },
  created() {
  },
  computed: {},
  methods: {
    //  初始化
    initChart() {
      // 初始化  第二个参数  配置的主题
      this.chartInstance = this.$echarts.init(this.$refs.trend_ref, 'chalk')
      // 基础数据 option
      const initOption = {
        grid: { //  直角坐标轴 大小的  距离设置
          left: '3%',
          top: '35%',
          right: '4%',
          bottom: '1%',
          containLabel: true // 显示Y轴 包含坐标轴的文字 距离
        },
        tooltip: { // 文字提示  背景
          taigger: 'axis'
        },
        legend: { // 图例 标题位置
          left: 20,
          top: '15%',
          icon: 'circle'// circle 圆形图例
        },
        xAxis: {
          type: 'category',
          boundaryGap: false // 去除 多余间隙
        },
        yAxis: {
          type: 'value'
        }
      }
      // setOption 设置 option
      this.chartInstance.setOption(initOption)
    },
    // 获取的数据
    async getData() {
      // 获取接口数据
      const { data: res } = await this.$http.get('trend')
      console.log('接口数据', res)
      // 保存
      this.allData = res
      // 调用处理数据
      this.updateChart()
    },
    // 处理数据
    updateChart() {
      // 半透明颜色值
      const colorArr1 = [
        'rgba(11,168,44,0.5)',
        'rgba(44,110,255,0.5)',
        'rgba(22,242,217,0.5)',
        'rgba(254,33,30,0.5)',
        'rgba(250,105,0,0.5)'
      ]
      // 全透明颜色值
      const colorArr2 = [
        'rgba(11,168,44,0)',
        'rgba(44,110,255,0)',
        'rgba(22,242,217,0)',
        'rgba(254,33,30,0)',
        'rgba(250,105,0,0)'
      ]

      // 处理数据
      const timeArr = this.allData.common.month // X轴数据
      const valueArr = this.allData.map.data // Y轴数据
      // map 循环  映射一个新数组
      const seriesArr = valueArr.map((item, index) => {
        return {
          name: item.name, // 跟图例的name  保持一致
          type: 'line',
          data: item.data,
          stack: 'map', // 堆叠图
          areaStyle: { // 颜色填充  加渐变色
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: colorArr1[index] }, // 百分之0 的渐变值
              { offset: 100, color: colorArr2[index] } // 百分之100 的渐变值
            ])
          }
        }
      })
      // 图例数据  跟上面name  保持一致
      const legendArr = valueArr.map((item, index) => {
        return item.name
      })
      // 数据的 Option
      const dataOption = {
        xAxis: {
          data: timeArr
        },
        legend: { // 图例
          data: legendArr // 图例数据
        },
        series: seriesArr
      }
      // setOption   设置 option
      this.chartInstance.setOption(dataOption)
    },
    // 适配 屏幕分辨率
    screenAdapter() {
      // 屏幕分辨率的 Option
      const adapterOption = {}
      // setOption 设置 option
      this.chartInstance.setOption(adapterOption)
      // 重新调用 resize
      window.chartInstance.resize()
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
