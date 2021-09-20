<template>
  <div class="header-search">
      <span :width="width" :height="height" class="button-desc">{{description}}</span>
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
    btn: String,
    width: String,
    height: String,
  },
  methods: {
    onClick() {
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
</style>
