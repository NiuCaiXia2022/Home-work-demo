<template>
  <div>
    <!-- picker-options 日期禁用   range-separator 间隔时间的中间符号 修改  8.64e7 === 86400000 -->
    <el-date-picker v-model="val" :type="config.model || 'year'" :placeholder="config.placeholder || '选择日期时间'"
      :start-placeholder="config.startPlaceholder || '开始日期'" :end-placeholder="config.endPlaceholder || '结束日期'"
      @change="handleSelectChangeEvent" :range-separator="config.rangeSeparator || '-'"
      :picker-options="pickerOptions()" :format="config.format || 'yyyy-MM-dd'"
      :value-format="config.valueFormat || 'yyyy-MM-dd'">

    </el-date-picker>
  </div>
</template>
<script>
// 导入封装的props内容
import { props, mixin } from '../basis'

export default {
  name: 'DateComponent',
  mixins: [mixin], // 混入
  props: {
    ...props
  },
  components: {},
  data() {
    return {
      val: ''
    }
  },
  watch: {
  },
  created() {
  },
  computed: {
  },
  methods: {
    // 时间禁用
    pickerOptions() {
      const disabledDate = this.config.disabledDate
      const disabledToDay = this.config.disabledToDay

      const disabledDateRules = this.config.disabledDateRules && Object.prototype.toString.call(this.config.disabledDateRules) === '[object Function]'
      return {
        disabledDate: (time) => {
          if (disabledDateRules) {
            return this.config.disabledDateRules(time)
          } else if (disabledDate) {
            // 时间 禁用 // 8.64e7 一天的事件戳
            return time.getTime() < new Date() - 8.64e7
          } else if (disabledToDay) {
            // 时间 禁用 包含今天S
            return time.getTime() < new Date()
          } else {
            // 没有值
            return false
          }
        }
      }
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
</style>
