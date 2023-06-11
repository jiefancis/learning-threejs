<template>
    <el-menu
        default-active="/brave"
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
    >
        <el-menu-item :index="item.path" v-for="item in menuList" :key="item.path" :path="item.path">
            <el-icon :size="20"><icon-menu /></el-icon>
            <span>{{item.label}}</span>
        </el-menu-item>
        
    </el-menu>

  </template>
  
  <script lang="ts" setup>
  import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
  } from '@element-plus/icons-vue'

// state
const menuList = [
    {
        label: '粒子波浪',
        path: '/brave',
    },
    {
        label: '星系',
        path: '/stars',
    },
    {
        label: '分屏',
        path: '/screen',
    },
    {
        label: 'ArrayCamera',
        path: '/ArrayCamera',
    },

    {
        label: '动画',
        path: '/animate',
    },
    {
        label: '射线raycaster',
        path: '/raycaster',
    },
    {
        label: 'renderTarget',
        path: '/renderTarget',
    },

]

  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  </script>