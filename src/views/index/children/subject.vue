<template>
  <div class="comment">
    <!-- 搜索栏 -->
    <div class="serachBar">
      <el-card class="box-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="searchForm">
          <el-form-item label="学科编号" prop="rid">
            <el-input v-model="formInline.rid"></el-input>
          </el-form-item>
          <el-form-item label="学科名称" prop="name">
            <el-input v-model="formInline.name"></el-input>
          </el-form-item>
          <el-form-item label="创建者" prop="username">
            <el-input v-model="formInline.username"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="formInline.status">
              <el-option label="禁用" value="0"></el-option>
              <el-option label="启用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sercahBut">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm">清除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addSubBut" icon="el-icon-plus">新增学科</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <!-- 学科列表 -->
    <div class="subjectList">
      <el-card class="box-card">
        <el-table :data="tableData" style="width:100%">
          <el-table-column type="index" label="序号" width="70"></el-table-column>
          <el-table-column prop="rid" label="学科编号"></el-table-column>
          <el-table-column prop="name" label="学科名称"></el-table-column>
          <el-table-column prop="short_name" label="简称"></el-table-column>
          <el-table-column prop="username" label="创建者"></el-table-column>
          <el-table-column prop="create_time" label="创建日期">
            <template slot-scope="scope">{{ scope.row.create_time | formatTime }}</template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1">启用</span>
              <span v-else :style="{color:scope.row.status === 1?'#ccc':'red'}">禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="editBut(scope.row)">编辑</el-button>
              <el-button
                type="text"
                size="medium"
                @click="changeState(scope.row.id)"
                :style="{color:scope.row.status === 0?'#46A0FF':'red'}"
              >{{scope.row.status === 0 ? "启用" : "禁用"}}</el-button>
              <el-button @click="handleClick(scope.row.id)" type="text" size="medium">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页插件 -->
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[7, 10, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-card>
    </div>
    <!-- 新增学科窗口 -->
    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" center>
      <!-- 新增表单内容 -->
      <el-form
        :model="addForm"
        :rules="addrules"
        ref="addForm"
        class="addForm"
        v-if="dialogFormTitle == '新增学科'"
      >
        <!-- 学科编号 -->
        <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
          <el-input v-model="addForm.rid" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 学科名称 -->
        <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 学科简称 -->
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 学科简介 -->
        <el-form-item label="学科简介" :label-width="formLabelWidth">
          <el-input v-model="addForm.intro" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 学科备注 -->
        <el-form-item label="学科备注" :label-width="formLabelWidth">
          <el-input v-model="addForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form :model="editForm" :rules="editrules" ref="editForm" class="editForm" v-else>
        <!-- 学科编号 -->
        <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
          <el-input v-model="editForm.rid" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 学科名称 -->
        <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 学科简称 -->
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 学科简介 -->
        <el-form-item label="学科简介" :label-width="formLabelWidth">
          <el-input v-model="editForm.intro" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 学科备注 -->
        <el-form-item label="学科备注1" :label-width="formLabelWidth">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部提交按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubject" v-if="dialogFormTitle == '新增学科'">确 定</el-button>
        <el-button type="primary" @click="editSubject" v-else>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//导入subject axios接口
import {
  subjectList, //学科列表接口
  subjectAdd, //学科新增接口
  subjectStatus, //学科状态接口
  subjectRemove, //学科删除接口
  subjectEdit //学科编辑接口
} from "../../../api/subject";
export default {
  name: "subject",
  data() {
    return {
      //搜索栏数据
      formInline: {
        rid: "", //学科编号
        name: "", //学科名称
        username: "", //创建者
        status: "", //状态
        page: 1, //当前页数
        limit: 7 //每页显示条数
      },

      // 学科列表数据
      tableData: [],
      //当前页数
      page: 1,
      //总页数
      pageCount: 1,
      //每页条数
      pageSize: 7,
      //总条数
      total: 1,
      // 新增/编辑学科窗口是否显示
      dialogFormVisible: false,
      //窗口标题
      dialogFormTitle: "",
      // 新增学科数据
      addForm: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      // 新增学科验证规则
      addrules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "change" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "change" }]
      },
      // 窗口文字标签宽度
      formLabelWidth: "80px",
      // 编辑学科数据
      editForm: {},
      // 编辑窗口验证规则
      editrules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "change" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "change" }]
      },
      //编辑按钮id
      edit_id: ""
    };
  },
  methods: {
    //获取学科列表方法
    SubList() {
      subjectList(this.formInline).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.items;
          this.page = +res.data.data.pagination.page;
          this.total = res.data.data.pagination.total;
        }
      });
    },
    // 点击搜索按钮 按条件搜索
    sercahBut() {
      this.formInline.page = 1;
      this.page = 1;
      this.SubList();
    },
    // 点击搜索栏清空按钮 清空条件后重新获取列表
    resetForm() {
      this.$refs.searchForm.resetFields();
      this.SubList();
    },
    // 点击新增按钮
    addSubBut() {
      this.dialogFormVisible = true;
      this.dialogFormTitle = "新增学科";
    },
    //点击编辑按钮
    editBut(obj) {
      this.dialogFormVisible = true;
      this.dialogFormTitle = "编辑学科";
      this.editForm = JSON.parse(JSON.stringify(obj));
      window.console.log(this.editForm);
    },
    // 新增窗口 点击确定方法
    addSubject() {
      subjectAdd(this.addForm).then(res => {
        window.console.log(res);
        if (res.data.code === 200) {
          this.dialogFormVisible = false;
          this.$message.success("新增成功");
          this.SubList();
        } else {
          if (res.data.message == "rid已存在") {
            this.$message.error("学科编号已存在");
          }
        }
      });
      window.console.log("111");
    },
    // 编辑窗口 点击确定方法
    editSubject() {
      subjectEdit(this.editForm).then(res => {
        window.console.log(res);
        if (res.data.code === 200) {
          this.dialogFormVisible = false;
          this.$message.success("编辑成功");
          this.SubList();
        } else {
          if (res.data.message == "rid已存在") {
            this.$message.error("学科编号已存在");
          }
        }
      });
    },
    // 点击 禁用/启用 按钮
    changeState(id) {
      subjectStatus(id).then(res => {
        if (res.data.code === 200) {
          this.SubList();
          this.$message.success("设置成功");
        }
      });
    },
    // 点击 删除 按钮
    handleClick(id) {
      this.$confirm("是否要删除该学科?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        subjectRemove(id).then(res => {
          if (res.data.code === 200) {
            this.SubList();
            this.$message.success("删除成功");
          }
        });
      });
    },
    //分页插件 页码大小发生变动时触发的函数
    handleSizeChange(val) {
      this.formInline.limit = val; //每页显示多少条
      this.SubList();
    },
    //分页插件 当前页发生变动时触发的函数
    handleCurrentChange(val) {
      this.formInline.page  = val; //当前页
      this.SubList();
    }
  },
  //一进入页面发送请求获取学科列表
  created() {
    this.SubList();
  }
};
</script>

