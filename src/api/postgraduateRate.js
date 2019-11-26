import request from '../utils/request'

export function fetchList(query){
    return request({
        url: '/pr/query',
        method: 'get',
        params: query
    })
}