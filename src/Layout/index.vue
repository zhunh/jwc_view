<template>
    <div>
        <Headerq />
        <router-view/>
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