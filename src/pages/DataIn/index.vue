<template>
    <div v-if="userRole == 1">
        无权限.
    </div>
    <div v-else>
        <router-view/>
        <!-- <el-row>
            <el-col :span="24">
                <el-card shadow="never" style="min-height:50vh;">
                    <el-tabs tab-position="left">
                    <el-tab-pane label="专业基本条件"><MC></MC></el-tab-pane>
                    <el-tab-pane label="培养质量和教学"><ER></ER></el-tab-pane>
                    <el-tab-pane label="导入教改论文等"><Upload></Upload></el-tab-pane>
                    <el-tab-pane label="新建任务">等待新建任务</el-tab-pane>
                    </el-tabs>
                </el-card>                
            </el-col>
        </el-row> -->
    </div>
</template>
<style scoped>
  .el-row {
    border-radius: 4px;
    /* margin-bottom: 10px; */
    padding: 10px 20px 10px 20px;
    /* background-color: rgb(255, 255, 255); */
    /* background: url('~@/assets/bg-pic/doodles.png');
    background-repeat: "repeat";      */
  }
</style>
<script>
import getUser from '@/utils/GetCurrentUser'
export default {
    computed:{
        userRole(){
            return getUser().role
        }
    },     
    created(){
         this.$store.dispatch('getMajorList');
    }
}
</script>