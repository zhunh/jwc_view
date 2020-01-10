<template>
    <div id="myEchart" style="width:100%;height:calc(60vh);"></div>       
</template>
<script>
import {getMgba} from '@/api/majorDetail'
export default {
    data(){
        return{
            mab:[{_id:"测试","academy_count":12}],
        }
    },    
    methods:{        
        drawLine(){
            let myChart = this.$echarts.init(document.getElementById("myEchart"))
            let that = this.$router
            //点击事件
            myChart.on('click', function (params) {
                that.push({  
                    path: '/adetail',   
                    name: 'adetail',  
                    params: {   
                        aca: params.name,   
                    }  
                    /*query: {  
                        key: 'key',   
                        msgKey: this.msg  
                    }*/  
                })                 
            });
            
            myChart.showLoading();
            getMgba({}).then(re=>{
                this.mab = re.result 
                let option = {
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        right: 50,
                        top: 20,
                        bottom: 0,
                        // data: ['就业率','考研率','调剂率','转出率'],
                        // selected: {'就业率':true}                        
                    },
                    grid:{
                        right:'10%'
                    },
                    tooltip: {},
                    graphic:[
                        {
                            type: 'group',
                            rotation: Math.PI / 4,
                            bounding: 'raw',
                            right: 110,
                            bottom: 110,
                            z: 100,
                            children: [
                                {
                                    type: 'rect',
                                    left: 'center',
                                    top: 'center',
                                    z: 100,
                                    shape: {
                                        width: 400,
                                        height: 50
                                    },
                                    style: {
                                        fill: 'rgba(0,0,0,0.3)'
                                    }
                                },
                                {
                                    type: 'text',
                                    left: 'center',
                                    top: 'center',
                                    z: 100,
                                    style: {
                                        fill: '#fff',
                                        text: 'mbs.jxust.edu.cn',
                                        font: 'bold 26px Microsoft YaHei'
                                    }
                                }
                            ]
                        }                        
                    ],
                    dataset: {
                        dimensions: ['_id', 'academy_count'],
                        source:[...re.result]
                    },
                    series: [
                        {type: 'pie',name:'专业个数',center: ['38%', '50%']}
                    ]
                };                 
                myChart.setOption(option); 
                myChart.hideLoading();                                   
            }).catch(err=>{
                console.log(err)
            })             
               
        },
    },
    created(){

    },
    mounted(){
        this.drawLine()
    }        
}
</script>