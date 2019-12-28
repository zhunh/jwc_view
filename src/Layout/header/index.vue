<template>
    <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>
        <el-menu-item index="/">首页
        </el-menu-item>
        <el-menu-item index="/summary">数据汇总</el-menu-item>
        <el-menu-item index="/major/">专业基本状态数据</el-menu-item>
        <el-submenu index="3">
            <template slot="title">数据</template>
            <el-menu-item index="/dataIn">采集</el-menu-item>
            <el-menu-item index="/dataManage">管理</el-menu-item>
        </el-submenu>                
        <el-menu-item index="5" disabled>消息中心</el-menu-item>
        <el-menu-item index="/user">用户管理</el-menu-item>    
        <!-- <el-submenu index="3">
            <template slot="title">选项卡</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
            <el-menu-item index="3-3">选项3</el-menu-item>
            <el-submenu index="3-4">
            <template slot="title">系统管理</template>
            <el-menu-item index="3-4-1">选项1</el-menu-item>
            <el-menu-item index="3-4-2">选项2</el-menu-item>
            <el-menu-item index="3-4-3">选项3</el-menu-item>
            </el-submenu>
        </el-submenu>         -->
        <el-menu-item style="float:right;display:inline-block;">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar shape="square" :size="50">{{username}}</el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/login" tag="span"><el-dropdown-item>登录</el-dropdown-item></router-link>
              <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>   
        </el-menu-item>            
        <!-- <el-menu-item>
            <div style="float:right;margin: 0 auto;padding:">
            <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
            </div>
        </el-menu-item> -->
        <!-- <el-menu-item  style="float:right;">
            <el-dropdown >
            <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>注销</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>     
        </el-menu-item>    -->
        </el-menu>
       
    </div>
</template>
<script>
import getUser from '@/utils/GetCurrentUser'
  export default {
    data () {
      return {
        activeIndex2:'1',
        username:'user'
        // squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
      }
    },
    methods:{
      handleSelect(){

      },
      logout(){
        sessionStorage.removeItem('userInfo')     
        sessionStorage.removeItem('jwctoken')  
        this.$router.push('/login')
      }
    },
    mounted(){
      this.username = getUser()
    }
  }
</script>
<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>