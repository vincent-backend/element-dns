<template>
    <div class>
        <div class="main-title">最新查询请求记录(100条)</div>
        <div class="header-container" style="margin-bottom: 20px;">
            <el-select @change="selectNid" v-model="nid" placeholder="选择节点" v-if="gid == 1" filterable allow-create>
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in nidlist" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
            <el-select @change="selectDom" v-model="domain" placeholder="选择域名" filterable allow-create>
                <el-option label="全部(域名)" value=""></el-option>
                <el-option v-for="item in domlist" :key="item.id" :label="item.name" :value="item.name">
                </el-option>
            </el-select>
        </div>
        <el-table size="small" :header-cell-style="fun" stripe ref="multipleTable" :data="logdata" tooltip-effect="dark"
            @selection-change="handleSelectionChange">
            <el-table-column prop="" label="" width="30"></el-table-column>
            <el-table-column prop="host" show-overflow-tooltip label="主机名" width="130">
            </el-table-column>
            <el-table-column prop="domain" show-overflow-tooltip label="域名" width="280">
            </el-table-column>
            <el-table-column prop="qt" show-overflow-tooltip label="类型" width="130">
            </el-table-column>
            <!--
            <el-table-column prop="rip" show-overflow-tooltip label="返回值" width="260">
            </el-table-column>-->
            <el-table-column prop="cip" show-overflow-tooltip label="客户IP" width="260">
            </el-table-column>
            <el-table-column prop="ty" show-overflow-tooltip label="域内" width="120">
                <template #default="scope">
                    <el-tag type="success" v-if="scope.row.ty == 0">是</el-tag>
                    <el-tag type="warning" v-else>否</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="ts" label="时间"></el-table-column>
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
            nid: "",
            domain: "",
            nidlist: [],
            domlist: [],
            logdata: [],
            dialogFormVisible: false,
            otimer: null,
        };
    },
    computed: {},
    watch: {},
    methods: {
        getNidDom() {
            this.$request({
                url: "/domain/flow/nid/dom",
                params: {}
            }).then(res => {
                if (res.data.rec == 0) {
                    this.domlist = res.data.data.dom;
                    this.nidlist = res.data.data.nid;
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        selectNid() {
            this.getlog();
        },
        selectDom() {
            this.getlog();
        },
        // 获取登陆日志列表
        getlog() {
            if (this.domain == "" && this.gid == 0) {
                return
            }
            this.$request({
                url: '/domain/newlog',
                params: {
                    nid: this.nid,
                    domain: this.domain
                }
            }).then(res => {
                if (res.data.rec == 0) {
                    this.logdata = res.data.data
                    //console.log(this.logdata)
                    //this.count=res.data.data.count
                } else {
                    this.$message.error(res.data.msg);
                }

            });
            this.otimer = setInterval(() => {
                this.$request({
                    url: '/domain/newlog',
                    params: {
                        nid: this.nid,
                        domain: this.domain
                    }
                }).then(res => {
                    if (res.data.rec == 0) {
                        this.logdata = res.data.data
                        //console.log(this.logdata)
                        //this.count=res.data.data.count
                    } else {
                        clearInterval(this.otimer);
                    }
                });
            }, 5000);
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
        this.gid = localStorage.getItem("gid")
        this.nid = this.$route.query.nid;
        this.getNidDom();
        this.getlog();
    },
    mounted() {
        this.$once('hook:beforeDestroy', () => {//页面关闭
            clearInterval(this.otimer);//停止
        });
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

.header-container {
    display: flex;
    gap: 16px;
}
</style>