<template>
  <div class>
    <div class="control">批量操作</div>
    <el-card class="box-card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="添加域名" name="first">
          <div class="domin-list">
            <span class="same">添加域名</span>
            <el-input type="textarea" :rows="8" placeholder="请输入域名，每行一个" v-model="form1.big" class="area"></el-input>
            <span class="hui">每行一个域名</span>
          </div>
          <div class="domin-list mid">
            <span class="same">加入分组</span>
            <el-select v-model="form1.gid" placeholder="选择分组" filterable allow-create>
              <el-option label="默认" value="0"></el-option>
              <el-option v-for="(item, i) in groupList" :key="i" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <span class="hui">选择加入到分组</span>
          </div>
          <div class="domin-list mid" v-if="gid1 == 1">
            <span class="same">指定用户</span>
            <el-select v-model="form1.uid" placeholder="选择用户" filterable allow-create>
              <el-option label="默认" value="0"></el-option>
              <el-option v-for="(item, i) in userList" :key="i" :label="item.user" :value="item.id"></el-option>
            </el-select>
            <span class="hui">指定添加域名的所属用户</span>
          </div>
          <!-- <div class="domin-list bottom">
            <span class="same">加入分组</span>
            <div>
              <div class="hui">
                若您要同时批量添加域名和解析，不妨直接使用批量
                <el-button type="text">添加解析</el-button>功能。
              </div>
              <div class="hui">
                批量操作中的3种
                <el-button type="text">添加解析</el-button>功能均支持自动添加新域名。
              </div>
            </div>
          </div>-->
          <div class="domin-list">
            <span class="opsity same">加入分组</span>
            <el-button type="primary" class="bottom-sub" @click="submit1">提交</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="删除域名" name="firstdel">
          <div class="domin-list">
            <span class="same">删除域名</span>
            <el-input type="textarea" :rows="11" placeholder="请输入域名，每行一个" v-model="formdel.big" class="area"></el-input>
            <span class="hui">每行一个域名</span>
          </div>
          <div class="domin-list">
            <span class="opsity same"></span>
            <el-button type="primary" class="bottom-sub" @click="submitdel">提交</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="添加解析" name="second">
          <!--<el-alert title="功能说明" type="success" description="为每个目标域名各添加多组相同的解析记录。"></el-alert>-->
          <div class="domin-list">
            <span class="same">目标域名</span>
            <el-input type="textarea" :rows="8" placeholder="请输入域名，每行一个" v-model="tetx"></el-input>
            <!--<span>若输入的目标域名不存在，将自动添加该域名到库中；</span>-->
            <span class="hui">每行1个域名，若不存在则自动添加</span>
          </div>
          <!-- <div class="domin-list" style="margin-top:10px">
            <span class="opsity same">加入分组</span>
            <el-select v-model="value" clearable placeholder="从分组导入域名">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>-->
          <div class="domin-list bottom">
            <span class="same">解析记录</span>
            <div>
              <div style="display:flex;align-items:flex-end">
                <el-table size="small" :data="form2" border style="width: 100%">
                  <el-table-column label="主机记录" width="120">
                    <template #default="scope">
                      <el-input v-model="scope.row.host" placeholder="主机记录"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="类型" width="120">
                    <template #default="scope">
                      <el-select v-model="scope.row.sort" placeholder="请选择" style="width:auto;margin:0">
                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                          :value="item.value"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column width="120" show-overflow-tooltip label="线路">
                    <template #default="scope">
                      <el-cascader :show-all-levels="false" :options="region"
                        :props="{ expandTrigger: 'hover', checkStrictly: true }" v-model="scope.row.region"></el-cascader>
                    </template>
                  </el-table-column>
                  <el-table-column label="记录值" width="180">
                    <template #default="scope">
                      <el-input v-model="scope.row.val" placeholder="记录值"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="MX">
                    <template #default="scope">
                      <el-input v-model="scope.row.pre"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="TTL" width="100">
                    <template #default="scope">
                      <el-input v-model="scope.row.ttl"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
                <i @click="addRecord" class="add-btn-1">+</i>
              </div>
              <!--
              <div class="part">解析权重值：1.类型限制：A、CNAME、AAAA；2.限付费域名使用；3.权重值区间：1~10的整数，数字越大权重值越高</div>
              <div>MX值：1~55的整数</div>-->
              <div style="margin-top:30px">
                <el-checkbox v-model="form2.cla">清空原有记录</el-checkbox>
                <span style="margin-left:20px;color:red">注意 : 勾选后，目标域名原有解析记录将被清空</span>
              </div>
            </div>
          </div>
          <div class="domin-list mid" v-if="gid1 == 1">
            <span class="same">指定用户</span>
            <el-select v-model="form1.uid" placeholder="选择用户" filterable allow-create>
              <el-option label="默认" value="0"></el-option>
              <el-option v-for="(item, i) in userList" :key="i" :label="item.user" :value="item.id"></el-option>
            </el-select>
            <span class="hui">指定添加域名解析的所属用户</span>
          </div>
          <div class="domin-list">
            <span class="opsity same">加入分组</span>
            <el-button type="primary" class="bottom-sub" @click="submit2">提交</el-button>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="添加解析(一对一)" name="third">
          <el-alert
            title="功能说明"
            type="success"
            description="为每个目标域名添加一组相同主机头的解析记录，其记录值与其行号相同的域名一一对应。"
          ></el-alert>
          <div class="domin-list">
            <span class="same">目标域名</span>
            <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="tetx"></el-input>
            <span class="hui">若输入的目标域名不存在，将自动添加该域名到库中；</span>
            <span class="hui" style="position:absolute;top:30px;left:447px">每行1个域名，上限1000个。</span>
          </div>
          <div class="domin-list" style="margin-top:10px">
            <span class="opsity same">加入分组</span>
            <el-select v-model="value" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="domin-list">
            <span class="same">记录设置</span>
            <el-select v-model="value" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="hui" style="position:absolute;top:-2px;left:447px">为所有目标域名添加一组相同的主机记录；</span>
            <span class="hui" style="position:absolute;top:15px;left:447px">最多输入5个主机记录，用英文逗号“,”隔开；</span>
          </div>
          <div class="domin-list" style="margin-top:10px">
            <span class="opsity same">加入分组</span>
            <el-select v-model="value" clearable placeholder="请选择" class="record-list">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="value" clearable placeholder="请选择" class="record-list">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="domin-list" style="margin-top:10px">
            <span class="opsity same">目标域名</span>
            <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="tetx"></el-input>
            <span class="hui">每个域名对应添加相同行号的解析记录。</span>
          </div>
          <div class="domin-list" style="display:flex;margin-top:10px">
            <el-input placeholder="请输入内容" v-model="tetx" style="width:195px;margin:0 20px 0 105px"></el-input>
            <el-input placeholder="请输入内容" v-model="tetx" style="width:195px;margin-right:20px"></el-input>
            <div class="hui" style="display:flex;flex-direction:column">
              <span>解析权重值：1.类型限制：A、CNAME、AAAA；2.限付费域名使用；3.权重值区间：1~10的整数，数字越大权重值越高</span>
              <span>MX值：1~55的整数</span>
            </div>
          </div>
          <div style="margin-top:30px" class="bottom">
            <span class="opsity same">目标域名</span>
            <el-checkbox v-model="checked">清空目标域名原有的解析记录</el-checkbox>
            <span style="margin-left:20px;color:red">注意 : 勾选该项后，目标域名原有解析记录将被清空</span>
          </div>
          <div class="domin-list">
            <span class="opsity same">加入分组</span>
            <el-button type="primary" class="bottom-sub">提交</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="添加解析(自定义)" name="fourth">
          <div class="domin-list bottom">
            <span class="same">添加域名</span>
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="tetx"
              style="width:550px;margin-left:0"
            ></el-input>
            <div class="hui">
              <div style="margin-bottom:20px">一行一条记录，内容用“空格”分隔，上限5000个记录。</div>
              <div style="margin-bottom:20px">
                示例：
                <br />dns.com @ A 1.1.1.1
                <br />dns.com * CNAME www.boce.com 2 电信
              </div>
              <div style="margin-bottom:20px">
                提示：
                <br />· MX和线路可不填，默认为“1”和“默认”。
              </div>
            </div>
          </div>
          <div class="domin-list">
            <span class="opsity same">加入分组</span>
            <el-button type="primary" class="bottom-sub">提交</el-button>
          </div>
        </el-tab-pane>-->

        <el-tab-pane label="修改解析" name="fourt">
          <div class="domin-list">
            <span class="same">目标域名</span>
            <el-input type="textarea" :rows="8" placeholder="请输入域名，每行一个" v-model="updateForm.domain"></el-input>
            <!--<span class="hui">若输入的目标域名不存在，将自动添加该域名到库中；</span>-->

            <span class="hui" style="position:absolute;top:30px;left:476px">每行1个域名</span>
          </div>
          <div class="domin-list" style="margin-top:10px">
            <span class="opsity same">加入分组</span>
            <el-select v-model="value" clearable placeholder="从分组导入域名" filterable allow-create>
              <el-option v-for="(item, i) in groupList" :key="i" :label="item.name" :value="item.id"
                @click.native="sel(item.id)"></el-option>
            </el-select>
          </div>
          <div class="domin-list">
            <span class="same">检索条件</span>
            <el-input style="width:165px;margin:0 20px;" placeholder="主机名(选填)" v-model="updateForm.chost"></el-input>
            <el-input style="width:165px;margin-right:20px" placeholder="记录值(选填)" v-model="updateForm.cval"></el-input>
            <span class="hui">检索目标域名中满足条件的解析记录。</span>
          </div>
          <div class="domin-list">
            <span class="opsity same">检索条件</span>
            <el-select v-model="updateForm.qt" clearable style="width:165px;">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-cascader style="width:165px" :show-all-levels="false" :options="region" v-model="updateForm.view"
              :props="{ expandTrigger: 'hover', checkStrictly: true }"></el-cascader>
          </div>
          <div class="domin-list">
            <span>修改后的记录</span>
            <el-input style="width:165px;margin:0 20px;" v-model="updateForm.nval" placeholder="新记录值"></el-input>
            <el-select clearable style="width:165px;margin-left:0" v-model="updateForm.nqt">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span class="hui">将检索出的解析记录修改为指定的值。</span>
          </div>
          <!-- <div style="margin-top:30px" class="bottom">
            <span class="opsity same">目标域名</span>
            <el-checkbox v-model="checked">清空目标域名原有的解析记录</el-checkbox>
            <span style="margin-left:20px;color:red">注意 : 勾选该项后，目标域名原有解析记录将被清空</span>
          </div>-->

          <div class="domin-list">
            <span class="opsity same">加入分组</span>
            <el-button type="primary" class="bottom-sub" @click="Update">提交</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="删除/启用/暂停" name="four">
          <div class="domin-list">
            <span class="same">目标域名</span>
            <el-input type="textarea" :rows="8" placeholder="请输入域名，每行一个" v-model="updateForm1.domain"></el-input>
            <!--<span class="hui">若输入的目标域名不存在，将自动添加该域名到库中；</span>-->
            <span class="hui" style="position:absolute;top:30px;left:476px">每行1个域名</span>
          </div>
          <div class="domin-list" style="margin-top:10px">
            <span class="opsity same">加入分组</span>
            <el-select v-model="value" clearable placeholder="从分组导入域名" filterable allow-create>
              <el-option v-for="(item, i) in groupList" :key="i" :label="item.name" :value="item.id"
                @click.native="sel1(item.id)"></el-option>
            </el-select>
          </div>
          <div class="domin-list">
            <span class="same">检索条件</span>
            <el-input style="width:165px;margin:0 20px;" placeholder="主机名(选填)" v-model="updateForm1.chost"></el-input>
            <el-input style="width:165px;margin-right:20px" placeholder="记录值(选填)" v-model="updateForm1.cval"></el-input>
            <span class="hui">检索目标域名中满足条件的解析记录。</span>
          </div>
          <div class="domin-list">
            <span class="opsity same">检索条件</span>
            <el-select v-model="updateForm1.qt" clearable style="width:165px;">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-cascader style="width:165px" :show-all-levels="false" :options="region" v-model="updateForm1.view"
              :props="{ expandTrigger: 'hover', checkStrictly: true }"></el-cascader>
          </div>
          <div class="domin-list">
            <span class="same" style="margin-right:20px">操作</span>
            <el-radio-group v-model="updateForm1.act" style="margin-right:153px">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="2">暂停</el-radio>
              <el-radio :label="3">删除</el-radio>
            </el-radio-group>
            <span class="hui">对检索出的解析记录进行指定操作。</span>
          </div>
          <div class="domin-list">
            <span class="opsity same">加入分组</span>
            <el-button type="primary" class="bottom-sub" @click="update1">提交</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="批量添加解析或导入" name="five">
          <div class="domin-list">
            <span class="same">域名记录</span>
            <el-input type="textarea" :rows="10" placeholder="请输入解析记录，每行一条，用空格分开" v-model="form5.record"
              class="area"></el-input>
            <span class="hui">格式：域名 主机名 类型 记录值 TTL MX 如:dnsbm.com www A 127.0.0.1 600 1</span>
          </div>
          <div class="domin-list">
            <span class="same">分隔符</span>
            <el-input style="width:165px;margin:0 20px;" v-model="form5.sep" placeholder="指定分隔符"></el-input>
            <span class="hui">默认分隔符为空格，可指定分隔符，如"|"，默认请留空</span>
          </div>
          <div class="domin-list">
            <span class="opsity same"></span>
            <el-button type="primary" class="bottom-sub" @click="submit5">确定提交</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="文件导入" name="fnimport">
          <el-alert class="desc-import" title="说明" description="该导入文件只限于使用本系统导出的域名及记录文件"></el-alert>
          <el-form :model="formImp" :rules="uploadImpRules" ref="formImp">
            <el-form-item label="文件导入" prop="fn">
              <el-upload v-if="formImp.fn == ''" list-type="text" :limit="2" action="" :http-request="uploadImp"
                ref="formImpfn">
                <div class="btn-upload">+</div>
              </el-upload>
              <div v-else>
                <img :src="formImp.fn" alt="" style="width:150px;height:150px;margin-right:10px">
              </div>
            </el-form-item>
            <el-form-item>
              <el-button style="width:75px;margin:10px 90px" type="primary" @click="submitImp">确定</el-button>
            </el-form-item>
          </el-form>
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
      updateForm: {
        domain: "",
        chost: "",
        cval: "",
        qt: "A",
        view: 9000,
        nval: "",
        nqt: "A"
      },
      updateForm1: {
        act: '',
        domain: "",
        chost: "",
        cval: "",
        qt: "A",
        view: 9000
      },
      options: [
        {
          value: "A",
          label: "A"
        },
        {
          value: "NS",
          label: "NS"
        },
        {
          value: "CNAME",
          label: "CNAME"
        },
        {
          value: "MX",
          label: "MX"
        },
        {
          value: "TXT",
          label: "TXT"
        },
        {
          value: "AAAA",
          label: "AAAA"
        },
        {
          value: "SRV",
          label: "SRV"
        },
        {
          value: "CAA",
          label: "CAA"
        }
      ],
      groupList: [],
      userList: [],
      form1: {
        big: "",
        gid: "",
        uid: ""
      },
      formdel: {
        big: ""
      },
      form2: [
        {
          host: "",
          sort: "A",
          region: 9000,
          val: "",
          pre: "1",
          ttl: localStorage.getItem('ttl'),
          cla: 1,
          uid: ""
        },
      ],
      form5: {
        record: "",
        sep: ""
      },
      formImp: {
        fn: ""
      },
      uploadImpRules: {
        fn: [{ required: true, message: "请输选择记录文件", trigger: "blur" }]
      },
      multipleSelection: [],
      currentPage4: 4,
      tetx: "",
      value: "",
      activeName: "first",
      inner: 1,
      checked: 0,
      fic: 0,
      fileDr: [],
      radio: "1",
      region: [],
      gid1: ""
    };
  },
  computed: {},
  watch: {},
  methods: {
    uploadImp(file) {
      this.fileDr.push(file);
      this.fic++;
    },
    submitImp() {
      if (this.fic != 1) {
        this.$message.error("请选择文件");
        return;
      }
      var formData = new FormData;
      formData.append('fn', this.fileDr[0].file);
      this.$request({
        url: "/domain/record/import",
        data: formData,
        method: 'post',
        headers: { 'Content-Type': "multipart/form-data" }
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
          this.$refs.formImpfn.clearFiles();
          this.fic = 0;
        }
      });
    },
    // 增加记录
    addRecord() {
      var obj = {
        host: "",
        sort: "A",
        region: 9000,
        val: "",
        pre: "1",
        ttl: localStorage.getItem('ttl'),
        checked: true
      }
      this.form2.push(obj)
    },
    // 获取组的所有域名
    sel(id) {
      this.$request({
        url: "/domain/group/domain",
        params: { id }
      }).then(res => {
        var domain = res.data.data.list.map(i => {
          return i.name
        })
        //console.log(domain.toString)
        this.updateForm.domain = domain.toString().replace(/,/g, '\n')
      });
    },
    // 获取组的所有域名
    sel1(id) {
      this.$request({
        url: "/domain/group/domain",
        params: { id }
      }).then(res => {
        var domain = res.data.data.list.map(i => {
          return i.name
        })
        //console.log(domain.toString)
        this.updateForm1.domain = domain.toString().replace(/,/g, '\n')
      });
    },
    // 批量删除修改暂停
    update1() {
      this.updateForm1.domain = this.updateForm1.domain.replace(/\s+/g, ",");
      this.updateForm1.view = this.updateForm1.view.toString();
      //console.log(this.updateForm.view.toString());
      this.$request({
        url: "/domain/batch/act",
        params: this.updateForm1
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
        }
      });
    },
    // 批量修改解析
    Update() {
      this.updateForm.domain = this.updateForm.domain.replace(/\s+/g, ",");
      this.updateForm.view = this.updateForm.view.toString();
      //console.log(this.updateForm.view.toString());
      this.$request({
        url: "/domain/batch/edit/record",
        params: this.updateForm
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
        }
      });
    },
    // 获取分组列表
    getGroupList() {
      this.$request({
        url: "/domain/group/list"
      }).then(res => {
        if (res.data.rec == 0) {
          this.groupList = res.data.data.list;
        } else {
          this.$message.error(res.data.msg);
        }

      });
    },
    // 用户列表
    getUser() {
      this.$request({
        url: "/user/list/short"
      }).then(res => {
        if (res.data.rec == 0) {
          this.userList = res.data.data.list;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    submit2() {
      var record = this.form2.reduce((prev, cur) => {
        return prev + cur.host + ',' + cur.sort + ',' + cur.val + ',' + cur.region + ',' + cur.ttl + ',' + cur.pre + ';'
      }, '')
      //console.log(record)
      this.$request({
        url: "/domain/record/batch",
        params: {
          domain: this.tetx.replace(/\s+/g, ","),
          record,
          cla: this.form2.cla,
          uid: this.form2.uid
        }
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success(res.data.msg)
          //this.$router.push("/domin/list");
        } else {
          this.$message.error(res.data.msg);
        }

      });
    },
    submit1() {
      this.$request({
        url: "/domain/batch",
        params: {
          domain: this.form1.big.replace(/\s+/g, ","),
          act: "add",
          gid: this.form1.gid,
          uid: this.form1.uid
        }
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success(res.data.msg);
          //this.$router.push("/domin/list");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    submitdel() {
      this.$request({
        url: "/domain/batch",
        params: {
          domain: this.formdel.big.replace(/\s+/g, ","),
          act: "del"
        }
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    submit5() {
      this.$request({
        url: "/domain/batch/add/record",
        params: {
          record: this.form5.record.replace(/\n/g, ";"),
          sep: this.form5.sep
        }
      }).then(res => {
        if (res.data.rec == 0) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
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
      //console.log(tab, event);
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.record) {
      next(vm => {
        vm.activeName = "second";
      });
    } else if (to.query.add) {
      next(vm => {
        vm.activeName = "first";
      });
    } else if (to.query.update) {
      next(vm => {
        vm.activeName = "fourt";
      });
    } else if (to.query.del) {
      next(vm => {
        vm.activeName = "four";
      });
    } else if (to.query.addr) {
      next(vm => {
        vm.activeName = "five";
      });
    } else if (to.query.deld) {
      next(vm => {
        vm.activeName = "firstdel";
      });
    } else {
      next(vm => {
        vm.activeName = "first";
      });
    }
  },
  created() {
    this.gid1 = localStorage.getItem("gid");
    if (this.gid1 == 1) {
      this.getUser();
    }
    this.getGroupList();
    this.$request({
      url: "/domain/region"
    }).then(res => {
      if (res.data.rec == 0) {
        this.region = JSON.parse(res.data.data);
      } else {
        this.$message.error(res.data.msg);
      }
    });
  },
  mounted() { }
};
</script>
<style lang='less' scoped>
/deep/.el-checkbox__input.is-checked+.el-checkbox__label {
  color: #0164F6;
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

.bottom {
  align-items: baseline;
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f1f2;

  span {
    margin-right: 20px;
  }
}

.domin-list {
  position: relative;
  margin-top: 30px;

  .el-textarea {
    width: 350px;
    vertical-align: top;
    margin: 0 20px;
  }

  .el-select {
    width: 350px;
    vertical-align: middle;
    margin: 0 20px;
  }
}

.control {
  line-height: 60px;
  font-weight: bold;
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

.add-btn-1 {
  margin-left: 10px;
  width: 44px;
  height: 44px;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #EDEFF5;
  color: #005AFF;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.desc-import {
  background: linear-gradient(270deg, rgba(48, 151, 255, .06) 0%, rgba(0, 90, 255, .06) 100%);
  margin-bottom: 20px;

  &,
  .el-alert__description {
    color: #1575FF !important;
  }
}

.btn-upload {
  width: 100px;
  height: 100px;
  background: rgba(48, 164, 255, .06);
  border-radius: 4px;
  border: 1px dashed #005AFF;
  color: #005AFF;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>