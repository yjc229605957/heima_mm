<template>
  <!-- 注册对话框 -->
  <el-dialog title="编辑用户" :visible.sync="editFormVisible" center width="477px" class="editBox">
    <!-- 注册表单内容 -->
    <el-form :model="editUserForm" :rules="editUserrules" ref="editUserForm" class="editUserForm">
      <!-- 用户名框 -->
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="editUserForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 邮箱框 -->
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="editUserForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 手机号框 -->
      <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="editUserForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 角色框 -->
      <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
        <el-select v-model="editUserForm.role">
          <el-option label="管理员" value="2"></el-option>
          <el-option label="教师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
        <el-select v-model="editUserForm.status">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <!-- 用户备注框 -->
      <el-form-item label="用户备注" :label-width="formLabelWidth" prop="remake">
        <el-input v-model="editUserForm.remake" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部提交按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="editFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="editUser">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    //手机号自定义校验规则函数
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        // 判断手机号的格式
        // 正则
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        // 判断是否符合
        // .test(验证的字符串) 返回的是 true 或者false
        if (reg.test(value) == true) {
          callback();
        } else {
          // 不满足 手机号的格式
          callback(new Error("老铁，你的手机号写错了噢"));
        }
      }
    };

    //邮箱自定义校验规则函数
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else {
        // 判断手机号的格式
        // 正则
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // 判断是否符合
        // .test(验证的字符串) 返回的是 true 或者false
        if (reg.test(value) == true) {
          callback();
        } else {
          // 不满足 邮箱的格式
          callback(new Error("老铁，你的邮箱写错了噢"));
        }
      }
    };
    return {
      // 是否显示注册对话框
      editFormVisible: false,
      // 注册对话框文字标签宽度
      formLabelWidth: "75px",
      //注册框数据
      editUserForm: {},
      //注册框验证规则
      editUserrules: {
        role: [{ required: true, message: "请选择角色", trigger: "blur" }],
        username: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 16, message: "昵称长度2-16位", trigger: "change" }
        ],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "change" }],
        
      }
    };
  },
  methods: {
    editUser() {}
  }
};
</script>

<style lang='less'>
.editBox {
  .el-dialog {
    height: 557px;
  }
}
</style>