import Vue from 'vue'
import Router from 'vue-router'
import TestVue from '@/components/TestVue'
import Tag from '@/components/TagTest'
import Element from '@/components/ElementTest'
import VueRouter from 'vue-router'
import LoginVue from '@/pages/Login/index'
 
Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'IndexPage', //主页
        component: () => import('@/Layout/index'),
        children:[
            {
                path: '/',
                component: () => import('@/pages/Index/index_main')
            },
            {
                path:'summary',
                component:()=>import('@/pages/Summary/summary')
            },
            {
                path:'dataIn',
                component:()=>import('@/pages/DataIn/datain')
            },
            {
                path: '/major',
                name: 'Layout',
                component: () => import('@/Layout/indexMain'),
                children: [
                    {
                        path: '/',
                        name: 'Form',
                        component: () => import('@/pages/table/index'),
                        meta: { title: 'Form', icon: 'form' }
                    },
                    // http://localhost:8080/#/layout/table
                    {
                        path: 'table',
                        name: 'table',
                        component: () => import('@/pages/table/index'),
                    },
                    {
                        path: 'calendar',
                        name: 'Calendar',
                        component: () => import('@/pages/Calendar/calendar')
                    },
                    {
                        path:'er',
                        component:()=>import('@/pages/CQ/EmploymentRate')
                    },
                    {
                        path:'pr',
                        component:()=>import('@/pages/CQ/PostgraduateRate')
                    },
                    {
                        path:'mcr',
                        component:()=>import('@/pages/CQ/MajorConvertRate')
                    },
                    {
                        path:'condition',
                        component:()=>import('@/pages/BasicCondition/BasicCondition')
                    },
                    {
                        path: '*',
                        redirect: '/major'
                    }
                ]
            },            
        ]
    },
    {
        path: '/test',
        name: 'Index',
        component: TestVue
    },
    {
        path: '/tag',
        name: 'Tag',
        component: Tag
    },    
    {
        path: '/login',
        name: 'Login',
        component: LoginVue
    },
    {
        path: '/element',
        name: 'Element',
        component: Element
    },

    // {
    //     path: '*',
    //     redirect: '/'
    // }
]
// 实例化
const router = new VueRouter({
    // 选项配置
    // routes: routes
    routes
})
// 暴露路由接口
export default router