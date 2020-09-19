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
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="data.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="角色标识" prop="code">
        <el-input v-model="data.code" placeholder="请输入标识"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="data.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
     </el-form>
     <el-row v-if="params.isSubmit">
       <el-col style="text-align: center">
         <el-button type="primary" icon="el-icon-check" @click="save">保存</el-button>
         <el-button type="danger" icon="el-icon-close" @click="close">关闭</el-button>
       </el-col>
     </el-row>
   </el-dialog>
</template>

<script>
import { getDetail, save } from '../../api/role'
export default {
  name: 'detail',
  props: {
    visible: Boolean,
    params: {}
  },
  watch: {
    // 可见性
    visible (val, oldVal) {
      this.thisVisible = val
    },
    // 父页面传来的参数
    params (val, oldVal) {
      this.thisParams = val
    }
  },
  components: {},
  computed: {
  },
  data () {
    return {
      thisVisible: this.visible,
      thisParams: this.params,
      data: {},
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入标识', trigger: 'blur' }
        ]
      },
      thisLoading: true
    }
  },
  mounted () {
  },
  created () {
  },
  methods: {
    close () {
      // 关闭dialog,并清空数据
      this.thisVisible = false
      this.thisParams = {}
      this.data = {}
      // 通知父页面
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    open () {
      // 判断是修改还是新增
      if (this.params.id) {
        getDetail(this.thisParams.id).then(res => {
          if (res.code === 200) {
            this.data = res.data
            this.thisLoading = false
          }
        })
      } else {
        // 新增
        this.thisLoading = false
      }
    },
    save () {
      save(this.data).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.close()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleSelectParent (value) {
      if (value) {
        this.data.parentId = value[value.length - 1]
      } else {
        this.data.parentId = -1
      }
    }
  }
}
</script>

<style scoped>

</style>
