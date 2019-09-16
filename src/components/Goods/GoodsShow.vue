<template>
  <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="touch-action: none;">
    <nav-bar :title="title" />
    <mt-loadmore
      :bottom-method="loadBottom"
      @bottom-status-change="handleBottomChange"
      :bottom-all-loaded="allLoaded"
      :auto-fill="autoFill"
      ref="loadmore"
    style="margin-bottom:50px">
      <ul>
        <li v-for="(goods,index) in goodsList" :key="index">
          <a>
            <img :src="goods.img_url" alt />
            <p class="title" style="color:red;">{{goods.title | controllShow(15)}}</p>
            <div class="list">
              <div class="list-t">
                <b>￥{{goods.sell_price}}元</b>
                <s>￥{{goods.market_price}}</s>
              </div>
              <div class="list-b">
                <div class="hot fl">热卖中</div>
                <div class="count fr">剩{{goods.stock_quantity}}件</div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
/* 总结
  1.buttomload函数
  2.禁止buttomLoad bottom-all-Loaded 默认为false,true为禁止
  3.auto-fill默认true，自动检测父容器，并调用buttomLoad直到撑满父容器
  4.pull拉动为满足7-px,drop达到70px,Loading加载中
  5.Loadmore组件对象的onBottomLoaded() 通过this.$refs.xxx获取组件对象
  6.在组件上写ref="xxx" 在js中通过this.$refs.xxx 获取DOM对象
  7.上拉加载更多的公式 
      进入检测机制：可视高度 + 卷入高度 = 所有的数据高度
*/
export default {
  data() {
    return {
      title: "商品展示",
      goodsList: [],
      allLoaded: false, //为true禁止调用拉动函数
      autoFill: false, //自动调用LoadBottom
      page: this.$route.params.page,
      wrapperHeight:0,  //父容器高度
    };
  },
  methods: {
    loadBottom() {
      this.loadGoodsByPage();
      // console.log("上拉调用了");
      // 通知状态改变
      this.$refs.loadmore.onBottomLoaded();
    },
    handleBottomChange(status) {
      // console.log(status);
    },
    loadGoodsByPage() {
      this.$axios
        .get(`getgoods/${this.page}`)
        .then(res => {
          // console.log(res.data.code)
          if(res.data.code == 200){
            if (this.page == 1) {
              this.goodsList = res.data.data;
            } else {
              this.goodsList = this.goodsList.concat(res.data.data);
            }
            this.page++; //页码自增
          }else if(res.data.code == 1000001){
            // console.log(res.data.msg)
            this.$toast(res.data.msg);
            this.allLoaded = true;
            return;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    // 获取页码
    // let { page } = this.$route.params;
    // console.log(page)
    this.loadGoodsByPage();
  },
  mounted(){
    // 父容器高度（可使） = 设备高度 - 父容器的top
    
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
  }
};
</script>

<style scoped>
ul {
  width: 100%;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}
ul li {
  width: 45%;
  height: 200px;
  text-align: center;
  border: 1px solid #000;
  color: #eee;
  margin: 2%;
  /* overflow: hidden; */
  position: relative;
}
ul li img {
  width: 100%;
  height: 150px;
  box-sizing: border-box;
}
ul li p {
  position: absolute;
  top: 120px;
  background-color: yellow;
  height: 30px;
  line-height: 30px;
  width: 100%;
  text-align: center;
}
.list {
  padding: 5px;
  background: grey;
  height: 40px;
}
.list b {
  font-weight: 700;
  margin-right: 3px;
}
</style>