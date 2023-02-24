<template >
        <div>
                <el-form :model="product.productParams" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
                        <el-form-item label="商品分类：" prop="productCategoryId">
                        <el-cascader
                                v-model="product.productParams.productCategoryId"
                                :options="cateList"
                                :props="{label:'name',value:'id'}">
                        </el-cascader>
                        </el-form-item>
                        <el-form-item label="商品名称：" prop="name">
                        <el-input v-model="product.productParams.name"></el-input>
                        </el-form-item>
                        <el-form-item label="副标题：" prop="subTitle">
                        <el-input v-model="product.productParams.subTitle"></el-input>
                        </el-form-item>
                        <el-form-item label="商品品牌：" prop="brandId">
                                <el-select v-model="product.productParams.brandId" placeholder="请选择品牌">
                                        <el-option
                                        v-for="item in brandList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                </el-select>
                        </el-form-item>
                        <el-form-item  label="商品介绍：">
                                 <el-input type="textarea" v-model="product.productParams.description"></el-input>
                        </el-form-item>
                        <el-form-item label="商品货号：">
                                <el-input v-model="product.productParams.productSn"></el-input>
                        </el-form-item>
                        <el-form-item label="商品售价：">
                                <el-input v-model="product.productParams.price"></el-input>
                        </el-form-item>
                        <el-form-item label="市场价：">
                                <el-input v-model="product.productParams.originalPrice"></el-input>
                        </el-form-item>
                        <el-form-item label="商品库存：">
                                <el-input v-model="product.productParams.stock"></el-input>
                        </el-form-item>
                        <el-form-item label="计量单位：">
                                <el-input v-model="product.productParams.unit"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量：">
                                <el-input v-model="product.productParams.weight"></el-input>
                        </el-form-item>
                        <el-form-item label="排序：">
                                <el-input v-model="product.productParams.sort"></el-input>
                        </el-form-item>
                        <el-form-item style="text-align: center;" size="medium">
                                <el-button type="primary" @click="submitForm('ruleForm')">下一步,填写商品促销</el-button>
                        </el-form-item>
                </el-form>
        </div>
</template>
<script>
import myMixins from '@/mixins/productMixins'
import { mapState } from 'vuex';
export default {
     props:['next'] ,
     data() {
        return {
               ruleForm: {
                        name: '',
                        cateID: '',
                        subtitle: '',
                        brand: '',
                }, 
                rules: {
                        productCategoryId: [
                        { required: true, message: '请选择商品分类', trigger: 'change' },
                        ],
                        name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' }
                        ],
                        subTitle: [
                        { required: true, message: '请输入商品副标题', trigger: 'blur' }
                        ],
                        brandId: [
                        { required: true, message: '请选择商品品牌', trigger: 'change' }
                        ],
                        } 
        }
     },
     mixins:[myMixins],
     computed:{
        ...mapState(['product'])
     }, 
     methods:{
         submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
                this.product.productParams.productCategoryId = this.product.productParams.productCategoryId[1]
                this.next(1)
          } else {
                //没有写好内容
            console.log('error submit!!');
            return false;
          }
        });
      },
     }
}
</script>
<style lang="">
        
</style>