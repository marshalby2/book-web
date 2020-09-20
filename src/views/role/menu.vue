<template>
  <el-dialog title="菜单信息" :visible.sync="thisVisible" :before-close="close" @open="open">
    <el-tree
      :data="menuTree"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps">
    </el-tree>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { saveRole } from '@/api/role'
import { getListByRole } from '@/api/menu'

export default {
  name: 'menu',
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
          const menuList = res.data
          const checkedMenuIds = []
          if (menuList !== null && menuList.length > 0) {
            for (let i = 0; i < menuList.length; i++) {
              if (menuList[i].parentId !== 1) {
                checkedMenuIds.push(menuList[i].id)
              }
            }
          }
          debugger
          this.$refs.tree.setCheckedKeys(checkedMenuIds)
        }
      })
    },
    save () {
      this.data.roleId = this.params.id
      this.data.menuIds = this.menuIds
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
