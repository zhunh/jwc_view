<template>
<el-collapse-transition>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
            class='el-menu-test'
            :default-active="activeMenu"
            :collapse="siderbar"
            :unique-opened="false"
            router
        >           
            <SiderbarItem v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"></SiderbarItem>
        </el-menu>
    </el-scrollbar>
</el-collapse-transition>    
</template>
<style scoped>
  .el-menu-test:not(.el-menu--collapse) {
    width: 200px;
    /* min-height: 100vh; */
  }
</style>
<script>
import SiderbarItem from './Siderbaritem'
import { mapState } from 'vuex'
export default {
    data(){
        return{ }
    },
    props:{
        // item: {
        // type: Object,
        // required: true
        // },
    },
    computed:{
        ...mapState(["siderbar"]),
        routes() {
            let tmp =this.$router.options.routes.filter(i => i.name=="IndexPage")
            // console.log(tmp[0].children.filter(i=>i.name=='Layout')[0].children)
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