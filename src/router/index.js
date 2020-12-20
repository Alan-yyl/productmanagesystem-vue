import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home'
import proBasic from '../views/pro/proBasic'
import saleRecord from "@/views/sale/saleRecord";
import customerBasic from "../views/customer/costomerBasic";

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
            }
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
                name: '买家基本信息',
                component: customerBasic,
            }
        ]
    },
    {
        path: '*',
        redirect:'/home'
    }
]

const router = new VueRouter({
    routes
})

export default router
