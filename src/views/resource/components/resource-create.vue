<template>
  <div class="resource-create">
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select v-model="form.categoryId" clearable placeholder="全部">
            <el-option v-for="resourceCate in resourceCates"
                       :key="resourceCate.id"
                       :label="resourceCate.name"
                       :value="resourceCate.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.description">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="offDialog">取 消</el-button>
        <el-button type="primary" :loading="isCreateLoading" @click="saveResource">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllCategory, saveOrUpdateResource, getResource } from '@/services/resource'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'resourceCreate',
  data () {
    return {
      form: {
        name: '',
        categoryId: '',
        url: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ]
      },
      resourceCates: [],
      formLabelWidth: '120px',
      isCreateLoading: false
    }
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    }
  },
  watch: {
    id (newVal) {
      console.log(newVal)
      if (newVal) {
        this.getResourceDetail()
      } else {
        (this.$refs.form as Form).resetFields()
      }
    }
  },
  methods: {
    offDialog () {
      console.log('ccc')
      this.$emit('listenToChildEvent', false)
    },
    async getAllCate () {
      const { data } = await getAllCategory()
      this.resourceCates = data.data
    },
    async saveResource () {
      this.isCreateLoading = true
      try {
        await (this.$refs.form as Form).validate()
        const { data } = await saveOrUpdateResource(this.form)
        if (data.code === '000000') {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          setTimeout(() => {
            this.offDialog()
          }, 1000)
        }
      } catch (err) {
        console.log(`创建资源${err}`)
      }
      this.isCreateLoading = false
    },
    async getResourceDetail () {
      const { data } = await getResource(this.id)
      this.form = data.data
    }
  },
  created () {
    this.getAllCate()
  }
})
</script>

<style lang="scss" scoped>

</style>
