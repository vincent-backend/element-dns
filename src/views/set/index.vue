<template>
  <div class>
    <div class="control">后台设置</div>
    <el-card class="box-card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="后台设置" name="backend">
          <div class="domin-list">
            <span style="width:100px;display:inline-block">后台名称：</span>
            <el-input placeholder="请输入内容" v-model="form.name" clearable class="shuru"></el-input>
            <span class="gray">设置后台显示名称(设置后需重新登录生效)</span>
          </div>
          <div class="domin-list">
            <span style="width:100px;display:inline-block">后台端口：</span>
            <el-input placeholder="请输入内容" v-model="form.port" clearable class="shuru"></el-input>
            <span class="gray">请在相关安全策略或防火墙策略里开通此端口的外部访问</span>
          </div>
          <div class="domin-list">
            <span style="width:100px;display:inline-block">后台目录：</span>
            <el-input placeholder="请输入内容" v-model="form.apd" clearable class="shuru"></el-input>
            <span class="gray">可指定后端的访问目录，如/admin，默认为 /</span>
          </div>
          <div class="domin-list">
            <span style="width:100px;display:inline-block">域名访问：</span>
            <el-input placeholder="请输入域名" v-model="form.domain" clearable class="shuru"></el-input>
            <span class="gray">设置后，只有该域名可登录；如不想加端口访问，需修改端口为80；上传域名证书，可启用https访问；<font color="red">谨慎设置</font></span>
          </div>
          <div class="domin-list bottom">
            <span style="width:100px;display:inline-block">登录ip：</span>
            <el-input type="textarea" placeholder="请输入ip地址或ip网络段" v-model="form.aips" clearable class="shuru"
              style="height:100%;width:300px"></el-input>
            <span class="gray">默认为空，不限制。设置后，只有指定的IP可登录后台。<font color="red">谨慎设置</font></span>
          </div>
          <div class="domin-list">
            <el-button style="width:100px;display:inline-block;color:#0164F6;border-color:#0164F6;margin:0px 120px"
              @click="set">提交</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="HTTPS设置" name="https">
          <div class="domin-one">
          </div>
          <el-form :model="formUp" :rules="uploadRules" ref="uploadSsl">
            <el-form-item label="证书上传" :label-width="formLabelWidth" prop="cert">
              <el-upload v-if="formUp.cf == ''" list-type="text" :limit="2" action="" :http-request="uploadSsl"
                ref="uploadSsl">
                >
                <i class="el-icon-plus"></i>&nbsp;&nbsp;<el-tag v-if="form.sslis == true" type="warning">已上传证书文件</el-tag>
              </el-upload>
              <div v-else>
                <img :src="formUp.cf" alt="" style="width:150px;height:150px;margin-right:10px">
                <img :src="formUp.kf" alt="" style="width:150px;height:150px">
              </div>
            </el-form-item>
            <el-form-item>
              <el-button style="width:75px;margin:10px 90px" type="primary" @click="submitSsl">确定</el-button>
            </el-form-item>
          </el-form>
          <el-alert title="" type="success" description="上传证书后，默认使用标准的443端口"></el-alert>
        </el-tab-pane>
        <el-tab-pane label="ICO图标设置" name="ico">
          <div class="domin-one">
          </div>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="ICO文件" prop="icof">
              <el-upload v-if="ruleForm.icof == ''" list-type="picture-card" :limit="1" action="" :http-request="uploadIco">
                <i class="el-icon-plus"></i><el-tag v-if="form.icois == true" type="warning">已上传</el-tag>
              </el-upload>
              <div v-else>
                <img :src="ruleForm.icof" alt="" style="width:150px;height:150px;margin-right:10px">
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitIco">确定</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="更换迁移" name="chg">
          <div class="domin-one">
          </div>
          <div class="domin-list">
            <span style="width:80px;display:inline-block">新IP地址：</span>
            <el-input placeholder="请输入IP" v-model="nip" style="width:200px;display:inline-block"></el-input>
            <span class="gray"> &nbsp;&nbsp;输入新主控的IP地址，如非默认端口，可使用ip:port方式添加端口号</span>
          </div>
          <div class="domin-list bottom">
            <span style="width:80px;display:inline-block">数据迁移</span>
            <el-switch v-model="dt" active-color="#13ce66" inactive-color="#ff4949"
              style="width:210px;margin:0 0px"></el-switch>
            <span class="gray">将主要设置与数据库等自动迁移至新主控中</span>
          </div>
          <div class="domin-list">
            <el-button type="primary" style="width:80px;margin:5px 120px;" @click="submitChg">提交</el-button>
          </div>
          <div class="domin-one">
          </div>
          <el-alert title="备注说明" type="error">
            <template slot='title'>
              <div class="iconSize">注意事项:</div>
              <div class="iconSize">1、本功能为更换主控服务器时，用于自动修改设置与数据迁移；</div>
              <div class="iconSize">2、请勿随意操作，确定更换主控时再操作；</div>
              <div class="iconSize">3、此操作需要时间较长，请耐心等待；</div>
            </template>
          </el-alert>
        </el-tab-pane>
        <el-tab-pane label="主IP设置" name="msip">
          <div class="domin-one">
          </div>
          <div class="domin-list">
            <span style="width:80px;display:inline-block">主IP地址：</span>
            <el-input placeholder="请输入主IP" v-model="msip" style="width:200px;display:inline-block"></el-input>
            <span class="gray"> &nbsp;&nbsp;输入主主控的IP地址</span>
          </div>
          <div class="domin-list">
            <el-button type="primary" style="width:80px;margin:5px 120px;" @click="submitMsip">确定</el-button>
          </div>
          <div class="domin-one">
          </div>
          <el-alert title="备注说明" type="error">
            <template slot='title'>
              <div class="iconSize">注意事项:</div>
              <div class="iconSize">本功能为双主控时做备主控且同时做为节点解析时设置，其它场景请勿设置</div>
            </template>
          </el-alert>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import event from "@/assets/event.js";
