<template>
  <div class="content-list">
    <ul class="section-content" v-if="result.length">
      <li class="content-item" v-for="(item, index) in result
     .slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)" :key="index">
        <div class="kuo" @click="goAblum(item)">
          <img class="item-img" :src="url+item.picImg" alt="">
            <div class="caption"> 竞拍{{item.enddate}}结束</div>
          <div class="mask"  @click="goAblum(item)">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="BOFANG"></use>
            </svg>
          </div>
        </div>
        <p class="item-name">{{item.artworkName}}</p>
        <p class="item-name">ID：{{item.artworkId}}</p>
        <p class="item-name">{{item.publishTime}}</p>

        <button-style @onClick="goMovie(item)" class="btn"
        btn="竞拍" :description= "'当前 ' + item.price + ' QTUM'" >
        </button-style>
      </li>
    </ul>
    <ul v-else>
      <li class="content-item" v-for="(item, index) in result
     .slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)" :key="index">
        <div class="kuo" @click="goAblum(result)">
          <img class="item-img" :src="url+result.picImg" alt="">
          <div class="caption"> 竞拍{{result.enddate}}结束</div>
          <div class="mask"  @click="goAblum(result)">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="BOFANG"></use>
            </svg>
          </div>
        </div>
        <p class="item-name">{{result.artworkName}}</p>
        <p class="item-name">ID：{{result.artworkId}}</p>
        <p class="item-name">{{result.publishTime}}</p>

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
import axios from 'axios'
import mixin from '../mixins'
import { ICON } from '../assets/icon/index'
import ButtonStyle from './ButtonStyle.vue'

export default {
  name: 'auction-list',
  mixins: [mixin],
  components: {
    ButtonStyle
  },
  created () {
    axios.get('http://82.157.177.72:8081/movie-nft-server/artwork/batch-get-artworks?currentPage=1&pageSize=100')
    // then获取成功；response成功后的返回值（对象）
      .then(response => {
        this.result = response.data.pageInfo
        this.loading = true
        console.log(this.result)
      })
    // 获取失败
      .catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
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
      pageSize: 6
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/auction-list.scss';
</style>
