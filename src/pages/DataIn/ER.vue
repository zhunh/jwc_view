<template>
    <el-row>
      <el-form :model="aForm" :rules="rules" ref="aForm" label-width="200px">
          <el-form-item label="年份" prop="year">
              <el-select v-model="aForm.year" placeholder="请选择年份">
              <el-option label="2019" value="2019"></el-option>
              <el-option label="2018" value="2018"></el-option>
              </el-select>
          </el-form-item>        
          <el-form-item label="专业" prop="selectMajor.major_name_school">
              <el-select v-model="aForm.selectMajor" value-key="major_name_school" filterable placeholder="请选择专业">
                  <el-option
                  v-for="item in majorList"
                  :key="item._id"
                  :label="item.major_name_school"
                  :value="item">
                  </el-option>
              </el-select>                    
          </el-form-item>
          
          <el-divider content-position="left">年份和专业</el-divider>

          <el-form-item label="就业率" prop="employment_rate">
            <el-input-number v-model="aForm.employment_rate"></el-input-number>
          </el-form-item>
          <el-form-item prop="er_remarks" size="mini">
            <el-input v-model="aForm.er_remarks" placeholder="备注(可不填)"></el-input>
          </el-form-item>
          <el-form-item label="考研率" prop="postgraduate_rate">
            <el-input-number v-model="aForm.postgraduate_rate"></el-input-number>
          </el-form-item>
          <el-form-item prop="pr_remarks" size="mini">
            <el-input v-model="aForm.pr_remarks" placeholder="备注(可不填)"></el-input>
          </el-form-item>                
          <el-form-item label="调剂率" prop="major_convert_rate">
            <el-input-number v-model="aForm.major_convert_rate"></el-input-number>
          </el-form-item>
          <el-form-item prop="mcr_remarks" size="mini">
            <el-input style="width:180px;" v-model="aForm.mcr_remarks" placeholder="备注(可不填)"></el-input>
          </el-form-item>   

          <el-divider content-position="left">培养质量</el-divider>

          <el-form-item label="教改论文数量" prop="research_paper">
            <el-input-number v-model="aForm.research_paper"></el-input-number>
          </el-form-item>      
          <el-form-item prop="rp_remarks" size="mini">
            <el-input v-model="aForm.rp_remarks" placeholder="备注(可不填)"></el-input>
          </el-form-item>

          <el-form-item label="主持省级教研项目数量" prop="teaching_project_province_num">
            <el-input-number v-model="aForm.teaching_project_province_num"></el-input-number>
          </el-form-item>
          <el-form-item prop="tpp_remarks"  size="mini">
            <el-input v-model="aForm.tpp_remarks" placeholder="备注(可不填)"></el-input>
          </el-form-item>
            
          <el-form-item label="主持本科教学工程项目" prop="engineering_project_num">
            <el-input-number v-model="aForm.engineering_project_num"></el-input-number>
          </el-form-item>  
          <el-form-item prop="ep_remarks" size="mini">
            <el-input v-model="aForm.ep_remarks" placeholder="备注(可不填)"></el-input>
          </el-form-item>                
          <el-form-item label="省级教学成果奖" prop="teaching_achievement_award">
            <el-input-number v-model="aForm.teaching_achievement_award"></el-input-number>
          </el-form-item>       
          <el-form-item prop="taa_remarks" size="mini">
            <el-input v-model="aForm.taa_remarks" placeholder="备注(可不填)"></el-input>
          </el-form-item>    

          <el-divider content-position="left">教学研究</el-divider>

          <el-form-item>
              <el-button type="primary" @click="submitForm('aForm')">立即创建</el-button>
              <el-button @click="resetForm('aForm')">重置</el-button>
          </el-form-item>
      </el-form>       
    </el-row> 
</template>
<style scoped>
  .el-select,.el-input{
    width:180px;
  }
  .el-divider{
    width:460px;
  }
