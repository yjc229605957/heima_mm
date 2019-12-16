<template>
  <el-container>
    <el-header class="header">
      <div class="left">
        <i :class="iconClass" @click="iconTrrag"></i>
        <img src="../../assets/index_logo.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img src="../../assets/刺客五六七1.jpg" alt />
        <span class="userInfo">阿七，你好</span>
        <el-button size="small" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-menu default-active="/index/subject" class="el-menu-vertical-demo" :collapse="isCollapse" router>
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
      <!-- 设置嵌套子路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import {userInfo} from '../../api/index';
export default {
  data() {
    return {
      isCollapse: false,
      iconClass: "el-icon-s-fold",
      token: localStorage.getItem("token")
    };
  },
  methods: {
    iconTrrag() {
      this.isCollapse = !this.isCollapse;
      if (this.iconClass == "el-icon-s-fold") {
        this.iconClass = "el-icon-s-unfold";
      } else {
        this.iconClass = "el-icon-s-fold";
      }
    }
  },
  // created(){
  //   userInfo({
  //     token:localStorage.getItem("token")
  //   }).then(res=>{
  //     window.console.log(res)
  //   })
  // }
};
</script>

<style lang = 'less'>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
body > .el-container {
  height: 100%;
  .header {
    /* width: 100%; */
    height: 60px;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
      i {
        font-size: 28px;
        margin-right: 22px;
        cursor: pointer;
      }
      img {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      span {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 15px;
      }
      .userInfo {
        margin-right: 30px;
        font-size: 14px;
        color: #636363;
      }
      .el-button {
        color: #fff;
      }
    }
  }
  .el-header {
    background-color: #fff;
  }

  .el-aside {
    background-color: #fff;
    border-top: 1px solid #eeeeee95;
  }

  .el-main {
    background-color: #e8e9ec;
  }
}
</style>