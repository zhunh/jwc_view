<template>
<!-- 只包含头部的的router-view -->
    <div>
        <el-row>
            <el-col>
                <Headerq />
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <router-view/>
            </el-col>
        </el-row>        
    </div>
</template>
<script>
import Headerq from './header'
export default {
    name: 'Layout',
    data(){
      return {}
    },
    components: {
        Headerq
    }
}
</script>
<style scoped>

</style>