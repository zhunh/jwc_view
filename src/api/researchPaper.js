import request from '../utils/request'

export function fetchList(query){
    return request({
        url: '/rp/query',
        method: 'get',
        params: query
    })
}
// 添加
export function addRp(data){
    return request({
        url: '/rp/add',
        method: 'post',
        data: {
            ...data
        }
    })
}