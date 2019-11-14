<template>
  <div style="display:inline-block;margin:20 0 20 0">
    <!-- <label class="radio-label" style="padding-left:0;">文件名: </label> -->
    <el-input v-model="filename" placeholder="导出文件名(默认 excel-list)" style="width:200px;" prefix-icon="el-icon-document" size="mini"/>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    filename: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
