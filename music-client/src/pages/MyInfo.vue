<template>
  <copyright-list
    :copyrightMovies ="movieList"
    path="MyInfo"
  ></copyright-list>
</template>

<script>
import {movies} from '../assets/data/movieCR'
import CopyrightList from '../components/CopyrightList'
import AuctionList from '../components/AuctionList'
export default {
  name: 'MyInfo',
  components: {
    CopyrightList,
    AuctionList
  },
  data () {
    return {
      movieList: movies
    }
  }
}
</script>

<style scoped>

</style>
