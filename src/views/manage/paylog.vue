<template>
    <div class>
        <div class="main-title">充扣记录</div>
        <div class="header-container">
            <el-date-picker v-model="value1" type="daterange" range-separator="~" start-placeholder="开始日期"
                end-placeholder="结束日期" @change="selectDate" value-format="yyyy-MM-dd"></el-date-picker>
            <div class="header-container-right">
                <el-input class="space" placeholder="操作内容" v-model="search"></el-input>
                <el-button plain style="padding:10px 15px;color:#0164F6;border:1px solid #0164F6"
                    @click="searchList">搜索</el-button>
            </div>
        </div>
        <el-table size="small" :header-cell-style="fun" stripe ref="multipleTable" :data="optList" tooltip-effect="dark"
            style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column width="10"></el-table-column>
            <el-table-column v-if="gid == 1" prop="uid" show-overflow-tooltip label="用户" width="80">
                <template #default="scope">
                    <el-button type="text" size="mini" icon="el-icon-user" v-if="uid == 0"
                        @click="selectUid(scope.row.uid)"></el-button><el-button type="text" v-if="uid > 0" size="mini"
                        icon="el-icon-user-solid" @click="selectUid(0)"></el-button>{{ scope.row.uname }}
                </template>
            </el-table-column>
            <el-table-column prop="pt" show-overflow-tooltip label="类型" width="120">
                <template #default="scope">
                    <el-tag type="success" v-if="scope.row.pt == 0">充值</el-tag>
                    <el-tag type="warning" v-else>扣款</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="pa" show-overflow-tooltip label="方式" width="130">
                <template #default="scope">
                    <el-tag type="success" v-if="scope.row.pa == 0">手工</el-tag>
                    <el-tag type="success" v-else-if="scope.row.pa == 1">支付宝</el-tag>
                    <el-tag type="success" v-else-if="scope.row.pa == 2">微信</el-tag>
                    <el-tag type="warning" v-else>其它</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="cny" label="金额" width="120">
                <template #default="scope">
                    {{ scope.row.cny }}元
                </template>
            </el-table-column>
            <el-table-column prop="tno" label="订单号" width="300"></el-table-column>
            <el-table-column prop="note" show-overflow-tooltip label="备注" width="200"></el-table-column>
            <el-table-column prop="state" show-overflow-tooltip label="状态" width="130">
                <template #default="scope">
                    <el-tag type="success" v-if="scope.row.state == 1">成功</el-tag>
                    <el-tag type="warning" v-else>未完成</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="rtime" label="时间" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="footer-page" style="margin-top: 20px">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[10, 30, 50, 100, 500, 1000]" :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="count" background :pager-count="5"
                style="width:100%;text-align:right"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    components: {},
    data() {
        return {
            value1: "",
            multipleSelection: [],
            currentPage: 1,
            formLabelWidth: "120px",
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            },
            dialogFormVisible: false,
            optList: [],
            count: 0,
            pagesize: 10,
            stime: '',
            etime: '',
            search: '',
            gid: 0,
            uid: 0
        };
    },
    computed: {},
    watch: {},
    methods: {
        searchList() {
            this.getOptList();
        },
        selectUid(id) {
            this.uid = id;
            this.currentPage = 1;
            this.getOptList();
        },
        // 选择日期范围
        selectDate() {
            this.stime = this.value1[0];
            this.etime = this.value1[1];
            this.getOptList();
        },
        // 获取操作日志列表
        getOptList() {
            this.$request({
                url: "/user/paylog",
                params: {
                    page: this.currentPage,
                    pagesize: this.pagesize,
                    stime: this.stime,
                    etime: this.etime,
                    search: this.search,
                    uid: this.uid
                }
            }).then(res => {
                if (res.data.rec == 0) {
                    this.count = res.data.data.count;
                    this.optList = res.data.data.list;
                } else {
                    this.$message.error(res.data.msg);
                }

            });
        },
        toggleAll() {
            this.$refs.multipleTable.toggleAllSelection();
        },
        fun({ columnIndex }) {
            if (columnIndex !== 9)
                return {
                    background: "#0164F6",
                    color: "#fff",
                };
            if (columnIndex == 5) {
                return {
                    "text-align": "right",
                    background: "#0164F6",
                    color: "#fff",
                    "padding-right": "10px",
                };
            }
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
        // 监控
        Towatch() {
            this.$router.push("/domin/list/watch");
        },
        // 解析
        Torecord() {
            this.$router.push("/domin/list/record");
        },
        // 统计
        Tocount() {
            this.$router.push("/domin/list/count");
        },
        handleSizeChange(val) {
            this.pagesize = val;
            this.getOptList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getOptList();
        }
    },
    created() {
        this.gid = localStorage.getItem("gid");
        this.getOptList();
    },
    mounted() { }
};
</script>
<style lang='less' scoped>
/deep/.el-date-editor .el-range-separator {
    line-height: 26px;
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

.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    .header-container-right {
        display: flex;
        gap: 16px;
    }
}
</style>