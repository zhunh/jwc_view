import request from '../utils/request'

//用户列表
export function fetchList(){
    return request({
        url: '/users/query',
        method: 'get'
    })
}
//按照ID查询单个用户
export function getOne(id){
    return request({
        url: '/users/queryById',
        method: 'get',
        params:{
            id:id
        }
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
//登录
export function login(tmp){
    return request({
        url: '/users/login',
        method: 'post',
        data:{
            ...tmp
        }
    })
}