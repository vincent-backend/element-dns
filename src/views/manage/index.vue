<template>
  <div class="user-container">
    <div class="main-title">用户管理</div>
    <el-card>
      <div class="row1">
        <div>
          <el-button class="space add-device addUser" @click="dialogFormVisible = true">添加用户</el-button>
          <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
            <el-form :model="userForm" ref="userFormList" :rules="rules">
              <el-form-item label="用户名：" :label-width="formLabelWidth" prop="name">
                <el-input v-model="userForm.name" placeholder="输入邮箱或手机号" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码：" :label-width="formLabelWidth" prop="pw">
                <el-input v-model="userForm.pw" placeholder="输入密码" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户组" :label-width="formLabelWidth" prop="gid">
                <el-radio v-model="userForm.gid" label="0">普通用户</el-radio>
                <el-radio v-model="userForm.gid" label="1">管理员</el-radio>
              </el-form-item>
              <el-form-item label="NS组：" :label-width="formLabelWidth" prop="nid">
                <el-select v-model="userForm.nid" placeholder="请选择">
                  <el-option v-for="(item, i) in nsList" :key="i" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUser">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div>
          <el-input v-model="searchVal" class="space" placeholder="用户名或手机号"></el-input>
          <el-button plain style="padding:10px 15px;color:#0164F6;border:1px solid #0164F6" @click="search">搜索</el-button>
        </div>
      </div>
    </el-card>
    <el-table size="small" :header-cell-style="fun" stripe ref="multipleTable" :data="userList" tooltip-effect="dark"
      style="width: 100%">
      <el-table-column width="3"></el-table-column>
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="user" label="用户名" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="gid" show-overflow-tooltip label="用户组" width="100">
        <template #default="scope">
          <span type="success">{{ scope.row.gid == 1 ? '管理员' : '普通用户' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cny" label="余额" width="160">
        <template #default="scope">
          {{ scope.row.cny }}元
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="160" show-overflow-tooltip>
        <template #default="scope">
          <span type="success">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="160" show-overflow-tooltip>
        <template #default="scope">
          <span type="success">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="isx" label="实名" width="100">
        <template #default="scope">
          <el-tag type="warning" v-if="scope.row.isx == 0">未提交</el-tag>
          <el-tag type="success" v-if="scope.row.isx == 1">已提交</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="nid" label="NS组" width="100"></el-table-column>
      <el-table-column prop="state" show-overflow-tooltip label="状态" width="100">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.state == 0">正常</el-tag>
          <el-tag type="warning" v-if="scope.row.state == 1">锁定</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="rtime" label="时间" width="130"></el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <div>
            <el-button type="text" @click="info(scope.row.id)" v-if="scope.row.gid != 1">查看</el-button>&nbsp;
            <el-dropdown class="more" placement="bottom">
              <el-button class type="text">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="drop">
                <div class="more-list">
                  <el-dropdown-item @click.native="addCny(scope.row)">充值</el-dropdown-item>
                  <el-dialog title="充值扣款" :visible.sync="paydialogFormVisible" :append-to-body="true">
                    <el-form :model="payForm" :rules="payrules">
                      <el-form-item label="类型：" :label-width="formLabelWidth" prop="pt">
                        <el-radio-group v-model="payForm.pt" clearable class="shuru">
                          <el-radio :label="0">充值</el-radio>
                          <el-radio :label="1">扣款</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="充值金额：" :label-width="formLabelWidth" prop="cny">
                        <el-input v-model="payForm.cny" placeholder="输入充值金额" autocomplete="off"
                          style="width:200px"></el-input>
                      </el-form-item>
                      <el-form-item label="备注：" :label-width="formLabelWidth" prop="note">
                        <el-input v-model="payForm.note" placeholder="备注" autocomplete="off"
                          style="width:200px"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="paydialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="userPay">确 定</el-button>
                    </div>
                  </el-dialog>&nbsp;
                  <el-dropdown-item @click.native="lesCny(scope.row)">扣款</el-dropdown-item>
                  <el-dropdown-item @click.native="update(scope.row.id)" style="margin-right:10px">修改</el-dropdown-item>
                  <el-dialog title="修改用户" :visible.sync="updaeteFormVisible" :append-to-body="true">
                    <el-form :model="updateList" ref="updateUserFormList" :rules="updateFormRules">
                      <el-form-item label="用户名：" :label-width="formLabelWidth"
                        prop="pw">{{ updateList.user }}</el-form-item>
                      <el-form-item label="密码：" :label-width="formLabelWidth" prop="pw">
                        <el-input v-model="pw" autocomplete="off" class="pw"></el-input>
                      </el-form-item>
                      <el-form-item label="用户组：" :label-width="formLabelWidth" prop="gid">
                        <el-radio v-model="updateList.gid" :label="10">普通用户</el-radio>
                        <el-radio v-model="updateList.gid" :label="1">管理员</el-radio>
                      </el-form-item>
                      <el-form-item label="状态：" :label-width="formLabelWidth" prop="state">
                        <el-radio v-model="updateList.state" :label="0">正常</el-radio>
                        <el-radio v-model="updateList.state" :label="1">锁定</el-radio>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="updaeteFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="submitForm">确 定</el-button>
                    </div>
                  </el-dialog>
                  <el-dropdown-item @click.native="del(scope.row.id)">删除</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="用户信息" :visible.sync="dialogInfo">
      <el-form :model="ruleForm" status-icon :rules="rules1" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="xm">
          <el-input v-model="ruleForm.xm" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="sfz">
          <el-input v-model="ruleForm.sfz" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="身份证上传" prop="sfz1">
          <div v-if="ruleForm.pic1">
            <img :src="ruleForm.pic1" alt="" style="width:150px;height:150px;margin-right:10px">
            <img :src="ruleForm.pic2" alt="" style="width:150px;height:150px">
          </div>
          <div v-else>
            暂无图片
          </div>
        </el-form-item>
        <div v-if="ruleForm.isx == 1">
          <el-button style="width:100px;margin:6px 180px" type="primary" @click="reset(ruleForm.id)">重 置</el-button>
        </div>
      </el-form>
    </el-dialog>
    <div class="footer-page" style="margin-top: 20px;text-align:right">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 30, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="count"
        background :pager-count="5"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      ruleForm: {
        id: "",
        xm: "",
        sfz: "",
        isx: false,
        pic1: '',
        pic2: ''
      },
      rules1: {
        xm: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sfz: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        sfz1: [{ required: true, message: "请上传身份证", trigger: "blur" }]
      },
      // 添加用户验证规则
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pw: [{ required: true, message: "请选择密码", trigger: "blur" }],
        gid: [{ required: true, message: "请选择角色", trigger: "blur" }]
      },
      payrules: {
        cny: [{ required: true, message: "请输入金额", trigger: "blur" }]
      },
      updateFormRules: {
        state: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        gid: [{ required: true, message: "请选择角色", trigger: "blur" }]
      },
      userList: [],
      payForm: [],
      nsList: [],
      currentPage: 1,
      formLabelWidth: "120px",
      userForm: {
        name: "",
        pw: "",
        gid: "0"
      },
      pw: "",
      dialogFormVisible: false,
      paydialogFormVisible: false,
      updaeteFormVisible: false,
      count: 0,
      pagesize: 10,
      updateList: {},
      dialogInfo: false,
      searchVal: ""
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 获取分组列表
    getNsList() {
      this.$request({
        url: "/domain/ns/list"
      }).then(res => {
        if (res.data.rec == 0) {
          this.nsList = res.data.data.list;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    reset(id) {
      this.$request({
        url: "/user/verify/reset",
        params: { id }
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 查看用户信息
    info(id) {
      this.dialogInfo = true;
      this.$request({
        url: "/user/verify/view",
        params: { id }
      }).then(res => {
        if (res.data.rec == 0) {
          this.ruleForm = res.data.data;
        } else {
          this.ruleForm = {}
        }
      });
    },
    addCny(v) {
      this.paydialogFormVisible = true;
      this.payForm = v;
      this.payForm.cny = 0;
      this.payForm.pt = 0;
    },
    lesCny(v) {
      this.paydialogFormVisible = true;
      this.payForm = v;
      this.payForm.cny = 0
      this.payForm.pt = 1;
    },
    userPay() {
      this.$request({
        url: "/user/cny",
        params: this.payForm
      }).then(res => {
        //console.log(res);
        this.getUserList();
        if (res.data.rec == 0) {
          //this.$refs.userFormList.resetFields();
          this.paydialogFormVisible = false;
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 添加用户
    addUser() {
      this.dialogFormVisible = false;
      this.$request({
        url: "/user/add",
        params: this.userForm
      }).then(res => {
        //console.log(res);
        this.getUserList();
        if (res.data.rec == 0) {
          this.$refs.userFormList.resetFields();
          this.$message.success("添加成功");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    search() {
      this.getUserList();
    },
    // 获取用户列表
    getUserList() {
      var search = this.searchVal;
      this.$request({
        url: "/user/list",
        params: { page: this.currentPage, pagesize: this.pagesize, search: this.searchVal }
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
      return {
        background: "#0164F6",
        color: "#fff",
        height: "50px",
        "padding-right": "40px"
      };
    },
    // 表体
    // fun1({ columnIndex }) {
    //   if (columnIndex == 0) {
    //     return {
    //       "padding-left": "40px"
    //     };
    //   }
    //   if (columnIndex == 3) {
    //     return {
    //       "padding-right": "40px"
    //     };
    //   }
    // },
    // 删除用户
    del(id) {
      this.$confirm("是否删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request({
            url: "/user/del",
            params: { id }
          }).then(res => {
            if (res.data.rec == 0) {
              this.$message.success("删除成功");
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
      this.updaeteFormVisible = true;
      this.$request({
        url: "/user/view",
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
      this.updateList.pw = this.pw;
      this.$request({
        url: "/user/edit",
        params: this.updateList
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success("修改用信息成功");
          this.updaeteFormVisible = false;
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
    this.getNsList();
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
</style>