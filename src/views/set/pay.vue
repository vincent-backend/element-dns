<template>
    <div class>
        <div class="control">
            <span style="margin:0 10px">支付设置</span>
        </div>
        <el-card class="box-card">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="支付宝支付设置" name="alipay">
                    <div class="domin-one">
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:100px;display:inline-block">支付宝</span>
                        <el-switch @change="aliswitch" v-model="ali.isu" active-color="#13ce66" inactive-color="#ff4949"
                            style="width:300px;margin:0 20px"></el-switch>
                        <span class="gray">开启支付宝支付</span>
                    </div>
                    <div v-if="ali.isu == true" class="domin-list bottom">
                        <span style="width:100px;display:inline-block">应用ID</span>
                        <el-input placeholder="appid" v-model="ali.appid" style="width:300px;margin: 0 20px"></el-input>
                        <span class="gray"> 支付商后台申请的APPID</span>
                    </div>
                    <div v-if="ali.isu == true" class="domin-list bottom">
                        <span style="width:100px;display:inline-block">应用私钥</span>
                        <el-input type="textarea" :rows="6" v-model="ali.appks" style="width:420px"
                            placeholder="应用私钥"></el-input>
                        <span class="gray"> 应用私钥</span>
                    </div>
                    <div v-if="ali.isu == true" class="domin-list bottom">
                        <span style="width:100px;display:inline-block">公钥</span>
                        <el-input type="textarea" :rows="6" placeholder="应用公钥" v-model="ali.appkp" clearable
                            style="width:420px"></el-input>
                        <span class="gray"> 应用公钥</span>
                    </div>
                    <div v-if="ali.isu == true" class="domin-list bottom">
                        <span style="width:130px;display:inline-block"></span>
                        <el-button type="primary" @click="aliSave">保存</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="微信支付设置" name="wxpay">
                    <div class="domin-one">
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:100px;display:inline-block">微信支付</span>
                        <el-switch @change="wxswitch" v-model="wx.isu" active-color="#13ce66" inactive-color="#ff4949"
                            style="width:300px;margin:0 20px"></el-switch>
                        <span class="gray">开启微信支付</span>
                    </div>
                    <div v-if="wx.isu == true" class="domin-list bottom">
                        <span style="width:100px;display:inline-block">应用ID</span>
                        <el-input placeholder="appid" v-model="wx.appid" style="width:300px;margin: 0 20px"></el-input>
                        <span class="gray"> 腾讯后台申请的APPID</span>
                    </div>
                    <div v-if="wx.isu == true" class="domin-list bottom">
                        <span style="width:100px;display:inline-block">商户ID</span>
                        <el-input placeholder="商户ID" v-model="wx.mchid" style="width:300px;margin: 0 20px"></el-input>
                        <span class="gray"> 商户后台申请的商户ID</span>
                    </div>
                    <div v-if="wx.isu == true" class="domin-list bottom">
                        <span style="width:100px;display:inline-block">应用密钥</span>
                        <el-input placeholder="" v-model="wx.mchkey" style="width:300px;margin: 0 20px"
                            placeholder="应用密钥"></el-input>
                        <span class="gray"> 应用密钥</span>
                    </div>
                    <div v-if="ali.isu == true" class="domin-list bottom">
                        <span style="width:130px;display:inline-block"></span>
                        <el-button type="primary" @click="wxSave">保存</el-button>
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
            ali: [],
            wx: [],
            activeName: "alipay",
        };
    },
    computed: {},
    watch: {},
    methods: {
        aliswitch() {
            this.$request({
                url: "/pay/ali/switch",
                params: {
                    isu: this.ali.isu
                }
            }).then(res => {
                if (res.data.rec == 0) {
                    this.$message.success(res.data.msg);
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        aliSave() {
            this.$request({
                url: "/pay/ali/conf",
                params: {
                    appid: this.ali.appid,
                    appks: this.ali.appks,
                    appkp: this.ali.appkp
                }
            }).then(res => {
                if (res.data.rec == 0) {
                    this.$message.success(res.data.msg);
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        wxswitch() {
            this.$request({
                url: "/pay/wx/switch",
                params: {
                    isu: this.wx.isu
                }
            }).then(res => {
                if (res.data.rec == 0) {
                    this.$message.success(res.data.msg);
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        wxSave() {
            this.$request({
                url: "/pay/wx/conf",
                params: {
                    appid: this.wx.appid,
                    mchid: this.wx.mchid,
                    mchkey: this.wx.mchkey
                }
            }).then(res => {
                if (res.data.rec == 0) {
                    this.$message.success(res.data.msg);
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        getView() {
            this.$request({
                url: "/pay/view"
            }).then(res => {
                if (res.data.rec == 0) {
                    this.ali = res.data.data.ali;
                    this.wx = res.data.data.wx;
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
                vm.activeName = "alipay";
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