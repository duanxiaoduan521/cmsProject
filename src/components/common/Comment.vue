<template>
  <div class="mycontent">
    <div class="photo-comment">
      <ul>
        <li class="photo-t">
          <span class="fl">提交评论</span>
          <span class="fr">
            <a @click="goback">返回</a>
          </span>
        </li>
        <li class="photo-c">
          <textarea v-model="content"></textarea>
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
        <li>匿名用户1：大家好 2018-09-05</li>
        <li>匿名用户2：大家好 2018-09-05</li>
        <li>匿名用户3：大家好 2018-09-05</li>
      </ul>
      <mt-button type="danger" plain size="large" @click="loadMsgByPage">加载更多按钮</mt-button>
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
      msgs: [
        {
          user_name: "匿名1",
          add_time: "2015-04-19T20:09:30.000Z",
          content: "我来评价一下啦"
        }
      ],
      content: "" //发表评论的信息
    };
  },
  methods: {
    init() {
      this.page = 1;
    },
    // 发表评论
    sendMsg() {
      this.$axios
        .post(`postcomment/${this.cid}`, `content=${this.content}`)
        .then(res => {
          // 页码归1
          this.init();
          // 加载最新的数据
          this.loadMsgByPage();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 加载页码
    loadMsgByPage() {
      this.$axios
        .get(`getcomments/${this.cid}?pageindex=${this.page}`)
        .then(res => {
          // console.log(res.data.data);
          // 优势赋值，有时追加this.page===1
          if (this.page === 1) {
            this.msgs = res.data.data;
          } else {
              this.msgs = this.msgs.concat(res.data.data)
          }
          this.page++;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goback(){
        this.$router.go(-1);
    }
  },
  created() {
    this.loadMsgByPage();
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