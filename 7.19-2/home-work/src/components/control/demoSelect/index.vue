<template>
  <div>
    <el-select v-model="val" @change="handleSelectChangeEvent">
      <el-option v-for="item in options" :key="item[props.value]" :label="item[props.label]" :value="item[props.value]">
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: 'SelectComponent',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  components: {},
  data() {
    return {
      val: '',
      options: [],
      props: {
        label: 'label',
        value: 'value'
      }
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.val = newValue
      },
      immediate: true
    },
    config: {
      handler(val) {
        this.initOptions()
        this.initProps()
      },
      immediate: true,
      deep: true
    }
  },
  created() {
  },
  computed: {
    url() {
      return this.config?.url
    },
    method() {
      return this.config?.method || 'GET'
    },
    initRequest() {
      return this.config?.initRequest
    },
    basePath() {
      return this.config?.basePath || ''
    }
  },
  methods: {

    // 发送请求
    initOptions() {
      if (this.url) {
        this.getOptions()
        return false
      }

      const options = this.config.options
      if (options && Array.isArray(options) && options.length > 0) {
        this.options = options
        // console.log(options)
      }
    },

    // 监听 子组件传递的值
    handleSelectChangeEvent(value) {
      // console.log('1', value)
      this.$emit('update:value', value)
    },

    // 更改 options 属性  重新赋值   可以自动识别
    // 解决方案   接收 父组件的props  在赋值  在自动转换
    initProps() {
      // console.log('2', this.config)
      const props = this.config.props
      const keys = Object.keys(this.props)
      // console.log('1', props, keys)

      // 父传过来的值  检测类型
      if (props && Object.prototype.toString.call(props) === '[object Object]') {
        for (const key in props) {
          if (keys.includes(key)) {
            // 赋值   props[label]=name  props[value]=id
            this.props[key] = props[key]
          }
        }
      }

      //
    },

    // 请求
    async getOptions() {
      if (!this.initRequest) {
        return false
      }
      // console.log('url', this.url)
      // console.log('method', this.method)

      const res = await this.$axios({
        url: this.url,
        method: this.method,
        basePath: this.basePath
      })
      // console.log('res', res)

      const data = res.data.data
      this.options = data
      // console.log('options', this.options)
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
</style>
