<template>
  <div class="every-content">
    <!-- 销量趋势 -->
    <div class="title" :style="comStyle">
      <span>{{ '▎ ' + showTitle }}</span>
      <span class="iconfont title-icon" :style="comStyle" @click="showSelect = !showSelect">&#xe6eb;</span>
      <div class="select-com" v-show="showSelect" :style="maiginStyle">
        <div class="select-item" v-for="item in selectTypes" :key="item.key" @click="handleSelect(item.key)">{{
            item.text
        }}</div>
      </div>
    </div>
    <div class="every-chart" ref="trend_ref"></div>

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
      showSelect: false, // 是否显示可选项
      choiceType: 'map', // 是否显示的数据
      titleFontSize: 0 // 标题的字体大小
    }
  },
  created() {
    // 组件创建完成之后 进行回调函数注册
    this.$socket.registerCallBack('trendData', this.getData)
  },
  computed: {
    // 2. 计算属性  展开辅助函数
    ...mapState(['theme']),
    // 下拉框的标题
    selectTypes() {
      if (!this.allData) {
        return []
      } else {
        // 筛选  显示的  把不现实的拎出来
        return this.allData.type.filter(item => {
          return item.key !== this.choiceType
        })
      }
    },
    // 标题
    showTitle() {
      if (!this.allData) {
        return ''
      } else {
        return this.allData[this.choiceType].title
      }
    },
    // 设置给标题的样式 字体大小
    comStyle() {
      return {
        fontSize: this.titleFontSize + 'px',
        color: getThemeValue(this.theme).titleColor
      }
    },
    // 下拉标题对齐
    maiginStyle() {
      return {
        marginLeft: this.titleFontSize + 'px'
      }
    }
  },
  watch: {
    // 3.监听 vuex的theme
    theme() {
      // 4.销毁实例
      this.chartInstance.dispose()
      // 5. 初始化
      this.initChart()
      // 7、屏幕适配
      this.screenAdapter()
      // 8、更新数据
      this.updateChart()
    }
  },
  methods: {
    //  初始化
    initChart() {
      // 初始化  第二个参数  配置的主题
      // 6、配置主题
      this.chartInstance = this.$echarts.init(this.$refs.trend_ref, this.theme)
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
          trigger: 'axis'
        },
        legend: { // 图例 标题位置
          left: 20,
          top: '15%',
          icon: 'circle'// circle 圆形的图例
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
    // 获取接口的数据
    getData(ret) {
      // 获取接口数据
      // const { data: res } = await this.$http.get('trend')
      // console.log('接口数据', res)
      // 保存数据
      this.allData = ret
      console.log('接口数据', this.allData)

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
      const valueArr = this.allData[this.choiceType].data // Y轴数据
      // map 循环  映射一个新数组
      const seriesArr = valueArr.map((item, index) => {
        return {
          name: item.name, // 跟图例的name  保持一致
          type: 'line',
          data: item.data,
          stack: this.choiceType, // 堆叠图
          areaStyle: { // 颜色填充  加渐变色
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: colorArr1[index] }, // 百分之0 的渐变值
              { offset: 1, color: colorArr2[index] } // 百分之100 的渐变值
            ])
          }
        }
      })
      // 图例数据  跟上面name  保持一致
      const legendArr = valueArr.map((item) => {
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
      // 获取显示图标的容器 宽度
      this.titleFontSize = this.$refs.trend_ref.offsetWidth / 100 * 3.6
      // 屏幕分辨率的 Option
      const adapterOption = {
        // 图例的大小变化
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize,
          textStyle: { // 标题文字大小
            fontSize: this.titleFontSize / 2
          }
        }
      }
      // setOption 设置 option
      this.chartInstance.setOption(adapterOption)
      // 重新调用 resize
      this.chartInstance.resize()
    },

    // 点击切换
    handleSelect(key) {
      console.log('key', key)
      this.choiceType = key
      // 调用图表数据
      this.updateChart()
      // 隐藏下拉框
      this.showSelect = false
    }

  },
  mounted() {
    // 初始化
    this.initChart()
    // 获取数据
    // this.getData() // 发送数据给服务器
    this.$socket.send({
      action: 'getData',
      socketType: 'trendData',
      chartName: 'trend',
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
    // 组件销毁时  取消注册回调
    this.$socket.unRegisterCallBack('trendData')
  }
}
</script>

<style lang="scss" scoped>
.title {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
  color: #fff;

  .title-icon {
    margin-left: 10px;
    cursor: pointer;
  }

  .select-com {
    background-color: #222733;
  }

  .select-item {
    cursor: pointer;
  }
}
</style>
