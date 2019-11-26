import request from '../utils/request'

export function fetchList(query){
    return request({
        url: '/summary/query',
        method: 'get',
        params: query
    })
}