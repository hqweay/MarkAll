<template>
  <div class="page">
    <!-- <button @click="test">哈哈</button> -->
    <ul class="item-list">
      <li v-for="movie in movieList" :key="movie.title">
        <ul class="item-attr">
          <li class="url">
            <a :href="movie.url" target="_blank">{{movie.url}}</a>
          </li>
          <li class="title">{{movie.title}}</li>
          <!-- <li>{{movie.intro}}</li> -->
          <li class="comment">{{movie.comment}}</li>
          <li class="date">{{movie.date}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      movieList: []
    };
  },
  created: function() {
    this.$http({
      url: "/api/data",
      method: "get"
    }).then(res => {
      this.movieList = res.data.data;
    });
    // this.movieList = require("../../utils/douban.js");
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.item-attr {
  list-style: none;
  margin-top: 1em;
}

.info ul li {
  display: inline;
}
</style>
