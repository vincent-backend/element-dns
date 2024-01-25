<template>
  <div class="layout-container">
    <el-container class="out">
      <el-aside :width="aside">
        <el-menu ref="showSub" :default-active="path" class="el-menu-vertical-demo" background-color="#FFF"
          text-color="#001734" active-text-color="#005AFF" router unique-opened :collapse="isCollapse">
          <div class="aside-title">
            <a href="/" class="logo"></a>
          </div>

          <template v-for="item in [
            { path: '/panel', iconClass: 'el-icon-menu', title: '首页' },
            {
              path: '/domin', iconClass: 'iconfont icon-yuming', title: '解析管理', children: [
                { path: '/domin/list', title: '域名解析' },
                { path: '/domin/operate', title: '批量操作' },
                { path: '/domin/ptr', title: '反向解析' },
                ...gid == 1 ? [{ path: '/domin/ns', title: 'NS分组' }] : [],
              ]
            },
            ...gid == 1 ? [
              {
                path: '/fw', iconClass: 'iconfont icon-yuming', title: '转发管理', children: [
                  { path: '/domin/cfw', title: '条件转发' },
                  { path: '/set/fw', title: '转发设置' },
                ]
              },
            ] : [],
            ...gid == 1 ? [
              {
                path: '/device', iconClass: 'iconfont icon-jiedianshebei', title: '节点管理'
              },
            ] : [],
            {
              path: '/watch', iconClass: 'iconfont icon-jiankong', title: '监控管理', children: [
                { path: '/watch/setting', title: '监控列表' },
                { path: '/watch/warn', title: '监控记录' },
              ]
            },
            {
              path: '/query', iconClass: 'iconfont icon-jiankong', title: '查询统计', children: [
                { path: '/query/flow', title: '查询流量' },
                ...gid == 1 ? [
                  { path: '/query/top', title: '排行统计' },
                ] : [],
                { path: '/query/newlog', title: '最新记录' },
              ]
            },
            ...gid == 1 ? [
              {
                path: '/product', iconClass: 'iconfont icon-jiankong', title: '套餐管理', children: [
                  { path: '/product/list', title: '套餐列表' },
                  { path: '/product/log', title: '开通记录' },
                ]
              },
            ] : [],
            ...gid == 1 ? [
              {
                path: '/paybuy', iconClass: 'iconfont icon-UserSettings', title: '充值购买', children: [
                  { path: '/product/list', title: '套餐列表' },
                  { path: '/product/log', title: '开通记录' },
                  { path: '/user/pay', title: '在线充值' },
                  { path: '/user/paylog', title: '充扣记录' },
                ]
              },
            ] : [],
            ...gid == 1 ? [
              {
                path: '/manage', iconClass: 'iconfont icon-UserSettings', title: '用户信息', children: [
                  { path: '/user/info', title: '用户信息' },
                  { path: '/manage/verify', title: '实名认证' },
                  { path: '/manage/password', title: '修改密码' },
                  { path: '/set/api', title: 'api设置' },
                ]
              },
            ] : [],
            ...gid == 1 ? [
              {
                path: '/manage', iconClass: 'iconfont icon-UserSettings', title: '用户管理', children: [
                  { path: '/manage/user', title: '用户管理' },
                  { path: '/user/paylog', title: '充扣记录' },
                  { path: '/manage/password', title: '修改密码' },
                ]
              },
            ] : [],
            {
              path: '/log', iconClass: 'iconfont icon-rizhi', title: '日志管理', children: [
                { path: '/log/opt', title: '操作日志' },
                { path: '/log/login', title: '登录日志' },
                ...gid == 1 ? [
                  { path: '/log/clean', title: '日志清除' },
                ] : []
              ]
            },
            ...gid == 1 ? [
              {
                path: '/set', iconClass: 'iconfont icon-xitongshezhi', title: '系统设置', children: [
                  { path: '/set/board', title: '后台设置' },
                  { path: '/set/domin', title: 'DNS设置' },
                  { path: '/set/setup', title: '系统设置' },
                  { path: '/set/pay', title: '支付设置' },
                  { path: '/set/email', title: '邮箱设置' },
                  { path: '/set/sms', title: '短信设置' },
                  { path: '/set/httpdns', title: 'HttpDNS' },
                  ...htis == 1 ? [
                    { path: '/set/doth', title: 'DoTH' },
                  ] : [],
                  { path: '/set/api', title: 'api设置' },
                ]
              },
            ] : [],
          ]">
            <el-menu-item v-if="!item.children" :index="item.path">
              <i :class="item.iconClass + ($route.path == item.path ? ' active' : '')"></i>
              <span slot="title" :data-rout="item.path" :data-t="item.title" @click="nav">{{ item.title }}</span>
            </el-menu-item>

            <el-submenu v-else :index="item.path" class="xiao">
              <template slot="title">
                <i :class="item.iconClass"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item v-for="item in item.children" :index="item.path"
                :class="(item.iconClass || 'dian') + ($route.path == '/domin/list' ? ' active1' : '')"
                :data-rout="item.path" :data-t="item.title" @click.native="nav">
                {{ item.title }}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-left">
            <i class="el-icon-s-unfold coll" v-if="isCollapse" @click="coll"></i>
            <i class="el-icon-s-fold coll" v-else @click="coll1"></i>

            <div class="header-menu-container">
              <span v-for="(val, i) in navContent" :key="i" :class="$route.path == val.rout ? 'active' : ''"
                @click="navMenu(val.rout)">{{ val.t }}</span>
            </div>
          </div>
          <div>
            <span style="margin-right:26px;color:#001734;">{{ user }}</span>
            <el-button type="primary" @click="exit" class="exit">退出</el-button>
          </div>
        </el-header>
        <el-scrollbar class="over">
          <el-main :style="$route.path == '/panel' ?
            'background: linear-gradient(180deg, #EBF3FF 0%, rgba(211,227,255,0) 100%);' :
            'background: #F6F7FB;'">
            <router-view></router-view>
            <div class="footer-"></div>
          </el-main>
        </el-scrollbar>
        <!-- 绑定 -->
        <el-dialog title="手机号绑定 (绑定后可正常使用)" :visible.sync="formVisible" :close-on-click-modal="false" :show-close="false"
          :close-on-press-escape="false">
          <el-form :model="form">
            <el-form-item label="输入手机号" :label-width="formLabelWidth">
              <el-input v-model="phone" autocomplete="off" style="width: 200px"></el-input>
              <el-button style="margin-left: 10px; padding: 9px 20px" @click="isreg" type="primary"
                v-if="cb">绑定查询</el-button>
            </el-form-item>
            <el-form-item label="验证码" :label-width="formLabelWidth" v-if="code">
              <el-input v-model="code1" autocomplete="off" style="width: 200px"></el-input> 已发送到手机
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth" v-if="code">
              <div>
                <input type="checkbox" v-model="terms" autocomplete="off" />
                <span>阅读并同意《<a href="https://www.wddns.net/user/terms?t=1" target="_blank">
                    <font color="#606266">wdDNS服务条款</font>
                  </a>》</span>
              </div>
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth" v-if="code">
              <el-button type="primary" @click="zhuce">注册并绑定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import event from "@/assets/event.js";
