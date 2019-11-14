<template>
    <div>
    <el-menu
      default-active="3"
      class="el-menu-vertical-demo"
      :default-openeds='["1"]'
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-promotion"></i>
          <span>培养质量</span>
        </template>
        <el-menu-item index="1-1">
          <router-link to="er" tag="span">
          就业率
          </router-link>
        </el-menu-item>
        <el-menu-item index="1-2">
          <router-link to="pr" tag="span">
          考研率
          </router-link>
        </el-menu-item>
        <el-menu-item index="1-3">
          <router-link to="mcr" tag="span">
          调剂率
          </router-link>
        </el-menu-item>
        <el-menu-item index="1-4">学生学科竞赛成果</el-menu-item>
        <el-menu-item index="1-5">学生发表论文或专利</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>教学研究</span>
        </template>
        <el-menu-item index="2-1">教改论文</el-menu-item>
        <el-menu-item index="2-2">教师主持省级教研项目</el-menu-item>
        <el-menu-item index="2-3">教师主持本科教学工程</el-menu-item>
        <el-menu-item index="2-4">省级以上教学成果奖</el-menu-item>
      </el-submenu>    
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">
            <router-link to="table" tag="span">专业详细情况</router-link>
        </span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-wind-power"></i>
        <span slot="title">
            <router-link to="condition" tag="span">专业基本条件</router-link>
        </span>
      </el-menu-item>      
      <el-menu-item index="5">
        <i class="el-icon-coin"></i>
        <span slot="title">教师教学发展机构</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-date"></i>
        <router-link to="calendar" tag="span">教学日历</router-link>
      </el-menu-item>        
    </el-menu>
    </div>
</template>
<script>
export default {
  methods:{
    handleOpen(){

    },
    handleClose(){
      
    }
  }
}
</script>