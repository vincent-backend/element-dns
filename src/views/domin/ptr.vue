<template>
  <div class="domain-container">
    <div class="domin-manage">反向解析</div>
    <div class="header-container">
      <div class="header-left">
        <el-button type="primary" @click="dialogFormVisible = true">添加反向解析</el-button>
        <el-dialog title="添加反向解析" :visible.sync="dialogFormVisible" class="dialog">
          <el-form :model="addForm" :rules="addDominRules">
            <el-form-item label="IP：" label-width="65px" prop="ip">
              <el-input v-model="addForm.ip" autocomplete="off" placeholder="如 192.168.0.11"></el-input>
            </el-form-item>
            <el-form-item label="域名：" label-width="65px" prop="domain">
              <el-input v-model="addForm.domain" autocomplete="off" placeholder="如 mx.dnsbm.com"></el-input>
            </el-form-item>
            <!--<el-form-item label="备注：" label-width="65px">
                                <el-input type="textarea" :rows="2" placeholder=" 备注" v-model="addForm.note"></el-input>
                            </el-form-item>-->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="addDomin" class="confirm">确 定</el-button>
          </div>
        </el-dialog>
        <span class="info">反向解析，也称为PTR，指通过IP地址解析或查找到域名&nbsp;&nbsp;</span>
      </div>
      <div class="header-right">
        <el-input placeholder="ip或域名" class="right-space" v-model="searchVal"></el-input>
        <el-button @click="search">搜索</el-button>
      </div>
    </div>
    <el-table size="small" id="out-table" :header-cell-style="fun" stripe ref="multipleTable" :data="domainList"
      tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="ip" label="IP" width="260"></el-table-column>
      <el-table-column prop="domain" label="域名" width="260"></el-table-column>
      <el-table-column prop="state" show-overflow-tooltip width="220">
        <template slot="header">
          <el-dropdown placement="bottom">
            <el-button class="head-color" type="text" style="font-size:16px">
              状态
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="stateList(0)">全部</el-dropdown-item>
              <el-dropdown-item @click.native="stateList(1)">正常</el-dropdown-item>
              <el-dropdown-item @click.native="stateList(2)">暂停</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.state == 0">正常</el-tag>
          <el-tag type="warning" v-if="scope.row.state == 1">暂停</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="uid" show-overflow-tooltip width="150">
        <template #header v-if="gid1 == 1">
          <el-dropdown placement="bottom">
            <el-button class="head-color" type="text" style="font-size:16px">
              用户
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" class="group">
              <el-dropdown-item @click.native="selectUser(0)">全部</el-dropdown-item>
              <el-dropdown-item v-for="(v, i) in userList" :key="i" @click.native="selectUser(v.id)">{{ v.user
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template #header v-else>
          <span>用户</span>
        </template>
        <template #default="scope">
          <el-button type="text" size="mini" icon="el-icon-user" v-if="uid == 0"
            @click="selectUid(scope.row.uid)"></el-button><el-button type="text" v-if="uid > 0" size="mini"
            icon="el-icon-user-solid" @click="selectUid(0)"></el-button>{{ scope.row.uname }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="150" prop="rtime" :formatter="formatter">
      </el-table-column>
      <el-table-column prop="note" label="">
        <template slot-scope="scope">
          <el-button type="text" @click="noteDomain(scope.row)">{{ scope.row.note || '' }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <div>
            <el-dropdown class="more" placement="bottom">
              <el-button class type="text">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="drop">
                <div class="more-list">
                  <el-dropdown-item @click.native="delDomain(scope.row)">删除&nbsp;&nbsp;&nbsp;&nbsp;</el-dropdown-item>
                  <span class="shu">|</span>
                  <el-dropdown-item @click.native="stopDomain(scope.row)"
                    v-if="scope.row.state == 0">暂停</el-dropdown-item>
                  <el-dropdown-item @click.native="startDomain(scope.row)" v-else>启用</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer-page" style="margin-top: 20px">
      <div>
        <el-button class="footer-b anniu" @click.native="startDomain">启用</el-button>
        <el-button class="footer-b anniu" @click.native="stopDomain">暂停</el-button>
        <el-button class="footer-b anniu" @click.native="delDomain">删除</el-button>
      </div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 30, 50, 100, 500, 1000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="count" background :pager-count="5"></el-pagination>
    </div>
  </div>
</template>

<script>
//import FileSaver from "file-saver";
//import XLSX from "xlsx";
import event from "@/assets/event.js";
export default {
  name: "",
  components: {},
  data() {
    return {
      gid1: "",
      groupvalue: "",
      state: "",
      add: true,
      addr: true,
      update: true,
      del: true,
      record: true,
      count: 0,
      indeterminate: false,
      option: "",
      addDominRules: {
        ip: { required: true, message: "请输入IP", trigger: "blur" },
        domain: { required: true, message: "请输入域名", trigger: "blur" }
      },
      checked: false,
      addForm: {
        domain: "",
        ip: ""
      },
      dialogFormVisible: false,
      userFormVisible: false,
      multipleSelection: [],
      currentPage: 1,
      pagesize: 10,
      domainList: [],
      groupList: [1, 2, 3, 4],
      userList: [],
      searchVal: "",
      gid: "",
      sid: "",
      uid: "",
      dt: 'down',
      t: false
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 顺序
    shunxu(v) {
      this.t = !this.t
      this.dt = v
      this.getDominList()
    },
    selectUid(id) {
      this.uid = id;
      this.currentPage = 1;
      this.getDominList();
    },
    querySearchAsync(queryString, cb) {
      var userList = this.userList;

      var results = userList;
      //console.log(results);
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return user1 => {
        return (
          user1.user.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      //console.log(item);
    },
    // 用户筛选
    selectUser(v) {
      this.uid = v;
      this.currentPage = 1;
      this.getDominList();
    },
    // 状态筛选
    stateList(v) {
      this.sid = v;
      this.currentPage = 1;
      this.getDominList();
    },
    // 用户列表
    getUser() {
      this.$request({
        url: "/user/list"
      }).then(res => {
        if (res.data.rec == 0) {
          this.userList = res.data.data.list;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 搜索域名
    search() {
      this.currentPage = 1;
      this.getDominList();
    },
    // 开启域名解析
    startDomain(v) {
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
            url: "/domain/ptr/start",
            params: { id: v.id || id.toString() }
          }).then(res => {
            if (res.data.rec == 0) {
              this.$message.success("启用成功");
              this.getDominList();
            } else {
              this.$message.warning(res.data.msg);
            }
          });
        })
        .catch(err => { });
    },
    // 获取分组列表
    getGroupList() {
      this.$request({
        url: "/domain/ptr/list"
      }).then(res => {
        if (res.data.rec == 0) {
          this.groupList = res.data.data.list;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 删除操作
    delDomain(v) {
      var id = this.multipleSelection.map(item => {
        return item.id;
      });
      this.$confirm(`是否删除${v.domain || ""}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request({
            url: "/domain/ptr/del",
            params: {
              id: v.id || id.toString()
            }
          }).then(res => {
            if (res.data.rec == 0) {
              this.$message.success("删除成功");
              this.getDominList();
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
    // 暂停操作
    stopDomain(v) {
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
            url: "/domain/ptr/stop",
            params: {
              id: v.id || id.toString()
            }
          }).then(res => {
            if (res.data.rec == 0) {
              this.$message.success("暂停成功");
              this.getDominList();
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
    // 时间过滤器
    formatter(row, column) {
      var date = new Date(row.rtime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      return y + "-" + m + "-" + d;
    },
    // 添加域名
    addDomin() {
      this.$request({
        url: "/domain/ptr/add",
        params: this.addForm
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success("添加成功");
          this.getDominList();
        } else {
          this.$message.error(res.data.msg);
        }
        this.dialogFormVisible = false;
      });
    },
    // 获取域名列表
    getDominList() {
      var search = this.searchVal;
      this.$request({
        url: "/domain/ptr/list",
        params: {
          page: this.currentPage,
          pagesize: this.pagesize,
          search: this.searchVal,
          gid: this.gid,
          sid: this.sid,
          uid: this.uid,
          dt: this.dt
        }
      }).then(res => {
        if (res.data.rec == 0) {
          this.domainList = res.data.data.list;
          this.count = res.data.data.count;
        } else {
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
          background: "#0164F6",
          color: "#fff"
        };
      if (columnIndex == 8) {
        return {
          "text-align": "center",
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
    handleSizeChange(val) {
      this.pagesize = val;
      this.getDominList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDominList();
    }
  },
  created() {
    this.gid1 = localStorage.getItem("gid");
    if (this.gid1 == 1) {
      this.getUser();
    }
    this.getDominList();
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

.confirm {
  background-color: #0164F6;
  color: #fff !important;
}

.dialog {

  .el-textarea,
  .el-input,
  .el-select {
    width: 100% !important;
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

.foot:hover {
  border-color: #0164F6 !important;
  color: #0164F6 !important;
}
</style>
<style lang="less">
.el-message-box {

  .el-button:focus,
  .el-button:hover {
    color: #0164F6;
    border-color: #0164F6;
    background: #fff;
  }
}

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: #0164F6;
  border-color: #0164F6;
}

.group {
  overflow: auto;
  max-height: 200px;
}

.domain-container {
  .el-pagination__sizes .el-input .el-input__inner:hover {
    border-color: #0164F6;
  }

  .footer-page {

    .el-button:focus,
    .el-button:hover,
    .el-button:active {
      border-color: #0164F6;
      background: #fff;
      color: #0164F6;
    }
  }
}

.header-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .header-left {
    display: flex;
    align-items: center;

    .info {
      margin-left: 16px;
      font-size: 12px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #3A4A6E;
      line-height: 17px;
    }
  }

  .header-right {
    display: flex;
    gap: 10px;
  }
}
</style>