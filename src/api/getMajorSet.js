import request from '../utils/request'

export function getMajorList(){
    return request({
        url: '/table/majorSet',
        method: 'get'
    })
}