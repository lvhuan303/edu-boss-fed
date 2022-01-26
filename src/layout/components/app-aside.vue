<template>
  <div class="aside">
    <el-menu
      :collapse="this.isCollapse"
      :default-active="$route.path"
      router
      @open="handleOpen"
      @close="handleClose"
      text-color="#303133"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/role">
          <i class="el-icon-setting"></i>
          <span>角色列表</span>
        </el-menu-item>
        <el-menu-item index="/menu">
          <i class="el-icon-s-opportunity"></i>
          <span>菜单列表</span>
        </el-menu-item>
        <el-menu-item index="/resource">
          <i class="el-icon-s-promotion"></i>
          <span>资源列表</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/course">
        <i class="el-icon-s-home"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item index="/advert">
          <i class="el-icon-setting"></i>
          <span>广告列表</span>
        </el-menu-item>
        <el-menu-item index="/advert-space">
          <i class="el-icon-setting"></i>
          <span>广告位列表</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'AppAside',
  computed: {
    ...mapState(['isCollapse'])
  },
  methods: {
    handleOpen (key:string, keyPath:string) {
      console.log(key, keyPath)
    },
    handleClose (key:string, keyPath:string) {
      console.log(key, keyPath)
    }
  }
})
</script>

<style lang="scss" scoped>
.aside{
  background-color:#f8f9fb;
  .el-menu{
    min-height: 100vh;
  }
}
.is-active {
  background: linear-gradient(270deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.5) 100%)!important;
}
</style>
