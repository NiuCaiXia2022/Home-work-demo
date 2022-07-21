<template>
  <!-- :rules="rules"   el-form 效验全局表单   el-form-item效验单个-->
  <div>
    <el-form ref="form" :model="field" label-width="80px">
      <template v-for="(item) in formItem">

        <!-- 1 input-->
        <el-form-item :key="item.label" v-if="item.type === 'input'" :rules="item.rules" :label="item.label"
          :prop="item.prop">
          <el-input v-model="field[item.prop]"></el-input>
        </el-form-item>

        <!-- 2 下拉框-->
        <el-form-item :key="item.label" v-if="item.type === 'select'" :rules="item.rules" :label="item.label"
          :prop="item.prop">
          <el-select v-model="field[item.prop]"></el-select>
        </el-form-item>

      </template>
      <!-- 3 按钮 -->
      <el-form-item>
        <el-button @click="hanldeClick(item)" v-for="(item, index) in button" :key="index" v-bind="item">{{ item.label
        }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { createRules } from './createRules.js'
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
    }
  },
  components: {},
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
      console.log('submit!')
    },
    // 点击按钮
    hanldeClick(item) {
      console.log('提交1', item.key)
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
      console.log('提交2', item)
      // 提交验证
      this.$refs.form.validate(valid => {
        console.log('valid', valid)
        if (valid) {
          console.log('表单提交')
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
    // console.log('12', createRules(this.item))
    // console.log('this.item', this.item)
    this.formItem = createRules(this.item)
    // this.formItem = this.item
    console.log('this.formItem ', this.formItem)
  }
}
</script>

<style lang="scss" scoped>
</style>
