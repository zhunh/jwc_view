<template>
<div v-if="userRole == 3">
  <el-row><el-page-header @back="goBack" v-bind:content="hdata"></el-page-header></el-row>
  <el-form ref="form" :rules="rules" :model="form" label-width="80px" style="width:500px;padding:10px 0 0 0;">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password"></el-input>
    </el-form-item>  
    <el-form-item label="一卡通号" prop="school_id">
      <el-input v-model="form.school_id"></el-input>
    </el-form-item>  
    <el-form-item label="权限" prop="role">
      <el-select v-model="form.role" placeholder="请选择权限">
        <el-option label="[1]仅查看" value="1"></el-option>
        <el-option label="[2]查看&添加" value="2"></el-option>
        <el-option label="[3]管理员" value="3"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="备注" prop="remark">
      <el-input type="textarea" v-model="form.remark"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">确认修改</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
<div v-else>
    无权限.
</div>
</template>
<script>
import { getOne,updateUser } from '@/api/user'
import getUser from '@/utils/GetCurrentUser'
  export default {
    data() {
      return {
        form: {
          username: '',
          password: '',
          role: '',
          school_id: '',
          remark: ''
        },
        rules:{
            username:[
                { required: true, message: '请输入用户名', trigger: 'blur' },
            ],
            password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
            ],
            role:[
                { required: true, message: '请选择权限', trigger: 'blur' },
            ],
            school_id:[
                { required: true, message: '请输入一卡通号', trigger: 'blur' },
            ]         
        }
      }
    },
    computed:{
        userRole(){
            return getUser().role
        },
        hdata(){
          return '修改用户：' + this.$route.params.id
        }
    },     
    methods: {
      goBack() {
          this.$router.push({
              path:'/user/query'
          })
      },      
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updateUser(this.form).then(re=>{
                this.$message({
                    type:'success',
                    message:re.msg
                })
                this.$router.push('/user/query')
            }).catch(err=>{
                this.$message({
                    type:'error',
                    message:err.message
                })                
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    created(){
      let tmp = this.$route.params.id
      getOne(tmp).then(re=>{
        console.log(re)
        this.form = re.result.data
      })
      console.log(tmp)      
    }
  }
</script>