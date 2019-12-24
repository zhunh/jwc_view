<template>
    <div>
    <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
            <el-input label="搜索" size="mini" style="width:150px;"></el-input>
            <el-button type="primary" size="mini">搜索</el-button>
            <div style="float: right;">
            <SelectYear :all-disabled="true" v-model="page.selectYear"/>
            <el-button style=" padding: 3px 0" type="text">操作</el-button>
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
        <!-- <el-table-column type="selection" fixed="left"></el-table-column> -->
        <el-table-column type="index" fixed="left"></el-table-column>
        <el-table-column prop="major_name" fixed="left" label="专业名称"></el-table-column>
        <el-table-column prop="major_code" label="专业代码"></el-table-column>
        <el-table-column prop="teacherScore" width="100" label="专任教师人数得分"></el-table-column>
        <el-table-column prop="ssbScore" width="110" label="师生比得分" :sortable="true"></el-table-column>
        <el-table-column prop="bsbScore" width="100" label="博士学位教师占比得分"></el-table-column>
        <el-table-column prop="fgScore" label="副高以上教师人数得分"></el-table-column>
        <el-table-column prop="erScore" label="就业率"></el-table-column>
        <el-table-column prop="mcrScore" label="调剂率"></el-table-column>
        <el-table-column prop="trScore" width="100" label="转出率"></el-table-column>
        <el-table-column prop="prScore" label="考研率"></el-table-column>
        <el-table-column prop="sccScore" label="学生学科竞赛"></el-table-column>
        <el-table-column prop="sppScore" label="学生论文专利"></el-table-column>
        <el-table-column prop="rpScore" label="教改论文"></el-table-column>
        <el-table-column prop="tppScore" label="教师主持科研项目"></el-table-column>
        <el-table-column prop="epScore" label="教师主持省级教学工程项目"></el-table-column>
        <el-table-column prop="taScore" label="教学成果"></el-table-column>        
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
    <el-drawer
    title="详情"
    :visible.sync="drawer"
    :direction="direction"
    >
    <!-- <span v-for="(value,name) in checkLook" :key="name">{{ name }}:{{ value }}</span> -->
        <div>专业名称：{{checkLook.major_name}}</div>
        <div>专业代码：{{checkLook.major_code}}</div>
        <div>专任教师人数：{{checkLook.teacher_num}}</div>
        <div>在校生人数：{{checkLook.student_at_school}}</div>
        <div>博士学位教师数：{{checkLook.teacher_of_dr}}</div>
        <div>正高：{{checkLook.full_professor}}</div>
        <div>副高：{{checkLook.associate_professor}}</div>
        <div>仪器设备总值：{{checkLook.value_of_equipment}}</div>
        <div>就业率：
          <ul>
            <li v-for="(item,index) in checkLook.er" v-bind:key="index">{{item.year}}：{{item.employment_rate}}</li>
          </ul>
        </div>
        <div>调剂率：
          <ul>
            <li v-for="(item,index) in checkLook.mcr" v-bind:key="index">{{item.year}}：{{item.major_convert_rate}}</li>
          </ul>
        </div>
        <div>考研率：
          <ul>
            <li v-for="(item,index) in checkLook.pr" v-bind:key="index">{{item.year}}：{{item.postgraduate_rate}}</li>
          </ul>
        </div>
        <div>教改论文：
          <ul>
            <li v-for="(item,index) in checkLook.rp" v-bind:key="index">{{item.year}}：{{item.research_paper}}</li>
          </ul>          
        </div>
        <div>主持省级以上教研项目：
          <ul>
            <li v-for="(item,index) in checkLook.tpp" v-bind:key="index">{{item.year}}：{{item.teaching_project_province_num}}</li>
          </ul>           
        </div>
        <div>主持省级以上本科教学工程：{{checkLook.engineering_project_num}}</div>
        <div>近十年教学成果奖：{{checkLook.ta.teaching_achievement_award}}</div>
    </el-drawer>    
    </div> 
</template>
<style scoped>
.el-table .er{
    background: #f0f9eb;
}
.el-table .warning-row {
    /* background: oldlace; */
    background: red;
}

.el-table .success-row {
background: #f0f9eb;
}
</style>
<script>
import { scoreList } from '@/api/summary'
import SelectYear from "@/components/SelectYear"
export default {
  data() {
    return {
      drawer: false,
      loading: false,
      direction: 'rtl',
      tableData: [],
      checkLook: {
        associate_professor: '',
        ep: {engineering_project_num: ''},
        er: {employment_rate: ''},
        full_professor: '',
        major_code: '',
        major_name: "",
        mcr: {major_convert_rate: ""},
        pr: {postgraduate_rate: ''},
        rp: {research_paper: '', },
        student_at_school: '',
        ta: {major_name: "", teaching_achievement_award: ''},
        teacher_num: '',
        teacher_of_dr: '',
        tpp: {teaching_project_province_num: 0},
        value_of_equipment: '',
        year: ""          
      },
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
  computed:{

  },
  methods: {
    handleClick(obj) {
      this.drawer = true;
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
      scoreList(this.page).then(response => {
        console.log(response)
        this.tableData = response.result.result;
        this.page.total = response.result.total;
        this.loading = false
      })     
    },
    search(){
      this.page.key = this.searchKey.trim()
    },
    tableCellClassName({columnIndex}) {
    if (columnIndex === 1) {
        console.log("warning=row")
        return 'warning-row';
    } else if (columnIndex === 2) {
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