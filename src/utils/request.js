import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

const service = axios.create({
    baseURL:process.env.VUE_APP_APIURL,
    // timeout:5000
})
// 请求拦截
service.interceptors.request.use(
    config => {
        if(sessionStorage.getItem('jwctoken')){
            config.headers['AccessToken'] = sessionStorage.getItem('jwctoken')
        }
        return config
    },
    error => {
        console.log(error+"-jwc")
        return Promise.reject(error)
    }
)
// 响应拦截
service.interceptors.response.use(
    response => {
        const res = response.data
        console.log(res);
        if(res.code!== 90000){
            // 如果Token验证不通过
            if(res.code === 403||res.code===401){
                console.log(400);
                
                MessageBox.confirm('您已经退出，需重新登录','重新登录',{
                    confirmButtonText:'重新登录',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                    // this.$router.push('/login')
                    window.location.href = '/#/login'
                    //location.reload('/login')
                }).catch(action => {
                    Message({
                        message:action+":尚未登录",
                        type:"info"
                    })
                })
            }
            // else if(res.code=== 90001){
            //     Message({
            //         message:res.msg+"-jwc" || 'Error',
            //         type: 'error',
            //         duration: 5*1000
            //     });
            // }else{
            //     Message({
            //         message:res.msg+"-jwc" || 'Error',
            //         type: 'error',
            //         duration: 5*1000
            //     });
            // }
            return Promise.reject(new Error(res.message || res.msg ||'Error-jwc'))
        }else{
            return res // 返回数据
        }
    },
    error =>{
        console.log('err' + error) // for debug
        Message({
          message: error.message+"-jwc",
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service