<template>
    <div>
        <!-- <el-image :src="imgSrc"></el-image> -->
        <el-row class="bg">
            <el-col :span="6">     
                <el-row>     
                <el-card shadow="never">
                    <div slot="header" class="clearfix" >
                        <span>系统</span>
                        <el-switch
                        style="float: right; padding: 3px 0"
                        v-model="picRun"
                        active-color="#475669"
                        inactive-color="#99a9bf">
                        </el-switch>                        
                    </div>
                    <el-carousel height="150px" indicator-position="outside" :autoplay="picRun">
                    <el-carousel-item v-for="item in 3" :key="item">
                        <h3 class="small">{{ item }}</h3>
                    </el-carousel-item>
                    </el-carousel>      
                <el-collapse v-model="activeNames" @change="handleChange" accordion>
                <el-collapse-item title="系统 MBS" name="1">
                    <div>专业基本状态数据库，Major BasicState</div>
                    <div>记录每年全校所有专业各种基本数据</div>
                </el-collapse-item>
                <el-collapse-item title="版本 1.0.0" name="2">
                    <div>20191217</div>
                    <div></div>
                </el-collapse-item>
                <el-collapse-item title="功能 feature" name="3">
                    <div>各项数据录入</div>
                    <div>汇总统计</div>
                    <div></div>
                </el-collapse-item>
                <el-collapse-item title="反馈 feedback" name="4">
                    <div>体验提交</div>
                    <div>bug提交</div>
                </el-collapse-item>
                </el-collapse>       
                </el-card>     
                </el-row>        
            </el-col>     
            <el-col :span="18">
                <el-row>
                <el-card shadow="never">
                    <div slot="header" class="clearfix">
                        <span>通知：</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作</el-button>
                    </div>
                    <div>
                        <el-table>
                            <el-table-column label="列表"></el-table-column>
                        </el-table>
                    </div>                    
                </el-card>   
                <el-divider></el-divider>
                <el-card shadow="never">
                    <div>
                        <el-table>
                            <el-table-column label="列表"></el-table-column>
                        </el-table>
                    </div>                    
                </el-card>                    
                </el-row>           
            </el-col>       
        </el-row>
    </div>
</template>
<style scoped>
    .el-row{
        padding: 10px 10px 10px 10px;
    }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }    
  .bg{
    height:calc(100vh - 61px);
    background: url('~@/assets/bg-pic/doodles.png');
    background-repeat: "repeat";       
  }
</style>
<script>
export default {
    data(){
        return{
            picRun:false
        }
    }
}
</script>