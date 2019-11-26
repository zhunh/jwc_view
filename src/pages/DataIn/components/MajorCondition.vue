<template>
    <div>
    <el-row>
        <el-col :span="6">
<el-tag type="info">信息收集</el-tag>
        </el-col>
        <el-col :span="12">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px">
                <el-form-item label="年份" prop="year" size="mini">
                    <el-select v-model="ruleForm.region" placeholder="请选择年份">
                    <el-option label="2019" value="2019"></el-option>
                    <el-option label="2018" value="2018"></el-option>
                    </el-select>
                </el-form-item>        
                <el-form-item label="专业" prop="major_name">
                    <!-- <el-select v-model="ruleForm.region" placeholder="请选择专业">
                    <el-option label="区块链" value="shanghai"></el-option>
                    <el-option label="采矿工程" value="beijing"></el-option>
                    </el-select> -->
                    <el-select v-model="selectvalue" filterable placeholder="请选择专业">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>                    
                </el-form-item>
                <!-- <el-form-item label="即时配送" prop="delivery">
                    <el-switch v-model="ruleForm.delivery"></el-switch>
                </el-form-item> -->
                <el-divider></el-divider>
                <el-form-item label="专任教师人数" prop="">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="在校生人数" prop="">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="博士学位教师" prop="">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="正高" prop="">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>    
                <el-form-item label="副高" prop="">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item> 
                <el-form-item label="仪器设备总值" prop="">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>        
                <el-form-item label="备注" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>                
                <el-divider></el-divider>                                  
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>   
        </el-col>
    </el-row> 
    </div> 
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        options: [{
          value: '选项1',
          label: '区块链'
        }, {
          value: '选项2',
          label: '计算机'
        }, {
          value: '选项3',
          label: '采矿工程'
        }],
        selectvalue: ''        
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
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