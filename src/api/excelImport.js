import request from '../utils/request'

export function importList(tableData){
    return request({
        url: '/import/researchpaper',
        method: 'post',
        data: {
            data:tableData
        }
    })
}