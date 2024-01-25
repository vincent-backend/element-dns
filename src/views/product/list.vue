<template>
    <div class>
        <div class="main-title">套餐列表</div>
        <div class="header-container">
            <div class="header-container-left">
                <el-button type="primary" @click="addDialogFormVisible = true">添加套餐</el-button>
                <el-dialog title="添加套餐" :visible.sync="addDialogFormVisible" top="1vh">
                    <el-form :model="form" :rules="deviceRules" ref="addDevice">
                        <el-form-item label="名称：" :label-width="formLabelWidth" prop="name">
                            <el-input v-model="form.name" style="width:220px" placeholder="套餐名称"></el-input>
                        </el-form-item>
                        <el-form-item label="NS组：" :label-width="formLabelWidth" prop="lid">
                            <el-select v-model="form.nid" placeholder="请选择">
                                <el-option v-for="(item, i) in form.nidlist" :key="i" :label="item.name"
                                    :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <!--
                            <el-form-item label="请求量：" :label-width="formLabelWidth" prop="qc">
                                <el-input v-model="form.qc" style="width:220px" placeholder="查询/请求量"></el-input>
                            </el-form-item>
                            <el-form-item label="记录数：" :label-width="formLabelWidth" prop="rc">
                                <el-input v-model="form.rc" style="width:220px" placeholder="解析记录数"></el-input>
                            </el-form-item>
                            <el-form-item label="监控数：" :label-width="formLabelWidth" prop="mc">
                                <el-input v-model="form.mc" style="width:220px" placeholder="监控数"></el-input>
                            </el-form-item> -->
                        <el-form-item label="价格：" :label-width="formLabelWidth" prop="p1">
                            <el-input v-model="form.p1" style="width:220px" placeholder="价格"></el-input>
                        </el-form-item>
                        <el-form-item label="优惠价：" :label-width="formLabelWidth" prop="p2">
                            <el-input v-model="form.p2" style="width:220px" placeholder="优惠价"></el-input>
                        </el-form-item>
                        <el-form-item label="使用时间：" :label-width="formLabelWidth" prop="ut">
                            <el-select @change="utChange" v-model="form.ut" style="width:80px;margin:0 2px"
                                placeholder="请选择">
                                <el-option label="月" value="m">月</el-option>
                                <el-option label="年" value="y">年</el-option>
                                <el-option label="无限制" value="ev">无限制</el-option>
                            </el-select>
                            <el-input v-if="un == true" v-model="form.un" style="width:80px;margin:0 10px"
                                autocomplete="off" placeholder="使用时间"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="addDialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addDevice()">确 定</el-button>
                    </div>
                </el-dialog>
                <span>&nbsp;&nbsp;</span>
            </div>
            <div class="header-container-right">
                <el-input class="space" placeholder="名称" v-model="searchVal"></el-input>
                <el-button @click="search" plain
                    style="padding:10px 15px;color:#0164F6;border:1px solid #0164F6">搜索</el-button>
            </div>
        </div>
        <el-table size="small" :header-cell-style="fun" stripe ref="multipleTable" :data="NodeList" tooltip-effect="dark"
            style="width: 100%">
            <el-table-column prop="" label="" width="10"></el-table-column>
            <el-table-column prop="name" label="名称" width="130"></el-table-column>
            <el-table-column v-if="gid == 1" prop="nsn" label="NS组" width="130"></el-table-column>
            <!--
            <el-table-column prop="qc" label="请求量" width="80"></el-table-column>
            <el-table-column prop="rc" label="记录数" width="100"></el-table-column>
            <el-table-column prop="mc" label="监控数" width="100"></el-table-column>-->
            <el-table-column prop="p1" label="价格" width="160">
                <template slot-scope="scope">
                    {{ scope.row.p1 }}元
                </template>
            </el-table-column>
            <el-table-column prop="p2" label="优惠价" width="160">
                <template slot-scope="scope">
                    {{ scope.row.p2 }}元
                </template>
            </el-table-column>
            <el-table-column prop="uts" label="使用时间" width="160"></el-table-column>
            <el-table-column prop="note" label="备注" width="160"></el-table-column>
            <el-table-column v-if="gid == 1" prop="rtime" label="添加时间" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                    <div>
                        <el-button v-if="gid == 1" type="text" @click="updateShow(scope.row)">修改</el-button>
                        <el-dialog title="修改套餐" :visible.sync="dialogFormVisible" top="1vh">
                            <el-form :model="editform" :rules="editRules" ref="addDevice">
                                <el-form-item label="名称：" :label-width="formLabelWidth" prop="name">
                                    <el-input v-model="editform.name" style="width:220px" placeholder="套餐名称"></el-input>
                                </el-form-item>
                                <el-form-item label="NS组：" :label-width="formLabelWidth" prop="nid">
                                    <el-select v-model="editform.nid" placeholder="请选择">
                                        <el-option v-for="(item, i) in form.nidlist" :key="i" :label="item.name"
                                            :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <!--
                                <el-form-item label="请求量：" :label-width="formLabelWidth" prop="qc">
                                    <el-input v-model="editform.qc" style="width:220px" placeholder="查询/请求量"></el-input>
                                </el-form-item>
                                <el-form-item label="记录数：" :label-width="formLabelWidth" prop="rc">
                                    <el-input v-model="editform.rc" style="width:220px" placeholder="解析记录数"></el-input>
                                </el-form-item>
                                <el-form-item label="监控数：" :label-width="formLabelWidth" prop="mc">
                                    <el-input v-model="editform.mc" style="width:220px" placeholder="监控数"></el-input>
                                </el-form-item>-->
                                <el-form-item label="价格：" :label-width="formLabelWidth" prop="p1">
                                    <el-input v-model="editform.p1" style="width:220px" placeholder="价格"></el-input>
                                </el-form-item>
                                <el-form-item label="优惠价：" :label-width="formLabelWidth" prop="p2">
                                    <el-input v-model="editform.p2" style="width:220px" placeholder="优惠价"></el-input>
                                </el-form-item>
                                <el-form-item label="使用时间：" :label-width="formLabelWidth" prop="ut">
                                    <el-select @change="utChangee" v-model="editform.ut" style="width:80px;margin:0 2px"
                                        placeholder="请选择">
                                        <el-option label="月" value="m">月</el-option>
                                        <el-option label="年" value="y">年</el-option>
                                        <el-option label="无限制" value="ev">无限制</el-option>
                                    </el-select>
                                    <el-input v-if="une == true" v-model="editform.un" style="width:80px;margin:0 10px"
                                        autocomplete="off" placeholder="使用时间"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="updateDevice()">确 定</el-button>
                            </div>
                        </el-dialog>&nbsp;
                        <el-button type="text" v-if="gid == 1" @click="delDevice(scope.row)">删除</el-button>
                        <el-button type="text" @click="buy(scope.row)">购买</el-button>
                        <el-dialog title="套餐购买" :visible.sync="buydialogFormVisible" class="dialog">
                            <el-form :model="buyForm" :rules="buyRules">
                                <el-form-item label="域名：" label-width="65px" prop="domain">
                                    <el-input v-model="buyForm.domain" autocomplete="off"
                                        placeholder="如 wddns.net"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="buydialogFormVisible = false">取 消</el-button>
                                <el-button @click="buySubmit" class="confirm">确 定</el-button>
                            </div>
                        </el-dialog>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="footer-page" style="margin-top: 20px;text-align:right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[10, 30, 50, 100, 500, 1000]" :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="count" background :pager-count="5"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: '',
            un: false,
            une: false,
            form: {
                name: "",
                nid: "",
                ln: "",
                qc: "",
                rc: "",
                mc: "",
                p1: "",
                p2: "",
                un: 1,
                ut: "ev",
                nidlist: []
            },
            editform: {
                id: "",
                name: "",
                nid: "",
                qc: "",
                rc: "",
                mc: "",
                p1: "",
                p2: "",
                un: "",
                ut: "ev",
            },
            buyForm: {
                pid: "",
                domain: "",
            },
            deviceRules: {
                name: [{ required: true, message: "请输入名称", trigger: "blur" }]
            },
            editRules: {
                name: [{ required: true, message: "请输入名称", trigger: "blur" }]
            },
            buyRules: {
                domain: [{ required: true, message: "请输入域名", trigger: "blur" }]
            },
            multipleSelection: [],
            currentPage: 1,
            formLabelWidth: "100px",
            deviceForm: {},
            dialogFormVisible: false,
            addDialogFormVisible: false,
            buydialogFormVisible: false,
            NodeList: [],
            count: 0,
            pagesize: 10,
            nin: 0,
            gid: 0,
            searchVal: ""
        };
    },
    computed: {},
    watch: {},
    methods: {
        utChange() {
            if (this.form.ut == "m" || this.form.ut == "y") {
                this.un = true;
            } else {
                this.un = false;
            }
        },
        buy(v) {
            this.buydialogFormVisible = true;
            this.buyForm.pid = v.id
        },
        // 添加域名
        buySubmit() {
            this.$request({
                url: "/domain/add",
                params: this.buyForm
            }).then(res => {
                if (res.data.rec == 0) {
                    this.buydialogFormVisible = false;
                    this.$message.success("购买成功");
                    this.$router.push("/domin/list")
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        utChangee() {
            //console.log("n",this.form.ut)
            if (this.editform.ut == "m" || this.editform.ut == "y") {
                this.une = true;
            } else {
                this.une = false;
            }
        },
        getNidList() {
            this.$request({
                url: "/domain/ns/list"
            }).then(res => {
                if (res.data.rec == 0) {
                    this.form.nidlist = res.data.data.list;
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        // 添加节点
        addDevice() {
            this.$request({
                url: "/product/add",
                params: this.form
            }).then(res => {
                if (res.data.rec == 0) {
                    this.$message.success(res.data.msg);
                    this.addDialogFormVisible = false;
                    this.un = false;
                    this.getNodeList();
                } else {
                    this.$message.error(res.data.msg);
                    this.addDialogFormVisible = false;
                }
            });
        },
        // 删除节点
        delDevice(row) {
            this.$confirm("删除套餐, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$request({
                        url: "/product/del",
                        params: { id: row.id }
                    }).then(res => {
                        if (res.data.rec == 0) {
                            this.$message.success("删除成功");
                            this.getNodeList();
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        // 弹出修改框
        updateShow(row) {
            this.dialogFormVisible = true;
            if (row.ut != "ev") {
                this.une = true;
            } else {
                this.une = false;
            }
            this.editform = row;
        },
        // 修改节点
        updateDevice(id) {
            this.$request({
                url: "/product/add",
                params: this.editform
            }).then(res => {
                if (res.data.rec == 0) {
                    this.$message.success("修改成功");
                    this.dialogFormVisible = false;
                    this.une = false;
                    this.getNodeList();
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        search() {
            this.getNodeList();
        },
        // 获取节点列表
        getNodeList() {
            this.$request({
                url: "/product/list",
                params: {
                    page: this.currentPage,
                    pagesize: this.pagesize,
                    search: this.searchVal
                }
            }).then(res => {
                if (res.data.rec == 0) {
                    this.count = res.data.data.count;
                    this.NodeList = res.data.data.list;
                } else {
                    this.$message.error(res.data.msg);
                }

            });
        },
        fun({ columnIndex }) {
            if (columnIndex !== 7)
                return {
                    height: "49px",
                    background: "#0164F6",
                    color: "#fff"
                };
            if (columnIndex == 7) {
                return {
                    height: "49px",
                    background: "#0164F6",
                    color: "#fff",
                };
            }
        },
        // 统计
        Tocount(ip, id) {
            this.$router.push("/node/list/count?ip=" + ip + "&id=" + id);
        },
        handleSizeChange(val) {
            this.pagesize = val;
            this.getNodeList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getNodeList();
        }
    },
    created() {
        this.nin = localStorage.getItem('nin')
        this.gid = localStorage.getItem('gid')
        if (this.nin == 1) {
            this.text = "";
        }
        this.getNodeList();
        if (this.gid == 1) {
            this.getNidList();
        }
    },
    mounted() { }
};
</script>
<style lang='less' scoped>
.el-dialog {

    .el-button:active,
    .el-button:focus,
    .el-button:hover {
        color: #0164F6;
        border-color: #0164F6;
    }
}

.confirm {
    background-color: #0164F6;
    color: #fff !important;
}

.dialog {

    .el-textarea,
    .el-input,
    .el-select {
        width: 100% !important;
    }

    .hover-color:hover {
        color: #0164F6 !important;
    }

    .el-select-dropdown__item.selected {
        color: #0164F6;
    }
}

.add-device {
    background: #0164F6;
    color: #fff;
    padding: 10px 15px !important;
}

.el-card {
    margin-bottom: 20px;
}

.main-title {
    line-height: 60px;
    font-weight: bold;
}

.row1 {
    display: flex;
    justify-content: space-between;

    &>div {
        display: flex;
        align-items: center;

        .space {
            margin-right: 20px;
        }
    }
}

.head-color {
    color: #fff;
    font-weight: bold;
}

.el-button--text {
    color: #0164F6;
}

.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    .header-container-left {}

    .header-container-right {
        display: flex;
        gap: 16px;
    }
}
</style>