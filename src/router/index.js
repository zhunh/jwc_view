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
                component: () => import('@/pages/Index/index_main'),
                meta:{title:'主页'}
            },
            {
                path: '/adetail',
                name: 'adetail',
                component: () => import('@/pages/Detail/aDetail'),
                meta:{title:'学院专业详情'}
            },
            {
                path: '/mdetail',
                component: () => import('@/pages/Detail/mDetail'),
                meta:{title:'专业详情'}
            },                        
            {
                path:'summary',
                component:()=>import('@/pages/Summary'),
                meta:{title:'专业指标汇总'}
            },
            {
                path:'dataIn',
                component:()=>import('@/pages/DataIn/datain'),
                meta:{title:'数据采集'}
            },
            {
                path:'user',
                component:()=>import('@/pages/User'),
                meta:{title:'用户管理'}
            },            
            {
                path:'dataManage',
                component:()=>import('@/pages/DataManage/dataManage'),
                meta:{title:'数据管理'}
            },            
            {
                path: '/major', // 各专业信息表页面
                name: 'Layout',
                component: () => import('@/Layout/indexMain'),
                children: [
                    {
                        path: '/',
                        name: 'index_major',
                        component: () => import('@/pages/Index/index_major'),
                        meta: { title: '专业基本状态', icon: 'el-icon-s-promotion' }
                    },
                    {
                        path: 'mdetail',
                        name: 'mdetail',
                        component: () => import('@/pages/MajorDetail/index'),
                        meta:{title:'专业详细信息',icon:'el-icon-document'}
                    },
                    {
                        path:'condition',
                        component:()=>import('@/pages/BasicCondition/BasicCondition'),
                        meta:{title:'专业基本条件',icon:'el-icon-wind-power'}
                    },                    
                    // http://localhost:8080/#/major/cq/er
                    // 培养质量
                    {
                        path: 'cq',
                        name: 'CQ',
                        component:()=>import('@/Layout/Tmp'),
                        redirect:'cq/er',
                        meta:{title:'培养质量',icon:'el-icon-s-promotion'},
                        children:[
                            {
                                path:'er',
                                component:()=>import('@/pages/CQ/EmploymentRate'),
                                meta:{title:'就业率'}
                            },
                            {
                                path:'pr',
                                component:()=>import('@/pages/CQ/PostgraduateRate'),
                                meta:{title:'考研率'}
                            },
                            {
                                path:'mcr',
                                component:()=>import('@/pages/CQ/MajorConvertRate'),
                                meta:{title:'调剂率'}
                            },                            
                        ]
                    },
                    // 教学质量
                    {
                        path:'tq',
                        name:'教学研究',
                        component:()=>import('@/Layout/Tmp'),
                        meta:{title:'教学研究',icon: 'el-icon-s-order'},
                        children:[
                            {
                                path:'tpp',
                                component:()=>import('@/pages/TeachingResearch/TeachingProjectProvince'),
                                meta:{title:'省级教研项目'}
                            },
                            {
                                path:'rp',
                                component:()=>import('@/pages/TeachingResearch/ResearchPaper'),
                                meta:{title:'教改论文'}
                            },
                            {
                                path:'ta',
                                component:()=>import('@/pages/TeachingResearch/TeachingAward'),
                                meta:{title:'教学成果奖'}
                            },
                            {
                                path:'ep',
                                component:()=>import('@/pages/TeachingResearch/EngineeringProject'),
                                meta:{title:'本科教学工程'}
                            },
                        ]
                    },
                    // {
                    //     path: 'calendar',
                    //     name: 'Calendar',
                    //     component: () => import('@/pages/Calendar/calendar'),
                    //     meta:{title:'日历',icon:'el-icon-date'}
                    // },                    
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