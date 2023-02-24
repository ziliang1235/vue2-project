<template>
        <div class="plist">
                <div class="search_box">
                        <div class="searchBtn">
                                <p>
                                        <i class="el-icon-search"></i>
                                        筛选搜索
                                </p>
                                <div>
                                        <el-button plain size="small">重置</el-button>
                                        <el-button type="primary"  size="small" @click="check">查询结果</el-button>
                                </div>
                        </div>
                        <el-form :model="form" label-width="100px" inline>
                                <el-form-item label="输入搜索：">
                                        <el-input v-model="form.keyword" size="small" style="width:205px" placeholder="商品名称"></el-input>
                                </el-form-item>
                                <el-form-item label="商品货号：">
                                        <el-input v-model="form.productSn"  size="small" style="width:205px" placeholder="商品货号"></el-input>
                                </el-form-item>
                                <el-form-item label="商品分类：">
                                       <el-cascader
                                                v-model="form.productCategoryId"
                                                :options="cateList"
                                                :props="{label:'name',value:'id'}">
                                        </el-cascader>
                                </el-form-item>
                                <el-form-item label="商品品牌：">
                                        <el-select v-model="form.brandId" placeholder="请选择品牌"  size="small">
                                                <el-option
                                                v-for="item in brandList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                                </el-option>
                                        </el-select>
                                </el-form-item>
                                <el-form-item label="上架状态：">
                                        <el-select v-model="form.publishStatus" placeholder="全部"  size="small">
                                                <el-option label="上架" :value="1"></el-option>
                                                <el-option label="下架" :value="0"></el-option>
                                        </el-select>
                                </el-form-item>
                                <el-form-item label="审核状态：">
                                        <el-select v-model="form.verifyStatus" placeholder="全部"  size="small">
                                                <el-option label="未审核" :value="0"></el-option>
                                                <el-option label="审核通过" :value="1"></el-option>
                                        </el-select>
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
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="商品图片"
                        width="120">
                                <template v-slot="params">
                                        <img :src="params.row.pic" width="80px">
                                </template>
                        </el-table-column>
                        <el-table-column
                        label="商品名称"
                        width="200">
                                <template v-slot="params">
                                        <p>{{params.row.name}}</p>
                                        <p>品牌：{{params.row.brandName}}</p>
                                </template>
                        </el-table-column>
                        <el-table-column
                        label="价格/货号">
                                <template v-slot="params">
                                        <p>价格：{{params.row.price}}</p>
                                        <p>货号：{{params.row.productSn}}</p>
                                </template>
                        </el-table-column>
                        <el-table-column
                        label="标签">
                                <template v-slot="params">
                                        <p style="margin-top:15px">上架：
                                                <el-switch
                                                        @change="changePublish(params.row)"
                                                        v-model="params.row.publishStatus"
                                                        active-color="#409eff"
                                                        inactive-color="#dcdfe6"
                                                        :active-value="1"
                                                        :inactive-value="0">
                                                </el-switch>
                                        </p>
                                        <p  style="margin-top:12px">新品：
                                                <el-switch
                                                        v-model="params.row.newStatus"
                                                        active-color="#409eff"
                                                        inactive-color="#dcdfe6"
                                                        :active-value="1"
                                                        :inactive-value="0">
                                                </el-switch>
                                        </p>
                                        <p style="margin-top:12px;margin-bottom:20px">推荐：
                                                <el-switch
                                                        v-model="params.row.recommandStatus"
                                                        active-color="#409eff"
                                                        inactive-color="#dcdfe6"
                                                        :active-value="1"
                                                        :inactive-value="0">
                                                </el-switch>
                                        </p>
                                </template>
                        </el-table-column>
                        <el-table-column
                        label="排序"
                        prop="sort">
                        </el-table-column>
                        <el-table-column
                        label="SKU库存">
                                <template v-slot="params">
                                        <el-button type="primary" icon="el-icon-edit" circle @click="showSkubox(params.row)"></el-button>
                                </template>
                        </el-table-column>
                        <el-table-column
                        label="销量"
                        prop="sale">
                        </el-table-column>
                        <el-table-column
                        label="审核状态">
                                <template v-slot="params">
                                        <div style="margin-bottom:15px">{{params.row.verifyStatus | verifyFilter}}</div>
                                        <el-button type="text">审核详情</el-button>
                                </template>
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        width="180">
                                <template v-slot="params">
                                        <div>
                                                <el-button plain size="mini" style="width:55px">查看</el-button>
                                                <el-button plain  size="mini"  style="width:55px" @click="productEdit(params.row.id)">编辑</el-button>
                                        </div>
                                        <div style="margin-top:10px">
                                                <el-button plain  size="mini" style="width:55px">日志</el-button>
                                                <el-button size="mini" style="width:55px"  type="danger">删除</el-button>
                                        </div>
                                </template>
                        </el-table-column>
                </el-table>
                <div class="page_box">
                        <div>
                              <el-select v-model="batchValue" placeholder="批量操作"  size="small">
                                        <el-option
                                        v-for="item in batchOptions"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="JSON.stringify(item)">
                                        </el-option>
                                </el-select>
                                <el-button type="primary" size="small" style="margin-left:20px" @click="changeStatus">确定</el-button>
                        </div>
                        <div>
                                <el-pagination
                                        background
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage"
                                        :page-sizes="[3, 5, 8, 15]"
                                        :page-size="form.pageSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="total">
                                </el-pagination>
                        </div>
                </div>
                <el-dialog title="编辑货品信息" :visible.sync="dialogTableVisible">
                        <div style="margin-bottom:20px">
                                <span style="margin-right:30px">商品货号：666666</span>
                                <el-input style="width:300px" size="small" placeholder="按sku编号搜索">
                                        <el-button slot="append" icon="el-icon-search"></el-button>
                                </el-input>
                        </div>
                        <el-table
                         :data="skuData" 
                         border
                        :cell-style="{'textAlign':'center'}"
                        :header-cell-style="{'textAlign':'center'}">
                        <el-table-column label="SKU编号" >
                                <template v-slot='params'>
                                        <el-input v-model='params.row.skuCode'></el-input>
                                </template>
                        </el-table-column>
                        <el-table-column :label="item.name" v-for="(item,index) in attrList" :key="item.id">
                                <template  v-slot='params'>
                                        <el-input  v-model='params.row.spData[index].value'></el-input>
                                </template>
                        </el-table-column>
                        <el-table-column label="销售价格">
                                <template  v-slot='params'>
                                        <el-input  v-model='params.row.price'></el-input>
                                </template>
                        </el-table-column>
                        <el-table-column  label="商品库存">
                                <template  v-slot='params'>
                                        <el-input  v-model='params.row.stock'></el-input>
                                </template>
                        </el-table-column>
                        <el-table-column label="库存预警值">
                                <template  v-slot='params'>
                                        <el-input  v-model='params.row.lowStock'></el-input>
                                </template>
                        </el-table-column>
                        </el-table>
                        <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogTableVisible = false">取 消</el-button>
                                <el-button type="primary" @click="updateSku">确 定</el-button>
                        </div>
                </el-dialog>
        </div>
