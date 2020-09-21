<template>
  <div class="container">
    <!--  查询区  -->
    <el-card>
      <el-form :model="query" label-width="100px">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="角色名称:">
              <el-input v-model="query.name" placeholder="名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="角色标识:">
              <el-input v-model="query.code" placeholder="标识" clearable></el-input>
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
      <el-table :data="data.records" border class="table">
        <el-table-column prop="xh" label="序号" width="80" align="center">
          <template slot-scope="scope">
            {{(data.current - 1 ) * data.size + scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色名称" width="200"></el-table-column>
        <el-table-column prop="code" label="角色标识" width="200"></el-table-column>
        <el-table-column prop="remark" label="备注" width="200"></el-table-column>
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
              <el-tooltip content="分配菜单" placement="top">
                <el-button type="success" icon="el-icon-menu" size="small" @click="menu(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip content="查看" placement="top">
                <el-button type="info" icon="el-icon-zoom-in" size="small" @click="show(scope.row.id)"></el-button>
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
    <!--  弹出框  -->
    <detail :params="params" :visible.sync="detailVisible" @close="detailClose"></detail>
    <my-menu :params="params" :visible.sync="menuVisible" @close="menuClose"></my-menu>
  </div>
</template>

<script>
import { getByPage, remove } from '@/api/role'
import detail from './detail'
import MyMenu from './allocationMenu'

export default {
  name: 'index',
  props: {},
  components: { detail, MyMenu },
  computed: {},
  data () {
    return {
      query: {},
      // 传给子页面的参数
      params: {},
      // 子页面可见性
      detailVisible: false,
      menuVisible: false,
      data: {
        records: [],
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  mounted () {
  },
  created () {
    this.loadData()
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
      getByPage(this.query).then(res => {
        this.data = res.data
      })
    },
    add () {
      this.params = {
        id: null,
        isSubmit: true
      }
      this.detailVisible = true
    },
    edit (id) {
      this.params = {
        id: id,
        isSubmit: true
      }
      this.detailVisible = true
    },
    menu (id) {
      this.params = {
        id: id
      }
      this.menuVisible = true
    },
    show (id) {
      this.params = {
        id: id,
        isSubmit: false
      }
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
    menuClose () {
      this.params = {}
    }
  }
}
</script>

<style scoped>
  .avatar {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }
</style>
