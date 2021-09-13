<template>
  <div class="header-search">
      <span class="button-desc">{{description}}</span>
      <span class="search-btn"  @click="goSearch()" >
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
    click: Object,
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
