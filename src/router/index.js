import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'
import layout from '../views/layout'
import notfound from '@/views/404'
import productList from '@/views/pms/product/list.vue'
import addProduct from '@/views/pms/product/add.vue'
import orderList from '@/views/oms/order'         //这种引用组件的方式，打包项目时会把所有组件打包成一个js文件，如果项目比较大，会影响加载的速度
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home',
    meta:{isMenu:false}
  },
  {
    path: '/login',
    component: login,
    meta:{isMenu:false}
  },
  {
    path:"/",component:layout,
    meta:{isMenu:false},
    children:[
      {path:'home',component:()=>import('@/views/home'),meta:{isMenu:false,name:"首页"}}
    ]
  },


// 商品模块
{
  path: '/pms',
  component: layout,
  meta:{name:'商品',isMenu:true,icon:'product'},
  children:[
    {path:'/',redirect:'product',meta:{isMenu:false}},
    {path:'product',component:productList,meta:{name:'商品列表',isMenu:true,icon:'product-list'}},
    {path:'addProduct',component:addProduct,meta:{name:'添加商品',isMenu:true,icon:'product-add'}},
    {path:'productCate',component:()=>import('../views/pms/cate/list.vue'),meta:{name:'商品分类',isMenu:true,icon:'product-cate'}},//路由懒加载，打包项目时能把不同路由对应的组件分割成多个js文件，然后当路由被访问的时候才加载对应组件的js文件
    {path:'addProductCate',component:()=>import('../views/pms/cate/add.vue'),meta:{name:'添加商品分类',isMenu:false}},
    {path:'productAttr',component:()=>import('../views/pms/type/list.vue'),meta:{name:'商品类型',isMenu:true,icon:'product-attr'}},
    {path:'brand',component:()=>import('../views/pms/brand/list.vue'),meta:{name:'品牌管理',isMenu:true,icon:'product-brand'}},
    {path:'addBrand',component:()=>import('../views/pms/brand/add.vue'),meta:{name:'添加品牌',isMenu:false}},
  ]
},
//订单模块
{
  path: '/oms',
  component: layout,
  meta:{name:'订单',isMenu:true,icon:'order'},
  children:[
    {path:'/',redirect:'order',meta:{isMenu:false}},
    {path:'order',component:orderList,meta:{name:'订单列表',isMenu:true,icon:'product-list'}},
  ]
},

  {
    path:'/*',
    component:notfound,
    meta:{isMenu:false}
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path == '/login'){
    next()
  }else{
    //如果没有登录那么就跳转登录页，有登录就直接放行
      if(sessionStorage.getItem('vapp-token')){
         next()
      }else{
         next('/login')
      }
  }
})

export default router
