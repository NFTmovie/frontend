<template>
  <div class="signUp-page">
    <div class="signUp">
      <div class="signUp-head">
        <span>上传影片</span>
      </div>
      <el-form :model="uploadInfo" status-icon  ref="uploadInfo" label-width="120px" class="demo-ruleForm">
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="username" label="版权号" class="item">
            <el-input v-model="uploadInfo.recordNumber" placeholder="请输入" class="input"></el-input>
          </el-form-item>
        </div>
        <br>
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
        <el-form-item prop="username" label="电影中文名" class="item">
          <el-input v-model="uploadInfo.chineseName" placeholder="请输入" class="input"></el-input>
        </el-form-item>
        </div>
        <br>
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
        <el-form-item prop="password" label="电影英文名" class="item">
          <el-input  placeholder="请输入" v-model="uploadInfo.englishName" class="input"></el-input>
        </el-form-item>
        </div>
        <br>
<!--        <el-form-item prop="sex" label="性别">-->
<!--          <el-radio-group v-model="uploadInfo.sex">-->
<!--            <el-radio :label="0">女</el-radio>-->
<!--            <el-radio :label="1">男</el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
        <el-form-item prop="phoneNum" label="导演" class="item">
          <el-input  placeholder="请输入" v-model="uploadInfo.director" class="input"></el-input>
        </el-form-item>
        </div>
        <br>
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
        <el-form-item prop="email" label="制作人" class="item">
          <el-input v-model="uploadInfo.producer" placeholder="请输入" class="input"></el-input>
        </el-form-item>
        </div>
        <br>
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
        <el-form-item prop="introduction" label="发行公司" class="item">
          <el-input  placeholder="请输入" v-model="uploadInfo.publishCompany" class="input"></el-input>
        </el-form-item>
        </div>
        <br>
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="birth" label="发行日期" class="item">
            <el-date-picker type="date" placeholder="选择日期" v-model="uploadInfo.publishTime" class="input" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </div>
        <br>
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
        <el-form-item prop="location" label="国家地区" class="item">
          <el-select v-model="uploadInfo.region" placeholder="请输入" style="width:100%" class="input">
            <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        </div>
        <br>
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="introduction" label="剧情" class="item">
            <el-input  placeholder="请输入" v-model="uploadInfo.plot" class="input"></el-input>
          </el-form-item>
        </div>
        <br>
        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="introduction" label="简介" class="item">
            <el-input  placeholder="请输入" v-model="uploadInfo.intro" class="input"></el-input>
          </el-form-item>
        </div>
        <br>
<!--        <div style="width:500px;height:45px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">-->
<!--          <el-form-item prop="introduction" label="封面" class="item">-->
<!--            <el-input  placeholder="点击上传" v-model="uploadInfo.post" class="input"></el-input>-->
<!--          </el-form-item>-->
<!--        </div>-->
        <br>
        <div style="width:500px;height:150px;border:2px solid #DD700C; background-color: #DD700C;align-content: center">
          <el-form-item prop="introduction" label="海报" class="item" >
            <el-upload
              ref="upload"
              action="http://82.157.177.72:8081/movie-nft-server/file/uopload-image"
              accept="image/png,image/gif,image/jpg,image/jpeg"
              list-type="picture-card"
              class="input"
              :limit="1"
              :on-success="handle_success"
              :before-upload="beforeUpload"
             >
              <i class="el-icon-plus"></i>
            </el-upload>
<!--            <el-input  placeholder="点击上传" v-model="uploadInfo.preview" class="input"></el-input>-->
          </el-form-item>
        </div>
        <br>
        <div class="login-btn">
          <el-button type="primary" @click="Upload" align="center">点击上传</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { rules, cities } from '../assets/data/form'

export default {
  name: 'uploadInfo',
  data () {
    return {
      uploadInfo: { // 注册
        recordNumber: '',
        chineseName: '',
        englishName: '',
        director: '',
        region: '',
        producer: '',
        publishCompany: '',
        publishTime: '',
        plot: '',
        intro: '',
        post: '',
        preview: ''
      },
      rules: rules,
      cities: cities
    }
  },
  methods: {
    handle_success (res) {
      this.uploadInfo.preview = res
      console.log(res)
    },
    Upload () {
      let d = this.uploadInfo.publishTime
      let datetime = d.getFullYear().toString() + '-' + (d.getMonth() + 1).toString() + '-' + d.getDate().toString()
      axios.post(`http://82.157.177.72:8081/movie-nft-server/movie/upload-movie?recordNumber=${this.uploadInfo.recordNumber}&chineseName=${this.uploadInfo.chineseName}&englishName=${this.uploadInfo.englishName}&director=${this.uploadInfo.director}&region=${this.uploadInfo.region}&producer=${this.uploadInfo.producer}&publishCompany=${this.uploadInfo.publishCompany}&publishTime=${datetime}&plot=vcx&intro=adda&post=${this.uploadInfo.post}&preview=${this.uploadInfo.preview}`)
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
