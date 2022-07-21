<template>
  <!-- <myTable :column="column" checkbox index></myTable>    checkbox 复选框  index 序号 -->
  <!--  v-slot:operation="slot" 作用域传递的值  {{ slot.data.id }} -->
  <!--
      url="/name/"  路径
      method="GET"  method
      :data="data_1"
      :params="params_1"
      init-request  初始化请求
   -->
  <!--  修改标题头
          renderHeader: (h, { column, $index }) => {
            // return <input type="text" />
            return <div style="color:red;">123</div>
          }

    -->
  <!--
    <myTable
      :column="column"
      index
      checkbox
      url="/name/"
      method="GET"
      :data="data_1"
      :params="params_1"
      init-request
      ref="tabledemo"
      on-load
      @onLoad="onLoad"
      :format="formatDate"
    >
     -->
  <div class="home">
    <!-- 子组件  -->
    <myTable :column="column" index checkbox url="/name/" method="GET" :data="data_1" :params="params_1" init-request
      ref="tabledemo" on-load @onLoad="onLoad" :format="formatDate" :check-list="checkList">
      <el-button type="primary" @click="getCheckList">复选框数据</el-button>
      <template v-slot:operation="slot">
        <el-button type="primary" @click="handleEdit(slot.data)">编辑</el-button>
        <el-button type="danger">编辑</el-button>
        <button @click="handleDeletet">删除</button>
      </template>
    </myTable>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
    myTable: () => import('../components/table/index.vue')
  },
  data() {
    return {
      // table  的表头
      column: [
        {
          label: '姓名',
          prop: 'name'
        },
        { label: '创建时间', prop: 'create_date', sort: true, sortBy: 'a.xx' },
        { label: '图片', prop: 'url', type: 'image' },
        {
          label: '操作',
          prop: 'operation',
          type: 'slot',
          slot_name: 'operation'
        }
      ],
      data_1: {
        name: '一号'
      },
      params_1: {
        name: '二号'
      },
      checkList: []
    }
  },
  created() { },
  computed: {},
  methods: {
    // 编辑
    handleEdit(row) {
      console.log(row)
    },
    // 删除
    handleDeletet(row) {
      console.log(row)
    },
    // 回调
    onLoad(data) {
      //  获取子组件的数据
      console.log(data)
    },
    // 格式化时间
    formatDate(data) {
      // console.log('123', data)
      const tableData = data.data
      console.log('1', tableData)
      tableData.forEach((item) => {
        // console.log('item', item)
        item.gender = item.gender === '男' ? 1 : 0
      })
      console.log('23', tableData)
      return tableData
    },
    // 复选框数据 拿不到值
    getCheckList() {
      console.log('123', this.checkList)
    }
  },
  watch: {
    checkList: {
      handler(val) {
        console.log('父', val)
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
/* {
  label: '标题',
  prop: 'title',
  type: 'function',
  // 回调 返回值  return `<strong>${row.title}</strong>`
  // return row.title.replace('标题', '<strong>标题</strong>')
  callback: (row, index) => {
    if (row.id === 1) {
      return `<a href="https:''www.baidu.com">${row.title}</a>`
    }
      }
}, */

/* <myTable :column="column1" index checkbox url="/fruit/" method="GET">
      <template v-slot:operation="slot">
        <el-button type="primary" @click="handleEdit(slot.data)"
          >编辑</el-button
        >
        <el-button type="danger">编辑</el-button>
        <button>删除</button>
      </template>
    </myTable> */

/* 会有没有及时渲染的问题  undefined  */
/* mounted() {
    setTimeout(() => {
      console.log(this.$refs.tabledemo.getInitRequest())
      this.$refs.tabledemo.getInitRequest()
    }, 1000)
  } */

// {
//    label: '姓名',
//    prop: 'name',
//    renderHeader: (h, { column, $index }) => {
//      // return <input type="text" />
//      return <div style="color:red;">123</div>
//    }
//  },
//  // { label: '性别', prop: 'gender', sortable: true }, sortable: true  排序    sort: true, sortBy: 'a.xx' 自定义字段 排序
//  {
//    label: '性别',
//    prop: 'gender',
//    sort: true,
//    type: 'function',
//    callback: () => {
//      return 111
//    }
//  },
//  { label: '广告图片', prop: 'gender', type: 'img' },
</style>
