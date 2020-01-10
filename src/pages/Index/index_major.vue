<template>
    <div>
        <el-row :gutter="10">
            <el-col :xs="8" :sm="6" :md="4" :lg="6" :xl="6">
            <el-timeline :reverse="reverse">
                <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp">
                {{activity.content}}
                </el-timeline-item>
            </el-timeline>
            </el-col>
        </el-row>
    </div>
</template>
<style>    
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
<script>
  export default {
    data() {
      return {
        reverse: true,
        activities: [{
          content: '培养质量',
          timestamp: '2020-01-01'
        }, {
          content: '教学研究',
          timestamp: '2020-01-01'
        }, {
          content: '基本信息',
          timestamp: '2020-01-01'
        }]
      };
    }
  };
</script>