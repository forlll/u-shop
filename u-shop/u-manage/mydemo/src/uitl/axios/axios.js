import axios from "axios"
import router from "@/router"

let http = axios.create({
    baseURL:'/api'
})

// axios请求拦截
http.interceptors.request.use(req=>{
    //从存储中取出来token
    let token = sessionStorage.getItem('loginInfo') ? JSON.parse(sessionStorage.getItem('loginInfo')).token :''
    // 需求：在请求头中添加token令牌
    req.headers.authorization =token
    //设置请求拦截之后，要返回值这个配置
    return req
})

// 响应拦截 一般用于全局拦截错误

http.interceptors.response.use(res=>{
    if(res.data.code===500){
        alert(res.data.msg)
        router.push('/login')
    }else if(res.data.code===403){
        alert(res.data.msg)
        router.push('/login')
    }else{
        return res
    }
})

export default http