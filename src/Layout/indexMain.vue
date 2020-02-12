<template>
<!-- 包含头部和左侧栏的router-view -->
    <div>
    <el-container style="border: 1px solid #eee;height:calc(100vh - 61px);">
        <el-aside width="auto">
            <!-- Aside -->
            <Siderbar />
        </el-aside>
        <el-container direction="vertical">
            <el-main>
              <!-- 面包屑导航 -->
                <div  class="navbar">
                  <div class="side-btn" @click="toggleSiderbar">
                    <i v-if='siderbar' class="el-icon-s-unfold hamburger"></i>
                    <i v-else class="el-icon-s-fold hamburger" width="64" height="64"></i>    
                  </div>             
                  <bre class="breadcontainer"/>
                </div>
                <!-- Main -->
                <el-card style="min-height:60vh" shadow="never">
                  <transition name="fade-transform" mode="out-in">
                    <router-view />
                  </transition>
                </el-card>
                <el-footer><Footer/></el-footer>
            </el-main>   
        </el-container>
    </el-container>
    </div>
        <!-- footer -->
        <!-- <el-container> 
            <el-footer height="200px">Footer</el-footer>     
        </el-container>   -->
</template>
<script>
import { mapState } from 'vuex'
import Bre from '../components/Breadcrumb'
import Siderbar from './sidebar'
import Footer from './footer'
export default {
    name: 'indexMain',
    components: {
        Siderbar,Footer,Bre
    },
    data(){
      return {
        bgStyle:{
            height: '100vh',
            width: '100%',
            backgroundImage: 'url('+require('@/assets/bg-pic/doodles.png')+')',
            backgroundRepeat: "repeat",
        }        
      }
    },
    computed:{
      ...mapState(["siderbar"]),
    },
    methods:{
      toggleSiderbar(){
        this.$store.commit('setSiderbar')
      }
    }
}
</script>
<style lang="scss" scoped>
  .el-aside {
    background-color: #fff;
    color: #333;
    line-height: 200px;
    /* height: 100%; */
  }
  .el-main {
    color: #333;
    padding: 0 0;

    /* background: url('~@/assets/bg-pic/doodles.png');
    background-repeat: "repeat",   */
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  /* .el-row {
    margin-bottom: 20px;
  } */
  /* .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  } */
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .navbar{
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);    
    .side-btn {
        padding: 0 15px;
        line-height: 50px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background .3s;
        -webkit-tap-highlight-color:transparent;
        &:hover {
          background: rgba(0, 0, 0, .025)
        }    
    }    
    .breadcontainer{
      float: left;
    }    
  }
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    transition: width 0.28s;
  }  
</style>