<template>
  <div>
    <!-- 顶部标题栏 -->
    <mt-header title="信息管理系统"></mt-header>
    <router-view />
    
    <!-- 底部Tabbar-->
    <mt-tabbar v-model="selected">
      <mt-tab-item id="Home">
        <img slot="icon" src="../static/img/index.png" />
        首页
      </mt-tab-item>
      <mt-tab-item id="Member">
        <img slot="icon" src="../static/img/vip.png" />
        会员
      </mt-tab-item>
      <mt-tab-item id="Shopcar">
        <img slot="icon" src="../static/img/shopcar.png" />
        购物车
      </mt-tab-item>
      <mt-tab-item id="Search">
        <img slot="icon" src="../static/img/callme.png" />
        查找
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      selected: ""
    };
  },
  watch:{
    // 不能使用箭头函数，因为this会向上指
    selected:function(newV,oldV){
      console.log(newV);
      console.log(this)
      this.$router.push({
        name:newV,
      })
    }
  }
};
</script>

<style>
.mint-tab-item-label{text-align: center;}
.mint-tabbar{position: fixed;bottom: 0;}
</style>
