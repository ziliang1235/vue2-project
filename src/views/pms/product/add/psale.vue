<template >
        <div>
                <el-form :model="product.productParams"  label-width="120px" class="demo-ruleForm" size="small">
                        <el-form-item label="赠送积分：">
                                <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="赠送成长值：">
                                <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="积分购买限制：">
                                <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="预告商品：">
                                <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="商品上架：">
                                <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="商品推荐：">
                                <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="服务保证：">
                                 <el-checkbox-group v-model="checkList">
                                        <el-checkbox label="1">无忧退货</el-checkbox>
                                        <el-checkbox label="2">快速退款</el-checkbox>
                                        <el-checkbox label="3">免费包邮</el-checkbox>
                                </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="详细页标题：">
                                <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="详细页描述：">
                                <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="商品关键字：">
                                <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="商品备注：">
                                <el-input type="textarea"></el-input>
                        </el-form-item>
                        <el-form-item  style="text-align: center;" size="medium">
                                <el-button  @click="next(-1)">上一步，填写商品信息</el-button>
                                <el-button type="primary" @click="go">下一步，填写商品属性</el-button>
                        </el-form-item>
                </el-form>
                
        </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
        props:['next'],
        computed:{
               ...mapState(['product'])
        },
        data() {
                return {
                        checkList:[1,2]
                }
        },
        methods:{
                go(){
                     this.product.productParams.serviceIds = this.checkList.join(',')
                     this.next(1)
                }
        },
        mounted(){
                if(this.$route.query.pid){
                        console.log(111);
                        this.checkList = this.product.productParams.serviceIds.split(',')
                        console.log(this.checkList);
                }
        }

}
</script>
<style lang="">
        
</style>