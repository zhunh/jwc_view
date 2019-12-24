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
// 更新
export function updateCo(data){
    return request({
        url: '/condition/update',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 删除
export function deleteCo(id){
    return request({
        url: '/condition/delete',
        method: 'get',
        params: {
            id:id
        }
    })
}