import request from '../utils/request'
// 关键指标汇总列表
export function fetchList(query){
    return request({
        url: '/summary/query',
        method: 'get',
        params: query
    })
}
// 计分统计列表
export function scoreList(query){
    return request({
        url: '/summary/score',
        method: 'get',
        params: query
    })
}