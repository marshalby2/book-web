<template>
   <el-dialog title="详细信息" :visible.sync="thisVisible" :before-close="close" @open="open">
     <el-form
      ref="form"
      label-position="right"
      :model="data"
      :rules="rules"
      label-width="150px"
      v-loading="thisLoading"
     >
      <el-form-item label="名称" prop="label">
        <el-input v-model="data.label" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="url" prop="url">
        <el-input v-model="data.url" placeholder="请输入路径"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="data.icon" placeholder="请输入图标"></el-input>
      </el-form-item>
     </el-form>
   </el-dialog>
</template>

<script>
import { getDetail } from '../../api/menu'
export default {
  name: 'detail',
  props: {
    visible: Boolean,
    params: {}
  },
  watch: {
    visible (val, oldVal) {
      this.thisVisible = val
    },
    params (val, oldVal) {
      this.thisParams = val
    }
  },
  components: {},
  computed: {},
  data () {
    return {
      thisVisible: this.visible,
      thisParams: this.params,
      data: {},
      rules: {},
      thisLoading: false
    }
  },
  mounted () {
  },
  created () {
  },
  methods: {
    close () {
      //
    },
    open () {
      // 判断是修改还是新增
      if (this.thisParams.id) {
        getDetail(this.thisParams.id).then(res => {
          this.data = res.data
          this.thisLoading = false
        })
      } else {
        //
      }
    }
  }
}
</script>

<style scoped>

</style>
