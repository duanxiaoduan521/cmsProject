<template>
  <div class="mycontent">
    <nav-bar :title="title" />
    <div class="photo-header">
      <ul>
        <li v-for="(item,index) in categories" :key="index">
          <a href="javascript:;" @click="navgitaToCateById(index)">{{item.title}}</a>
        </li>
      </ul>
    </div>
    <div class="photo-list">
      <ul>
        <li v-for="(item,index) in imgs" :key="index">
          <router-link :to="{name:'PhotoDetail',params:{id:item.id}}">
            <img v-if="$route.query.categoryId === 0" v-lazy="item.img_url" alt />
            <img v-else :src="item.img_url" alt />
            
            <p>
              <span>{{item.title}}</span>
              <br />
              <em>{{item.zhaiyao}}</em>
            </p>
         </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "图文分享",
      categories: [], //list分类
      imgs: [] //图片
    };
  },
  // 路由的参数改变
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // console.log(to,from)
    let { categoryId } = to.query;
    // 加入初次页面，就不需要这个代码
    if(categoryId === 0 && this.imgs.length != 0){
        this.imgs = [];
    }
    // 发请求更改页面数据
    this.loadImgsById(categoryId);
    next();
  },
  methods: {
    navgitaToCateById(id) {
      this.$router.push({
        name: "PhotoList",
        query: { categoryId: id }
      });
    },
    loadImgsById(categoryId) {
      // console.log(categoryId);
      // 图文请求
      this.$axios
        .get("getThesis/" + categoryId)
        .then(res => {
          this.imgs = res.data.data;
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    // console.log(this.$route.query);
    // console.log(window.location.href)
    let { categoryId } = this.$route.query;
    // console.log(categoryId);
    // list分类
    this.$axios
      .get("getimgcategory")
      .then(res => {
        this.categories = res.data.data;
        // 加入全部到数组的首位
        // this.categories.unshift({ id: 0, title: "全部" });
        // console.log(this.list);
      })
      .catch(err => {
        console.log(err);
      });
    // 图文
    this.loadImgsById(categoryId);
  }
};
</script>

<style scoped>
/* 头部 */
.photo-header {
  background: #fff;
  height: 30px;
}
.photo-header ul {
  height: 30px;
  line-height: 30px;
  display: -webkit-box;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
}
.photo-header ul li {
  height: 30px;
  padding: 0 18px;
}
.photo-header ul li a {
  color: #000;
  line-height: 2;
}
.photo-header ul li::-webkit-scrollbar {
  display: none;
}
/* 内容list部分 */
.photo-list li {
  height: 200px;
  box-sizing: border-box;
  position: relative;
}
.photo-list li img {
  width: 100%;
  height: 100%;
}
.photo-list li p {
  position: absolute;
  bottom: 0;
  height: 100px;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  padding: 10px 10px 10px;
}
.photo-list li p span {
  line-height: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.photo-list li p em {
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-indent: 25px;
}
</style>