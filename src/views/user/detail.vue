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
      <el-form-item label="用户名" prop="label">
        <el-input v-model="data.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="data.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-input v-model="data.avatar" ></el-input>
      </el-form-item>
       <el-form-item label="昵称" prop="nickName">
         <el-input v-model="data.nickName" placeholder="请输入昵称"></el-input>
       </el-form-item>
       <el-form-item label="邮箱" prop="email">
         <el-input v-model="data.email" placeholder="请输入邮箱"></el-input>
       </el-form-item>
       <el-form-item label="是否启用" prop="enable">
         <el-input v-model="data.enable" placeholder="请输入邮箱"></el-input>
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
import { getDetail, save } from '../../api/menu'
import { mapGetters } from 'vuex'
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
    ...mapGetters([
      'menuTree'
    ])
  },
  data () {
    return {
      thisVisible: this.visible,
      thisParams: this.params,
      data: {},
      rules: {},
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
          this.loadMenuTree()
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
    },
    loadMenuTree () {
      const param = {
        lazy: false,
        parentId: null
      }
      this.$store.dispatch('GetMenuTree', param).then(res => {
        // this.menuTree = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
