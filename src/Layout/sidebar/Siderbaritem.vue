<template>
    <div>
        <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
            <!-- <app-link :to="resolvePath(item.path)"> -->
            <el-menu-item :index="resolvePath(onlyOneChild.path)">
                <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title"/>
            </el-menu-item>
            <!-- </app-link> -->
        </template>        
        <template v-else>
            <el-submenu ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
                <template slot="title">
                    <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title"/>
                </template>
                <sidebar-item
                    v-for="child in item.children"
                    :key="child.path"
                    :item="child"
                    :base-path="resolvePath(child.path)"
                />                
                <!-- <app-link v-for="c in item.children" :key="c.path" :to="c.path">
                <el-menu-item  :index="c.path">
                    <span v-if="c.meta">{{c.meta.title}}</span>
                </el-menu-item>
                </app-link> -->
            </el-submenu>
        </template>
    </div>
</template>
<script>
import path from 'path'
import Item from './item'
// import AppLink from './Link'
export default {
    name:"SidebarItem",
    data(){
        this.onlyOneChild = null
        return {}
    },
    props:{
        item:{
            type:Object,
            required:true
        },
        basePath: {
            type: String,
            default: ''
        },        
    },
    components:{
        // AppLink,
        Item
    },
    methods:{
        hasOneShowingChild(children = [], parent) {
        const showingChildren = children.filter(item => {
            if (item.hidden) {
                return false
            } else {
            // Temp set(will be used if only has one showing child)
            this.onlyOneChild = item
                return true
            }
        })

        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
            return true
        }

        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
            this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
            return true
        }

        return false
        },
        resolvePath(routePath){
            console.log(this.basePath)
            console.log(routePath)
            console.log(path.resolve(this.basePath, routePath))
            return path.resolve(this.basePath, routePath)
        }
    }
}
</script>