</style>
<script>
import { mapState } from 'vuex'
import { addEr } from '@/api/employmentRate'
import { addMcr } from '@/api/majorConvertRate'
import { addRp } from '@/api/researchPaper'
import { addTa } from '@/api/teachingAward'
import { addTpp } from '@/api/teachingProjectProvince'
import { addEp } from '@/api/engineeringProject'
import { addPr } from '@/api/postgraduateRate'
  export default {
    data() {
      let usr;
      if(sessionStorage.getItem('userInfo')){
         usr = JSON.parse(sessionStorage.getItem('userInfo')).username;
      }      
      return {
        aForm: {
          year: '',
          selectMajor: {},
          employment_rate: '',
          er_remarks: '',
          postgraduate_rate: '',
          pr_remarks: '',
          major_convert_rate: '',
          mcr_remarks: '',
          research_paper: '',
          rp_remarks: '',
          teaching_project_province_num: '',
          tpp_remarks: '',
          engineering_project_num: '',
          ep_remarks: '',
          teaching_achievement_award:'',
          taa_remarks: '',
          post_time:new Date(),
          poster:usr
        },
        rules: {
          year: [
            { required: true, message: '请选择录入年份', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          "selectMajor.major_name_school": [
            { type:'string',required: true, message: '请选择专业名称', trigger: 'change' }
          ],
          employment_rate: [
            { required: true, message: '请填写就业率', trigger: 'blur' }
          ],
          postgraduate_rate: [
            { required: true, message: '请填写考研率', trigger: 'blur' }
          ],
          major_convert_rate: [
            { required: true, message: '请填写调剂率', trigger: 'blur' }
          ],
          research_paper: [
            { required: true, message: '请填写教改论文数', trigger: 'blur' }
          ],
          teaching_project_province_num: [
            { required: true, message: '请填写主持省级教学项目数', trigger: 'blur' }
          ],
          engineering_project_num: [
            { required: true, message: '请填写主持省级教学工程数', trigger: 'blur' }
          ],
          teaching_achievement_award: [
            { required: true, message: '请填写教学成果奖数', trigger: 'blur' }
          ],                    
        },        
      };
    },
    computed:{
      ...mapState(["majorList"]),
      erObj:function(){
        let tmp = {
          'year':this.aForm.year,
          major_name:this.aForm.selectMajor.major_name_school,
          major_code:this.aForm.selectMajor.major_code_school,
          employment_rate:this.aForm.employment_rate,
          post_time:this.aForm.post_time,
          poster:this.aForm.poster,
          remarks:this.aForm.er_remarks
        }
        return tmp
      },
      mcrObj:function(){
        return {
          year:this.aForm.year,
          major_name:this.aForm.selectMajor.major_name_school,
          major_code:this.aForm.selectMajor.major_code_school,
          major_convert_rate:this.aForm.major_convert_rate,
          post_time:this.aForm.post_time,
          poster:this.aForm.poster,
          remarks:this.aForm.mcr_remarks
        }
      },
      prObj:function(){
        return {
          year:this.aForm.year,
          major_name:this.aForm.selectMajor.major_name_school,
          major_code:this.aForm.selectMajor.major_code_school,
          postgraduate_rate:this.aForm.postgraduate_rate,
          post_time:this.aForm.post_time,
          poster:this.aForm.poster,
          remarks:this.aForm.pr_remarks
        }
      },      
      rpObj:function(){
        return {
          year:this.aForm.year,
          major_name:this.aForm.selectMajor.major_name_school,
          major_code:this.aForm.selectMajor.major_code_school,
          research_paper:this.aForm.research_paper,
          post_time:this.aForm.post_time,
          poster:this.aForm.poster,
          remarks:this.aForm.rp_remarks
        }
      },          
      tppObj:function(){
        return {
          year:this.aForm.year,
          major_name:this.aForm.selectMajor.major_name_school,
          major_code:this.aForm.selectMajor.major_code_school,
          teaching_project_province_num:this.aForm.teaching_project_province_num,
          post_time:this.aForm.post_time,
          poster:this.aForm.poster,
          remarks:this.aForm.tpp_remarks
        }
      },      
      epObj:function(){
        return {
          year:this.aForm.year,
          major_name:this.aForm.selectMajor.major_name_school,
          major_code:this.aForm.selectMajor.major_code_school,
          engineering_project_num:this.aForm.engineering_project_num,
          post_time:this.aForm.post_time,
          poster:this.aForm.poster,
          remarks:this.aForm.ep_remarks
        }
      },        
      taaObj:function(){
        return {
          year:this.aForm.year,
          major_name:this.aForm.selectMajor.major_name_school,
          major_code:this.aForm.selectMajor.major_code_school,
          teaching_achievement_award:this.aForm.teaching_achievement_award,
          post_time:this.aForm.post_time,
          poster:this.aForm.poster,
          remarks:this.aForm.taa_remarks
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$message({message:"验证通过，准备上传数据..",duration: 1*1000})
            //ep
            addEp(this.epObj).then(res=>{
              this.$message({
                message:res.msg,
                type:'success'
              })
            }).catch(err=>{
              this.$message({
                message:err.message,
                type:'error'
              })
            });
            //pr
            addPr(this.prObj).then(res=>{
              this.$message({
                message:res.msg,
                type:'success'
              })
            }).catch(err=>{
              this.$message({
                message:err.message,
                type:'error'
              })
            });            
            //er
            addEr(this.erObj).then(res=>{
              this.$message({
                message:res.msg,
                type:'success'
              })
            }).catch(err=>{
              this.$message({
                message:err.message,
                type:'error'
              })
            });    
            // mcr
            addMcr(this.mcrObj).then(res=>{
              this.$message({
                message:res.msg,
                type:'success'
              })
            }).catch(err=>{
              this.$message({
                message:err.message,
                type:'error'
              })
            });     
            // rp
            addRp(this.rpObj).then(res=>{
              this.$message({
                message:res.msg,
                type:'success'
              })
            }).catch(err=>{
              this.$message({
                message:err.message,
                type:'error'
              })
            });    
            // ta
            addTa(this.taaObj).then(res=>{
              this.$message({
                message:res.msg,
                type:'success'
              })
            }).catch(err=>{
              this.$message({
                message:err.message,
                type:'error'
              })
            });         
            // tpp
            addTpp(this.tppObj).then(res=>{
              this.$message({
                message:res.msg,
                type:'success'
              })
            }).catch(err=>{
              this.$message({
                message:err.message,
                type:'error'
              })
            });                            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.aForm.$refs[formName].resetFields();
      }
    },
    created(){
         this.$store.dispatch('getMajorList');
    }    
  }
</script>