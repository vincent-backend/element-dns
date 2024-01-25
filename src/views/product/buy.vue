<template>
    <div class>
        <div class="main-title">套餐列表</div>
        <el-card>
            <div class="row1">
                <div>
                    <el-button class="space add-device" @click="addDialogFormVisible = true">添加套餐</el-button>
                    <el-dialog title="添加套餐" :visible.sync="addDialogFormVisible" top="1vh">
                        <el-form :model="form" :rules="deviceRules" ref="addDevice">
                            <el-form-item label="名称：" :label-width="formLabelWidth" prop="name">
                                <el-input v-model="form.name" style="width:220px" placeholder="套餐名称"></el-input>
                            </el-form-item>
                            <el-form-item label="线路：" :label-width="formLabelWidth" prop="lid">
                                <el-select v-model="form.lid" placeholder="请选择">
                                    <el-option v-for="(item, i) in form.lidlist" :key="i" :label="item.name"
                                        :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <!--
                            <el-form-item label="带宽：" :label-width="formLabelWidth" prop="bw">
                                <el-input v-model="form.bw" style="width:220px" placeholder="使用带宽"></el-input>
                            </el-form-item>
                            <el-form-item label="流量：" :label-width="formLabelWidth" prop="fw">
                                <el-input v-model="form.fw" style="width:220px" placeholder="使用流量"></el-input>
                            </el-form-item>
                            <el-form-item label="价格：" :label-width="formLabelWidth" prop="p1">
                                <el-input v-model="form.p1" style="width:220px" placeholder="价格"></el-input>
                            </el-form-item>
                            <el-form-item label="优惠价：" :label-width="formLabelWidth" prop="p2">
                                <el-input v-model="form.p2" style="width:220px" placeholder="优惠价格"></el-input>
                            </el-form-item>
                            <el-form-item label="WAF/CC：" :label-width="formLabelWidth" prop="waf">
                                <el-checkbox v-model="form.waf">支持</el-checkbox>
                            </el-form-item>-->
                            <!--
                            <el-form-item label="防CC：" :label-width="formLabelWidth" prop="wcc">
                                <el-checkbox v-model="form.cc">支持</el-checkbox>
                            </el-form-item>-->
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
                <div>
                    <el-input class="space" placeholder="名称"></el-input>
                    <el-button plain style="padding:10px 15px;color:#0164F6;border:1px solid #0164F6">搜索</el-button>
                </div>
            </div>
        </el-card>
        <el-table size="small" :header-cell-style="fun" stripe ref="multipleTable" :data="NodeList" tooltip-effect="dark"
            style="width: 100%">
            <el-table-column prop="" label="" width="30"></el-table-column>
            <el-table-column prop="name" label="名称" width="160"></el-table-column>
            <el-table-column prop="lid" label="线路ID" width="100"></el-table-column>
            <!--<el-table-column prop="bid" label="备路ID" width="80"></el-table-column>

            <el-table-column prop="bw" label="带宽" width="100"></el-table-column>
            <el-table-column prop="fw" label="流量" width="100"></el-table-column>
            <el-table-column prop="p1" label="价格" width="120"></el-table-column>
            <el-table-column prop="p2" label="优惠价" width="120"></el-table-column>
            <el-table-column prop="waf" label="" width="100">-->
            <!--<template #default="scope">
                <el-tag type="success" v-if="scope.row.waf==true">是</el-tag>
                <el-tag type="warning" v-else>否</el-tag>
            </template>-->
            </el-table-column>
            <!--
            <el-table-column prop="wcc" label="防CC" width="100">
                <template #default="scope">
                    <el-tag type="success" v-if="scope.row.wcc==0">是</el-tag>
                    <el-tag type="warning" v-else>否</el-tag>
                </template>
            </el-table-column>-->
            <el-table-column prop="uts" label="使用时间" width="120"></el-table-column>
            <el-table-column prop="rtime" label="添加时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="note" label="备注" width="120"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <div>
                        <el-button type="text" @click="updateShow(scope.row)">修改</el-button>
                        <el-dialog title="修改套餐" :visible.sync="dialogFormVisible" top="1vh">
                            <el-form :model="editform" :rules="editRules" ref="addDevice">
                                <el-form-item label="名称：" :label-width="formLabelWidth" prop="name">
                                    <el-input v-model="editform.name" style="width:220px" placeholder="套餐名称"></el-input>
                                </el-form-item>
                                <el-form-item label="线路：" :label-width="formLabelWidth" prop="lid">
                                    <el-select v-model="editform.lid" placeholder="请选择">
                                        <el-option v-for="(item, i) in form.lidlist" :key="i" :label="item.name"
                                            :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <!--
                                <el-form-item label="带宽：" :label-width="formLabelWidth" prop="bw">
                                    <el-input v-model="form.bw" style="width:220px" placeholder="使用带宽"></el-input>
                                </el-form-item>
                                <el-form-item label="流量：" :label-width="formLabelWidth" prop="fw">
                                    <el-input v-model="form.fw" style="width:220px" placeholder="使用流量"></el-input>
                                </el-form-item>
                                <el-form-item label="价格：" :label-width="formLabelWidth" prop="p1">
                                    <el-input v-model="form.p1" style="width:220px" placeholder="价格"></el-input>
                                </el-form-item>
                                <el-form-item label="优惠价：" :label-width="formLabelWidth" prop="p2">
                                    <el-input v-model="form.p2" style="width:220px" placeholder="优惠价格"></el-input>
                                </el-form-item>
                                <el-form-item label="WAF/CC：" :label-width="formLabelWidth" prop="waf">
                                    <el-checkbox v-model="form.waf">支持</el-checkbox>
                                </el-form-item>-->
                                <!--
                                <el-form-item label="防CC：" :label-width="formLabelWidth" prop="wcc">
                                    <el-checkbox v-model="form.cc">支持</el-checkbox>
                                </el-form-item>-->
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
                        </el-dialog>
                        <el-button type="text" @click="delDevice(scope.row)">删除</el-button>
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
                lid: "",
                //bw:"",
                //fw:"",
                //p1:"",
                //p2:"",
                waf: "",
                //wcc:"",
                un: 1,
                ut: "ev",
                lidlist: []
            },
            editform: {
                id: "",
                name: "",
                lid: "",
                //bw:"",
                //fw:"",
                //p1:"",
                //p2:"",
                waf: "",
                //wcc:"",
                un: "",
                ut: "ev",
            },
            deviceRules: {
                name: [{ required: true, message: "请输入名称", trigger: "blur" }]
            },
            editRules: {
                name: [{ required: true, message: "请输入名称", trigger: "blur" }]
            },
            multipleSelection: [],
            currentPage: 1,
            formLabelWidth: "100px",
            deviceForm: {},
            dialogFormVisible: false,
            addDialogFormVisible: false,
            NodeList: [],
            count: 0,
            pagesize: 10,
            nin: 0
        };
    },
    computed: {},
    watch: {},
    methods: {
        utChange() {
            //console.log("n",this.form.ut)
            if (this.form.ut == "m" || this.form.ut == "y") {
                this.un = true;
            } else {
                this.un = false;
            }
        },
        utChangee() {
            //console.log("n",this.form.ut)
            if (this.editform.ut == "m" || this.editform.ut == "y") {
                this.une = true;
            } else {
                this.une = false;
            }
        },
        getLidList() {
            this.$request({
                url: "/node/line/list"
            }).then(res => {
                if (res.data.rec == 0) {
                    this.form.lidlist = res.data.data.list;
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
        // 获取节点列表
        getNodeList() {
            this.$request({
                url: "/product/list",
                params: {
                    page: this.currentPage,
                    pagesize: this.pagesize
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
        if (this.nin == 1) {
            this.text = "";
        }
        this.getNodeList();
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
</style>