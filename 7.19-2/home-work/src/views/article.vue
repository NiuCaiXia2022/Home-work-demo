<template>
  <div>
    <myTable :column="column" index init-request :format="formatData" url="/article/advert/search" method="POST">
      <template v-slot:operation="slot">
        <el-button type="primary" @click="handleClickEdit(slot)" icon="el-icon-edit">编辑</el-button>
        <el-button type="danger" @click="handleClickDelete(slot)" icon="el-icon-edit">删除</el-button>
      </template>
    </myTable>
  </div>
</template>
<script>
export default {
  name: 'article',
  props: {},
  components: {
    myTable: () => import('../components/table/index.vue')
  },
  data() {
    return {
      column: [
        {
          label: '广告标题',
          prop: 'title'
        },
        {
          label: '广告图片',
          prop: 'imageUrl',
          type: 'image'
        },
        {
          label: '广告链接',
          prop: 'advertUrl',
          type: 'function',
          callback: (item) => {
            return '<a href=' + item.advertUrl + ' "target="_blank">' + item.advertUrl + '</a>'
          }
        },
        {
          label: '状态',
          prop: 'status',
          type: 'tag'
        },
        {
          label: '排序',
          prop: 'sort'
        },
        {
          label: '操作',
          type: 'slot',
          slot_name: 'operation',
          prop: 'operation'
        }
      ]
    }
  },
  created() {
  },
  computed: {},
  methods: {
    handleClickEdit(row) {
      console.log('1', row)
    },
    handleClickDelete(row) {
      console.log('2', row)
    },
    formatData(res) {
      console.log('res', res)
      return res.data.records
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
</style>
