/*
 * @Descripttion: 
 * @version: 
 * @Author: wangjie
 * @Date: 2021-09-09 15:19:13
 * @LastEditors: wangjie
 * @LastEditTime: 2021-09-09 16:14:26
 */
import permission from './permission'

export default {
    install(app) {
        app.use(permission)
    }
}