<template >
        <div>
                <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="属性类型：">
                                <el-select v-model="attrCate" placeholder="请选择" @change="changeAttrCate">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                </el-select>
                        </el-form-item>
                        <el-form-item label="商品规格：">
                                <div class="attr_box">
                                        <div v-for="item in attrList" :key="item.id">
                                                <p>{{item.name}}</p>
                                                <template v-if="item.handAddStatus == 1">
                                                        <el-checkbox-group v-model="form[item.name]">
                                                                <span v-for="item3 in form[item.name+'list']" :key="item3">
                                                                        <el-checkbox  :label="item3"></el-checkbox>
                                                                        <el-button type="text" style="margin: 0 10px">删除</el-button>
                                                                </span>
                                                        </el-checkbox-group>
                                                        <el-input v-model="form[item.name+'val']" style="width:160px" size="small"></el-input>
                                                        <el-button  size="small" @click="add(item.name)">增加</el-button>
                                                </template>
                                                <template v-else>
                                                        <el-checkbox-group v-model="form[item.name]">
                                                                <el-checkbox v-for="item2 in item.inputList.split(',')" :key="item2" :label="item2"></el-checkbox>
                                                        </el-checkbox-group>
                                                </template>
                                        </div>
                                        
                                </div>
                                <el-table
                                style="margin:20px 0"
                                :data="skuData" 
                                border
                                :cell-style="{'textAlign':'center'}"
                                :header-cell-style="{'textAlign':'center'}">
                                <el-table-column :label="item.name" v-for="item in attrList" :key="item.id" :prop="item.name">
                                </el-table-column>
                                <el-table-column label="SKU编号" >
                                        <template v-slot='params'>
                                                <el-input v-model='params.row.skuCode'></el-input>
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
                                <el-table-column label="操作">
                                        <template>
                                                <el-button type="text">删除</el-button>
                                        </template>
                                </el-table-column>
                                </el-table>
                                <div>
                                        <el-button type="primary" @click="represh">刷新列表</el-button>
                                </div>
                        </el-form-item>
                        <el-form-item label="商品参数：">
                                <div class="attr_box">
                                        <div v-for="item in paramsList" :key="item.id">
                                                <span style="display:inline-block;width:100px;text-align:right">{{item.name}}：</span>
                                                <template v-if="item.inputType == 0">
                                                        <el-input style="width:248px" size="small"></el-input>
                                                </template>
                                                <template v-else>
                                                        <el-select v-model="form[item.name]" placeholder="请选择" @change="changeAttrCate" size="small" style="width:248px;margin-bottom: 5px;">
                                                                <el-option
                                                                v-for="item2 in item.inputList.split(',')"
                                                                :key="item2"
                                                                :label="item2"
                                                                :value="item2">
                                                                </el-option>
                                                        </el-select>
                                                </template>
                                        </div>
                                </div>
                        </el-form-item>
                        <el-form-item label="商品相册：">
                                <el-upload
                                        list-type="picture-card"
                                        class="upload-demo"
                                        action="http://8.129.190.90:10082/fileUpload"
                                        name="file"
                                        multiple
                                        :limit="3"
                                        :on-exceed="handleExceed"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                        :on-success="handleSuccess"
                                        :file-list="fileList"
                                        >
                                        <i class="el-icon-plus"></i>
                                </el-upload>
                        </el-form-item>
                        <el-form-item label="规格参数：">
                                <div style="border:1px solid">
                                         <Toolbar
                                        style="border-bottom: 1px solid #ccc"
                                        :editor="editor"
                                        :defaultConfig="toolbarConfig"
                                        :mode="mode"
                                        />
                                        <Editor
                                        style="height: 500px; overflow-y: hidden;"
                                        v-model="product.productParams.detailMobileHtml"
                                        :defaultConfig="editorConfig"
                                        :mode="mode"
                                        @onCreated="onCreated"
                                        />
                                        <Toolbar
                                        style="border-bottom: 1px solid #ccc"
                                        :editor="editor1"
                                        :defaultConfig="toolbarConfig"
                                        :mode="mode"
                                        />
                                        <Editor
                                        style="height: 500px; overflow-y: hidden;"
                                        v-model="product.productParams.detailHtml"
                                        :defaultConfig="editorConfig"
                                        :mode="mode"
                                        @onCreated="onCreated1"
                                        @onChange="onChange"
                                        />
                                </div>
                        </el-form-item>
                        <el-form-item style="text-align: center;" size="medium">
                                <el-button @click="next(1)">上一步,填写商品促销</el-button>
                                <el-button type="primary" @click="gotoPasso">下一步,填写商品关联</el-button>
                        </el-form-item>
                </el-form>
        </div>
</template>
<script>
        import {getTypeList,getparamsList,getAttrList} from '@/api/type'
        import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
        import { DomEditor } from '@wangeditor/editor'
        import { mapState } from 'vuex'
