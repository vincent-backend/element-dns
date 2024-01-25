<template>
  <div>
    <div class="heading-container">
      <div class="bg-1"></div>
      <div class="bg-2"></div>

      <div class="heading-left">
        <div class="line">
          <div class="line-item">
            <span class="label">上次登录：</span>
            <span class="content">{{ data.lasttime }}</span>
          </div>
          <div class="line-item">
            <span class="label">IP地址：</span>
            <span class="content">{{ data.ip }}</span>
            <span class="info" style="font-size:14px">({{ data.ipinfo }})</span>
          </div>
        </div>
        <div class="line">
          <div class="line-item">
            <span class="label">NS服务地址：</span>
            <span class="content">{{ data.ns }}</span>
            <span class="info">(请在系统设置里，设置为您自己实际使用的域名或记录)</span>
          </div>
        </div>
      </div>
      <div class="heading-right">
        <div class="line">
          <div class="line-item">
            <span class="label">软件版本：</span>
            <span class="content">{{ data.version }}</span>
          </div>
        </div>
        <div class="line">
          <div class="line-item">
            <span class="btn-version btn-version-intro" @click="goFurl()">版本功能介绍说明</span>
            <span class="btn-version btn-version-upgrade" @click="goFurl()">升级购买/续费</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 购买 -->
    <el-dialog title="升级与续费" :visible.sync="addDialogFormVisible" class="padd">
      <el-form :model="form">
        <el-form-item label="版本" :label-width="formLabelWidth">
          <el-select v-model="form.vn" placeholder="请选择" style="width: 250px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用时间" :label-width="formLabelWidth">
          <el-select v-model="form.vt" placeholder="请选择" style="width: 250px">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm()">确定支付</el-button>
      </div>
    </el-dialog>
    <el-dialog title="支付" :visible.sync="dialogFormVisible">
      <div style="margin-bottom: 20px">
        <!--
            <span>原价：</span
            ><span style="color: #0164F6; margin-right: 30px"
      >￥{{ price.ap }}</span
      >-->
        <span>优惠价：</span><span style="color: #0164F6">￥{{ price.ap }}</span>
      </div>

      <el-card class="box-card" style="margin-bottom:20px">
        <div slot="header" class="clearfix">
          <span>扫码支付</span>
        </div>
        <div style="
                margin-top: 20px;
                display: flex;
                justify-content: space-around;
              ">
          <div style="
                  display: flex;
                  align-items: center;
                  flex-direction: column;
                ">
            <img :src="price.wxlink" alt="" style="width: 100px; margin-bottom: 10px" />
            <span>微信支付</span>
          </div>
          <div style="
                  display: flex;
                  align-items: center;
                  flex-direction: column;
                ">
            <img :src="price.paylink" alt="" style="width: 100px; margin-bottom: 10px" />
            <span>支付宝</span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card" v-if="price.cacc != ''">
        <div slot="header" class="clearfix">
          <span>公司支付</span>
        </div>
        <div>
          <div class="text item">公司账号：{{ price.cacc }}</div>
          <div class="text item">公司名称：{{ price.cname }}</div>
          <div class="text item">开户行地址：{{ price.caddr }}</div>
        </div>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <span style="margin-right:10px">谨慎支付，不支持退款</span>
        <el-button type="primary" @click="dialogFormVisible = false">完成(关闭)</el-button>
      </div>
    </el-dialog>

    <!-- statistic -->
    <div class="statistic-container">
      <div class="statistic-item" v-for="item in [
        { label: '域名数', value: data.domainsum },
        { label: '记录数', value: data.recordsum },
        { label: '监控数', value: data.monitorsum },
        { label: '节点数', value: data.nodesum },
        { label: '用户数', value: data.uc },
        { label: '余额', value: (data.cny || '') + '元' },
      ]">
        <div class="statistic-item-value">
          {{ item.value }}
        </div>
        <div class="statistic-item-title">
          {{ item.label }}
        </div>
      </div>
    </div>

    <el-row :gutter="25" v-if="gid == 1">
      <el-col :span="24">
        <el-card class="box-card tab">
          <div ref="main" style="width: 100%;height:330px;top:10px;"></div>
        </el-card>
      </el-col>
    </el-row>
    <!--
    <el-row :gutter="25" v-if="gid==1">
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
    -->
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "",
  components: {},
  data() {
    return {
      code1: '',
      code: false,
      phone: '',
      furl: "https://www.wddns.net/version.html",
      price: {},
      options: [
        {
          value: "1",
          label: "个人版",
        },
        {
          value: "3",
          label: "企业版",
        },
        {
          value: "5",
          label: "旗舰版",
        },
      ],
      options1: [
        {
          value: "1m",
          label: "一月",
        },
        {
          value: "1y",
          label: "一年",
        },
        {
          value: '5y',
          label: '五年送三年',
        },
        {
          value: '10y',
          label: '十年送十年',
        },
      ],
      version: "",
      p1v: "",
      p2v: "",
      p3v: "",
      form: {
        vn: "1",
        vt: "1m",
        phone: "",
      },
      cny: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      addDialogFormVisible: false,
      formVisible: true,
      gid: 0,
      nid: 0,
      host: "",
      domain: "",
      times: "24h",
      qps: [],
      data: {
        sysinfo: {}
      },
      fd: {}
    };
  },
  computed: {},
  watch: {},
  methods: {
    goFurl() {
      //window.location.href = this.furl;
      window.open(this.furl, "_blank");
    },
    // 确定支付
    confirm() {
      this.$request({
        url: "/user/upgrade",
        params: this.form,
      }).then((res) => {
        if (res.data.rec == 0) {
          this.dialogFormVisible = true;
          this.addDialogFormVisible = false;
          this.price = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    echart() {
      var myChart = echarts.init(this.$refs.main);
      var option = {
        xAxis: {
          type: "category",
          data: []
        },
        grid: {
          x: 80,
          x2: 30,
          y: 50,
          y2: 38
        },
        yAxis: {
          type: "value",
          min: 0,
          max: this.fd.max,
          interval: this.fd.inv,
          // minInterval:1,
          axisLabel: { show: true },
          axisTick: {
            //y轴刻度线
            show: true
          },
          axisLine: {
            //y轴
            show: true
          }
        },
        title: {
          left: "35px",
          text: `查询数(24小时)  最大${this.fd.max} - 最小${this.fd.min}`,
          subtext: `单位（次）`
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          //data: ["实时流量", "接收流量"]
          data: ["查询数"]
        },
        series: [
          {
            data: [],
            name: "查询数",
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
          }
        ]
      };
      option.xAxis.data = this.fd.list.map(i => {
        return i.ds;
      });
      option.series[0].data = this.fd.list.map(i => {
        return i.dc;
      });
      // option.series[1].data = this.data.flow.list.map(i => {
      //     return i.val;
      // });
      myChart.setOption(option);
    },
    count() {
      if (this.gid == 0) {
        return
      }
      this.$request({
        url: "/domain/flow",
        params: { nid: this.nid, host: this.host, domain: this.domain, ts: this.times }
      }).then(res => {
        if (res.data.rec == 0) {
          this.fd = res.data.data;
          this.echart();
        } else {
          this.$message.error(res.data.msg);
          //clearInterval(this.otimer);
          //this.$router.go(-1);
          //return
        }
      });
    }
  },
  created() {
    this.gid = localStorage.getItem("gid");

    // TODO: missed API
    this.$request({
      url: "/user/index"
    }).then(res => {
      this.data = res.data.data;
      if (this.data.p1 != 0 && this.data.p1y != 0) {
        this.p1v = "个人版(" + this.data.p1 + "元/月) (" + this.data.p1y + "元/年)";
      } else {
        this.p1v = "个人版(" + this.data.p1 + "元/月)";
      }
      if (this.data.p2 != 0 && this.data.p2y != 0) {
        this.p2v = "企业版(" + this.data.p2 + "元/月) (" + this.data.p2y + "元/年)";
      } else {
        this.p2v = "企业版(" + this.data.p2 + "元/月)";
      }
      if (this.data.p3 != 0 && this.data.p3y != 0) {
        this.p3v = "旗舰版(" + this.data.p3 + "元/月) (" + this.data.p3y + "元/年)";
      } else {
        this.p3v = "旗舰版(" + this.data.p3 + "元/月)";
      }
      this.options = [{
        value: '1',
        label: this.p1v
      }, {
        value: '3',
        label: this.p2v
      }, {
        value: '5',
        label: this.p3v
      }];
      if (this.data.p1y == 0) {
        this.options1 = [{
          value: '1m',
          label: '一月'
        }, {
          value: '1y',
          label: '一年'
        }]
      }
      for (var key in this.data.sysinfo) {
        if (key != "cpuname") {
          this.data.sysinfo[key] = this.data.sysinfo[key].toFixed(2);
          this.data.sysinfo.cpuuse = Number(this.data.sysinfo.cpuuse);
          this.data.sysinfo.memp = Number(this.data.sysinfo.memp);
          this.data.sysinfo.diskp = Number(this.data.sysinfo.diskp);
        }
      }
      this.qps = res.data.data.qps;
      //this.echart();
      //this.echart1();
    });
    this.count();
  },
  mounted() {
  }
};
</script>
<style lang='less' scoped>
.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: none;
}

.rate {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;

  .el-progress {
    margin: 20px;
  }
}

.info {
  margin-bottom: 10px;
}

.margin {
  margin-right: 40px;
}

.before {
  color: #909399;
  font-size: 14px;
}

.after {
  font-size: 14px;
  color: #303133;
}

.row {

  //display: flex;
  //justify-content: space-between;
  .el-card {
    min-width: 14%;

    .box {
      display: flex;
      height: 100%;
      justify-content: space-between;
      align-items: center;

      &>div {
        line-height: 50px;

        img {
          margin-top: 15px;
        }
      }
    }
  }
}

.el-row {
  margin: 25px 0;
}

.el-icon-question {
  cursor: pointer;
  color: #909399;
}

.bigsize {
  font-size: 22px;
  margin-left: 18px;
}
</style>
<style lang="less">
.tab .el-card__body {
  padding: 5px;
}

.allFlex {
  display: flex;
  //flex-direction: column;
  align-items: left;
}

.text {
  line-height: 25px;
}

/deep/.padd .el-card__header {
  padding: 10px 20px;
}

/deep/.padd .el-card__body {
  padding: 15px;
}

/deep/.padd .el-dialog__body {
  padding: 5px 20px;
}


.heading-container {
  box-sizing: border-box;
  padding: 28px 0 24px 292px;
  display: flex;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  color: #3A4A6E;
  line-height: 20px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  justify-content: space-between;
  flex-wrap: wrap;

  .bg-1 {
    position: absolute;
    width: 272px;
    height: 150px;
    background: url(/imgs/top_graph_1@2x.png);
    background-size: 100% 100%;
    left: 0;
    top: 0;
  }

  .bg-2 {
    position: absolute;
    width: 328px;
    height: 234px;
    background: url(/imgs/top_graph_2@2x.png);
    background-size: 100% 100%;
    right: 0;
    top: 0;
  }

  .heading-left {}

  .heading-right {}

  .line {
    display: flex;
    gap: 30px;
    margin-bottom: 10px;
    position: relative;
    z-index: 2;

    .line-item {
      display: flex;
      align-items: center;

      .label {
        padding-right: 10px;
        border-right: 1px solid #CDD6E8;
        margin-right: 10px;
      }

      .content {}

      .info {
        margin-left: 10px;
        margin-bottom: 0;
        opacity: 0.6;
      }
    }
  }

  .btn-version {
    padding: 2px 10px;
    border-radius: 4px;
    cursor: pointer;

    &.btn-version-intro {
      border: 1px solid rgba(48, 151, 255, .3);
      font-size: 14px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #001734;
      line-height: 20px;
      background: linear-gradient(270deg, #3097FF 0%, #005AFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    &.btn-version-upgrade {
      margin-left: 10px;
      border: 1px solid rgba(255, 144, 93, .3);
      font-size: 14px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #001734;
      line-height: 20px;
      background: linear-gradient(90deg, #FF8A53 0%, #FFA338 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

.statistic-container {
  display: flex;
  gap: 20px;

  .statistic-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 260px;
    height: 134px;
    background: linear-gradient(180deg, #FFFFFF 0%, #F1F6FE 100%);
    box-shadow: 0px 10px 20px 0px rgba(0, 60, 179, 0.06);
    border-radius: 6px;

    .statistic-item-value {
      font-size: 40px;
      font-family: DIN, DIN;
      font-weight: 500;
      color: #001734;
      line-height: 48px;
      background: linear-gradient(270deg, #3097FF 0%, #005AFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .statistic-item-title {
      margin-top: 10px;
      font-size: 14px;
      font-family: PingFang-SC, PingFang-SC;
      font-weight: 500;
      color: #3A4A6E;
      line-height: 20px;
    }
  }
}
</style>