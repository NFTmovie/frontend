<template>
  <div class="content-list">
    <ul class="section-content" v-if="result.length">
      <li class="content-item" v-for="(item, index) in result.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)" :key="index">
        <div class="kuo" @click="goAblum(item)">
          <img class="item-img" :src="url + item.picImg" alt="">
            <div class="caption">{{item.recordNumber}}<br> {{item.copyrightType}} </div>
<!--          <div class="mask"  @click="goAblum(item)">-->
<!--            <svg class="icon" aria-hidden="true">-->
<!--              <use :xlink:href="BOFANG"></use>-->
<!--            </svg>-->
<!--          </div>-->
        </div>
        <p class="item-name">所剩数量：{{item.remainQuantity}}</p>
        <p class="item-name">收益分成：{{item.share}}</p>
        <p class="item-name">价格：{{item.price}}</p>
        <button-style @onClick="goMovie(item)"
        btn="购买" ></button-style>
      </li>
    </ul>
    <ul v-else>
      <li class="content-item" v-for="(item, index) in result.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)" :key="index">
        <div class="kuo" @click="goAblum(result)">
          <img class="item-img" :src="url+item.picImg" alt="">
          <div class="caption">《{{item.recordNumber}}》<br> {{item.copyrightType}} </div>
          <div class="mask"  @click="goAblum(item)">
          </div>
        </div>
        <p class="item-name">所剩数量：{{item.remainQuantity}}</p>
        <p class="item-name">收益分成：{{item.share}}</p>
        <p class="item-name">价格：{{item.price}}</p>
        <button-style @onClick="goMovie(item)"
                      btn="购买" :description= "item.price + ' QTUM'" >
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
        :total="result.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import mixin from '../mixins'
import { ICON } from '../assets/icon/index'
import ButtonStyle from '../components/ButtonStyle.vue'

export default {
  name: 'copyright-list',
  mixins: [mixin],
  components: {
    ButtonStyle
  },
  created () {
    axios.get('http://82.157.177.72:8081/movie-nft-server/movie/batch-get-copyright?currentPage=1&pageSize=100')
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
    copyrightMovies: Array,
    path: String
  },
  data () {
    return {
      url: 'http://82.157.177.72:8081/',
      currentPage: 1,
      pageSize: 3,
      result: ''
    }
  },
  methods: {
    goMovie (item) {
      this.$store.commit('setTempList', item)
      this.$router.push({path: `/${this.path}/${item.movieId}`})
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(this.copyrightMovies.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/copyright-list.scss';
</style>
