(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c484eb6"],{"17d4":function(t,e,o){"use strict";o("dcfe")},"24d9":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"record-container"},[e("div",{staticClass:"domin-manage"},[e("i",{staticClass:"el-icon-back",on:{click:function(e){return t.$router.back()}}},[t._v("返回")]),e("span",{staticStyle:{margin:"0 10px"}},[t._v(t._s(t.$route.query.domain))]),0==t.$route.query.state?e("el-tag",{attrs:{type:"success"}},[t._v("正常")]):t._e(),1==t.$route.query.state?e("el-tag",{attrs:{type:"warning"}},[t._v("暂停")]):t._e()],1),e("el-card",[e("div",{staticClass:"col1"},[e("div",[e("el-button",{staticClass:"right-space add el-icon-plus",on:{click:t.addRecord}},[t._v("添加记录")]),e("el-dialog",{staticClass:"dialog",attrs:{title:"添加域名",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[e("el-form",{attrs:{model:t.form}},[e("el-form-item",{attrs:{label:"域名：","label-width":"formLabelWidth"}},[e("el-input",{attrs:{autocomplete:"off",placeholder:"如dnsbm.com"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),e("el-form-item",{attrs:{label:"分组：","label-width":"formLabelWidth"}},[e("el-select",{attrs:{placeholder:"限高级版本使用"},model:{value:t.form.region,callback:function(e){t.$set(t.form,"region",e)},expression:"form.region"}},[e("el-option",{staticClass:"hover-color",attrs:{label:"区域一",value:"shanghai"}}),e("el-option",{staticClass:"hover-color",attrs:{label:"区域二",value:"beijing"}})],1)],1),e("el-form-item",{attrs:{label:"备注：","label-width":"formLabelWidth"}},[e("el-input",{attrs:{type:"textarea",rows:2,placeholder:"备注"},model:{value:t.form.textarea,callback:function(e){t.$set(t.form,"textarea",e)},expression:"form.textarea"}})],1)],1),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{staticStyle:{float:"left"}},[t._v("批量解析")]),e("el-button",{staticClass:"cansel",on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),e("el-button",{staticClass:"confirm",on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("确 定")])],1)],1)],1),e("div",[e("el-input",{staticClass:"right-space",attrs:{placeholder:"请输入内容"},model:{value:t.sea,callback:function(e){t.sea=e},expression:"sea"}}),e("el-button",{on:{click:t.search}},[t._v("搜索")])],1)])]),e("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{"cell-style":t.cell,size:"small","header-cell-style":t.fun,stripe:"",data:t.recordList,"tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange}},[e("el-table-column",{attrs:{type:"selection",width:"55"}}),e("el-table-column",{attrs:{prop:"host",label:"主机名",width:"180",align:"left"},scopedSlots:t._u([{key:"default",fn:function(o){return[o.row.show?e("el-input",{attrs:{type:"text",placeholder:"主机名",disabled:t.obj.id},model:{value:t.obj.host,callback:function(e){t.$set(t.obj,"host",e)},expression:"obj.host"}}):t._e(),o.row.show?t._e():e("span",[t._v(t._s(o.row.host))])]}}])}),e("el-table-column",{attrs:{prop:"qt","show-overflow-tooltip":"",label:"类型",width:"130"},scopedSlots:t._u([{key:"default",fn:function(o){return[o.row.show?e("el-select",{attrs:{placeholder:"请选择"},model:{value:t.obj.qt,callback:function(e){t.$set(t.obj,"qt",e)},expression:"obj.qt"}},t._l(t.options,(function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1):"URL1"==o.row.qt?e("span",[t._v("显性URL")]):"URL2"==o.row.qt?e("span",[t._v("隐性URL")]):e("span",[t._v(t._s(o.row.qt))])]}}])}),e("el-table-column",{attrs:{prop:"val","show-overflow-tooltip":"",label:"记录值",width:"300",align:"left"},scopedSlots:t._u([{key:"default",fn:function(o){return[o.row.show?e("el-input",{attrs:{type:"text",placeholder:"记录值"},model:{value:t.obj.val,callback:function(e){t.$set(t.obj,"val",e)},expression:"obj.val"}}):e("span",{on:{click:function(e){return t.xiugai(o.row)}}},[t._v(t._s(o.row.val))])]}}])}),e("el-table-column",{attrs:{prop:"view","show-overflow-tooltip":"",label:"线路",align:"left",width:"120"},scopedSlots:t._u([{key:"default",fn:function(o){return[o.row.show?e("el-cascader",{attrs:{"show-all-levels":!1,options:t.region,props:{expandTrigger:"hover",checkStrictly:!0}},model:{value:t.obj.vid,callback:function(e){t.$set(t.obj,"vid",e)},expression:"obj.vid"}}):e("span",[t._v(t._s(o.row.view))])]}}])}),e("el-table-column",{attrs:{label:"MX/权重",width:"100",prop:"pre",align:"center"},scopedSlots:t._u([{key:"default",fn:function(o){return[o.row.show?e("el-input",{attrs:{type:"text"},model:{value:t.obj.pre,callback:function(e){t.$set(t.obj,"pre",e)},expression:"obj.pre"}}):e("span",[t._v(t._s(o.row.pre||""))])]}}])}),e("el-table-column",{attrs:{prop:"ttl",label:"TTL","show-overflow-tooltip":"",align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(o){return[o.row.show?e("el-input",{attrs:{type:"text"},model:{value:t.obj.ttl,callback:function(e){t.$set(t.obj,"ttl",e)},expression:"obj.ttl"}}):e("span",[t._v(t._s(o.row.ttl))])]}}])}),e("el-table-column",{attrs:{prop:"state","show-overflow-tooltip":"",label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(o){return[0==o.row.state?e("el-tag",{attrs:{type:"success"}},[t._v("正常")]):t._e(),1==o.row.state?e("el-tag",{attrs:{type:"warning"}},[t._v("暂停")]):t._e(),2==o.row.state?e("el-tag",{attrs:{type:"danger"}},[t._v("故障")]):t._e()]}}])}),e("el-table-column",{attrs:{label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(o){return[o.row.show?e("div",[e("el-button",{attrs:{type:"text"},on:{click:function(e){return t.store(o.row)}}},[t._v("保存")]),e("el-button",{attrs:{type:"text"},on:{click:function(e){return t.cancel(o.row)}}},[t._v("取消")])],1):e("div",[0==o.row.id?e("i",{staticClass:"el-icon-lock"}):e("div",[e("el-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"text"},on:{click:function(e){return t.mon(o.row)}}},[t._v("监控")]),0==o.row.state?e("el-button",{attrs:{type:"text"},on:{click:function(e){return t.stop(o.row)}}},[t._v("暂停")]):e("el-button",{attrs:{type:"text"},on:{click:function(e){return t.start(o.row)}}},[t._v("启用")]),e("el-button",{attrs:{type:"text"},on:{click:function(e){return t.del(o.row)}}},[t._v("删除")]),e("el-button",{attrs:{type:"text"},on:{click:function(e){return t.xiugai(o.row)}}},[t._v("修改")])],1)])]}}])})],1),e("el-dialog",{attrs:{title:"监控添加",visible:t.dialogTableVisible},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[e("el-form",{attrs:{model:t.form1}},[e("el-form-item",{attrs:{label:"监控频率","label-width":t.formLabelWidth}},[e("el-radio-group",{model:{value:t.form1.freq,callback:function(e){t.$set(t.form1,"freq",e)},expression:"form1.freq"}},t._l(t.freq,(function(o,a){return e("el-radio",{key:a,attrs:{label:o}},[t._v(t._s(o))])})),1)],1),e("el-form-item",{attrs:{label:"监控方式","label-width":t.formLabelWidth}},[e("el-radio",{attrs:{label:"0"},model:{value:t.form1.https,callback:function(e){t.$set(t.form1,"https",e)},expression:"form1.https"}},[t._v("http")]),e("el-radio",{attrs:{label:"1"},model:{value:t.form1.https,callback:function(e){t.$set(t.form1,"https",e)},expression:"form1.https"}},[t._v("https")]),e("el-radio",{attrs:{label:"2"},model:{value:t.form1.https,callback:function(e){t.$set(t.form1,"https",e)},expression:"form1.https"}},[t._v("端口检测")])],1),2!=t.form1.https?e("el-form-item",{attrs:{label:"主机头","label-width":t.formLabelWidth}},[e("el-input",{staticStyle:{width:"220px"},attrs:{autocomplete:"off"},model:{value:t.form1.domain,callback:function(e){t.$set(t.form1,"domain",e)},expression:"form1.domain"}})],1):t._e(),e("el-form-item",{attrs:{label:"IP","label-width":t.formLabelWidth}},[e("el-input",{staticStyle:{width:"220px"},attrs:{autocomplete:"off"},model:{value:t.form1.val,callback:function(e){t.$set(t.form1,"val",e)},expression:"form1.val"}})],1),e("el-form-item",{attrs:{label:"端口","label-width":t.formLabelWidth}},[e("el-input",{staticStyle:{width:"100px"},attrs:{autocomplete:"off"},model:{value:t.form1.port,callback:function(e){t.$set(t.form1,"port",e)},expression:"form1.port"}})],1),e("el-form-item",{attrs:{label:"切换方式","label-width":t.formLabelWidth}},[e("el-radio-group",{model:{value:t.form1.act,callback:function(e){t.$set(t.form1,"act",e)},expression:"form1.act"}},[e("el-radio",{staticStyle:{"margin-bottom":"10px","margin-top":"15px"},attrs:{label:0}},[t._v("不对该域名记录做操作(不切换)")]),e("el-radio",{staticStyle:{"margin-bottom":"10px"},attrs:{label:1}},[t._v("自动暂停与智能切换(合适多机或负载均衡时用)")]),e("el-radio",{staticStyle:{"margin-bottom":"10px"},attrs:{label:2}},[t._v("切换到指定的备用IP(自定义切换)")])],1),2==t.form1.act?e("el-input",{staticStyle:{width:"250px"},model:{value:t.form1.bip,callback:function(e){t.$set(t.form1,"bip",e)},expression:"form1.bip"}}):t._e()],1),e("el-form-item",{attrs:{label:"通知方式","label-width":t.formLabelWidth}},[e("el-checkbox",{attrs:{label:"邮件通知"},model:{value:t.form1.email,callback:function(e){t.$set(t.form1,"email",e)},expression:"form1.email"}}),e("el-checkbox",{attrs:{label:"短信通知"},model:{value:t.form1.sms,callback:function(e){t.$set(t.form1,"sms",e)},expression:"form1.sms"}}),e("el-button",{staticStyle:{margin:"0px 20px"},attrs:{type:"text",size:"mini",icon:"el-icon-place"},on:{click:function(e){return t.selectNsc(t.form1.nsc)}}}),1==t.form1.nsc?e("el-input",{staticStyle:{width:"250px"},attrs:{placeholder:"可指定邮箱或手机"},model:{value:t.form1.ns,callback:function(e){t.$set(t.form1,"ns",e)},expression:"form1.ns"}}):t._e()],1)],1),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(e){t.dialogTableVisible=!1}}},[t._v("取 消")]),e("el-button",{attrs:{type:"primary"},on:{click:t.update1}},[t._v("确 定")])],1)],1),e("div",{staticClass:"footer-page",staticStyle:{"margin-top":"20px"}},[e("div",[e("el-button",{staticClass:"footer-b anniu",on:{click:t.start}},[t._v("启用")]),e("el-button",{staticClass:"footer-b anniu",on:{click:t.stop}},[t._v("暂停")]),e("el-button",{staticClass:"footer-b anniu",on:{click:t.del}},[t._v("删除")])],1),e("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,30,50,100,500,1e3],"page-size":t.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:t.count,background:"","pager-count":5},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._m(0),e("el-alert",{attrs:{title:"注意事项",type:"error"}},[e("template",{slot:"title"},[e("div",[t._v("注意事项:")]),e("div",[t._v("1、同一个主机名记录解析时，请先添加一条默认解析（至少也要添加一条默认解析），再添加其它的线路解析")]),e("div",[t._v("2、MX值是邮件记录需要填写参数，权重是有多条记录或负载均衡时的分配参数")]),e("div")])],2)],1)},l=[function(){var t=this,e=t._self._c;return e("div",[e("br")])}],s=(o("14d9"),{name:"",components:{},data(){return{freq:"",ttl:3600,sort:"A",row:{},rowForm:[],pagesize:10,load:9e3,show:!0,recordList:[],multipleSelection:[],options:[{value:"A",label:"A"},{value:"NS",label:"NS"},{value:"CNAME",label:"CNAME"},{value:"MX",label:"MX"},{value:"TXT",label:"TXT"},{value:"AAAA",label:"AAAA"},{value:"SRV",label:"SRV"},{value:"CAA",label:"CAA"},{value:"URL1",label:"显性URL"},{value:"URL2",label:"隐性URL"}],value:"",checked:!0,formLabelWidth:"15%",form:{name:"",region:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:"",textarea:""},form1:{oid:"",domain:"",val:"",port:"80",https:"0",freq:"",act:0,bip:"",email:"",sms:"",ns:"",nsc:!1},dialogFormVisible:!1,dialogTableVisible:!1,multipleSelection:[],currentPage:1,region:[],obj:{domain:"",host:"",qt:"A",val:"",show:!0,id:"",vid:9e3,ttl:3600,pre:""},count:0,sea:"",per:!0}},computed:{},watch:{},methods:{selectNsc(t){this.form1.nsc=1!=t},update1(){""!=this.form1.freq?(1==this.form.https?this.form.https=1:this.form.https=0,1==this.form.email?this.form.email=1:this.form.email=0,1==this.form.sms?this.form.sms=1:this.form.sms=0,this.form1.ip=this.form1.val,this.$request({url:"/mon/add",params:this.form1}).then(t=>{this.dialogTableVisible=!1,0==t.data.rec?(this.$message.success("监控成功"),this.getmon()):this.$message.error(t.data.msg)})):this.$message.error("请选择监控频率")},cell({columnIndex:t}){if(8==t)return{"text-align":"center"}},mon(t){this.dialogTableVisible=!0,this.form1.domain=t.host+"."+t.domain,this.form1.oid=t.id,this.form1.val=t.val},start(t){var e=this.multipleSelection.map(t=>t.id);this.$confirm("是否启用","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.$request({url:"/domain/record/start",params:{id:t.id||e.toString()}}).then(t=>{0==t.data.rec?(this.$message.success("启用成功"),this.getRecordList()):this.$message.warning(t.data.msg)})}).catch(t=>{})},xiugai(t){this.recordList.forEach(t=>{t.show=!1}),t.show=!0,this.obj=t,this.obj.vid=t.vid,"NS"==this.obj.qt&&(t.show=!1),0==this.obj.pre&&(this.obj.pre="")},stop(t){var e=this.multipleSelection.map(t=>t.id);this.$confirm("是否暂停","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.$request({url:"/domain/record/stop",params:{id:t.id||e.toString()}}).then(t=>{0==t.data.rec?(this.$message.success("暂停成功"),this.getRecordList()):this.$message.error(t.data.msg)})}).catch(()=>{this.$message({type:"info",message:"已取消暂停"})})},search(){this.getRecordList()},del(t){var e=this.multipleSelection.map(t=>t.id);this.$confirm("是否删除"+(t.host||""),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.$request({url:"/domain/record/del",params:{id:t.id||e.toString()}}).then(t=>{0==t.data.rec?(this.$message.success("删除成功"),this.getRecordList()):this.$message.error(t.data.msg)})}).catch(()=>{this.$message({type:"info",message:"已取消删除"})})},update(t){this.store(t)},cancel(t){this.per=!0,this.getRecordList()},store(t){this.obj.view=this.obj.vid.toString(),this.$request({url:"/domain/record/add",params:this.obj||t}).then(t=>{0==t.data.rec?(this.$message.success(t.data.msg),this.per=!0,this.getRecordList()):this.$message.error(t.data.msg)})},getRecordList(){this.$request({url:"/domain/record/list",params:{domain:this.$route.query.domain,page:this.currentPage,pagesize:this.pagesize,search:this.sea}}).then(t=>{0==t.data.rec?(t.data.data.list.forEach(t=>t.show=!1),this.recordList=t.data.data.list,this.count=t.data.data.count):this.$message.error(t.data.msg)})},addRecord(t){var e={domain:this.$route.query.domain,host:"",qt:"A",val:"",show:!0,id:t.id,vid:9e3,ttl:localStorage.getItem("ttl"),pre:""};this.obj=e,this.per&&(this.recordList.unshift(e),this.per=!1)},toggleSelection(t){t?t.forEach(t=>{this.$refs.multipleTable.toggleRowSelection(t)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange(t){this.multipleSelection=t},goBack(){},toggleAll(){this.$refs.multipleTable.toggleAllSelection()},fun({columnIndex:t}){return 8!==t?{background:"#0164F6",color:"#fff",height:"50px"}:8==t?{"text-align":"center",background:"#0164F6",color:"#fff","padding-right":"10px",height:"50px"}:void 0},toggleSelection(t){t?t.forEach(t=>{this.$refs.multipleTable.toggleRowSelection(t)}):this.$refs.multipleTable.clearSelection()},Towatch(){this.$router.push("/domin/list/watch")},Tocount(){this.$router.push("/domin/list/count")},handleSizeChange(t){this.pagesize=t,this.getRecordList()},handleCurrentChange(t){this.currentPage=t,this.getRecordList()},dialog(){this.dialogTableVisible=!1,this.$router.push("/watch/mon?domain="+this.$route.query.domain+"&id="+this.$route.query.id+"&oid="+this.rowForm[0].id+"&host="+this.row.host)}},created(){this.getRecordList(),this.$request({url:"/domain/region"}).then(t=>{this.region=JSON.parse(t.data.data)}),this.$request({url:"/sys/dns/view"}).then(t=>{0==t.data.rec?this.freq=t.data.data.freq.split(","):this.$message.error(t.data.msg)})},mounted(){}}),i=s,r=(o("17d4"),o("4879"),o("2877")),n=Object(r["a"])(i,a,l,!1,null,"598b6e7c",null);e["default"]=n.exports},4879:function(t,e,o){"use strict";o("9286")},9286:function(t,e,o){},dcfe:function(t,e,o){}}]);