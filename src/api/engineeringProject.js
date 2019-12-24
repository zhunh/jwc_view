import request from '../utils/request'

export function fetchList(query){
    return request({
        url: '/ep/query',
        method: 'get',
        params: query
    })
}
// 添加
export function addEp(data){
    return request({
        url: '/ep/add',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 更新
export function updateEp(data){
    return request({
        url: '/ep/update',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 删除
export function deleteEp(id){
    return request({
        url: '/ep/delete',
        method: 'get',
        params: {
            id:id
        }
    })
}