<template>
  <div class="mycontent">
    <nav-bar :title="title" />
    <ul>
        <li class="list" v-for="(item,index) in list" :key="index">
          <router-link :to="{name:'NewsDetail',params:{id:item.id}}">
            <div class="list-l valign">
              <img :src="item.img_url" alt />
            </div>
            <div class="list-r" clear>
              <div class="list-r-t">{{item.title}}</div>
              <div class="list-r-b">
                <div class="list-r-b-l fl">点击数：{{item.click}}</div>
                <div class="list-r-b-r fr">发表时间：{{item.add_time | convertTime('YYYY-MM-DD')}}</div>
              </div>
            </div>
          </router-link>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "新闻列表AA",
      list: []
    };
  },
  created() {
    this.$axios
      .get("NewsList")
      .then(res => {
        this.list = res.data.data;
        // console.log(this.list);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
ul {
  padding-top: 10px;
  background: #fff;
}
.list {
  position: relative;
  height: 50px;
  padding: 5px;
}
.list-l {
  width: 50px;
  position: absolute;
  height: 50px;
}
.list-l img {
  width: 40px;
  box-sizing: border-box;
  height: 40px;
  margin-top: 5px;
}
.list-r {
  margin-left: 50px;
  height: 50px;
  font: 14px/2 "";
}
.list-r .list-r-t {
  text-align: left;
  padding: 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-r .list-r-b {
  font: 12px/2 "";
  padding: 7px 5px;
}
</style>