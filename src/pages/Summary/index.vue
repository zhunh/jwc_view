<template>
    <div>
        <!-- <el-row>
            <el-col :span="24">
              <SMY/>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
              <SCO/>
            </el-col>
        </el-row>     -->
      <el-row>
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> 关键指标汇总表</span>
            <SMY/>
          </el-tab-pane>
          <el-tab-pane label="分数统计"><SCO/></el-tab-pane>        
        </el-tabs>        
      </el-row>
    </div>
</template>
<script>
import SMY from './components/sumary'
import SCO from './components/score'
export default {
  data(){
    return{

    }
  },
  components:{
    SMY,SCO
  }
}
</script>
<style scoped>
  .el-row {
    /* height:calc(100vh - 61px); */
    border-radius: 4px;
    /* margin-bottom: 10px; */
    padding: 10px 20px 10px 20px;
    /* background-color: rgb(255, 255, 255); */
    background: url('~@/assets/bg-pic/doodles.png');
    background-repeat: "repeat"; 
  }
  .el-col {
    border-radius: 4px;
  }
</style>