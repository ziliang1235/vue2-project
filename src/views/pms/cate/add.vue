<template>
        <div class="addCate">
               <el-form ref="form" :model="form" label-width="140px">
                        <el-form-item label="分类名称：">
                                <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="上级分类：">
                                <el-select v-model="form.parentId" placeholder="请选择">
                                        <el-option
                                        v-for="item in cateList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                </el-select>
                        </el-form-item>
                        <el-form-item label="数量单位：">
                                <el-input v-model="form.productUnit"></el-input>
                        </el-form-item>
                        <el-form-item label="排序：">
                                <el-input v-model="form.sort"></el-input>
                        </el-form-item>
                        <el-form-item label="是否显示：">
                                <el-radio-group v-model="form.showStatus">
                                        <el-radio :label="1">是</el-radio>
                                        <el-radio :label="0">否</el-radio>
                                </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否显示在导航栏：">
                                <el-radio-group v-model="form.navStatus">
                                        <el-radio :label="1">是</el-radio>
                                        <el-radio :label="0">否</el-radio>
                                </el-radio-group>
                        </el-form-item>
                        <el-form-item label="分类图标：">
                                <el-upload
                                class="upload-demo"
                                action="http://8.129.190.90:10082/fileUpload"
                                :on-success="onSuccess"
                                >
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                </el-upload>
                        </el-form-item>
                        <el-form-item label="筛选属性：">
                                <div v-for="(item,index) in attrValue" :key="index" style="margin-bottom:10px">
                                        <el-cascader
                                        v-model="attrValue[index]"
                                        :options="attrCateList"
                                        :props="{label:'name',value:'id',children:'productAttributeList'}">
                                        </el-cascader>
                                        <el-button @click="deleteAttr(index)" style="margin-left:30px">删除</el-button>
                                </div>
                                <el-button type="primary" @click="addAttr" size="small">新增</el-button>
                                
                        </el-form-item>
                        <el-form-item label="关键词：">
                                <el-input v-model="form.keywords"></el-input>
                        </el-form-item>
                        <el-form-item label="分类描述：">
                                <el-input type="textarea" v-model="form.description"></el-input>
                        </el-form-item>
                        <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button>重置</el-button>
                        </el-form-item>
                </el-form> 
        </div>
</template>
<script>
import {getCateList,createCategory,getCategoryinfo,updateCategory} from '@/api/cate'
import {getproductwithAttr} from '@/api/type'
export default {
        data() {
                return {
                         cateList: [],
                         attrCateList:[],
                        form:{
                                "description": "",
                                "icon": "",
                                "keywords": "",
                                "name": "",
                                "navStatus": 0,
                                "parentId": 0,
                                "productAttributeIdList": [
                                0
                                ],
                                "productUnit": "",
                                "showStatus": 0,
                                "sort": 0
                        },
                        attrValue:[[]],
                }
        },  
        methods:{
                deleteAttr(index){
                        if(this.attrValue.length == 1) return
                        this.attrValue.splice(index,1)
                },      
                addAttr(){
                     if(this.attrValue.length > 2 ){
                        this.$message.error('不能超过3个')
                     }else{
                        this.attrValue.push([])
                     }
                },
                onSuccess(res){
                        console.log(res);
                },
                onSubmit(){
                        let aa = []
                        this.attrValue.forEach(item=>{
                                aa.push(item[1])
                        })
                        this.form.productAttributeIdList = aa

                        if(this.$route.query.id){
                                updateCategory(this.$route.query.id,this.form)
                                .then(res=>{
                                        console.log(res,'更新');
                                })
                        }else{
                                createCategory(this.form)
                                .then(res=>{
                                        console.log(res,'cj');
                                })
                        }
                        
                }
        } ,
        mounted(){
                getCateList(0)
                .then(res=>{
                        console.log(res,'分类');
                        let arr = res.data.list
                        arr.unshift({name:"无上级分类",id:0})
                        this.cateList = arr
                })
                getproductwithAttr()
                .then(res=>{
                        console.log(res,'属性及子属性');
                        this.attrCateList = res.data
                })
                if(this.$route.query.id){
                        getCategoryinfo(this.$route.query.id)
                        .then(res=>{
                                console.log(res,'分类信息')
                                this.form = res.data
                        })
                }
        }          
}
</script>
<style lang="scss">
        .addCate{
                width:800px;border: 1px solid #ebeef5;border-radius: 5px; margin:20px auto;padding: 35px 35px 15px;position: absolute;left:0;right:0;
        }
</style>