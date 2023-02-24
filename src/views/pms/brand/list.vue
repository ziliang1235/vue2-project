<template>
        <div class="blist">
                <div class="search_box">
                        <div class="searchBtn">
                                <p>
                                        <i class="el-icon-search"></i>
                                        筛选搜索
                                </p>
                                <div>
                                        <el-button type="primary"  size="small">查询结果</el-button>
                                </div>
                        </div>
                        <el-form :model="form" label-width="100px">
                                <el-form-item label="输入搜索：">
                                        <el-input v-model="form.msg" size="small" style="width:205px" placeholder="品牌名称/关键字"></el-input>
                                </el-form-item>
                        </el-form>
                </div>
                <div class="add_box">
                        <div>
                                <i class="el-icon-tickets"></i>
                                数据列表
                        </div>
                        <el-button size="mini">添加</el-button>
                </div>
                <el-table
                :data="tableData"
                style="width: 100%"
                border
                :cell-style="{'textAlign':'center'}"
                :header-cell-style="{'textAlign':'center'}"
                 @selection-change="handleSelectionChange"
                >
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        label="编号"
                        prop="id"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="品牌名称"
                        width="360">
                        </el-table-column>
                        <el-table-column
                        label="品牌首字母"
                        prop="firstLetter">
                        </el-table-column>
                        <el-table-column
                        label="排序"
                        prop="sort">
                        </el-table-column>
                        <el-table-column
                        label="品牌制造商">
                                <template v-slot="params">
                                        <el-switch
                                                v-model="params.row.factoryStatus"
                                                active-color="#409eff"
                                                inactive-color="#dcdfe6"
                                                :active-value="1"
                                                :inactive-value="0">
                                        </el-switch>
                                </template>
                        </el-table-column>
                        <el-table-column
                        label="是否显示">
                                <template v-slot="params">
                                        <el-switch
                                                v-model="params.row.showStatus"
                                                active-color="#409eff"
                                                inactive-color="#dcdfe6"
                                                :active-value="1"
                                                :inactive-value="0">
                                        </el-switch>
                                </template>
                        </el-table-column>
                        <el-table-column
                        label="相关"
                        width="200">
                                <template v-slot="params">
                                        <span style="margin-right:8px">商品：<el-button type="text">{{params.row.productCount}}</el-button></span>
                                        <span>评价：<el-button type="text">{{params.row.productCommentCount}}</el-button></span>
                                </template>
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        width="180">
                                <template v-slot>
                                        <el-button plain  size="mini" style="width:55px">日志</el-button>
                                        <el-button size="mini" style="width:55px"  type="danger">删除</el-button>
                                </template>
                        </el-table-column>
                </el-table>
                <div class="page_box">
                        <div>
                              <el-select v-model="batchValue" placeholder="批量操作"  size="small">
                                        <el-option label="显示品牌" :value="1"></el-option>
                                        <el-option label="隐藏品牌" :value="0"></el-option>
                                </el-select>
                                <el-button type="primary" size="small" style="margin-left:20px" @click="changeStatus">确定</el-button>
                        </div>
                </div>




        </div>
</template>

<script>
import {getBrandList} from '@/api/brand'
export default {
        data() {
                return {
                        tableData:[],
                        form:{
                                msg:'',
                        },
                        options: [{
                                value: '选项1',
                                label: '黄金糕'
                                }, {
                                value: '选项2',
                                label: '双皮奶'
                                }
                        ],
                        batchValue:'',

                }
        },
        mounted(){
             this.getBrandList()  
        },
        methods:{
                // 获取品牌列表数据
                getBrandList(){
                        getBrandList()
                        .then(res=>{
                                console.log(res.data);
                                this.tableData = res.data
                        })
                },
                handleSelectionChange(val){

                },
                changeStatus(){

                }

               
        }

};
</script>

<style lang="scss">
        .blist{
                padding: 20px;
                .search_box{
                        padding: 20px;border-radius: 5px;border: 1px solid #ebeef5;margin-bottom:20px;
                        .searchBtn{display: flex;justify-content: space-between;}
                }
                .add_box{
                       padding: 15px 20px;border-radius: 5px;border: 1px solid #ebeef5;margin-bottom:20px;display: flex;justify-content: space-between; 
                }
                .page_box{padding:20px 0;display: flex;justify-content: space-between;}
        }
</style>