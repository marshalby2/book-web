<template>
  <div class="container">
    <!--  查询区  -->
    <el-card>
      <el-form :model="query" label-width="100px">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="名称:">
              <el-input v-model="query.label" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="url:">
              <el-input v-model="query.url" placeholder="请输入url"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!--  数据展示区  -->
    <el-card style="margin-top: 5px">
      <el-table :data="data.records" border>
        <el-table-column prop="xh" label="序号" width="80" align="center">
          <template slot-scope="scope">
            {{(data.current - 1 ) * data.size + scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="label" label="名称" width="120px"></el-table-column>
        <el-table-column prop="url" label="路径" width="120px"></el-table-column>
        <el-table-column prop="parentId" label="父菜单"></el-table-column>
        <el-table-column prop="icon" label="图标" align="center" width="80px">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" width="80px"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="operate" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button-group>
              <el-tooltip content="查看" placement="top">
                <el-button type="primary" icon="el-icon-edit" size="small" @click="edit(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip content="编辑" placement="top">
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
  </div>
</template>

<script>
import { getByPage } from '@/api/menu'
export default {
  name: 'index',
  props: {},
  components: {},
  computed: {},
  data () {
    return {
      query: {},
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
    edit (id) {
      //
    },
    show (id) {
      //
    },
    remove (id) {
      //
    }
  }
}
</script>

<style scoped>

</style>
