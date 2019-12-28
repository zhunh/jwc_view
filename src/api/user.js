import request from '../utils/request'

export function fetchList(){
    return request({
        url: '/users/query',
        method: 'get'
    })
}
// 添加
export function addUser(data){
    return request({
        url: '/users/add',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 更新
export function updateUser(data){
    return request({
        url: '/users/update',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 删除
export function deleteUser(id){
    return request({
        url: '/users/delete',
        method: 'get',
        params: {
            id:id
        }
    })
}