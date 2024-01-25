<template>
  <div class>
    <div class="domin-manage">资源统计</div>
    <el-row :gutter="25">
      <el-col :span="12">
        <el-card class="box-card tab">
          <div ref="main" style="width: 100%;height:240px;top:15px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card tab">
          <div ref="main1" style="width: 100%;height:240px;top:15px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "",
  components: {},
  data() {
    return {
      data: {}
    };
  },
  computed: {},
  watch: {},
  methods: {
    echart() {
      var myChart = echarts.init(this.$refs.main);
      var option = {
        xAxis: {
          type: "category",
          data: []
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 1.2,
          interval: 0.4,
          // minInterval:1,
          axisLabel: { show: false },
          axisTick: {
            //y轴刻度线
            show: false
          },
          axisLine: {
            //y轴
            show: false
          }
        },
        title: {
          left: "35px",
          text: "实时系统负载"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["1min", "5min", "15min"]
        },
        series: [
          {
            data: [],
            name: "1min",
            type: "line",
            showSymbol: true,
            hoverAnimation: true,
            data: [],
            symbolSize: 8,
            showSymbol: true
          },
          {
            data: [],
            name: "5min",
            type: "line",
            showSymbol: true,
            hoverAnimation: true,
            data: [],
            symbolSize: 8,
            showSymbol: true,
            itemStyle: {
              normal: {
                color: "blue",
                lineStyle: {
                  color: "blue"
                }
              }
            }
          },
          {
            data: [],
            name: "15min",
            type: "line",
            showSymbol: true,
            hoverAnimation: true,
            data: [],
            symbolSize: 8,
            showSymbol: true,
            itemStyle: {
              normal: {
                color: "orange",
                lineStyle: {
                  color: "orange"
                }
              }
            }
          }
        ]
      };
      option.xAxis.data = this.data.load.map(i => {
        return i.time;
      });
      option.series[0].data = this.data.load.map(i => {
        return i.load1;
      });
      option.series[1].data = this.data.load.map(i => {
        return i.load5;
      });
      option.series[2].data = this.data.load.map(i => {
        return i.load15;
      });
      myChart.setOption(option);
    },
    echart1() {
      var myChart = echarts.init(this.$refs.main1);
      var option = {
        xAxis: {
          type: "category",
          data: []
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 1.2,
          interval: 0.4,
          // minInterval:1,
          axisLabel: { show: false },
          axisTick: {
            //y轴刻度线
            show: false
          },
          axisLine: {
            //y轴
            show: false
          }
        },
        title: {
          left: "35px",
          text: "实时QPS"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["QPS进", "QPS出"]
        },
        series: [
          {
            data: [],
            name: "QPS进",
            type: "line",
            showSymbol: true,
            hoverAnimation: true,
            data: [],
            symbolSize: 8,
            showSymbol: true,
            itemStyle: {
              normal: {
                color: "blue",
                lineStyle: {
                  color: "blue"
                }
              }
            }
          },
          {
            data: [],
            name: "QPS出",
            type: "line",
            showSymbol: true,
            hoverAnimation: true,
            data: [],
            symbolSize: 8,
            showSymbol: true,
            itemStyle: {
              normal: {
                color: "orange",
                lineStyle: {
                  color: "orange"
                }
              }
            }
          }
        ]
      };
      option.xAxis.data = this.data.qps.map(i => {
        return i.time;
      });
      option.series[0].data = this.data.qps.map(i => {
        return i.qpsin;
      });
      option.series[1].data = this.data.qps.map(i => {
        return i.qpsout;
      });
      myChart.setOption(option);
    },
    count() {
      this.$request({
        url: "/sys/reslog",
        params: { ip: this.$route.query.ip, id: this.$route.query.id }
      }).then(res => {
        if (res.data.rec == 0) {
          var ip = this.$route.query.ip + ':8002'
          this.data = res.data.data[ip];
          this.echart();
          this.echart1();
        } else {
          this.$message.error(res.data.msg);
          this.$router.go(-1);
          return
        }
      });
      var eok = setInterval(() => {
        this.$request({
          url: "/sys/reslog",
          params: { ip: this.$route.query.ip, id: this.$route.query.id }
        }).then(res => {
          if (res.data.rec == 0) {
            var ip = this.$route.query.ip + ':8002'
            this.data = res.data.data[ip];
            this.echart();
            this.echart1();
          } else {
            clearInterval(eok)
          }
        });
      }, 1000);
    }
  },
  created() { },
  mounted() {
    this.count()
  }
};
</script>
<style lang='less' scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}

.domin-manage {
  line-height: 60px;
  font-weight: bold;
}

.el-card {
  margin-bottom: 20px;

  .col1 {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-button {
      font-size: 12px;
      padding: 10px 15px;
      border: 1px solid #0164F6;
      color: #0164F6;
    }

    .right-space {
      margin-right: 20px;
    }

    .el-input {
      width: 200px;
      line-height: 34px;
      font-size: 12px;
      padding: 0;

      input {
        line-height: 34px;
      }
    }

    .add {
      color: #fff;
      background: #0164F6;
    }
  }
}</style>