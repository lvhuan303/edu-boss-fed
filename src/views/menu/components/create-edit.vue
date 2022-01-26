<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit?'修改':'添加' }}菜单</span>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="href">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <el-select v-model="form.parentId" placeholder="请选择活动区域">
            <el-option label="无上级菜单" :value="-1"></el-option>
            <el-option v-for="parentMenu in parentMenus"
                       :key="parentMenu.id"
                       :label="parentMenu.name"
                       :value="parentMenu.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标" prop="icon">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="shown">
          <el-radio v-model="form.shown" :label=true>是</el-radio>
          <el-radio v-model="form.shown" :label=false>否</el-radio>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input-number v-model="form.orderNum"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isCreateLoading" @click="createMenu">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getMenuInfo, saveOrUpdateMenu } from '@/services/menu'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'CreateEdit',
  data () {
    return {
      form: {
        parentId: -1,
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: false
      },
      isCreateLoading: false,
      parentMenus: [],
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入菜单描述', trigger: 'blur' }
        ],
        shown: [
          { required: true, message: '请选择是否显示', trigger: 'change' }
        ],
        parentId: [
          { required: true, message: '请选择父级菜单', trigger: 'change' }
        ]
      }
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async createMenu () {
      this.isCreateLoading = true
      try {
        await (this.$refs.form as Form).validate()
        const { data } = await saveOrUpdateMenu(this.form)
        if (data.code === '000000') {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.back()
          }, 1000)
        }
      } catch (err) {
        console.log(`创建菜单${err}`)
      }
      this.isCreateLoading = false
    },
    async getMenuInfo () {
      const id = this.$route.params.id
      const { data } = await getMenuInfo(id || -1)
      if (data.data.menuInfo) {
        this.form = data.data.menuInfo
      }
      this.parentMenus = data.data.parentMenuList
    }
  },
  created () {
    this.getMenuInfo()
  }
})
</script>

<style lang="scss" scoped>

</style>
