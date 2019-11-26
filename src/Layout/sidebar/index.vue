<template>
    <div>
    <el-menu
      default-active="3"
      class="el-menu-test"
      :collapse="isCollapse"
      :default-openeds='["1"]'
      @open="handleOpen"
      @close="handleClose"
      active-text-color="red"
      router>
      <el-menu-item @click="isCollapse=!isCollapse">
        <i v-if="isCollapse" class="el-icon-s-unfold"></i>
        <i v-else class="el-icon-s-fold"></i>
        <span slot="title">展开/折叠</span>
      </el-menu-item>       
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-promotion"></i>
          <span>培养质量</span>
        </template>
        <el-menu-item index="/major/er">就业率</el-menu-item>
        <el-menu-item index="/major/pr">考研率</el-menu-item>
        <el-menu-item index="/major/mcr">调剂率</el-menu-item>
        <el-menu-item index="#">学生学科竞赛成果</el-menu-item>
        <el-menu-item index="#">学生发表论文或专利</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>教学研究</span>
        </template>
        <el-menu-item index="/major/rp">教改论文</el-menu-item>
        <el-menu-item index="/major/tpp">教师主持省级教研项目</el-menu-item>
        <el-menu-item index="/major/ep">教师主持本科教学工程</el-menu-item>
        <el-menu-item index="/major/ta">省级以上教学成果奖</el-menu-item>
      </el-submenu>    
      <el-menu-item index="/major/table">
        <i class="el-icon-document"></i>
        <span slot="title">专业详细情况</span>
      </el-menu-item>
      <el-menu-item index="/major/condition">
        <i class="el-icon-wind-power"></i>
        <span slot="title">专业基本条件</span>
      </el-menu-item>      
      <el-menu-item index="/major/calendar">
        <i class="el-icon-date"></i>
        <span slot="title">教学日历</span>
      </el-menu-item>        
    </el-menu>
    </div>
</template>
<style>
  .el-menu-test:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
<script>
export default {
  data(){
    return {
      isCollapse:false
    }
  },
  methods:{
    handleOpen(){

    },
    handleClose(){
      
    }
  }
}
</script>