export default {
  name: "",
  components: {},
  data() {
    return {
      code1: "",
      terms: true,
      code: false,
      htis: 0,
      cb: true,
      phone: "",
      pw: "",
      form: {
        vn: "1",
        vt: "1m",
        phone: "",
      },
      formLabelWidth: "120px",
      name: '',
      name1: 'BM',
      path: '/panel',
      user: "",
      make: true,
      aside: "220px",
      isCollapse: false,
      formVisible: false,
      navContent: [
        {
          t: "首页",
          rout: "/panel",
        },
        {
          t: "域名解析",
          rout: "/domin/list",
        },
        {
          t: "批量操作",
          rout: "/domin/operate",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    sfz() {
      this.$request({
        url: "/user/sfz/check",
      }).then((res) => {
        if (res.data.rec == 0) {
          this.formVisible = false;
          window.sessionStorage.setItem("info", 0);
        } else {
          window.sessionStorage.setItem("info", 0);
          this.$router.push("/manage/verify?sfz=1");
        }
      });
    },
    zhuce() {
      this.$request({
        url: "/user/phone/verify",
        params: { phone: this.phone, pw: this.pw, code: this.code1, terms: this.terms },
      }).then((res) => {
        if (res.data.rec == 0) {
          this.$message.success(res.data.msg);
          this.sfz();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    isreg() {
      this.$request({
        url: "/user/phone/check",
        params: { phone: this.phone },
      }).then((res) => {
        if (res.data.rec == 1) {
          this.$message.error(res.data.msg);
          if (res.data.msg.search("已发送") != -1) {
            this.code = true;
            this.cb = false;
          }
        } else {
          this.$message.success(res.data.msg);
          this.formVisible = false;
          window.sessionStorage.setItem("info", 0);
        }
      });
    },
    zhan(path) {
      this.path = path;
    },
    // 退出登录
    exit() {
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.clear();
          this.$router.push("/login");
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    // 导航菜单
    navMenu(v) {
      this.$router.push(v);
    },
    // 侧边栏展开
    coll() {
      this.isCollapse = !this.isCollapse;
      (this.aside = "200px"), (this.make = true);
    },
    // 侧边栏折叠
    coll1() {
      this.isCollapse = !this.isCollapse;
      this.aside = "64px";
      this.make = false;
    },
    // 添加历史导航
    nav(e) {
      var obj = {};
      obj.rout = e.target.dataset.rout;
      obj.t = e.target.dataset.t;
      var res = this.navContent.some((item) => {
        if (item.t == e.target.dataset.t) {
          return true;
        }
      });
      if (this.navContent.length > 6) {
        this.navContent.shift();
      }
      if (!res) {
        this.navContent.push(obj);
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.info = sessionStorage.getItem("info");
    if (this.info == 1) {
      this.formVisible = true;
    } else {
      this.formVisible = false;
    }
    next();
  },
  created() {
    this.gid = localStorage.getItem("gid");
    this.user = localStorage.getItem("user");
    this.htis = localStorage.getItem("htis");
  },
  mounted() {
    this.name = localStorage.getItem("win");
    this.name1 = this.name.slice(3);
    var that = this;
    event.$on("show", (path) => {
      that.zhan(path);
      //console.log(that);
    });
    event.$on("pan", (name) => {
      that.name = name;
      that.name1 = this.name.slice(3);
    });
  },
};
</script>
<style lang='less'>
.layout-container {
  width: 100%;
  height: 100%;

  .out {
    .footer- {
      color: #999;
      text-align: center;
      margin-top: 36px;
      font-size: 12px;
      margin-bottom: 24px;
    }

    .over {
      background: #F6F7FB;
      overflow-x: hidden;
      height: calc(100vh - 60px);
    }

    .el-main {
      background: #F6F7FB;
      padding: 0 20px;
      overflow-y: hidden;
    }

    .el-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;

      .header-left {
        line-height: 60px;
        display: flex;
        align-items: center;

        .header-menu-container {
          margin-left: 20px;
          display: flex;
          gap: 40px;

          span {
            cursor: pointer;
            font-size: 14px;
            font-family: PingFang-SC, PingFang-SC;
            font-weight: 500;
            color: #3A4A6E;
            line-height: 20px;
            opacity: .6;

            &.active {
              font-weight: bold;
              color: #FFFFFF;
              background: linear-gradient(270deg, #3097FF 0%, #005AFF 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              opacity: 1;
            }
          }
        }
      }

      .coll {
        font-size: 24px;
        vertical-align: middle;
      }
    }

    .el-menu {
      height: 100%;
      border-right: 0;

      i {
        font-size: 18px;
        margin-right: 5px;
        color: #b0c3d5;
      }

      .active {
        color: #fff;
      }

      .aside-title {
        box-sizing: border-box;
        margin-bottom: 10px;
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0 24px;

        .logo {
          width: 96px;
          min-width: 96px;
          height: 36px;
          background: url(/imgs/logo@2x.png);
          background-size: 100% 100%;
        }
      }

      // .dian {
      //   display: flex;
      //   align-items: center;
      // }
      // .dian:before {
      //   content: "";
      //   width: 5px;
      //   height: 5px;
      //   border-radius: 50%;
      //   background: #b0c3d5;
      //   display: inline-block;
      //   margin-right: 6px;
      // }
      // .active1:before {
      //   background: #fff;
      // }
    }
  }
}
</style>
