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