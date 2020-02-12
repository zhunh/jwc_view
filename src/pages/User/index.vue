<template>
    <div v-if="userRole == 3">
        <el-dialog
        title="提示"
        :visible.sync="dialogDeleteVisible"
        width="30%">
        <span>确定要删除这条记录吗？{{deleteItem}}</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogDeleteVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteUser">确 定</el-button>
        </span>
        </el-dialog>         
        <!--操作栏-->
        <!-- <div style="padding:0 0 10px 0;">
            <el-row>
                <el-button type="primary" icon="el-icon-edit" size="mini" circle></el-button>
                <el-button style="float:right;" plain type="primary" icon="el-icon-plus" size="mini">添加</el-button>
            </el-row>     
        </div>    -->
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

            <el-table-column label="一卡通号">
                <template slot-scope="{row}">
                    <span>{{row.school_id}}</span>
                </template>
            </el-table-column>        

            <el-table-column label="备注">
                <template slot-scope="{row}">
                    <span>{{row.remark}}</span>
                </template>
            </el-table-column>        

            <el-table-column align="center" fixed="right" label="操作">
                <template slot-scope="{row}">
                    <el-button type="warning" icon="el-icon-edit" size="mini" @click="editUser(row._id)"></el-button>
                    <el-button type="text" size="mini" @click="deleteItem=row._id;dialogDeleteVisible=true">删除</el-button>
                </template>
            </el-table-column>                                                                
        </el-table>
    </div>
    <div v-else>无权限.</div>
</template>
<script>
import { fetchList,deleteUser } from '@/api/user'
import getUser from '@/utils/GetCurrentUser'
export default {
    data(){
        return{
            loading:false,
            deleteItem:'',
            dialogDeleteVisible: false,
            TBDATA:[]
        }
    },
    created() {
        this.getData()
        // console.log(this.$router.options.routes)
        // console.log(this.$route.matched)
    },
    computed:{
        userRole(){
        return getUser().role
        }
    },    
    methods:{
        getData(){
            this.loading = true;
            fetchList().then(re=>{
                this.TBDATA = re.result.data
            })
            this.loading = false;
        },
        deleteUser(){
            let that = this.$router
            deleteUser(this.deleteItem).then(re=>{
                this.$message({
                    type:'success',
                    message:re.msg
                })
                this.getData()
            }).catch(err=>{
                this.$message({
                    type:'error',
                    message:err.message
                })                 
            })
            this.dialogDeleteVisible = false
        },
        editUser(id){
            console.log(id)
            this.$router.push('update/' + id)
        }
    }
}

</script>

<style scoped>
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