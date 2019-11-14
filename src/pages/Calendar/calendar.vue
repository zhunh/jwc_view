<template>
    <div>
        <el-card shadow="hover">
            <el-calendar v-model="value"></el-calendar>
        </el-card>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        value: new Date()
      }
    }
  }
</script>