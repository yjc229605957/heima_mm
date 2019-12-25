<template>
  <!-- 编辑对话框 -->
  <el-dialog title="编辑题库测试" :visible.sync="editFormVisible" center fullscreen class="editQuestionBox" opened="opend">
    <!-- 编辑表单内容 -->
    <el-form
      :model="editQuestionForm"
      :rules="editQuestionrules"
      ref="editQuestionForm"
      class="editQuestionForm"
      label-position="left"
    >
      <!-- 学科 -->
      <el-form-item label="学科" :label-width="formLabelWidth" prop="subject">
        <el-select v-model="editQuestionForm.subject" placeholder="请选择学科">
          <el-option
            v-for="(item, index) in this.$parent.subjectList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 阶段 -->
      <el-form-item label="阶段" :label-width="formLabelWidth" prop="step">
        <el-select v-model="editQuestionForm.step" placeholder="请选择阶段">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <!-- 企业 -->
      <el-form-item label="企业" :label-width="formLabelWidth" prop="enterprise">
        <el-select v-model="editQuestionForm.enterprise" placeholder="请选择企业">
          <el-option
            v-for="(item, index) in this.$parent.enterpriseList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 城市 -->
      <el-form-item label="城市" :label-width="formLabelWidth" prop="city">
        <el-cascader
          size="large"
          :props="{value:'label'}"
          :options="options"
          v-model="editQuestionForm.city"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <!-- 题型 -->
      <el-form-item label="题型" :label-width="formLabelWidth" prop="type">
        <el-radio-group v-model="editQuestionForm.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 难度 -->
      <el-form-item label="难度" :label-width="formLabelWidth" prop="difficulty">
        <el-radio-group v-model="editQuestionForm.difficulty">
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
      <!-- 单选答案 -->
      <el-form-item
        label="单选"
        v-if="editQuestionForm.type == 1"
        :label-width="formLabelWidth"
        prop="select_options"
        class="answerBox"
      >
        <el-radio-group v-model="editQuestionForm.single_select_answer" class="answer">
          <!-- 答案A -->
          <div class="radio-box bottom_30">
            <el-radio label="A">A</el-radio>
            <el-input v-model="editQuestionForm.select_options[0].text"></el-input>
            <el-upload
              class="avatar-uploader"
              :action="`http://127.0.0.1/heimamm/public/question/upload`"
              :show-file-list="false"
              :on-success="handleASuccessA"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="editQuestionForm.select_options[0].image"
                :src="`${baesUrl}/${editQuestionForm.select_options[0].image}`"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 答案B -->
          <div class="radio-box bottom_30">
            <el-radio label="B">B</el-radio>
            <el-input v-model="editQuestionForm.select_options[1].text"></el-input>
            <el-upload
              class="avatar-uploader"
              :action="`http://127.0.0.1/heimamm/public/question/upload`"
              :show-file-list="false"
              :on-success="handleASuccessB"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="editQuestionForm.select_options[1].image"
                :src="`${baesUrl}/${editQuestionForm.select_options[1].image}`"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 答案C -->
          <div class="radio-box bottom_30">
            <el-radio label="C">C</el-radio>
            <el-input v-model="editQuestionForm.select_options[2].text"></el-input>
            <el-upload
              class="avatar-uploader"
              :action="`http://127.0.0.1/heimamm/public/question/upload`"
              :show-file-list="false"
              :on-success="handleASuccessC"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="editQuestionForm.select_options[2].image"
                :src="`${baesUrl}/${editQuestionForm.select_options[2].image}`"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 答案D -->
          <div class="radio-box bottom_30">
            <el-radio label="D">D</el-radio>
            <el-input v-model="editQuestionForm.select_options[3].text"></el-input>
            <el-upload
              class="avatar-uploader"
              :action="`http://127.0.0.1/heimamm/public/question/upload`"
              :show-file-list="false"
              :on-success="handleASuccessD"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="editQuestionForm.select_options[3].image"
                :src="`${baesUrl}/${editQuestionForm.select_options[3].image}`"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-radio-group>
      </el-form-item>
      <!-- 多选答案 -->
      <el-form-item
        label="多选"
        v-if="editQuestionForm.type == 2"
        :label-width="formLabelWidth"
        prop="select_options"
        class="answerBox"
      >
        <el-checkbox-group v-model="editQuestionForm.multiple_select_answer" class="answer">
          <!-- 答案A -->
          <div class="checked-box bottom_30">
            <el-checkbox label="A">A</el-checkbox>
            <el-input v-model="editQuestionForm.select_options[0].text"></el-input>
            <el-upload
              class="avatar-uploader"
              :action="`http://127.0.0.1/heimamm/public/question/upload`"
              :show-file-list="false"
              :on-success="handleASuccessA"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="editQuestionForm.select_options[0].image"
                :src="`${baesUrl}/${editQuestionForm.select_options[0].image}`"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 答案B -->
          <div class="checked-box bottom_30">
            <el-checkbox label="B">B</el-checkbox>
            <el-input v-model="editQuestionForm.select_options[1].text"></el-input>
            <el-upload
              class="avatar-uploader"
              :action="`http://127.0.0.1/heimamm/public/question/upload`"
              :show-file-list="false"
              :on-success="handleASuccessB"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="editQuestionForm.select_options[1].image"
                :src="`${baesUrl}/${editQuestionForm.select_options[1].image}`"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 答案C -->
          <div class="checked-box bottom_30">
            <el-checkbox label="C">C</el-checkbox>
            <el-input v-model="editQuestionForm.select_options[2].text"></el-input>
            <el-upload
              class="avatar-uploader"
              :action="`http://127.0.0.1/heimamm/public/question/upload`"
              :show-file-list="false"
              :on-success="handleASuccessC"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="editQuestionForm.select_options[2].image"
                :src="`${baesUrl}/${editQuestionForm.select_options[2].image}`"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 答案D -->
          <div class="checked-box bottom_30">
            <el-checkbox label="D">D</el-checkbox>
            <el-input v-model="editQuestionForm.select_options[3].text"></el-input>
            <el-upload
              class="avatar-uploader"
              :action="`http://127.0.0.1/heimamm/public/question/upload`"
              :show-file-list="false"
              :on-success="handleASuccessD"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="editQuestionForm.select_options[3].image"
                :src="`${baesUrl}/${editQuestionForm.select_options[3].image}`"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <!-- 简答答案 -->
      <el-form-item
        label="简答"
        v-if="editQuestionForm.type == 3"
        :label-width="formLabelWidth"
        prop="select_options"
        class="answerBox short"
      >
        <el-input
          type="textarea"
          class="input_answer"
          placeholder="请输入答案"
          v-model="editQuestionForm.short_answer"
          clearable
          resize="none"
        ></el-input>
      </el-form-item>
      <!-- 华丽的分隔线 -->
      <hr />
      <!-- 解析答案 -->
      <el-form-item label="解析视频" :label-width="formLabelWidth" class="answerBox">
        <!-- 上传按钮 -->
        <el-upload
          class="upload-demo"
          action="http://127.0.0.1/heimamm/public/question/upload"
          :on-success="VideoSuccess"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传视频格式文件</div>
        </el-upload>
        <video
          class="preview-video"
          :src="`${baesUrl}/${editQuestionForm.video}`"
          v-if="editQuestionForm.video"
          controls
        ></video>
      </el-form-item>
      <!-- 华丽的分隔线 -->
      <hr />
      <el-form-item label="答案解析" prop="difficulty" class="analysis">
        <wangEditorTwo ref="wangEditorTwo"></wangEditorTwo>
      </el-form-item>
      <!-- 华丽的分隔线 -->
      <hr class="answerBox" />
      <el-form-item label="试题备注" prop="difficulty" class="analysis">
        <el-input
          type="textarea"
          class="input_answer"
          placeholder="请输入答案"
          v-model="editQuestionForm.remark"
          clearable
          resize="none"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部提交按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="editFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="editQuestion">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入省市联动组件
