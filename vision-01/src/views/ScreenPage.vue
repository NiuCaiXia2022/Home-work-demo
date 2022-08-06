<template>
  <div class="screen-content" :style="containerStyle">
    <!-- 头部-->
    <header class=" screen-header">
      <div>
        <!-- <img :src="headerScr"> -->
        <img v-if="flag === false" src="../../public/static/img/header_border_dark.png">
        <img v-if="flag === true" src="../../public/static/img/header_border_light.png">
      </div>
      <span class="logo">
      </span>
      <span class="title">电商平台实时监控系统{{ flag }}</span>
      <div class="title-right">
        <img v-if="flag === true" src="../../public/static/img/qiehuan_light.png" class="qiehuan"
          @click="handleChangeTheme">
        <img v-if="flag === false" src=" ../../public/static/img/qiehuan_dark.png" class="qiehuan"
          @click="handleChangeTheme">

        <span class="datetime">2022-08-05 12:56:00</span>
      </div>
    </header>

    <!-- 主体 -->
    <div class="screen-box">
      <!-- 左 -->
      <section class="screen-left">
        <div id="left-top" :class="[fullScreenStatus.trend ? 'fullscreen' : '']">
          <!-- 销量趋势图表 -->
          <Trend ref="trend"></Trend>

          <div class="resize">
            <span @click="changeSize('trend')"
              :class="['iconfont', fullScreenStatus.trend ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>

        <div id="left-bottom" :class="[fullScreenStatus.seller ? 'fullscreen' : '']">
          <!-- 商家销售金额图表 -->
          <Seller ref="seller"></Seller>

          <div class="resize">
            <span @click="changeSize('seller')"
              :class="['iconfont', fullScreenStatus.seller ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
      <!-- 中 -->
      <section class="screen-middle">

        <div id="middle-top" :class="[fullScreenStatus.map ? 'fullscreen' : '']">
          <!-- 商家分布图表 -->
          <Map ref="map"></Map>
          <div class="resize">
            <span @click="changeSize('map')"
              :class="['iconfont', fullScreenStatus.map ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>

        <div id="middle-bottom" :class="[fullScreenStatus.rank ? 'fullscreen' : '']">
          <!-- 地区销量排行图表 -->
          <Rank ref="rank"></Rank>
          <div class="resize">
            <span @click="changeSize('rank')"
              :class="['iconfont', fullScreenStatus.rank ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
      <!-- 右 -->
      <section class="screen-right">
        <div id="right-top" :class="[fullScreenStatus.hot ? 'fullscreen' : '']">
          <!-- 热销商品占比图表 -->
          <Hot ref="hot"></Hot>
          <div class="resize">
            <span @click="changeSize('hot')"
              :class="['iconfont', fullScreenStatus.hot ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>

        <div id="right-bottom" :class="[fullScreenStatus.stock ? 'fullscreen' : '']">
          <!-- 库存销量分析图表 -->
          <Stock ref="stock"></Stock>
          <div class="resize">
            <span @click="changeSize('stock')"
              :class="['iconfont', fullScreenStatus.stock ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
    </div>

  </div>
</template>
<script>
import Hot from '../components/Hot.vue'
import Map from '../components/Map.vue'
import Rank from '../components/Rank.vue'
import Seller from '../components/Seller.vue'
import Stock from '../components/Stock.vue'
import Trend from '../components/Trend.vue'
// 引入 vuex  辅助函数
import { mapState } from 'vuex'
// 主题文件 样式切换
import { getThemeValue } from '../utlis/theme_utils'
export default {
  props: {},
  components: { Hot, Map, Rank, Seller, Stock, Trend },
  data() {
    return {
      // 对应图标的全屏状态 Boolean
      fullScreenStatus: {
        trend: false,
        seller: false,
        map: false,
        rank: false,
        hot: false,
        stock: false
      },
      flag: false
    }
  },
  created() {
    // 注册  接收到数据的回调函数
    this.$socket.registerCallBack('fullScreen', this.recvData)
  },
  destroyed() {
    // 销毁时  清空数据
    this.$socket.unRegisterCallBack('fullScreen')
  },
  computed: {
    // 计算属性  映射 展开
    ...mapState(['theme']),
    // 顶部背景图片切换
    headerScr() {
      // console.log('123', '../../public/static/img/' + getThemeValue(this.theme).headerBorderSrc)
      return '../../public/static/img/' + getThemeValue(this.theme).headerBorderSrc
    },
    // 右上图片切换
    themeSrc() {
      return '../../public/static/img/' + getThemeValue(this.theme).themeSrc
    },
    // 背景色
    containerStyle() {
      return {
        backgroundColor: getThemeValue(this.theme).backgroundColor,
        color: getThemeValue(this.theme).titleColor
      }
    }
  },
  methods: {
    // 点击全屏切换
    changeSize(chartName) {
      // 改变 fullScreenStatus  数据的状态
      // this.fullScreenStatus[name] = !this.fullScreenStatus[name]
      // 需要调用每个图标组件  screenAdapter 的方法(适配)
      // this.$refs[name].screenAdapter()

      // 数据变化后 不能立即指向  需要 $nextTick  延迟执行
      // this.$nextTick(() => {
      //   this.$refs[name].screenAdapter()
      // })

      //  改变 fullScreenStatus  数据的状态
      const targetValue = !this.fullScreenStatus[chartName]

      // 将数据发送个服务端
      this.$socket.send({
        action: 'fullScreen',
        socketType: 'fullScreen',
        chartName: chartName,
        value: targetValue
      })
    },

    // 接收到全屏数据的全部处理
    recvData(data) {
      // 取出图标的切换
      const chartName = data.chartName

      // 切换的状态
      const targetValue = data.value

      this.fullScreenStatus[chartName] = targetValue

      this.$nextTick(() => {
        this.$refs[chartName].screenAdapter()
      })
    },
    // 切换主题
    handleChangeTheme() {
      // 修改 vuex 的数据
      this.$store.commit('changeTheme')
      this.flag = !this.flag
      console.log(this.flag)
    }
  },
  mounted() {

    // console.log('123  ', '../../public/static/img/' + getThemeValue(this.theme).headerBorderSrc)
  }
}
</script>

<style lang="scss" scoped>
.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
}

.screen-content {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
}

.screen-header {
  width: 100%;
  height: 64px;
  font-size: 45px;
  position: relative;

  >div {
    img {
      width: 100%;
    }
  }

  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 10px;
    transform: translate(-50%, -50%);
  }

  .title-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
  }

  .qiehuan {
    width: 20px;
    height: 18px;
    cursor: pointer;
  }

  .datetime {
    font-size: 12px;
    margin-left: 10px;
  }

  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-80%);

    img {
      height: 35px;
      width: 128px;
    }
  }
}

.screen-box {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;

  .screen-left {
    height: 100%;
    width: 27.6%;

    #left-top {
      height: 53%;
      position: relative;
    }

    #left-bottom {
      height: 31%;
      margin-top: 25px;
      position: relative;
    }
  }

  .screen-middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;

    #middle-top {
      width: 100%;
      height: 56%;
      position: relative;
    }

    #middle-bottom {
      margin-top: 25px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }

  .screen-right {
    height: 100%;
    width: 27.6%;

    #right-top {
      height: 46%;
      position: relative;
    }

    #right-bottom {
      height: 38%;
      margin-top: 25px;
      position: relative;
    }
  }
}

.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
</style>
