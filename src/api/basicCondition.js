import request from '../utils/request'

export function fetchList(query){
    return request({
        url: '/condition/query',
        method: 'get',
        params: query
    })
}
// 添加
export function addCo(data){
    return request({
        url: '/condition/add',
        method: 'post',
        data: data
    })
}