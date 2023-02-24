import axios from '@/http/http.js'


//获取属性类型列表
export function getTypeList(params) {
        return axios({
                url: 'productAttribute/category/list',
                params
        })
}

//查询属性列表
export function getAttrList(cid) {
        return axios({
                url: '/productAttribute/list/'+cid,
                params:{
                        type:0,
                        pageSize:100
                }
        })
}
//查询参数列表
export function getparamsList(cid) {
        return axios({
                url: '/productAttribute/list/' + cid,
                params: {
                        type: 1,
                        pageSize: 100
                }
        })
}