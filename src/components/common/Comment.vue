<template>
  <div class="mycontent">
    <div class="photo-comment">
      <ul>
        <li class="photo-t">
          <span class="fl">提交评论</span>
          <span class="fr">
            <a>返回</a>
          </span>
        </li>
        <li class="photo-c">
          <input type="text" v-model="content1" placeholder="请输入用户名"/>
          <textarea v-model="content2" placeholder="请输入内容"></textarea>
        </li>
        <li class="button">
          <mt-button type="primary" size="large" @click="sendMsg">发表评论按钮</mt-button>
        </li>
        <li class="photo-b">
          <div>
            <span class="fl">评论列表</span>
            <span class="fr">44条评论</span>
          </div>
        </li>
      </ul>
      <ul class="photo-list">
        <li
          v-for="(item,index) in msgs"
          :key="index"
        >{{item.user_name}}:{{item.content}}{{item.add_time | relTime}}</li>
      </ul>
      <mt-button type="danger" plain size="large">加载更多按钮</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ["cid"],
  page: 1,
  data() {
    return {
      msgs: [],
      content1:"",
      content2:"",
      // content: `{
      //   user_name:1,
      //   content:2
      //   }` //发表评论的信息
    };
  },
  methods: {
    // 发表评论
    sendMsg() {
      this.$axios
        .post(`postcomment/${this.cid}`, {
          "user_name":`${this.content1}`,
          "content": `${this.content2}`
        })
        .then(res => {
          console.log(res);
          // 加载最新的数据
          this.loadMsgByPage(1);
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadMsgByPage(page) {
      this.$axios
        .get(`getcomments/${this.cid}/${page}`)
        .then(res => {
          console.log(res);
          this.msgs = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.loadMsgByPage(1);
  }
};
</script>

<style>
.photo-comment {
  text-align: center;
}
.photo-comment ul li {
  margin-top: 10px;
}
.photo-t {
  border-bottom: 1px solid #000;
  height: 20px;
  line-height: 20px;
  padding: 5px;
}
.photo-c {
  width: 100%;
}
.photo-c textarea {
  width: 100%;
  height: 50px;
}
.button {
  width: 100%;
  line-height: 20px;
  text-align: center;
  padding: 5px;
}
.photo-list li {
  padding: 5px;
  border-bottom: 1px solid #000;
}
.mint-button--danger.is-plain {
  margin-top: 10px;
}
</style>