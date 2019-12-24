import request from '../utils/request'
// 查询
export function fetchList(query){
    return request({
        url: '/er/query',
        method: 'get',
        params: query
    })
}
// 添加
export function addEr(data){
    return request({
        url: '/er/add',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 更新
export function updateEr(data){
    return request({
        url: '/er/update',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 删除
export function deleteEr(id){
    return request({
        url: '/er/delete',
        method: 'get',
        params: {
            id:id
        }
    })
}