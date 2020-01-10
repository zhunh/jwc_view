import request from '../utils/request'
/**
 * 
 * @param {参数对象} query 
 */
export function fetchList(query){
    return request({
        url: '/md/query',
        method: 'get',
        params: query
    })
}
/**
 * 
 * @param {选中要删除条目的ID数组} obj 
 */
export function deleteMany(obj){
    return request({
        url: '/md/delete',
        method: 'post',
        data:{
            ids: obj
        }
    })
}
// get major group by academy
export function getMgba(query){
    return request({
        url: '/md/mba',
        method: 'get',
        params: query
    })
}
// get major by academy
export function getMba(query){
    return request({
        url: '/md/mjs',
        method: 'get',
        params: query
    })
}