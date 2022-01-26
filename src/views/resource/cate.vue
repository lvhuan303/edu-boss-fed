<template>
  <div class="resource-card">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="dialogFormVisible = true">添加</el-button>
      </div>
      <el-table
        :data="cates"
        v-loading="isLoading"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
        >
        </el-table-column>
        <el-table-column
          label="创建时间"
        >
          <template slot-scope="scope">
            {{ scope.row.createdTime | date('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="editCate(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" @click="doDel(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
      >
        <el-form-item prop="name" label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="sort" label="排序">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :loading="isCreateLoading" @click="saveCate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllCategory, saveCate, delCate } from '@/services/resource'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'resourceCate',
  data () {
    return {
      cates: [],
      isLoading: false,
      dialogFormVisible: false,
      form: {
        id: 0,
        name: '',
        sort: 0
      },
      formLabelWidth: '40px',
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ]
      },
      isCreateLoading: false
    }
  },
  methods: {
    async loadCateList () {
      this.isLoading = true
      const { data } = await getAllCategory()
      this.cates = data.data
      this.isLoading = false
    },
    editCate (row: any) {
      this.form = row
      this.dialogFormVisible = true
    },
    doDel (id:number) {
      this.$confirm('确认删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await delCate(id)
        if (data.code === '000000') {
          await this.loadCateList()
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
    },
    async saveCate () {
      this.isCreateLoading = true
      try {
        await (this.$refs.form as Form).validate()
        const { data } = await saveCate(this.form)
        if (data.code === '000000') {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          await this.loadCateList()
        }
      } catch (err) {
        console.log(`创建分类${err}`)
      }
      (this.$refs.form as Form).resetFields()
      this.dialogFormVisible = false
      this.isCreateLoading = false
    }
  },
  created () {
    this.loadCateList()
  }
})
</script>

<style lang="scss" scoped>

</style>
