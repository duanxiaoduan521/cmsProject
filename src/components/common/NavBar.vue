<template>
  <div class="NavBar">
    <mt-header :title="title">
      <div @click="goback" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
  </div>
</template>

<script>
export default {
    name:'NavBar',
    props:['title'],//props属性在template中可以直接用
    created(){
        // 在这里就是用this.title
    },
    methods:{
      goback(){
          this.$router.go(-1);
      }
    },
  data() {
    return {
        
    };
  }
};
</script>

<style scoped>
.NavBar .mint-header {
  background-color: green;
}
</style>