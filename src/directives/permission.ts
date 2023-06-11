/*
 * @Descripttion: 
 * @version: 
 * @Author: wangjie
 * @Date: 2021-09-09 14:59:47
 * @LastEditors: wangjie
 * @LastEditTime: 2021-09-09 15:22:18
 */
export default {
    install(app) {
        app.directive('permission', {
            created(...args) {
                console.log('created', args)
            },
            beforeMount(...args){
                console.log('beforeMount', args)
            },
            mounted(...args){
                console.log('mounted', args)
            },
            beforeUpdate(...args){
                console.log('beforeUpdate', args)
            },
            updated(...args){
                console.log('updated', args)
            },
            beforeUnmount(...args){
                console.log('beforeUnmount', args)
            },
            unmounted(...args){
                console.log('unmounted', args)
            }
        })
    }
}