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