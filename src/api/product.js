import axios from '@/http/http.js'


//获取商品列表
export function getProductList(params){
        return axios({
                url: 'product/list',
                params
        })
}

//修改上下架状态
export function changePublish(row) {
        return axios({
                url: 'product/update/publishStatus',
                method:'POST',
                params:{
                        ids:row.id,
                        publishStatus:row.publishStatus
                }
        })
}

// 批量修改状态
export function changeStatus(ids,data) {
        return axios({
                url: 'product/update/'+data.status,
                method: 'POST',
                params: {
                        ids:ids ,
                        [data.status]: data.value
                }
                // post请求：query---params
                //           body----data
        })
}

//sku库存
export function getSkuList(id) {
        return axios({
                url: 'sku/'+id
        })
}

//更新sku库存信息
export function updateSku(id,data) {
        return axios({
                url: '/sku/update/'+id,
                method:'POST',
                data
        })
}

//创建商品
export function createProduct(data) {
        return axios({
                url: '/product/create',
                method: 'POST',
                data
        })
}


// 根据商品id获取商品编辑信息
export function getEditProductData(id) {
        return axios({
                url: '/product/updateInfo/'+id,
        })
}



export function updateProduct(id,data) {
        return axios({
                url: '/product/update/'+ id,
                method: 'POST',
                data
        })
}

