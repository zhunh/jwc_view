module.exports = ()=>{
    let user = sessionStorage.getItem('userInfo')  
    if(user==null){
        return 'Offline'
    }
    return JSON.parse(user)
}