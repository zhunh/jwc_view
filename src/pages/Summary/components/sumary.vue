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
        size="small"
        :cell-class-name="tableCellClassName"
        style="width: 100%"
        >
        <!-- <el-table-column type="selection" fixed="left"></el-table-column> -->
        <el-table-column type="index" fixed="left"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="major_name" fixed="left" label="专业名称"></el-table-column>
        <el-table-column prop="major_code" :render-header="labelRender" label="专业代码"></el-table-column>
        <el-table-column prop="teacher_num" :render-header="labelRender" label="专任教师人数"></el-table-column>
        <el-table-column prop="student_at_school" :render-header="labelRender" min-width="100" label="在校生人数" :sortable="true"></el-table-column>
        <el-table-column prop="teacher_of_dr" :render-header="labelRender" label="博士学位教师"></el-table-column>
        <el-table-column prop="full_professor" :render-header="labelRender" label="正高"></el-table-column>
        <el-table-column prop="associate_professor" :render-header="labelRender" label="副高"></el-table-column>
        <el-table-column prop="value_of_equipment" :render-header="labelRender" label="仪器设备总值"></el-table-column>
        <el-table-column prop="year" label="年份"></el-table-column>

        <el-table-column label="就业率">
          <el-table-column prop="er[0].employment_rate" min-width="90" label="2016年" :sortable="true"></el-table-column>
          <el-table-column prop="er[1].employment_rate" min-width="90" label="2017年" :sortable="true"></el-table-column>
          <el-table-column prop="er[2].employment_rate" min-width="90" label="2018年" :sortable="true"></el-table-column>
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
          <el-table-column prop="tpp[0].teaching_project_province_num" label="2016年"></el-table-column>
          <el-table-column prop="tpp[1].teaching_project_province_num" label="2017年"></el-table-column>
          <el-table-column prop="tpp[2].teaching_project_province_num" label="2018年"></el-table-column>
        </el-table-column>  
        
        <el-table-column prop="ep.engineering_project_num" :render-header="labelRender" label="主持省级以上本科教学工程"></el-table-column>       
        <el-table-column prop="ta.teaching_achievement_award" :render-header="labelRender" label="近十年教学成果奖"></el-table-column>                                              
        
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
    :with-header="false"
    :show-close="false"
    :destroy-on-close="true"
    @opened="drawerOpen()"
    >
      <el-row>
        <div>专业名称：<el-tag type="success">{{checkLook.major_name}}</el-tag></div>
        <div>专业代码：{{checkLook.major_code}}</div>
        <div>专任教师人数：{{checkLook.teacher_num}}</div>
        <div>在校生人数：{{checkLook.student_at_school}}</div>
        <div>博士学位教师数：{{checkLook.teacher_of_dr}}</div>
        <div>正高：{{checkLook.full_professor}}</div>
        <div>副高：{{checkLook.associate_professor}}</div>
        <div>仪器设备总值：{{checkLook.value_of_equipment}}</div>
        
    <!-- <span v-for="(value,name) in checkLook" :key="name">{{ name }}:{{ value }}</span> -->
        <div id="myEchart01" ref="myEchart01" style="width:400px;height:200px"></div>
        <div ref="myEchart02" style="width:400px;height:200px"></div>
        <!-- 
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
        <div>近十年教学成果奖：{{checkLook.ta.teaching_achievement_award}}</div> -->
        </el-row>
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
.el-row{
  max-height: 100vh;
  padding: 0px 20px 0px 20px;
  overflow: auto;
  /* border: 1px solid; */
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
        // associate_professor: '',
        // ep: {engineering_project_num: ''},
        // // er: {employment_rate: ''},
        // er:[],
        // full_professor: '',
        // major_code: '',
        // major_name: "",
        // mcr: [{major_convert_rate: ""}],
        // pr: [{postgraduate_rate: ''}],
        // rp: [{research_paper: '', }],
        // student_at_school: '',
        // ta: [{major_name: "", teaching_achievement_award: ''}],
        // teacher_num: '',
        // teacher_of_dr: '',
        // tpp: {teaching_project_province_num: 0},
        // value_of_equipment: '',
        // year: ""          
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
    labelRender(h,{column,index}){
      console.log(h,index)
      let l = column.label.length
      if(l>4){
        // return h('el-tooltip',{style:{width:'100%'}},[column.label.slice(0,l-1)])
        return h('el-tooltip',{
          props:{
            content:column.label,
          },
          placement:'top',
          domProps:{
            innerHTML:column.label.slice(0,3)+'...'
          }
        },[h('span')])
      }else{
        return column.label
      }
    },
    drawerOpen(){
      let myChart01 = this.$echarts.init(this.$refs.myEchart01)  
      myChart01.showLoading();
      let myChart02 = this.$echarts.init(this.$refs.myEchart02)  
      myChart02.showLoading()      
      // 数据处理01
      let er = this.checkLook.er
      let pr = this.checkLook.pr
      let tr = this.checkLook.tr
      // 有百分号的先去掉百分号
      let mcr = this.checkLook.mcr.map(item=>{
        item.major_convert_rate = parseFloat(item.major_convert_rate)
        return item
      })
      let data01 = [
        ...er,
        ...pr,
        ...mcr,
        ...tr
      ]
      // 数据处理02
      let rp = this.checkLook.rp
      let scc = this.checkLook.scc
      let spp = this.checkLook.spp
      let tpp = this.checkLook.tpp
      let data02 = [
        ...rp,
        ...scc,
        ...spp,
        ...tpp
      ] 
      // 画柱状图01
      let option01 = this.drawLine01(data01)
      myChart01.setOption(option01);       
      myChart01.hideLoading()    
      // 画柱状图02
      let option02 = this.drawLine02(data02)
      myChart02.setOption(option02); 
      myChart02.hideLoading()
    },
    drawLine01(data01){
      // let myChart = this.$echarts.init(document.getElementById("myEchart01"))
      
      // myChart.on('click', function (params) {
      //     console.log(params.name);
      // });      
      let option01 = {
          title:{
            // text:"近三年就业率、考研率、调剂率、转出率"
          },
          legend: {
              // type: 'scroll',
              // orient: 'vertical',
              // left: 0,
              // top: 0,
              // bottom: 20,
              // data: ['就业率','考研率','调剂率','转出率'],
              // selected: {'就业率':true}
          },
          tooltip: {},
          label: {
            // show:true,
            // formatter:'{b}\n{c}'
          },
          dataset: {          
            dimensions: ['year', 'employment_rate','postgraduate_rate','major_convert_rate','turnout_rate'],
            source: data01
          },
          // toolbox: {
          //     show: true,
          //     feature: {
          //         dataZoom: {
          //             yAxisIndex: 'none'
          //         },
          //         dataView: {readOnly: false},
          //         magicType: {type: ['line', 'bar']},
          //         restore: {},
          //         saveAsImage: {}
          //     }
          // },          
          xAxis: {type: 'category'},
          yAxis: {},
          series: [
            {type: 'bar', name:'就业率'},
            {type: 'bar', name:'考研率'},
            {type: 'bar', name:'调剂率'},
            {type: 'bar', name:'转出率'}
          ]
      };   
      return option01 
    },
    drawLine02(data02){
      // let myChart = this.$echarts.init(document.getElementById("myEchart02"))
      // let myChart = this.$echarts.init(this.$refs.myEchart02)
      let option02 = {
          title:{},
          legend: {},
          tooltip: {},
          label: {},
          dataset: {          
            dimensions: ['year', 'student_course_contest','student_paper_patent','research_paper','teaching_project_province_num'],
            source: data02
          },          
          xAxis: {
            type: 'category',
          },
          yAxis: {
            type:'value',
            minInterval: 1
          },
          series: [
            {type: 'bar', name:'学生学科竞赛'},
            {type: 'bar', name:'学生论文专利'},
            {type: 'bar', name:'教改论文'},
            {type: 'bar', name:'主持省级以上教研项目'}
          ]
      };      
      // myChart.setOption(option);
      return option02
    },    
    handleClick(obj) {
      this.drawer = true;
      this.checkLook = obj
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
  mounted() {
    // this.drawLine();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>