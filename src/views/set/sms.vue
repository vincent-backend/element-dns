<template>
    <div class>
        <div class="control">短信设置</div>
        <el-card style="padding-left:50px">
            <el-alert
                    title="备注"
                    type="success"
                    description="目前只支持腾讯云短信接口，请自行登录腾讯云开通短信功能和相应API接口权限。"
            ></el-alert>
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">SecretId：</span>
                <el-input placeholder="请输入申请的SecretId" v-model="form.secretid" clearable class="shuru"></el-input>
                <span class="gray">腾讯云申请的SecretId，留空不启用</span>
            </div>
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">SecretKey：</span>
                <el-input placeholder="请输入申请的SecretKey" v-model="form.secretkey" clearable class="shuru"></el-input>
                <span class="gray">腾讯云申请SecretKey，留空不启用</span>
            </div>
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">AppID：</span>
                <el-input placeholder="请输入申请的AppID" v-model="form.appid" clearable class="shuru"></el-input>
                <span class="gray">腾讯云申请的短信SDK AppID，留空不启用</span>
            </div>
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">短信签名：</span>
                <el-input placeholder="请输入后台设置的签名" v-model="form.sn" clearable class="shuru"></el-input>
                <span class="gray">腾讯云后台设置的短信签名模板</span>
            </div>
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">验证模板：</span>
                <el-input placeholder="请输入注册验证模板ID" v-model="form.ckt" clearable class="shuru"></el-input>
                <span class="gray">用于注册，手机号验证的模板ID，在腾讯云短信后台设置，留空不启用</span>
            </div>
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">找密模板：</span>
                <el-input placeholder="请输入找回密码模板ID" v-model="form.fpw" clearable class="shuru"></el-input>
                <span class="gray">用于找回密码发送短信的模板ID，在腾讯云短信后台设置，留空不启用</span>
            </div>
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">故障通知：</span>
                <el-input placeholder="请输入监控故障发生通知模板ID" v-model="form.mrt" clearable class="shuru"></el-input>
                <span class="gray">用于监控故障发生通知发送短信的模板ID，在腾讯云短信后台设置，留空不启用</span>
            </div>
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">恢复通知：</span>
                <el-input placeholder="请输入监控故障恢复通知模板ID" v-model="form.mrr" clearable class="shuru"></el-input>
                <span class="gray">用于监控故障恢复通知发送短信的模板ID，在腾讯云短信后台设置，留空不启用</span>
            </div>
            <el-button style="width:100px;margin:10px 120px" type="primary" @click="submit">保存</el-button>
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
                    secretid:"",
                    secretkey:"",
                    appid:"",
                    sn:"",
                    ckt:"",
                    fpw:"",
                    mrt:"",
                    mrr:""
                }
            };
        },
        computed: {},
        watch: {},
        methods: {
            submit() {
                var {
                    secretid,
                    secretkey,
                    appid,
                    sn,
                    ckt,
                    fpw,
                    mrt,
                    mrr
                } = this.form;
                this.$request({
                    url: "/sms/tx/conf",
                    params: {
                        secretid,
                        secretkey,
                        appid,
                        sn,
                        ckt,
                        fpw,
                        mrt,
                        mrr
                    }
                }).then(res => {
                    if (res.data.rec == 0) {
                        this.$request({
                            url: "/sms/tx/view"
                        }).then(res => {
                            if (res.data.rec == 0) {
                                this.form = res.data.data;
                            }
                        });
                        this.$message.success("设置成功");
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            }
        },
        created() {
            this.$request({
                url: "/sms/tx/view"
            }).then(res => {
                if (res.data.rec == 0) {
                    this.form = res.data.data;
                }else{
                    this.$message.error(res.data.msg);
                }
            });
        },
        mounted() {}
    };
</script>
<style lang='less' scoped>
    .gray {
        color: #999;
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
    .domin-list {
        margin-top: 20px;
        .el-textarea {
            height: 200px;
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
    .opsity {
        opacity: 0;
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
        width: 300px;
        margin: 0 20px;
    }
</style>