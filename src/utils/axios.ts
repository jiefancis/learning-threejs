/*
 * @Descripttion: 
 * @version: 
 * @Author: wangjie
 * @Date: 2021-09-09 15:30:57
 * @LastEditors: wangjie
 * @LastEditTime: 2021-09-09 17:07:19
 */
import Axios from 'axios'


const API = import.meta.env.VITE_PREFIX_API
const server = Axios.create({
    baseURL: API,
    timeout: 3000
})

server.interceptors.request.use(config => {
    console.log('request', config)
    return config
}, err => {
    console.log('request-err', err)
})

server.interceptors.response.use(res => {
    console.log('response', res)
    return res
}, err => {
    console.log('response-err', err)
})

export default server