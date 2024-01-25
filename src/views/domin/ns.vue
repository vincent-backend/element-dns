<template>
  <div class="user-container">
    <div class="main-title">NS分组管理</div>
    <div class="header-container">
      <div>
        <el-button type="primary" @click="dialogFormVisible = true">添加NS分组</el-button>
        <el-dialog title="添加NS分组" :visible.sync="dialogFormVisible">
          <el-form :model="userForm" ref="userFormList" :rules="rules">
            <el-form-item label="分组名称：" :label-width="formLabelWidth" prop="name">
              <el-input v-model="userForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="NS地址：" :label-width="formLabelWidth" prop="ns">
              <el-input v-model="userForm.ns" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>

    <el-table size="small" :header-cell-style="fun" stripe ref="multipleTable" :data="userList" tooltip-effect="dark"
      style="width: 100%">
      <el-table-column width="30"></el-table-column>
      <el-table-column prop="name" label="NS分组名称" width="200"></el-table-column>
      <el-table-column prop="ns" label="NS地址" width="680">
      </el-table-column>
      <el-table-column prop="state" show-overflow-tooltip label="状态" width="130">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.state == 0">正常</el-tag>
          <el-tag type="warning" v-if="scope.row.state == 1">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="rtime" label=""></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <i class="el-icon-lock" v-if="scope.row.id == 0"></i>
          <div v-else>
            <el-button type="text" @click="update(scope.row.id)" style="margin-right:10px">修改</el-button>
            <el-dialog title="修改NS分组" :visible.sync="updateFormVisible">
              <el-form :model="updateList" ref="updateUserFormList" :rules="updateFormRules">
                <el-form-item label="名称：" :label-width="formLabelWidth" prop="name">{{ updateList.name
                }}</el-form-item>
                <el-form-item label="NS地址：" :label-width="formLabelWidth" prop="ns">
                  <el-input v-model="updateList.ns" autocomplete="off" class="ns"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="updateFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
              </div>
            </el-dialog>
            <el-button type="text" @click="del(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer-page" style="margin-top: 20px;text-align:right">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 30, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="count" background :pager-count="5"></el-pagination>
    </div>

    <el-alert class="alert-container" title="备注说明"
      description="NS分组是指对NS地址和解析分组，对应用类型分类或机器资源进行分组等，需在创建用户帐号时指定所使用分组"></el-alert>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      // 添加用户验证规则
      rules: {
        name: [{ required: true, message: "请输入分组名称", trigger: "blur" }],
        ns: [{ required: true, message: "请输入NS地址", trigger: "blur" }]
      },
      updateFormRules: {
      },
      userList: [],
      currentPage: 1,
      formLabelWidth: "120px",
      userForm: {
        name: "",
        ns: "",
        nc: "0"
      },
      pw: "",
      dialogFormVisible: false,
      updateFormVisible: false,
      count: 0,
      pagesize: 10,
      updateList: {},
      dialogInfo: false
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 添加用户
    addUser() {
      this.dialogFormVisible = false;
      this.$request({
        url: "/domain/ns/add",
        params: this.userForm
      }).then(res => {
        //console.log(res);
        this.getUserList();
        if (res.data.rec == 0) {
          this.$refs.userFormList.resetFields();
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 获取用户列表
    getUserList() {
      this.$request({
        url: "/domain/ns/list",
        params: { page: this.currentPage, pagesize: this.pagesize }
      }).then(res => {
        if (res.data.rec == 0) {
          this.userList = res.data.data.list;
          this.count = res.data.data.count;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 表头
    fun({ columnIndex }) {
      if (columnIndex == 5) {
        return {
          "text-align": "center",
          background: "#0164F6",
          color: "#fff",
          height: "50px",
          "padding-right": "40px"
        };
      } else if (columnIndex == 0) {
        return {
          height: "50px",
          "padding-left": "40px",
          background: "#0164F6",
          color: "#fff"
        };
      } else {
        return {
          background: "#0164F6",
          color: "#fff",
          height: "50px"
        };
      }
    },
    // 删除用户
    del(id) {
      this.$confirm("是否删除该分组?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request({
            url: "/domain/ns/del",
            params: { id }
          }).then(res => {
            if (res.data.rec == 0) {
              this.$message.success(res.data.msg);
              this.getUserList();
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
    // 弹框获取用户信息
    update(id) {
      this.updateFormVisible = true;
      this.$request({
        url: "/domain/ns/view",
        params: {
          id
        }
      }).then(res => {
        if (res.data.rec == 0) {
          this.updateList = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 提交用户修改
    submitForm() {
      this.$request({
        url: "/domain/ns/add",
        params: this.updateList
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success(res.data.msg);
          this.updateFormVisible = false;
          this.getUserList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.pagesize = val;
      this.getUserList();
    },
    // 当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserList();
    }
  },
  created() {
    this.getUserList();
  },
  mounted() { }
};
</script>
<style lang='less'>
.user-container {
  .el-dialog .el-button:active {
    border-color: #0164F6;
  }

  .addUser:hover,
  .addUser:focus {
    color: #fff !important;
  }

  .pw {
    width: 50%;
  }

  .el-button--text {
    color: #0164F6;
  }

  .el-radio__input.is-checked+.el-radio__label {
    color: #0164F6;
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

  .el-radio__input.is-checked .el-radio__inner {
    border: 1px solid #0164F6;
    background: #0164F6;
  }

  .el-table th {
    padding: 20px 0;
  }

  .el-button:focus,
  .el-button:hover {
    color: #0164F6;
  }
}

.alert-container {
  margin-top: 20px;
  background: linear-gradient(270deg, rgba(48, 151, 255, .06) 0%, rgba(0, 90, 255, .06) 100%);
  margin-bottom: 20px;

  &,
  .el-alert__description {
    color: #1575FF !important;
  }
}
</style>