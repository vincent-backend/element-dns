(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6706e3e0"],{"3f4f":function(t,e,i){},a3ca:function(t,e,i){"use strict";i("3f4f")},bb31:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t._self._c;return e("div",{},[e("div",{staticClass:"main-title"},[t._v("套餐列表")]),e("div",{staticClass:"header-container"},[e("div",{staticClass:"header-container-left"},[e("el-button",{attrs:{type:"primary"},on:{click:function(e){t.addDialogFormVisible=!0}}},[t._v("添加套餐")]),e("el-dialog",{attrs:{title:"添加套餐",visible:t.addDialogFormVisible,top:"1vh"},on:{"update:visible":function(e){t.addDialogFormVisible=e}}},[e("el-form",{ref:"addDevice",attrs:{model:t.form,rules:t.deviceRules}},[e("el-form-item",{attrs:{label:"名称：","label-width":t.formLabelWidth,prop:"name"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"套餐名称"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),e("el-form-item",{attrs:{label:"NS组：","label-width":t.formLabelWidth,prop:"lid"}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.nid,callback:function(e){t.$set(t.form,"nid",e)},expression:"form.nid"}},t._l(t.form.nidlist,(function(t,i){return e("el-option",{key:i,attrs:{label:t.name,value:t.id}})})),1)],1),e("el-form-item",{attrs:{label:"价格：","label-width":t.formLabelWidth,prop:"p1"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"价格"},model:{value:t.form.p1,callback:function(e){t.$set(t.form,"p1",e)},expression:"form.p1"}})],1),e("el-form-item",{attrs:{label:"优惠价：","label-width":t.formLabelWidth,prop:"p2"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"优惠价"},model:{value:t.form.p2,callback:function(e){t.$set(t.form,"p2",e)},expression:"form.p2"}})],1),e("el-form-item",{attrs:{label:"使用时间：","label-width":t.formLabelWidth,prop:"ut"}},[e("el-select",{staticStyle:{width:"80px",margin:"0 2px"},attrs:{placeholder:"请选择"},on:{change:t.utChange},model:{value:t.form.ut,callback:function(e){t.$set(t.form,"ut",e)},expression:"form.ut"}},[e("el-option",{attrs:{label:"月",value:"m"}},[t._v("月")]),e("el-option",{attrs:{label:"年",value:"y"}},[t._v("年")]),e("el-option",{attrs:{label:"无限制",value:"ev"}},[t._v("无限制")])],1),1==t.un?e("el-input",{staticStyle:{width:"80px",margin:"0 10px"},attrs:{autocomplete:"off",placeholder:"使用时间"},model:{value:t.form.un,callback:function(e){t.$set(t.form,"un",e)},expression:"form.un"}}):t._e()],1)],1),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(e){t.addDialogFormVisible=!1}}},[t._v("取 消")]),e("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addDevice()}}},[t._v("确 定")])],1)],1),e("span",[t._v("  ")])],1),e("div",{staticClass:"header-container-right"},[e("el-input",{staticClass:"space",attrs:{placeholder:"名称"},model:{value:t.searchVal,callback:function(e){t.searchVal=e},expression:"searchVal"}}),e("el-button",{staticStyle:{padding:"10px 15px",color:"#0164F6",border:"1px solid #0164F6"},attrs:{plain:""},on:{click:t.search}},[t._v("搜索")])],1)]),e("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{size:"small","header-cell-style":t.fun,stripe:"",data:t.NodeList,"tooltip-effect":"dark"}},[e("el-table-column",{attrs:{prop:"",label:"",width:"10"}}),e("el-table-column",{attrs:{prop:"name",label:"名称",width:"130"}}),1==t.gid?e("el-table-column",{attrs:{prop:"nsn",label:"NS组",width:"130"}}):t._e(),e("el-table-column",{attrs:{prop:"p1",label:"价格",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.p1)+"元 ")]}}])}),e("el-table-column",{attrs:{prop:"p2",label:"优惠价",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.p2)+"元 ")]}}])}),e("el-table-column",{attrs:{prop:"uts",label:"使用时间",width:"160"}}),e("el-table-column",{attrs:{prop:"note",label:"备注",width:"160"}}),1==t.gid?e("el-table-column",{attrs:{prop:"rtime",label:"添加时间","show-overflow-tooltip":""}}):t._e(),e("el-table-column",{attrs:{label:"操作","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(i){return[e("div",[1==t.gid?e("el-button",{attrs:{type:"text"},on:{click:function(e){return t.updateShow(i.row)}}},[t._v("修改")]):t._e(),e("el-dialog",{attrs:{title:"修改套餐",visible:t.dialogFormVisible,top:"1vh"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[e("el-form",{ref:"addDevice",attrs:{model:t.editform,rules:t.editRules}},[e("el-form-item",{attrs:{label:"名称：","label-width":t.formLabelWidth,prop:"name"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"套餐名称"},model:{value:t.editform.name,callback:function(e){t.$set(t.editform,"name",e)},expression:"editform.name"}})],1),e("el-form-item",{attrs:{label:"NS组：","label-width":t.formLabelWidth,prop:"nid"}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:t.editform.nid,callback:function(e){t.$set(t.editform,"nid",e)},expression:"editform.nid"}},t._l(t.form.nidlist,(function(t,i){return e("el-option",{key:i,attrs:{label:t.name,value:t.id}})})),1)],1),e("el-form-item",{attrs:{label:"价格：","label-width":t.formLabelWidth,prop:"p1"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"价格"},model:{value:t.editform.p1,callback:function(e){t.$set(t.editform,"p1",e)},expression:"editform.p1"}})],1),e("el-form-item",{attrs:{label:"优惠价：","label-width":t.formLabelWidth,prop:"p2"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"优惠价"},model:{value:t.editform.p2,callback:function(e){t.$set(t.editform,"p2",e)},expression:"editform.p2"}})],1),e("el-form-item",{attrs:{label:"使用时间：","label-width":t.formLabelWidth,prop:"ut"}},[e("el-select",{staticStyle:{width:"80px",margin:"0 2px"},attrs:{placeholder:"请选择"},on:{change:t.utChangee},model:{value:t.editform.ut,callback:function(e){t.$set(t.editform,"ut",e)},expression:"editform.ut"}},[e("el-option",{attrs:{label:"月",value:"m"}},[t._v("月")]),e("el-option",{attrs:{label:"年",value:"y"}},[t._v("年")]),e("el-option",{attrs:{label:"无限制",value:"ev"}},[t._v("无限制")])],1),1==t.une?e("el-input",{staticStyle:{width:"80px",margin:"0 10px"},attrs:{autocomplete:"off",placeholder:"使用时间"},model:{value:t.editform.un,callback:function(e){t.$set(t.editform,"un",e)},expression:"editform.un"}}):t._e()],1)],1),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),e("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.updateDevice()}}},[t._v("确 定")])],1)],1),t._v("  "),1==t.gid?e("el-button",{attrs:{type:"text"},on:{click:function(e){return t.delDevice(i.row)}}},[t._v("删除")]):t._e(),e("el-button",{attrs:{type:"text"},on:{click:function(e){return t.buy(i.row)}}},[t._v("购买")]),e("el-dialog",{staticClass:"dialog",attrs:{title:"套餐购买",visible:t.buydialogFormVisible},on:{"update:visible":function(e){t.buydialogFormVisible=e}}},[e("el-form",{attrs:{model:t.buyForm,rules:t.buyRules}},[e("el-form-item",{attrs:{label:"域名：","label-width":"65px",prop:"domain"}},[e("el-input",{attrs:{autocomplete:"off",placeholder:"如 wddns.net"},model:{value:t.buyForm.domain,callback:function(e){t.$set(t.buyForm,"domain",e)},expression:"buyForm.domain"}})],1)],1),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(e){t.buydialogFormVisible=!1}}},[t._v("取 消")]),e("el-button",{staticClass:"confirm",on:{click:t.buySubmit}},[t._v("确 定")])],1)],1)],1)]}}])})],1),e("div",{staticClass:"footer-page",staticStyle:{"margin-top":"20px","text-align":"right"}},[e("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,30,50,100,500,1e3],"page-size":t.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:t.count,background:"","pager-count":5},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},l=[],o=(i("14d9"),{data(){return{text:"",un:!1,une:!1,form:{name:"",nid:"",ln:"",qc:"",rc:"",mc:"",p1:"",p2:"",un:1,ut:"ev",nidlist:[]},editform:{id:"",name:"",nid:"",qc:"",rc:"",mc:"",p1:"",p2:"",un:"",ut:"ev"},buyForm:{pid:"",domain:""},deviceRules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}]},editRules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}]},buyRules:{domain:[{required:!0,message:"请输入域名",trigger:"blur"}]},multipleSelection:[],currentPage:1,formLabelWidth:"100px",deviceForm:{},dialogFormVisible:!1,addDialogFormVisible:!1,buydialogFormVisible:!1,NodeList:[],count:0,pagesize:10,nin:0,gid:0,searchVal:""}},computed:{},watch:{},methods:{utChange(){"m"==this.form.ut||"y"==this.form.ut?this.un=!0:this.un=!1},buy(t){this.buydialogFormVisible=!0,this.buyForm.pid=t.id},buySubmit(){this.$request({url:"/domain/add",params:this.buyForm}).then(t=>{0==t.data.rec?(this.buydialogFormVisible=!1,this.$message.success("购买成功"),this.$router.push("/domin/list")):this.$message.error(t.data.msg)})},utChangee(){"m"==this.editform.ut||"y"==this.editform.ut?this.une=!0:this.une=!1},getNidList(){this.$request({url:"/domain/ns/list"}).then(t=>{0==t.data.rec?this.form.nidlist=t.data.data.list:this.$message.error(t.data.msg)})},addDevice(){this.$request({url:"/product/add",params:this.form}).then(t=>{0==t.data.rec?(this.$message.success(t.data.msg),this.addDialogFormVisible=!1,this.un=!1,this.getNodeList()):(this.$message.error(t.data.msg),this.addDialogFormVisible=!1)})},delDevice(t){this.$confirm("删除套餐, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.$request({url:"/product/del",params:{id:t.id}}).then(t=>{0==t.data.rec?(this.$message.success("删除成功"),this.getNodeList()):this.$message.error(t.data.msg)})}).catch(()=>{this.$message({type:"info",message:"已取消删除"})})},updateShow(t){this.dialogFormVisible=!0,"ev"!=t.ut?this.une=!0:this.une=!1,this.editform=t},updateDevice(t){this.$request({url:"/product/add",params:this.editform}).then(t=>{0==t.data.rec?(this.$message.success("修改成功"),this.dialogFormVisible=!1,this.une=!1,this.getNodeList()):this.$message.error(t.data.msg)})},search(){this.getNodeList()},getNodeList(){this.$request({url:"/product/list",params:{page:this.currentPage,pagesize:this.pagesize,search:this.searchVal}}).then(t=>{0==t.data.rec?(this.count=t.data.data.count,this.NodeList=t.data.data.list):this.$message.error(t.data.msg)})},fun({columnIndex:t}){return 7!==t||7==t?{height:"49px",background:"#0164F6",color:"#fff"}:void 0},Tocount(t,e){this.$router.push("/node/list/count?ip="+t+"&id="+e)},handleSizeChange(t){this.pagesize=t,this.getNodeList()},handleCurrentChange(t){this.currentPage=t,this.getNodeList()}},created(){this.nin=localStorage.getItem("nin"),this.gid=localStorage.getItem("gid"),1==this.nin&&(this.text=""),this.getNodeList(),1==this.gid&&this.getNidList()},mounted(){}}),r=o,s=(i("a3ca"),i("2877")),n=Object(s["a"])(r,a,l,!1,null,"741096f1",null);e["default"]=n.exports}}]);