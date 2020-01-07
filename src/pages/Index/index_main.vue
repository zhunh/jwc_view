<template>
    <div>
        <!-- <el-image :src="imgSrc"></el-image> -->
        <el-row>
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
                <el-collapse accordion>
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
                        <span>学校专业分布：</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作</el-button>
                    </div>
                    <majorPie></majorPie>            
                </el-card>   
                <el-divider></el-divider>
                <el-card shadow="never">
                    <!-- <div id="mychart" style="width:600px;height:400px;"></div>   
                    <div id="mychart02" style="width:600px;height:400px;"></div>                  -->
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
  /* .bg{
    height:calc(100vh - 61px);
    background: url('~@/assets/bg-pic/doodles.png');
    background-repeat: "repeat";       
  } */
</style>
<script>
import majorPie from './components/majorPie'
export default {
    data(){
        return{
            picRun:false,
        }
    },
    components:{majorPie},
    methods:{
        // drawLine(){
        // // 基于准备好的dom，初始化echarts实例
        //     var myChart = this.$echarts.init(document.getElementById('mychart'));
        //     // 指定图表的配置项和数据
        //     var option = {
        //         title: {
        //             text: '2019本科教学工程项目',
        //             left: '45%',
        //             textAlign: 'center'
        //         },
        //         tooltip: {},
        //         toolbox: {
        //             show: true,
        //             feature: {
        //                 dataZoom: {
        //                     yAxisIndex: 'none'
        //                 },
        //                 dataView: {readOnly: false},
        //                 magicType: {type: ['line', 'bar']},
        //                 restore: {},
        //                 saveAsImage: {}
        //             }
        //         },                 
        //         legend: {
        //             data:['数量']
        //         },
        //         xAxis: {
        //             data: ["省级教改课题","省级精品在线开放课程","省级高校课程育人共享计划","省级虚拟仿真实验教学项目"],
        //             axisLabel: {
        //                 interval: 0,
        //                 rotate: 10
        //             }                 
        //         },
        //         yAxis: {},
        //         series: [{
                    
        //             type: 'bar',
        //             data: [29, 9, 10, 6],
        //             label: {
        //                 show: true,
        //                 position: 'inside'
        //             },
        //             itemStyle:{
        //                 //通常情况下：
        //                 normal:{  
        //                     //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组中的颜色
        //                     color: function (params){
        //                         var colorList = [
        //                             '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
        //                             '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
        //                             '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
        //                             ];
        //                         return colorList[params.dataIndex];
        //                     },
        //                     // color: '#a453f7',  //设置所有柱状图颜色
        //                 },
        //                 //鼠标悬停时：
        //                 emphasis: {
        //                     shadowBlur: 10,
        //                     shadowOffsetX: 0,
        //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
        //                 }
        //             }                   
        //         }]
        //     };

        //     // 使用刚指定的配置项和数据显示图表。
        //     myChart.setOption(option);            
        // }
    },
    mounted(){
        this.drawLine()
    }
}
</script>