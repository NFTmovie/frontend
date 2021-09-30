<template>
  <div class="singer">
    <div class="section">
      <div class="section-title">我购买的版权</div>
      <copyright-list
        :copyrightMovies ="movieList"
        path="BuyCopyright"
      ></copyright-list>
    </div>
    <div class="section">
      <div class="section-title">我的艺术收藏</div>
      <AuctionList
        :auctionList ="movieList"
        path="BuyCopyright"
      ></AuctionList>
    </div>
    <div class="section">
    <FixedList
      :fixed-list="movieList"
      path="BuyCopyright"
    ></FixedList>
    </div>
<!--    <div class="section">-->
<!--      <div class="section-title">我的电影票</div>-->
<!--      <BuyTicket-->
<!--        :fixed-list="movieList"-->
<!--        path="BuyCopyright"-->
<!--      ></BuyTicket>-->
<!--    </div>-->
  </div>
</template>

<script>
import CopyrightList from '../components/CopyrightList'
import AuctionList from '../components/AuctionList'
import FixedList from '../components/FixedList'
import BuyTicket from '../components/BuyTicket'
import { movies } from '../assets/data/movieCR'
import { HttpManager } from '../api/index'
export default {
  name: 'buy-copyright',
  components: {
    CopyrightList,
    FixedList,
    AuctionList,
    BuyTicket
  },
  data () {
    return {
      activeName: '全部电影',
      pageSize: 15, // 页数
      currentPage: 1, // 当前页
      albumDatas: [],
      movieList: movies
    }
  },
  computed: {
    // 计算当前表格中的数据
    data () {
      return this.albumDatas.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  created () {
    this.getAllSinger()
  },
  methods: {
    // 获取当前页
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleChangeView (item) {
      this.activeName = item.name
      this.albumDatas = []
      if (item.name === '全部歌手') {
        this.getAllSinger()
      } else {
        this.getSingerSex(item.type)
      }
    },
    // 获取所有歌手
    getAllSinger () {
      HttpManager.getAllSinger()
        .then(res => {
          this.currentPage = 1
          this.albumDatas = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 通过性别对歌手分类
    getSingerSex (sex) {
      HttpManager.getSingerOfSex(sex)
        .then(res => {
          this.currentPage = 1
          this.albumDatas = res
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/my-info.scss';
</style>
