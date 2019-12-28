// import Vue from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import TestVue from '@/components/TestVue'
import Tag from '@/components/TagTest'
import Element from '@/components/ElementTest'
import VueRouter from 'vue-router'
import LoginVue from '@/pages/Login/index'
// 重写 push方法 解决不能两次跳转相同 url 的问题
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
// 进度条设置
NProgress.configure({ showSpinner: false },{color: 'white' });
// Vue.use(VueRouter)

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
                component:()=>import('@/pages/Summary')
            },
            {
                path:'dataIn',
                component:()=>import('@/pages/DataIn/datain')
            },
            {
                path:'user',
                component:()=>import('@/pages/User')
            },            
            {
                path:'dataManage',
                component:()=>import('@/pages/DataManage/dataManage')
            },            
            {
                path: '/major', // 各专业信息表页面
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
                        path:'tpp',
                        component:()=>import('@/pages/TeachingResearch/TeachingProjectProvince')
                    },
                    {
                        path:'rp',
                        component:()=>import('@/pages/TeachingResearch/ResearchPaper')
                    },
                    {
                        path:'ta',
                        component:()=>import('@/pages/TeachingResearch/TeachingAward')
                    },
                    {
                        path:'ep',
                        component:()=>import('@/pages/TeachingResearch/EngineeringProject')
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
// 全局前置路由
router.beforeEach((to,from,next)=>{
    console.log(to,from)
    NProgress.start()
    next()
})
// 全局后置守卫
router.afterEach((to,from)=>{
    console.log(to,from)
    NProgress.done()
})
// 暴露路由接口
export default router