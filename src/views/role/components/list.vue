<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="角色">
            <el-input v-model="form.name" placeholder="角色名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button @click="handleAdd">添加角色</el-button>
      <el-table
        :data="roles"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column
          prop="id"
          label="编号"
        />
        <el-table-column
          prop="name"
          label="角色名称"
        />
        <el-table-column
          prop="description"
          label="描述"
        />
        <el-table-column
          label="添加时间">
          <template slot-scope="scope">
            {{ scope.row.createdTime | date('YYYY-MM-DD HH:mm') }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="150px"
        >
          <template slot-scope="scope">
            <div>
              <el-button
                type="text"
                @click="$router.push({
                  name: 'alloc-menu',
                  params: {
                    roleId: scope.row.id
                  }
                })"
              >分配菜单</el-button>
              <el-button
                type="text"
                @click="$router.push({
                  name: 'alloc-resource',
                  params: {
                    roleId: scope.row.id
                  }
                })"
              >分配资源</el-button>
            </div>
            <div>
              <el-button
                type="text"
                @click="handleEdit(scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.row.id)"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="isEdit ? '编辑角色' : '添加角色'"
               width="50%"
               :visible.sync="dialogVisible">
      <create-edit
        v-if="dialogVisible"
        :is-edit="isEdit"
        :role-id="roleId"
        @success="onSuccess"
        @cancel="dialogVisible = false"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRoles, deleteRole } from '@/services/role'
import CreateEdit from './create-edit'

export default Vue.extend({
  name: 'RoleList',
  components: {
    CreateEdit
  },
  data () {
    return {
      form: {
        current: 1,
        size: 50,
        user: ''
      },
      roles: [],
      loading: false,
      isEdit: false,
      dialogVisible: false,
      roleId: null
    }
  },
  methods: {
    search () {
      this.loadRole()
    },
    async loadRole () {
      this.loading = true
      const { data } = await getRoles(this.form)
      this.roles = data.data.records
      this.loading = false
    },
    handleAdd () {
      this.isEdit = false
      this.dialogVisible = true
    },
    handleEdit (row) {
      this.isEdit = true
      this.roleId = row.id
      this.dialogVisible = true
    },
    async onSuccess () {
      this.dialogVisible = false
      await this.loadRole()
    },
    handleDelete (id:number) {
      console.log(id)
      this.$confirm('确认删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await deleteRole(id)
        if (data.code === '000000') {
          await this.loadRole()
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
    this.loadRole()
  }
})
</script>

<style lang="scss" scoped>

</style>
