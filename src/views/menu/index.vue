<template>
  <div class="container">
    <!--  查询区  -->
    <el-card>
      <el-form :model="query" label-width="100px">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="名称:">
              <el-input v-model="query.label" placeholder="请输入名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上级菜单:">
              <el-cascader
                v-model="cascaderValues"
                :options="menuTree"
                :props="cascaderProps"
                style="width: 100%"
                :show-all-levels="false"
                filterable
                clearable
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="url:">
              <el-input v-model="query.url" placeholder="请输入url" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="text-align: center">
          <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
          <el-button type="primary" icon="el-icon-search" @click="loadData(1)">查询</el-button>
        </el-row>
      </el-form>
    </el-card>
    <!--  数据展示区  -->
    <el-card style="margin-top: 5px">
      <el-table :data="data.records" border  class="table">
        <el-table-column prop="xh" label="序号" width="80" align="center">
          <template slot-scope="scope">
            {{(data.current - 1 ) * data.size + scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="label" label="名称" width="180"></el-table-column>
        <el-table-column prop="url" label="路径" width="180"></el-table-column>
        <el-table-column prop="parent" label="上级菜单"></el-table-column>
        <el-table-column prop="icon" label="图标" align="center" width="100">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" width="100"></el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button-group>
              <el-tooltip content="编辑" placement="top">
                <el-button type="primary" icon="el-icon-edit" size="small" @click="edit(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip content="查看" placement="top">
                <el-button type="success" icon="el-icon-menu" size="small" @click="show(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button type="danger" icon="el-icon-delete" size="small" @click="remove(scope.row.id)"></el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!--   分页组件   -->
      <my-pagination :page-data="data" @step="loadData"></my-pagination>
    </el-card>
    <!-- 弹出框区 -->
    <detail :params="params" :visible.sync="detailVisible" @close="detailClose"></detail>
  </div>
</template>

<script>
import { getByPage, remove } from '@/api/menu'
import detail from './detail'
import { mapGetters } from 'vuex'
export default {
  name: 'index',
  props: {},
  components: { detail },
  computed: {
    ...mapGetters([
      'menuTree'
    ])
  },
  data () {
    return {
      query: {},
      data: {
        records: [],
        current: 1,
        size: 10,
        total: 0
      },
      detailVisible: false,
      params: {},
      cascaderValues: [],
      // 菜单树数据和级联选择器属性映射关系
      cascaderProps: {
        label: 'label',
        value: 'id',
        children: 'children',
        checkStrictly: true
      }
    }
  },
  mounted () {
  },
  created () {
    this.loadData()
    if (!this.menuTree || this.menuTree.length === 0) {
      this.loadMenuTree()
    }
  },
  methods: {
    /**
     * 加载数据
     *
     * @param current 当前页(分页组件传过来的值)
     * @param size 分页尺寸(分页组件传过来的值)
     */
    loadData (current, size) {
      this.query.current = current || this.data.current
      this.query.size = size || this.data.size
      this.query.parentId = Object.assign([], this.cascaderValues).pop()
      getByPage(this.query).then(res => {
        this.data = res.data
      })
    },
    add () {
      this.params = { id: null, isSubmit: true }
      this.detailVisible = true
    },
    edit (id) {
      this.params = { id: id, isSubmit: true }
      this.detailVisible = true
    },
    show (id) {
      this.params = { id: id, isSubmit: false }
      this.detailVisible = true
    },
    remove (id) {
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.thisLoading = true
        remove(id).then(res => {
          if (res.code === 200) {
            this.$message.success(res.message)
            this.loadMenuTree()
            this.loadData()
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },
    detailClose () {
      this.params = {}
      this.loadData()
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
  .table {
    width: 100%;
    font-size: 14px;
  }
</style>
