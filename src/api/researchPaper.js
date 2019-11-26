import request from '../utils/request'

export function fetchList(query){
    return request({
        url: '/rp/query',
        method: 'get',
        params: query
    })
}