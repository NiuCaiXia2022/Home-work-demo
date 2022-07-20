<template>
  <!--  <el-table-column prop="name" label="姓名" width="180">
        </el-table-column> -->
  <!--  type="selection"  复选框  --><!--  type="index"  label="序号"  序号  -->
  <div>
    <!-- {{ tableData }} -->
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column
        v-if="index"
        type="index"
        label="序号"
        width="50"
      ></el-table-column>
      <el-table-column
        v-if="checkbox"
        type="selection"
        width="50"
      ></el-table-column>

      <template v-for="(item, index) in column">
        <!-- 1 -->
        <el-table-column
          :key="index"
          v-if="item.type === 'function'"
          :prop="item.prop"
          :label="item.label"
        >
          <template v-slot="scope">
            <div
              v-html="item.callback && item.callback(scope.row, index)"
            ></div>
          </template>
        </el-table-column>
        <!-- 2 -->
        <el-table-column
          :key="item.prop"
          v-if="item.type === 'slot'"
          :prop="item.prop"
          :label="item.label"
        >
          <template v-slot="scope">
            <!-- 作用域插槽 -->
            <slot :name="item.slot_name" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <!-- 3 -->
        <el-table-column
          :key="item.label"
          v-else
          :prop="item.prop"
          :label="item.label"
        ></el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
export default {
  // 接收父组件传递的值
  props: {
    column: {
      type: Array,
      default: () => []
    },
    checkbox: Boolean,
    index: Boolean,
    url: {
      type: String,
      default: '',
      required: true
    },
    method: {
      type: String,
      default: 'GET',
      required: true
    },
    params: {
      type: Object,
      defauil: () => {}
    },
    data: {
      type: Object,
      defauil: () => {}
    },
    initRequest: Boolean,
    onLoad: Boolean,
    format: Function
  },
  components: {},
  data() {
    return {
      // table 数据
      tableData: []
    }
  },
  created() {
    this.initRequest && this.getTableList()
  },
  computed: {},
  methods: {
    // 请求
    async getTableList() {
      if (!this.url) {
        this.$message('url is required')
        return false
      }
      try {
        const requestData = {
          url: this.url,
          method: this.method
        }

        if (this.data) {
          requestData.data = this.data
        }
        if (this.params) {
          requestData.params = this.params
        }

        const res = await this.$axios(requestData)
        this.tableData = res.data.data

        // 发送给父组件
        let data = res.data
        // console.log(res)
        if (this.format && typeof this.format === 'function') {
          data = this.format(res.data)
        }

        this.tableData = data

        this.onLoad && this.$emit('onLoad', res)
      } catch (error) {
        console.log(error)
      }
    },
    // 子传父请求
    getInitRequest() {
      console.log(12)
      console.log(this.getTableList())
      this.getTableList()
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
// {
//   id: 1,
//   title: '这是一段标题123',
//   date: '2016-05-02',
//   name: '王小虎',
//   address: '上海市普陀区金沙江路 1518 弄',
//   sex: '男'
// },
</style>
