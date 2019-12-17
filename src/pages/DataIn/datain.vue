<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="never" style="min-height:50vh;">
                    <!-- <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>             -->
                    <el-tabs tab-position="left">
                    <el-tab-pane label="专业基本条件"><MC></MC></el-tab-pane>
                    <el-tab-pane label="培养质量和教学"><ER></ER></el-tab-pane>
                    <el-tab-pane label="导入教改论文等"><Upload></Upload></el-tab-pane>
                    <el-tab-pane label="新建任务">等待新建任务</el-tab-pane>
                    </el-tabs>
                </el-card>                
            </el-col>
        </el-row>
    </div>
</template>
<style scoped>
  .el-row {
    border-radius: 4px;
    /* margin-bottom: 10px; */
    padding: 10px 20px 10px 20px;
    /* background-color: rgb(255, 255, 255); */
    background: url('~@/assets/bg-pic/doodles.png');
    background-repeat: "repeat";     
  }
</style>
<script>
import ER from "./components/ER"
import MC from "./components/MajorCondition"
import Upload from "./components/Upload"
export default {
    components:{
        ER,
        MC,
        Upload
    },
    created(){
         this.$store.dispatch('getMajorList');
    }
}
</script>