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