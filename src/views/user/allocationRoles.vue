<template>
  <el-dialog title="详细信息" :visible.sync="thisVisible" :before-close="close" @open="open">
    <el-form
      ref="dataForm"
      label-position="right"
      :model="data"
      label-width="150px"
      v-loading="thisLoading"
    >
      <el-form-item label="角色" prop="roles">
        <el-select size="medium" v-model="roleIds" multiple placeholder="请选择角色" clearable>
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-row >
      <el-col style="text-align: center">
        <el-button type="primary" icon="el-icon-check" @click="save">保存</el-button>
        <el-button type="danger" icon="el-icon-close" @click="close">关闭</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getList, getListByUser } from '@/api/role'
import { saveRole } from '@/api/user'

export default {
  name: 'allocationRoles',
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
  data () {
    return {
      thisVisible: this.visible,
      thisParams: this.params,
      thisLoading: false,
      roles: [],
      roleIds: [],
      data: {}
    }
  },
  mounted () {
  },
  created () {
    this.loadRole()
  },
  methods: {
    open () {
      // 加载用户对应的角色ID
      getListByUser(this.thisParams.id).then(res => {
        if (res.code === 200) {
          this.roleIds = res.data
          this.thisLoading = false
        }
      })
    },
    close () {
      // 关闭dialog,并清空数据
      this.thisVisible = false
      this.thisParams = {}
      this.data = {}
      // 通知父页面
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    loadRole () {
      getList().then(res => {
        if (res.code === 200) {
          this.roles = res.data
        }
      })
    },
    save () {
      this.data.userId = this.params.id
      this.data.roleIds = this.roleIds
      saveRole(this.data).then(res => {
        if (res.code === 200) {
          this.close()
          this.$message.success(res.message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
