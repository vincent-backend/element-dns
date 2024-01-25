<template>
  <div class="record-container">
    <div class="domin-manage">
      <i class="el-icon-back" @click="$router.back()">返回</i>
      <span style="margin:0 10px">{{ $route.query.domain }}</span>
      <el-tag type="success" v-if="$route.query.state == 0">正常</el-tag>
      <el-tag type="warning" v-if="$route.query.state == 1">暂停</el-tag>
    </div>
    <el-card>
      <div class="col1">
        <div>
          <el-button class="right-space add el-icon-plus" @click="addRecord">添加记录</el-button>
          <el-dialog title="添加域名" :visible.sync="dialogFormVisible" class="dialog">
            <el-form :model="form">
              <el-form-item label="域名：" label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" placeholder="如dnsbm.com"></el-input>
              </el-form-item>
              <el-form-item label="分组：" label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="限高级版本使用">
                  <el-option label="区域一" value="shanghai" class="hover-color"></el-option>
                  <el-option label="区域二" value="beijing" class="hover-color"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注：" label-width="formLabelWidth">
                <el-input type="textarea" :rows="2" placeholder="备注" v-model="form.textarea"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button style="float:left">批量解析</el-button>
              <el-button @click="dialogFormVisible = false" class="cansel">取 消</el-button>
              <el-button @click="dialogFormVisible = false" class="confirm">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div>
          <el-input placeholder="请输入内容" class="right-space" v-model="sea"></el-input>
          <el-button @click="search">搜索</el-button>
        </div>
      </div>
    </el-card>
    <el-table :cell-style="cell" size="small" :header-cell-style="fun" stripe ref="multipleTable" :data="recordList"
      tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="host" label="主机名" width="180" align="left">
        <template #default="scope">
          <el-input type="text" v-if="scope.row.show" placeholder="主机名" v-model="obj.host"
            v-bind:disabled="obj.id"></el-input>
          <span v-if="!scope.row.show">{{ scope.row.host }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="qt" show-overflow-tooltip label="类型" width="130">
        <template #default="scope">
          <el-select v-model="obj.qt" placeholder="请选择" v-if="scope.row.show">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <span v-else-if="scope.row.qt == 'URL1'">显性URL</span>
          <span v-else-if="scope.row.qt == 'URL2'">隐性URL</span>
          <span v-else>{{ scope.row.qt }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="val" show-overflow-tooltip label="记录值" width="300" align="left">
        <template #default="scope">
          <el-input type="text" v-if="scope.row.show" placeholder="记录值" v-model="obj.val"></el-input>
          <span v-else @click="xiugai(scope.row)">{{ scope.row.val }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="view" show-overflow-tooltip label="线路" align="left" width="120">
        <template #default="scope">
          <el-cascader :show-all-levels="false" :options="region" :props="{ expandTrigger: 'hover', checkStrictly: true }"
            v-if="scope.row.show" v-model="obj.vid"></el-cascader>
          <span v-else>{{ scope.row.view }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MX/权重" width="100" prop="pre" align="center">
        <template #default="scope">
          <el-input type="text" v-if="scope.row.show" v-model="obj.pre"></el-input>
          <span v-else>{{ scope.row.pre || '' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ttl" label="TTL" show-overflow-tooltip align="center" width="100">
        <template #default="scope">
          <el-input type="text" v-if="scope.row.show" v-model="obj.ttl"></el-input>
          <span v-else>{{ scope.row.ttl }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" show-overflow-tooltip label="状态" align="center">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.state == 0">正常</el-tag>
          <el-tag type="warning" v-if="scope.row.state == 1">暂停</el-tag>
          <el-tag type="danger" v-if="scope.row.state == 2">故障</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <div v-if="!scope.row.show">
            <i class="el-icon-lock" v-if="scope.row.id == 0"></i>
            <div v-else>
              <el-button type="text" @click="mon(scope.row)" style="margin-right:10px">监控</el-button>
              <el-button type="text" @click="stop(scope.row)" v-if="scope.row.state == 0">暂停</el-button>
              <el-button type="text" @click="start(scope.row)" v-else>启用</el-button>
              <el-button type="text" @click="del(scope.row)">删除</el-button>
              <el-button type="text" @click="xiugai(scope.row)">修改</el-button>
            </div>
          </div>
          <div v-else>
            <el-button type="text" @click="store(scope.row)">保存</el-button>
            <el-button type="text" @click="cancel(scope.row)">取消</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="监控添加" :visible.sync="dialogTableVisible">
      <el-form :model="form1">
        <el-form-item label="监控频率" :label-width="formLabelWidth">
          <el-radio-group v-model="form1.freq">
            <el-radio :label="v" v-for="(v, i) in freq" :key="i">{{ v }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="监控方式" :label-width="formLabelWidth">
          <el-radio v-model="form1.https" label="0">http</el-radio>
          <el-radio v-model="form1.https" label="1">https</el-radio>
          <el-radio v-model="form1.https" label="2">端口检测</el-radio>
        </el-form-item>
        <el-form-item label="主机头" v-if="form1.https != 2" :label-width="formLabelWidth">
          <el-input v-model="form1.domain" autocomplete="off" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="IP" :label-width="formLabelWidth">
          <el-input v-model="form1.val" autocomplete="off" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="端口" :label-width="formLabelWidth">
          <el-input v-model="form1.port" autocomplete="off" style="width:100px;"></el-input>
        </el-form-item>
        <el-form-item label="切换方式" :label-width="formLabelWidth">
          <el-radio-group v-model="form1.act">
            <el-radio style="margin-bottom:10px;margin-top:15px" :label="0">不对该域名记录做操作(不切换)</el-radio>
            <el-radio style="margin-bottom:10px" :label="1">自动暂停与智能切换(合适多机或负载均衡时用)</el-radio>
            <el-radio style="margin-bottom:10px" :label="2">切换到指定的备用IP(自定义切换)</el-radio>
            <!--<el-radio style="margin-bottom:10px" :label="3">切换到其他可用的IP(智能切换)</el-radio>-->
          </el-radio-group>
          <el-input v-if="form1.act == 2" style="width:250px" v-model="form1.bip"></el-input>
        </el-form-item>
        <el-form-item label="通知方式" :label-width="formLabelWidth">
          <el-checkbox label="邮件通知" v-model="form1.email"></el-checkbox>
          <el-checkbox label="短信通知" v-model="form1.sms"></el-checkbox>
          <el-button type="text" size="mini" icon="el-icon-place" style="margin: 0px 20px;"
            @click="selectNsc(form1.nsc)"></el-button>
          <el-input v-if="form1.nsc == true" style="width:250px" v-model="form1.ns" placeholder="可指定邮箱或手机"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="update1">确 定</el-button>
      </div>
    </el-dialog>
    <div class="footer-page" style="margin-top: 20px">
      <div>
        <el-button class="footer-b anniu" @click="start">启用</el-button>
        <el-button class="footer-b anniu" @click="stop">暂停</el-button>
        <el-button class="footer-b anniu" @click="del">删除</el-button>
      </div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 30, 50, 100, 500, 1000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="count" background :pager-count="5"></el-pagination>
    </div>
    <div><br></div>
    <el-alert title="注意事项" type="error">
      <template slot='title'>
        <div>注意事项:</div>
        <div>1、同一个主机名记录解析时，请先添加一条默认解析（至少也要添加一条默认解析），再添加其它的线路解析</div>
        <div>2、MX值是邮件记录需要填写参数，权重是有多条记录或负载均衡时的分配参数</div>
        <div></div>
      </template>
    </el-alert>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      freq: '',
      ttl: 3600,
      sort: "A",
      row: {},
      rowForm: [],
      pagesize: 10,
      load: 9000,
      show: true,
      recordList: [],
      multipleSelection: [],
      options: [
        {
          value: "A",
          label: "A"
        },
        {
          value: "NS",
          label: "NS"
        },
        {
          value: "CNAME",
          label: "CNAME"
        },
        {
          value: "MX",
          label: "MX"
        },
        {
          value: "TXT",
          label: "TXT"
        },
        {
          value: "AAAA",
          label: "AAAA"
        },
        {
          value: "SRV",
          label: "SRV"
        },
        {
          value: "CAA",
          label: "CAA"
        },
        {
          value: "URL1",
          label: "显性URL"
        },
        {
          value: "URL2",
          label: "隐性URL"
        }
      ],
      value: "",
      checked: true,
      formLabelWidth: "15%",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        textarea: ""
      },
      form1: {
        oid: "",
        domain: "",
        val: "",
        port: "80",
        https: "0",
        freq: "",
        act: 0,
        bip: "",
        email: "",
        sms: "",
        ns: "",
        nsc: false
      },
      dialogFormVisible: false,
      dialogTableVisible: false,
      multipleSelection: [],
      currentPage: 1,
      region: [],
      obj: {
        domain: "",
        host: "",
        qt: "A",
        val: "",
        show: true,
        id: "",
        vid: 9000,
        ttl: 3600,
        pre: ""
      },
      count: 0,
      sea: "",
      per: true
    };
  },
  computed: {},
  watch: {},
  methods: {
    selectNsc(row) {
      if (row == true) {
        this.form1.nsc = false;
      } else {
        this.form1.nsc = true;
      }
    },
    update1() {
      if (this.form1.freq == "") {
        this.$message.error("请选择监控频率");
        return
      }
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
      this.form1.ip = this.form1.val
      this.$request({
        url: "/mon/add",
        params: this.form1
      }).then(res => {
        this.dialogTableVisible = false;
        if (res.data.rec == 0) {
          this.$message.success("监控成功");
          this.getmon();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    cell({ columnIndex }) {
      if (columnIndex == 8) {
        return { "text-align": "center" };
      }
    },
    // 监控
    mon(v) {
      this.dialogTableVisible = true;
      this.form1.domain = v.host + "." + v.domain;
      this.form1.oid = v.id;
      this.form1.val = v.val
    },
    // 启用
    start(v) {
      var id = this.multipleSelection.map(item => {
        return item.id;
      });
      this.$confirm(`是否启用`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request({
            url: "/domain/record/start",
            params: { id: v.id || id.toString() }
          }).then(res => {
            if (res.data.rec == 0) {
              this.$message.success("启用成功");
              this.getRecordList();
            } else {
              this.$message.warning(res.data.msg);
            }
          });
        })
        .catch(err => { });
    },
    // 修改当前
    xiugai(v) {
      //console.log(v);
      this.recordList.forEach(item => {
        item.show = false;
      });
      v.show = true;
      this.obj = v;
      this.obj.vid = v.vid;
      if (this.obj.qt == "NS") {
        v.show = false
      }
      if (this.obj.pre == 0) {
        this.obj.pre = "";
      }
    },
    // 暂停
    stop(v) {
      var id = this.multipleSelection.map(item => {
        return item.id;
      });
      this.$confirm(`是否暂停`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request({
            url: "/domain/record/stop",
            params: {
              id: v.id || id.toString()
            }
          }).then(res => {
            if (res.data.rec == 0) {
              this.$message.success("暂停成功");
              this.getRecordList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消暂停"
          });
        });
    },
    // 搜索
    search() {
      this.getRecordList();
    },
    // 删除
    del(v) {
      var id = this.multipleSelection.map(item => {
        return item.id;
      });
      this.$confirm(`是否删除${v.host || ""}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request({
            url: "/domain/record/del",
            params: {
              id: v.id || id.toString()
            }
          }).then(res => {
            if (res.data.rec == 0) {
              this.$message.success("删除成功");
              this.getRecordList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 修改
    update(v) {
      this.store(v);
    },
    // 取消
    cancel(v) {
      this.per = true
      this.getRecordList();
    },
    // 保存
    store(v) {
      this.obj.view = this.obj.vid.toString();
      this.$request({
        url: "/domain/record/add",
        params: this.obj || v
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success(res.data.msg);
          this.per = true
          this.getRecordList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 获取解析记录列表
    getRecordList() {
      this.$request({
        url: "/domain/record/list",
        params: {
          domain: this.$route.query.domain,
          page: this.currentPage,
          pagesize: this.pagesize,
          search: this.sea
        }
      }).then(res => {
        if (res.data.rec == 0) {
          res.data.data.list.forEach(item => (item.show = false));
          this.recordList = res.data.data.list;
          this.count = res.data.data.count;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 添加记录
    addRecord(v) {
      var obj = {
        domain: this.$route.query.domain,
        host: "",
        qt: "A",
        val: "",
        show: true,
        id: v.id,
        vid: 9000,
        ttl: localStorage.getItem('ttl'),
        pre: "",
      };
      this.obj = obj;
      if (this.per) {
        this.recordList.unshift(obj);
        this.per = false
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    goBack() {
      //console.log("go back");
    },
    toggleAll() {
      this.$refs.multipleTable.toggleAllSelection();
    },
    fun({ columnIndex }) {
      if (columnIndex !== 8)
        return {
          background: "#0164F6",
          color: "#fff",
          height: "50px"
        };
      if (columnIndex == 8) {
        return {
          "text-align": "center",
          background: "#0164F6",
          color: "#fff",
          "padding-right": "10px",
          height: "50px"
        };
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 监控
    Towatch() {
      this.$router.push("/domin/list/watch");
    },
    // 统计
    Tocount() {
      this.$router.push("/domin/list/count");
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getRecordList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getRecordList();
    },
    dialog() {
      this.dialogTableVisible = false;
      this.$router.push(
        "/watch/mon?domain=" +
        this.$route.query.domain +
        "&id=" +
        this.$route.query.id +
        "&oid=" +
        this.rowForm[0].id +
        "&host=" +
        this.row.host
      );
    }
  },
  created() {
    this.getRecordList();
    this.$request({
      url: "/domain/region"
    }).then(res => {
      this.region = JSON.parse(res.data.data);
      //console.log(this.region);
    });
    // 获取监控间隔
    this.$request({
      url: "/sys/dns/view"
    }).then(res => {
      if (res.data.rec == 0) {
        this.freq = res.data.data.freq.split(",");
      } else {
        this.$message.error(res.data.msg);
      }
    });
  },
  mounted() { }
};
</script>
<style lang='less' scoped>
.el-dropdown-menu {
  padding: 0;

  li:hover {
    color: #0164F6;
  }
}

.domin-manage {
  line-height: 60px;
  font-weight: bold;
}

.el-card {
  margin-bottom: 20px;

  .col1 {
    border: 0;
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
}

.cansel {
  background-color: #fff;
}

.confirm {
  background-color: #0164F6;
  color: #fff !important;
}

.dialog {

  .el-textarea,
  .el-input,
  .el-select {
    width: 85% !important;
  }

  .hover-color:hover {
    color: #0164F6 !important;
  }

  .el-select-dropdown__item.selected {
    color: #0164F6;
  }
}

.head-color {
  color: #fff !important;
}

.more {
  margin-left: 10px;
}

.shu {
  color: #f1f1f1;
  margin-top: 5px;
}

.more-list .el-dropdown-menu__item {
  padding: 0 15px;
}

.footer-page {
  display: flex;
  justify-content: space-between;
}

.footer-b {
  padding: 9px 15px;
}

.fenzu {
  margin: 0 10px;
}

.anniu:hover {
  color: #0164F6;
}

.el-button--text {
  color: #0164F6;
}

.el-page-header {
  line-height: 60px;
}

.el-icon-back {
  color: #0164F6;
  font-weight: bold;
}

.el-dialog {
  width: 600px !important;
}

.col1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f1f1f1;
}

.el-form-item {
  border-bottom: 1px solid #f1f1f1;
  padding: 10px;
  margin-bottom: 0;
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
}
</style>
<style lang="less">
.el-message-box__btns {

  .el-button:active,
  .el-button:focus,
  .el-button:hover {
    color: #0164F6;
    background: #fff;
    border-color: #0164F6;
  }
}</style>