<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
            :default-active="activeMenu"
            :unique-opened="false"
            router
        >
            <!-- <el-menu-item
                v-for="route in routes" :key="route.path" :index="route.path"
            >
                <template slot="title">
                    <span v-if="route.meta" :title="route.meta.title">{{route.meta.title}}</span>
                </template>
            </el-menu-item> -->
            <!-- <el-menu-item @click="isCollapse=!isCollapse">
                <i v-if="isCollapse" class="el-icon-s-unfold"></i>
                <i v-else class="el-icon-s-fold"></i>
                <span slot="title">展开/折叠</span>
            </el-menu-item>              -->
            <SiderbarItem v-for="route in routes" :key="route.path" :item="route" :base-path="'/major/'+ route.path"/>
        </el-menu>
    </el-scrollbar>
</template>
<script>
import SiderbarItem from './Siderbaritem'
export default {
    data(){
        return{

        }
    },
    props:{
        // item: {
        // type: Object,
        // required: true
        // },
    },
    computed:{
        routes() {
            let tmp =this.$router.options.routes.filter(i => i.name=="IndexPage")
            console.log(tmp[0].children.filter(i=>i.name=='Layout')[0].children)
            return tmp[0].children.filter(i=>i.name=='Layout')[0].children
        },        
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        },        
    },
    components:{
        SiderbarItem,
    }
}
</script>