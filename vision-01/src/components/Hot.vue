<template>
  <div class="every-content">
    <!-- 热销商品 -->

    <div class="every-chart" ref="trend_ref"></div>
    <span class="iconfont arr-left">&#xe6ef;</span>
    <span class="iconfont arr-right">&#xe6ed;</span>
  </div>
</template>
<script>

export default {
  props: {},
  components: {},
  data() {
    return {
      chartInstance: null, // 初始化数据
      allData: null, // 数据列表
      currentIndex: 0// 一级分类数据
    }
  },
  created() {
  },
  computed: {},
  methods: {
    //  初始化
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.trend_ref)
      // 基础数据 option
      const initOption = {
        series: [
          {
            type: 'pie' // 饼图
          }
        ]
      }
      // setOption 设置 option
      this.chartInstance.setOption(initOption)
    },
    // 获取的数据
    async getData() {
      // 获取接口数据
      const { data } = await this.$http.get('hotproduct')

      // 保存
      this.allData = data
      // console.log('data', this.allData)

      // 调用处理数据
      this.updateChart()
    },
    // 处理数据
    updateChart() {
      const lengendData = this.allData[this.currentIndex].children.map(item => {
        return item.name
      })
      // 一级数据
      const seriesData = this.allData[this.currentIndex].children.map(item => {
        return {
          name: item.name,
          value: item.value
        }
      })
      // 数据的 Option
      const dataOption = {
        legend: { // 图例
          data: lengendData
        },
        series: [
          {
            data: seriesData // 饼图数据
          }
        ]
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
      this.chartInstance.resize()
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
.arr-left {
  position: absolute;
  left: 10%;
}

.arr-right {
  position: absolute;
}
</style>
