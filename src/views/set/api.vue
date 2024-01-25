<template>
    <div class="domain-container">
        <div class="domin-manage">api设置</div>
        <div class="header-container">
            <div>
                <el-button type="primary" @click="dialogFormVisible = true">创建秘钥</el-button>
            </div>
        </div>
        <el-dialog title="创建秘钥" :visible.sync="dialogFormVisible">
            <el-form label-position="top">
                <el-form-item label="秘钥名称" :label-width="formLabelWidth">
                    <el-input v-model="name" placeholder="请为创建的秘钥取一个名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addapi">确 定</el-button>
            </div>
        </el-dialog>

        <el-table size="small" id="out-table" :header-cell-style="fun" stripe ref="multipleTable" :data="apiList"
            tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="name" label="名称" width="180"></el-table-column>
            <el-table-column prop="id" show-overflow-tooltip width="50" label="ID">
            </el-table-column>
            <el-table-column prop="key" show-overflow-tooltip width="360" label="Token">
            </el-table-column>
            <el-table-column prop="ip" show-overflow-tooltip width="400px" label="IP白名单">
                <template slot-scope="scope">
                    <div style="display: flex; align-items: center;">
                        <span v-if="scope.row.ip"
                            style="margin-right:10px;line-height:40px;max-width:280px;overflow:hidden;display:inline-block">
                            {{ scope.row.ip }}
                        </span>
                        <el-button type="text" @click="set(scope.row, 'ip')" class="setting">设置</el-button>
                    </div>
                </template>
            </el-table-column>
            <!--
            <el-table-column
                    width="200"
                    prop="url"
                    label="URL回调"
            >
                <template slot-scope="scope">
                    <el-button type="text" @click="set(scope.row,'url')">设置</el-button>
                </template>
            </el-table-column>-->
            <el-table-column prop="rtime" label="创建时间" show-overflow-tooltip width="200">
            </el-table-column>
            <el-table-column prop="note" label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                    <i class="el-icon-delete-solid" @click="del(scope.row)" style="cursor:pointer"></i>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="IP白名单设置" :visible.sync="FormVisible" v-if="show == 'ip'">
            <div style="padding:20px;background:#f0f9eb;margin-bottom:20px">IP白名单的功能可以指定IP地址进行API调用，以保证秘钥安全。</div>
            <el-form>
                <el-form-item label="允许访问的IP" :label-width="formLabelWidth">
                    <el-input v-model="ip" placeholder="请输入ip地址，每行一个，如1.2.3.4" type="textarea" class="ip"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="FormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editapi()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="url设置" :visible.sync="FormVisible1" v-if="show == 'url'">
            <div style="padding:20px;background:#f0f9eb;margin-bottom:20px">url回调</div>
            <el-form>
                <el-form-item label="url回调" :label-width="formLabelWidth">
                    <el-input v-model="url" placeholder="请输入url地址" class="ip"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="FormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="editapi()">确 定</el-button>
            </div>
        </el-dialog>
        <div class="footer-page" style="margin-top: 20px">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[10, 30, 50, 100, 500, 1000]" :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="count" background :pager-count="5"></el-pagination>
        </div>
        <div><br></div>
        <el-alert title="备注说明" type="success">
            <template slot='title'>
                <div>备注说明:</div>
                <div>1、此API设置为使用API接口时，创建相应的ID与密钥用于连接API接口</div>
                <div>2、通过API接口，可以创建与管理域名或记录，结合自身的业务系统或应用需求开发控制</div>
                <div></div>
            </template>
        </el-alert>
    </div>
</template>

