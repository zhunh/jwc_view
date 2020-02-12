<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <!-- <el-card> -->
          <span>1.请选择导入类型：</span>
        <el-radio-group v-model="radio01">
          <el-radio-button label="a">导入教改论文</el-radio-button>
          <el-radio-button label="b">导入教师主持教研项目</el-radio-button>
          <el-radio-button label="c">导入教师主持教学工程项目</el-radio-button>
        </el-radio-group>
        <span>当前选中：{{radio01}}</span>
        <el-divider></el-divider>
        <span>2.选择导入Excel文件</span>
        <ExcelImportVue :on-success="handleSuccess" :before-upload="beforeUpload" />
        <!-- </el-card> -->
      </el-col>        
    </el-row>
    <!-- <el-row>
      <el-col :span="24">
        <ExcelImportVue :on-success="handleSuccess" :before-upload="beforeUpload" />
      </el-col>    
    </el-row> -->
    <!-- 预览对话框 -->
    <el-dialog title="导入数据预览" :visible.sync="dialogTableVisible" :fullscreen="false" :center="true" width="90%" top="5vh">
      <el-table :data="tableData" border highlight-current-row :max-height="450">
        <el-table-column v-for="(item,index) of tableHeader" :key="index" :prop="item.pro" :label="item.label" />        
        <!-- <el-table-column v-for="(item,index) of tableHeader" :key="index" :prop="item" :label="item" /> -->
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="importData">确定导入</el-button>
      </span>      
    </el-dialog>

  </div>
</template>

<script>
import ExcelImportVue from '@/components/ExcelImport'
import { paperHeader } from '@/utils/TableHeaderSet'
import { importList } from '@/api/excelImport'
export default {
  name: 'UploadExcel',
  components: { ExcelImportVue },
  data() {
    return {
      dialogTableVisible:false,
      tableData: [],
      tableHeader: [],
      radio01:"b"
    }
  },
  computed:{
    selectHeader:function (){
      if (this.radio01=='a'){
        return paperHeader
      }
      return []
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: '上传文件不可大于 1 M.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      console.log(header)
      console.log(paperHeader)
      // console.log(results)
      // 1.检查表头，确认上传文件是否格式正确
      if (!this.checkHeader(this.selectHeader,header)) return
      // 2.重新组装数据
      let newArr = []
      results.forEach((value,index,results) => {
        let tmp = {}
        this.selectHeader.forEach(element => {
          console.log(results[index][element.label]);
          tmp[element.pro] = results[index][element.label]
        });
        newArr.push(tmp)
      });
// console.log(newArr)
      this.tableData = newArr
      this.tableHeader = this.selectHeader
      this.dialogTableVisible = true
    },
    checkHeader(setHeader,header){
      let tag = true
      if(setHeader.length !== header.length){
        this.$message({
          message:"上传文件表头有误，表头长度不一致",
          type:'error'
        })
        tag = false
      }
      setHeader.forEach((v,index)=>{
        // console.log(v.label+"=="+header[index]); 
        if (v.label.trim() != header[index].trim()){
          this.$message({
            message:"上传文件表头有误，表头部分字段不一致，"
          })
          tag = false
          return false
        }
      })
      return tag
    },
    importData(){
      console.log(this.tableData);
      importList(this.tableData).then(res=>{
        this.$message({
          message:res.msg,
          type:'success'
        })
      }).catch(err=>{
        this.$message({
          message:err.message,
          type:'error'
        })        
      })
      this.dialogTableVisible = false
    }
  }
}
</script>
