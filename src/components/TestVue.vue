<template>
  <div>
    <h1>仓库中 name 为：{{ name }}</h1>
    <button @click="setNameSync({ newName: 'yu'})">点击修改name</button>
  </div>
</template>

<script>
// 1.引入辅助函数
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  // 2.定义计算属性
  computed: {
    ...mapState(["name"]),
    list01: function(){
      return ["sd","df"]
    }
  },
  methods:{
    ...mapMutations(["setName"]),
    // 上式展开如下：
    // setName(name){
    //   this.$store.commit({
    //     type:'setName',
    //     newName:name
    //   })
    // }
    ...mapActions(["setNameSync"]),
    // 上式展开如下：
    ...{
      setNameSync(obj){
        this.$store.dispatch("setNameSync",obj)
      }
    }
  }
}
</script>