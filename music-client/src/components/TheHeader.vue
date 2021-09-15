<template>
  <div class="the-header">
    <div class="header-logo" @click="goHome">
      <img
        alt="App-market"
        height="70"
        :src="require('@/assets/img/logo.jpg')"
      />
    </div>
    <ul class="navbar" ref="change">
      <li :class="{active: navMsg[0].name === activeName}"  :key="navMsg[0].path" @click="goPage(JSON.stringify(navMsg[0]))">
        {{navMsg[0].name}}
      </li>
       <li>
        <el-dropdown @command="goPage">
        <el-button>
         上映新片<i class="el-icon-arrow-down el-icon--right"></i>
         </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  v-for="item in dropUploadMsg" :key="item.path" :command="JSON.stringify(item)">{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <li>
        <el-dropdown @command="goPage">
          <el-button>
            购买nft<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  v-for="item in dropBuyMsg" :key="item.path" :command="JSON.stringify(item)">{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <li>
        <el-dropdown @command="goPage">
          <el-button>
            增值服务<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >粉丝空投</el-dropdown-item>          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <li :class="{active: navMsg[1].name === activeName}"  :key="navMsg[0].path" @click="goPage(JSON.stringify(navMsg[1]))">
        {{navMsg[1].name}}
      </li>
      <li>
        <div class="header-search">
          <input type="text" placeholder="搜索电影" @keyup.enter="goSearch()" v-model="keywords">
          <div class="search-btn"  @click="goSearch()" >
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="SOUSUO"></use>
            </svg>
          </div>
        </div>
      </li>
      <li v-show="!loginIn" :class="{active: item.name === activeName}" v-for="item in loginMsg" :key="item.type" @click="goPage(JSON.stringify(item))">{{item.name}}</li>
    </ul>
    <!--设置-->
    <div class="header-right" v-show="loginIn">
      <div id="user">
        <img :src="attachImageUrl(avator)" alt="">
      </div>
      <ul class="menu">
        <li v-for="(item, index) in menuList" :key="index" @click="goMenuList(item.path)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import mixin from '../mixins'
import { mapGetters } from 'vuex'
import { navMsg, loginMsg, menuList, dropBuyMsg, dropUploadMsg } from '../assets/data/header'
import { ICON } from '../assets/icon/index'

export default {
  name: 'the-header',
  mixins: [mixin],
  data () {
    return {
      musicName: '链影',
      navMsg: navMsg, // 左侧导航栏
      loginMsg: loginMsg, // 右侧导航栏
      menuList: menuList, // 用户下拉菜单项
      keywords: '',
      ERJI: ICON.ERJI,
      SOUSUO: ICON.SOUSUO,
      dropUploadMsg: dropUploadMsg,
      dropBuyMsg: dropBuyMsg
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'activeName',
      'avator',
      'username',
      'loginIn'
    ])
  },
  mounted () {
    document.querySelector('#user').addEventListener('click', function (e) {
      document.querySelector('.menu').classList.add('show')
      e.stopPropagation()// 关键在于阻止冒泡
    }, false)
    // 点击“菜单”内部时，阻止事件冒泡。(这样点击内部时，菜单不会关闭)
    document.querySelector('.menu').addEventListener('click', function (e) {
      e.stopPropagation()
    }, false)
    document.addEventListener('click', function () {
      document.querySelector('.menu').classList.remove('show')
    }, false)
  },
  methods: {
    goHome () {
      this.$router.push({path: '/'})
    },
    goPage (obj) {
      let item = JSON.parse(obj)
      const value = item.name
      const path = item.path
      document.querySelector('.menu').classList.remove('show')
      this.changeIndex(value)
      if (!this.loginIn && path === '/my-music') {
        this.notify('请先登录', 'warning')
      } else {
        this.$router.push({path: path})
      }
    },
    changeIndex (value) {
      this.$store.commit('setActiveName', value)
    },
    goMenuList (path) {
      if (path === 0) {
        this.$store.commit('setIsActive', false)
      }
      document.querySelector('.menu').classList.remove('show')
      if (path) {
        this.$router.push({path: path})
      } else {
        this.$store.commit('setLoginIn', false)
        this.$router.go(0)
      }
    },
    goSearch () {
      this.$store.commit('setSearchword', this.keywords)
      this.$router.push({path: '/search', query: {keywords: this.keywords}})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/the-header.scss';
.el-dropdown {
  vertical-align: top;
  background-color: black;
}
.el-button{
  background-color: black;
  color: white;
  border-color: black;
  font-size: 18px;
}
.el-icon-arrow-down {
  font-size: 18px;
}

</style>
