<template>
  <div class="every-content">
    <!-- 销量排行 -->
    <div class="every-chart" ref="rank_ref"></div>
    子组件
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
      startValue: 0, //  区域缩放开始值
      endValue: 9, // 区域缩放结束值
      timerId: null // 定时器
    }
  },
  created() {
  },
  computed: {},
  methods: {
    //  初始化
    initChart() {
      // 第二个参数 是主题名字
      this.chartInstance = this.$echarts.init(this.$refs.rank_ref, 'chalk')
      // 基础数据 option
      const initOption = {
        title: {
          text: '▎ 地区销售排行',
          top: 20, // 标题位置
          left: 20 // 标题位置
        },
        grid: { // 坐标位置
          top: '40%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true// 坐标轴 包含文字
        },
        tooltip: { // 提示文字显示
          show: true
        },
        xAxis: {
          type: 'category' // 类型 类目轴
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'bar'
          }
        ]
      }
      // setOption 设置 option
      this.chartInstance.setOption(initOption)
    },

    // 获取的数据
    async getData() {
      // 获取接口数据
      const { data } = await this.$http.get('rank')

      // 保存
      this.allData = data
      // console.log('this.allData', this.allData)

      // 排序
      this.allData.sort((a, b) => {
        // return a.value - b.value  // 从小到大
        return b.value - a.value
      })

      // 调用处理数据
      this.updateChart()
      // 调用 开启定时器
      this.startInterval()
      // 鼠标进入事件
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timerId) // 清除定时器
      })
      // 鼠标离开事件
      this.chartInstance.on('mouseout', () => {
        this.startInterval() // 清楚定时器
      })
    },

    // 处理数据
    updateChart() {
      // 数据处理
      // 颜色值
      const colorArr = [
        ['#0ba82c', '#4ff778'],
        ['#2e72bf', '#23e5e5'],
        ['#5052ee', '#ab6ee5']
      ]

      // 省份的数据
      const provinceArr = this.allData.map(item => {
        return item.name
      })
      // 省份的销售额 数据
      const valueArr = this.allData.map(item => {
        return item.value
      })

      // 数据的 Option
      const dataOption = {
        xAxis: {
          data: provinceArr
        },
        dataZoom: { // 区域缩放
          show: false,
          startValue: this.startValue,
          endValue: this.endValue

        },
        series: [
          {
            data: valueArr,
            itemStyle: { // 每个柱状样式
              color: (arg) => {
                // console.log(arg)
                // 颜色值

                let targetColorArr = null
                if (arg.value > 300) {
                  targetColorArr = colorArr[0]
                } else if (arg.value > 200) {
                  targetColorArr = colorArr[1]
                } else {
                  targetColorArr = colorArr[2]
                }
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0, color: targetColorArr[0]
                  },
                  { offset: 1, color: targetColorArr[1] }
                ])
              }
            }
          }
        ]
      }
      // setOption   设置 option
      this.chartInstance.setOption(dataOption)
    },

    // 适配 屏幕分辨率
    screenAdapter() {
      // 字体大小
      const titleFontSize = this.$refs.rank_ref.offsetWidth / 100 * 3.6
      // 屏幕分辨率的 Option
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        series: [
          {
            barWidth: titleFontSize, // 柱的宽度
            itemStyle: { // 每个柱的样式
              // 圆角
              barBorderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0]
            }
          }
        ]
      }
      // setOption 设置 option
      this.chartInstance.setOption(adapterOption)
      // 重新调用 resize
      this.chartInstance.resize()
    },

    // 定时器
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId)
      }
      this.timer = setInterval(() => {
        this.startValue++
        this.endValue++
        if (this.endValue > this.allData.length - 1) {
          this.startValue = 0
          this.endValue = 9
        }
        // 调用方法
        this.updateChart()
      }, 1000)
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
    // 清除定时器
    clearInterval(this.timerId)
  }
}
</script>

<style lang="scss" scoped>
</style>
