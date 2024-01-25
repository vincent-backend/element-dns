<template>
    <div class="pass-container">
        <div class="domin-manage">用户信息</div>
        <el-descriptions title="" :column="2">
            <el-descriptions-item label="用户名" labelStyle="margin: 0px 20px;">{{ info.name }}</el-descriptions-item>
            <el-descriptions-item label="注册时间">{{ info.rtime }}</el-descriptions-item>
            <el-descriptions-item label="余额" labelStyle="margin: 0px 20px;">{{ info.cny }}元</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ info.email }} <el-tag type="warning" v-if="info.email == ''"
                    @click="emailVerify" size="small">未设置</el-tag> <el-tag type="warning" v-else-if="info.eis == 0"
                    @click="emailVerify" size="small">未验证</el-tag> <el-tag v-else size="small">已验证</el-tag>
                <el-dialog title="邮箱设置与验证" :visible.sync="emaildialogFormVisible" class="dialog">
                    <el-form :model="emailForm" :rules="emailFormRules">
                        <el-form-item label="邮箱：" label-width="80px" prop="domain" v-if="info.email == ''">
                            <el-input v-model="emailForm.name" autocomplete="off" placeholder="请输入邮箱地址"
                                style="width:200px"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码：" label-width="80px">
                            <el-input v-model="emailForm.code" autocomplete="off" placeholder="查看邮箱"></el-input>
                            <el-button @click="smsEmailSend" class="confirm" style="margin:0 10px">发送验证码</el-button>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="emaildialogFormVisible = false">取 消</el-button>
                        <el-button @click="emailVerifySubmit" class="confirm">确 定</el-button>
                    </div>
                </el-dialog></el-descriptions-item>
            <el-descriptions-item label="实名" labelStyle="margin: 0px 20px;">
                <el-tag type="warning" v-if="info.isx == 0" @click="xm" size="small">未实名</el-tag><el-tag v-else
                    size="small">已实名</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="手机号">{{ info.phone }} <el-tag type="warning" v-if="info.phone == ''"
                    @click="phoneVerify" size="small">未设置</el-tag> <el-tag type="warning" v-else-if="info.pis == 0"
                    @click="phoneVerify" size="small">未验证</el-tag> <el-tag v-else size="small">已验证</el-tag>
                <el-dialog title="手机设置与验证" :visible.sync="phonedialogFormVisible" class="dialog">
                    <el-form :model="phoneForm" :rules="phoneFormRules">
                        <el-form-item label="手机号：" label-width="80px" prop="domain" v-if="info.phone == ''">
                            <el-input v-model="phoneForm.name" autocomplete="off" placeholder="请输入手机号码"
                                style="width:200px"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码：" label-width="80px">
                            <el-input v-model="phoneForm.code" autocomplete="off" placeholder="查看手机"></el-input>
                            <el-button @click="smsPhoneSend" class="confirm" style="margin:0 10px">发送验证码</el-button>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="phonedialogFormVisible = false">取 消</el-button>
                        <el-button @click="phoneVerifySubmit" class="confirm">确 定</el-button>
                    </div>
                </el-dialog>
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>
export default {
    name: "",
    components: {},
    data() {
        return {
            info: [],
            emailForm: {
                name: "",
                code: ""
            },
            phoneForm: {
                name: "",
                code: ""
            },
            emailFormRules: {
                code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
            },
            phoneFormRules: {
                code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
            },
            emaildialogFormVisible: false,
            phonedialogFormVisible: false
        };
    },
    computed: {},
    watch: {},
    methods: {
        emailVerify() {
            this.emaildialogFormVisible = true;
        },
        emailVerifySubmit() {
            this.$request({
                url: "/user/email/verify",
                params: { code: this.emailForm.code }
            }).then(res => {
                if (res.data.rec == 0) {
                    this.emaildialogFormVisible = false;
                    this.$message.success(res.data.msg);
                    this.getInfo();
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        smsEmailSend() {
            if (this.emailForm.name == "" && this.info.email == "") {
                this.$message.error("请输入邮箱地址");
                return;
            }
            this.$request({
                url: "/user/email/send",
                params: { email: this.emailForm.name }
            }).then(res => {
                if (res.data.rec == 0) {
                    this.$message.success(res.data.msg);
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        phoneVerify() {
            this.phonedialogFormVisible = true;
        },
        phoneVerifySubmit() {
            this.$request({
                url: "/user/phone/verify/2",
                params: { code: this.phoneForm.code }
            }).then(res => {
                if (res.data.rec == 0) {
                    this.phonedialogFormVisible = false;
                    this.$message.success(res.data.msg);
                    this.getInfo();
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        smsPhoneSend() {
            if (this.phoneForm.name == "" && this.info.phone == "") {
                this.$message.error("请输入手机号");
                return;
            }
            this.$request({
                url: "/user/phone/send",
                params: { phone: this.phoneForm.name }
            }).then(res => {
                if (res.data.rec == 0) {
                    this.$message.success(res.data.msg);
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        xm() {
            this.$router.push("/user/verify");
            return;
        },
        getInfo() {
            this.$request({
                url: "/user/info/view"
            }).then(res => {
                if (res.data.rec == 0) {
                    this.info = res.data.data;
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
    },
    created() {
        this.getInfo();
    },
    mounted() { }
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

.dialog {

    .el-input,
    .hover-color:hover {
        color: #0164F6 !important;
    }

    .el-select-dropdown__item.selected {
        color: #0164F6;
    }
}

.footer-page {
    display: flex;
    justify-content: space-between;
}

.footer-b {
    padding: 9px 15px;
}

.foot:hover {
    border-color: #0164F6 !important;
    color: #0164F6 !important;
}</style>