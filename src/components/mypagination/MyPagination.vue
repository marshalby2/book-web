<template>
   <el-pagination
     background
     @size-change="handleSizeChange"
     @current-change="handleCurrentChange"
     :current-page="pageData.current"
     :page-size="pageData.size"
     :page-sizes="[5,10,15]"
     :total="pageData.total"
     layout="total, sizes, prev, pager, next, next, jumper"
   >
   </el-pagination>
</template>

<script>
export default {
  name: 'MyPagination',
  props: {
    pageData: {
      type: Object
    }
  },
  watch: {
    pageData (val, olaVal) {
      this.thisPageData = val
    }
  },
  components: {},
  computed: {},
  data () {
    return {
      thisPageData: {}
    }
  },
  mounted () {
  },
  created () {
  },
  methods: {
    handleSizeChange (size) {
      this.$emit('step', this.thisPageData.current, size)
    },
    handleCurrentChange (current) {
      this.$emit('step', current, this.thisPageData.size)
    }
  }
}
</script>

<style scoped>
.el-pagination{
  margin-top: 5px;
}
</style>
