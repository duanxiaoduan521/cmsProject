<template>
  <div class="home">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <!-- v-for组件的时候需要给key，避免vue计算key，来提升性能 -->
      <!-- key就是位置的标识 -->
      <mt-swipe-item v-for="(item,index) in imgs" :key="index">
        <img :src="item.url" alt />
      </mt-swipe-item>
    </mt-swipe>
    <!-- <test/> -->
    <!-- 九宫格 -->
    <div class="list">
      <my-ul>
        <my-li v-for="(item,index) in list" :key="index">
          <router-link :to="item.route">
            <span>
              <img :src="item.img" alt />
            </span>
            <em>{{item.title}}</em>
          </router-link>
        </my-li>
      </my-ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // categoryId:0,
      imgs: [], //轮播图数据
      list: [
        {
          route: { name: 'NewList' },
          img: 'https://s2.ax1x.com/2019/08/31/mzyunJ.jpg',
          title: '新闻资讯'
        },{
          route: { name: 'PhotoList', query:{categoryId:0}},
          img: 'https://s2.ax1x.com/2019/08/31/mzyunJ.jpg',
          title: '图文分享'
        },{
          route: { name: 'Show'},
          img: 'https://s2.ax1x.com/2019/08/31/mzyunJ.jpg',
          title: '商品展示'
        },
        {
          route: { name: 'Feedback' },
          img: 'https://s2.ax1x.com/2019/08/31/mzylA1.jpg',
          title: '留言反馈'
        },
        {
          route: { name: 'SearchConsulting' },
          img: 'https://s2.ax1x.com/2019/08/31/mzyunJ.jpg',
          title: '搜索咨询'
        },
        {
          route: { name: 'ContactUs' },
          img: 'https://s2.ax1x.com/2019/08/31/mzyVpT.jpg',
          title: '联系我们'
        }
      ]
    };
  },
  created() {
    // 测试我们自己写的插件
    this.$log();
    this.$log = "abc";

    this.$axios
      .get("lunbo")
      .then(res => {
        this.imgs = res.data.data;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
/* 轮播图 */
.mint-swipe {
  width: 100%;
  height: 180px;
}
.mint-swipe img {
  width: 100%;
  height: 100%;
}
/* 九宫格 */
.list {
  background: #fff;
}
.list ul li a span {
  margin: 0 auto;
  display: block;
  width: 50px;
  height: 50px;
}
.list ul li a span img {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 5px auto;
}
.list ul li a em {
  margin-top: 7px;
  width: 100%;
  display: block;
  text-align: center;
  font: 12px/2 "";
}
</style>
