<template>
  <div class="header-search">
    <el-input placeholder="请输入" class="input"></el-input>
      <span class="search-btn"  @click="onClick()" >
          {{btn}}
      </span>
    </div>
</template>

<script>
export default {
  name: 'button-style',
  props: {
    description: String,
    btn: String
  },
  methods: {
    onClick () {
      this.$emit('onClick')
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/button-style.scss';
.input>>>.el-input__inner{
  margin-top: 2px;
  background-color: #262626;
  color: #DD700C;
  border-color: #DD700C;
}
</style>
