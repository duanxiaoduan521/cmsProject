<template>
  <div class="mycontent">
      <nav-bar title="新闻详情"/>
    <div class="detail-title">
      <h3>{{NewsDetail.title}}</h3>
      <div class="detail-smalltitle">
        <span class="detail-smalltitle-l fl">
          <b>{{NewsDetail.click}}</b>点击
        </span>
        <span class="detail-smalltitle-c">
          分类：
          <em>{{NewsDetail.classification}}</em>
        </span>
        <span class="detail-smalltitle-r fr">
          添加时间：
          <em>{{NewsDetail.add_time | convertTime('YYYY-MM-DD')}}</em>
        </span>
      </div>
      <hr />
    </div>
    <div class="detail-content">
      <p>
        <span>内容摘要:</span>
        {{NewsDetail.content}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        title:'新闻详情',
        NewsDetail:[]
    };
  },
  created() {
    // console.log(this.$route.params);
    // 1.获取路由参数
    let {id} = this.$route.params;
    // 2.拼接后台需要的url
    let url = 'NewsDetail/' + id;
    console.log(url)
    // 3.相应数据渲染到页面上，通过一个详情对象
    this.$axios
    .get(url)
    .then(res=>{
        // console.log(res.data.data[0])
        this.NewsDetail = res.data.data;
    })
    .catch(err=>{
        console.log(err)
    })
  }
};
</script>

<style scoped>
.detail-title {
  padding: 5px;
}
.detail-title h3 {
  text-align: left;
  font: 900 14px/2 "";
}
.detail-title .detail-smalltitle .detail-smalltitle-c {
  text-align: center;
}
.detail-content{padding: 5px;}
.detail-content p{text-align: left;text-indent:25px;}
</style>