<template>
  <div>
    <!--操作栏-->
    <el-row>
      <el-col :span="12" class="grid" :offset="0">
        <!-- <el-button type="primary" icon="el-icon-edit" size="mini" circle></el-button>
        <el-button type="warning" icon="el-icon-share" size="mini"></el-button> -->
        <el-button type="info" icon="el-icon-delete" size="mini"></el-button>
        <!-- <el-button type="danger" icon="el-icon-download" size="mini" @click="export2excel">导出</el-button>
        <el-button type="primary" size="mini">
          上传
          <i class="el-icon-upload el-icon--right"></i>
        </el-button> -->
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
          border
          style="width: 100%"
        >
          <el-table-column align="center" type="selection" fixed="left"></el-table-column>
          <el-table-column align="center" type="index" fixed="left"></el-table-column>
          <el-table-column align="center" :show-overflow-tooltip="true" prop="major_name" label="专业名称">
            <template slot-scope="{row}">
              <span>{{row.major_name}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="专业代码">
            <template slot-scope="{row}">
              <span>{{row.major_code}}</span>
            </template>            
          </el-table-column>

          <el-table-column align="center" width="100" label="专任教师人数">
            <template slot-scope="{row}">
              <el-input v-if="row.edit" v-model="row.teacher_num" size="mini"></el-input>
              <span v-else>{{row.teacher_num}}</span>
            </template>              
          </el-table-column>

          <el-table-column align="center" width="110" label="在校生人数" :sortable="true">
            <template slot-scope="{row}">
              <el-input v-if="row.edit" v-model="row.student_at_school" size="mini"></el-input>
              <span v-else>{{row.student_at_school}}</span>
            </template>             
          </el-table-column>

          <el-table-column align="center" width="100" label="博士学位教师">
            <template slot-scope="{row}">
              <el-input v-if="row.edit" v-model="row.teacher_of_dr" size="mini"></el-input>
              <span v-else>{{row.teacher_of_dr}}</span>
            </template>              
          </el-table-column>

          <el-table-column align="center" label="正高">
            <template slot-scope="{row}">
              <el-input v-if="row.edit" v-model="row.full_professor" size="mini"></el-input>
              <span v-else>{{row.full_professor}}</span>
            </template>             
          </el-table-column>

          <el-table-column align="center" label="副高">
            <template slot-scope="{row}">
              <el-input v-if="row.edit" v-model="row.associate_professor" size="mini"></el-input>
              <span v-else>{{row.associate_professor}}</span>
            </template>             
          </el-table-column>

          <el-table-column align="center" width="100" label="仪器设备总值">
            <template slot-scope="{row}">
              <el-input v-if="row.edit" v-model="row.value_of_equipment" size="mini"></el-input>
              <span v-else>{{row.value_of_equipment}}</span>
            </template>              
          </el-table-column>

          <el-table-column align="center" label="年份">
            <template slot-scope="{row}">
              <el-input v-if="row.edit" v-model="row.year" size="mini"></el-input>
              <span v-else>{{row.year}}</span>
            </template>            
          </el-table-column>

          <el-table-column align="center" :show-overflow-tooltip="true" width="100" label="填报时间" :sortable="true">
            <template slot-scope="{row}">
              <span>{{row.post_time}}</span>
            </template>            
          </el-table-column>

          <el-table-column align="center" label="填报人">
            <template slot-scope="{row}">
              <span>{{row.poster}}</span>
            </template>               
          </el-table-column>

          <el-table-column :show-overflow-tooltip="true" prop="remarks" label="备注">
            <template slot-scope="{row}">
              <el-input v-if="row.edit" v-model="row.remarks" size="mini"></el-input>
              <span v-else>{{row.remarks}}</span>
            </template>             
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <el-button type="text" size="small" @click="confirmEdit(row)">确定</el-button>
                <el-button type="text" size="small" @click="cancelEdit(row)">取消</el-button>
              </template>
              <template v-else>
                <el-button @click="handleClick(row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small" @click="row.edit=true">编辑</el-button>
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
      <el-card class="box-card" shadow="never">
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
import { fetchList,updateCo } from '@/api/basicCondition'
import SelectYear from '@/components/SelectYear'
export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      tableData: [],
      checkLook: {},
      searchKey:'',
      page: {
        selectYear:'all',
        key:'',
        pageSize: 10,
        total: 20,
        currentPage: 1
        //pageCount: 1
      }
    };
  },
  components:{
    SelectYear
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
      fetchList(this.page).then((data)=>{
        this.tableData = data.result.result.map(v => {
          this.$set(v, 'edit', false) 
          v.oriTn = v.teacher_num
          v.oriStu = v.student_at_school
          v.oriDr = v.teacher_of_dr
          v.oriFp = v.full_professor
          v.oriAp = v.associate_professor
          v.oriEqu = v.value_of_equipment
          v.oriYear = v.year
          v.oriRemark = v.remarks
          return v
        })        
        this.page.total = data.result.total;
        this.loading = false;
      })    
    },
    confirmEdit(v) {
      v.edit = false;
      v.oriTn = v.teacher_num
      v.oriStu = v.student_at_school
      v.oriDr = v.teacher_of_dr
      v.oriFp = v.full_professor
      v.oriAp = v.associate_professor
      v.oriEqu = v.value_of_equipment
      v.oriYear = v.year
      v.oriRemark = v.remarks
      let tmp = {...v}
      delete tmp.edit
      delete tmp.oriTn
      delete tmp.oriStu
      delete tmp.oriDr
      delete tmp.oriFp
      delete tmp.oriAp
      delete tmp.oriEqu
      delete tmp.oriYear
      delete tmp.oriRemark
      updateCo(tmp).then(re=>{
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
    },    
    cancelEdit(row){
      row.teacher_num = row.oriTn
      row.student_at_school = row.oriStu
      row.teacher_of_dr = row.oriDr
      row.full_professor = row.oriFp
      row.associate_professor = row.oriAp
      row.value_of_equipment = row.oriEqu
      row.yearv = row.oriYear
      row.remarks = row.oriRemark
      row.edit = false
      this.$message({
        message: '取消修改',
        type: 'warning'
      })
    },
    search(){
      this.page.key = this.searchKey.trim()
    },
    //导出为Excel
    export2excel(){
        
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