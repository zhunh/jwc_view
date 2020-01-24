<template>
    <div style="padding:10px;">
        <el-row :gutter="20">
        <el-col :span="4">
            <div class="grid-content bg-purple">

            </div>
        </el-col>
        <el-col :span="16">
            <div class="grid-content bg-purple">
                <el-table 
                :data="TBDATA" 
                border
                :fit="true"
                v-loading="loading"
                :highlight-current-row="true"
                size="small"
                >
                    <el-table-column align="center" type="index" fixed="left"></el-table-column>
                    <el-table-column label="用户">
                        <template slot-scope="{row}">
                            <span>{{row.username}}</span>
                        </template>
                    </el-table-column>   

                    <el-table-column label="权限">
                        <template slot-scope="{row}">
                            <span>{{row.role}}</span>
                        </template>
                    </el-table-column>   

                    <el-table-column label="角色">
                        <template slot-scope="{row}">
                            <span>{{row.desc}}</span>
                        </template>
                    </el-table-column>        

                    <el-table-column label="备注">
                        <template slot-scope="{row}">
                            <span>{{row.remark}}</span>
                        </template>
                    </el-table-column>                                                                        
                </el-table>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content bg-purple">

            </div>
        </el-col>
        </el-row>
    </div>
</template>
<script>
import { fetchList } from '@/api/user'
export default {
    data(){
        return{
            loading:false,
            TBDATA:[]
        }
    },
    created() {
        this.getData()
        console.log(this.$router.options.routes)
        console.log(this.$route.matched)
    },
    methods:{
        getData(){
            this.loading = true;
            fetchList().then(re=>{
                this.TBDATA = re.result.data
            })
            this.loading = false;
        }
    }
}

</script>

<style>
  .el-row {
    margin-bottom: 20px;
  }
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
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>