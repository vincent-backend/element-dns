<template>
  <div class>
    <div class="main-title">软件版本功能介绍及说明</div>
    <el-card>
      <div class="row1">
        <div>
          <!--
          <span style="margin-right:20px;">当前使用版本：<span style="color:#0164F6;">{{version}}</span></span>
                  <el-button class="space add-device" @click="addDialogFormVisible = true" style="float:right">升级购买与续费</el-button>-->
          <!--<el-button class="space add-device" @click="addDialogFormVisibleRe = true" style="float:right">更换服务器</el-button>-->
          <span style="margin-right: 20px">当前版本：<span style="color: #0164F6">{{ version }}</span></span>
          <el-button class="space add-device" @click="addDialogFormVisible = true" style="float: right">升级/续费</el-button>
        </div>
        <!-- <el-button class="space add-device" @click="addDialogFormVisible = true">续费</el-button> -->
        <el-dialog title="更换服务器及授权 (请正确输入新IP和手机号)" :visible.sync="addDialogFormVisibleRe">
          <el-form :model="form_rep">
            <el-form-item label="新服务器IP" :label-width="formLabelWidth">
              <el-input v-model="form_rep.ip" style="width:250px"></el-input>
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth">
              <el-input v-model="form_rep.phone" style="width:250px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer"><span
              style="margin-right:30px;color:#FC052E">谨慎操作,“确定更换”后将取消当前授权！</span>
            <el-button type="primary" @click="confirm_rep()">确定更换</el-button>
          </div>
        </el-dialog>
        <el-dialog title="升级与续费" :visible.sync="addDialogFormVisible">
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
              <el-input v-model="form.phone" style="width:250px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm()">确定支付</el-button>
          </div>
        </el-dialog>
        <el-dialog title="支付" :visible.sync="dialogFormVisible" class="padd">
          <div style="margin-bottom: 20px">
            <!--
            <span>原价：</span
            ><span style="color: #0164F6; margin-right: 30px"
          >￥{{ price.ap }}</span
          >-->
            <span>优惠价：</span><span style="color: #0164F6">￥{{ price.ap }}</span>
          </div>
          <el-card class="box-card">
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
            <span style="margin-right:30px">谨慎支付，不支持退款</span>
            <el-button type="primary" @click="dialogFormVisible = false">完成</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
    <table style="width: 100%" class="myTable">
      <tr v-for="(item, i) in List" :key="i">
        <td class="column">{{ item.val }}</td>
        <td class="column">{{ item.val1 }}</td>
        <td class="column">{{ item.val2 }}</td>
        <td class="column">{{ item.val3 }}</td>
        <td class="column">{{ item.val4 }}</td>
        <td class="column">{{ item.val5 }}</td>
      </tr>
    </table>
    <el-card>
      <div class="row1">
        <div>
          <span style="margin-left:60px;">如以上版本或功能仍无法满足你的应用需求，可提供根据需求定制开发与优化。{{ kfqq }} {{ kfwx }}</span></span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Clipboard from "clipboard";
