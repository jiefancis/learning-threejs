/*
 * @Descripttion: 
 * @version: 
 * @Author: wangjie
 * @Date: 2021-08-18 18:27:56
 * @LastEditors: wangjie
 * @LastEditTime: 2021-09-11 11:54:30
 */
import {
    createRouter,
    createWebHistory
} from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '/',
                redirect: 'brave'
            },
            {
                path: 'brave',
                component: () => import('@/page/brave/index.vue'),
                meta: {title: '粒子波浪'}
            },
            {
                path: 'screen',
                component: () => import('@/page/screen/index.vue'),
                meta: {title: '分屏'}
            },
            {
                path: 'stars',
                component: () => import('@/page/stars/index.vue'),
                meta: {title: '星系'}
            }, 
            {
                path: 'arrayCamera',
                component: () => import('@/page/arrayCamera/index.vue'),
                meta: {title: 'arrayCamera'}
            },

            {
                path: 'animate',
                component: () => import('@/page/animate/index.vue'),
                meta: {title: '动画'}
            },
            {
                path: 'raycaster',
                component: () => import('@/page/raycaster/index.vue'),
                meta: {title: '射线'}
            }, 
            {
                path: 'renderTarget',
                component: () => import('@/page/renderTarget/index.vue'),
                meta: {title: 'renderTarget'}
            }
        ]
    }
    
]

export default createRouter({
    history: createWebHistory('/'),
    routes
})