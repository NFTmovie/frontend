<template>
  <div class="content-list">
    <ul class="section-content">
      <li class="content-item" v-for="(item, index) in fixedList" :key="index">
        <div class="kuo" @click="goAblum(item)">
          <img class="item-img" :src="item.picImg" alt="">
          <div class="mask"  @click="goAblum(item)">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="BOFANG"></use>
            </svg>
          </div>
        </div>
        <p class="item-name">{{item.name}}</p>
        <p class="item-name">ID：{{item.id}}</p>
        <p class="item-name">{{item.releasedate}}</p>

        <button-style @onClick="goMovie(item)" class="btn"
        btn="购买" :description= "'当前 ' + item.price + ' QTUM'" >
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
@import '../assets/css/fixed-list.scss';
</style>
