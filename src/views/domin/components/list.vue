<template>
  <div class="domain-container">
    <div class="domin-manage">域名解析</div>
    <div class="toolbar-container">
      <div class="toolbar-buttons">
        <!-- 添加域名 -->
        <el-button class="right-space add" @click="dialogFormVisible = true" type="primary">添加域名</el-button>
        <el-dialog title="添加域名" :visible.sync="dialogFormVisible" class="dialog">
          <el-form :model="addForm" :rules="addDominRules">
            <el-form-item label="域名：" label-width="65px" prop="domain">
              <el-input v-model="addForm.domain" autocomplete="off" placeholder="如dnsbm.com"></el-input>
            </el-form-item>
            <el-form-item label="套餐：" label-width="65px">
              <el-select v-model="addForm.pid" placeholder="请选择">
                <el-option label="默认" value="0"></el-option>
                <el-option v-for="(item, i) in productList" :key="i" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分组：" label-width="65px">
              <el-select v-model="addForm.gid" placeholder="请选择">
                <el-option label="添加分组" @click.native="addGroup" value="添加分组"></el-option>
                <el-option v-for="(item, i) in groupList" :key="i" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注：" label-width="65px">
              <el-input type="textarea" :rows="2" placeholder=" 备注" v-model="addForm.note"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="addDomin" class="confirm">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 快速添加 -->
        <el-button class="right-space addf" @click="dialogFormVisiblef = true">快速添加</el-button>
        <el-dialog title="快速添加" :visible.sync="dialogFormVisiblef" class="dialog">
          <el-form :model="addFormf" :rules="addDominRulesf">
            <el-form-item label="域名：" label-width="80px" prop="domain">
              <el-input v-model="addFormf.domain" autocomplete="off" placeholder="如dnsbm.com"></el-input>
            </el-form-item>
            <el-form-item label="IP地址:" label-width="80px">
              <el-input v-model="addFormf.ip" autocomplete="off" placeholder="输入IP地址，默认增加@,www两个主机头"></el-input>
            </el-form-item>
            <el-form-item label="套餐：" label-width="80px">
              <el-select v-model="addForm.pid" placeholder="请选择">
                <el-option label="默认" value="0"></el-option>
                <el-option v-for="(item, i) in productList" :key="i" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisiblef = false">取 消</el-button>
            <el-button @click="addDominf" class="confirm">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 导出域名 -->
        <el-dropdown class="right-space" placement="bottom">
          <el-button plain>
            导出域名
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="drop">
            <el-dropdown-item @click.native="handleDownload">导出域名</el-dropdown-item>
            <el-dropdown-item @click.native="handleDownload1">导出域名和记录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 批量操作 -->
        <el-dropdown class="right-space" placement="bottom">
          <el-button plain>
            批量操作
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push('/domin/operate?add=' + add)">添加域名</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push('/domin/operate?deld=' + del)">删除域名</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push('/domin/operate?record=' + record)">添加解析</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push('/domin/operate?update=' + update)">修改解析</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push('/domin/operate?del=' + del)">删除/启用/暂停</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push('/domin/operate?addr=' + addr)">批量添加解析或导入</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="search-bar">
        <el-input placeholder="域名" class="right-space" v-model="searchVal"></el-input>
        <el-button @click="search" ghost>搜索</el-button>
      </div>
    </div>

    <el-table size="small" id="out-table" :header-cell-style="fun" stripe ref="multipleTable" :data="domainList"
      tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="域名" width="380"></el-table-column>
      <el-table-column prop="state" show-overflow-tooltip width="120">
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
          <el-tag type="success" v-if="scope.row.is_on">正常</el-tag>
          <el-tag type="warning" v-else>暂停</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="inn" label="NS接入" width="100">
        <template #default="scope">
          <i v-if="scope.row.ns_access" class="el-icon-check"></i>
          <i v-else class="el-icon-close"></i>
        </template>
      </el-table-column>
      <el-table-column prop="group_id" show-overflow-tooltip width="120">
        <template #header>
          <el-dropdown placement="bottom">
            <el-button class="head-color" type="text" style="font-size:16px">
              分组
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" class="group" style="width:200px">
              <el-dropdown-item @click.native="addGroup">添加分组</el-dropdown-item>
              <el-dropdown-item @click.native="selectDomain(-1)">全部</el-dropdown-item>
              <el-dropdown-item @click.native="selectDomain(0)">未分组</el-dropdown-item>
              <el-dropdown-item v-for="(v, i) in groupList" :key="i" style="position:relative">
                <span @click="selectDomain(v)" style="display:inline-block;width:150px">{{ v.name }}</span>
                <i class="el-icon-edit" style="position:absolute;right:20px;top:12px" @click="editGroup(v.id)"></i>
                <i class="el-icon-delete" style="position:absolute;right:0;top:12px" @click="delGroup(v.id)"></i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>

      <el-table-column prop="user_id" show-overflow-tooltip width="120">
        <template #header v-if="uid == 1">
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
            icon="el-icon-user-solid" @click="selectUid(0)"></el-button>{{ scope.row.user_id }}
        </template>
      </el-table-column>





      <el-table-column label="创建时间" width="150" prop="created_at" :formatter="formatter">
        <template #header>
          <div @click="shunxu('down')" v-if="t">创建时间
            <i class="el-icon-caret-top" style="position:absolute;left:79px"></i>
            <i class="el-icon-caret-bottom" style="position:absolute;left:79px;top:9px;color:#ddd"></i>
          </div>
          <div @click="shunxu('up')" v-else>创建时间
            <i class="el-icon-caret-top" style="position:absolute;left:79px;color:#ddd"></i>
            <i class="el-icon-caret-bottom" style="position:absolute;left:79px;top:9px"></i>
          </div>
        </template>
      </el-table-column>



      <!--
      <el-table-column prop="etime" label="到期时间" show-overflow-tooltip  width="150">
      </el-table-column>-->
      <el-table-column prop="comment" label="备注" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" @click="noteDomain(scope.row)">{{ scope.row.comment || '' }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="Torecord(scope.row)">解析</el-button>
            <!-- <el-button type="text" @click="Tocount">统计</el-button> -->
            <el-dropdown class="more" placement="bottom">
              <el-button class type="text">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="drop">
                <div class="more-list">
                  <el-dropdown-item @click.native="delDomain(scope.row)">删除</el-dropdown-item>
                  <el-dropdown-item @click.native="stopDomain(scope.row)" v-if="scope.row.is_on">暂停</el-dropdown-item>
                  <el-dropdown-item @click.native="startDomain(scope.row)" v-else>启用</el-dropdown-item>
                  <!--<el-dropdown-item @click.native="goLog">日志&nbsp;&nbsp;&nbsp;&nbsp;</el-dropdown-item>-->
                  <el-dropdown-item @click.native="noteDomain(scope.row)">备注</el-dropdown-item>
                  <el-dropdown-item @click.native="stopDcc(scope.row)" v-if="scope.row.ns_access">关闭加速</el-dropdown-item>
                  <el-dropdown-item @click.native="startDcc(scope.row)" v-else>开启加速</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
    </el-table>







    <div class="footer-page" style="margin-top: 20px">
      <div>
        <el-dropdown placement="bottom">
          <el-button class="foot" type="text"
            style="font-size:16px;border-color:#ddd;padding:8px 20px;background:#fff;color:#666;margin:0 10px 0 25px">
            移到分组
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="group" style="width:200px">
            <el-dropdown-item @click.native="addGroup">添加分组</el-dropdown-item>
            <el-dropdown-item v-for="(v, i) in groupList" :key="i" style="position:relative">
              <span @click="moveGroup(v.id)" style="display:inline-block;width:150px">{{ v.name }}</span>
              <i class="el-icon-edit" style="position:absolute;right:20px;top:12px" @click="editGroup(v.id)"></i>
              <i class="el-icon-delete" style="position:absolute;right:0;top:12px" @click="delGroup(v.id)"></i>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button class="footer-b anniu" @click.native="startDomain">启用</el-button>
        <el-button class="footer-b anniu" @click.native="stopDomain">暂停</el-button>
        <el-button class="footer-b anniu" @click.native="delDomain">删除</el-button>
        <el-button class="footer-b anniu" @click.native="moveDomain">过户</el-button>
      </div>
      <el-dialog title="域名过户" :visible.sync="userFormVisible">
        <span>选择用户：</span>
        <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"
          value-key="user" style="width:200px"></el-autocomplete>
        <div slot="footer" class="dialog-footer">
          <el-button @click="userFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="move">确 定</el-button>
        </div>
      </el-dialog>
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
        domain: { required: true, message: "请输入域名", trigger: "blur" }
      },
      addDominRulesf: {
        domain: { required: true, message: "请输入域名", trigger: "blur" }
      },
      checked: false,
      addForm: {
        domain: "",
        pid: "",
        gid: "",
        note: ""
      },
      addFormf: {
        domain: "",
        ip: ""
      },
      dialogFormVisible: false,
      dialogFormVisiblef: false,
      userFormVisible: false,
      multipleSelection: [],
      currentPage: 1,
      pagesize: 10,
      domainList: [],
      groupList: [1, 2, 3, 4],
      productList: [],
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
    // 移到分组
    moveGroup(g) {
      var id = this.multipleSelection.map(item => {
        return item.id;
      });
      this.$request({
        url: "/domain/modgid",
        params: {
          id: id.toString(),
          gid: g
        }
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success(res.data.msg);
          this.getDominList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    move() {
      var u = this.userList.filter(item => {
        return item.user == this.state;
      });
      if (u == undefined || u.length <= 0) {
        this.$message.error("用户错误");
      }
      var id = this.multipleSelection.map(item => {
        return item.id;
      });
      this.$request({
        url: "/domain/moduser",
        params: {
          id: id.toString(),
          uid: u[0].id
        }
      }).then(res => {
        this.userFormVisible = false;
        if (res.data.rec == 0) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
        this.getDominList();
      });
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
    // 过户
    moveDomain() {
      this.userFormVisible = true;
    },
    // 编辑分组
    editGroup(id) {
      this.$prompt("", "修改分组", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator: val => {
          if (val != null) {
            return true;
          } else {
            return "请输入分组名称";
          }
        },
        inputPlaceholder: "请输入分组名称"
      })
        .then(({ value }) => {
          this.$request({
            url: "/domain/group/add",
            params: { name: value, id }
          }).then(res => {
            if (res.data.rec == 0) {
              this.$message.success("修改成功");
              this.getGroupList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => { });
    },
    // 删除分组
    delGroup(id) {
      this.$confirm(`是否删除分组`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request({
            url: "/domain/group/del",
            params: {
              id
            }
          }).then(res => {
            this.getGroupList();
            if (res.data.rec == 0) {
              this.$message.success("删除成功");
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
        url: "/user/list/short"
      }).then(res => {
        if (res.data.rec == 0) {
          this.userList = res.data.data.list;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 分组筛选
    selectDomain(v) {
      if (v) {
        this.gid = v.id;
      } else {
        this.gid = v;
      }
      this.currentPage = 1;
      this.getDominList();
    },
    handleDownload() {
      var id = this.multipleSelection.map(item => {
        return item.id;
      });
      this.$request({
        url: "/domain/export",
        params: {
          ids: id.toString()
        },
        responseType: "blob"
      }).then(res => {
        if (res.data.type == 'application/json') {
          this.$message({
            message: '企业版可用',
            type: 'warning'
          })
        } else {
          let blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
          }); // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
          let url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象

          // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
          let a = document.createElement("a");
          a.href = url;
          a.download = "域名.xlsx";
          a.click();
          // 5.释放这个临时的对象url
          window.URL.revokeObjectURL(url);
        }
      });
    },
    handleDownload1() {
      var id = this.multipleSelection.map(item => {
        return item.id;
      });
      this.$request({
        url: "/domain/record/export",
        params: {
          ids: id.toString()
        },
        responseType: "blob"
      }).then(res => {
        if (res.data.type == 'application/json') {
          this.$message({
            message: '企业版可用',
            type: 'warning'
          })
        } else {
          let blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
          }); // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
          let url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象

          // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
          let a = document.createElement("a");
          a.href = url;
          a.download = "域名及解析记录.xlsx";
          a.click();
          // 5.释放这个临时的对象url
          window.URL.revokeObjectURL(url);
        }
      });
    },
    // 分组筛选
    // group(v){
    //   this.$request({
    //     url:'/domain/group/domain',
    //     params:{
    //       id:v.id
    //     }
    //   }).then(res=>{
    //     this.domainList=res.data.data.list
    //   })
    // },
    // 搜索域名
    search() {
      this.currentPage = 1;
      this.getDominList();
    },
    // 开启解析加速
    startDcc(v) {
      this.$confirm(`是否启用`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request({
            url: "/domain/dcc",
            params: { id: v.id, sv: true }
          }).then(res => {
            if (res.data.rec == 0) {
              this.$message.success("开启成功");
              this.getDominList();
            } else {
              this.$message.warning(res.data.msg);
            }
          });
        })
        .catch(err => { });
    },
    stopDcc(v) {
      this.$confirm(`是否关闭`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request({
            url: "/domain/dcc",
            params: { id: v.id, sv: false }
          }).then(res => {
            if (res.data.rec == 0) {
              this.$message.success("关闭成功");
              this.getDominList();
            } else {
              this.$message.warning(res.data.msg);
            }
          });
        })
        .catch(err => { });
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
            url: "/domain/start",
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
    // 添加备注
    noteDomain(v) {
      this.$prompt("", `${v.domain}的备注`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "textarea",
        inputValidator: val => {
          if (val != null) {
            return true;
          } else {
            return "请输入备注";
          }
        },
        inputPlaceholder: "请输入备注"
      })
        .then(({ value }) => {
          this.$request({
            url: "/domain/note",
            params: { id: v.id, note: value }
          }).then(res => {
            if (res.data.rec == 0) {
              this.$message.success("添加成功");
              this.getDominList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => { });
    },
    // 获取分组列表
    getGroupList() {
      this.$request({
        url: "/domain/group/list"
      }).then(res => {
        if (res.data.rec == 0) {
          this.groupList = res.data.data.list;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getProductList() {
      this.$request({
        url: "/product/list"
      }).then(res => {
        if (res.data.rec == 0) {
          this.productList = res.data.data.list;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 跳转日志
    goLog() {
      event.$emit("show", "/log/opt");

      this.$router.push("/log/opt");
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
            url: "/domain/del",
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
            url: "/domain/stop",
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
      var date = new Date(row.created_at);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      return y + "-" + m + "-" + d;
    },
    // 添加分组
    addGroup() {
      this.$prompt("", "新建分组", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator: val => {
          if (val != null) {
            return true;
          } else {
            return "请输入分组名称";
          }
        },
        inputPlaceholder: "请输入分组名称"
      })
        .then(({ value }) => {
          this.$request({
            url: "/domain/group/add",
            params: { name: value }
          }).then(res => {
            if (res.data.rec == 0) {
              this.$message.success("添加成功");
              this.getGroupList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => { });
    },
    // 添加域名
    addDomin() {
      this.$request({
        url: "/domain/add",
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
    //快速添加
    addDominf() {
      this.$request({
        url: "/domain/add",
        params: this.addFormf
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success("添加成功");
          this.getDominList();
        } else {
          this.$message.error(res.data.msg);
        }
        this.dialogFormVisiblef = false;
      });
    },
    // 获取域名列表
    async getDominList() {
      // old API
      // this.$request({
      //   url: "/domain/list",
      //   params: {
      //     page: this.currentPage,
      //     pagesize: this.pagesize,
      //     search: this.searchVal,
      //     gid: this.gid,
      //     sid: this.sid,
      //     uid: this.uid,
      //     dt: this.dt
      //   }
      // }).then(res => {
      //   if (res.data.rec == 0) {
      //     this.domainList = res.data.data.list;
      //     this.count = res.data.data.count;
      //   } else {
      //     this.$message.error(res.data.msg);
      //   }
      // });

      // new API
      const {
        data: {
          data, total_counts, total_pages,
        }
      } = await this.$request({
        url: "/domains",
        params: {
          page: this.currentPage,
          pagesize: this.pagesize,
          search: this.searchVal,
          gid: this.gid,
          sid: this.sid,
          uid: this.uid,
          dt: this.dt
        }
      });

      this.domainList = data;
      this.count = total_counts;
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
    // 解析
    Torecord(v) {
      this.$router.push(
        "/domin/list/record?domain=" +
        v.domain +
        "&id=" +
        v.id +
        "&state=" +
        v.state
      );
    },
    // 统计
    Tocount() {
      this.$router.push("/domin/list/count");
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
    this.getGroupList();
    this.getProductList();
  },
  mounted() { }
};
</script>
<style lang='less' scoped>
.toolbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  .toolbar-buttons {
    display: flex;
    gap: 10px;
  }

  .search-bar {
    display: flex;
    gap: 10px;
  }
}

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
  padding: 0 30px;
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
</style>