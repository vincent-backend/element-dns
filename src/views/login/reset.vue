<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="rules" :show-message="false">
            <div class="login-title">重置密码</div>
            <el-form-item prop="pw">
                <el-input type="password" v-model="loginForm.pw" placeholder="密码" clearable show-password></el-input>
            </el-form-item>
            <el-form-item prop="cpw">
                <el-input type="password" v-model="loginForm.cpw" placeholder="确认密码" clearable show-password></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input type="text" v-model="loginForm.code" placeholder="请输入手机或邮箱收到的校验码" clearable></el-input>
            </el-form-item>
            <el-form-item prop="captcha">
                <el-input v-model="loginForm.captcha" placeholder="验证码" clearable style="width:200px"></el-input>
                <img :src="src" alt style="width:100px;height:45px;vertical-align:middle" />
                <el-button type="text" style="width:100px" @click="update">换一张</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="reset" class="submit">确定</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="$router.push('/login')"
                    style="background-color:#f1f1f1;color:#000;border-color:#f1f1f1;width:100%">登录</el-button>
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
                pw: "",
                cpw: '',
                code: "",
                captcha: ""
            },
            rules: {
                code: [{ required: true, message: "请输入校验码", trigger: "blur" }],
                pw: [{ required: true, message: "请输入密码", trigger: "blur" }],
                cpw: [{
                    validator: (rule, value, callback) => {
                        if (value === '') {
                            this.$message.error('请再次输入密码')
                        } else if (value !== this.loginForm.pw) {
                            this.$message.error('两次密码不一致')
                        }
                    }, trigger: 'blur'
                }],
                captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
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
        reset() {
            var id = this.src.split("/")[this.src.split("/").length - 1];
            this.loginForm.captcha_id = id.split(".")[0];
            this.$request({
                url: "/user/reset/pw",
                params: this.loginForm
            }).then(res => {
                if (res.data.rec == 0) {
                    this.$message.success(res.data.msg);
                    this.$router.push("/login");
                } else {
                    this.$message.error(res.data.msg);
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
    mounted() { }
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