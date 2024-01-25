<template>
    <div class>
        <div class="control">
            <span style="margin:0 10px">IP名单</span>
        </div>
        <el-card class="box-card">
            <el-tabs v-model="activeName" @tab-click="handleClick" ref="tabs">
                <el-tab-pane label="白名单" name="white">
                    <div class="domin-one">
                    </div>
                    <el-table size="small" id="out-table" :header-cell-style="fun" stripe ref="multipleTable"
                        :data="wiplist" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="80"></el-table-column>
                        <el-table-column prop="ip" label="IP地址" width="350"></el-table-column>
                        <el-table-column prop="note" label="备注" width="200"></el-table-column>
                        <el-table-column prop="ut" label="有效期" show-overflow-tooltip width="200">
                            <template slot-scope="scope">
                                <el-tag type="success" v-if="scope.row.ut == 0">长期</el-tag>
                                <el-tag type="warning" v-else>{{ scope.row.ut }}分钟</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="添加时间" width="200" prop="rtime">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <div>
                                    <el-button type="text" @click="delIps(scope.row)">删除</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="footer-page" style="margin-top: 20px">
                        <div>
                            <!--
                            <el-button type="primary" class="footer-b anniu" @click.native="startDomain">启用</el-button>
                            <el-button type="warning" class="footer-b anniu" @click.native="stopDomain">暂停</el-button>-->
                            <el-button type="danger" class="footer-b anniu" @click.native="delIps">删除</el-button>
                        </div>
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="currentPage" :page-sizes="[10, 30, 50, 100, 500, 1000]" :page-size="pagesize"
                            layout="total, sizes, prev, pager, next, jumper" :total="count" background
                            :pager-count="5"></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="黑名单" name="black">
                    <div class="domin-one">
                    </div>
                    <el-table size="small" id="out-table" :header-cell-style="fun" stripe ref="multipleTable"
                        :data="biplist" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="80"></el-table-column>
                        <el-table-column prop="ip" label="IP地址" width="350"></el-table-column>
                        <el-table-column prop="note" label="备注" width="200"></el-table-column>
                        <el-table-column prop="ut" label="有效期" show-overflow-tooltip width="200">
                            <template slot-scope="scope">
                                <el-tag type="success" v-if="scope.row.ut == 0">长期</el-tag>
                                <el-tag type="warning" v-else>{{ scope.row.ut }}分钟</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="添加时间" width="200" prop="rtime">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <div>
                                    <el-button type="text" @click="delIps(scope.row)">删除</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="footer-page" style="margin-top: 20px">
                        <div>
                            <!--
                            <el-button type="primary" class="footer-b anniu" @click.native="startDomain">启用</el-button>
                            <el-button type="warning" class="footer-b anniu" @click.native="stopDomain">暂停</el-button> -->
                            <el-button type="danger" class="footer-b anniu" @click.native="delIps">删除</el-button>
                        </div>
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="currentPage" :page-sizes="[10, 30, 50, 100, 500, 1000]" :page-size="pagesize"
                            layout="total, sizes, prev, pager, next, jumper" :total="count" background
                            :pager-count="5"></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="添加" name="add">
                    <div class="domin-one">
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:100px;display:inline-block">名单类型</span>
                        <el-select v-model="form.pt" placeholder="名单类型" clearable style="width:200px">
                            <el-option label="白名单" :value="2">白名单</el-option>
                            <el-option label="黑名单" :value="1">黑名单</el-option>
                        </el-select>
                        <span class="gray">白名单或黑名单</span>
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:100px;display:inline-block">IP列表：</span>
                        <el-input type="textarea" :rows="6" placeholder="IP地址，每个一行" v-model="form.ips" clearable
                            class="shuru" style="height:100%;width:300px"></el-input>
                        <span class="gray">IP地址，每个一行，支持网段，如192.168.0.0/24</span>
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:100px;display:inline-block">有效期</span>
                        <el-input placeholder="有效期，默认为空或0" v-model="form.ut" clearable class="shuru"
                            style="height:100%;width:300px"></el-input>
                        <span class="gray">有效时间或过期时间,单位分钟，默认为空或0，一直有效不过期；如有设置则到期后会自动解除与删除</span>
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:100px;display:inline-block">备注</span>
                        <el-input placeholder="备注" v-model="form.note" clearable class="shuru"
                            style="height:100%;width:300px"></el-input>
                        <span class="gray">备注</span>
                    </div>
                    <div class="domin-list bottom">
                        <span style="width:130px;display:inline-block"></span>
                        <el-button type="primary" @click="ipsAdd">保存</el-button>
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
                pt: "",
                ips: "",
                ut: "",
                note: ""
            },
            pt: 2,
            groupList: [],
            addDialogFormVisible: false,
            sipEdit: {},
            multipleSelection: [],
            currentPage: 1,
            pagesize: 10,
            count: 0,
            activeName: "white",
            formLabelWidth: "80px",
            wiplist: [],
            biplist: [],
            filelist: [],
        };
    },
    computed: {},
    watch: {},
    methods: {
        submit() {
        },
        ipsAdd() {
            this.form.ips = this.form.ips.replace(/\s+/g, ",");
            this.$request({
                url: "/node/ips/add",
                params: this.form
            }).then(res => {
                if (res.data.rec == 0) {
                    this.$message.success(res.data.msg)
                    if (this.form.pt == 2) {
                        this.activeName = "white";
                        this.pt = 2;
                    } else {
                        this.pt = 1;
                        this.activeName = "black";
                    }
                    this.getIpList();
                } else {
                    this.$message.error(res.data.msg)
                }
            });
        },
        // 获取域名列表
        getIpList() {
            var search = this.searchVal;
            this.$request({
                url: "/node/ips/list",
                params: {
                    page: this.currentPage,
                    pagesize: this.pagesize,
                    search: this.searchVal,
                    pt: this.pt
                }
            }).then(res => {
                if (res.data.rec == 0) {
                    if (this.pt == 2) {
                        this.wiplist = res.data.data.list;
                    } else {
                        this.biplist = res.data.data.list;
                    }
                    this.count = res.data.data.count;
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        delIps(row) {
            var id = this.multipleSelection.map(item => {
                return item.id;
            });
            this.$confirm("删除源IP, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$request({
                        url: "/node/ips/del",
                        params: { id: row.id || id.toString() }
                    }).then(res => {
                        if (res.data.rec == 0) {
                            this.$message.success("删除成功");
                            this.getIpList();
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
        fun({ columnIndex }) {
            if (columnIndex !== 8)
                return {
                    background: "#0164F6",
                    color: "#fff"
                };
            if (columnIndex == 8) {
                return {
                    "text-align": "center",
                    background: "#0164F6",
                    color: "#fff",
                    "padding-right": "10px"
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
            //console.log(tab.label,tab.index,tab.name);
            if (tab.name == "white") {
                this.pt = 2;
                this.currentPage = 1;
                this.getIpList();
            } else {
                this.pt = 1;
                this.currentPage = 1;
                this.getIpList();
            }
        },
        handleSizeChange(val) {
            this.pagesize = val;
            this.getIpList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getIpList();
        }
    },
    beforeRouteEnter(to, from, next) {
        if (to.query.tab == "white") {
            next(vm => {
                vm.activeName = "white";
            });
        } else if (to.query.tab == "black") {
            next(vm => {
                vm.activeName = "black";
            });
        } else {
            next(vm => {
                vm.activeName = "white";
            });
        }
    },
    created() {
        this.getIpList();
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
}

.footer-page {
    display: flex;
    justify-content: space-between;
}

.footer-b {
    padding: 9px 15px;
    margin: 0 10px;
}

.fenzu {
    margin: 0 10px;
}

.anniu:hover {
    color: #0164F6;
}

.el-button--text {
    color: #0164F6;
}

.foot:hover {
    border-color: #0164F6 !important;
    color: #0164F6 !important;
}</style>