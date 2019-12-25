<template>
  <div class="chart_Box">
    <el-card class="head_card">
      <ul>
        <li>
          <p class="primary">{{titleData.increment_users}}</p>
          <span>今日新增客户</span>
        </li>
        <li>
          <p class="primary">{{titleData.total_users}}</p>
          <span>总用户量</span>
        </li>
        <li>
          <p class="warning">{{titleData.increment_questions}}</p>
          <span>新增试题</span>
        </li>
        <li>
          <p class="warning">{{titleData.total_questions}}</p>
          <span>总试题量</span>
        </li>
        <li>
          <p class="success">{{titleData.total_done_questions}}</p>
          <span>总刷题量</span>
        </li>
        <li>
          <p class="success">{{titleData.personal_questions}}</p>
          <span>人均刷题量</span>
        </li>
      </ul>
    </el-card>
    <el-card class="body_card">
      <div class="main" ref="main"></div>
    </el-card>
  </div>
</template>

<script>
import { DataStatistics, DataTitle } from "../../../api/chart";
import echarts from "echarts";
var myChart;
export default {
  name: "chart",
  data() {
    return {
      titleData: {},
      pieData: []
    };
  },
  methods: {},
  mounted() {
    //获取头部数据统计
    DataTitle().then(res => {
      this.titleData = res.data.data;
    });
    // 获取饼图数据统计
    DataStatistics().then(res => {
      //声明饼图图例数据数组
      var pieList = [];
      //使用循环将数据push进数组
      res.data.data.forEach(v => {
        pieList.push(v.name);
      });
      //将饼图挂载到main标签中
      myChart = echarts.init(this.$refs.main);
      //配置饼图
      var option = {
        title: {//标题
          text: "整体数据"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {//图例
          orient: "vertical",//竖图
          top: "5%",    //距离顶部的距离
          right: "14%", //距离右边的距离
          itemGap: 30,  //图例每项的间距
          data: pieList //图例的数据
        },
        series: [
          {
            center: ["35%", "50%"], //饼图的位置
            color: [                //饼图的色盘
              "#409eff",
              "#f76137",
              "#f9b358",
              "skyblue",
              "pink",
              "#ffd962",
              "#85ce61",
              "#f78989"
            ],
            name: "整体数据",    //图形名称
            type: "pie",        //图形类型
            radius: ["50%", "70%"],  //饼图的内圈外层大小
            avoidLabelOverlap: false,
            label: {
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: res.data.data
          }
        ]
      };
      myChart.setOption(option);
    });
  }
};
</script>

<style lang="less">
.chart_Box {
  .head_card {
    height: 150px;
    .el-card__body {
      padding: 10px;
    }
    ul {
      display: flex;
      justify-content: space-around;
      li {
        list-style: none;
        text-align: center;
        p {
          font-size: 35px;
          width: 99px;
          height: 99px;
          border-radius: 50%;
          border: 2px solid #000;
          line-height: 99px;
          margin-bottom: 7px;
          &.primary {
            color: rgb(0, 134, 250);
            border-color: rgb(0, 134, 250);
          }
          &.warning {
            color: rgb(247, 99, 57);
            border-color: rgb(247, 99, 57);
          }
          &.success {
            color: rgb(85, 205, 120);
            border-color: rgb(85, 205, 120);
          }
        }
        span {
          font-size: 16px;
          color: #737373;
        }
      }
    }
  }
  .body_card {
    margin-top: 20px;
    height: 571px;
    .el-card__body {
      height: 100%;
      padding: 30px 100px;
    }
    .main {
      width: 100%;
      height: 100%;
    }
  }
}
</style>