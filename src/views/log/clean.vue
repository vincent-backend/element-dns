<template>
    <div class>
        <div class="control">日志清除设置</div>
        <el-card style="padding-left:50px">
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">操作日志：</span>
                <el-input placeholder="请输入天数" v-model="form.opt" clearable class="shuru"></el-input>
                <span class="gray">默认为0，不清除，可输入一个数字，保留的天数，如7天，7天以外的都清除</span>
            </div>
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">登录日志：</span>
                <el-input placeholder="请输入天数" v-model="form.login" clearable class="shuru"></el-input>
                <span class="gray">默认为0，不清除，同上</span>
            </div>
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">监控日志：</span>
                <el-input placeholder="请输入天数" v-model="form.mon" clearable class="shuru"></el-input>
                <span class="gray">默认为0，不清除，同上</span>
            </div>
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">系统日志：</span>
                <el-input placeholder="请输入天数" v-model="form.sys" clearable class="shuru"></el-input>
                <span class="gray">默认为0，不清除，同上</span>
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
                    opt:0,
                    login:0,
                    mon:0,
                    sys:0
                }
            };
        },
        computed: {},
        watch: {},
        methods: {
            submit() {
                var {
                    opt,
                    login,
                    mon,
                    sys
                } = this.form;
                this.$request({
                    url: "/sys/clog",
                    params: {
                        opt,
                        login,
                        mon,
                        sys
                    }
                }).then(res => {
                    if (res.data.rec == 0) {
                        this.$request({
                            url: "/sys/clog/view"
                        }).then(res => {
                            this.form = res.data.data;
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
                url: "/sys/clog/view"
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