import axios from 'axios'


let server = axios.create({
        baseURL:'http://8.129.190.90:19527/',   //基础路径
        method:'GET'
})

//请求拦截器
server.interceptors.request.use(function(config){
        console.log('每次发送请求前都会执行',config);
        let token = sessionStorage.getItem('vapp-token')
        config.headers.Authorization = token
        return config
})


//响应拦截器
server.interceptors.response.use(function(data){
        console.log('每次响应完毕会先执行',data);
        return data.data
})





export default server

