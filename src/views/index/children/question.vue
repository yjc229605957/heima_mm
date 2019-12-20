<template>
  <!-- 题库页面 -->
  <div class="questionBox">
    <!-- 搜索栏 -->
    <el-card class="serach_card">
      <el-form :inline="true" :model="formInline" class="serach-form-inline">
        <!-- 学科 -->
        <el-form-item label="学科">
          <el-select v-model="formInline.subject" placeholder="请选择学科">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <!-- 阶段 -->
        <el-form-item label="阶段">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <!-- 企业 -->
        <el-form-item label="企业">
          <el-select v-model="formInline.enterprise" placeholder="请选择企业">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <!-- 题型 -->
        <el-form-item label="题型">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <!-- 难度 -->
        <el-form-item label="难度">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formInline.creater"></el-input>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <!-- 日期 -->
        <el-form-item label="日期">
          <el-input v-model="formInline.create_date" placeholder="选择日期"></el-input>
        </el-form-item>
        <!-- 标题 -->
        <el-form-item label="标题" class="serach_title">
          <el-input v-model="formInline.title"></el-input>
        </el-form-item>
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button type="primary" @click="serachBut">搜索</el-button>
          <el-button @click="removeBut">清除</el-button>
          <el-button type="primary" @click="$refs.addQuestion.addFormVisible = true" icon="el-icon-plus">新增试题</el-button>
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
            <span v-if="scope.row.step==1">初级</span>
            <span v-else-if="scope.row.step==2">中级</span>
            <span v-else>高级</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type==1">单选</span>
            <span v-else-if="scope.row.type==2">多选</span>
            <span v-else>简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.status == 1?'启用':'禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button @click="changeStatus(scope.row)" type="text" size="small">启用</el-button>
            <el-button type="text" size="small">删除</el-button>
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
  </div>
</template>

<script>
import { questionList } from "../../../api/question";
import addQuestion from "../children/question/addQuestion";
export default {
  components: {
    addQuestion
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
      tableData: [
        {
          answer_analyze: "<p>叨登傻等</p>",
          city: "天津市,市辖区",
          create_time: "2019-12-11 10:13:09",
          difficulty: 2,
          enterprise: 19,
          enterprise_name: "阿里",
          id: 51,
          is_del: 0,
          multiple_select_answer: "",
          reads: 0,
          remark: "赛法萨芬",
          select_options: [
            { id: 193, question_id: 51, label: "A", text: "狗不理" },
            { id: 193, question_id: 51, label: "B", text: "狗不理1" },
            { id: 193, question_id: 51, label: "C", text: "狗不理2" },
            { id: 193, question_id: 51, label: "D", text: "狗不理3" }
          ],
          short_answer: null,
          single_select_answer: "A",
          status: 1,
          step: 1,
          subject: 11,
          subject_name: "前端",
          title: "<p>你好吗</p>",
          type: 1,
          update_time: "2019-12-11 10:13:09",
          user_id: 52,
          username: "剁椒鱼头",
          video: "upload/20191211/37001c19c14bc979e0bb08f3218fd2b2.mp4"
        },
        {
          answer_analyze: "<p>叨登傻等</p>",
          city: "天津市,市辖区",
          create_time: "2019-12-11 10:13:09",
          difficulty: 2,
          enterprise: 19,
          enterprise_name: "阿里",
          id: 51,
          is_del: 0,
          multiple_select_answer: "",
          reads: 0,
          remark: "赛法萨芬",
          select_options: [
            { id: 193, question_id: 51, label: "A", text: "狗不理" },
            { id: 193, question_id: 51, label: "B", text: "狗不理1" },
            { id: 193, question_id: 51, label: "C", text: "狗不理2" },
            { id: 193, question_id: 51, label: "D", text: "狗不理3" }
          ],
          short_answer: null,
          single_select_answer: "A",
          status: 1,
          step: 1,
          subject: 11,
          subject_name: "前端",
          title: "<p>你好吗</p>",
          type: 1,
          update_time: "2019-12-11 10:13:09",
          user_id: 52,
          username: "剁椒鱼头",
          video: "upload/20191211/37001c19c14bc979e0bb08f3218fd2b2.mp4"
        },
        {
          answer_analyze: "<p>叨登傻等</p>",
          city: "天津市,市辖区",
          create_time: "2019-12-11 10:13:09",
          difficulty: 2,
          enterprise: 19,
          enterprise_name: "阿里",
          id: 51,
          is_del: 0,
          multiple_select_answer: "",
          reads: 0,
          remark: "赛法萨芬",
          select_options: [
            { id: 193, question_id: 51, label: "A", text: "狗不理" },
            { id: 193, question_id: 51, label: "B", text: "狗不理1" },
            { id: 193, question_id: 51, label: "C", text: "狗不理2" },
            { id: 193, question_id: 51, label: "D", text: "狗不理3" }
          ],
          short_answer: null,
          single_select_answer: "A",
          status: 1,
          step: 1,
          subject: 11,
          subject_name: "前端",
          title: "<p>你好吗</p>",
          type: 1,
          update_time: "2019-12-11 10:13:09",
          user_id: 52,
          username: "剁椒鱼头",
          video: "upload/20191211/37001c19c14bc979e0bb08f3218fd2b2.mp4"
        }
      ],
      // 当前页
      page: 1,
      //每页条数
      pageSize: 5,
      //总条数
      total: 5
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
    serachBut() {},
    //清除按钮 清空条件
    removeBut() {},
    //新增试题按钮
    addQuesbut() {},
    // 分页每页条数变化
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    //分页页码变化
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
    }
  },
  created() {
    this.getList();
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