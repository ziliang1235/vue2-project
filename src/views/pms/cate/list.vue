<template>
        <div class="productCate">
               <dataList></dataList>
               <el-table
                :data="tableData"
                border
                :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}"
                style="width: 100%">
                        <el-table-column
                        label="编号"
                        prop="id">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="分类名称"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        label="级别">
                                <template v-slot="params">
                                        {{params.row.level | levelFilter}}
                                </template>
                        </el-table-column>
                        <el-table-column
                        prop="productCount"
                        label="商品数量">
                        </el-table-column>
                        <el-table-column
                        prop="productUnit"
                        label="数量单位">
                        </el-table-column>
                        <el-table-column
                        label="导航栏">
                                 <template v-slot="params">
                                        <el-switch
                                                v-model="params.row.navStatus"
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
                        prop="sort"
                        label="排序">
                        </el-table-column>
                        <el-table-column
                        label="设置"
                        width="200">
                                <template v-slot>
                                        <el-button plain size="mini" :disabled="isActive">查看下级</el-button>
                                        <el-button plain size="mini">转移商品</el-button>
                                </template>
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        width="200">
                                <template>
                                        <el-button plain size="mini">编辑</el-button>
                                        <el-button type="danger" size="mini">删除</el-button>
                                </template>
                        </el-table-column>
                        
                </el-table>
        </div>
</template>
<script>
import dataList from '@/components/dataList.vue'
import {getCateList} from '@/api/cate'
export default {
      components:{dataList},
      data() {
        return {
                tableData:[],
                isActive:false
        }
      },
      mounted(){
                getCateList(0)
                .then(res=>{
                        // console.log('分类',res);
                        this.tableData = res.data.list
                })
      },
      filters:{
        levelFilter(v){
                return v == 0 ? '一级' : '二级'
        }
      }
}
</script>
<style lang="scss">
        .productCate{padding: 40px 20px 20px;}
</style>