import axios from '@/http/http.js'


//获取分类列表
export function getCateList(id) {
        return axios({
                url: 'productCategory/list/'+id
        })
}


//查询所有一级分类及子分类
export function getCateWithChildren() {
        return axios({
                url: 'productCategory/list/withChildren'
        })
}