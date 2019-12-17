<template>
    <div>
        <el-row>
            <el-col :span="24">
              <SMY/>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import SMY from './components/sumary'
export default {
  data(){
    return{

    }
  },
  components:{
    SMY
  }
}
</script>
<style scoped>
  .el-row {
    border-radius: 4px;
    /* margin-bottom: 10px; */
    padding: 10px 20px 10px 20px;
    background-color: rgb(255, 255, 255);
    background: url('~@/assets/bg-pic/doodles.png');
    background-repeat: "repeat"; 
  }
  .el-col {
    border-radius: 4px;
  }
</style>