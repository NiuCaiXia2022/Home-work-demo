<template>
  <div>
    <!-- picker-options 日期禁用   range-separator 间隔时间的中间符号 修改  8.64e7 === 86400000 -->
    <el-date-picker v-model="val" :type="config.model || 'year'" :placeholder="config.placeholder || '选择日期时间'"
      :start-placeholder="config.startPlaceholder || '开始日期'" :end-placeholder="config.endPlaceholder || '结束日期'"
      @change="handleSelectChangeEvent" :range-separator="config.rangeSeparator || '-'" :picker-options="pickerOptions">

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
      return {
        disabledDate: (time) => {
          // 8.64e7 一天的事件戳
          if (disabledDate) {
            return time.getTime() < new Date() - 8.64e7
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
