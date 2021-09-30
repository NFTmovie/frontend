<template>
  <div class="content-list">
    <ul class="section-content" v-if="auctionList.length">
      <li class="content-item" v-for="(item, index) in auctionList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)" :key="index">
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
        <p class="item-name">ID：{{item.movieId}}</p>
        <p class="item-name">{{item.releasedate}}</p>

        <button-style @onClick="goMovie(item)" class="btn"
        btn="竞拍" :description= "'当前 ' + item.price + ' QTUM'" >
        </button-style>
      </li>
    </ul>
    <ul v-else>
      <li class="content-item" v-for="(item, index) in auctionList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)" :key="index">
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
    <div class="pagination">
      <el-pagination
        align="right"
        @current-change="handleCurrentChange"
        background
        layout="total, prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="auctionList.length">
      </el-pagination>
    </div>
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
      BOFANG: ICON.BOFANG,
      url: 'http://82.157.177.72:8081/',
      currentPage: 1,
      pageSize: 6,
    }
  },
  methods: {
    goMovie (item) {
      this.$store.commit('setTempList', item)
      this.$router.push({path: `/${this.path}/${item.movieId}`})
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(this.auctionList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize))
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/auction-list.scss';
</style>