<style lang='less'>
.box-card {
  width: 100%;
  height: 102px;
  margin-bottom: 20px;
  .el-form-item:nth-child(odd) .el-form-item__content {
    width: 100px;
  }
  .el-form-item:nth-child(even) .el-form-item__content {
    width: 150px;
  }
  .el-form-item:nth-child(5) .el-form-item__content,
  .el-form-item:nth-child(6) .el-form-item__content {
    width: 70px;
  }
  .el-form-item:nth-child(7) .el-form-item__content {
    width: 120px;
  }
}
.subjectList {
  width: 100%;
  .box-card {
    height: auto;
  }
  .el-pagination {
    text-align: center;
    padding-top: 20px;
  }
}
// 新增窗口样式
.el-dialog__wrapper {
  .el-dialog {
    width: 600px;
    height: 520px;

    .el-dialog__header {
      padding: 15px;
      background: linear-gradient(225deg, #1493fa, #01c6fa);
      .el-dialog__title {
        color: #fff;
      }
    }
    .el-dialog__body {
      padding: 40px 25px 20px 20px;
      .captcha {
        height: 40px;
        img {
          height: 40px;
          width: 100%;
        }
      }
      .el-button--default {
        width: 100%;
        padding: 12px 0;
      }
    }
  }
}
</style>