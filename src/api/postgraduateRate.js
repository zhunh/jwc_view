import request from '../utils/request'

export function fetchList(query){
    return request({
        url: '/pr/query',
        method: 'get',
        params: query
    })
}
// 添加
export function addPr(data){
    return request({
        url: '/pr/add',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 更新
export function updatePr(data){
    return request({
        url: '/pr/update',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 删除
export function deletePr(id){
    return request({
        url: '/pr/delete',
        method: 'get',
        params: {
            id:id
        }
    })
}