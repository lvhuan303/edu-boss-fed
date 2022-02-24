<template>
  <div class="resource-list">
    <el-card class="box-card">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="资源名称">
          <el-input v-model="form.name" placeholder="资源名称"></el-input>
        </el-form-item>
        <el-form-item label="资源路径">
          <el-input v-model="form.url" placeholder="资源路径"></el-input>
        </el-form-item>
        <el-form-item label="资源分类">
          <el-select v-model="form.categoryId" clearable placeholder="全部">
            <el-option v-for="resourceCate in resourceCates"
                       :key="resourceCate.id"
                       :label="resourceCate.name"
                       :value="resourceCate.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-button @click="editResource(0)" size="mini">添加</el-button>
    <el-card class="box-card">
      <el-button @click="editResource(0)" size="mini">添加</el-button>
      <el-button @click="$router.push({ name:'resourceCate' })" size="mini">资源分类</el-button>
    </el-card>
    <el-card class="box-card">
      <el-table
        v-loading="isLoading"
        :data="resources"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          label="添加时间">
          <template slot-scope="scope">
            {{ scope.row.createdTime | date('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="editResource(scope.row.id)" type="text" size="small">编辑</el-button>
            <el-button @click="doDel(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      :disabled="isLoading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.current"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="form.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <resource-create :id="id" :dialogFormVisible = 'dialogFormVisible' @listenToChildEvent="fromDialogCom" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ResourceCreate from './resource-create.vue'
import { getResourcePages, getAllCategory, delResource } from '@/services/resource'
import { delMenu } from '@/services/menu'
export default Vue.extend({
  name: 'resourceList',
  components: {
    ResourceCreate
  },
  data () {
    return {
      resources: [],
      form: {
        size: 10,
        current: 1,
        name: '',
        url: '',
        categoryId: ''
      },
      dialogFormVisible: false,
      total: 0,
      id: 0,
      resourceCates: [],
      isLoading: false
    }
  },
  methods: {
    search () {
      this.form.current = 1
      this.loadResourceList()
    },
    fromDialogCom (isShow:boolean) {
      this.dialogFormVisible = isShow
      this.loadResourceList()
    },
    async loadResourceList () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      this.resources = data.data.records
      this.total = data.data.total
      this.isLoading = false
    },
    async loadResourceCateList () {
      const { data } = await getAllCategory()
      this.resourceCates = data.data
    },
    handleSizeChange (val:any) {
      this.form.size = val
      this.form.current = 1
      this.loadResourceList()
    },
    handleCurrentChange (val:any) {
      this.form.current = val
      this.loadResourceList()
    },
    editResource (id:number) {
      this.id = id
      this.dialogFormVisible = true
    },
    doDel (id:number) {
      this.$confirm('确认删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await delResource(id)
        if (data.code === '000000') {
          await this.loadResourceList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  },
  created () {
    this.loadResourceList()
    this.loadResourceCateList()
  }
})
</script>

<style lang="scss" scoped>
.el-pagination{
  padding-top:40px;
}
</style>
