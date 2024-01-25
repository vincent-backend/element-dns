<template>
    <div class>
        <div class="control">
            <span style="margin:0 10px">邮箱设置</span>
        </div>
        <el-card class="box-card">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="邮件发送设置" name="email">
                    <div class="domin-one">
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:100px;display:inline-block">SMTP地址：</span>
                        <el-input placeholder="请输入smtp地址" v-model="form.smtp" clearable class="shuru"></el-input>
                        <span class="gray">输入邮箱服务器的SMTP服务器地址</span>
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:100px;display:inline-block">邮箱帐号：</span>
                        <el-input placeholder="请输入邮箱帐号" v-model="form.acc" clearable class="shuru"></el-input>
                        <span class="gray">用于发送邮件的邮箱帐号</span>
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:100px;display:inline-block">邮箱密码：</span>
                        <el-input placeholder="请输入邮箱密码" v-model="form.pw" clearable class="shuru"></el-input>
                        <span class="gray">用于发送邮件的帐号密码</span>
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:100px;display:inline-block">发 件 人：</span>
                        <el-input placeholder="请输入发件人名称" v-model="form.name" clearable class="shuru"></el-input>
                        <span class="gray">可自定义设置发送人的名称</span>
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:130px;display:inline-block"></span>
                        <el-button type="primary" @click="emailSave">保存</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="注册验证模板" name="reg">
                    <div class="domin-one">
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:100px;display:inline-block">标题：</span>
                        <el-input placeholder="请输入邮件标题" v-model="form.ckt.title"
                            style="width:420px;margin: 0 20px;"></el-input>
                        <span class="gray">邮件标题</span>
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:100px;display:inline-block">邮件内容</span>
                        <el-input type="textarea" :rows="6" v-model="form.ckt.msg" style="width:420px"
                            placeholder="用户注册验证邮件内容模板"></el-input>
                        <span class="gray"> 邮件内容,在合适的位置增加 {code}变量</span>
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:130px;display:inline-block"></span>
                        <el-button type="primary" @click="regSave">保存</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="找回密码模板" name="fpw">
                    <div class="domin-one">
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:100px;display:inline-block">标题：</span>
                        <el-input placeholder="请输入邮件标题" v-model="form.fpw.title"
                            style="width:420px;margin: 0 20px;"></el-input>
                        <span class="gray">邮件标题</span>
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:100px;display:inline-block">邮件内容</span>
                        <el-input type="textarea" :rows="6" v-model="form.fpw.msg" style="width:420px"
                            placeholder="找回密码邮件内容模板"></el-input>
                        <span class="gray"> 邮件内容,在合适的位置增加 {code}变量</span>
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:130px;display:inline-block"></span>
                        <el-button type="primary" @click="fpwSave">保存</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="故障发生模板" name="mrt">
                    <div class="domin-one">
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:100px;display:inline-block">标题：</span>
                        <el-input placeholder="请输入邮件标题" v-model="form.mrt.title"
                            style="width:420px;margin: 0 20px;"></el-input>
                        <span class="gray">邮件标题</span>
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:100px;display:inline-block">邮件内容</span>
                        <el-input type="textarea" :rows="6" v-model="form.mrt.msg" style="width:420px"
                            placeholder="监控故障发生通知邮件内容模板"></el-input>
                        <span class="gray"> 邮件内容,在合适的位置增加 {code}变量</span>
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:130px;display:inline-block"></span>
                        <el-button type="primary" @click="mrtSave">保存</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="故障恢复模板" name="mrr">
                    <div class="domin-one">
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:100px;display:inline-block">标题：</span>
                        <el-input placeholder="请输入邮件标题" v-model="form.mrr.title"
                            style="width:420px;margin: 0 20px;"></el-input>
                        <span class="gray">邮件标题</span>
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:100px;display:inline-block">邮件内容</span>
                        <el-input type="textarea" :rows="6" v-model="form.mrr.msg" style="width:420px"
                            placeholder="监控故障恢复通知邮件内容模板"></el-input>
                        <span class="gray"> 邮件内容,在合适的位置增加 {code}变量</span>
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:130px;display:inline-block"></span>
                        <el-button type="primary" @click="mrrSave">保存</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "",
    components: {},
    data() {
        return {
            form: {
                smtp: "",
                acc: "",
                pw: "",
                name: "",
                ckt: [],
                fpw: [],
                mrt: [],
                mrr: []
            },
            activeName: "email",
        };
    },
    computed: {},
    watch: {},
    methods: {
        regSave() {
            this.$request({
                url: "/sms/email/tpl",
                params: {
                    ts: "ckt",
                    dn: this.form.ckt.dn,
                    title: this.form.ckt.title,
                    msg: this.form.ckt.msg
                },
            }).then(res => {
                if (res.data.rec == 0) {
                    this.$message.success(res.data.msg);
                    this.getView()
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        fpwSave() {
            this.$request({
                url: "/sms/email/tpl",
                params: {
                    ts: "fpw",
                    dn: this.form.fpw.dn,
                    title: this.form.fpw.title,
                    msg: this.form.fpw.msg
                },
            }).then(res => {
                if (res.data.rec == 0) {
                    this.$message.success(res.data.msg);
                    this.getView()
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        mrtSave() {
            this.$request({
                url: "/sms/email/tpl",
                params: {
                    ts: "mrt",
                    dn: this.form.mrt.dn,
                    title: this.form.mrt.title,
                    msg: this.form.mrt.msg
                },
            }).then(res => {
                if (res.data.rec == 0) {
                    this.$message.success(res.data.msg);
                    this.getView()
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        mrrSave() {
            this.$request({
                url: "/sms/email/tpl",
                params: {
                    ts: "mrr",
                    dn: this.form.mrr.dn,
                    title: this.form.mrr.title,
                    msg: this.form.mrr.msg
                },
            }).then(res => {
                if (res.data.rec == 0) {
                    this.$message.success(res.data.msg);
                    this.getView()
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        emailSave() {
            this.$request({
                url: "/sms/email/conf",
                params: this.form
            }).then(res => {
                if (res.data.rec == 0) {
                    this.$message.success(res.data.msg);
                    this.getView()
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        getView() {
            this.$request({
                url: "/sms/email/view"
            }).then(res => {
                if (res.data.rec == 0) {
                    this.form = res.data.data;
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        fun({ columnIndex }) {
            if (columnIndex !== 7)
                return {
                    height: "33px",
                };
            if (columnIndex == 7) {
                return {
                    height: "33px",
                };
            }
        },
        toggleAll() {
            this.$refs.multipleTable.toggleAllSelection();
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
        handleClick(tab, event) {
            //console.log(tab, event);
        },
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
        }
    },
    beforeRouteEnter(to, from, next) {
        if (to.query.record) {
            next(vm => {
                vm.activeName = "second";
            });
        } else if (to.query.add) {
            next(vm => {
                vm.activeName = "first";
            });
        } else {
            next(vm => {
                vm.activeName = "email";
            });
        }
    },
    created() {
        this.getView();
    },
    mounted() { }
};
</script>
<style lang='less' scoped>
/deep/.el-checkbox__input.is-checked+.el-checkbox__label {
    color: #0164F6;
}

.add-device {
    background: #0164F6;
    color: #fff;
    padding: 10px 15px !important;
}

.el-card {
    font-size: 14px;

    .hui {
        color: #999;

        .el-button {
            color: #0164F6;
        }
    }
}

.opsity {
    opacity: 0;
}

.bottom-sub {
    width: 200px;
    margin: 20px;
    background-color: #0164F6;
}

.bottom-sub:hover {
    background: #3bd3be;
    color: #fff;
}

.gray {
    color: #606266;
}

div {
    font-size: 14px;
}

.bottom {
    align-items: center;
    display: flex;
    padding-bottom: 20px;
    border-bottom: 1px solid #f1f1f1;
}

.domin-one {
    margin-top: 30px;
}

.domin-list {
    margin-top: 20px;

    .el-textarea {
        height: 130px;
        width: 350px;
        vertical-align: top;
        margin: 0 20px;
    }

    .el-select {
        width: 350px;
        vertical-align: top;
        margin: 0 20px;
    }
}

.bottom-sub {
    width: 200px;
    margin: 20px;
}

.control {
    line-height: 60px;
    font-weight: bold;
    font-size: 16px;
}

.shuru {
    width: 200px;
    margin: 0 20px;
}

.part {
    margin: 10px 0;
}

.el-alert--success.is-light {
    color: #0164F6 !important;
}

/deep/.el-tabs__item.is-active {
    color: #0164F6;
}

/deep/.el-tabs__active-bar {
    background: #0164F6;
}

/deep/.el-tabs__item:hover {
    color: #0164F6;
}

.record-list {
    width: 165px !important;
    margin: 0 0 0 20px !important;
}

.text--area {
    width: 550px !important;
}

.same {
    text-align: right;
    width: 85px;
    display: inline-block;
}

.head-color {
    color: #fff !important;
    font-weight: bold;
}

.chakan {
    color: #0164F6;
}

/deep/.el-radio__input.is-checked+.el-radio__label {
    color: #0164F6;
}

/deep/.el-radio__input.is-checked .el-radio__inner {
    background: #0164F6;
    border-color: #0164F6;
}

/deep/th,
/deep/tr {
    height: 50px !important;
}

/deep/.el-table--small td,
.el-table--small th {
    padding: 4.5px 0;
}

.footer-b {
    padding: 3px 15px;
    margin: 0 30px;
}

.anniu:hover {
    color: #0164F6;
}

.el-button--text {
    color: #0164F6;
}</style>