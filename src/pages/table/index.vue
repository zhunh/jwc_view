<template>
  <div>
    <!--操作栏-->
    <el-row>
      <el-col :span="24" class="grid" :offset="0">
        <FileName v-model="filename"/>
        <BookType v-model="bookType"/>
        <el-button :loading="downloadLoading" type="danger" icon="el-icon-document" size="mini" @click="export2excel">导出</el-button>
        <el-button type="primary" icon="el-icon-edit" size="mini" circle></el-button>
        <el-button type="warning" icon="el-icon-share" size="mini"></el-button>
        <el-button type="info" icon="el-icon-delete" size="mini" @click="deleteRows"></el-button>
        <el-button type="primary" size="mini">
          上传
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      <!-- </el-col>
      <el-col :span="12" class="grid" :offset="0"> -->
        <el-form ref="searchForm" style="float:right; display:inline-block">
            <el-input ref="searchKey" v-model="searchKey" placeholder="请输入专业名" size="mini" style="width:150px;"></el-input>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
        </el-form>
      </el-col>

    </el-row>
    <el-row>
      <el-col>
        <el-table
          :data="tableData"
          v-loading="loading"
          max-height="500"
          :highlight-current-row="true"
          :fit="true"
          tooltip-effect="dark"
          size="small"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40" fixed="left"></el-table-column>
          <el-table-column type="index" width="40" fixed="left"></el-table-column>
          <el-table-column prop="post_year" label="填报年份" width></el-table-column>
          <el-table-column prop="major_code_school" label="校内专业代码" width="105"></el-table-column>
          <el-table-column prop="major_name_school" label="校内专业名称" min-width="110"></el-table-column>
          <el-table-column prop="major_name" label="专业名称"></el-table-column>
          <el-table-column prop="major_code" label="专业代码"></el-table-column>
          <el-table-column prop="code_version" label="代码版本"></el-table-column>
          <el-table-column prop="academy" label="所属单位名称" min-width="110"></el-table-column>
          <el-table-column prop="academy_code" label="所属单位号" width="110"></el-table-column>
          <el-table-column prop="major_start_year" label="专业设置年份" :sortable="true" width="120"></el-table-column>
          <el-table-column prop="schooling_year" label="学制"></el-table-column>
          <el-table-column prop="schooling_year_max" label="允许修业年限" width="110"></el-table-column>
          <el-table-column prop="degree_awarding_category" label="授予学位门类" width="110"></el-table-column>
          <el-table-column prop="recruit_state" label="招生状态"></el-table-column>
          <el-table-column prop="new_yn" label="是否新专业" width="100"></el-table-column>
          <el-table-column prop="teachers_yn" label="是否师范类专业" width="120"></el-table-column>
          <el-table-column prop="post_user" label="填报人" min-width="120"></el-table-column>
          <el-table-column prop="post_time" label="填报时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 分页栏 -->
    <el-row>
      <el-col class="grid">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 50, 100]"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          v-on:size-change="sizeChange"
          v-on:current-change="currentChange"
          v-on:prev-click="prevClick"
          v-on:next-click="nextClick"
        ></el-pagination>
      </el-col>
    </el-row>
    <!--对话框  -->
    <el-dialog title="详情" :visible.sync="dialogVisible" width="30%">
      <el-card class="box-card">
        <div v-for="(value,name) in checkLook" :key="name">{{ name }}:{{ value }}</div>
      </el-card>
      <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>-->
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import BookType from '@/components/ExportBookType'
import FileName from '@/components/ExportFileName'
export default {
  components: { BookType, FileName },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      downloadLoading:false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      tableData: [],
      multipleSelection: [],
      checkLook: {},
      searchKey:'',
      page: {
        key:'',
        pageSize: 10,
        total: 20,
        currentPage: 1
        //pageCount: 1
      }
    };
  },
  computed:{
    deleteSelection:function(){
      let deArray = new Array();
      this.multipleSelection.forEach(element => {
        if(element._id!==null&&element._id!==undefined){
          deArray.push(element._id)
        }       
      });
      return deArray
    }
  },
  methods: {
    handleClick(obj) {
      this.dialogVisible = true;
      this.checkLook = obj;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(cc) {
      this.page.currentPage = cc;
    },
    prevClick(pp) {
      this.page.currentPage = pp;
    },
    nextClick(nc) {
      this.page.currentPage = nc;
    },
    // 获取表格数据
    getData(){
      this.loading = true;
      axios.get(process.env.VUE_APP_APIURL + "/table/query",{
        params: this.page,
        headers: {'AccessToken': sessionStorage.getItem('jwctoken')},
      }).then(data => {
        this.tableData = data.data.data.result;
        this.page.total = data.data.data.total;
        this.loading = false;
      }).catch((err)=>{
        this.$message({
          message: err.message,
          type: 'error'       
        });
        this.loading = false;
      });      
    },
    deleteRows(){
      this.loading = true;
      axios.post(process.env.VUE_APP_APIURL+'/table/delete',{
        ids: this.deleteSelection,
        headers: {'AccessToken': sessionStorage.getItem('jwctoken')},        
      }).then((res)=>{
        console.log(res);
        if(res.data.code==0){
          this.$message({
            message:res.data.msg,
            type:'success'
          })
          this.getData()
        }
      }).catch((err)=>{
        this.loading = false
        this.$message({
          message:err.message,
          type:'error'
        })
      })
    },
    search(){
      this.page.key = this.searchKey.trim()
    },
    handleSelectionChange(val){
      this.multipleSelection = val;      
      this.deleteSelection.push(val._id)
    },
    // 导出Excel
    export2excel(){
      if(this.multipleSelection.length==0){
        this.$message({
          message: '请勾选要导出的记录',
          type: 'info'       
        });        
        return
      }
      this.downloadLoading = true
      import('@/utils/Export2Excel.js').then(excel => {
        const tHeader = ['序号','填报年份', '校内专业代码', '校内专业名称', '专业名称', '专业代码']
        const filterVal = ['index','post_year', 'major_code_school', 'major_name_school', 'major_name', 'major_code']
        const list = this.multipleSelection
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v,index) => filterVal.map(j => {
        if (j === 'index') {//添加一列序号
          //return parseTime(v[j])
          return index+1
        } else {
          return v[j]
        }
      }))
    }
  },
  watch: {
    // 监听 page 对象变化
    page: {
      deep: true,
      handler: function() {
        this.getData()       
      }
    }
  },
  beforeCreate() {
    this.loading = true;
  },
  created() {
    this.getData()
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px;
    /* background-color: rgb(214, 203, 203); */
  }
  .el-col {
    border-radius: 4px;
  }
  .el-col {
    border-radius: 4px;
  }
</style>