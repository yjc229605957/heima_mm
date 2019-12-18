<template>
  <div class="comment">
    <!-- 搜索栏 -->
    <div class="serachBar">
      <el-card class="box-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="学科编号">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>
          <el-form-item label="学科名称">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>
          <el-form-item label="创建者">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.region">
              <el-option label="禁用" value="shanghai"></el-option>
              <el-option label="启用" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubject">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button>清除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addBut" icon="el-icon-plus">新增学科</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <!-- 学科列表分页 -->
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
              <el-button type="text" size="small">编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="changeState(scope.row)"
                :style="{color:scope.row.status === 0?'#46A0FF':'red'}"
              >{{scope.row.status === 0 ? "启用" : "禁用"}}</el-button>
              <el-button @click="handleClick(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[7, 12, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-card>
    </div>
    <!-- 新增学科窗口 -->
    <el-dialog title="新增学科" :visible.sync="dialogFormVisible" center>
      <!-- 注册表单内容 -->
      <el-form :model="addForm" :rules="addrules" ref="addForm" class="addForm">
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
      <!-- 底部提交按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubject">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { subjectList, subjectAdd } from "../../../api/subject";
export default {
  name: "subject",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [],
      //当前页数
      page: 1,
      //总页数
      pageCount: 10,
      //每页条数
      pageSize: 7,
      //总条数
      total: 1,
      // 新增学科窗口
      dialogFormVisible: false,
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
      // 新增窗口文字标签宽度
      formLabelWidth: "80px"
    };
  },
  methods: {
    //获取学科列表
    SubList() {
      subjectList({
        page: this.page, //当前页数
        limit: this.pageSize //每页显示条数
      }).then(res => {
        window.console.log(res);
        if (res.data.code === 200) {
          this.tableData = res.data.data.items;
          this.pageCount = res.data.data.pagination.page;
          this.total = res.data.data.pagination.total;
        }
      });
    },
    //点击查询方法
    onSubject() {},
    // 点击新增按钮
    addBut() {
      this.dialogFormVisible = true;
    },
    //点击新增方法
    addSubject() {
      subjectAdd(this.addForm).then(res => {
        window.console.log(res);
        if (res.data.code === 200) {
          this.dialogFormVisible = false;
          this.$message.success("新增成功");
          this.SubList();
        }
      });
      window.console.log("111");
    },
    //分页插件 页码大小发生变动时触发的函数
    handleSizeChange(val) {
      this.pageSize = val;
      this.SubList();
      window.console.log(`每页 ${val} 条`);
    },
    //分页插件 当前页发生变动时触发的函数
    handleCurrentChange(val) {
      this.page = val;
      this.SubList();
      window.console.log(`当前页: ${val}`);
    }
  },
  //已进入页面发送请求后去学科列表
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