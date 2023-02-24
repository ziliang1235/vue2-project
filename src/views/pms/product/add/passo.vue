<template >
        <div>
                第四页
                <el-button @click="next(-1)">上一步，填写商品属性</el-button>
                <el-button type="primary" @click="createProduct">完成，提交商品</el-button>



        </div>
</template>
<script>
import {createProduct,updateProduct} from '@/api/product'
export default {
        props:['next'] ,
        data() {
                return {
                        data:{
                                
                        }
                }
        },
        methods:{
                createProduct(){
                        if(this.$route.query.pid){
                                // 编辑
                        updateProduct(this.$route.query.pid,this.$store.state.product.productParams)
                                .then(res=>{
                                        console.log(res,'更新');
                                        if(res.code==200){
                                                this.$router.push('/pms/product')
                                        }
                                })



                        }else{
                                // 添加
                                createProduct(this.$store.state.product.productParams)
                                .then(res=>{
                                        console.log('创建',res);
                                        if(res.code==200){
                                                this.$router.push('/pms/product')
                                        }
                                })
                        }
                }
                
        }
}
</script>
<style lang="">
        
</style>