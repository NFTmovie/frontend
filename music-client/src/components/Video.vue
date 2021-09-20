<template>
  <div class="content-list">
    <ul class="section-content" v-if="copyrightMovies.length">
      <li class="content-item" v-for="(item, index) in copyrightMovies" :key="index">
        <div class="kuo" @click="goAblum(item)">
          <img class="item-img" :src="item.picImg" alt="">
          <div class="caption">《{{item.name}}》<br> 汇编权 </div>
          <div class="mask"  @click="goAblum(item)">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="BOFANG"></use>
            </svg>
          </div>
        </div>
        <p class="item-name">所剩数量：{{item.remaining}}</p>
        <p class="item-name">收益分成：{{item.shares}}</p>
        <p class="item-name">{{item.releasedate}}</p>
        <button-style @onClick="goMovie(item)"
                      btn="购买" :description= "item.price + ' QTUM'" >
        </button-style>
      </li>
    </ul>
    <ul v-else>
      <li class="content-item" >
        <div class="kuo" @click="goAblum(copyrightMovies)">
          <img class="item-img" :src="copyrightMovies.picImg" alt="">
          <div class="caption">《{{copyrightMovies.name}}》<br> 汇编权 </div>
          <div class="mask"  @click="goAblum(item)">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="BOFANG"></use>
            </svg>
          </div>
        </div>
        <p class="item-name">所剩数量：{{copyrightMovies.remaining}}</p>
        <p class="item-name">收益分成：{{copyrightMovies.shares}}</p>
        <p class="item-name">{{copyrightMovies.releasedate}}</p>
        <button-style @onClick="goMovie(copyrightMovies)"
                      btn="打赏" :description= "copyrightMovies.price + ' QTUM'" >
        </button-style>
      </li>
    </ul>
  </div>
</template>

<script>
import mixin from '../mixins'
import { ICON } from '../assets/icon/index'
import ButtonStyle from '../components/ButtonStyle.vue'

export default {
  name: 'video',
  mixins: [mixin],
  components: {
    ButtonStyle
  },
  props: {
    copyrightMovies: Array,
    path: String
  },
  data () {
    return {
      BOFANG: ICON.BOFANG
    }
  },
  methods: {
    goMovie (item) {
      this.$store.commit('setTempList', item)
      this.$router.push({path: `/${this.path}/${item.id}`})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/copyright-list.scss';
</style>
