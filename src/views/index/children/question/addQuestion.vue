<template>
  <!-- 新增对话框 -->
  <el-dialog title="新增题库测试" :visible.sync="addFormVisible" center fullscreen class="addQuestionBox">
    <!-- 新增表单内容 -->
    <el-form
      :model="addQuestionForm"
      :rules="addQuestionrules"
      ref="addQuestionForm"
      class="addQuestionForm"
      label-position="left"
    >
      <!-- 学科 -->
      <el-form-item label="学科" :label-width="formLabelWidth" prop="subject">
        <el-select v-model="addQuestionForm.subject" placeholder="请选择学科">
          <el-option label="管理员" value="2"></el-option>
          <el-option label="教师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>
      <!-- 阶段 -->
      <el-form-item label="阶段" :label-width="formLabelWidth" prop="step">
        <el-select v-model="addQuestionForm.step" placeholder="请选择阶段">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <!-- 企业 -->
      <el-form-item label="企业" :label-width="formLabelWidth" prop="enterprise">
        <el-select v-model="addQuestionForm.enterprise" placeholder="请选择企业">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <!-- 城市 -->
      <el-form-item label="城市" :label-width="formLabelWidth" prop="city">
        <el-cascader
          size="large"
          :options="options"
          v-model="addQuestionForm.city"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <!-- 题型 -->
      <el-form-item label="题型" :label-width="formLabelWidth" prop="type">
        <el-radio-group v-model="addQuestionForm.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 难度 -->
      <el-form-item label="难度" :label-width="formLabelWidth" prop="difficulty">
        <el-radio-group v-model="addQuestionForm.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 华丽的分隔线 -->
      <hr />
      <!-- 试题标题 -->
      <el-form-item label="试题标题" prop="title" class="title">
        <wangEditor ref="wangEditor"></wangEditor>
      </el-form-item>
      <!-- 试题答案 三种类型 需要按上面的题型选择判断显示-->
      <el-form-item label="单选" :label-width="formLabelWidth" prop="difficulty" class="answerBox">
        <el-radio-group v-model="addQuestionForm.difficulty" class="answer">
          <div class="radio-box">
            <el-radio label="A">A</el-radio>
            <el-input v-model="addQuestionForm.select_options[0].text" placeholder></el-input>
            <el-upload
              class="avatar-uploader"
              :action="`http://127.0.0.1/heimamm/public/question/upload`"
              :show-file-list="false"
              :on-success="handleASuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageAUrl" :src="imageAUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <!-- 底部提交按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addQuestion">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { regionData } from "element-china-area-data";
import wangEditor from "../question/wangEditor";

export default {
  name: "addQuestion",
  components: {
    wangEditor
  },
  data() {
    return {
      //省市联动数据
      options: regionData,
      selectedOptions: [],
      //新增窗口数据
      addQuestionForm: {
        subject: "",
        step: "",
        enterprise: "",
        city: "",
        type: 1,
        difficulty: 1,
        title: "",
        select_options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }]
      },
      //是否显示新增窗口
      addFormVisible: false,
      //新增窗口标签宽度
      formLabelWidth: "80px",
      //新增窗口验证规则
      addQuestionrules: {
        subject: [{ required: true, message: "请选择学科", trigger: "blur" }],
        step: [{ required: true, message: "请选择阶段", trigger: "blur" }],
        enterprise: [
          { required: true, message: "请选择企业", trigger: "blur" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        difficulty: [
          { required: true, message: "请选择难度", trigger: "blur" }
        ],
        title: [{ required: true, message: "请填写标题", trigger: "blur" }]
      },
      // 题目答案的上传图片地址
      imageAUrl: ""
    };
  },
  methods: {
    //新增确认按钮
    addQuestion() {},
    //省市联动选择
    handleChange(val) {
      window.console.log(val);
    },
    // 上传成功回调函数
    handleASuccess(res, file) {
      this.imageAUrl = URL.createObjectURL(file.raw);
      this.form.select_options[0].image = res.data.url;
    },
    // 上传之前的判断逻辑
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.addQuestionBox {
  .el-dialog {
    .el-dialog__header {
      .el-dialog__close {
        color: #fff;
      }
    }
    .el-dialog__body {
      padding: 31px 300px;
      // 答案区域样式
      .answerBox {
        .answer {
          // .el-radio,
          // .el-input{
          //   display: inline-block ;
          // }
          // 输入框样式
          .el-input {
            width: 476px;
          }

          // 上传框样式
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
      //input框的宽度
      .el-input__inner {
        width: 364px;
      }
      // 试题标题富文本
      .title {
        .el-form-item__label {
          width: 100%;
        }
        .editorBody,
        .editor {
          border: 1px solid #ccc;
        }
        .editor {
          border-bottom: 0px;
          width: 100%;
          height: 50px;
        }
      }
    }
  }
}
</style>