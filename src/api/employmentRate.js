import request from '../utils/request'

export function fetchList(query){
    return request({
        url: '/er/query',
        method: 'get',
        params: query
    })
}