export default {
  name: "",
  components: {},
  data() {
    return {
      form: {
        name: "",
        domain: "",
        port: "",
        apd: "/",
        aips: "",
        sslis: false,
        icois: false
      },
      ruleForm: {
        icof: ''
      },
      rules: {
        icof: [{ required: true, message: "请选择ICO文件", trigger: "blur" }],
      },
      formUp: {
        cf: "",
        kf: "",
      },
      uploadRules: {
        cf: [{ required: true, message: "请输选择证书文件", trigger: "blur" }],
        kf: [{ required: true, message: "请输选择密钥文件", trigger: "blur" }]
      },
      fileUp: [],
      upc: 0,
      formLabelWidth: "80px",
      activeName: "backend",
      fileIco: [],
      fic: 0,
      nip: "",
      msip: "",
      dt: 0
    };
  },
  computed: {},
  watch: {},
  methods: {
    submitChg() {
      this.$request({
        url: "/sys/export",
        params: {
          ip: this.nip,
          dt: this.dt
        }
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    submitMsip() {
      this.$request({
        url: "/sys/msip",
        params: {
          ip: this.msip
        }
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    submitSsl() {
      if (this.upc != 2) {
        this.$message.error("请选择证书文件");
        return;
      }
      var formData = new FormData;
      formData.append('kf', this.fileUp[0].file);
      formData.append('cf', this.fileUp[1].file);
      this.$request({
        url: "/sys/upload/ssl",
        data: formData,
        method: 'post',
        headers: { 'Content-Type': "multipart/form-data" }
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    submitIco() {
      if (this.fic != 1) {
        this.$message.error("请选择文件");
        return;
      }
      var formData = new FormData;
      formData.append('icon', this.fileIco[0].file);
      this.$request({
        url: "/sys/upload/icon",
        data: formData,
        method: 'post',
        headers: { 'Content-Type': "multipart/form-data" }
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success(res.data.msg);
          //this.info();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    uploadIco(file) {
      this.fileIco.push(file);
      this.fic++;
    },
    uploadSsl(file) {
      this.fileUp.push(file);
      this.upc++;
    },
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    set() {
      var form = this.form;
      var aips = form.aips.replace(/\s+/g, ",");
      this.$request({
        url: "/sys/panel",
        params: {
          name: form.name,
          port: form.port,
          apd: form.apd,
          domain: form.domain,
          aips,
          act: "setup"
        }
      }).then(res => {
        if (res.data.rec == 3) {
          this.$router.push("/notfound");
          return;
        } else if (res.data.rec == 0) {
          this.$message.success("设置成功");
          // 面板别名
          this.$request({
            url: "/user/info"
          }).then(res => {
            if (res.data.rec == 0) {
              window.localStorage.setItem("win", res.data.data.title);
              event.$emit("pan", res.data.data.title);
            } else {
              this.$message.error(res.data.msg);
            }
          });
          this.$request({
            url: "/sys/panel",
            params: {
              act: "view"
            }
          }).then(res => {
            this.form = res.data.data;
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  },
  created() {
    this.$request({
      url: "/sys/panel",
      params: {
        act: "view"
      }
    }).then(res => {
      if (res.data.rec == 0) {
        this.form = res.data.data;
        this.msip = res.data.data.msip;
      } else {
        this.$message.error(res.data.msg);
      }
    });
  },
  mounted() { }
};
</script>
<style lang='less' scoped>
/deep/textarea {
  height: 150px;
}

.gray {
  color: #999;
}

div {
  font-size: 14px;
}

.bottom {
  align-items: baseline;
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f1f2;
}

.domin-list {
  margin-top: 30px;

  .el-textarea {
    height: 200px;
    width: 350px;
    vertical-align: top;
    margin: 0 20px;
  }

  .el-select {
    width: 350px;
    vertical-align: top;
    margin: 0 20px;
  }
}

.opsity {
  opacity: 0;
}

.bottom-sub {
  width: 200px;
  margin: 20px;
}

.control {
  line-height: 60px;
  font-weight: bold;
  font-size: 16px;
}

.shuru {
  width: 300px;
  margin: 0 20px;
}

.domin-one {
  margin-top: 30px;
}

.iconSize {
  font-size: 16px;
  padding: 10px;
}
</style>