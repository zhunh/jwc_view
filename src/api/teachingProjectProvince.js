import request from '../utils/request'

export function fetchList(query){
    return request({
        url: '/tpp/query',
        method: 'get',
        params: query
    })
}