<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="rules" :show-message="false">
      <div class="login-title">用户登录</div>
      <el-form-item prop="name">
        <el-input v-model="loginForm.name" placeholder="手机号或邮箱" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="密码" clearable show-password></el-input>
      </el-form-item>
      <!-- <el-form-item prop="captcha">
        <el-input v-model="loginForm.captcha" placeholder="验证码" clearable style="width:200px"></el-input>
        <img :src="src" alt style="width:100px;height:45px;vertical-align:middle" />
        <el-button type="text" style="width:100px" @click="update">换一张</el-button>
      </el-form-item> -->
      <el-form-item>
        <el-button @click="onLogin" class="submit" type="primary">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="$router.push('/register')"
          style="background-color:#f1f1f1;color:#000;border-color:#f1f1f1;width:48%">注册</el-button>
        <el-button @click="$router.push('/findpw')"
          style="background-color:#f1f1f1;color:#000;border-color:#f1f1f1;width:48%">忘记密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      src: "",
      loginForm: {
        name: "",
        password: "",
        // captcha: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        // captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    update() {
      this.$request({
        url: "/user/captcha"
      }).then(res => {
        if (res.data.rec == 0) {
          this.src = res.data.data;
          this.captcha_id = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    onLogin() {
      var id = this.src.split("/")[this.src.split("/").length - 1];
      this.loginForm.captcha_id = id.split(".")[0];
      this.$refs.loginForm.validate(async (valid, p) => {
        if (valid) {
          // old
          // var formData = new FormData;
          // formData.append('account', this.loginForm.account);
          // formData.append('password', this.loginForm.password);
          // formData.append('captcha', this.loginForm.captcha);
          // formData.append('captcha_id', this.loginForm.captcha_id);
          // this.$request({
          //   url: "/user/login",
          //   data: formData,
          //   method: 'post',
          //   headers: { 'Content-Type': "multipart/form-data" }
          // }).then(res => {
          //   if (res.data.rec == 2) {
          //     this.$router.push("/regck");
          //   } else if (res.data.rec == 0) {
          //     this.$message({
          //       message: "登陆成功",
          //       type: "success"
          //     });
          //     window.sessionStorage.setItem("info", res.data.data.reg);
          //     window.sessionStorage.setItem("token", res.data.data.token);
          //     window.localStorage.setItem("gid", res.data.data.gid);
          //     window.sessionStorage.setItem("utime", res.data.data.utime);
          //     window.localStorage.setItem("user", this.loginForm.account);
          //     window.sessionStorage.setItem("login_time", new Date().getTime());
          //     this.$router.push("/panel");
          //   } else {
          //     this.$message({
          //       message: res.data.msg,
          //       type: "error"
          //     });
          //   }
          // });

          // new
          const res = await this.$request({
            url: "/login",
            data: this.loginForm,
            method: 'post',
          });

          res.data.token



          this.$message({
            message: "登陆成功",
            type: "success"
          });
          window.sessionStorage.setItem("token", res.data.token);
          window.localStorage.setItem("user", this.loginForm.name);
          window.sessionStorage.setItem("login_time", new Date().getTime());
          this.$router.push("/panel");
        } else {
          for (var key in p) {
            this.$message.error(p[key][0].message);
            return key;
          }
        }
      });
    }
  },
  created() {
    this.$request({
      url: "/user/captcha"
    }).then(res => {
      if (res.data.rec == 0) {
        this.src = res.data.data;
        this.captcha_id = res.data.data;
      } else {
        this.$message.error(res.data.msg);
      }
    });
  },
  mounted() {
    this.$request({
      url: "/user/info"
    }).then(res => {
      if (res.data.rec == 3) {
        //console.log("notfound")
        this.$router.push("/notfound");
        return;
        this.$message.error("出错了");
      } else if (res.data.rec == 0) {
        // if (res.data.data.isl == 1) {
        //   //this.$router.push("/notfound");
        //   this.$message.error("出错了");
        // }
        window.localStorage.setItem('win', res.data.data.title);
        window.localStorage.setItem('ttl', res.data.data.ttl);
        window.localStorage.setItem('nin', res.data.data.nin);
        window.localStorage.setItem("htis", res.data.data.htis);
      } else {
        this.$message.error(res.data.msg);
      }
    });
  }
};
</script>
<style lang='less'>
.login-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .el-input__inner {
    line-height: 40px;
    height: 40px;
  }

  .el-form {
    width: 400px;
    height: 300px;
    margin: auto;
    margin-top: 200px;

    .login-title {
      font-size: 24px;
      margin-bottom: 20px;
    }

    .submit {
      width: 100%;
      background: #0164F6;
      color: #fff;
    }

    .code {
      width: 60%;
    }

    .iden {
      display: inline-block;
    }
  }
}
</style>