import { regionData } from "element-china-area-data";
//导入试题标题wang富文本
import wangEditor from "./wangEditor";
//导入答案解析wang富文本
import wangEditorTwo from "./wangEditor2";
//导入增加函数
import { questionEdit } from "../../../../api/question";

export default {
  name: "editQuestion",
  components: {
    wangEditor,
    wangEditorTwo
  },
  // --------------------------------------------------------------------------------------------

  data() {
    return {
      //基地址
      baesUrl: process.env.VUE_APP_BASEURL,
      //省市联动数据
      options: regionData,
      selectedOptions: [],
      //编辑窗口数据
      editQuestionForm: {
        subject: "", //学科
        step: "", //阶段
        enterprise: "", //企业
        city: "", //城市
        type: 1, //题型
        difficulty: 1, //难度
        title: "123", //题目
        // 选项 内容 图片
        select_options: [
          { label: "A", text: "", image: "" },
          { label: "B", text: "", image: "" },
          { label: "C", text: "", image: "" },
          { label: "D", text: "", image: "" }
        ], //答案选项内容
        single_select_answer: "", //单选答案
        multiple_select_answer: [], //多选答案
        short_answer: "", //简答答案
        remark: "", //题目备注
        answer_analyze: "123", // 答案解析
        video: "" //解析视频地址
      },
      //是否显示编辑窗口
      editFormVisible: false,
      //编辑窗口标签宽度
      formLabelWidth: "80px",
      //编辑窗口验证规则
      editQuestionrules: {
        subject: [{ required: true, message: "请选择学科", trigger: "change" }],
        step: [{ required: true, message: "请选择阶段", trigger: "change" }],
        enterprise: [
          { required: true, message: "请选择企业", trigger: "change" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        difficulty: [
          { required: true, message: "请选择难度", trigger: "change" }
        ],
        title: [{ required: true, message: "请填写标题", trigger: "change" }],
        select_options: [
          { required: true, message: "请填写答案", trigger: "change" }
        ]
      },
      // 题目答案解析视频的上传地址
      fileList: []
    };
  },
  // --------------------------------------------------------------------------------------------

  methods: {
    //编辑确认按钮
    editQuestion() {
      this.$refs.wangEditor.getData();
      this.editQuestionForm.answer_analyze = this.$refs.wangEditorTwo.getData();
      questionEdit(this.editQuestionForm).then(res => {
        if (res.data.code == 200) {
          this.$message.success("编辑成功");
          this.editFormVisible = false;
          this.$parent.getList();
        }
      });
    },
    //省市联动选择
    handleChange(val) {
      window.console.log(val);
    },
    //答案选项上传图片的函数--------------------------------------------------
    handleASuccessA(res, file) {
      this.editQuestionForm.select_options[0].image = URL.createObjectURL(
        file.raw
      );
      this.editQuestionForm.select_options[0].image = res.data.url;
    },
    handleASuccessB(res, file) {
      this.editQuestionForm.select_options[1].image = URL.createObjectURL(
        file.raw
      );
      this.editQuestionForm.select_options[1].image = res.data.url;
    },
    handleASuccessC(res, file) {
      this.editQuestionForm.select_options[2].image = URL.createObjectURL(
        file.raw
      );
      this.editQuestionForm.select_options[2].image = res.data.url;
    },
    handleASuccessD(res, file) {
      this.editQuestionForm.select_options[3].image = URL.createObjectURL(
        file.raw
      );
      this.editQuestionForm.select_options[3].image = res.data.url;
    },
    // 上传之前的判断逻辑-----------------------------------------------------
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
    },

    //答案解析视频上传函数------------------------------------------------------
    VideoSuccess(res, file) {
      window.console.log(file, res);
      this.editQuestionForm.video = res.data.url;
    },
    handlePreview(file) {
      window.console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    // 删除前钩子
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //打开动画结束时的opend钩子
    opend(){
      this.$refs.wangEditor.pushData()
      this.editQuestionForm.title
    }
  }
};
</script>

//---------------------------------------------------------------------------------
<style lang="less">
.editQuestionBox {
  .el-dialog {
    .el-dialog__header {
      .el-dialog__close {
        color: #fff;
      }
    }
    .el-dialog__body {
      width: 60%;
      margin: 0 auto;
      // pediting: 31px 300px;
      // 答案区域样式
      .answerBox {
        margin-top: 60px;
        .input_answer {
          textarea {
            height: 150px;
          }
        }
        .preview-video {
          width: 320px;
        }
        .answer {
          width: 100%;
          .bottom_30 {
            margin-bottom: 45px;
          }
          .radio-box,
          .checked-box {
            display: flex;
            align-items: center;
            width: 100%;
            .el-checkbox {
              margin-right: 30px;
            }
          }
          // 输入框样式
          .el-input {
            width: 100%;
          }

          // 上传框样式
          .avatar-uploader {
            display: inline-block;
            margin: 0 30px;
          }
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
        width: 100%;
      }
      // 试题标题富文本
      .title,
      .analysis {
        .el-form-item__label {
          width: 100%;
          margin-top: 37px;
          margin-bottom: 22px;
        }
        .editorBody,
        .editor,
        .editorBody2,
        .editor2 {
          border: 1px solid #ccc;
        }
        .editor,
        .editor2 {
          border-bottom: 0px;
          width: 100%;
          height: 50px;
        }
      }
      .short {
        margin-bottom: 60px;
        .el-form-item__label {
          line-height: 1;
        }
      }
    }
  }
}
</style>