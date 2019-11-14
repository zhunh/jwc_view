<template>
    <div>
        <el-container>
            <Headerq />
        </el-container>
        
        <el-container style="height:100%;border: 1px solid #eee;height:calc(100vh - 61px);">
            <el-aside width="200px">
                <!-- Aside -->
                <Siderbar />
            </el-aside>
            <el-container direction="vertical">
                <el-main>
                    <!-- Main -->
                    <router-view/>
                </el-main>     
            </el-container>
        </el-container>
        <!-- footer -->
        <!-- <el-container> 
            <el-footer height="200px">Footer</el-footer>     
        </el-container>   -->
    </div>
</template>
<script>
import Siderbar from './sidebar'
export default {
    name: 'Layout',
    components: {
        Siderbar
    }
}
</script>
<style scoped>
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #fff;
    color: #333;
    line-height: 200px;
    /* height: 100%; */
  }
  
  .el-main {
    background-color: rgb(240, 246, 247);
    color: #333;
    padding: 0 0;
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