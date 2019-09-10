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
          <input type="text" v-model="content1" placeholder="请输入用户名"/>
          <input v-model="content2" placeholder="请输入内容"/>
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
      <mt-button type="danger" plain size="large" @click="loadMsgByPage" :disabled="disabled">加载更多按钮</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ["cid"],
  data() {
    return {
      msgs: [],
      content1:"",
      content2:"",
      page:1,
      disabled:false
    };
  },
  methods: {
    init(){
        this.page = 1;
    },
    // 发表评论
    sendMsg() {
      this.$axios
        .post(`postcomment/${this.cid}`, {
          "user_name":`${this.content1}`,
          "content": `${this.content2}`
        })
        .then(res => {
          // console.log(res);
          // 页码归一
          this.init();
          // 加载最新的数据
          this.loadMsgByPage();
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    goback(){
        this.$router.go(-1);
    },
    loadMsgByPage() {
      this.$axios
        .get(`getcomments/${this.cid}/${this.page}`)
        .then(res => {
          // console.log(res);
          // 判断相应数据是否不足5条，如果是，禁止按钮并给提示
          if(res.data.data.length < 5){
              this.$toast({
                message: '没有数据了',
                iconClass: 'icon icon-success'
              });
              // 禁止再次点击
              this.disabled = true;
              return;
          }
          // 有时赋值，有时追加（this.page===1）
          if(this.page === 1){
            this.msgs = res.data.data;
          }else{
            this.msgs = this.msgs.concat(res.data.data)
          }
            this.page++;
        })
        .catch(err => {
          console.log(err);
        });
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
.photo-c input {
  margin: 0 5px;
  height: 30px;
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