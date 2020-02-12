<template>
    <div>
        <Header/>
        <mainbody/>
    </div>
</template>

<script>
import Header from '../../Layout/header'
import mainbody from './index_content'
export default {
    components:{
        Header,
        mainbody
    }
}
</script>