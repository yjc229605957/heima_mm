<template>
  <div class="comment">
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
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button>清除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addSubmit" icon="el-icon-plus">新增学科</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="subjectList">
      <el-card class="box-card">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="NO" label="序号" width="50"></el-table-column>
          <el-table-column prop="number" label="学科编号" width="160"></el-table-column>
          <el-table-column prop="name" label="学科名称" width="160"></el-table-column>
          <el-table-column prop="forShort" label="简称" width="155"></el-table-column>
          <el-table-column prop="creator" label="创建者" width="160"></el-table-column>
          <el-table-column prop="date" label="创建日期" width="135"></el-table-column>
          <el-table-column prop="status" label="状态" width="160"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small">编辑</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "subject",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          NO: "1",
          number: "QD001",
          name: "前端与移动开发",
          forShort: "前端",
          creator: "刘经理",
          date: "2019-11-21",
          status: "启用",
          operation: "编辑 禁用"
        },
        {
          NO: "2",
          number: "QD002",
          name: "Java",
          forShort: "后端",
          creator: "刘经理",
          date: "2019-11-21",
          status: "启用",
          operation: "编辑 禁用"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      window.console.log("submit!");
    }
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
    width: 120p x;
  }
}
.subjectList {
  width: 100%;
  .box-card {
    height: auto;
  }
}
</style>