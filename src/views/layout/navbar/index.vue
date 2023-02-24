<template>
        <div class="nav">
                <span class="iconfont icon-gengduo" style="font-size:26px;margin-left: 10px;margin-right:20px" @click="donghua"></span>
                <el-breadcrumb separator="/">
                        <template v-if="$route.path=='/home'">
                                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        </template>
                        <template v-else>
                                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                                <el-breadcrumb-item v-for="item in $route.matched" :key="item.meta.name"><router-link :to="item.path">{{item.meta.name}}</router-link></el-breadcrumb-item>
                        </template>
                </el-breadcrumb>
        </div>
</template>
<script>
import bus from '@/bus/bus'
export default {
        methods:{
                donghua(){
                      bus.$emit('xxx')  
                }
        }
}
</script>
<style scoped>
        .nav{width: 100%;height: 50px;border-bottom: 1px solid #e6e6e6;display: flex;align-items: center;}
</style>