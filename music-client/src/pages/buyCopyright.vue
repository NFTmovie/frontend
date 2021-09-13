<template>
  <div class="singer">
    <div class="header-search">
      <input type="text" placeholder="可输入电影名称/版权名称/ID等" @keyup.enter="goSearch()" v-model="keywords">
      <div class="search-btn"  @click="goSearch()" >
        搜索
      </div>
    </div>

    <div class="section">
      <div class="section-title">电影列表</div>
      <content-list
        :contentList="movieList"
        path="BuyCopyright"
      ></content-list>
    </div>
  </div>
</template>

<script>
import ContentList from '../components/ContentList'
import { swiperList } from '../assets/data/swiper'
import { HttpManager } from '../api/index'

export default {
  name: 'singer',
  components: {
    ContentList
  },
  data () {
    return {
      activeName: '全部电影',
      pageSize: 15, // 页数
      currentPage: 1, // 当前页
      albumDatas: [],
      movieList: swiperList // 歌单列表

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
@import '../assets/css/buycopyright.scss';
</style>
