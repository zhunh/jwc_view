<template>
    <div class="indexStyle" :style="indexStyle">
        <!-- <el-image :src="imgSrc"></el-image> -->
        <el-row>
            <el-col :span="24">
                niaho 
            </el-col>            
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            imgSrc:require('@/assets/laptop.jpeg'),
            //  imgSrc: 'https://images.pexels.com/photos/109371/pexels-photo-109371.jpeg'
            indexStyle:{
                height: '100vh',
                width: '100%',
                backgroundImage: 'url('+require('@/assets/laptop.jpeg')+')',
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% auto",
            }
        }
    }
}
</script>