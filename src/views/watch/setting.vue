<template>
  <div class>
    <div class="domin-manage">监控列表</div>
    <div class="header-container">
      <el-button @click="stopMon">暂停监控</el-button>
      <el-button @click="startMon">继续监控</el-button>
      <el-button @click="delMon">删除监控</el-button>
    </div>
    <el-table size="small" :header-cell-style="fun" stripe ref="multipleTable" :data="monList" tooltip-effect="dark"
      style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="domain" label="域名" width="180">
        <template #default="scope">
          <el-button type="text" @click="watch(scope.row)">{{ scope.row.domain }}</el-button>
        </template>
      </el-table-column>
      <el-table-column width="180" prop="ip" label="IP">
        <template #default="scope">
          <span>{{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" prop="port" label="端口"></el-table-column>
      <el-table-column width="100" prop="freq" label="频率"></el-table-column>
      <el-table-column width="130" prop="https" label="监控方式">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.https == 0">http</el-tag>
          <el-tag type="success" v-else-if="scope.row.https == 1">https</el-tag>
          <el-tag type="success" v-else>端口检测</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="130" prop="act" label="切换规则">
        <template #default="scope">
          <span v-if="scope.row.act == 0">不切换</span>
          <span v-if="scope.row.act == 1">暂停解析</span>
          <span v-if="scope.row.act == 2">切换备用</span>
          <span v-if="scope.row.act == 3">智能切换</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="通知方式" width="230">
        <template #default="scope">
          <el-button type="text" size="mini" icon="el-icon-s-promotion" v-if="scope.row.email == 1"></el-button>
          <el-button type="text" size="mini" icon="el-icon-phone" v-if="scope.row.sms == 1"></el-button>
          <span v-if="scope.row.ns != ''">{{ scope.row.ns }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" show-overflow-tooltip label="状态" width="100">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.state == 0">运行中</el-tag>
          <el-tag type="warning" v-else>停止</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="state" show-overflow-tooltip label="操作">
        <template #default="scope">
          <el-button @click="watch(scope.row)" type="text">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="设置修改" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="监控频率" :label-width="formLabelWidth">
          <el-radio-group v-model="form.freq">
            <el-radio :label="v" v-for="(v, i) in freq" :key="i">{{ v }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="监控方式" :label-width="formLabelWidth">
          <el-radio v-model="form.https" :label="0">http</el-radio>
          <el-radio v-model="form.https" :label="1">https</el-radio>
          <el-radio v-model="form.https" :label="2">端口检测</el-radio>
        </el-form-item>
        <el-form-item label="主机域名" v-if="form.https != 2" :label-width="formLabelWidth">
          <el-input v-model="form.domain" autocomplete="off" :disabled="true" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" :label-width="formLabelWidth">
          <el-input v-model="form.ip" autocomplete="off" :disabled="true" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="端口" :label-width="formLabelWidth">
          <el-input v-model="form.port" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="切换规则" :label-width="formLabelWidth">
          <el-radio-group v-model="form.act">
            <el-radio style="margin-bottom:10px;margin-top:15px" :label="0">不对该域名记录做操作(不切换)</el-radio>
            <el-radio style="margin-bottom:10px" :label="1">自动暂停与智能切换(合适多机或负载均衡时用)</el-radio>
            <el-radio style="margin-bottom:10px" :label="2">切换到指定的备用IP(自定义切换)</el-radio>
            <!--<el-radio style="margin-bottom:10px" :label="3">切换到其他可用的IP(智能切换)</el-radio>-->
          </el-radio-group>
          <el-input v-if="form.act == 2" style="width:250px" class="bian" v-model="form.bip"></el-input>
        </el-form-item>
        <el-form-item label="通知方式" :label-width="formLabelWidth">
          <el-checkbox label="邮件通知" v-model="form.email"></el-checkbox>
          <el-checkbox label="短信通知" v-model="form.sms"></el-checkbox>
          <el-button type="text" size="mini" icon="el-icon-place" style="margin: 0px 20px;"
            @click="selectNsc(nsc)"></el-button>
          <el-input v-if="nsc == true" style="width:250px" class="bian" v-model="form.ns"
            placeholder="可指定邮箱或手机"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
    <div class="footer-page" style="margin-top: 20px">
      <el-pagination style="width:100%;text-align:right" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 30, 50, 100, 500, 1000]"
        :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="count" background
        :pager-count="5"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      freq: [],
      innerDrawer: false,
      drawer: false,
      monList: [],
      form: {
        id: "",
        oid: this.$route.query.oid,
        domain: "",
        ip: "",
        port: "80",
        https: "0",
        freq: '',
        act: 0,
        bip: "",
        email: 0,
        sms: 0,
        ns: "",
        nsc: false
      },
      nsc: false,
      formLabelWidth: "80px",
      value: "",
      checked: true,
      dialogFormVisible: false,
      multipleSelection: [],
      currentPage: 1,
      pagesize: 10,
      count: 0,
      loading: false,
      id: 0
    };
  },
  computed: {},
  watch: {},
  methods: {
    selectNsc(row) {
      if (row == true) {
        this.nsc = false;
      } else {
        this.nsc = true;
      }
    },
    watch(v) {
      this.id = v.id;
      this.dialogFormVisible = true;
      this.getmon();
    },
    getmon() {
      this.$request({
        url: "/mon/view",
        params: { id: this.id }
      }).then(res => {
        if (res.data.rec == 0) {
          this.form = res.data.data;
          //this.form.freq=this.form.freq
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
          if (res.data.data.ns != "") {
            this.nsc = true;
          } else {
            this.nsc = false;
          }
        }
      });
    },
    update() {
      // if (this.form.https == true) {
      //   this.form.https = 1;
      // } else {
      //   this.form.https = 0;
      // }
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
          this.$message.success("修改成功");
          this.getmon();
          this.getMonList();
          this.dialogFormVisible = false;
        } else {
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
          this.$message.error(res.data.msg);
        }
      });
    },
    toggleAll() {
      this.$refs.multipleTable.toggleAllSelection();
    },
    fun({ columnIndex }) {
      if (columnIndex !== 8)
        return {
          height: "50px",
          background: "#0164F6",
          color: "#fff"
        };
      if (columnIndex == 8) {
        return {
          height: "50px",
          background: "#0164F6",
          color: "#fff",
          "padding-right": "10px"
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    startMon(v) {
      var id = this.multipleSelection.map(item => {
        return item.id;
      });
      this.$request({
        url: "/mon/start",
        params: {
          id: id.toString()
        }
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success("监控成功");
          this.getMonList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    stopMon() {
      var id = this.multipleSelection.map(item => {
        return item.id;
      });
      this.$request({
        url: "/mon/stop",
        params: {
          id: id.toString()
        }
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success("停止监控");
          this.getMonList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    delMon() {
      //console.log(this.multipleSelection);
      var id = this.multipleSelection.map(item => {
        return item.id;
      });
      this.$confirm(`是否删除`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request({
            url: "/mon/del",
            params: { id: id.toString() }
          }).then(res => {
            if (res.data.rec == 0) {
              this.$message.success("删除成功");
              this.getMonList();
            } else {
              this.$message.warning(res.data.msg);
            }
          });
        })
        .catch(err => { });
    },
    // 监控
    Towatch() {
      this.$router.push("/domin/list/watch");
    },
    // 解析
    Torecord() {
      this.$router.push("/domin/list/record");
    },
    // 统计
    Tocount() {
      this.$router.push("/domin/list/count");
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getMonList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getMonList();
    },
    getMonList() {
      this.$request({
        url: "/mon/list",
        params: {
          page: this.currentPage,
          pagesize: this.pagesize
        }
      }).then(res => {
        if (res.data.rec == 0) {
          this.monList = res.data.data.list;
          this.count = res.data.data.count;
          this.form.freq = this.monList.freq
        }
      });
    }
  },
  created() {
    this.getMonList();
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
  font-weight: bold;
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

.el-form-item {
  border-bottom: 1px solid #f1f1f1;
  margin-bottom: 0;
  padding: 5px;

  /deep/input {
    border: none
  }
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

/deep/.bian input {
  border: 1px solid #ddd;
}

.header-container {
  justify-content: flex-start;
}
</style>