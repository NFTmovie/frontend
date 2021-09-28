<template>
  <div class="signUp-page">
    <div class="signUp">
      <div class="signUp-head">
        <span>发布艺术品</span>
      </div>
      <el-form :model="artworkInfo" status-icon  ref="copyrightInfo" label-width="120px" class="demo-ruleForm">
<!--        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">-->
<!--          <el-form-item prop="username" label="选择电影" class="item">-->
<!--            <el-select v-model-->
<!--                       artworkInfo.location" placeholder="请输入" style="width:100%" class="input">-->
<!--              <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </div>-->
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="password" label="艺术品名称" class="item">
            <el-input  placeholder="请输入" v-model="artworkInfo.artworkName" class="input"></el-input>
          </el-form-item>
        </div>
        <br>
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="phoneNum" label="数量" class="item">
            <el-input  placeholder="请输入" v-model="artworkInfo.quantity" class="input"></el-input>
          </el-form-item>
        </div>
        <br>
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="email" label="价格" class="item">
            <el-input v-model="artworkInfo.price" placeholder="请输入" class="input"></el-input>
          </el-form-item>
        </div>
        <br>
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="birth" label="发行日期" class="item">
            <el-date-picker type="date" placeholder="选择日期" v-model="artworkInfo.publishTime" class="input" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </div>
        <br>
        <!--        <el-form-item prop="birth" label="生日">-->
        <!--          <el-date-picker type="date" placeholder="选择日期" v-model
        artworkInfo.birth" style="width: 100%;"></el-date-picker>-->
        <!--        </el-form-item>-->
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="introduction" label="简介" class="item">
            <el-input  placeholder="请输入" v-model="artworkInfo.intro" class="input"></el-input>
          </el-form-item>
        </div>
        <br>
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="introduction" label="艺术品状态" class="item">
            <el-input  placeholder="请输入" v-model="artworkInfo.artworkStatus" class="input"></el-input>
          </el-form-item>
        </div>
        <br>
        <div class="login-btn">
          <el-button type="primary" @click="SignUp" align="center">发布</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import mixin from '../mixins'
import loginLogo from '../components/LoginLogo'
import { rules, cities } from '../assets/data/form'

export default {
  name: 'SignUp-page',
  mixins: [mixin],
  components: {
    loginLogo
  },
  data () {
    return {
      artworkInfo: { // 注册
        artworkName: '',
        quantity: '',
        price: '',
        publishTime: '',
        intro: '',
        artworkStatus: ''
      },
      rules: rules,
      cities: cities
    }
  },
  methods: {
    SignUp () {
      let d = this.artworkInfo.publishTime
      let datetime = d.getFullYear().toString() + '-' + (d.getMonth() + 1).toString() + '-' + d.getDate().toString()
      // let d = this.artworkInfo.publishTime
      // let datetime = d.getFullYear().toString() + '-' + (d.getMonth() + 1).toString() + '-' + d.getDate().toString()
      // let params = new URLSearchParams()
      // params.append('username', thi
      //   artworkInfo.username)
      // params.append('password', thi
      //   artworkInfo.password)
      // params.append('sex', thi
      //   artworkInfo.sex)
      // params.append('phone_num', thi
      //   artworkInfo.phoneNum)
      // params.append('email', thi
      //   artworkInfo.email)
      // params.append('birth', datetime)
      // params.append('introduction', thi
      //   artworkInfo.introduction)
      // params.append('location', thi
      //   artworkInfo.location)
      // params.append('avator', '/img/user.jpg')
      // HttpManager.SignUp(params)
      //   .then(res => {
      //     console.log(res)
      //     if (res.code === 1) {
      //       _this.notify('注册成功', 'success')
      //       setTimeout(function () {
      //         _this.$router.push({path: '/'})
      //       }, 2000)
      //     } else {
      //       _this.notify('注册失败', 'error')
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
      axios.post(`http://82.157.177.72:8081/movie-nft-server/artwork/upload?artworkName=${this.artworkInfo.artworkName}&quantity=${this.artworkInfo.quantity}&price=${this.artworkInfo.price}&publishTime=${datetime}&intro=${this.artworkInfo.intro}&artworkStatus=${this.artworkInfo.artworkStatus}`)
      // then获取成功；response成功后的返回值（对象）
        .then(response => {
          alert('上传成功')
          console.log(response)
        })
        // 获取失败
        .catch(error => {
          console.log(error)
          alert('网络错误，不能访问')
        })
    }
  },
  goback (index) {
    this.$router.go(index)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/sign-up.scss';
</style>
