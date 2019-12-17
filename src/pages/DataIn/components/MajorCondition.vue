<template>
    <el-card>
    <el-row>
        <el-col :span="6">
          <br>
        </el-col>
        <el-col :span="12">
            <el-form :model="conditionForm" :rules="rules" ref="conditionForm" label-width="200px">
                <el-form-item label="年份" prop="year" size="mini">
                    <el-select v-model="conditionForm.year" placeholder="请选择年份">
                    <el-option label="2019" value="2019"></el-option>
                    <el-option label="2018" value="2018"></el-option>
                    </el-select>
                </el-form-item>        
                <el-form-item label="专业" prop="selectMajor.major_name_school">
                    <el-select v-model="conditionForm.selectMajor" value-key="major_name_school" filterable placeholder="请选择专业">
                        <el-option
                        v-for="item in majorList"
                        :key="item._id"
                        :label="item.major_name_school"
                        :value="item">
                        </el-option>
                    </el-select>                    
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item label="专任教师人数" prop="teacher_num">
                    <el-input-number v-model="conditionForm.teacher_num"></el-input-number>
                </el-form-item>
                <el-form-item label="在校生人数" prop="student_at_school">
                    <el-input-number v-model="conditionForm.student_at_school"></el-input-number>
                </el-form-item>
                <el-form-item label="博士学位教师" prop="teacher_of_dr">
                    <el-input-number v-model="conditionForm.teacher_of_dr"></el-input-number>
                </el-form-item>
                <el-form-item label="正高" prop="full_professor">
                    <el-input-number v-model="conditionForm.full_professor"></el-input-number>
                </el-form-item>    
                <el-form-item label="副高" prop="associate_professor">
                    <el-input-number v-model="conditionForm.associate_professor"></el-input-number>
                </el-form-item> 
                <el-form-item label="仪器设备总值" prop="value_of_equipment">
                    <el-input-number v-model="conditionForm.value_of_equipment"></el-input-number>
                </el-form-item>        
                <el-form-item label="备注" prop="remarks">
                    <el-input type="textarea" v-model="conditionForm.remarks"></el-input>
                </el-form-item>                
                <el-divider></el-divider>                                  
                <el-form-item>
                    <el-button type="primary" @click="submitForm('conditionForm')">立即创建</el-button>
                    <el-button @click="resetForm('conditionForm')">重置</el-button>
                </el-form-item>
            </el-form>   
        </el-col>
    </el-row> 
    </el-card> 
</template>
<style scoped>
/* .el-row{
    background: url('~@/assets/bg-pic/doodles.png');
    background-repeat: "repeat";   
} */
</style>
<script>
import { mapState } from 'vuex'
import { addCo } from '@/api/basicCondition'
  export default {
    data() {
      let usr;
      if(sessionStorage.getItem('userInfo')){
         usr = JSON.parse(sessionStorage.getItem('userInfo')).username;
      }
      
      var validateUser = (rule, value, callback) => {
        if (value === ''||value === null) {
          this.$message({
            type:"error",
            message:"用户未登陆，不允许操作"
          })
          callback(new Error('请再次输入密码'));
        } else {
          callback();
        }
      };      
      return {
        conditionForm: {
          year:'',
          selectMajor: {},
          teacher_num: '',
          student_at_school: '',
          teacher_of_dr: '',
          full_professor: '',
          associate_professor: '',
          value_of_equipment: '',
          post_time: new Date(),
          poster:usr,
          remarks:''
        },
        rules: {
          year: [
            { type: 'string', required: true, message: '请选择年份', trigger: 'change' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          "selectMajor.major_name_school": [
            { required: true, message: '请选择专业', trigger: 'change' }
          ],
          teacher_num: [
            { required: true, message: '请填写教师人数', trigger: 'blur' }
          ],
          student_at_school: [
            { required: true, message: '请填写在校生人数', trigger: 'blur' }
          ],
          teacher_of_dr: [
            { required: true, message: '请填写博士学位教师人数', trigger: 'blur' }
          ],
          full_professor: [
            { required: true, message: '请填写正高人数', trigger: 'blur' }
          ],
          associate_professor: [
            { required: true, message: '请填写副高人数', trigger: 'blur' }
          ],
          value_of_equipment: [
            { required: true, message: '请填写仪器设备总值', trigger: 'blur' }
          ],
          remarks: [
            { required: false, message: '请填写备注', trigger: 'blur' }
          ],
          poster:[
            { validator:validateUser }
          ]                        
        },      
      };
    },
    computed:{
      ...mapState(["majorList"])
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({message:"验证通过，准备上传数据..",duration: 1*1000})
            let tmp = {...this.conditionForm}
            delete tmp.selectMajor
            tmp.major_name = this.conditionForm.selectMajor.major_name_school
            tmp.major_code = this.conditionForm.selectMajor.major_code_school
            addCo(tmp).then(res=>{
              this.$message({message:res.msg,type:"success"})
            }).catch(err=>{
              this.$message({message:err.message,type:"error"})
            })
          } else {
            console.log('验证失败');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>