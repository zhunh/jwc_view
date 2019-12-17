import request from '../utils/request'

export function fetchList(query){
    return request({
        url: '/tpp/query',
        method: 'get',
        params: query
    })
}
// 添加
export function addTpp(data){
    return request({
        url: '/tpp/add',
        method: 'post',
        data: {
            ...data
        }
    })
}