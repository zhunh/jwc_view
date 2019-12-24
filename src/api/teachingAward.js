import request from '../utils/request'

export function fetchList(query){
    return request({
        url: '/ta/query',
        method: 'get',
        params: query
    })
}
// 添加
export function addTa(data){
    return request({
        url: '/ta/add',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 更新
export function updateTa(data){
    return request({
        url: '/ta/update',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 删除
export function deleteTa(id){
    return request({
        url: '/ta/delete',
        method: 'get',
        params: {
            id:id
        }
    })
}