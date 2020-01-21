<template>
    <el-card shadow="never">
    <el-page-header @back="goBack" v-bind:content="academy"></el-page-header>        
        <el-table
          :data="tableData"
          v-loading="loading"
          :highlight-current-row="true"
          :fit="true"
          tooltip-effect="dark"
          size="small"
        >
          <el-table-column type="index" width="40" fixed="left"></el-table-column>
          <el-table-column prop="post_year" label="填报年份" width></el-table-column>
          <el-table-column prop="major_code_school" label="校内专业代码" width="105"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="major_name_school" label="校内专业名称" min-width="110"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="major_name" label="专业名称"></el-table-column>
          <el-table-column prop="major_code" label="专业代码"></el-table-column>
          <el-table-column prop="code_version" label="代码版本"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="academy" label="所属单位名称" min-width="110"></el-table-column>
          <el-table-column prop="academy_code" label="所属单位号" width="110"></el-table-column>
          <el-table-column prop="major_start_year" label="专业设置年份" :sortable="true" width="120"></el-table-column>
          <el-table-column prop="schooling_year" label="学制"></el-table-column>
          <el-table-column prop="schooling_year_max" label="允许修业年限" width="110"></el-table-column>
          <el-table-column prop="degree_awarding_category" label="授予学位门类" width="110"></el-table-column>
          <el-table-column prop="recruit_state" label="招生状态"></el-table-column>
          <el-table-column prop="new_yn" label="是否新专业" width="100"></el-table-column>
          <el-table-column prop="teachers_yn" label="是否师范类专业" width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="post_user" label="填报人" min-width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="post_time" label="填报时间"></el-table-column>
        </el-table>
        <Root/>
    </el-card>
</template>
<script>
import {getMba} from '@/api/majorDetail'
import Root from '../../Layout/footer'
export default {
    data(){
        return{
            loading:false,
            academy:'',
            tableData:[]
        }
    },
    components:{
        Root
    },
    methods: {
      goBack() {
          this.$router.push({
              path:'/'
          })
        console.log('go back');
      }
    },
    created(){
        let tmp = this.$route.params.aca
        this.academy = this.$route.params.aca + " 所有专业"
        getMba({academy:tmp}).then(re=>{
            this.tableData = re.result
            console.log(re)
        }).catch(err=>{
            console.log(err)
        })       
        console.log(tmp)
    }
}
</script>