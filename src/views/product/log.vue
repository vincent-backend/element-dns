<template>
    <div class>
        <div class="main-title">开通记录</div>
        <el-table size="small" :header-cell-style="fun" stripe ref="multipleTable" :data="NodeList" tooltip-effect="dark"
            style="width: 100%">
            <el-table-column prop="" label="" width="30"></el-table-column>
            <el-table-column prop="name" label="套餐名称" width="200"></el-table-column>
            <el-table-column prop="domain" label="开通域名" width="400"></el-table-column>
            <el-table-column prop="uid" label="用户" width="220">
                <template #default="scope">
                    <el-button type="text" size="mini" icon="el-icon-user" v-if="uid == 0"
                        @click="selectUid(scope.row.uid)"></el-button><el-button type="text" v-if="uid > 0" size="mini"
                        icon="el-icon-user-solid" @click="selectUid(0)"></el-button>{{ scope.row.uname }}
                </template>
            </el-table-column>
            <el-table-column prop="rtime" label="开通时间" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <div>

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
            form: {
                name: "",
                lid: "",
                bw: "",
                fw: "",
                p1: "",
                p2: "",
                waf: "",
                wcc: "",
                utime: "",
                lidlist: []
            },
            deviceRules: {
                name: [{ required: true, message: "请输入名称", trigger: "blur" }]
            },
            multipleSelection: [],
            currentPage: 1,
            formLabelWidth: "80px",
            deviceForm: {},
            dialogFormVisible: false,
            addDialogFormVisible: false,
            NodeList: [],
            count: 0,
            pagesize: 10,
            nin: 0,
            uid: 0
        };
    },
    computed: {},
    watch: {},
    methods: {
        selectUid(id) {
            this.uid = id;
            this.currentPage = 1;
            this.getNodeList();
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
            this.deviceForm = row;
        },
        // 修改节点
        updateDevice(id) {
            this.$request({
                url: "/product/add",
                params: this.deviceForm
            }).then(res => {
                if (res.data.rec == 0) {
                    this.$message.success("修改成功");
                    this.dialogFormVisible = false;
                    this.getNodeList();
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        // 获取节点列表
        getNodeList() {
            this.$request({
                url: "/product/log",
                params: {
                    page: this.currentPage,
                    pagesize: this.pagesize,
                    uid: this.uid
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