<template>
  <div class="pass-container">
    <div class="domin-manage">修改密码</div>
    <el-card>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="opw">
          <el-input v-model="ruleForm.opw" placeholder="原密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="npw">
          <el-input
            type="password"
            v-model="ruleForm.npw"
            autocomplete="off"
            placeholder="新密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            placeholder="确认密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.npw) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        npw: "",
        checkPass: "",
        opw: ""
      },
      rules: {
        npw: [
          { validator: validatePass, trigger: "blur" },
          { required: true, message: "请输入新密码" }
        ],
        checkPass: [
          { validator: validatePass2, trigger: "change" },
          { required: true, message: "请再次输入新密码", trigger: "blur" }
        ],
        opw: [{ required: true, message: "请输入原密码", trigger: "blur" }]
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$request({
            url: "/user/pw",
            params: this.ruleForm
          }).then(res => {
            if (res.data.rec == 0) {
              this.$message.success("修改成功");
              this.$refs.ruleForm.resetFields();
            } else {
              this.$message.error(res.data.msg);
              this.$refs.ruleForm.resetFields();
            }
          });
        }
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='less'>
.pass-container {
  .domin-manage {
    line-height: 60px;
    font-weight: bold;
  }
  .el-input {
    width: 50%;
    .el-input__inner {
      line-height: 45px;
      height: 45px;
    }
    .el-form-item__label {
      line-height: 45px;
    }
  }
}
</style>