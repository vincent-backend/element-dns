(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0875ee26"],{"4c79":function(t,s,a){},6545:function(t,s,a){"use strict";a("4c79")},"7a22":function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t._self._c;return s("div",{},[s("div",{staticClass:"control"},[t._v("后台设置")]),s("el-card",{staticClass:"box-card"},[s("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(s){t.activeName=s},expression:"activeName"}},[s("el-tab-pane",{attrs:{label:"后台设置",name:"backend"}},[s("div",{staticClass:"domin-list"},[s("span",{staticStyle:{width:"100px",display:"inline-block"}},[t._v("后台名称：")]),s("el-input",{staticClass:"shuru",attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.form.name,callback:function(s){t.$set(t.form,"name",s)},expression:"form.name"}}),s("span",{staticClass:"gray"},[t._v("设置后台显示名称(设置后需重新登录生效)")])],1),s("div",{staticClass:"domin-list"},[s("span",{staticStyle:{width:"100px",display:"inline-block"}},[t._v("后台端口：")]),s("el-input",{staticClass:"shuru",attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.form.port,callback:function(s){t.$set(t.form,"port",s)},expression:"form.port"}}),s("span",{staticClass:"gray"},[t._v("请在相关安全策略或防火墙策略里开通此端口的外部访问")])],1),s("div",{staticClass:"domin-list"},[s("span",{staticStyle:{width:"100px",display:"inline-block"}},[t._v("后台目录：")]),s("el-input",{staticClass:"shuru",attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.form.apd,callback:function(s){t.$set(t.form,"apd",s)},expression:"form.apd"}}),s("span",{staticClass:"gray"},[t._v("可指定后端的访问目录，如/admin，默认为 /")])],1),s("div",{staticClass:"domin-list"},[s("span",{staticStyle:{width:"100px",display:"inline-block"}},[t._v("域名访问：")]),s("el-input",{staticClass:"shuru",attrs:{placeholder:"请输入域名",clearable:""},model:{value:t.form.domain,callback:function(s){t.$set(t.form,"domain",s)},expression:"form.domain"}}),s("span",{staticClass:"gray"},[t._v("设置后，只有该域名可登录；如不想加端口访问，需修改端口为80；上传域名证书，可启用https访问；"),s("font",{attrs:{color:"red"}},[t._v("谨慎设置")])],1)],1),s("div",{staticClass:"domin-list bottom"},[s("span",{staticStyle:{width:"100px",display:"inline-block"}},[t._v("登录ip：")]),s("el-input",{staticClass:"shuru",staticStyle:{height:"100%",width:"300px"},attrs:{type:"textarea",placeholder:"请输入ip地址或ip网络段",clearable:""},model:{value:t.form.aips,callback:function(s){t.$set(t.form,"aips",s)},expression:"form.aips"}}),s("span",{staticClass:"gray"},[t._v("默认为空，不限制。设置后，只有指定的IP可登录后台。"),s("font",{attrs:{color:"red"}},[t._v("谨慎设置")])],1)],1),s("div",{staticClass:"domin-list"},[s("el-button",{staticStyle:{width:"100px",display:"inline-block",color:"#0164F6","border-color":"#0164F6",margin:"0px 120px"},on:{click:t.set}},[t._v("提交")])],1)]),s("el-tab-pane",{attrs:{label:"HTTPS设置",name:"https"}},[s("div",{staticClass:"domin-one"}),s("el-form",{ref:"uploadSsl",attrs:{model:t.formUp,rules:t.uploadRules}},[s("el-form-item",{attrs:{label:"证书上传","label-width":t.formLabelWidth,prop:"cert"}},[""==t.formUp.cf?s("el-upload",{ref:"uploadSsl",attrs:{"list-type":"text",limit:2,action:"","http-request":t.uploadSsl}},[t._v(" > "),s("i",{staticClass:"el-icon-plus"}),t._v("  "),1==t.form.sslis?s("el-tag",{attrs:{type:"warning"}},[t._v("已上传证书文件")]):t._e()],1):s("div",[s("img",{staticStyle:{width:"150px",height:"150px","margin-right":"10px"},attrs:{src:t.formUp.cf,alt:""}}),s("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.formUp.kf,alt:""}})])],1),s("el-form-item",[s("el-button",{staticStyle:{width:"75px",margin:"10px 90px"},attrs:{type:"primary"},on:{click:t.submitSsl}},[t._v("确定")])],1)],1),s("el-alert",{attrs:{title:"",type:"success",description:"上传证书后，默认使用标准的443端口"}})],1),s("el-tab-pane",{attrs:{label:"ICO图标设置",name:"ico"}},[s("div",{staticClass:"domin-one"}),s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.ruleForm,"status-icon":"",rules:t.rules,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"ICO文件",prop:"icof"}},[""==t.ruleForm.icof?s("el-upload",{attrs:{"list-type":"picture-card",limit:1,action:"","http-request":t.uploadIco}},[s("i",{staticClass:"el-icon-plus"}),1==t.form.icois?s("el-tag",{attrs:{type:"warning"}},[t._v("已上传")]):t._e()],1):s("div",[s("img",{staticStyle:{width:"150px",height:"150px","margin-right":"10px"},attrs:{src:t.ruleForm.icof,alt:""}})])],1),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:t.submitIco}},[t._v("确定")])],1)],1)],1),s("el-tab-pane",{attrs:{label:"更换迁移",name:"chg"}},[s("div",{staticClass:"domin-one"}),s("div",{staticClass:"domin-list"},[s("span",{staticStyle:{width:"80px",display:"inline-block"}},[t._v("新IP地址：")]),s("el-input",{staticStyle:{width:"200px",display:"inline-block"},attrs:{placeholder:"请输入IP"},model:{value:t.nip,callback:function(s){t.nip=s},expression:"nip"}}),s("span",{staticClass:"gray"},[t._v("   输入新主控的IP地址，如非默认端口，可使用ip:port方式添加端口号")])],1),s("div",{staticClass:"domin-list bottom"},[s("span",{staticStyle:{width:"80px",display:"inline-block"}},[t._v("数据迁移")]),s("el-switch",{staticStyle:{width:"210px",margin:"0 0px"},attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:t.dt,callback:function(s){t.dt=s},expression:"dt"}}),s("span",{staticClass:"gray"},[t._v("将主要设置与数据库等自动迁移至新主控中")])],1),s("div",{staticClass:"domin-list"},[s("el-button",{staticStyle:{width:"80px",margin:"5px 120px"},attrs:{type:"primary"},on:{click:t.submitChg}},[t._v("提交")])],1),s("div",{staticClass:"domin-one"}),s("el-alert",{attrs:{title:"备注说明",type:"error"}},[s("template",{slot:"title"},[s("div",{staticClass:"iconSize"},[t._v("注意事项:")]),s("div",{staticClass:"iconSize"},[t._v("1、本功能为更换主控服务器时，用于自动修改设置与数据迁移；")]),s("div",{staticClass:"iconSize"},[t._v("2、请勿随意操作，确定更换主控时再操作；")]),s("div",{staticClass:"iconSize"},[t._v("3、此操作需要时间较长，请耐心等待；")])])],2)],1),s("el-tab-pane",{attrs:{label:"主IP设置",name:"msip"}},[s("div",{staticClass:"domin-one"}),s("div",{staticClass:"domin-list"},[s("span",{staticStyle:{width:"80px",display:"inline-block"}},[t._v("主IP地址：")]),s("el-input",{staticStyle:{width:"200px",display:"inline-block"},attrs:{placeholder:"请输入主IP"},model:{value:t.msip,callback:function(s){t.msip=s},expression:"msip"}}),s("span",{staticClass:"gray"},[t._v("   输入主主控的IP地址")])],1),s("div",{staticClass:"domin-list"},[s("el-button",{staticStyle:{width:"80px",margin:"5px 120px"},attrs:{type:"primary"},on:{click:t.submitMsip}},[t._v("确定")])],1),s("div",{staticClass:"domin-one"}),s("el-alert",{attrs:{title:"备注说明",type:"error"}},[s("template",{slot:"title"},[s("div",{staticClass:"iconSize"},[t._v("注意事项:")]),s("div",{staticClass:"iconSize"},[t._v("本功能为双主控时做备主控且同时做为节点解析时设置，其它场景请勿设置")])])],2)],1)],1)],1)],1)},i=[],l=(a("14d9"),a("ce8a")),r={name:"",components:{},data(){return{form:{name:"",domain:"",port:"",apd:"/",aips:"",sslis:!1,icois:!1},ruleForm:{icof:""},rules:{icof:[{required:!0,message:"请选择ICO文件",trigger:"blur"}]},formUp:{cf:"",kf:""},uploadRules:{cf:[{required:!0,message:"请输选择证书文件",trigger:"blur"}],kf:[{required:!0,message:"请输选择密钥文件",trigger:"blur"}]},fileUp:[],upc:0,formLabelWidth:"80px",activeName:"backend",fileIco:[],fic:0,nip:"",msip:"",dt:0}},computed:{},watch:{},methods:{submitChg(){this.$request({url:"/sys/export",params:{ip:this.nip,dt:this.dt}}).then(t=>{0==t.data.rec?this.$message.success(t.data.msg):this.$message.error(t.data.msg)})},submitMsip(){this.$request({url:"/sys/msip",params:{ip:this.msip}}).then(t=>{0==t.data.rec?this.$message.success(t.data.msg):this.$message.error(t.data.msg)})},submitSsl(){if(2==this.upc){var t=new FormData;t.append("kf",this.fileUp[0].file),t.append("cf",this.fileUp[1].file),this.$request({url:"/sys/upload/ssl",data:t,method:"post",headers:{"Content-Type":"multipart/form-data"}}).then(t=>{0==t.data.rec?this.$message.success(t.data.msg):this.$message.error(t.data.msg)})}else this.$message.error("请选择证书文件")},submitIco(){if(1==this.fic){var t=new FormData;t.append("icon",this.fileIco[0].file),this.$request({url:"/sys/upload/icon",data:t,method:"post",headers:{"Content-Type":"multipart/form-data"}}).then(t=>{0==t.data.rec?this.$message.success(t.data.msg):this.$message.error(t.data.msg)})}else this.$message.error("请选择文件")},uploadIco(t){this.fileIco.push(t),this.fic++},uploadSsl(t){this.fileUp.push(t),this.upc++},handleClick(t,s){},set(){var t=this.form,s=t.aips.replace(/\s+/g,",");this.$request({url:"/sys/panel",params:{name:t.name,port:t.port,apd:t.apd,domain:t.domain,aips:s,act:"setup"}}).then(t=>{3!=t.data.rec?0==t.data.rec?(this.$message.success("设置成功"),this.$request({url:"/user/info"}).then(t=>{0==t.data.rec?(window.localStorage.setItem("win",t.data.data.title),l["a"].$emit("pan",t.data.data.title)):this.$message.error(t.data.msg)}),this.$request({url:"/sys/panel",params:{act:"view"}}).then(t=>{this.form=t.data.data})):this.$message.error(t.data.msg):this.$router.push("/notfound")})}},created(){this.$request({url:"/sys/panel",params:{act:"view"}}).then(t=>{0==t.data.rec?(this.form=t.data.data,this.msip=t.data.data.msip):this.$message.error(t.data.msg)})},mounted(){}},o=r,c=(a("6545"),a("2877")),p=Object(c["a"])(o,e,i,!1,null,"28a40fe8",null);s["default"]=p.exports},ce8a:function(t,s,a){"use strict";var e=a("2b0e"),i=new e["default"]({});s["a"]=i}}]);