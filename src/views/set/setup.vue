<template>
    <div class>
        <div class="control">系统设置</div>
        <el-card style="padding-left:50px">
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">cookie时间：</span>
                <el-input placeholder="请输入分钟数" v-model="form.ltime" clearable class="shuru"></el-input>
                <span class="gray">登录后台的cookie过期时间，单位分钟，默认为60分钟</span>
            </div>
            <!--
            <div class="domin-list bottom">
              <span style="width:100px;display:inline-block">NS地址：</span>
              <el-input placeholder="请输入内容" v-model="form.ns" clearable class="shuru"></el-input>
              <span class="gray">域名解析服务的NS地址(替换为您自己的域名或实际设置,该地址需在域名商后台注册，并在后台添加相应记录)</span>
            </div>-->
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">用户注册</span>
                <el-switch
                        v-model="form.reg"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        style="width:300px;margin:0 20px"
                ></el-switch>
                <span class="gray">是否开放普通用户注册</span>
            </div>
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">注册验证</span>
                <el-switch
                        v-model="form.rck"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        style="width:300px;margin:0 20px"
                ></el-switch>
                <span class="gray">开启后，注册需要短信或邮箱验证后才可正常操作</span>
            </div>
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">实名购买</span>
                <el-switch
                        v-model="form.uxis"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        style="width:300px;margin:0 20px"
                ></el-switch>
                <span class="gray">开启后，普通用户实名认证后，才可购买或开通</span>
            </div>
            <!--
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">到期关闭</span>
                <el-switch
                        v-model="form.sec"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        style="width:300px;margin:0 20px"
                ></el-switch>
                <span class="gray">站点使用时间到期后自动关闭</span>
            </div>
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">源站监控</span>
                <el-switch
                        v-model="form.ssis"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        style="width:300px;margin:0 20px"
                ></el-switch>
                <span class="gray">开启后，默认监控源站的WEB服务状态</span>
            </div>-->
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
                    ltime:60,
                    reg:false,
                    rck:false,
                    sec:false,
                    hfis:false,
                    hais:false,
                    ssis:false,
                    nsis:true,
                    uxis:false,
                    scnis:false
                }
            };
        },
        computed: {},
        watch: {},
        methods: {
            submit() {
                var {
                    ltime,
                    reg,
                    rck,
                    sec,
                    hfis,
                    hais,
                    ssis,
                    nsis,
                    uxis,
                    scnis
                } = this.form;
                this.$request({
                    url: "/sys/conf/setup",
                    params: {
                        ltime,
                        reg,
                        rck,
                        sec,
                        hfis,
                        hais,
                        ssis,
                        nsis,
                        uxis,
                        scnis
                    }
                }).then(res => {
                    if (res.data.rec == 0) {
                        this.$request({
                            url: "/sys/conf/view"
                        }).then(res => {

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
                url: "/sys/conf/view"
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