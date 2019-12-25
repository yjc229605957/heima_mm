<template>
  <el-container>
    <el-header class="header">
      <div class="left">
        <i :class="iconClass" @click="iconTrrag"></i>
        <img src="../../assets/index_logo.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="userInfo.avatar" alt />
        <span class="userInfo">{{userInfo.username}}，你好</span>
        <el-button size="small" type="primary" @click="userLogout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          router
        >
          <template v-for="item in children">
            <el-menu-item
              :key="item.path"
              :index="'/index/'+item.path"
              v-if="item.meta.power.includes(userInfo.role)"
            >
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.name}}</span>
            </el-menu-item>
          </template>
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
import { removeToken } from "@/utils/token";
import { userLogout } from "@/api/user.js";
import children from "@/router/children";
export default {
  data() {
    return {
      isCollapse: false,
      iconClass: "el-icon-s-fold",
      userInfo: "",
      children
    };
  },
  methods: {
    //点击左上角列表图标 进行列表的缩放和改变
    iconTrrag() {
      this.isCollapse = !this.isCollapse;
      if (this.iconClass == "el-icon-s-fold") {
        this.iconClass = "el-icon-s-unfold";
      } else {
        this.iconClass = "el-icon-s-fold";
      }
    },
    //退出按钮 用户退出登录
    userLogout() {
      //根据用户点击按钮进行下一步
      this.$confirm("是否要登出账号?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //点击确认按钮 发送退出登录请求
        userLogout().then(res => {
          window.console.log(res);
          //退出成功后 提示退出成功 并删除token后转跳到登录页
          if (res.data.code === 200) {
            this.$message({
              type: "success",
              message: "退出成功!"
            });
            removeToken();
            this.$router.push("/login");
          }
        });
      });
    }
  },
  created() {
    this.userInfo = this.$store.state.userInfo;
  }
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