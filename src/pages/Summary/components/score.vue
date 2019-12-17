<template>
    <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
            <span>各专业信息汇总表</span>
            <div style="float: right;">
            <SelectYear :all-disabled="true" v-model="page.selectYear"/>
            <el-button style=" padding: 3px 0" type="text">操作按钮</el-button>
            </div>
        </div>
        <el-table
        :data="tableData"
        v-loading="loading"
        max-height="500"
        :highlight-current-row="true"
        :fit="true"
        tooltip-effect="dark"
        size="small"
        :cell-class-name="tableCellClassName"
        style="width: 100%"
        >
        <el-table-column type="selection" fixed="left"></el-table-column>
        <el-table-column type="index" fixed="left"></el-table-column>
        <el-table-column prop="major_name" label="专业名称"></el-table-column>
        <el-table-column prop="major_code" label="专业代码"></el-table-column>
        <el-table-column prop="teacher_num" width="100" label="专任教师人数"></el-table-column>
        <el-table-column prop="student_at_school" width="110" label="在校生人数" :sortable="true"></el-table-column>
        <el-table-column prop="teacher_of_dr" width="100" label="博士学位教师"></el-table-column>
        <el-table-column prop="full_professor" label="正高"></el-table-column>
        <el-table-column prop="associate_professor" label="副高"></el-table-column>
        <el-table-column prop="value_of_equipment" width="100" label="仪器设备总值"></el-table-column>
        <el-table-column prop="year" label="年份"></el-table-column>
        <el-table-column label="培养质量">
        <el-table-column prop="er.employment_rate" width="100" label="就业率" :sortable="true"></el-table-column>
        <el-table-column prop="mcr.major_convert_rate" label="调剂率"></el-table-column>
        <el-table-column prop="pr.postgraduate_rate" label="考研率" width="110"></el-table-column>
        </el-table-column>
        <el-table-column prop="rp.research_paper" label="教改论文" width="110">
            <template slot-scope="scope">
            <router-link to="#">{{ scope.row.rp.research_paper }}</router-link>
            </template>
        </el-table-column>
        <el-table-column prop="tpp.teaching_project_province_num" label="主持省级以上教研项目" width="110"></el-table-column>
        <el-table-column prop="ep.engineering_project_num" label="主持省级以上本科教学工程" width="110"></el-table-column>       
        <el-table-column prop="ta.teaching_achievement_award" label="近十年教学成果奖" width="110"></el-table-column>                                              
        <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
        </el-table-column>
        </el-table>
        <!-- 分页栏 -->
        <el-row>
            <el-col class="grid" :span="24">
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
    </el-card>    
</template>
<script>
import { fetchList } from '@/api/summary'
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
        selectYear: '2018'
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
      this.loading = true,
      fetchList(this.page).then(response => {
        console.log(response)
        this.tableData = response.result.result;
        this.page.total = response.result.total;
        this.loading = false
      })     
    },
    search(){
      this.page.key = this.searchKey.trim()
    },
    //导出为Excel
    export2excel(){
        
    },
      tableCellClassName({columnIndex}) {
        if (columnIndex === 11) {
          return 'warning-row';
        } else if (columnIndex === 12) {
          return 'success-row';
        }
        return '';
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
.el-table .er{
    background: #f0f9eb;
}
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
background: #f0f9eb;
}
</style>