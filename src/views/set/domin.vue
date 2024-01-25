<template>
  <div class>
    <div class="control">权威DNS设置</div>
    <el-card style="padding-left:50px">
      <el-alert
              title="备注说明"
              type="error"
              description="此项设置只在用于互联网域名权威解析时需设置，如用于内网或转发时可忽略。"
      ></el-alert>
      <div class="domin-list bottom">
        <span style="width:100px;display:inline-block">主域名：</span>
        <el-input placeholder="请输入内容" v-model="form.domain" clearable class="shuru"></el-input>
        <span class="gray">DNS域名(替换为您自己的域名)</span>
      </div>
      <div class="domin-list bottom">
        <span style="width:100px;display:inline-block">NS地址：</span>
        <el-input placeholder="请输入内容" v-model="form.ns" clearable class="shuru"></el-input>
        <span class="gray">域名解析服务的NS地址(替换为您自己的域名或实际设置,该地址需在域名商后台注册，并在后台添加相应记录)</span>
      </div>
      <div class="domin-list bottom">
        <span style="width:100px;display:inline-block">TTL时间：</span>
        <el-input placeholder="请输入内容" v-model="form.ttl" clearable class="shuru"></el-input>
        <span class="gray">默认ttl值，即默认TTL缓存或生效时间</span>
      </div>
      <div class="domin-list bottom">
        <span style="width:100px;display:inline-block">监控间隔</span>
        <el-input placeholder="请输入内容" v-model="form.freq" clearable class="shuru"></el-input>
        <span class="gray">监控检测的时间间隔,多个用逗号隔开(m代表分钟,s代表秒,如1m即1分钟)</span>
      </div>
      <!--
      <div class="domin-list bottom">
        <span style="width:100px;display:inline-block">用户注册</span>
        <el-switch
                v-model="form.reg"
                active-color="#13ce66"
                inactive-color="#ff4949"
                style="width:300px;margin:0 20px"
        ></el-switch>
        <span class="gray">是否开放用户自由注册</span>
      </div>-->
      <el-button style="width:100px;margin:10px 120px" type="primary" @click="submit">保存</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      form: {
        domain: "",
        ns: "",
        ttl: "",
        freq:'',
        reg:false
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    submit() {
      var {
        domain,
        ns,
        ttl,
        freq,
        reg
      } = this.form;
      this.$request({
        url: "/sys/dns/setup",
        params: {
          domain,
          ns,
          ttl,
          reg,
          freq
        }
      }).then(res => {
        if (res.data.rec == 0) {
          this.$request({
            url: "/sys/dns/view"
          }).then(res => {
            this.form = res.data.data;
          });
          this.$message.success("设置成功");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  },
  created() {
    this.$request({
      url: "/sys/dns/view"
    }).then(res => {
      if (res.data.rec == 0) {
        this.form = res.data.data;
      }else{
       this.$message.error(res.data.msg);
      }
    });
  },
  mounted() {}
};
</script>
<style lang='less' scoped>
.gray {
  color: #999;
}
div {
  font-size: 14px;
}
.bottom {
  align-items: center;
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid #f1f1f1;
}
.domin-list {
  margin-top: 20px;
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
</style>