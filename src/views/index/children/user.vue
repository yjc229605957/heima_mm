<template>
  <!-- 用户页面 -->
  <div class="userBox">
    <!-- 搜索栏 -->
    <el-card class="serach-card">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="用户名称" prop="user_name">
          <el-input v-model="formInline.user_name"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="formInline.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="formInline.role_id">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="教师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="but">
          <el-button type="primary" @click="serachBut">搜索</el-button>
          <el-button @click="resetForm">清除</el-button>
          <el-button
            type="primary"
            @click="$refs.addUser.dialogFormVisible = true"
            icon="el-icon-plus"
          >新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 用户列表盒子 -->
    <el-card class="uesrList-card">
      <!-- 用户列表 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editUserBut(scope.row)">编辑</el-button>
            <el-button
              @click="changeStatus(scope.row.id)"
              type="text"
              :style="{color:scope.row.status == 1?'red':'#409EFF'}"
            >{{scope.row.status == 1?'禁用':'启用'}}</el-button>
            <el-button type="text" @click="removeUser(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页插件 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 15]"
        :page-size="page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增用户 -->
    <addUser ref="addUser"></addUser>
    <!-- 编辑用户 -->
    <editUser ref="editUser"></editUser>
  </div>
</template>

<script>
import { userList, userRemove, userStatus } from "../../../api/user.js";
import addUser from "./user/addUser";
import editUser from "./user/editUser";
export default {
  name: "user",
  components: { addUser, editUser },
  data() {
    return {
      // 搜索框数据
      formInline: {
        user_name: "",
        email: "",
        role_id: ""
      },
      // 列表数据
      tableData: [],
      //分页数据
      page: 1,
      page_size: 5,
      total: 10
    };
  },
  methods: {
    // 获取用户列表方法
    getData() {
      userList({
        page: this.page,
        limit: this.page_size,
        ...this.formInline
      }).then(res => {
        window.console.log(res)
        this.tableData = res.data.data.items;
        this.page = +res.data.data.pagination.page;
        this.total = res.data.data.pagination.total;
      });
    },
    // 点击搜索按钮
    serachBut() {
      this.page = 1;
      this.getData();
    },
    // 点击清空按钮
    resetForm() {
      this.$refs.formInline.resetFields();
      this.getData();
    },
    //点击编辑按钮
    editUserBut(obj){
      this.$refs.editUser.editFormVisible = true
      this.$refs.editUser.editUserForm = JSON.parse(JSON.stringify(obj))
    },
    // 用户状态 切换
    changeStatus(id) {
      userStatus(id).then(res => {
        if (res.data.code == 200) {
          this.$message.success("操作成功");
          this.getData();
        }
      });
    },
    // 删除用户
    removeUser(id) {
      this.$confirm("是否删除该用户?", "操作警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        userRemove(id).then(res => {
          if (res.data.code == 200) {
            this.$message.success("删除成功");
            this.getData();
          }
        });
      });
    },
    // 分页 每页条数变化
    handleSizeChange(val) {
      this.page = 1
      this.page_size = val;
      this.getData();
    },
    // 分页 页码变化
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang='less'>
.userBox {
  .serach-card {
    margin-bottom: 20px;
    .el-form-item {
      input {
        width: 150px;
      }
    }
    .el-form-item:nth-child(1) {
      input {
        width: 100px;
      }
    }
  }
  .uesrList-card {
    .el-card__body {
      .el-pagination {
        text-align: center;
        margin-top: 20px;
      }
    }
  }
}
</style>