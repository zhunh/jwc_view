<template>
  <div style="display:inline-block;">
    <!-- <label class="radio-label">选择年份: </label> -->
    <el-select v-model="selectYear" style="width:80px;" size="mini">
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '2018'
    },
    allDisabled:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      options: this.allDisabled?['2018', '2017', '2016']:['2018', '2017', '2016','all']
    }
  },
  computed: {
    selectYear: {
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
