<template>
  <div class>
    <div class="main-title">操作日志</div>
    <el-card>
      <div class="row1">
        <div>
          <el-date-picker v-model="value1" type="daterange" range-separator="~" start-placeholder="开始日期"
            end-placeholder="结束日期" clear-icon></el-date-picker>
        </div>
        <div>
          <el-input class="space"></el-input>
          <el-button plain style="padding:10px 15px;color:#0164F6;border:1px solid #0164F6">搜索</el-button>
        </div>
      </div>
    </el-card>
    <el-table size="small" :header-cell-style="fun" stripe ref="multipleTable" :data="tableData" tooltip-effect="dark"
      style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column prop="name" label="IP地址" width="120"></el-table-column>
      <el-table-column prop="address" show-overflow-tooltip label="设备名称"></el-table-column>
      <el-table-column prop="address" show-overflow-tooltip label="运行状态"></el-table-column>
      <el-table-column prop="address" show-overflow-tooltip label="是否激活"></el-table-column>
      <el-table-column label="域名数" width="120" prop="date">
        <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
      </el-table-column>
      <el-table-column prop="address" label="记录数" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope>
          <div>
            <el-button type="text" @click="Towatch">监控</el-button>
            <el-button type="text" @click="Torecord">解析</el-button>
            <el-button type="text" @click="Tocount">统计</el-button>
            <el-dropdown class="more" placement="bottom">
              <el-button class type="text">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="drop">
                <div class="more-list">
                  <el-dropdown-item>删除&nbsp;&nbsp;&nbsp;&nbsp;</el-dropdown-item>
                  <span class="shu">|</span>
                  <el-dropdown-item>暂停</el-dropdown-item>
                  <el-dropdown-item>日志&nbsp;&nbsp;&nbsp;&nbsp;</el-dropdown-item>
                  <span class="shu">|</span>
                  <el-dropdown-item>过户</el-dropdown-item>
                  <el-dropdown-item>备注</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer-page" style="margin-top: 20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 30, 50, 100, 500, 1000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="count" background :pager-count="5"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      value1: '',
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海"
        }
      ],
      multipleSelection: [],
      currentPage4: 4,
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
      dialogFormVisible: false
    };
  },
  computed: {},
  watch: {},
  methods: {
    toggleAll() {
      this.$refs.multipleTable.toggleAllSelection();
    },
    fun({ columnIndex }) {
      if (columnIndex !== 7)
        return {
          background: "#0164F6",
          color: "#fff"
        };
      if (columnIndex == 7) {
        return {
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
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
    }
  },
  created() { },
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

/deep/.el-date-editor .el-range-separator {
  line-height: 26px;
  color: #999;
}

/deep/.el-date-table td.end-date span,
.el-date-table td.start-date span {
  background: #0164F6;
}

/deep/.el-range-editor.is-active,
.el-range-editor.is-active:hover {
  border: 1px solid #0164F6;
}
</style>