</template>

<script>
import {getProductList,changePublish,changeStatus,getSkuList,updateSku} from '@/api/product'
import {getAttrList} from '@/api/type'
import myMixins from '@/mixins/productMixins'

export default {
        data() {
                return {
                        tableData:[],
                        form:{
                                keyword:'',
                                brandId:'',
                                productCategoryId:"",
                                productSn:"",
                                publishStatus:'',
                                verifyStatus:'',
                                pageNum:1,
                                pageSize:8
                        },
                        batchOptions:[
                                {label:'商品上架',value:1,status:'publishStatus'},
                                {label:'商品下架',value:0,status:'publishStatus'},
                                {label:'设为推荐',value:1,status:'recommendStatus'},
                                {label:'取消推荐',value:0,status:'recommendStatus'},
                                {label:'设为新品',value:1,status:'newStatus'},
                                {label:'取消新品',value:0,status:'newStatus'},
                        ],
                        batchValue:'',
                        ids:[],
                        dialogTableVisible:false,
                        skuData: [],
                        attrList:[],
                        currentPage:1,
                        total:10
                }
        },
        mounted(){
             this.getProductList()  
        },
        mixins:[myMixins],
        methods:{
                productEdit(id){
                        this.$router.push({path:'/pms/addProduct',query:{pid:id}})
                },
                // 更改每页显示条数
                handleSizeChange(val) {
                        console.log(`每页 ${val} 条`);
                        this.form.pageSize = val
                        this.getProductList()
                },
                //更改页码
                handleCurrentChange(val) {
                        console.log(`当前页: ${val}`);
                        this.form.pageNum = val
                        this.getProductList()
                },
                //搜索查询
                check(){
                        this.form.productCategoryId = this.form.productCategoryId && this.form.productCategoryId[1]
                        this.getProductList()  
                },
                // 显示SKU库存对话框
                showSkubox(row){
                        // console.log(row.productAttributeCategoryId);
                        this.dialogTableVisible = true
                        getSkuList(row.id)
                        .then(res=>{
                                res.data.forEach(item=>{
                                        item.spData = JSON.parse(item.spData)
                                })
                                this.skuData = res.data
                                console.log(this.skuData);
                        })
                        getAttrList(row.productAttributeCategoryId)
                        .then(res=>{
                                // console.log(res,'shuxing')
                                this.attrList = res.data.list
                        })
                },
                // 更新sku库存
                updateSku(){
                        this.dialogTableVisible = false
                },

                // 批量修改上下架，新品，推荐状态
                changeStatus(){
                        if(this.batchValue){
                                if(this.ids.length == 0){
                                      this.$message({
                                                message: '请至少选择一个商品',
                                                type: 'warning'
                                        });  
                                }else{
                                        this.$confirm('是否要进行该批量操作', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                        }).then(() => {
                                                this.batchValue = JSON.parse(this.batchValue)
                                                this.ids = this.ids.join(',')
                                                changeStatus(this.ids,this.batchValue)    
                                                .then(res=>{
                                                        console.log('批量操作',res);
                                                        if(res.code == 200){
                                                               this.$message({
                                                                        message: '修改成功',
                                                                        type: 'success',
                                                                        duration:'1000',  //显示时间
                                                                        onClose:()=>{     //关闭时的回调函数
                                                                                this.getProductList()
                                                                        }
                                                                }); 

                                                        }
                                                })
                                        }).catch(() => {
  
                                        });
                                }
                        }else{
                                this.$message({
                                message: '请选择操作类型',
                                type: 'warning'
                                });
                        }
                },
                //当选择项发生变化时会触发该事件
                 handleSelectionChange(val) {
                        console.log(val);
                        let id = []
                        val.forEach(item=>{
                                id.push(item.id)
                        })
                        this.ids = id
                },
                //修改上下架
                changePublish(row){
                        // console.log('row',row);
                        changePublish(row)
                        .then(res=>{
                                // console.log('上下架',res);
                                if(res.code == 200){
                                        this.$message({
                                                message: '修改成功',
                                                type: 'success'
                                        });
                                }else{
                                       this.$message.error('修改失败');
                                }
                        })
                },
                // 获取商品列表数据
                getProductList(){
                        getProductList(this.form)
                        .then(res=>{
                                console.log(res.data,'liebiao');
                                this.tableData = res.data.list
                                this.total = res.data.total
                        })
                },

               
        },
        filters:{
                verifyFilter(val){
                        return val == 0 ? '未审核' : '审核通过'
                }
        }

};
</script>

<style lang="scss" scoped>
        .plist{
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