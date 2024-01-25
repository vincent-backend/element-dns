<template>
    <div class>
        <div class="main-title">查询统计排行_前30</div>
        <div style="margin-bottom: 20px;">
            <el-select @change="selectT" v-model="ft" placeholder="选择类型">
                <el-option label="按域名" value="domain"></el-option>
                <el-option label="按客户端IP" value="cip"></el-option>
                <el-option label="按返回IP" value="rip"></el-option>
                <el-option label="按类型" value="qt"></el-option>
            </el-select>&nbsp;&nbsp;
            <el-button plain :style='isActive == "5m" ? styCss : ""' @click="t5m">五分钟</el-button>
            <el-button plain :style='isActive == "3h" ? styCss : ""' @click="t3h">三小时</el-button>
            <el-button plain :style='isActive == "1d" ? styCss : ""' @click="t1d">当天</el-button>
            <el-button plain :style='isActive == "yd" ? styCss : ""' @click="tyd">昨天</el-button>
            <!--<el-button plain :style='isActive =="1w" ? styCss : ""' @click="t1w">一周</el-button>-->
        </div>
        <el-table size="small" :header-cell-style="fun" stripe ref="multipleTable" :data="logdata" tooltip-effect="dark"
            @selection-change="handleSelectionChange">
            <el-table-column prop="" label="" width="80"></el-table-column>
            <el-table-column prop="key" show-overflow-tooltip :label="keyn" width="360">
            </el-table-column>
            <el-table-column prop="dc" show-overflow-tooltip label="次数" width="200">
            </el-table-column>
        </el-table>
        <div class="footer-page" style="margin-top: 20px">
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    components: {},
    data() {
        return {
            pagesize: 10,
            count: 0,
            loginData: [],
            multipleSelection: [],
            currentPage: 1,
            formLabelWidth: '120px',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            gid: 0,
            nid: 0,
            keyn: "",
            ft: "domain",
            times: "3h",
            isActive: "3h",
            logdata: [],
            dialogFormVisible: false,
            styCss: {
                color: '#fff',
                background: '#0164F6',
                color: '#FFF!important'
            }
        };
    },
    computed: {},
    watch: {},
    methods: {
        selectT() {
            this.getlog();
        },
        t5m() {
            this.isActive = "5m"
            this.times = "5m";
            this.getlog();
        },
        t3h() {
            this.isActive = "3h"
            this.times = "3h";
            this.getlog();
        },
        t1d() {
            this.isActive = "1d"
            this.times = "1d";
            this.getlog();
        },
        tyd() {
            this.isActive = "yd"
            this.times = "yd";
            this.getlog();
        },
        t1w() {
            this.isActive = "1w"
            this.times = "1w";
            this.getlog();
        },
        // 获取登陆日志列表
        getlog() {
            this.$request({
                url: '/domain/flow/top',
                params: {
                    nid: this.nid,
                    ft: this.ft,
                    ts: this.times
                }
            }).then(res => {
                if (res.data.rec == 0) {
                    this.logdata = res.data.data.list;
                    this.keyn = res.data.data.keyn;
                    //console.log(this.logdata)
                    //this.count=res.data.data.count
                } else {
                    this.$message.error(res.data.msg);
                }

            })
        },
        toggleAll() {
            this.$refs.multipleTable.toggleAllSelection()
        },
        fun({ columnIndex }) {
            if (columnIndex !== 8 && columnIndex != 0)
                return {
                    background: "#0164F6",
                    color: "#fff",
                    height: '40px'
                };
            if (columnIndex == 0)
                return {
                    background: "#0164F6",
                    color: "#fff",
                    'padding-left': '10px',
                    height: '40px'
                };
            if (columnIndex == 4) {
                return {
                    "text-align": "right",
                    background: "#0164F6",
                    color: "#fff",
                    "padding-right": "10px",
                    height: '40px'
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
            this.pagesize = val
            this.getlog()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getlog()
        }
    },
    created() {
        this.gid = localStorage.getItem("gid");
        this.nid = this.$route.query.nid;
        this.getlog();
    },
    mounted() {
    }
};
</script>
<style lang='less' scoped>
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
</style>