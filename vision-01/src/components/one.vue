<template>
  <div class="every-content">
    <!-- 销量趋势 -->
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
      this.chartInstance = this.$echarts.init(this.$refs.trend_ref)
      // 基础数据 option
      const initOption = {}
      // setOption 设置 option
      this.chartInstance.setOption(initOption)
    },
    // 获取的数据
    async getData() {
      // 获取接口数据
      // 保存
      // 调用处理数据
      this.updateChart()
    },
    // 处理数据
    updateChart() {
      // 数据的 Option
      const dataOption = {}
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
</style>
