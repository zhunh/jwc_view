import request from '../utils/request'

export function fetchList(query){
    return request({
        url: '/condition/query',
        method: 'get',
        params: query
    })
}