<template>
  <div class="login-container">
    <el-form ref="refForm" :model="regForm" :rules="rules" :show-message="false">
      <div class="login-title">用户注册</div>
      <el-form-item prop="name">
        <el-input v-model="regForm.name" placeholder="账户名称" clearable></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="regForm.email" placeholder="邮箱" clearable></el-input>
      </el-form-item>
      <el-form-item prop="phone_number">
        <el-input v-model="regForm.phone_number" placeholder="手机号" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="regForm.password" placeholder="密码" clearable show-password></el-input>
      </el-form-item>
      <el-form-item prop="password2">
        <el-input type="password" v-model="regForm.password2" placeholder="确认密码" clearable show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="register" type="primary" class="submit">注册</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="$router.push('/login')"
          style="background-color:#f1f1f1;color:#000;border-color:#f1f1f1;width:100%">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      regForm: {
        "name": "",
        "email": "",
        "password": "",
        "password2": "",
        "phone_number": "",
        "role": "user"
      },
      rules: {
        name: [{ required: true, message: "请输入账户名称", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        phone_number: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password2: [{
          validator: (rule, value, callback) => {
            if (value === '') {
              this.$message.error('请再次输入密码');
              callback('请再次输入密码');
            } else if (value !== this.regForm.password) {
              this.$message.error('两次密码不一致');
              callback('两次密码不一致');
            } else {
              callback();
            }
          }, trigger: 'blur'
        }],
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    register() {
      this.$refs['refForm'].validate(async (valid) => {
        if (valid) {
          await this.$request({
            url: "/register",
            method: 'post',
            data: this.regForm,
          });

          this.$message.success("注册成功");
          this.$router.push("/login");
        }
      });
    }
  },
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