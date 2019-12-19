<template>
  <div class="comment">
    <!-- 搜索栏 -->
    <div class="serachBar">
      <el-card class="box-serach">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="searchForm">
          <el-form-item label="企业编号" prop="eid">
            <el-input v-model="formInline.eid"></el-input>
          </el-form-item>
          <el-form-item label="企业名称" prop="name">
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
            <el-button type="primary" @click="EntSerach">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm">清除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addEntBut" icon="el-icon-plus">新增企业</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <!-- 企业列表 -->
    <div class="EntList">
      <el-card class="box-list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="100"></el-table-column>
          <el-table-column prop="eid" label="企业编号"></el-table-column>
          <el-table-column prop="name" label="企业名称"></el-table-column>
          <el-table-column prop="username" label="创建者"></el-table-column>
          <el-table-column prop="create_time" label="创建日期">
            <template slot-scope="scope">{{scope.row.create_time | formatTime}}</template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1">启用</span>
              <span v-else :style="{color:'red'}">禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="editEntBut(scope.row)">编辑</el-button>
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
    <!-- 新增企业窗口 -->
    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" center>
      <!-- 新增表单内容 -->
      <el-form
        :model="addForm"
        :rules="addrules"
        ref="addForm"
        class="addForm"
        v-if="dialogFormTitle == '新增企业'"
      >
        <!-- 企业编号 -->
        <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
          <el-input v-model="addForm.eid" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 企业名称 -->
        <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 企业简称 -->
        <el-form-item label="企业简称" :label-width="formLabelWidth">
          <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 企业简介 -->
        <el-form-item label="企业简介" :label-width="formLabelWidth">
          <el-input v-model="addForm.intro" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 企业备注 -->
        <el-form-item label="企业备注" :label-width="formLabelWidth">
          <el-input v-model="addForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!-- 编辑窗口 -->
      <el-form :model="editForm" :rules="editrules" ref="editForm" class="editForm" v-else>
        <!-- 企业编号 -->
        <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
          <el-input v-model="editForm.eid" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 企业名称 -->
        <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 企业简称 -->
        <el-form-item label="企业简称" :label-width="formLabelWidth">
          <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 企业简介 -->
        <el-form-item label="企业简介" :label-width="formLabelWidth">
          <el-input v-model="editForm.intro" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 企业备注 -->
        <el-form-item label="企业备注1" :label-width="formLabelWidth">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部提交按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEnterprise" v-if="dialogFormTitle == '新增企业'">确 定</el-button>
        <el-button type="primary" @click="editEnterprise" v-else>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  enterpriseList, //企业列表接口
  enterpriseAdd, //企业新增接口
  enterpriseStatus, //企业状态接口
  enterpriseRemove, //企业删除接口
  enterpriseEdit //企业编辑接口
} from "../../../api/enterprise";
export default {
  name: "enterprise",
  data() {
    return {
      //搜索框数据
      formInline: {
        name: "",
        page: "",
        limit: 7,
        eid: "",
        username: "",
        status: ""
      },
      //企业列表数据
      tableData: [],
      //当前页数
      page: 1,
      //总页数
      pageCount: 1,
      //每页条数
      pageSize: 7,
      //总条数
      total: 1,
      //是否显示新增/编辑窗口
      dialogFormVisible: false,
      // 窗口文字标签宽度
      formLabelWidth: "80px",
      //窗口标题
      dialogFormTitle: "",
      // 新增企业数据
      addForm: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      // 新增窗口验证规则
      addrules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "change" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "change" }]
      },
      // 编辑企业数据
      editForm: {},
      // 编辑窗口验证规则
      editrules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "change" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "change" }]
      },
      //编辑按钮id
      edit_id: ""
    };
  },
  methods: {
    //搜索栏查询按钮
    EntSerach() {
      this.formInline.page = 1 
      this.page = 1;
      this.EntList()
    },
    //企业数据列表
    EntList() {
      // this.formInline.page = 1 
      enterpriseList(this.formInline).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.items;
          this.page = +res.data.data.pagination.page;
          this.total = res.data.data.pagination.total;
        }
      });
    },
    // 点击搜索栏清空按钮 清空条件后重新获取列表
    resetForm() {
      this.$refs.searchForm.resetFields();
      this.EntList();
    },
    //点击编辑按钮打开编辑窗口
    editEntBut(obj) {
      window.console.log(obj);
      this.dialogFormVisible = true;
      this.dialogFormTitle = "编辑企业";
      // this.editForm =  this.tableData[index]
      this.editForm = JSON.parse(JSON.stringify(obj));
    },
    // 点击新增按钮打开编辑窗口
    addEntBut() {
      this.dialogFormVisible = true;
      this.dialogFormTitle = "新增企业";
    },
    // 新增窗口 点击确定方法
    addEnterprise() {
      enterpriseAdd(this.addForm).then(res => {
        window.console.log(res);
        if (res.data.code === 200) {
          this.dialogFormVisible = false;
          this.$message.success("新增成功");
          this.EntList();
        } else {
          if (res.data.message == "eid已存在") {
            this.$message.error("企业编号已存在");
          }
        }
      });
    },
    //编辑窗口 点击确定方法
    editEnterprise() {
      enterpriseEdit(this.editForm).then(res => {
        window.console.log(res);
        if (res.data.code === 200) {
          this.dialogFormVisible = false;
          this.$message.success("编辑成功");
          this.EntList();
        } else {
          if (res.data.message == "eid已存在") {
            this.$message.error("企业编号已存在");
          }
        }
      });
    },
    // 点击 禁用/启用 按钮
    changeState(id) {
      enterpriseStatus(id).then(res => {
        if (res.data.code === 200) {
          this.EntList();
          this.$message.success("设置成功");
        }
      });
    },
    // 点击 删除 按钮
    handleClick(id) {
      this.$confirm("是否要删除该企业?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        enterpriseRemove(id).then(res => {
          if (res.data.code === 200) {
            this.EntList();
            this.$message.success("删除成功");
          }
        });
      });
    },
    //分页插件 页码大小发生变动时触发的函数
    handleSizeChange(val) {
      this.formInline.limit = val; //每页显示多少条
      this.EntList();
    },
    //分页插件 当前页发生变动时触发的函数
    handleCurrentChange(val) {
      this.formInline.page = val; //当前页
      this.EntList();
    }
  },
  //一进入页面发送请求获取企业列表
  created() {
    this.EntList();
  }
};
</script>

<style lang='less'>
// 搜索框
.serachBar {
  margin-bottom: 20px;
  .box-serach {
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
}
// 企业列表
.EntList {
  width: 100%;
  .box-list {
    height: auto;
  }
  .el-pagination {
    text-align: center;
    padding-top: 20px;
  }
}
</style>