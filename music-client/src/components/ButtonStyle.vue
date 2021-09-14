<template>
  <div class="header-search">
      <span class="button-desc">{{description}}</span>
      <span class="search-btn"  @click="goDetail()" >
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
    path: String,
  },
  methods: {
    goDetail () {
      this.$router.push({path: this.path})
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
