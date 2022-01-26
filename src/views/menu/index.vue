<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name:'createMenu' })">添加菜单</el-button>
      </div>
      <el-table
        :data="menus"
        border
        style="width: 100%">
        <el-table-column
          label="编号"
          width="150"
          type="index"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          label="菜单级别"
          min-width="150"
        >
          <template slot-scope="scope">{{ level[scope.row.level] }}</template>
        </el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenu, delMenu } from '@/services/menu'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menus: [],
      level: ['一级', '二级']
    }
  },
  methods: {
    async getAllMenu () {
      const { data } = await getAllMenu()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    handleEdit (row:any) {
      this.$router.push({
        name: 'editMenu',
        params: { id: row.id }
      })
    },
    handleDelete (row:any) {
      this.$confirm('确认删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await delMenu(row.id)
        if (data.code === '000000') {
          this.getAllMenu()
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
    this.getAllMenu()
  }
})
</script>

<style lang="scss" scoped></style>
