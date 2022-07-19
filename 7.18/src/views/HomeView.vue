<template>
  <div class="home">
    <!-- <my-button>默认按钮</my-button> -->
    <!-- <my-button size="medium" type="primary" disabled minWidth="120px">1</my-button> -->

    <!-- <my-button icon-prefix type="primary" disabled minWidth="120px">1</my-button> -->

    <!-- <my-button type="primary" loading>成功按钮</my-button> -->

    <!-- <my-button disabled type="primary" :loading="flag" @click="handleSub">成功按钮</my-button> -->

    <!-- <my-button prefix="xingxing" block size="small" type="danger" round>危险按钮</my-button> -->

    <!-- <my-button prefix="xingxing"(字体图标) size="small" type="danger" round>危险按钮</my-button> -->

    <!-- <my-button size="small" type="danger" round>危险按钮</my-button>
    <my-button suffix="tongzhi" size="mini" type="warning" border>警告按钮</my-button> -->

    <my-button>默认按钮</my-button>
    <my-button type="primary" :loading="flag" @click="handleSub">成功按钮</my-button>
    <my-button type="danger">危险按钮</my-button>
    <my-button type="warning">警告按钮</my-button>
  </div>
</template>
<script>
import MyButton from '../components/button/index.vue'
export default {
  props: {},
  components: {
    MyButton
  },
  data() {
    return {
      flag: false// loading 状态
    }
  },
  created() {
  },
  computed: {},
  methods: {
    handleSub() {
      this.flag = true
      // 定时器
      setTimeout(() => {
        this.flag = false
      }, 2000)
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
</style>
