<template>
  <div>
    <el-checkbox-group v-model="val" @change="handleSelectChangeEvent">
      <el-checkbox v-for="item in options" :key="item[props.value]" :label="item[props.value]">{{ item[props.label] }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
// 导入封装的props内容
import { props, mixin } from '../basis'

export default {
  name: 'CheckboxComponent',
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
