import request from '../utils/request'

export function fetchList(query){
    return request({
        url: '/mcr/query',
        method: 'get',
        params: query
    })
}
// 添加
export function addMcr(data){
    return request({
        url: '/mcr/add',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 更新
export function updateMcr(data){
    return request({
        url: '/mcr/update',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 删除
export function deleteMcr(id){
    return request({
        url: '/mcr/delete',
        method: 'get',
        params: {
            id:id
        }
    })
}