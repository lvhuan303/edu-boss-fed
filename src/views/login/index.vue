<template>
  <div class="wrap">
    <div class="inner">
      <div class="ms-title">
        <h1>Edu boss管理系统</h1>
      </div>
      <div class="login">
        <el-form
          class="login-form"
          label-position="top"
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80">
          <el-form-item label="用户名" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" :loading="isLoginLoading" @click="doLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { login } from '@/services/user'
import { mapMutations } from 'vuex'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      isLoginLoading: false,
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { required: true, pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '请输入正确手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async doLogin () {
      this.isLoginLoading = true
      try {
        await (this.$refs.form as Form).validate()
        const { data } = await login(this.form)
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.setUser(data.content)
          this.$router.push(this.$route.query.redirect as string || '/')
        }
      } catch (err) {
        console.log(`登录失败${err}`)
      }
      this.isLoginLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.wrap{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .ms-title{
    width: 400px;
    h1{
      display: flex;
      justify-content: center;
      font-size: 3rem;
      color: rgba(0,0,0,.5);
      font-weight: 300;
      text-align: center;
    }
  }
  .login{
    display: flex;
    align-items: center;
    justify-content:center;
    .login-form{
      width: 350px;
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
    }
    .login-btn{
      width: 100%;
      background-color: #40586f;
      border-radius: 5px;
    }
  }
}
</style>
