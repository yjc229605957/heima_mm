<template>
  <!-- 题库页面 -->
  <div class="questionBox">
    <!-- 搜索栏 -->
    <el-card class="serach_card">
      <el-form :inline="true" :model="formInline" ref="formInline" class="serach-form-inline">
        <!-- 学科 -->
        <el-form-item label="学科" prop="subject">
          <el-select v-model="formInline.subject" placeholder="请选择学科">
            <!-- 获取学科后v-for渲染 -->
            <el-option
              v-for="(item, index) in subjectList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 阶段 -->
        <el-form-item label="阶段" prop="step">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <!-- 企业 -->
        <el-form-item label="企业" prop="enterprise">
          <el-select v-model="formInline.enterprise" placeholder="请选择企业">
            <!-- 获取企业后v-for渲染 -->
            <el-option
              v-for="(item, index) in enterpriseList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 题型 -->
        <el-form-item label="题型" prop="type">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="简单" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <!-- 难度 -->
        <el-form-item label="难度" prop="difficulty">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="简单" :value="1"></el-option>
            <el-option label="一般" :value="2"></el-option>
            <el-option label="困难" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="creater">
          <el-input v-model="formInline.creater" placeholder="输入作者"></el-input>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <!-- 日期 -->
        <el-form-item label="日期" prop="create_date">
          <!-- 
          align="right"-->
          <el-date-picker v-model="formInline.create_date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <!-- 标题 -->
        <el-form-item label="标题" class="serach_title" prop="title">
          <el-input v-model="formInline.title" placeholder="输入题目标题"></el-input>
        </el-form-item>
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button type="primary" @click="serachBut">搜索</el-button>
          <el-button @click="removeBut">清除</el-button>
          <el-button
            type="primary"
            @click="$refs.addQuestion.addFormVisible = true"
            icon="el-icon-plus"
          >新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 题库列表 -->
    <el-card class="questionList_card">
      <!-- 题库列表表单 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="title" label="题目">
          <template slot-scope="scope">
            <p v-html="scope.row.title"></p>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段">
          <template slot-scope="scope">
            <span>{{scope.row.subject_name}}-</span>
            <span>{{{1:'初级',2:'中级',3:'高级'}[scope.row.step]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="题型">
          <template slot-scope="scope">
            <span>{{{1:'单选',2:'多选',3:'简答'}[scope.row.type]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span
              :style="{color:scope.row.status == 1?'#000':'#FF3D3D'}"
            >{{scope.row.status == 1?'启用':'禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <!-- v-if判断不在白名单内的角色看不见该标签 -->
        <el-table-column
          label="操作"
          width="130"
          v-if="['超级管理员','管理员','老师'].includes($store.state.userInfo.role)"
        >
          <template slot-scope="scope">
            <!-- v-power权限黑名单 匹配名单再内的角色不显示该功能 -->
            <el-button v-power="['学生']" type="text" size="small" @click="editQuestion(scope.row)">编辑</el-button>
            <el-button
              v-power="['学生']"
              @click="changeStatus(scope.row)"
              type="text"
              size="small"
              :style="{color:scope.row.status === 0?'#46A0FF':'red'}"
            >{{scope.row.status == 0?'启用':'禁用'}}</el-button>
            <el-button
              v-power="['学生']"
              type="text"
              size="small"
              @click="removeQuestion(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页插件 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 15, 25, 35]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <addQuestion ref="addQuestion"></addQuestion>
    <editQuestion ref="editQuestion"></editQuestion>
  </div>
</template>

<script>
import {
  questionList,
  questionStatus,
  questionRemove
} from "../../../api/question";
import { subjectList } from "../../../api/subject";
import { enterpriseList } from "../../../api/enterprise";
import addQuestion from "../children/question/addQuestion";
import editQuestion from "../children/question/editQuestion";
export default {
  components: {
    addQuestion,
    editQuestion
  },
  name: "question",
  data() {
    return {
      // 搜索栏数据
      formInline: {
        subject: "", //学科
        step: "", //阶段
        enterprise: "", //企业
        type: "", //题型
        difficulty: "", //难度
        creater: "", //作者
        status: "", //状态
        create_date: "", //创建日期
        title: "" //标题
      },
      // 题库列表数据
      tableData: [],
      // 当前页
      page: 1,
      //每页条数
      pageSize: 5,
      //总条数
      total: 5,
      // 企业下拉列表数据
      enterpriseList: "",
      // 学科下拉列表数据
      subjectList: ""
    };
  },
  methods: {
    //获取题目列表方法
    getList() {
      questionList({
        page: this.page,
        limit: this.pageSize,
        ...this.formInline
      }).then(res => {
        window.console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
        this.page = +res.data.data.pagination.page;
      });
    },
    //搜索按钮 按条件搜索
    serachBut() {
      this.page = 1;
      this.getList();
    },
    //清除按钮 清空条件
    removeBut() {
      window.console.log("清除");
      this.$refs.formInline.resetFields();
      this.getList();
    },
    //点击编辑按钮
    editQuestion(item) {
      this.$refs.editQuestion.editFormVisible = true;
      this.$refs.editQuestion.editQuestionForm = JSON.parse(
        JSON.stringify(item)
      );
      this.$refs.editQuestion.editQuestionForm.city = this.$refs.editQuestion.editQuestionForm.city.split(
        ","
      );
      this.$refs.editQuestion.editQuestionForm.multiple_select_answer = this.$refs.editQuestion.editQuestionForm.multiple_select_answer.split(
        ","
      );
    },
    //点击修改状态
    changeStatus(item) {
      questionStatus(item.id).then(res => {
        if (res.data.code == 200) {
          this.$message.success("操作成功");
          this.getList();
        }
      });
    },
    //点击删除题目
    removeQuestion(item) {
      this.$confirm("确定要删除此题目吗?", "操作提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        questionRemove(item.id).then(res => {
          window.console.log(res);
          if (res.data.code == 200) {
            if (this.tableData.length <= 1) {
              this.page--;
              window.console.log(this.page);
            }
            this.$message.success("删除成功");
            this.getList();
          }
        });
      });
    },
    // 分页每页条数变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList(0);
    },
    //分页页码变化
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    }
  },
  created() {
    //获取题目列表
    this.getList();
    //获取企业下拉框数据
    enterpriseList({
      limit: 9999
    }).then(res => {
      this.enterpriseList = res.data.data.items;
    });
    //获取学科下拉框数据
    subjectList({
      limit: 9999
    }).then(res => {
      this.subjectList = res.data.data.items;
    });
  }
};
</script>

<style lang="less">
.questionBox {
  .serach_card {
    .el-card__body {
      .serach_title {
        .el-input__inner {
          width: 400px;
        }
      }
      .el-form-item__label {
        padding: 0 30px;
      }
    }
    .el-form--inline {
      padding-right: 25%;
      .el-date-editor.el-input {
        width: 100%;
      }
    }
    .el-input__inner {
      width: 150px;
    }
  }
  .questionList_card {
    margin-top: 20px;
    .el-card__body {
      .el-pagination {
        text-align: center;
        padding-top: 20px;
      }
    }
  }
}
</style>