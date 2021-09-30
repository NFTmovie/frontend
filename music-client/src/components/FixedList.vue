<template>
  <div class="content-list">
    <ul class="section-content">
      <li class="content-item" v-for="(item, index) in fixedList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)" :key="index">
        <div class="kuo" @click="goAblum(item)">
          <img class="item-img" :src="item.picImg" alt="">
          <div class="mask"  @click="goAblum(item)">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="BOFANG"></use>
            </svg>
          </div>
        </div>
        <p class="item-name">{{item.name}}</p>
        <p class="item-name">ID：{{item.movieId}}</p>
        <p class="item-name">{{item.releasedate}}</p>

        <button-style @onClick="buy" class="btn"
        btn="购买" :description= "'当前 ' + item.price + ' QTUM'" >
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
        :total="fixedList.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {Qtum} from 'qtumjs'
import mixin from '../mixins'
import { ICON } from '../assets/icon/index'
import ButtonStyle from './ButtonStyle.vue'

export default {
  name: 'fixed-list',
  mixins: [mixin],
  components: {
    ButtonStyle
  },
  props: {
    fixedList: Array,
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
    async buy () {
      const contractInfo = require('../../static/contractInfo.json')
      const qtum = new Qtum('http://ang:qtum@localhost:8010', contractInfo)
      // const qtum = new Qtum("http://test:test1234@152.136.130.81:13889", contractInfo);
      const contract = qtum.contract('MovieNFT.sol')

      const tx = await contract.send(
        'publishMovie',
        ['0814bfacfac50c2b0ce0688e9fba219a17fd934e', 'baidu.com/1'],
        {senderAddress: 'qgtn7J8W6r6c2bGyD59adicoMcnrCBpeN5', amount: '0.00'})
      alert('Success! Tx id:' + tx.txid)
    },
    goMovie (item) {
      this.$store.commit('setTempList', item)
      this.$router.push({path: `/${this.path}/${item.id}`})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/fixed-list.scss';
</style>
