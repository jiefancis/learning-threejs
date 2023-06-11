/*
 * @Descripttion: 
 * @version: 
 * @Author: wangjie
 * @Date: 2021-09-09 15:33:16
 * @LastEditors: wangjie
 * @LastEditTime: 2021-09-10 09:52:26
 */
import server from '../../utils/axios'

interface TableParams{
    pageNo: Number,
    pageSize: Number
}

export function queryTableList(options: TableParams){
    return server({
        url: '/table',
        method: 'get'
    })
}