import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home'
import proBasic from '../views/pro/proBasic'
import saleRecord from "@/views/sale/saleRecord";
import customerBasic from "../views/customer/customerBasic";
import realTimeData from "../views/sale/realTimeData"
import productDetail from "../views/pro/productDetail"

Vue.use(VueRouter)

const routes = [
    {
        //定义路由链接路径
        path: '/login',
        name: 'Login',
        component: Login,
        hidden: true,
    },
    {
        path: '/home',
        name: '商品信息',
        component: Home,
        iconCls: "el-icon-s-promotion",
        children: [
            ////子菜单一
            {
                path: '/proBasic',
                name: '基本信息',
                component: proBasic,
            },
        ]
    },
    {
        path: '/sale',
        name: '销量情况',
        component: Home,
        iconCls: "el-icon-s-data",
        children: [
            ////子菜单一
            {
                path: '/saleRecord',
                name: '销售记录',
                component: saleRecord,
            },
            {
                path: '/realTimeData',
                name: '统计数据',
                component: realTimeData,
            }
        ]
    },
    {
        path: '/customer',
        name: '买家信息',
        component: Home,
        iconCls: "el-icon-user-solid",
        children: [
            ////子菜单一
            {
                path: '/customerBasic',
                name: '基本信息',
                component: customerBasic,
            }
        ]
    },
    {
        path: '*',
        redirect:'/home',
        hidden: true,
    },
    {
        path:'/productDetail',
        name: "商品详情页",
        component: productDetail,
        hidden: true,
    }
]

const router = new VueRouter({
    routes
})

export default router
