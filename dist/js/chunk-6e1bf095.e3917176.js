(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e1bf095"],{"4df9":function(e,t,s){"use strict";s("cf0b")},cf0b:function(e,t,s){},fa8c:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"user-container"},[t("div",{staticClass:"main-title"},[e._v("用户管理")]),t("el-card",[t("div",{staticClass:"row1"},[t("div",[t("el-button",{staticClass:"space add-device addUser",on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("添加用户")]),t("el-dialog",{attrs:{title:"添加用户",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[t("el-form",{ref:"userFormList",attrs:{model:e.userForm,rules:e.rules}},[t("el-form-item",{attrs:{label:"用户名：","label-width":e.formLabelWidth,prop:"name"}},[t("el-input",{attrs:{placeholder:"输入邮箱或手机号",autocomplete:"off"},model:{value:e.userForm.name,callback:function(t){e.$set(e.userForm,"name",t)},expression:"userForm.name"}})],1),t("el-form-item",{attrs:{label:"密码：","label-width":e.formLabelWidth,prop:"pw"}},[t("el-input",{attrs:{placeholder:"输入密码",autocomplete:"off"},model:{value:e.userForm.pw,callback:function(t){e.$set(e.userForm,"pw",t)},expression:"userForm.pw"}})],1),t("el-form-item",{attrs:{label:"用户组","label-width":e.formLabelWidth,prop:"gid"}},[t("el-radio",{attrs:{label:"0"},model:{value:e.userForm.gid,callback:function(t){e.$set(e.userForm,"gid",t)},expression:"userForm.gid"}},[e._v("普通用户")]),t("el-radio",{attrs:{label:"1"},model:{value:e.userForm.gid,callback:function(t){e.$set(e.userForm,"gid",t)},expression:"userForm.gid"}},[e._v("管理员")])],1),t("el-form-item",{attrs:{label:"NS组：","label-width":e.formLabelWidth,prop:"nid"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.userForm.nid,callback:function(t){e.$set(e.userForm,"nid",t)},expression:"userForm.nid"}},e._l(e.nsList,(function(e,s){return t("el-option",{key:s,attrs:{label:e.name,value:e.id}})})),1)],1)],1),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.addUser}},[e._v("确 定")])],1)],1)],1),t("div",[t("el-input",{staticClass:"space",attrs:{placeholder:"用户名或手机号"},model:{value:e.searchVal,callback:function(t){e.searchVal=t},expression:"searchVal"}}),t("el-button",{staticStyle:{padding:"10px 15px",color:"#0164F6",border:"1px solid #0164F6"},attrs:{plain:""},on:{click:e.search}},[e._v("搜索")])],1)])]),t("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{size:"small","header-cell-style":e.fun,stripe:"",data:e.userList,"tooltip-effect":"dark"}},[t("el-table-column",{attrs:{width:"3"}}),t("el-table-column",{attrs:{prop:"id",label:"ID",width:"50"}}),t("el-table-column",{attrs:{prop:"user",label:"用户名",width:"120","show-overflow-tooltip":""}}),t("el-table-column",{attrs:{prop:"gid","show-overflow-tooltip":"",label:"用户组",width:"100"},scopedSlots:e._u([{key:"default",fn:function(s){return[t("span",{attrs:{type:"success"}},[e._v(e._s(1==s.row.gid?"管理员":"普通用户"))])]}}])}),t("el-table-column",{attrs:{prop:"cny",label:"余额",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.cny)+"元 ")]}}])}),t("el-table-column",{attrs:{prop:"email",label:"邮箱",width:"160","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(s){return[t("span",{attrs:{type:"success"}},[e._v(e._s(s.row.email))])]}}])}),t("el-table-column",{attrs:{prop:"phone",label:"手机号",width:"160","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(s){return[t("span",{attrs:{type:"success"}},[e._v(e._s(s.row.phone))])]}}])}),t("el-table-column",{attrs:{prop:"isx",label:"实名",width:"100"},scopedSlots:e._u([{key:"default",fn:function(s){return[0==s.row.isx?t("el-tag",{attrs:{type:"warning"}},[e._v("未提交")]):e._e(),1==s.row.isx?t("el-tag",{attrs:{type:"success"}},[e._v("已提交")]):e._e()]}}])}),t("el-table-column",{attrs:{prop:"nid",label:"NS组",width:"100"}}),t("el-table-column",{attrs:{prop:"state","show-overflow-tooltip":"",label:"状态",width:"100"},scopedSlots:e._u([{key:"default",fn:function(s){return[0==s.row.state?t("el-tag",{attrs:{type:"success"}},[e._v("正常")]):e._e(),1==s.row.state?t("el-tag",{attrs:{type:"warning"}},[e._v("锁定")]):e._e()]}}])}),t("el-table-column",{attrs:{prop:"rtime",label:"时间",width:"130"}}),t("el-table-column",{attrs:{label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(s){return[t("div",[1!=s.row.gid?t("el-button",{attrs:{type:"text"},on:{click:function(t){return e.info(s.row.id)}}},[e._v("查看")]):e._e(),e._v("  "),t("el-dropdown",{staticClass:"more",attrs:{placement:"bottom"}},[t("el-button",{attrs:{type:"text"}},[e._v(" 更多 "),t("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t("el-dropdown-menu",{staticClass:"drop",attrs:{slot:"dropdown"},slot:"dropdown"},[t("div",{staticClass:"more-list"},[t("el-dropdown-item",{nativeOn:{click:function(t){return e.addCny(s.row)}}},[e._v("充值")]),t("el-dialog",{attrs:{title:"充值扣款",visible:e.paydialogFormVisible,"append-to-body":!0},on:{"update:visible":function(t){e.paydialogFormVisible=t}}},[t("el-form",{attrs:{model:e.payForm,rules:e.payrules}},[t("el-form-item",{attrs:{label:"类型：","label-width":e.formLabelWidth,prop:"pt"}},[t("el-radio-group",{staticClass:"shuru",attrs:{clearable:""},model:{value:e.payForm.pt,callback:function(t){e.$set(e.payForm,"pt",t)},expression:"payForm.pt"}},[t("el-radio",{attrs:{label:0}},[e._v("充值")]),t("el-radio",{attrs:{label:1}},[e._v("扣款")])],1)],1),t("el-form-item",{attrs:{label:"充值金额：","label-width":e.formLabelWidth,prop:"cny"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"输入充值金额",autocomplete:"off"},model:{value:e.payForm.cny,callback:function(t){e.$set(e.payForm,"cny",t)},expression:"payForm.cny"}})],1),t("el-form-item",{attrs:{label:"备注：","label-width":e.formLabelWidth,prop:"note"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"备注",autocomplete:"off"},model:{value:e.payForm.note,callback:function(t){e.$set(e.payForm,"note",t)},expression:"payForm.note"}})],1)],1),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.paydialogFormVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.userPay}},[e._v("确 定")])],1)],1),e._v("  "),t("el-dropdown-item",{nativeOn:{click:function(t){return e.lesCny(s.row)}}},[e._v("扣款")]),t("el-dropdown-item",{staticStyle:{"margin-right":"10px"},nativeOn:{click:function(t){return e.update(s.row.id)}}},[e._v("修改")]),t("el-dialog",{attrs:{title:"修改用户",visible:e.updaeteFormVisible,"append-to-body":!0},on:{"update:visible":function(t){e.updaeteFormVisible=t}}},[t("el-form",{ref:"updateUserFormList",attrs:{model:e.updateList,rules:e.updateFormRules}},[t("el-form-item",{attrs:{label:"用户名：","label-width":e.formLabelWidth,prop:"pw"}},[e._v(e._s(e.updateList.user))]),t("el-form-item",{attrs:{label:"密码：","label-width":e.formLabelWidth,prop:"pw"}},[t("el-input",{staticClass:"pw",attrs:{autocomplete:"off"},model:{value:e.pw,callback:function(t){e.pw=t},expression:"pw"}})],1),t("el-form-item",{attrs:{label:"用户组：","label-width":e.formLabelWidth,prop:"gid"}},[t("el-radio",{attrs:{label:10},model:{value:e.updateList.gid,callback:function(t){e.$set(e.updateList,"gid",t)},expression:"updateList.gid"}},[e._v("普通用户")]),t("el-radio",{attrs:{label:1},model:{value:e.updateList.gid,callback:function(t){e.$set(e.updateList,"gid",t)},expression:"updateList.gid"}},[e._v("管理员")])],1),t("el-form-item",{attrs:{label:"状态：","label-width":e.formLabelWidth,prop:"state"}},[t("el-radio",{attrs:{label:0},model:{value:e.updateList.state,callback:function(t){e.$set(e.updateList,"state",t)},expression:"updateList.state"}},[e._v("正常")]),t("el-radio",{attrs:{label:1},model:{value:e.updateList.state,callback:function(t){e.$set(e.updateList,"state",t)},expression:"updateList.state"}},[e._v("锁定")])],1)],1),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.updaeteFormVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("确 定")])],1)],1),t("el-dropdown-item",{nativeOn:{click:function(t){return e.del(s.row.id)}}},[e._v("删除")])],1)])],1)],1)]}}])})],1),t("el-dialog",{attrs:{title:"用户信息",visible:e.dialogInfo},on:{"update:visible":function(t){e.dialogInfo=t}}},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"status-icon":"",rules:e.rules1,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"姓名",prop:"xm"}},[t("el-input",{attrs:{placeholder:"请输入真实姓名"},model:{value:e.ruleForm.xm,callback:function(t){e.$set(e.ruleForm,"xm",t)},expression:"ruleForm.xm"}})],1),t("el-form-item",{attrs:{label:"身份证号",prop:"sfz"}},[t("el-input",{attrs:{placeholder:"请输入身份证号"},model:{value:e.ruleForm.sfz,callback:function(t){e.$set(e.ruleForm,"sfz",t)},expression:"ruleForm.sfz"}})],1),t("el-form-item",{attrs:{label:"身份证上传",prop:"sfz1"}},[e.ruleForm.pic1?t("div",[t("img",{staticStyle:{width:"150px",height:"150px","margin-right":"10px"},attrs:{src:e.ruleForm.pic1,alt:""}}),t("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:e.ruleForm.pic2,alt:""}})]):t("div",[e._v(" 暂无图片 ")])]),1==e.ruleForm.isx?t("div",[t("el-button",{staticStyle:{width:"100px",margin:"6px 180px"},attrs:{type:"primary"},on:{click:function(t){return e.reset(e.ruleForm.id)}}},[e._v("重 置")])],1):e._e()],1)],1),t("div",{staticClass:"footer-page",staticStyle:{"margin-top":"20px","text-align":"right"}},[t("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,30,50,100],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.count,background:"","pager-count":5},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},r=[],l={name:"",components:{},data(){return{ruleForm:{id:"",xm:"",sfz:"",isx:!1,pic1:"",pic2:""},rules1:{xm:[{required:!0,message:"请输入姓名",trigger:"blur"}],sfz:[{required:!0,message:"请输入身份证号",trigger:"blur"}],sfz1:[{required:!0,message:"请上传身份证",trigger:"blur"}]},rules:{name:[{required:!0,message:"请输入用户名",trigger:"blur"}],pw:[{required:!0,message:"请选择密码",trigger:"blur"}],gid:[{required:!0,message:"请选择角色",trigger:"blur"}]},payrules:{cny:[{required:!0,message:"请输入金额",trigger:"blur"}]},updateFormRules:{state:[{required:!0,message:"请输入用户名",trigger:"blur"}],gid:[{required:!0,message:"请选择角色",trigger:"blur"}]},userList:[],payForm:[],nsList:[],currentPage:1,formLabelWidth:"120px",userForm:{name:"",pw:"",gid:"0"},pw:"",dialogFormVisible:!1,paydialogFormVisible:!1,updaeteFormVisible:!1,count:0,pagesize:10,updateList:{},dialogInfo:!1,searchVal:""}},computed:{},watch:{},methods:{getNsList(){this.$request({url:"/domain/ns/list"}).then(e=>{0==e.data.rec?this.nsList=e.data.data.list:this.$message.error(e.data.msg)})},reset(e){this.$request({url:"/user/verify/reset",params:{id:e}}).then(e=>{0==e.data.rec?this.$message.success(e.data.msg):this.$message.error(e.data.msg)})},info(e){this.dialogInfo=!0,this.$request({url:"/user/verify/view",params:{id:e}}).then(e=>{0==e.data.rec?this.ruleForm=e.data.data:this.ruleForm={}})},addCny(e){this.paydialogFormVisible=!0,this.payForm=e,this.payForm.cny=0,this.payForm.pt=0},lesCny(e){this.paydialogFormVisible=!0,this.payForm=e,this.payForm.cny=0,this.payForm.pt=1},userPay(){this.$request({url:"/user/cny",params:this.payForm}).then(e=>{this.getUserList(),0==e.data.rec?(this.paydialogFormVisible=!1,this.$message.success(e.data.msg)):this.$message.error(e.data.msg)})},addUser(){this.dialogFormVisible=!1,this.$request({url:"/user/add",params:this.userForm}).then(e=>{this.getUserList(),0==e.data.rec?(this.$refs.userFormList.resetFields(),this.$message.success("添加成功")):this.$message.error(e.data.msg)})},search(){this.getUserList()},getUserList(){this.searchVal;this.$request({url:"/user/list",params:{page:this.currentPage,pagesize:this.pagesize,search:this.searchVal}}).then(e=>{0==e.data.rec?(this.userList=e.data.data.list,this.count=e.data.data.count):this.$message.error(e.data.msg)})},fun({columnIndex:e}){return{background:"#0164F6",color:"#fff",height:"50px","padding-right":"40px"}},del(e){this.$confirm("是否删除该用户?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.$request({url:"/user/del",params:{id:e}}).then(e=>{0==e.data.rec?(this.$message.success("删除成功"),this.getUserList()):this.$message.error(e.data.msg)})}).catch(()=>{this.$message({type:"info",message:"已取消删除"})})},update(e){this.updaeteFormVisible=!0,this.$request({url:"/user/view",params:{id:e}}).then(e=>{0==e.data.rec?this.updateList=e.data.data:this.$message.error(e.data.msg)})},submitForm(){this.updateList.pw=this.pw,this.$request({url:"/user/edit",params:this.updateList}).then(e=>{0==e.data.rec?(this.$message.success("修改用信息成功"),this.updaeteFormVisible=!1,this.getUserList()):this.$message.error(e.data.msg)})},handleSizeChange(e){this.pagesize=e,this.getUserList()},handleCurrentChange(e){this.currentPage=e,this.getUserList()}},created(){this.getUserList(),this.getNsList()},mounted(){}},i=l,o=(s("4df9"),s("2877")),n=Object(o["a"])(i,a,r,!1,null,null,null);t["default"]=n.exports}}]);