<template>
    <div class>
        <div class="control">转发设置</div>
        <el-card style="padding-left:50px">
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">递归转发</span>
                <el-switch
                        v-model="form.fw"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        style="width:300px;margin:0 20px"
                ></el-switch>
                <span class="gray">转发也叫递归，开启后可查询所有的互联网域名</span>
            </div>
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">缓存时间：</span>
                <el-input placeholder="请输入缓存有效时间，留空使用默认值" v-model="form.fwt" clearable class="shuru"></el-input>
                <span class="gray">转发缓存的有效时间，默认60秒</span>
            </div>
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">上级DNS：</span>
                <el-input placeholder="请输入上级的DNS服务器IP，可留空" v-model="form.fws" clearable class="shuru"></el-input>
                <span class="gray">转发到上级的DNS服务器IP地址，默认使用服务器上的DNS，多个可用,逗号分隔</span>
            </div>
            <div class="domin-list bottom">
                <span style="width:100px;display:inline-block">条件转发</span>
                <el-switch
                        v-model="form.cfw"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        style="width:300px;margin:0 20px"
                ></el-switch>
                <span class="gray">开启后，可指定域名到指定的DNS服务器解析，具体域名设置可在 转发管理》条件转发 添加或删除 </span>
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
                    fw:false,
                    fwt:60,
                    fws:"",
                    cfw:false
                }
            };
        },
        computed: {},
        watch: {},
        methods: {
            submit() {
                var {
                    fw,
                    fwt,
                    fws,
                    cfw
                } = this.form;
                this.$request({
                    url: "/sys/fw/setup",
                    params: {
                        fw,
                        fwt,
                        fws,
                        cfw
                    }
                }).then(res => {
                    if (res.data.rec == 0) {
                        this.$request({
                            url: "/sys/fw/view"
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
                url: "/sys/fw/view"
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