export default {
  name: "",
  components: { Clipboard },
  data() {
    return {
      price: {},
      options: [{
        value: '1',
        label: '个人版(300元/月) (2800元/年)'
      }, {
        value: '3',
        label: '企业版(600元/月) (5800元/年)'
      }, {
        value: '5',
        label: '旗舰版(1000元/月) (9800元/年)'
      }],
      options1: [{
        value: '1m',
        label: '一月'
      }, {
        value: '1y',
        label: '一年'
      }, {
        value: '5y',
        label: '五年送三年'
      }, {
        value: '10y',
        label: '十年送十年'
      }],
      version: "",
      p1v: "",
      p2v: "",
      p3v: "",
      form: {
        vn: "1",
        vt: "1m",
        phone: "",
      },
      form_rep: {
        ip: '',
        phone: ''
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
      addDialogFormVisible: false,
      addDialogFormVisibleRe: false,
      List: [
        {
          val: '版本功能及说明',
          val1: "免费版",
          val2: "个人版",
          val3: "企业版",
          val4: "旗舰版",
          val5: "定制版",
        },
        {
          val: '节点数量',
          val1: "1",
          val2: "2",
          val3: "4",
          val4: "6",
          val5: "按需定制",
        },
        {
          val: '域名数',
          val1: "不限",
          val2: "不限",
          val3: "不限",
          val4: "不限",
          val5: "不限",
        },
        {
          val: '记录数',
          val1: "不限",
          val2: "不限",
          val3: "不限",
          val4: "不限",
          val5: "不限",
        },
        {
          val: '智能解析',
          val1: "Y",
          val2: "Y",
          val3: "Y",
          val4: "Y",
          val5: "Y",
        },
        {
          val: 'NS自定义',
          val1: "Y",
          val2: "Y",
          val3: "Y",
          val4: "Y",
          val5: "Y",
        },
        {
          val: '运营商解析',
          val1: "Y",
          val2: "Y",
          val3: "Y",
          val4: "Y",
          val5: "Y",
        },
        {
          val: '省份解析',
          val1: "N",
          val2: "Y",
          val3: "Y",
          val4: "Y",
          val5: "Y",
        },
        {
          val: '最小TTL',
          val1: "3600",
          val2: "600",
          val3: "120",
          val4: "60",
          val5: "按需定制",
        },
        {
          val: '负载均衡',
          val1: "N",
          val2: "Y",
          val3: "Y",
          val4: "Y",
          val5: "Y",
        },
        {
          val: '域名分组',
          val1: "N",
          val2: "Y",
          val3: "Y",
          val4: "Y",
          val5: "Y",
        },
        {
          val: '批量添加',
          val1: "N",
          val2: "Y",
          val3: "Y",
          val4: "Y",
          val5: "Y",
        },
        {
          val: '批量删除',
          val1: "N",
          val2: "Y",
          val3: "Y",
          val4: "Y",
          val5: "Y",
        },
        {
          val: '批量修改',
          val1: "N",
          val2: "N",
          val3: "Y",
          val4: "Y",
          val5: "Y",
        },
        {
          val: '批量操作',
          val1: "N",
          val2: "N",
          val3: "Y",
          val4: "Y",
          val5: "Y",
        },
        {
          val: '批量导入',
          val1: "N",
          val2: "N",
          val3: "Y",
          val4: "Y",
          val5: "Y",
        },
        {
          val: '数据导出',
          val1: "N",
          val2: "N",
          val3: "Y",
          val4: "Y",
          val5: "Y",
        },
        {
          val: '监控',
          val1: "",
          val2: "",
          val3: "",
          val4: "",
          val5: "",
        },
        {
          val: '宕机检测',
          val1: "N",
          val2: "Y",
          val3: "Y",
          val4: "Y",
          val5: "Y",
        },
        {
          val: '宕机切换',
          val1: "N",
          val2: "Y",
          val3: "Y",
          val4: "Y",
          val5: "Y",
        },
        {
          val: '最小检测频率',
          val1: "30分钟",
          val2: "10分钟",
          val3: "2分钟",
          val4: "30秒",
          val5: "按需定制",
        },
        {
          val: '宕机备用',
          val1: "N",
          val2: "N",
          val3: "N",
          val4: "Y",
          val5: "按需定制",
        },
        {
          val: '安全',
          val1: "",
          val2: "",
          val3: "",
          val4: "",
          val5: "",
        },
        {
          val: '攻击检测',
          val1: "N",
          val2: "N",
          val3: "N",
          val4: "Y",
          val5: "按需定制",
        },
        {
          val: '安全防护',
          val1: "N",
          val2: "N",
          val3: "N",
          val4: "Y",
          val5: "按需定制",
        },
        {
          val: '其它',
          val1: "",
          val2: "",
          val3: "",
          val4: "",
          val5: "",
        },
        {
          val: '多用户',
          val1: "N",
          val2: "N",
          val3: "Y",
          val4: "Y",
          val5: "按需定制",
        },
        {
          val: 'API接口',
          val1: "N",
          val2: "Y",
          val3: "Y",
          val4: "Y",
          val5: "按需定制",
        },
        {
          val: '技术支持',
          val1: "N",
          val2: "vip",
          val3: "vip",
          val4: "vip",
          val5: "按需定制",
        },
        // {
        //   val:'自定义线路',
        //   val1: "N",
        //   val2: "N",
        //   val3: "N",
        //   val4: "Y"
        // },
        {
          val: '',
          val1: "",
          val2: "",
          val3: "",
          val4: "",
          val5: "",
        },
        {
          val: '价格',
          val1: "免费",
          val2: "",
          val3: "",
          val4: "",
          val5: "联系客服",
        },
        // {
        //   val:'价格/每年',
        //   val1: "免费",
        //   val2: "2800元/年",
        //   val3: "5800元/年",
        //   val4: "9800元/年",
        //         val5:"联系客服"
        // },
        {
          val: '',
          val1: "",
          val2: "",
          val3: "",
          val4: "",
          val5: "",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
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
    //更换服务器
    confirm_rep() {
      this.$request({
        url: "/user/licrep",
        params: this.form_rep
      }).then(res => {
        if (res.data.rec == 0) {
          this.addDialogFormVisibleRe = false
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 获取版本
    getNodeList() {
      this.$request({
        url: "/user/version",
      }).then((res) => {
        if (res.data.rec == 0) {
          this.version = res.data.data.version;
          if (res.data.data.kfqq != "") {
            this.kfqq = "客服QQ:" + res.data.data.kfqq;
          }
          if (res.data.data.kfwx != "") {
            this.kfwx = "WX:" + res.data.data.kfwx;
          }
          this.v = res.data.data;
          this.List.forEach((i) => {
            if (i.val == "价格") {
              if (this.v.p1 != 0 && this.v.p1y != 0) {
                i.val2 = this.v.p1 + "元/月 " + this.v.p1y + "元/年";
                this.p1v = "个人版(" + this.v.p1 + "元/月) (" + this.v.p1y + "元/年)"
              } else if (this.v.p1 != 0) {
                i.val2 = this.v.p1 + "元/月";
                this.p1v = "个人版(" + this.v.p1 + "元/月)"
              }
              if (this.v.p2 != 0 && this.v.p2y != 0) {
                i.val3 = this.v.p2 + "元/月 " + this.v.p2y + "元/年";
                this.p2v = "企业版(" + this.v.p2 + "元/月) (" + this.v.p2y + "元/年)"
              } else if (this.v.p2 != 0) {
                i.val3 = this.v.p2 + "元/月 ";
                this.p2v = "企业版(" + this.v.p2 + "元/月)"
              }
              if (this.v.p3 != 0 && this.v.p3y != 0) {
                i.val4 = this.v.p3 + "元/月 " + this.v.p3y + "元/年";
                this.p3v = "旗舰版(" + this.v.p3 + "元/月) (" + this.v.p3y + "元/年)"
              } else if (this.v.p3 != 0) {
                i.val4 = this.v.p3 + "元/月 ";
                this.p3v = "旗舰版(" + this.v.p3 + "元/月)"
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
              }]
              if (this.v.p1y == 0) {
                this.options1 = [{
                  value: '1m',
                  label: '一月'
                }, {
                  value: '1y',
                  label: '一年'
                }]
              }
            }
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  created() {
    this.getNodeList();
  },
  mounted() { },
};
</script>
<style lang='less' scoped>
.el-dialog {

  .el-button:active,
  .el-button:focus,
  .el-button:hover {
    color: #0164F6;
    border-color: #0164F6;
  }
}

.add-device {
  background: #0164F6;
  color: #fff;
  padding: 10px 15px !important;
}

.el-card {
  margin-bottom: 20px;
}

.main-title {
  line-height: 60px;
  font-weight: bold;
}

.row1 {
  &>div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .space {
      margin-right: 20px;
    }
  }
}

.head-color {
  color: #fff;
  font-weight: bold;
}

.el-button--text {
  color: #0164F6;
}

.myTable {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
  background: #fff;

  tr:first-child {
    background-color: #0164F6 !important;
    color: #fff;
  }

  tr:nth-child(odd) {
    background: #f5f7fa;
  }
}

// .myTable td,
.myTable tr {
  border: 1px solid #f1f1f1;
  color: #666;
  height: 40px;
}

.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: none;
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
</style>