export default {
        props:['next'],
       data() {
        return {
                form:{
                        name:'',     
                },
                attrCate:'',
                options:[],
                paramsList:[],
                attrList:[],
                skuData:[],
                fileList:[],

                editor: null,
                editor1:null,
                html: '<p>hello</p>',
                html1: '<p>你好</p>',
                toolbarConfig: {},//工具栏的配置
                editorConfig: { placeholder: '请输入内容...' }, //编辑器的配置
                mode: 'default', // or 'simple'
        }       
       }, 
       components:{
                Editor,Toolbar
       },
       computed:{
                ...mapState(['product'])
       },
       mounted(){
                getTypeList({pageSize:100})
                .then(res=>{
                        console.log('属性分类',res);
                        this.options = res.data.list
                })
                if(this.$route.query.pid){
                        this.fileList.push({url:this.product.productParams.pic})
                        if(this.product.productParams.albumPics){
                                let imgs = this.product.productParams.albumPics
                                imgs = imgs.split(',')
                                imgs.forEach(item=>{
                                        this.fileList .push({url:item})
                                })   
                        }
                          
                }

       },
       methods:{
                gotoPasso(){
                        this.product.productParams.skuStockList = this.skuData
                        this.product.productParams.productAttributeCategoryId = this.attrCate
                        this.next(1)
                },
                represh(){
                        let list = []
                        let option = []
                        this.attrList.forEach(item=>{
                                this.form[item.name].forEach(item2=>{
                                        if(list.length == 0){
                                                let li = {[item.name]:item2}
                                                option.push(li)
                                        }else{
                                                list.forEach(item3=>{
                                                        let item4 = JSON.parse(JSON.stringify(item3))
                                                        item4[item.name] = item2
                                                        option.push(item4)
                                                })
                                        }
                                })
                                list = option
                                console.log(list);
                                option = []
                        })
                        list.forEach(item=>{
                                let arr = []
                                this.attrList.forEach(item2=>{
                                        arr.push({key:item2.name,value:item[item2.name]})
                                })
                                console.log(arr,'arr');
                                arr = JSON.stringify(arr)
                                Object.assign(item,{price:"",stock:"",skuCode:"",lowStock:"",spData:arr})
                        })
                        this.skuData = list
                },
                onCreated(editor) {
                        this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
                },
                onCreated1(editor) {
                        this.editor1 = Object.seal(editor) 
                },
                onChange(editor){
                //         // 查看工具栏默认配置
                //         const toolbar = DomEditor.getToolbar(editor)
                //         const curToolbarConfig = toolbar.getConfig()
                //         console.log( curToolbarConfig.toolbarKeys ,'1111')
                },

                // 文件列表移除文件
                handleRemove(file, fileList) {
                        console.log(file, fileList);
                },
                // 点击文件列表中已上传的文件
                handlePreview(file) {
                        console.log(file);
                },
                handleExceed(files, fileList) {
                        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
                },
                // 删除文件之前的钩子
                beforeRemove(file, fileList) {
                        return this.$confirm(`确定移除 ${ file.name }？`);
                },
                // 文件上传成功
                handleSuccess(response, file, fileList){
                        console.log(response, file, fileList,'图片');
                        let arr= []
                        fileList.forEach(item=>{
                                if(item.response){
                                        arr.push('http://8.129.190.90:10082'+item.response.msg)
                                }else{
                                        arr.push(item.url)
                                }
                        })
                        console.log(arr,'arr');
                        this.$store.state.product.productParams.pic = arr[0]
                        arr = arr.slice(1)
                        this.$store.state.product.productParams.albumPics = arr.join(',')
                },

                add(name){
                     if(this.form[name+'val']){
                        if(this.form[name+'list'].includes(this.form[name+'val'])){

                        }else{
                                this.form[name+'list'].push(this.form[name+'val'])
                                this.form[name+'val'] = ''
                        }
                        
                     }else{

                     } 
                },
                changeAttrCate(){
                        getparamsList(this.attrCate)
                        .then(res=>{
                                console.log('参数',res);
                                this.paramsList = res.data.list
                        })
                        getAttrList(this.attrCate)
                        .then(res=>{
                                console.log('属性',res);
                                this.attrList = res.data.list
                                let list = {}
                                this.attrList.forEach(item=>{
                                        if(item.handAddStatus == 1){
                                                list[item.name] = []
                                                list[item.name+'val'] = ''
                                                list[item.name+'list'] = []
                                        }else{
                                                list[item.name] = []
                                        }
                                })
                                this.form = list
                        })

                }
       }
}
</script>
<style lang="scss">
        .attr_box{
                width: 100%;padding: 20px; background: #f8f9fc;border: 1px solid #ebeef5;border-radius: 4px;
        }
</style>