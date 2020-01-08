<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogDeleteVisible"
      width="30%">
      <span>确定要删除这条记录吗？{{deleteItem}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteTpp">确 定</el-button>
      </span>
    </el-dialog>    
    <!--操作栏-->
    <el-row>
      <el-col :span="12" class="grid" :offset="0">
        <el-button type="primary" plain @click="fresh" icon="el-icon-refresh-right" size="mini">刷新</el-button>
      </el-col>
      <el-col :span="12" class="grid" :offset="0">
        <el-form ref="searchForm" style="float:right;">
            <SelectYear v-model="page.selectYear"/>
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
          border
          tooltip-effect="dark"
          size="small"
          style="width: 100%"
        >
          <!-- <el-table-column type="selection" fixed="left"></el-table-column> -->
          <el-table-column type="index" fixed="left"></el-table-column>

          <el-table-column align="center" prop="major_name" label="专业名称"
          :show-overflow-tooltip="true">
            <template slot-scope="{row}">
              <span>{{row.major_name}}</span>
            </template>            
          </el-table-column>

          <el-table-column align="center" label="专业代码">
            <template slot-scope="{row}">
              <span>{{row.major_code}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label-class-name="warning-row" label="教学主持教研项目" :sortable="true">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <el-input v-model="row.teaching_project_province_num" size="mini" class="edit-input"></el-input>
              </template>
              <span v-else>{{ row.teaching_project_province_num }}</span>
            </template>
          </el-table-column>

          <el-table-column 
          label="年份"
          align="center"
          :filters="[{text:'2019',value:'2019'},{text:'2018',value:'2018'},{text:'2017',value:'2017'}]"
          :filter-method="filterHandler"
          filter-placement="bottom-end"
          >
            <template slot-scope="{row}">
              <span>{{row.year}}</span>
            </template>
          </el-table-column>
          
          <el-table-column align="center" label="填报时间" :sortable="true">
            <template slot-scope="{row}">
              <span>{{row.post_time}}</span>
            </template>
          </el-table-column>
          
          <el-table-column label="填报人">
            <template slot-scope="{row}">
              <span>{{row.poster}}</span>
            </template>            
          </el-table-column>

          <el-table-column align="center" label="备注" :show-overflow-tooltip="true">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <el-input v-model="row.remarks" size="mini"></el-input>
              </template>
              <span v-else>{{row.remarks}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <el-button type="text"  size="mini" @click="confirmEdit(row)">确定</el-button>
                <el-button type="text" size="mini" @click="cancelEdit(row)">取消</el-button>
              </template>
              <template v-else>
                <el-button type="info" plain size="mini" @click="row.edit=!row.edit">编辑</el-button>            
                <el-button type="text" size="mini" @click="deleteItem=row._id;dialogDeleteVisible=true">删除</el-button>
              </template>
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
    </el-dialog>
  </div>
</template>

<script>
import { fetchList,updateTpp,deleteTpp } from "@/api/teachingProjectProvince";
import SelectYear from "@/components/SelectYear"
export default {
  data() {
    return {
      dialogVisible: false,
      dialogDeleteVisible: false,
      deleteItem:'',
      loading: false,
      tableData: [],
      checkLook: {},
      searchKey:'',
      page: {
        key:'',
        pageSize: 10,
        total: 20,
        currentPage: 1,
        selectYear: 'all'
      }
    };
  },
  components:{ SelectYear },
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
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }, 
    // 获取表格数据
    getData(){
      this.loading = true;
      fetchList(this.page).then((data)=>{
        //this.tableData = data.result.result;

        this.tableData = data.result.result.map(v => {
          this.$set(v, 'edit', false) 
          v.originalTpp = v.teaching_project_province_num 
          v.originalRemark = v.remarks
          return v
        })
        this.page.total = data.result.total;
        this.loading = false;
      }).catch((err)=>{
        console.log(err)
        this.loading = false
      })
    },
    search(){
      this.page.key = this.searchKey.trim()
    },
    fresh(){
      // this.$router.replace('/major/er')
      window.location.reload()
    },
    deleteTpp(){
      deleteTpp(this.deleteItem).then(re=>{
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
    cancelEdit(row) {
      row.teaching_project_province_num = row.originalTpp
      row.remarks = row.originalRemark
      row.edit = false
      this.$message({
        message: '取消修改',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false;
      row.originalTpp = row.teaching_project_province_num 
      row.originalRemark = row.remarks      
      let tmp = {...row}
      delete tmp.edit
      delete tmp.originalTpp
      delete tmp.originalRemark
      updateTpp(tmp).then(re=>{
        this.$message({
          message: re.msg,
          type: "success"
        });
      }).catch(err=>{
        this.$message({
          message: err.message,
          type: "error"
        });        
      })
    }
  },
  watch: {
    // 监听 page 对象变化
    page: {
      deep: true, //监听对象内部变化
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