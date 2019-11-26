<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="never">
                    <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>            
                    <el-tabs>
                    <el-tab-pane label="专业基本条件"><MC></MC></el-tab-pane>
                    <el-tab-pane label="培养质量和教学"><ER></ER></el-tab-pane>
                    <el-tab-pane label="角色管理"><Import></Import></el-tab-pane>
                    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
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
    background-color: rgb(255, 255, 255);
  }
</style>
<script>
import ER from "./components/ER"
import MC from "./components/MajorCondition"
import Import from "./components/Import"
export default {
    components:{
        ER,
        MC,
        Import
    }
}
</script>