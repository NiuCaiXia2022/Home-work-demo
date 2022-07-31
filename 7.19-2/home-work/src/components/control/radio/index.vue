<template>
  <div>
    <el-radio-group v-model="val" @change="handleSelectChangeEvent">
      <el-radio v-for="item in options" :key="item[props.value]" :label="item[props.value]">{{ item[props.label] }}
      </el-radio>
    </el-radio-group>
  </div>
</template>
<script>
// 导入封装的props内容
import { props, mixin } from '../basis'

export default {
  name: 'RadioComponent',
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
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
</style>
