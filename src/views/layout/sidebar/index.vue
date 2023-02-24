<template>
        <div>
                <el-menu
                :default-active="$route.m"
                 :collapse="isCollapse"
                 :style="{width:myWidth}"
                class="el-menu-vertical-demo"
                background-color="#304156"
                text-color="#bfcbd9">
                        <router-link to="/home">
                                <el-menu-item index="首页">
                                        <svg-icon iconClass="home"></svg-icon>
                                        <span style="margin-left:15px" slot="title">首页</span>
                                </el-menu-item>
                        </router-link>
                        <el-submenu :index="item.meta.name" v-for="item in list" :key="item.meta.name">
                                <template slot="title">
                                        <svg-icon :iconClass="item.meta.icon" :style="{marginLeft:myMargin}"></svg-icon>
                                        <span style="margin-left:15px">{{item.meta.name}}</span>
                                </template>
                                <template v-for="item2 in item.children" >
                                        <router-link :to="item.path+'/'+item2.path"  v-if="item2.meta.isMenu" :key="item2.meta.name">
                                                <el-menu-item :index="item2.meta.name">
                                                        <svg-icon :iconClass="item2.meta.icon"></svg-icon>
                                                        <span  style="margin-left:15px" slot="title">{{item2.meta.name}}</span>
                                                </el-menu-item>
                                        </router-link>
                                </template>
                        </el-submenu>
                </el-menu>
        </div>
</template>
<script>
import bus from '@/bus/bus'
export default {
        data() {
                return {
                        list:[],
                        isCollapse:false,
                        myMargin:'10px',
                        myWidth:'180px'
                }
        },
        mounted(){
                // console.log(this.$router.options.routes);
                this.list = this.$router.options.routes.filter(item=>{
                        return item.meta.isMenu
                })
                // console.log(this.list);
                bus.$on('xxx',()=>{
                       this.isCollapse = ! this.isCollapse
                       if(this.isCollapse){
                              this.myMargin =  0 
                              this.myWidth = '40px'

                       }else{
                               this.myMargin =  '10px'
                               this.myWidth = '180px'
                       }
                })

        }
}
</script>
<style scoped>
       .el-menu-vertical-demo{border-right-width:0;}
       .el-menu .el-submenu .el-menu-item{background-color: #1f2d3d !important;}
       ::v-deep .el-submenu__title{padding:0 10px !important;}
       ::v-deep .el-tooltip{padding:0 10px !important;}
</style>