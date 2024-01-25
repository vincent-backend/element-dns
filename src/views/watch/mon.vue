<template>
  <div class>
    <div class="domin-manage">监控设置</div>
    <el-card>
      <div class="drawer">
        <span>监控节点</span>
        <span class="mid">我们将从三个节点进行监控</span>
        <el-button type="text" @click="dialogFormVisible = true">修改</el-button>
      </div>
      <div class="drawer">
        <span>监控频率</span>
        <span class="mid">每十分钟一次</span>
        <el-button type="text" @click="dialogFormVisible = true">修改</el-button>
      </div>
      <div class="drawer">
        <span>监控任务</span>
        <span class="mid">测试dnsbm是否访问正常</span>
        <el-button type="text" @click="dialogFormVisible = true">修改</el-button>
      </div>
      <div class="drawer">
        <span>切换规则</span>
        <span class="mid">当确定某台服务器无法正常访问后，不对该域名记录做任何修改</span>
        <el-button type="text" @click="dialogFormVisible = true">修改</el-button>
      </div>
      <div class="drawer">
        <span>通知设置</span>
        <span class="mid">宕机时会通过邮件指定联系人</span>
        <el-button type="text" @click="dialogFormVisible = true">修改</el-button>
      </div>
    </el-card>
    <el-dialog title="dnsbm" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="监控频率" :label-width="formLabelWidth">
          <el-radio v-model="form.freq" :label="10">10分钟/次</el-radio>
        </el-form-item>
        <el-form-item label="主机头" :label-width="formLabelWidth">
          <el-input v-model="form.domain" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="路径" :label-width="formLabelWidth">
          <el-input v-model="form.path" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="端口" :label-width="formLabelWidth">
          <el-input v-model="form.port" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="HTTPS" :label-width="formLabelWidth">
          <el-checkbox v-model="form.https"></el-checkbox>
        </el-form-item>
        <el-form-item label="切换规则" :label-width="formLabelWidth">
          <el-radio-group v-model="form.act">
            <el-radio style="margin-bottom:10px;margin-top:15px" :label="0">不对该域名记录做任何修改(不切换)</el-radio>
            <el-radio style="margin-bottom:10px" :label="1">备停止解析该域名记录(智能暂停)</el-radio>
            <el-radio style="margin-bottom:10px" :label="2">切换到您设置的备用IP(自定义切换)</el-radio>
            <el-radio style="margin-bottom:10px" :label="3">切换到其他可用的IP(智能切换)</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="通知方式" :label-width="formLabelWidth">
          <el-checkbox label="邮件通知" v-model="form.email"></el-checkbox>
          <el-checkbox label="短信通知" v-model="form.sms"></el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      form: {
        id: "",
        oid: this.$route.query.oid,
        domain: "",
        path: "/",
        port: "80",
        https: "",
        freq: "",
        act: 0,
        bip: "",
        email: "",
        sms: ""
      },
      formLabelWidth: "80px"
    };
  },
  computed: {},
  watch: {},
  methods: {
    getmon() {
      this.$request({
        url: "/mon/view",
        params: { id: this.$route.query.id }
      }).then(res => {
        if (res.data.rec == 0) {
          this.form = res.data.data;
          if (this.form.https == 1) {
            this.form.https = true;
          } else {
            this.form.https = false;
          }
          if (this.form.email == 1) {
            this.form.email = true;
          } else {
            this.form.email = false;
          }
          if (this.form.sms == 1) {
            this.form.sms = true;
          } else {
            this.form.sms = false;
          }
        }
      });
    },
    update() {
      if (this.form.https == true) {
        this.form.https = 1;
      } else {
        this.form.https = 0;
      }
      if (this.form.email == true) {
        this.form.email = 1;
      } else {
        this.form.email = 0;
      }
      if (this.form.sms == true) {
        this.form.sms = 1;
      } else {
        this.form.sms = 0;
      }
      this.$request({
        url: "/mon/add",
        params: this.form
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success("监控/修改成功");
          this.getmon()
          this.dialogFormVisible = false
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  },
  created() {
    this.form.domain = this.$route.query.host + '.' + this.$route.query.domain
    this.getmon()
  },
  mounted() { }
};
</script>
<style lang='less' scoped>
.el-form-item {
  background: #f1f1f1;
  padding: 10px;
}

/deep/.el-radio__input.is-checked+.el-radio__label,
/deep/.el-checkbox__input.is-checked+.el-checkbox__label {
  color: #0164F6;
}

/deep/.el-radio__input.is-checked .el-radio__inner {
  background: #0164F6;
  border-color: #0164F6;
}

.domin-manage {
  line-height: 60px;
  font-weight: bold;
}

.drawer {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 0 30px;
  line-height: 50px;

  span:first-child {
    font-weight: bold;
    flex: 1;
  }

  .el-button:last-child {
    flex: 1;
    color: #0164F6;
    text-align: right;
  }

  .mid {
    flex: 4;
    color: #666;
  }
}</style>