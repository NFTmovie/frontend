<template>
  <div class="content-list">
    <ul class="section-content" v-if="auctionList.length">
      <li class="content-item" v-for="(item, index) in auctionList" :key="index">
        <div class="kuo" @click="goAblum(item)">
          <img class="item-img" :src="item.picImg" alt="">
            <div class="caption"> 竞拍{{item.enddate}}结束</div>
          <div class="mask"  @click="goAblum(item)">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="BOFANG"></use>
            </svg>
          </div>
        </div>
        <p class="item-name">{{item.name}}</p>
        <p class="item-name">ID：{{item.id}}</p>
        <p class="item-name">{{item.releasedate}}</p>

        <button-style @onClick="goMovie(item)"
        btn="竞拍" :description= "'当前 ' + item.price + ' QTUM'" >
        </button-style>
      </li>
    </ul>
    <ul v-else>
      <li class="content-item">
        <div class="kuo" @click="goAblum(auctionList)">
          <img class="item-img" :src="auctionList.picImg" alt="">
          <div class="caption"> 竞拍{{auctionList.enddate}}结束</div>
          <div class="mask"  @click="goAblum(auctionList)">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="BOFANG"></use>
            </svg>
          </div>
        </div>
        <p class="item-name">{{auctionList.name}}</p>
        <p class="item-name">ID：{{auctionList.id}}</p>
        <p class="item-name">{{auctionList.releasedate}}</p>

        <button-style @onClick="goMovie(auctionList)"
                      btn="竞拍" :description= "'当前 ' + auctionList.price + ' QTUM'" >
        </button-style>
      </li>
    </ul>
  </div>
</template>

<script>
import mixin from '../mixins'
import { ICON } from '../assets/icon/index'
import ButtonStyle from './ButtonStyle.vue'

export default {
  name: 'auction-list',
  mixins: [mixin],
  components: {
    ButtonStyle
  },
  props: {
    auctionList: Array,
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
@import '../assets/css/auction-list.scss';
</style>
