import { getCateWithChildren } from '@/api/cate'
import { getBrandList } from '@/api/brand'

export default {
       data() {
        return {
                cateList:[]  ,
                brandList:[] 
        }
       },
       mounted() {
               getCateWithChildren()
                       .then(res => {
                               // console.log('分类', res);
                               this.cateList = res.data
                       })
               getBrandList()
                       .then(res => {
                               // console.log('pinpai',res);
                               this.brandList = res.data
                       })
       },
}


