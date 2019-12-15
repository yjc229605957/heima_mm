<template>
  <!-- 登录页面盒子 -->
  <div class="login_box">
    <!-- from表单盒子 -->
    <div class="from_box">
      <!-- 表单标题 -->
      <div class="login_title">
        <img src="../../assets/MM-logo.png" alt />
        <span class="title">黑马面面</span>
        <i></i>
        <span class="login_title">用户登录</span>
      </div>
      <!-- 表单内容 -->
      <el-form ref="form" :model="form" status-icon :rules="rules">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            show-password
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="captcha">
          <!-- 栅格布局 共24份 -->
          <!-- row行 -->
          <el-row>
            <!-- col列 -->
            <el-col :span="18">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.captcha"></el-input>
            </el-col>
            <el-col class="captcha" :span="6">
              <img :src="captchaURL" @click="getCaptcha" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 用户协议复选框 -->
        <el-checkbox v-model="form.checked">
          <div class="checked_text">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </div>
        </el-checkbox>
        <!-- 登录注册按钮 -->
        <el-form-item>
          <el-button type="success" @click="submitForm()">登录</el-button>
          <el-button type="primary" @click="dialogFormVisible = true,getCaptcha('sign_up')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 右侧背景图 -->
    <img src="../../assets/login_banner_ele.png" class="login_pic" />

    <!-- 注册对话框 -->
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible" center>
      <el-form :model="sign_up_Form" :rules="sign_up_rules" ref="sign_up_Form" class="sign_up_Form">
        <el-form-item label="头像" :label-width="formLabelWidth" prop="userPic">
          <el-upload
            auto-upload
            name="image"
            class="avatar-uploader"
            action="http://127.0.0.1/heimamm/public//uploads"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="sign_up_Form.imageUrl" :src="sign_up_Form.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="sign_up_Form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="sign_up_Form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="Phone">
          <el-input v-model="sign_up_Form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input show-password v-model="sign_up_Form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth" prop="img_captcha">
          <el-row>
            <el-col :span="16">
              <el-input v-model="sign_up_Form.img_captcha" autocomplete="off"></el-input>
            </el-col>
            <el-col class="captcha" :span="7" :offset="1">
              <img :src="SUp_captchaURL" @click="getCaptcha('sign_up')" ref="sign_up_captcha" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="sign_up_Form.rcode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button @click="getUserCaptcha">获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="User_register">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "login",

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
      //登录框数据
      form: {
        phone: "", //手机号
        password: "", //密码
        captcha: "", //验证码
        checked: false //用户协议勾选状态
      },

      //登录框验证规则
      rules: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 18, message: "密码长度8-18位", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码错误", trigger: "blur" }
        ]
      },

      // 打开页面 获取  登录框验证码  时间戳要记得加 '&'
      captchaURL: `${
        process.env.VUE_APP_BASEURL
      }/captcha?type=login&${Date.now()}`,

      //打开注册框 获取  注册框验证码
      SUp_captchaURL: `${
        process.env.VUE_APP_BASEURL
      }/captcha?type=sendsms&${Date.now()}`,

      // 是否显示注册对话框
      dialogFormVisible: false,

      // 注册对话框文字标签宽度
      formLabelWidth: "55px",

      //注册框数据
      sign_up_Form: {
        username: "", //用户名
        email: "", //邮箱
        phone: "", //手机号
        password: "", //密码
        img_captcha: "", //图形码
        rcode: "", //验证码
        imageUrl: "", //头像预览地址
        avatar: "" //头像上传地址
      },

      //注册框验证规则
      sign_up_rules: {
        username: [
          { required: true, message: "请输入昵称", trigger: "change" },
          { min: 4, max: 16, message: "昵称长度4-16位", trigger: "change" }
        ],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "change" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 18, message: "密码长度8-18位", trigger: "change" }
        ],
        img_captcha: [
          { min: 4, max: 4, message: "图形码长度4位", trigger: "change" }
        ],
        rcode: [{ min: 4, max: 4, message: "验证码长度4位", trigger: "change" }]
      }
    };
  },
  methods: {
    // 登录表单登录按钮
    submitForm() {
      this.$refs.form.validate(valid => {
        //判断是否勾选用户协议
        if (this.form.checked == false) {
          this.$message.error("请同意用户协议");
        } else {
          //已勾选用户协议 判断输入框是否全部按规则填写
          if (valid) {
            // 输入框验证规则正确,发送登录请求
            //测试手机号 18522222222 12345678
            this.$axios({
              url: `${process.env.VUE_APP_BASEURL}/login`,
              method: "post",
              data: {
                phone: this.form.phone,
                password: this.form.password,
                code: this.form.captcha
              }
            }).then(res => {
              //如果code==200 说明登录成功
              if (res.data.code == 200) {
                this.$message.success("登录成功");
              } else if (
                //如果错误提示为账号密码错误 改成 账号或密码错误
                res.data.message == "登录密码不匹配" ||
                res.data.message == "登录名不匹配"
              ) {
                this.$message.error("账号或密码错误");
                this.getCaptcha();
              } else {
                //以上都不是则提示默认信息 验证码错误
                this.$message.error(res.data.message);
                this.getCaptcha();
              }
              window.console.log(res);
            });
          } else if (valid == "") {
            //如果输入框都没有内容,直接按登录按钮的提示信息
            this.$message.error("请输入账号密码");
          } else {
            return false;
          }
        }
      });
    },
    // 点击验证码图片刷新验证码
    getCaptcha(text) {
      if (text == "sign_up") {
        this.SUp_captchaURL = `${
          process.env.VUE_APP_BASEURL
        }/captcha?type=sendsms&${Date.now()}`;
      } else {
        this.captchaURL = `${
          process.env.VUE_APP_BASEURL
        }/captcha?type=login&${Date.now()}`;
      }
    },
    //头像上传
    handleAvatarSuccess(res, file) {
      this.sign_up_Form.imageUrl = URL.createObjectURL(file.raw);
      this.sign_up_Form.avatar = res.data.file_path;
    },
    // 头像上传前钩子 验证图片格式大小等
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //获取用户注册验证码
    getUserCaptcha() {
      // 判断图形码是否为空
      if (this.sign_up_Form.img_captcha != "") {
        this.$axios({
          url: `${process.env.VUE_APP_BASEURL}/sendsms`,
          method: "post",
          data: {
            code: this.sign_up_Form.img_captcha,
            phone: this.sign_up_Form.phone
          }
        }).then(res => {
          //请求成功后判断图形码是否错误 或者 手机号时候已经注册 成功则弹框提示返回的验证码
          window.console.log(res);
          if (res.data.message == "验证码错误") {
            this.$message.error("图形码错误");
            this.getCaptcha("sign_up");
          } else if (res.data.code == 200) {
            this.$message.success("" + res.data.data.captcha);
          } else {
            this.$message.error(res.data.message);
            this.getCaptcha("sign_up");
          }
        });
      } else {
        this.$message.error("请输入正确的图形码");
      }
    },
    // 用户注册
    User_register() {
      this.$refs.sign_up_Form.validate(valid => {
        //判断输入框是否全部按规则填写
        if (valid) {
          // 输入框验证规则正确,发送注册请求
          this.$axios({
            url: `${process.env.VUE_APP_BASEURL}/register`,
            method: "post",
            data: {
              username: this.sign_up_Form.username,
              phone: this.sign_up_Form.phone,
              email: this.sign_up_Form.email,
              avatar: this.sign_up_Form.avatar,
              password: this.sign_up_Form.password,
              rcode: this.sign_up_Form.rcode
            }
          }).then(res => {
            //如果code==200 说明注册成功
            if (res.data.code == 200) {
              this.$message.success("注册成功");
              this.dialogFormVisible = false;
            } else {
              //如注册失败提示默认信息 然后刷新验证码
              this.$message.error(res.data.message);
              this.getCaptcha();
            }
            window.console.log(res);
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang ="less">
.login_box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  height: 100%;
  /* 登录盒子 */
  .from_box {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding: 44px;
    box-sizing: border-box;
    .login_title {
      display: flex;
      align-items: center;

      img {
        width: 22px;
        height: 17px;
      }
      .title {
        font-size: 24px;
        margin: 0 14px;
      }
      i {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
      }
      .login_title {
        font-size: 22px;
        margin-left: 12px;
      }
    }
    .el-form {
      margin-top: 28px;
      .el-input__inner {
        height: 45px;
      }
      .captcha {
        height: 45px;
        img {
          width: 100%;
          height: 45px;
        }
      }
      .el-checkbox {
        display: flex;
        align-items: center;
        color: #999999;
        .checked_text {
          color: #999999;
          display: flex;
          align-items: center;
        }
      }
      .el-button {
        width: 100%;
        margin: 0;
        margin-top: 28px;
      }
    }
  }
  /* 注册盒子 */
  .el-dialog__wrapper {
    .el-dialog {
      width: 603px;
      height: 768px;
    }
    .el-dialog__header {
      padding: 15px;
      background: linear-gradient(225deg, #1493fa, #01c6fa);
      .el-dialog__title {
        color: #fff;
      }
    }
    .el-dialog__body {
      padding: 25px 25px 10px;
      .captcha {
        height: 40px;
        img {
          height: 40px;
          width: 100%;
        }
      }

      /* 头像框样式 */
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader {
        display: flex;
        justify-content: center;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
}
</style>
