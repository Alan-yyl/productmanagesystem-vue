import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home'
import proBasic from '../views/pro/proBasic'

Vue.use(VueRouter)

const routes = [
    // {
    //     //定义路由链接路径
    //     path: '/test',
    //     name: 'Test',
    //     component: test,
    //     hidden: true,
    // },
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
        path: '*',
        redirect:'/home'
    }
]

const router = new VueRouter({
    routes
})

export default router
