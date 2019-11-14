<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-image :src="imgSrc"></el-image>
                <el-container></el-container>
            </el-col>            
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // imgSrc:require('@/assets/playground.jpg')
            imgSrc: 'https://images.pexels.com/photos/109371/pexels-photo-109371.jpeg'
        }
    }
}
</script>
<style scoped>

</style>