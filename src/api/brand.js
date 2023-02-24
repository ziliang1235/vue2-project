import axios from '@/http/http.js'


//获取品牌列表
export function getBrandList() {
        return axios({
                url:'/brand/listAll'
        })
}