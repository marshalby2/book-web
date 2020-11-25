<template>
  <el-dialog title="菜单信息" :visible.sync="thisVisible" :before-close="close" @open="open">
    <el-tree
      :data="menuTree"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      check-on-click-node
      :check-strictly="true"
      :props="defaultProps">
    </el-tree>
    <el-row >
      <el-col style="text-align: center">
        <el-button type="primary" icon="el-icon-check" @click="save">保存</el-button>
        <el-button type="danger" icon="el-icon-close" @click="close">关闭</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { saveMenu } from '@/api/role'
import { getListByRole } from '@/api/menu'

export default {
  name: 'allocationMenu',
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
  computed: {
    ...mapGetters([
      'menuTree'
    ])
  },
  data () {
    return {
      thisVisible: this.visible,
      thisParams: this.params,
      thisLoading: false,
      data: {},
      menuIds: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted () {
  },
  created () {
    if (!this.menuTree || this.menuTree.length === 0) {
      this.loadMenuTree()
    }
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
      this.loadMenuByRole(this.params.id)
      this.data.roleId = this.params.id
    },
    loadMenuTree () {
      const param = {
        lazy: false,
        parentId: null
      }
      this.$store.dispatch('GetMenuTree', param).then(res => {
        // this.menuTree = res.data
      })
    },
    loadMenuByRole (roleId) {
      getListByRole(roleId).then(res => {
        if (res.code === 200) {
          // const menuList = res.data
          // const checkedMenuIds = []
          // if (menuList !== null && menuList.length > 0) {
          //   for (let i = 0; i < menuList.length; i++) {
          //     checkedMenuIds.push(menuList[i].id)
          //   }
          // }
          // this.$refs.tree.setCheckedKeys(checkedMenuIds)
          this.$refs.tree.setCheckedKeys(res.data.map((item) => item.id))
        }
      })
    },
    save () {
      this.data.roleId = this.params.id
      this.data.menuIds = this.$refs.tree.getCheckedKeys()
      saveMenu(this.data).then(res => {
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
