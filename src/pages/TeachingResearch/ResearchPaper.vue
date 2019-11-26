<template>
  <div>
    <!--操作栏-->
    <el-row>
      <el-col :span="12" class="grid" :offset="0">
        <el-button type="primary" icon="el-icon-edit" size="mini" circle></el-button>
        <el-button type="warning" icon="el-icon-share" size="mini"></el-button>
        <el-button type="info" icon="el-icon-delete" size="mini"></el-button>
        <el-button type="danger" icon="el-icon-download" size="mini">导出</el-button>
        <el-button type="primary" size="mini">
          上传
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
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
          tooltip-effect="dark"
          size="small"
          style="width: 100%"
        >
          <el-table-column type="selection" fixed="left"></el-table-column>
          <el-table-column type="index" fixed="left"></el-table-column>
          <el-table-column prop="major_name" label="专业名称"></el-table-column>
          <el-table-column prop="major_code" label="专业代码"></el-table-column>
          <el-table-column label-class-name="success-row" prop="research_paper" label="教改论文" :sortable="true">
          </el-table-column>
          <el-table-column prop="year" label="年份"
          :filters="[{text:'2019',value:'2019'},{text:'2018',value:'2018'},{text:'2017',value:'2017'}]"
          :filter-method="filterHandler"
          filter-placement="bottom-end"
          ></el-table-column>
          <el-table-column prop="post_time" label="填报时间" :sortable="true"></el-table-column>
          <el-table-column prop="poster" label="填报人"></el-table-column>
          <el-table-column prop="remarks" label="备注" width="110"></el-table-column>
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
import { fetchList } from "@/api/researchPaper";
import SelectYear from "@/components/SelectYear"
export default {
  data() {
    return {
      dialogVisible: false,
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
        this.tableData = data.result.result;
        this.page.total = data.result.total;
        this.loading = false;        
      })    
    },
    search(){
      this.page.key = this.searchKey.trim()
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