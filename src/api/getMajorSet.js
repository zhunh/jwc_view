import request from '../utils/request'

export function getMajorList(){
    return request({
        url: '/md/majorSet',
        method: 'get'
    })
}