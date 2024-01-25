<template>
  <div class>
    <div class="main-title">节点管理</div>
    <div class="header-container">
      <el-button type="primary" @click="addDialogFormVisible = true">添加节点</el-button>
      <el-dialog title="添加节点" :visible.sync="addDialogFormVisible">
        <el-form :model="form" :rules="deviceRules" ref="addDevice">
          <el-form-item label="ip地址：" :label-width="formLabelWidth" prop="ip">
            <el-input v-model="form.ip" autocomplete="off" style="width:280px"></el-input>
          </el-form-item>
          <!--
              <el-form-item label="SSH密码：" :label-width="formLabelWidth" prop="pw">
                <el-input v-model="form.pw" autocomplete="off" style="width:280px"></el-input>
              </el-form-item>-->
          <el-form-item label="节点名称：" :label-width="formLabelWidth" prop="name">
            <el-input type="textarea" v-model="form.name" style="width:280px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDevice()">确 定</el-button>
        </div>
      </el-dialog>
      <span style="margin-right: 20px; margin-left: 16px;">添加前，请先安装节点端软件</span>
      <div v-if="nin == 0" style="background-color: #EEE; padding: 0 10px;">
        <pre><code>{{ text }}</code></pre>
      </div>
      <el-button type="text" @click="copyActiveCode($event, text)" id="copy_text" v-if="nin == 0">点击复制</el-button>
      <!--<i class="el-icon-question" style="color:#999" slot="reference"></i>-->
      </el-popover>
    </div> <el-table size="small" :header-cell-style="fun" stripe ref="multipleTable" :data="NodeList"
      tooltip-effect="dark" style="width: 100%">
      <el-table-column width="30"></el-table-column>
      <el-table-column prop="ip" label="IP地址" width="180"></el-table-column>
      <el-table-column prop="name" show-overflow-tooltip label="节点名称" width="200"></el-table-column>
      <el-table-column prop="qps" show-overflow-tooltip label="解析数" width="200">
        <!-- <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.rec==0">是</el-tag>
          <el-tag type="warning" v-else>否</el-tag>
        </template> -->
      </el-table-column>
      <!--<el-table-column label="域名数" width="120" prop="dom">-->
      <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
      <!--</el-table-column>-->
      <el-table-column prop="note" label="" show-overflow-tooltip width="120"></el-table-column>
      <el-table-column prop="utime" label="运行时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="state" show-overflow-tooltip label="运行状态" width="120">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state == 0">正常</el-tag>
          <el-tag type="warning" v-else>故障</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="Tocount(scope.row.ip, scope.row.id)">资源</el-button>
            <el-button type="text" @click="updateShow(scope.row)">修改</el-button>
            <el-button type="text" @click="delDevice(scope.row)">删除</el-button>
            <el-button type="text" @click="syncDevice(scope.row)">同步</el-button>
            <el-dialog title="修改节点名称" :visible.sync="dialogFormVisible">
              <el-form :model="deviceForm" :rules="deviceRules">
                <el-form-item label="ip地址：" :label-width="formLabelWidth" prop="ip">
                  <el-input v-model="deviceForm.ip" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="节点名称：" :label-width="formLabelWidth">
                  <el-input type="textarea" v-model="deviceForm.name"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateDevice()">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer-page" style="margin-top: 20px;text-align:right">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 30, 50, 100, 500, 1000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="count" background :pager-count="5"></el-pagination>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
export default {
  name: "",
  components: { Clipboard },
  data() {
    return {
      text: 'cd /tmp;wget http://dl.funnulldns.com/files/wddns/install_node.sh;sh install_node.sh',
      form: {
        name: "",
        ip: ""
      },
      deviceRules: {
        ip: [{ required: true, message: "请输入ip", trigger: "blur" }]
      },
      multipleSelection: [],
      currentPage: 1,
      formLabelWidth: "120px",
      deviceForm: {},
      dialogFormVisible: false,
      addDialogFormVisible: false,
      NodeList: [],
      count: 0,
      pagesize: 10,
      nin: 0
    };
  },
  computed: {},
  watch: {},
  methods: {
    copyActiveCode(e, text) {
      const clipboard = new Clipboard(e.target, { text: () => text })
      clipboard.on('success', e => {
        this.$message({ type: 'success', message: '复制成功' })
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message({ type: 'waning', message: '该浏览器不支持自动复制' })
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.onClick(e)
    },
    // 添加节点
    addDevice() {
      this.$request({
        url: "/domain/node/add",
        params: this.form
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success("添加成功");
          this.addDialogFormVisible = false;
          this.getNodeList();
          this.$refs.addDevice.resetFields();
        } else {
          this.$message.error(res.data.msg);
          this.addDialogFormVisible = false;
          this.$refs.addDevice.resetFields();
        }
      });
    },
    // 删除节点
    delDevice(row) {
      this.$confirm("删除节点, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request({
            url: "/domain/node/del",
            params: { id: row.id }
          }).then(res => {
            if (res.data.rec == 0) {
              this.$message.success("删除成功");
              this.getNodeList();
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
    //同步
    syncDevice(row) {
      this.$confirm("如发现节点数据不完整时可操作，一般不需操作！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request({
            url: "/domain/node/sync",
            params: { id: row.id }
          }).then(res => {
            if (res.data.rec == 0) {
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消同步"
          });
        });
    },
    // 弹出修改框
    updateShow(row) {
      this.dialogFormVisible = true;
      this.deviceForm = row;
    },
    // 修改节点
    updateDevice(id) {
      this.$request({
        url: "/domain/node/add",
        params: this.deviceForm
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success("修改成功");
          this.dialogFormVisible = false;
          this.getNodeList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 获取节点列表
    getNodeList() {
      this.$request({
        url: "/domain/node/list",
        params: {
          page: this.currentPage,
          pagesize: this.pagesize
        }
      }).then(res => {
        //console.log(res);
        if (res.data.rec == 0) {
          this.count = res.data.data.count;
          this.NodeList = res.data.data.list;
        } else {
          this.$message.error(res.data.msg);
        }

      });
    },
    fun({ columnIndex }) {
      if (columnIndex !== 7)
        return {
          height: "49px",
          background: "#0164F6",
          color: "#fff"
        };
      if (columnIndex == 7) {
        return {
          height: "49px",
          "text-align": "center",
          background: "#0164F6",
          color: "#fff",
          "padding-right": "10px"
        };
      }
    },
    // 统计
    Tocount(ip, id) {
      this.$router.push("/node/top?ip=" + ip + "&id=" + id);
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getNodeList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getNodeList();
    }
  },
  created() {
    this.nin = localStorage.getItem('nin')
    if (this.nin == 1) {
      this.text = "";
    }
    this.getNodeList();
  },
  mounted() { }
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
  display: flex;
  justify-content: space-between;

  &>div {
    display: flex;
    align-items: center;

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

.header-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>