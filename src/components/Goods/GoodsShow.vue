<template>
  <div class="mycontent">
    <nav-bar :title="title" />
    <ul>
      <li v-for="(goods,index) in goods" :key="index">
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
  </div>
</template>

<script>
export default {
  data(){
    return{
      title: "商品展示",
      goods:[]
    }
  },
  created(){
    let {page} = this.$route.params;
    // console.log(page)
    this.$axios
      .get(`getgoods/${page}`)
      .then(res => {
        console.log(res.data.data);
        this.goods = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
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
  overflow: hidden;
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
.list{padding: 5px;background: grey;height: 40px;}
.list b{font-weight:700;margin-right: 3px;}
</style>