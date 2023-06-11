<template>
  <div class="common-layout">
    <el-container class="common-layout">
      <el-header>three.js 学习</el-header>
      <el-container class="common-layout">
        <el-aside width="200px">
          <Menu></Menu>
        </el-aside>
        <el-main class="common-layout">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Menu from './menu.vue'

</script>
<style scoped>
.common-layout{
  height: 100%;
}
</style>