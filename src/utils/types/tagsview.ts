/*
 * @Descripttion: 
 * @version: 
 * @Author: wangjie
 * @Date: 2021-09-11 09:33:30
 * @LastEditors: wangjie
 * @LastEditTime: 2021-09-11 10:40:21
 */
export interface Tag{
    title: String | unknown,
    path?: String
}

export type TagList = Array<Tag>

export interface State{
    tagList: TagList,
    current: Number
}

export interface ILengthwise {
  length: number;
}