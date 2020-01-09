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
                <!-- Main -->
                <el-card>
                <router-view/>
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
import Siderbar from './sidebar'
import Footer from './footer'
export default {
    name: 'main',
    components: {
        Siderbar,Footer
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
    }
}
</script>
<style scoped>
  .el-aside {
    background-color: #fff;
    color: #333;
    line-height: 200px;
    /* height: 100%; */
  }
  
  .el-main {
    /* background-color: rgb(240, 246, 247); */
    color: #333;
    padding: 20 0;

    background: url('~@/assets/bg-pic/doodles.png');
    background-repeat: "repeat",  
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-row {
    margin-bottom: 20px;
    /* background-color: rgb(214, 203, 203); */
  }
  .el-col {
    border-radius: 4px;
  }
  .el-col {
    border-radius: 4px;
  }
  /* .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  } */
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>