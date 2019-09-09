<template>
  <div class="mycontent">
    <nav-bar :title="title" />
    <div class="detail-t">
      <h3>{{photoInfo.title}}</h3>
      <div>
        <em>
          发起日期：
          <span>{{photoInfo.add_time | convertTime("YYYY:MM:DD")}}</span>
        </em>
        <em>
          <span>{{photoInfo.click}}</span>次浏览
        </em>
        <em>
          分类：
          <span>民生经济</span>
        </em>
      </div>
        <!-- <vue-preview :slides="imgs"></vue-preview> -->
      <my-ul>
        <my-li v-for="(item,index) in imgs" :key="index">
            <img :src="item.src" alt="" slot="icon"/>
        </my-li>
      </my-ul>
      <hr />
    </div>
    <div class="detail-b">
      <p>{{photoInfo.content}}</p>
    </div>

    <!-- 使用评论组件 -->
    <comment :cid="$route.params.id"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "图文详情",
      photoInfo: [], //图文详情
      imgs:[],//图片集
      // imgs2:[{
      //       src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
      //       msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
      //       alt: 'picture1',
      //       title: 'Image Caption 1',
      //       w: 600,
      //       h: 400
      //     },
      //     {
      //       src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
      //       msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
      //       alt: 'picture2',
      //       title: 'Image Caption 2',
      //       w: 1200,
      //       h: 900
      //     }]
    };
  },
  created() {
    // let pid = this.$route.params.id;
    let { id } = this.$route.params;
    console.log(id)
    // 图文请求
    this.$axios
      .get(`getArticle/${id}`)
      .then(res => {
        // console.log(res.data.data);
        this.photoInfo = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 图片缩略图
    this.$axios
      .get(`getthumimages/${id}`)
      .then(res => {
        // console.log(res.data.data);
        this.imgs = res.data.data;
        // this.imgs.forEach(img =>{
        //   img.w=50,
        //   img.h=100,
        //   img.msrc= img.src;
        // })
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.detail-t h3 {
  font: 16px/2 "";
  color: #99f;
}
.detail-t em {
  margin-right: 5px;
}
.detail-t img {
  margin: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
}

</style>>