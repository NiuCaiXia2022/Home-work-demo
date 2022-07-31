<template>
  <!-- :rules="rules"   el-form 效验全局表单   el-form-item效验单个-->
  <div>
    <el-form ref="form" :model="field" label-width="80px">
      <template v-for="(item) in formItem">

        <!-- 1 input-->
        <el-form-item :key="item" :rules="item.rules" :label="item.label" :prop="item.prop">
          <!-- <el-input v-model="field[item.prop]"></el-input> -->
          <component :value.sync="field[item.prop]" :config="item" :is="!item.type ? 'com-text' : `com-${item.type}`">
          </component>
        </el-form-item>

        <!-- 2 下拉框-->
        <!-- <el-form-item :key="item.label" v-if="item.type === 'select'" :rules="item.rules" :label="item.label"
          :prop="item.prop">
          <el-select v-model="field[item.prop]"></el-select>
        </el-form-item> -->

      </template>
      <!-- 3 按钮 -->
      <el-form-item>
        <el-button @click="hanldeClick(item)" :loading="item.loading" v-for="(item, index) in button" :key="index"
          v-bind="item">{{ item.label
          }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import createRules from './createRules.js'
// 集成组件
const modules = {}
// 映射组件
const files = require.context('../control', true, /index.vue$/i)
// console.log('files', files)
// console.log('keys', files.keys()) // 打印Key 值
// 循环  切割
files.keys().forEach((item) => {
  // console.log('集成组件', files(item).default)

  const key = item.split('/')
  const name = key[1]
  // const component = files(item).default
  // console.log('name', name)
  // console.log(modules[`com-${name}`])
  // 添加集成组件
  // console.log('modules', modules)
  modules[`com-${name}`] = files(item).default
})
// console.log('components/control/from/index', modules)
export default {
  props: {
    item: {
      type: Array,
      default: () => []
    },
    field: {
      type: Object,
      default: () => { }
    },
    rules: {
      type: Object,
      default: () => { }
    },
    button: {
      type: Array,
      default: () => []
    },
    beforeSubmit: Function
  },
  components: {
    ...modules
  },
  data() {
    return {
      formItem: []
    }
  },
  created() {
  },
  computed: {},
  methods: {
    onSubmit() {
      // console.log('submit!')
    },
    // 点击按钮
    hanldeClick(item) {
      // console.log('提交1', item.key)
      // 提交2
      if (item.key === 'submit') {
        this.handleSubmit(item)
        return
      }
      // 重置
      if (item.key === 'cancel') {
        this.handleCancel(item)
      }
    },

    // 1 提交2
    handleSubmit(item) {
      // console.log('提交2', item)

      this.$refs.form.validate(valid => { // 提交验证
        // item.loading = true
        if (valid) {
          this.$set(item, 'loading', true)
          // 判断 父传子 是不是函数
          if (typeof this.beforeSubmit === 'function') {
            this.beforeSubmit().then(res => {
              this.$set(item, 'loading', false)
              // console.log('success')
            }).catch((error) => {
              this.$set(item, 'loading', false)
              console.log(error)
            })
          }
        }
      })
    },

    // 2 重置
    handleCancel(item) {
      // 重置
      this.$refs.form.resetFields()
      // console.log('重置', item)
      item.callback && item.callback() // 调用 item 的回调 callback()
    }
  },
  mounted() {
  },
  beforeMount() {
    this.formItem = createRules(this.item)
    // this.formItem = this.item
    // console.log('this.formItem ', this.formItem)
  }
}
</script>

<style lang="scss" scoped>
</style>
