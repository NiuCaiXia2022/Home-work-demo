<template>
  <div class="every-content">
    <!-- 商家销量 横向柱状图 -->
    <div class="every-chart" ref="seller_ref">
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      chartInstance: null, // 初始化 dome元素
      allData: null, // 总数据
      currentPage: 1, // 当前页
      totalPage: 0, // 每一页数量( %5 )
      timerId: null // 定时器
    }
  },
  created() {
  },
  computed: {},
  methods: {
    // 初始化echarts init对象
    initChart() {
      // 初始化 接收第二个参数  主题的名称
      this.chartInstance = this.$echarts.init(this.$refs.seller_ref, 'chalk')

      // 对图表初始化的控制
      // 基本配置
      const initOption = {
        title: {
          text: '▎商家销售统计',
          left: 20,
          top: 20
        },
        grid: { // 直角坐标轴 大小的  距离设置
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true // 包含坐标轴的文字 距离

        },
        tooltip: { // 文字提示  背景
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0, // 层级
            lineStyle: {
              color: '#2d3443'
            }
          }
        },
        xAxis: { // 横轴
          type: 'value'
        },
        yAxis: { // 竖轴
          type: 'category'
        },
        series: [
          {
            type: 'bar', // 柱状图
            label: { // 提示
              show: true, // 提示显示
              position: 'right', // 提示位置
              textStyle: { // 提示样式
                color: '#fff' // 提示颜色
              }
            },
            itemStyle: { // 每一个柱样式
              // 线性渐变 指明颜色的方向
              // 指明不同百分比 颜色的值
              // (x1, y1, x2, y2, []) 从左到右 0010  从右到左 0111
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#5052ee' }, // 百分之0 状态的颜色值
                { offset: 1, color: '#AB6EE5' } // 百分之100 状态的颜色值
              ])
            }
          }
        ]
      }
      //  setOption 可以设置多次  可以相互整合
      this.chartInstance.setOption(initOption)

      // 对图表进行 鼠标移入  进行监听  暂停定时器操作
      this.chartInstance.on('mouseover', () => { // mouseover 鼠标移入  清除定时器
        clearInterval(this.timerId)
      })
      this.chartInstance.on('mouseout', () => { // mouseout 鼠标移出  开启定时器
        this.startInterval()
      })
    },

    // 获取服务器数据
    async getData() {
      // 接口 http://127.0.0.1.8888/api/seller

      // { data: response }  解构  之后 把data数据给 response
      const { data: response } = await this.$http.get('seller')
      // console.log('请求的初始数据', response)

      this.allData = response // 赋值

      this.allData.sort((a, b) => { // 排序
        return a.value - b.value // 从大到小
        // return b.value - a.value // 从小到大
      })

      // 每5个元素显示一页
      this.totalPage = this.allData.length % 5 === 0 ? this.allData.length / 5 : this.allData.length / 5 + 1
      // console.log('this.totalPage', this.totalPage)

      this.upDatechart() // 更新图表 就是设置option

      this.startInterval() // 启动定时器
    },

    // 更新图表
    upDatechart() {
      const start = (this.currentPage - 1) * 5
      const end = this.currentPage * 5
      // slice 截取  包前不包后
      const showData = this.allData.slice(start, end)
      // map 循环 映射一个新数组
      const sellNames = showData.map(item => { // name 竖轴
        return item.name
      })
      const sellValues = showData.map(item => { // value 横轴
        return item.value
      })

      // 拆分 option
      // 数据 option
      const dataOption = {
        yAxis: { // 竖轴
          data: sellNames // 名字
        },
        series: [
          {
            data: sellValues // 值
          }
        ]
      }
      // 把数据  设置给图表
      //  setOption 可以设置多次 是可以相互整合
      this.chartInstance.setOption(dataOption)
    },

    // 定时器
    startInterval() {
      // 定时器存在先清除
      if (this.timerId) {
        clearInterval(this.timerId)
      }
      // 清除后 在调用
      this.timerId = setInterval(() => {
        this.currentPage++
        // 判断 大于总数量时 回到最初
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1
        }
        // 加到最后在重新调用 回到最初
        this.upDatechart()
      }, 3000)
    },

    // 屏幕大小变化 适配
    screenAdapter() {
      // 窗口大小
      // console.log('窗口', this.$refs.seller_ref.offsetWidth)

      //
      const titleFontSize = this.$refs.seller_ref.offsetWidth / 100 * 3.6
      // console.log('titleontSize', titleFontSize)

      // 屏幕分辨率适配  options
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize // 屏幕大小 改变标题字体大小
          }
        },
        tooltip: { // 文字提示  阴影背景
          axisPointer: {
            lineStyle: { // 改变阴影背景
              width: titleFontSize //  文字提示  改变阴影背景大小
            }
          }
        },
        series: [
          {
            barWidth: titleFontSize, // 柱的宽度   改变宽窄
            itemStyle: { // 每一个柱样式
              barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0] // 每一个柱圆角
            }
          }
        ]
      }
      //  setOption 可以设置多次  可以相互整合
      this.chartInstance.setOption(adapterOption)
      // 需要手动调用 resize 才会产生效果
      this.chartInstance.resize()
    }
  },
  // 页面渲染好调用
  mounted() {
    // 数据
    this.getData()
    // dom 元素加载完 开始初始化图表
    this.initChart()
    // 监听窗口大小 适配
    window.addEventListener('resize', this.screenAdapter)
    // 调用 屏幕适配方法
    this.screenAdapter()
  },
  // 页面销毁调用
  destroyed() {
    // 清除定时器
    clearInterval(this.timerId)
    // 取消监听
    window.removeEventListener('resize', this.screenAdapter)
  }
}
</script>

<style lang="scss" scoped>
</style>
