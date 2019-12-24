import request from '../utils/request'

export function fetchList(query){
    return request({
        url: '/rp/query',
        method: 'get',
        params: query
    })
}
// 添加
export function addRp(data){
    return request({
        url: '/rp/add',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 更新
export function updateRp(data){
    return request({
        url: '/rp/update',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 删除
export function deleteRp(id){
    return request({
        url: '/rp/delete',
        method: 'get',
        params: {
            id:id
        }
    })
}