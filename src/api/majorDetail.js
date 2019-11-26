import request from '../utils/request'
/**
 * 
 * @param {参数对象} query 
 */
export function fetchList(query){
    return request({
        url: '/table/query',
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
        url: '/table/delete',
        method: 'post',
        data:{
            ids: obj
        }
    })
}