<template>
  <div class="every-content">
    <!-- 销量趋势 -->
    <div class="every-chart" ref="stock_ref"></div>
  </div>
</template>
<script>
// 1. vuex 辅助函数
import { mapState } from 'vuex'
export default {
  props: {},
  components: {},
  data() {
    return {
      chartInstance: null, // 初始化数据
      allData: null, // 数据列表
      currentIndex: 0, // 当前页数
      timeId: null // 定时器
    }
  },
  created() {
    // 1. 注册回调函数
    this.$socket.registerCallBack('stockData', this.getData)
  },
  computed: {
    // 2.计算属性  展开
    ...mapState(['theme'])
  },
  watch: {
    // 3. 监听 vuex 的themem
    theme() {
      // 4.销毁实例
      this.chartInstance.dispose()
      // 5.初始化
      this.initChart()
      // 7.屏幕适配
      this.screenAdapter()
      // 8.更新数据
      this.updateChart()
    }

  },
  methods: {
    //  初始化
    initChart() {
      // 6. 修改配置主题
      // this.chartInstance = this.$echarts.init(this.$refs.stock_ref, 'chalk')
      this.chartInstance = this.$echarts.init(this.$refs.stock_ref, this.theme)
      // 基础数据 option
      const initOption = {
        title: { // 标题
          text: '▎ 库存和销量分析',
          left: 20,
          top: 20
        }
      }
      // setOption 设置 option
      this.chartInstance.setOption(initOption)

      // 监听鼠标划入 关闭定时器
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timeId)
      })
      // 监听鼠标划出 开启定时器
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },

    // 4. 获取的数据
    getData(ret) {
      // 获取接口数据
      // const { data } = await this.$http.get('stock')
      // console.log('data', data)

      // 保存
      this.allData = ret
      // 调用处理数据
      this.updateChart()
      // 开启定时器
      this.startInterval()
    },

    // 处理数据
    updateChart() {
      const centserArr = [ // 饼图内容 坐标值
        ['18%', '40%'],
        ['50%', '40%'],
        ['82%', '40%'],
        ['34%', '75%'],
        ['66%', '75%']
      ]
      const colorArr = [ // 饼图 渐变颜色
        ['#4FF778', '#0BA82C'],
        ['#E5DD45', '#E8B11C'],
        ['#E8821C', '#E55445'],
        ['#5052EE', '#AB6EE5'],
        ['#23E5E5', '#2E72BF']
      ]
      // console.log(colorArr)
      // 数据处理
      const start = this.currentIndex * 5
      const end = (this.currentIndex + 1) * 5
      // slice 截取 前五个
      const showData = this.allData.slice(start, end)
      const seriesArr = showData.map((item, index) => {
        return {
          type: 'pie', // 类型 饼图
          // radius: [110, 100], //  饼图 内外圈大小
          center: centserArr[index], // 位置坐标
          hoverAnimation: false, // 关闭鼠标移入 动画取消
          labelLine: { // 指示线  取消
            show: false // 指示线 隐藏
          },
          label: { // 提示
            position: 'center', // 提示位置
            color: colorArr[index][0] // 提示 颜色
          },
          data: [ // 数据
            {
              name: item.name + '\n' + item.sales, // 圆环内文字显示
              value: item.sales,
              itemStyle: { // 销量颜色
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: colorArr[index][0]
                  },
                  {
                    offset: 1,
                    color: colorArr[index][1]
                  }
                ])
              }
            },
            {
              value: item.stock,
              itemStyle: { // 库存颜色
                color: '#333843'
              }
            }
          ]
        }
      })

      // 数据的 Option
      const dataOption = {
        series: seriesArr
      }
      // setOption   设置 option
      this.chartInstance.setOption(dataOption)
    },

    // 适配 屏幕分辨率
    screenAdapter() {
      // 字体大小
      const titleFontSize = this.$refs.stock_ref.offsetWidth / 100 * 3.6
      const innerRadius = titleFontSize * 2.8 // 内圆半径
      const outterRadius = innerRadius * 1.125 // 外圆半径
      // 屏幕分辨率的 Option
      const adapterOption = {
        title: { // 标题 大小
          textStyle: {
            fontSize: titleFontSize
          }
        },
        series: [
          {
            type: 'pie', // 属性
            label: { // 圆内文字
              fontSize: titleFontSize / 2
            },
            radius: [outterRadius, innerRadius] // 外圆 内圆
          },
          {
            type: 'pie',
            label: {
              fontSize: titleFontSize / 2
            },
            radius: [outterRadius, innerRadius]
          },
          {
            type: 'pie',
            label: {
              fontSize: titleFontSize / 2
            },
            radius: [outterRadius, innerRadius]
          },
          {
            type: 'pie',
            label: {
              fontSize: titleFontSize / 2
            },
            radius: [outterRadius, innerRadius]
          },
          {
            type: 'pie',
            label: {
              fontSize: titleFontSize / 2
            },
            radius: [outterRadius, innerRadius]
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
      if (this.timeId) {
        // 取消定时器
        clearInterval(this.timeId)
      }
      this.timeId = setInterval(() => {
        this.currentIndex++
        if (this.currentIndex > 1) {
          this.currentIndex = 0
        }
        // 需要更新数据 开启定时器
        this.updateChart()
      }, 3000)
    }

    // socket_servie.js
  },
  mounted() {
    // 初始化
    this.initChart()
    // 3.获取数据  发送数据给服务器
    // this.getData()
    this.$socket.send({
      action: 'getData',
      socketType: 'stockData',
      chartName: 'stock',
      value: ''
    })
    // 监听屏幕分辨率 事件
    window.addEventListener('resize', this.screenAdapter)
    // 屏幕分辨率 事件
    this.screenAdapter()
  },
  destroyed() {
    // 取消监听屏幕分辨率
    window.removeEventListener('resize', this.screenAdapter)
    // 取消定时器
    clearInterval(this.timeId)
    // 2. 取消 注册的回调函数
    this.$socket.unRegisterCallBack('stockData')
  }
}
</script>

<style lang="scss" scoped>
</style>
