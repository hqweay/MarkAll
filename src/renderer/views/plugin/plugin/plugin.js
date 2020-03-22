export function imDouWatched() {
  this.$prompt(' 请输入你的豆瓣 id', ' 提示 ', {
    confirmButtonText: ' 确定 ',
    cancelButtonText: ' 取消 ',
    closeOnClickModal: false,
    inputValidator: function (value) {
      if (value === null) {
        return ' 不能为空呀～'
      }
    }
  })
    .then(({ value }) => {
      const loading = this.$loading({
        lock: true,
        text: ' 正在尝试获取并导入数据...'
      })
      getMoviesBySpider(value).then(() => {
        this.notify(' 数据获取成功！！')
        this.$logger.info("数据爬取成功！！！");
        importDoubanMovies().then(res => {
          this.notify(' 数据导入成功！！')
          loading.close()
          this.$logger.info("数据导入成功！！！");
        })
      })
    })
    .catch(() => {
      this.$message({
        type: 'info',
        message: ' 取消输入 '
      })
    })
}
