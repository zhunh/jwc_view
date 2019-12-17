import request from '../utils/request'

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