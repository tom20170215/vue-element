<template>
    <el-row>
        <el-col :span="24" class="wrap-breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/'}"><b>首页</b></el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        
        <el-col :span="24" class="wrap-main">
            <section class="chart-container">
              <el-row>
                  <el-col :span="8">
                      <el-card :body-style="{padding: '0px'}">
                          <img src="../assets/images/forest.png" alt="" class="image">
                          <div style="padding: 14px;">
                              <span>热带雨林</span>
                              <div class="bottom">
                                  <time class="time">{{currentDate}}</time>
                              </div>
                          </div>
                      </el-card>
                  </el-col>
                  <el-col :span="8">
                      <el-card :body-style="{padding: '0px'}">
                          <img src="../assets/images/sunrise.png" alt="" class="image">
                          <div style="padding: 14px;">
                              <span>日出</span>
                              <div class="bottom">
                                  <time class="time">{{currentDate}}</time>
                              </div>
                          </div>
                      </el-card>
                  </el-col>
                  <el-col :span="8">
                      <el-card :body-style="{padding: '0px'}">
                          <img src="../assets/images/sunshine.png" alt="" class="image">
                          <div style="padding: 14px;">
                              <span>蓝天白云</span>
                              <div class="bottom">
                                  <time class="time">{{currentDate}}</time>
                              </div>
                          </div>
                      </el-card>
                  </el-col>
                  <el-col :span="12">
                      <div id="chartColumn" style="width:100%;height:400px;"></div>
                  </el-col>
                  <el-col :span="12">
                      <div id="chartBar" style="width:100%;height:400px;"></div>
                  </el-col>
                  <el-col :span="12">
                      <div id="chartLine" style="width:100%;height:400px;"></div>
                  </el-col>
                  <el-col :span="12">
                      <div id="chartPie" style="width:100%;height:400px;"></div>
                  </el-col>
              </el-row>
            </section>
        </el-col>
    </el-row>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      currentDate: new Date(),
      chartColumn: null,
      chartBar: null,
      chartLine: null,
      chartPie: null
    };
  },
  mounted() {
      var that = this;
      this.chartColumn = echarts.init(document.getElementById('chartColumn'));
      this.chartBar = echarts.init(document.getElementById('chartBar'));
      this.chartLine = echarts.init(document.getElementById('chartLine'));
      this.chartPie = echarts.init(document.getElementById('chartPie'));
      // 柱状表
      this.chartColumn.setOption({
          title: {
              text: 'Echart柱状图'
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross'
              }
          },
          legend: {
              data:['销量']
          },
          xAxis: {
              data: ['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子']
          },
          yAxis: {},
          series: [{
              name: '销量',
              type: 'bar',
              data: [5,20,36,10,10,20]
          }]
      });
      // 条形表
      this.chartBar.setOption({
          title: {
              text: 'Bar Chart',
              subtext: '数据来自网络'
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  axisPointer: {
                      type: 'shadow'
                  }
              }
          },
          legend: {
              data: ['2011年','2012年']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
              type: 'value',
              boundaryGap: [0,0.01]
          },
          yAxis: {
              type: 'category',
              data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
          },
          series: [
              {
                  name: '2011年',
                  type: 'bar',
                  data: [18203,8844,65345,24561,28444,456789]
              },
              {
                  name: '2012年',
                  type: 'bar',
                  data: [48454,31515,52423,84844,21515,478563]
              }
          ]
      });
      // 线形表
      this.chartLine.setOption({
          title: {
              text: 'Line Chart'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data: ['邮件营销','联盟广告','搜索引擎']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel : true
          },
          xAxis: {
              type: 'category',
              data: ['周一','周二','周三','周四','周五','周六','周末'],
              boundaryGap: false
          },
          yAxis: {
              type: 'value'
          },
          series: [
              {
                  name: '邮件营销',
                  type: 'line',
                  data: [100,200,130,121,333,233,432]
              },
              {
                  name: '联盟广告',
                  type: 'line',
                  data: [100, 220, 191, 234, 290, 330, 310]
              },
              {
                  name: '搜索引擎',
                  type: 'line',
                  data: [820, 932, 901, 934, 1290, 1330, 1320]
              }
          ]
      });
      // 饼图
      this.chartPie.setOption({
          title: {
              text: 'Pie Chart',
              subtext: '纯属虚构',
              left: 'center'
          },
          tooltip:{
              trigger: 'item',
              formatter: '{a}<br/>{b}:{c}({d}%)'
          },
          legend: {
              data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
              left: 'left',
              orient: 'vetical'
          },
          series: [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%','60%'],
                  data: [
                      {
                          name: '直接访问',value: 335
                      },
                      {
                          name: '邮件营销',value: 440
                      },
                      {
                          name: '联盟广告',value: 555
                      },
                      {
                          name: '视频广告',value: 140
                      },
                      {
                          name: '搜索引擎',value: 220
                      }
                  ]
              }
          ]
      });
  }
};
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  .el-col {
    padding: 30px 20px;
    .image {
      width: 100%;
      display: block;
    }
    .bottom {
      margin-top: 13px;
      line-height: 12px;
      .time {
        font-size: 13px;
        color: #999;
      }
    }
  }
}
</style>

