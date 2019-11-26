import request from '../utils/request'

export function fetchList(query){
    return request({
        url: '/ta/query',
        method: 'get',
        params: query
    })
}