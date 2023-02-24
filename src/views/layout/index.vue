<template>
        <div class="layout">
                <div class="left" :style="{width:myWidth}">
                        <sidebar></sidebar>
                </div>
              <div class="right" :style="{paddingLeft:myWidth}">
                <navbar></navbar>
                <mainbar></mainbar>
              </div>
              

        </div>
</template>
<script>
import sidebar from '@/views/layout/sidebar'
import navbar from '@/views/layout/navbar'
import mainbar from '@/views/layout/mainbar'
import bus from '@/bus/bus'
export default {
        components:{
    sidebar,
    navbar,
    mainbar,
},
data() {
        return {
                myWidth: '180px',
        }
},
mounted(){
        bus.$on('xxx',()=>{
                this.myWidth = this.myWidth == '180px' ? '40px' : '180px'
        })
}

}
</script>
<style>
        .left{width: 180px;height: 100%;background-color: #304156;position: fixed;top:0;left: 0;overflow: hidden;transition: all 0.5s;}
        .right{width: 100%;padding-left:180px;transition: all 0.5s;}
        
</style>