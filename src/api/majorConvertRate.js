import request from '../utils/request'

export function fetchList(query){
    return request({
        url: '/mcr/query',
        method: 'get',
        params: query
    })
}