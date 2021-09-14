<!--电影详情页-->
<template>
  <div class="song-list-album">
    <div class="album-slide">
      <div class="album-img">
        <img :src="movies.picImg" alt="" />
      </div>
      <div class="movie-info">
        <h1>《{{ movies.name }}》汇编权</h1>
        <span>
          ID: {{ movies.id }} 
          <br>
          发行日期：{{ movies.releasedate }}
          <br>
          剧情：{{ movies.plot }}
        </span>
      </div>
      <button-style 
        btn="购买" :description= "movies.price + ' QTUM'" >
      </button-style>
    </div>

    <h2>区块链信息</h2>
    <ul class="section-content">
      <li class="content-item" v-for="(value, name) in movies.bcinfo">
        {{name}}:{{value}}
        {{movies.bcinfo.block}}
      </li>
      
    </ul>
  </div>
</template>

<script>
import mixin from "../mixins";
import ButtonStyle from "../components/ButtonStyle";
import { mapGetters } from "vuex";
import { HttpManager } from "../api/index";

export default {
  name: "song-list-album",
  mixins: [mixin],
  components: {
    ButtonStyle
  },
  data() {
    return {
      songLists: [],
      movies: {},
      count: 0, // 点赞数
      songListId: "", // 歌单ID
      value3: 0,
      value5: 0,
      activeName: "视频", //默认选择栏
    };
  },
  computed: {
    ...mapGetters([
      "loginIn", // 登录标识
      "tempList", // 单个歌单信息
      "listOfSongs", // 存放的音乐
      "userId", // 用户ID
      "avator", // 用户头像
    ]),
  },
 
  created() {
    this.movies = this.tempList;
    console.log(this.tempList);
    this.getSongId(); // 获取歌单里面的歌曲ID
    this.getRank(this.songListId); // 获取评分
  },
  methods: {
    // 收集歌单里面的歌曲
    getSongId() {
      HttpManager.getListSongOfSongId(this.songListId)
        .then((res) => {
          // 获取歌单里的歌曲信息
          for (let item of res) {
            this.getSongList(item.songId);
          }
          this.$store.commit("setListOfSongs", this.songLists);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //点击header 切换类别时
    // 获取单里的歌曲
    getSongList(id) {
      HttpManager.getSongOfId(id)
        .then((res) => {
          this.songLists.push(res[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取评分
    getRank(id) {
      HttpManager.getRankOfSongListId(id)
        .then((res) => {
          this.value5 = res / 2;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 提交评分
    pushValue() {
      if (this.loginIn) {
        let params = new URLSearchParams();
        params.append("songListId", this.songListId);
        params.append("consumerId", this.userId);
        params.append("score", this.value3 * 2);
        HttpManager.setRank(params)
          .then((res) => {
            if (res.code === 1) {
              this.getRank(this.songListId);
              this.notify("评分成功", "success");
            } else {
              this.notify("评分失败", "error");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.value3 = null;
        this.notify("请先登录", "warning");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/movie-detail.scss";
</style>
