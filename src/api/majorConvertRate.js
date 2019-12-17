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