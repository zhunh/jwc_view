<template>
    <div>
    <el-card class="box-card" shadow="never">
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
        size="medium"
        :cell-class-name="tableCellClassName"
        style="width: 100%"
        >
        <!-- <el-table-column type="selection" fixed="left"></el-table-column> -->
        <el-table-column type="index" fixed="left"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="major_name" fixed="left" label="专业名称"></el-table-column>
        <el-table-column prop="major_code" label="专业代码"></el-table-column>
        <el-table-column prop="teacher_num" width="100" label="专任教\/n师人数"></el-table-column>
        <el-table-column prop="student_at_school" width="110" label="在校生人数" :sortable="true"></el-table-column>
        <el-table-column prop="teacher_of_dr" width="100" label="博士学位教师"></el-table-column>
        <el-table-column prop="full_professor" label="正高"></el-table-column>
        <el-table-column prop="associate_professor" label="副高"></el-table-column>
        <el-table-column prop="value_of_equipment" width="100" label="仪器设备总值"></el-table-column>
        <el-table-column prop="year" label="年份"></el-table-column>

        <el-table-column label="就业率">
          <el-table-column prop="er[0].employment_rate" width="100" label="2016年" :sortable="true"></el-table-column>
          <el-table-column prop="er[1].employment_rate" width="100" label="2017年" :sortable="true"></el-table-column>
          <el-table-column prop="er[2].employment_rate" width="100" label="2018年" :sortable="true"></el-table-column>
        </el-table-column>

        <el-table-column label="调剂率">
          <el-table-column prop="mcr[0].major_convert_rate" label="2016"></el-table-column>
          <el-table-column prop="mcr[1].major_convert_rate" label="2017"></el-table-column>
          <el-table-column prop="mcr[2].major_convert_rate" label="2018"></el-table-column>
        </el-table-column>

        <el-table-column label="考研率">
            <el-table-column prop="pr[0].postgraduate_rate" label="2016"></el-table-column>
            <el-table-column prop="pr[1].postgraduate_rate" label="2017"></el-table-column>
            <el-table-column prop="pr[2].postgraduate_rate" label="2018"></el-table-column>
          <!-- <el-table-column v-for="(item,index) in scope.row.pr" prop="item.postgraduate_rate" v-bind:key="index" width="110"></el-table-column> -->
        </el-table-column>

        <el-table-column label="转出率">
          <el-table-column prop="tr[0].turnout_rate" label="2016"></el-table-column>
          <el-table-column prop="tr[1].turnout_rate" label="2017"></el-table-column>
          <el-table-column prop="tr[2].turnout_rate" label="2018"></el-table-column>
        </el-table-column>

        <el-table-column label="学生学科竞赛（省三等以上）">
          <el-table-column prop="scc[0].student_course_contest" label="2015"></el-table-column>
          <el-table-column prop="scc[1].student_course_contest" label="2016"></el-table-column>
          <el-table-column prop="scc[2].student_course_contest" label="2017"></el-table-column>
          <el-table-column prop="scc[3].student_course_contest" label="2018"></el-table-column>
        </el-table-column>

        <el-table-column label="学生论文和发明专利(近四年)">
          <el-table-column prop="spp[0].student_paper_patent" label="2015"></el-table-column>
          <el-table-column prop="spp[1].student_paper_patent" label="2016"></el-table-column>
          <el-table-column prop="spp[2].student_paper_patent" label="2017"></el-table-column>
          <el-table-column prop="spp[3].student_paper_patent" label="2018"></el-table-column>
        </el-table-column>

        <el-table-column label="教改论文">
          <el-table-column prop="rp[0].research_paper" label="2016" width="110">
              <template slot-scope="scope">
              <router-link to="#">{{ scope.row.rp[0].research_paper }}</router-link>
              </template>
          </el-table-column>          
          <el-table-column prop="rp[1].research_paper" label="2017" width="110">
              <template slot-scope="scope">
              <router-link to="#">{{ scope.row.rp[1].research_paper }}</router-link>
              </template>
          </el-table-column>  
          <el-table-column prop="rp[2].research_paper" label="2018" width="110">
              <template slot-scope="scope">
              <router-link to="#">{{ scope.row.rp[2].research_paper }}</router-link>
              </template>
          </el-table-column>                      
        </el-table-column>

        <el-table-column label="主持省级以上教研项目">
          <el-table-column prop="tpp[0].teaching_project_province_num" label="2016年" width="110"></el-table-column>
          <el-table-column prop="tpp[1].teaching_project_province_num" label="2017年" width="110"></el-table-column>
          <el-table-column prop="tpp[2].teaching_project_province_num" label="2018年" width="110"></el-table-column>
        </el-table-column>  
        
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
import { fetchList } from '@/api/summary'
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
    score:function(){
      let tmp = this.tableData
      let scoreArr = tmp.map(function(value){
        // 三点运算符避免地址引用
        let newVal = {...value}
        let scoreItem = {}
        scoreItem.major_name = newVal.major_name
        scoreItem.major_code = newVal.major_code
        // 1.教师计分
        let tn = parseInt(newVal.teacher_num)
        if(isNaN(tn)){
          scoreItem.teacherScore = newVal.teacher_num
        }else{
          // 专任教师分值（大于等于16人为100，少于16人按,人数/16*100）
          scoreItem.teacherScore = tn>=16?100:(tn/16*100)
        }
        // 2.师生比（专任教师数/在校生人数）==> 大于等于1/15为100.小于1/15，用实际比值与1/15比*100
        let ssb = (newVal.teacher_num)/(newVal.student_at_school)
        if(isNaN(ssb)){
          scoreItem.ssbScore = "#"
        }else{
          // 大于等于1/15为100.小于1/15，用实际比值与1/15比*100
          scoreItem.ssbScore = (ssb>=(1/15)?100:(ssb/(1/15))*100).toFixed(2)
        }
        // 3.博士教师占比(博士教师数/专任教师数)
        let bsb = (newVal.teacher_of_dr)/(newVal.teacher_num)
        if(isNaN(bsb)){
          scoreItem.bsbScore = "#"
        }else{
          scoreItem.bsbScore = (bsb*100).toFixed(2)
        }
        // 4.副高以上职称教师占比
        let fg = (newVal.full_professor+newVal.associate_professor)/(newVal.teacher_num)
        if(isNaN(fg)){
          scoreItem.fgScore = "#"
        }else{
          scoreItem.fgScore = (fg*100).toFixed(2)
        }
        // 5.仪器设备分值
        // 6.近三年平均就业率
        let tmper = 0
        for(let i=0;i<newVal.er.length-1;i++){
          tmper+=parseFloat(newVal.er[i].employment_rate)
        }
        scoreItem.erScore = (tmper/3).toFixed(2)//保留两位小数
        // 7.调剂率分值（100-调剂率*100）
        scoreItem.mcrScore = 100-(newVal.mcr.find(item=>{
          //找出2018年该专业的调剂率
          return item.year ==='2018'
        }).major_convert_rate)*100
        // 8.转出率分值（100-转出率*100）
        scoreItem.trScore = 100-(newVal.tr.find(item=>{
          //找出2018年该专业的调剂率
          return item.year ==='2018'
        }).turnout_rate)*100        
        // 9.近三年平均考研率
        let tmppr = 0
        for(let i=0;i<newVal.pr.length-1;i++){
          tmppr += parseFloat(newVal.pr[i].postgraduate_rate)
        }
        if(isNaN(tmppr)){
          scoreItem.prScore = "#"
        }else{
          let pr = (tmppr/3).toFixed(2)
          scoreItem.prScore = pr>1?pr:pr*100//判断一下带%没
        }
        // 10.该专业近四年学科竞赛成果数量
        let tmpscc = 0
        for(let i=0;i<newVal.scc.length-1;i++){
          tmpscc+=parseInt(newVal.scc[i].student_course_contest)
        }
        scoreItem.sccScore = tmpscc>=10?100:tmpscc*10
        // 11.该专业近四年学生发表论文或专利数量
        let tmpspp = 0
        for(let i=0;i<newVal.spp.length-1;i++){
          tmpspp+=parseInt(newVal.spp[i].student_paper_patent)
        }
        scoreItem.sppScore = tmpspp>=10?100:tmpspp*10
        // 12.教师教改论文数量（近三年）
        let tmprp = 0
        for(let i=0;i<newVal.rp.length-1;i++){
          tmprp+=parseInt(newVal.rp[i].research_paper)
        }
        scoreItem.rpScore = tmprp>=10?100:tmprp*10  
        // 13.教研项目数量（近三年）
        let tmptpp = 0
        for(let i=0;i<newVal.tpp.length-1;i++){
          tmptpp+=parseInt(newVal.tpp[i].teaching_project_province_num)
        }
        scoreItem.tppScore = tmptpp>=10?100:tmptpp*10  
        // 14.教学成果奖（近十年）===>1项50分，大于或等于2为100
        let tmpta = 0
        for(let i=0;i<newVal.ta.length-1;i++){
          tmpta+=parseInt(newVal.ta[i].teaching_achievement_award)
        }
        scoreItem.taScore = tmpta>=2?100:tmpta*50      
                           
        return scoreItem
      })
      
      return scoreArr
    }
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