<template>
  <div class="signUp-page">
    <div class="signUp">
      <div class="signUp-head">
        <span>发布艺术品</span>
      </div>
      <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="120px" class="demo-ruleForm">
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="username" label="选择电影" class="item">
            <el-select v-model="registerForm.location" placeholder="请输入" style="width:100%" class="input">
              <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <br>
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="password" label="名称" class="item">
            <el-input type="password" placeholder="请输入" v-model="registerForm.password" class="input"></el-input>
          </el-form-item>
        </div>
        <br>
        <!--        <el-form-item prop="sex" label="性别">-->
        <!--          <el-radio-group v-model="registerForm.sex">-->
        <!--            <el-radio :label="0">女</el-radio>-->
        <!--            <el-radio :label="1">男</el-radio>-->
        <!--          </el-radio-group>-->
        <!--        </el-form-item>-->
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="phoneNum" label="简介" class="item">
            <el-input  placeholder="请输入" v-model="registerForm.phoneNum" class="input"></el-input>
          </el-form-item>
        </div>
        <br>
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="email" label="封面" class="item">
            <el-input v-model="registerForm.email" placeholder="请输入" class="input"></el-input>
          </el-form-item>
        </div>
        <br>
        <!--        <el-form-item prop="birth" label="生日">-->
        <!--          <el-date-picker type="date" placeholder="选择日期" v-model="registerForm.birth" style="width: 100%;"></el-date-picker>-->
        <!--        </el-form-item>-->
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="introduction" label="艺术品" class="item">
            <el-input  placeholder="请输入" v-model="registerForm.introduction" class="input"></el-input>
          </el-form-item>
        </div>
        <br>
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="location" label="发行方式" class="item">
            <el-select v-model="registerForm.location" placeholder="请输入" style="width:100%" class="input">
              <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <br>
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="introduction" label="拍卖截止日期" class="item">
            <el-date-picker type="date" placeholder="选择日期" v-model="registerForm.birth" style="width: 100%;" class="input"></el-date-picker>
          </el-form-item>
        </div>
        <br>
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="introduction" label="价格" class="item">
            <el-input  placeholder="请输入" v-model="registerForm.introduction" class="input"></el-input>
          </el-form-item>
        </div>
        <br>
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="introduction" label="数量" class="item">
            <el-input  placeholder="请输入" v-model="registerForm.introduction" class="input"></el-input>
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
import mixin from '../mixins'
import loginLogo from '../components/LoginLogo'
import { rules, cities } from '../assets/data/form'
import { HttpManager } from '../api/index'

export default {
  name: 'SignUp-page',
  mixins: [mixin],
  components: {
    loginLogo
  },
  data () {
    return {
      registerForm: { // 注册
        username: '',
        password: '',
        sex: '',
        phoneNum: '',
        email: '',
        birth: '',
        introduction: '',
        location: ''
      },
      rules: rules,
      cities: cities
    }
  },
  methods: {
    SignUp () {
      let _this = this
      let d = this.registerForm.birth
      let datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      let params = new URLSearchParams()
      params.append('username', this.registerForm.username)
      params.append('password', this.registerForm.password)
      params.append('sex', this.registerForm.sex)
      params.append('phone_num', this.registerForm.phoneNum)
      params.append('email', this.registerForm.email)
      params.append('birth', datetime)
      params.append('introduction', this.registerForm.introduction)
      params.append('location', this.registerForm.location)
      params.append('avator', '/img/user.jpg')
      HttpManager.SignUp(params)
        .then(res => {
          console.log(res)
          if (res.code === 1) {
            _this.notify('注册成功', 'success')
            setTimeout(function () {
              _this.$router.push({path: '/'})
            }, 2000)
          } else {
            _this.notify('注册失败', 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    goback (index) {
      this.$router.go(index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/sign-up.scss';
</style>
