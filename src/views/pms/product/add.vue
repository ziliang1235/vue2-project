<template>
        <div class="addPage">
                <div class="productAdd">
                        <el-steps :active="isActive" align-center style="margin-bottom:40px">
                                <el-step title="填写商品信息"></el-step>
                                <el-step title="填写商品促销"></el-step>
                                <el-step title="填写商品属性"></el-step>
                                <el-step title="选择商品关联"></el-step>
                        </el-steps>
                        <component :is="myCom" :next="next"></component>
                </div>
        </div>
</template>
<script>
        import pinfo from './add/pinfo.vue'
        import psale from './add/psale.vue'
        import pattr from './add/pattr.vue'
        import passo from './add/passo.vue'
        import {getEditProductData} from '@/api/product'
export default {
        data() {
                return {
                        isActive:0,
                        myCom:'pinfo'
                }
        },
        methods:{
                next(num){
                        console.log(111);
                        this.isActive += num
                        if(this.isActive == 0){
                                this.myCom = 'pinfo'
                        }else if(this.isActive == 1){
                                 this.myCom = 'psale'
                        }else if(this.isActive == 2){
                                 this.myCom = 'pattr'
                        }else{
                                this.myCom = 'passo'
                        }
                }
        },
        components:{
             pinfo,  psale ,pattr,passo
        },
        mounted(){
                console.log(this.$route.query);
                if(this.$route.query.pid){
                        getEditProductData(this.$route.query.pid)
                        .then(res=>{
                                console.log(res,'编辑信息');
                                if(res.code == 200){
                                        this.$store.commit('editProduct',res.data)
                                }
                        })
                }else{
                        this.$store.commit('reset')
                }
        }
}
</script>
<style lang="scss" scoped>
        .addPage{
                width:800px;border: 1px solid #ebeef5;border-radius: 5px; margin:20px auto;padding: 35px 35px 15px;position: absolute;left:0;right:0;
                .productAdd{padding:0 20px}
        }

</style>