<template>
  <div class>
    <div class="main-title">登录日志</div>
    <el-table size="small" :header-cell-style="fun" stripe ref="multipleTable" :data="loginData" tooltip-effect="dark"
      @selection-change="handleSelectionChange">
      <el-table-column prop="" label="" width="30"></el-table-column>
      <el-table-column prop="id" label="序号" width="120"></el-table-column>
      <el-table-column prop="uid" show-overflow-tooltip label="用户" width="200">
        <template #default="scope">
          <el-button type="text" size="mini" icon="el-icon-user" v-if="uid == 0"
            @click="selectUid(scope.row.uid)"></el-button>
          <el-button type="text" v-if="uid > 0" size="mini" icon="el-icon-user-solid" @click="selectUid(0)"></el-button>
          {{ scope.row.uname }}
        </template>
      </el-table-column>
      <el-table-column prop="ip" show-overflow-tooltip label="IP" width="300">
      </el-table-column>
      <el-table-column prop="msg" show-overflow-tooltip label="内容" width="300">
      </el-table-column>
      <el-table-column prop="rtime" label="时间"></el-table-column>
    </el-table>
    <div class="footer-page" style="margin-top: 20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 30, 50, 100, 500, 1000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="count" background :pager-count="5" style="width:100%;text-align:right"></el-pagination>
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
      uid: 0,
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
      dialogFormVisible: false
    };
  },
  computed: {},
  watch: {},
  methods: {
    selectUid(id) {
      this.uid = id;
      this.currentPage = 1;
      this.getLoginLog();
    },
    // 获取登陆日志列表
    getLoginLog() {
      this.$request({
        url: '/user/loginlog',
        params: {
          page: this.currentPage,
          pagesize: this.pagesize,
          uid: this.uid
        }
      }).then(res => {
        if (res.data.rec == 0) {
          this.loginData = res.data.data.list
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
      if (columnIndex !== 7 && columnIndex != 0)
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
      this.getLoginLog()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getLoginLog()
    }
  },
  created() {
    this.getLoginLog()
  },
  mounted() { }
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