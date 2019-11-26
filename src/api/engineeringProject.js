import request from '../utils/request'

export function fetchList(query){
    return request({
        url: '/ep/query',
        method: 'get',
        params: query
    })
}