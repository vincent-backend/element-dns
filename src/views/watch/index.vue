<template>
  <div class>
    <div class="domin-manage">监控记录</div>
    <el-table size="small" :header-cell-style="fun" stripe ref="multipleTable" :data="monList" tooltip-effect="dark"
      style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column prop="" label="" width="30"></el-table-column>
      <el-table-column prop="url" label="监控URL"></el-table-column>
      <el-table-column prop="ip" show-overflow-tooltip label="故障IP">
      </el-table-column>
      <el-table-column prop="act" show-overflow-tooltip label="故障操作">
        <template #default="scope">
          <span v-if="scope.row.act == 0">不切换</span>
          <span v-if="scope.row.act == 1">暂停解析</span>
          <span v-if="scope.row.act == 2">切换备用</span>
          <span v-if="scope.row.act == 3">智能切换</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" show-overflow-tooltip label="状态">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.state == 1">故障恢复</el-tag>
          <el-tag type="warning" v-else>故障发生</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="rtime" show-overflow-tooltip label="开始时间">
      </el-table-column>
      <el-table-column prop="tn" show-overflow-tooltip label="持续时间" width="180">
      </el-table-column>
    </el-table>
    <div class="footer-page" style="margin-top: 20px;">
      <el-pagination style="width:100%;text-align:right" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 30, 50, 100, 500, 1000]"
        :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="count" background
        :pager-count="5"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      monList: [],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      checked: true,
      formLabelWidth: "15%",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        textarea: ""
      },
      dialogFormVisible: false,
      multipleSelection: [],
      currentPage: 1,
      pagesize: 10,
      count: 0
    };
  },
  computed: {},
  watch: {},
  methods: {
    getMonList() {
      this.$request({
        url: '/mon/log',
        params: {
          page: this.currentPage,
          pagesize: this.pagesize
        }
      }).then(res => {
        if (res.data.rec == 0) {
          this.monList = res.data.data.list
          this.count = res.data.data.count
        } else {
          this.$message.error(res.data.msg);
        }

      })
    },
    toggleAll() {
      this.$refs.multipleTable.toggleAllSelection()
    },
    fun({ columnIndex }) {
      if (columnIndex !== 7)
        return {
          height: '50px',
          background: "#0164F6",
          color: "#fff"
        };
      if (columnIndex == 7) {
        return {
          height: '50px',
          "text-align": "right",
          background: "#0164F6",
          color: "#fff",
          "padding-right": "10px"
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
      this.getMonList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getMonList()
    }
  },
  created() {
    this.getMonList()
  },
  mounted() { }
};
</script>
<style lang='less' scoped>
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

.cansel {
  background-color: #fff;
}

.confirm {
  background-color: #0164F6;
  color: #fff !important;
}

.dialog {

  .el-textarea,
  .el-input,
  .el-select {
    width: 85% !important;
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
  justify-content: space-between;
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
}</style>