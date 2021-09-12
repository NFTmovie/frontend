<template>
  <div class="home">
    <!--轮播图-->
    <el-carousel
      class="swiper-container"
      :interval="4000"
      type="card"
      height="280px"
    >
      <el-carousel-item v-for="(item, index) in swiperList" :key="index">
        <img :src="item.picImg" />
      </el-carousel-item>
    </el-carousel>
    <!--电影列表-->
    <div class="section">
      <div class="section-title">电影列表</div>
      <content-list
        :contentList="songList"
        path="song-list-album"
      ></content-list>
    </div>
  </div>
</template>

<script>
import ContentList from '../components/ContentList'
import { swiperList } from '../assets/data/swiper'
import { HttpManager } from '../api/index'

export default {
  name: 'home',
  components: {
    ContentList
  },
  data () {
    return {
      swiperList: swiperList, // 轮播图列表
      songList: swiperList // 歌单列表
    }
  },
  created () {
    // 获取歌单列表
    // this.getSongList()
    // 获取歌手列表
  },
  methods: {
    getSongList () {
      HttpManager.getSongList()
        .then((res) => {
          this.songList = res.sort().slice(0, 10)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/home.scss";
</style>
