<template>
  <div class="app">
    {{msg}}
    <div class="header">
      <div class="header_left">
        <img src="@/assets/后台.png" alt="" width="60px">
        <span>后台管理系统</span>
      </div>
      <div class="header_right">
        <i class="fa fa-user-md"></i>
        <span>你好！admin</span>
        <i class="fa fa-wrench"></i>
        <i class="fa fa-close"></i>
      </div>
    </div>
    <div class="content">
      <div class="left_nav">
        <ul>
          <li :class="{current:currentRoute=='/'}">
            <i class="fa fa-home"></i>
            <router-link to='/'><span>欢迎页面</span></router-link>
          </li>
          <li :class="{current:currentRoute=='/category'}">
            <i class="fa fa-list"></i>
            <router-link to='/category'><span>栏目管理</span></router-link></li>
          <li :class="{current:currentRoute=='/article'}">
            <i class="fa fa-desktop"></i>
            <router-link to='/article'><span>文章管理</span></router-link></li>
          <li :class="{current:currentRoute=='/user'}">
            <i class="fa fa-user"></i>
            <router-link to='/user'><span>用户管理</span></router-link></li>
            <li :class="{current:currentRoute=='/comment'}">
            <i class="fa fa-comments"></i>
            <router-link to='/comment'><span>评论管理</span></router-link></li>
        </ul>
      </div>
      <div class="right_content">
        <div class="wrap">
        <router-view></router-view>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        msg:'app.vue',
        currentRoute:'/'
      }
    },
    created(){
      this.currentRoute=this.$route.path
    },
    watch:{
      '$route':function(to,from){
        this.currentRoute=to.path;  
      }
    }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    color: #666;
  }
  *::selection{
    color:gold;
    background-color: teal
  }
  html{
    font:normal normal 12px '微软雅黑';
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;

  }
  /*修改模态框内边距，美化布局*/
  .el-dialog__body{
    padding: 0 20px;
  }
  .header{
    position: absolute;
    width: 100%;
    /*height: 80px;*/
    top: 0;
    background-color: #fff;
    box-shadow: 0 3px 10px #ccc;
    z-index: 1;
  }
  .header_left{
    padding: 10px 0 5px 10px;
    /*line-height: 80px;*/
    /*padding-left: 15px;*/
    float: left;
    overflow: hidden;
  }
  .header_left>span{
    color: #8231d8;
    font-size: 24px;
    font-weight: bold;
    float: right;
    margin-left: 10px
  }
  .header_right{
    float: right;
    padding-top: 15px;
    margin-right: 20px;
  }
  .header_right .fa{
    font-size: 28px;
    margin-left: 10px;
    color:#666
  }
  .header_right span{
    font-size: 18px;
  }
  .header_right>:first-child{
    margin-right: 10px;
  }
  .header_right>:nth-child(3){
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
    padding-left: 15px;
    padding-right: 15px;
  }
  .header_right>:last-child{
    color:#db5a4b;
  }
  .content{
    position: absolute;
    width: 100%;
    top: 61px;
    bottom: 0;
  }
  .content>.left_nav{
    width: 180px;
    height: 100%;
    border-right: 1px solid #ccc;
    box-shadow: 3px 0 10px #ccc;
    float: left;
  }
  .content>.left_nav li{
    font-size: 16px
  }
  .left_nav .fa{
    margin-right: 10px
  }
  .content>.right_content{
    box-sizing: border-box;
    margin-left: 180px;
    height: 100%;
    background-color: #f6f6f6;
    padding: 1em;
  }
  .content>.right_content>.wrapper{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .left_nav ul li{
    line-height: 2.6em;
    text-align: center;
    /*border-bottom: 1px solid #dddddd;*/
  }
  .left_nav ul li:hover{
    background-color: #ededed;
  }
  .left_nav ul li.current{
    background: linear-gradient(to right, #5b9bfb 0%,#e26dff 100%);
    font-size: 20px;
    /*border-right: 1.5px solid #5b9bfb*/
    box-shadow: 2px 0 5px #5b9bfb
  }
  .current i,.current span{
    color: #fff;
  }
</style>