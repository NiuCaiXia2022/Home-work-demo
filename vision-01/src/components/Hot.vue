<template>
  <div class="every-content">
    <!-- 热销商品 -->

    <div class="every-chart" ref="hot_ref"></div>
    <span class="iconfont arr-left" :style="comStyle" @click="toLeft">&#xe6ef;</span>
    <span class="iconfont arr-right" :style="comStyle" @click="toRight">&#xe6ed;</span>
    <span class="hot-name" :style="comStyle">{{ hotName }}</span>

  </div>
</template>
<script>
// 1. 引入 vuex  辅助函数
import { mapState } from 'vuex'
// 主题文件 样式切换
import { getThemeValue } from '../utlis/theme_utils'

export default {
  props: {},
  components: {},
  data() {
    return {
      chartInstance: null, // 初始化数据
      allData: null, // 数据列表
      currentIndex: 0, // 一级分类数据
      titleFontSize: 0 // 分辨率字体
    }
  },
  created() {
    // 1.注册  回调函数
    this.$socket.registerCallBack('hotData', this.getData)
  },
  computed: {
    // 标题
    hotName() {
      if (!this.allData) {
        return ''
      } else {
        return this.allData[this.currentIndex].name
      }
    },
    // 2.   调用辅助函数   展开运算符
    ...mapState(['theme']),

    //  箭头大小 字体
    comStyle() {
      return {
        fontSize: this.titleFontSize + 'px',
        color: getThemeValue(this.theme).titleColor
      }
    }
  },
  watch: {
    // 3. 监听 vuex的 theme
    theme() {
      // console.log('主题切换了')

      // 4. 销毁当前图表
      this.chartInstance.dispose()
      // 5.初始化图表
      this.initChart()
      // 7.屏幕适配
      this.screenAdapter()
      // 8.更新图表数据
      this.updateChart()
    }

  },
  methods: {
    //  初始化
    initChart() {
      // 6. 修改主题
      // this.chartInstance = this.$echarts.init(this.$refs.hot_ref, 'chalk')
      this.chartInstance = this.$echarts.init(this.$refs.hot_ref, this.theme)
      // 基础数据 option
      const initOption = {
        title: { // 标题
          text: '▎热销商品占比',
          left: 20, // 标题 位置
          top: 20// 标题 位置
        },
        legend: { // 图例
          top: '15%', // 图例 位置
          icon: 'circle'// 图例形状  circle圆形
        },
        tooltip: { // 工具提示
          show: true, // 提示 显示
          formatter: (arg) => { // 提示的 文本内容
            // console.log('arg', arg)
            // 三级数据的集合
            const thirdCateGory = arg.data.children // 拿三级数据列表
            let total = 0
            thirdCateGory.forEach(item => {
              total += item.value // 三级数据的全部值
            })
            let retStr = ''
            thirdCateGory.forEach(item => {
              // 三级分类的百分比
              retStr += `
              ${item.name}:${parseInt(item.value / total * 100) + '%'}
              <br/>
              `
            })
            return retStr
          }
        },
        series: [
          {
            type: 'pie', // 饼图
            label: { // 内容显示
              show: false
            },
            emphasis: { // 饼图高亮状态下的操作
              label: { // 内容显示
                show: true // 显示
              },
              labelLine: { // 内容的指向线
                show: false // 隐藏
              }
            }
          }
        ]
      }
      // setOption 设置 option
      this.chartInstance.setOption(initOption)
    },

    // 获取的数据
    getData(ret) {
      // 获取接口数据
      // const { data } = await this.$http.get('hotproduct')
      // console.log(data, 'gggg')
      // 保存
      this.allData = ret
      // console.log('data', this.allData)

      // 调用处理数据
      this.updateChart()
    },

    // 处理数据
    updateChart() {
      // console.log('this.allData[this.currentIndex].children', this.allData[this.currentIndex].children)

      const lengendData = this.allData[this.currentIndex].children.map(item => {
        return item.name
      })
      // 一级数据
      const seriesData = this.allData[this.currentIndex].children.map(item => {
        return {
          name: item.name,
          value: item.value,
          children: item.children
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
      // 标题文字大小 饼图大小  图例大小  箭头大小
      this.titleFontSize = this.$refs.hot_ref.offsetWidth / 100 * 3.6

      // 屏幕分辨率的 Option
      const adapterOption = {
        title: { // 标题
          textStyle: {
            fontSize: this.titleFontSize // 标题文字大小
          }
        },
        legend: { //  图例
          itemWidth: this.titleFontSize, //  图例 宽
          itemheight: this.titleFontSize, //  图例 宽
          itemGap: this.titleFontSize / 2, //  图例  间隔
          textStyle: { // 图例文字大小
            fontSize: this.titleFontSize / 2
          }
        },
        series: [
          {
            //  饼图大小 半径
            radius: this.titleFontSize * 4.5,
            // 饼图大小 位置
            center: ['50%', '60%']
          }
        ]
      }
      // setOption 设置 option
      this.chartInstance.setOption(adapterOption)
      // 重新调用 resize
      this.chartInstance.resize()
    },
    // 点击 左
    toLeft() {
      this.currentIndex--
      // 减到0 再重新赋值
      if (this.currentIndex < 0) {
        this.currentIndex = this.allData.length - 1
      }
      this.updateChart()
    },
    // 点击 有
    toRight() {
      this.currentIndex++
      // 加到最高length 再重新赋值
      if (this.currentIndex > this.allData.length - 1) {
        this.currentIndex = 0
      }
      this.updateChart()
    }

  },
  mounted() {
    // 初始化
    this.initChart()
    // 3. 获取数据
    // this.getData()
    this.$socket.send({
      action: 'getData',
      socketType: 'hotData',
      chartName: 'hot',
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
    // 取消 回调函数
    this.$socket.unRegisterCallBack('hotData')
  }
}
</script>

<style lang="scss" scoped>
.arr-left {
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #fff;

}

.arr-right {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #fff;

}

.hot-name {
  position: absolute;
  left: 80%;
  bottom: 20px;
  color: #fff;

}
</style>