<script>
export default {
    name: "",
    components: {},
    data() {
        return {
            currentPage: 1,
            pagesize: 10,
            show: 'ip',
            dialogTableVisible: false,
            dialogFormVisible: false,
            FormVisible: false,
            count: 0,
            FormVisible1: false,
            name: "",
            formLabelWidth: "100px",
            apiList: [],
            data: {},
            ip: "",
            url: ""
        };
    },
    computed: {},
    watch: {},
    methods: {
        // 删除
        del(data) {
            this.$request({
                url: "/user/api/del",
                params: {
                    id: data.id,
                },
            }).then((res) => {
                if (res.data.rec == 0) {
                    this.getapiList();
                    this.$message.success(res.data.msg);
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        handleSizeChange(val) {
            this.pagesize = val;
            this.getapiList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getapiList();
        },
        // 弹窗
        set(data, name) {

            this.data = data
            this.who = name
            if (name == 'ip') {
                this.show = 'ip'
                this.FormVisible = true
                this.ip = data.ip.replace(/,/g, "\n")
            } else {
                this.show = 'url'
                this.FormVisible1 = true
                this.url = data.url
            }
        },
        // 设置
        editapi() {
            if (this.who == 'ip') {
                var ip = this.ip.replace(/\s+/g, ",")
            }
            if (this.who == 'url') {
                var url = this.url.replace(/\s+/g, ",")
            }
            //console.log(url)
            this.$request({
                url: "/user/api/edit",
                params: {
                    id: this.data.id,
                    ip,
                    url
                },
            }).then((res) => {
                if (res.data.rec == 0) {
                    this.$message.success(res.data.msg);
                    this.getapiList();
                    this.FormVisible = false;
                    this.FormVisible1 = false;
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        // 创建秘钥
        addapi() {
            this.$request({
                url: "/user/api/add",
                params: {
                    name: this.name,
                },
            }).then((res) => {
                if (res.data.rec == 0) {
                    this.domainList = res.data.data.list;
                    this.getapiList();
                    this.dialogFormVisible = false;
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        // 获取api列表
        getapiList() {
            this.$request({
                url: "/user/api/list",
                params: {
                    page: this.currentPage,
                    pagesize: this.pagesize,
                },
            }).then((res) => {
                if (res.data.rec == 0) {
                    this.apiList = res.data.data.list;
                    this.count = res.data.data.count
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        toggleAll() {
            this.$refs.multipleTable.toggleAllSelection();
        },
        fun({ columnIndex }) {
            if (columnIndex !== 8)
                return {
                    background: "#0164F6",
                    color: "#fff",
                };
            if (columnIndex == 8) {
                return {
                    "text-align": "center",
                    background: "#0164F6",
                    color: "#fff",
                    "padding-right": "10px",
                };
            }
        },
    },
    created() {
        this.getapiList();
    },
    mounted() { },
};
</script>
<style lang='less' scoped>
/deep/.ip textarea {
    height: 200px;
}

.el-dropdown-menu {
    padding: 0;

    li:hover {
        color: #0164F6;
    }
}

.domin-manage {
    line-height: 60px;
    font-weight: bold;
}

.el-card {
    margin-bottom: 20px;

    .col1 {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-button {
            font-size: 12px;
            padding: 10px 15px;
            border: 1px solid #0164F6;
            color: #0164F6;
        }

        .right-space {
            margin-right: 20px;
        }

        .el-input {
            width: 200px;
            line-height: 34px;
            padding: 0;

            input {
                line-height: 34px;
            }
        }

        .add {
            color: #fff;
            background: #0164F6;
        }
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

.head-color {
    color: #fff !important;
    font-weight: bold;
}

.more {
    margin-left: 10px;
}

.shu {
    color: #f1f1f1;
    margin-top: 5px;
}

.more-list .el-dropdown-menu__item {
    padding: 0 15px;
}

.footer-page {
    display: flex;
    justify-content: flex-end;
}

.footer-b {
    padding: 9px 15px;
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
}
</style>
<style lang="less">
.el-message-box {

    .el-button:focus,
    .el-button:hover {
        color: #0164F6;
        border-color: #0164F6;
        background: #fff;
    }
}

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background: #0164F6;
    border-color: #0164F6;
}

.group {
    overflow: auto;
    max-height: 200px;
}

.domain-container {
    .el-pagination__sizes .el-input .el-input__inner:hover {
        border-color: #0164F6;
    }

    .footer-page {

        .el-button:focus,
        .el-button:hover,
        .el-button:active {
            border-color: #0164F6;
            background: #fff;
            color: #0164F6;
        }
    }
}

.header-container {
    margin-bottom: 20px;
}
</style>