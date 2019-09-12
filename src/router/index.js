import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Member from '@/components/Member/Member'
import Shopcar from '@/components/Shopcar/Shopcar'
import Search from '@/components/Search/Search'
import NewList from '@/components/NewList/NewList'
import NewsDetail from '@/components/NewList/NewsDetail'
import PhotoList from '@/components/PhotoList/PhotoList'
import PhotoDetail from '@/components/PhotoList/PhotoDetail'
import GoodsShow from '@/components/Goods/GoodsShow'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/Member',
      name: 'Member',
      component: Member
    },{
      path: '/Shopcar',
      name: 'Shopcar',
      component: Shopcar
    },{
      path: '/Search',
      name: 'Search',
      component: Search
    },{
      path: '/NewList',
      name: 'NewList',
      component: NewList
    },{
      path:'/NewList/:id',
      name:'NewsDetail',
      component:NewsDetail
    },{
      path: '/photo/list',
      name: 'PhotoList',
      component: PhotoList
    },{
      path: '/photo/NewsDetail/:id',
      name: 'PhotoDetail',
      component: PhotoDetail
    },{
      path: '/goods/list/:page',
      name: 'GoodsShow',
      component: GoodsShow
    }
  ]
})
