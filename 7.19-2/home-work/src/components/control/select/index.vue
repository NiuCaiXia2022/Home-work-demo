<template>
  <div>
    <el-select v-model="val" @change="handleSelectChangeEvent">
      <el-option v-for="item in options" :key="item[props.value]" :label="item[props.label]" :value="item[props.value]">
      </el-option>
    </el-select>
  </div>
</template>
<script>
// 导入封装的props内容
import { props, mixin } from '../basis'
export default {
  name: 'SelectComponent',
  mixins: [mixin], // 混入 (把公共参数集中抽离出来)
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

  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
</style>
