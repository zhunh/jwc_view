// import Vue from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import TestVue from '@/components/TestVue'
import Tag from '@/components/TagTest'
import Element from '@/components/ElementTest'
import VueRouter from 'vue-router'
import LoginVue from '@/pages/Login/index'
import getUser from '@/utils/GetCurrentUser'
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
                path: '/', // 各专业信息表页面
                name: 'Layout',
                component: () => import('@/Layout/indexMain'),
                children: [
                    {
                        path: '/',
                        name: 'index_major',
                        component: () => import('@/pages/Index/majorPie'),
                        meta: { title: '基本状态', icon: 'el-icon-pie-chart' },
                    },
                    {
                        path:'summary',
                        name:'summary',
                        redirect:'sa',
                        component:()=>import('@/Layout/Tmp'),
                        meta:{title:'汇总统计',icon:'el-icon-menu'},
                        children:[
                            {
                                path:'sa',
                                name:'sa',
                                component:()=>import('@/pages/Summary/sumary'),
                                meta:{title:'专业指标汇总'}
                            },   
                            {
                                path:'score',
                                name:'score',
                                component:()=>import('@/pages/Summary/score'),
                                meta:{title:'专业得分统计'}
                            },                                                       
                        ]
                    },                    
                    {
                        path: '/adetail/:aca',
                        // name: 'adetail',
                        hidden: true,
                        component: () => import('@/pages/Detail/aDetail'),
                        meta:{title:'学院专业详情'}
                    },                    
                    {
                        path: 'm-detail',
                        name: 'm-detail',
                        component: () => import('@/pages/MajorDetail/index'),
                        meta:{title:'详细信息',icon:'el-icon-document'}
                    },
                    {
                        path:'condition',
                        component:()=>import('@/pages/BasicCondition/BasicCondition'),
                        meta:{title:'基本条件',icon:'el-icon-files'}
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
                                meta:{title:'本科教学工程'},
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
                        path:'data-in',
                        component:()=>import('@/pages/DataIn/'), //这里中间页面作为权限控制
                        // redirect:'collect',
                        meta:{title:'数据采集',icon:'el-icon-s-data'},
                        children:[
                            {
                                path:'collect',
                                component:()=>import('@/pages/DataIn/ER'),
                                meta:{title:'培养质量和教学研究'}
                            },
                            {
                                path:'bcondtion',
                                component:()=>import('@/pages/DataIn/MajorCondition'),
                                meta:{title:'专业基本条件'}
                            },     
                            {
                                path:'importRp',
                                component:()=>import('@/pages/DataIn/Upload'),
                                meta:{title:'表格导入'}
                            },                                                      
                        ]
                    },
                    {
                        path:'user',
                        name:'user',
                        component:()=>import('@/Layout/Tmp'),
                        redirect:'query',
                        meta:{title:'用户管理',icon:'el-icon-user-solid'},
                        children:[
                            {
                                path:'query',
                                name:'query',
                                component:()=>import('@/pages/User'),
                                meta:{title:'用户列表'}
                            },
                            {
                                path:'add',
                                name:'add',
                                component:()=>import('@/pages/User/add'),
                                meta:{title:'添加用户'}
                            },
                            {
                                path:'update/:id',
                                name:'update',
                                hidden:true,
                                component:()=>import('@/pages/User/update'),
                                meta:{title:'修改用户'}
                            }                                            
                        ]
                    },                                                      
                    // {
                    //     path: '*',
                    //     redirect: '/'
                    // }
                ]
            },            
        ]
    },
    {
        path:'/index',
        name:'index',
        component: ()=>import('@/pages/Index/index')
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

let userRole = getUser().userRole
const asyncRouter = [
    {
        path: '/addrouter',
        name:'addrouter',
        component: () => import('@/pages/Detail/mDetail'),
        meta:{title:'专业详情'}
    },
]
// if(userRole === 3){
    router.addRoutes(asyncRouter)
// }

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