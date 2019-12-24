<template>
    <div>
        <el-row>
            <el-col span="24">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span>数据状态监控</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">x</el-button> -->
                    </div>
                    <div>
                        <el-table>
                            <el-table-column prop="major_name" label="集合"></el-table-column>
                        </el-table>
                    </div>
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