<template>
        <div class="productType">
               <dataList></dataList>
               <el-table
                :data="tableData"
                border
                :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}"
                style="width: 100%">
                        <el-table-column
                        label="编号"
                        width="100"
                        prop="id">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="类型名称"
                        width="475">
                        </el-table-column>
                        <el-table-column
                        label="属性数量"
                        prop="attributeCount">
                        </el-table-column>
                        <el-table-column
                        prop="paramCount"
                        label="参数数量">
                        </el-table-column>
                        <el-table-column
                        label="设置"
                        width="200">
                                <template v-slot>
                                        <el-button plain size="mini">属性列表</el-button>
                                        <el-button plain size="mini">参数列表</el-button>
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
import {getTypeList} from '@/api/type'
export default {
      components:{dataList},
      data() {
        return {
                tableData:[],
        }
      },
      mounted(){
                getTypeList()
                .then(res=>{
                        console.log('类型',res);
                        this.tableData = res.data.list
                })
      }
}
</script>
<style lang="scss" scoped>
        .productType{padding: 40px 20px 20px;}
</style>