import request from '../utils/request'

export function fetchList(query){
    return request({
        url: '/tpp/query',
        method: 'get',
        params: query
    })
}
// 添加
export function addTpp(data){
    return request({
        url: '/tpp/add',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 更新
export function updateTpp(data){
    return request({
        url: '/tpp/update',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 删除
export function deleteTpp(id){
    return request({
        url: '/tpp/delete',
        method: 'get',
        params: {
            id:id
        }
    })
}