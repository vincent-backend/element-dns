(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04c9e6a5"],{"162e":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"layout-container"},[e("el-container",{staticClass:"out"},[e("el-aside",{attrs:{width:t.aside}},[e("el-menu",{ref:"showSub",staticClass:"el-menu-vertical-demo",attrs:{"default-active":t.path,"background-color":"#FFF","text-color":"#001734","active-text-color":"#005AFF",router:"","unique-opened":"",collapse:t.isCollapse}},[e("div",{staticClass:"aside-title"},[e("a",{staticClass:"logo",attrs:{href:"/"}})]),t._l([{path:"/panel",iconClass:"el-icon-menu",title:"首页"},{path:"/domin",iconClass:"iconfont icon-yuming",title:"解析管理",children:[{path:"/domin/list",title:"域名解析"},{path:"/domin/operate",title:"批量操作"},{path:"/domin/ptr",title:"反向解析"},...1==t.gid?[{path:"/domin/ns",title:"NS分组"}]:[]]},...1==t.gid?[{path:"/fw",iconClass:"iconfont icon-yuming",title:"转发管理",children:[{path:"/domin/cfw",title:"条件转发"},{path:"/set/fw",title:"转发设置"}]}]:[],...1==t.gid?[{path:"/device",iconClass:"iconfont icon-jiedianshebei",title:"节点管理"}]:[],{path:"/watch",iconClass:"iconfont icon-jiankong",title:"监控管理",children:[{path:"/watch/setting",title:"监控列表"},{path:"/watch/warn",title:"监控记录"}]},{path:"/query",iconClass:"iconfont icon-jiankong",title:"查询统计",children:[{path:"/query/flow",title:"查询流量"},...1==t.gid?[{path:"/query/top",title:"排行统计"}]:[],{path:"/query/newlog",title:"最新记录"}]},...1==t.gid?[{path:"/product",iconClass:"iconfont icon-jiankong",title:"套餐管理",children:[{path:"/product/list",title:"套餐列表"},{path:"/product/log",title:"开通记录"}]}]:[],...1==t.gid?[{path:"/paybuy",iconClass:"iconfont icon-UserSettings",title:"充值购买",children:[{path:"/product/list",title:"套餐列表"},{path:"/product/log",title:"开通记录"},{path:"/user/pay",title:"在线充值"},{path:"/user/paylog",title:"充扣记录"}]}]:[],...1==t.gid?[{path:"/manage",iconClass:"iconfont icon-UserSettings",title:"用户信息",children:[{path:"/user/info",title:"用户信息"},{path:"/manage/verify",title:"实名认证"},{path:"/manage/password",title:"修改密码"},{path:"/set/api",title:"api设置"}]}]:[],...1==t.gid?[{path:"/manage",iconClass:"iconfont icon-UserSettings",title:"用户管理",children:[{path:"/manage/user",title:"用户管理"},{path:"/user/paylog",title:"充扣记录"},{path:"/manage/password",title:"修改密码"}]}]:[],{path:"/log",iconClass:"iconfont icon-rizhi",title:"日志管理",children:[{path:"/log/opt",title:"操作日志"},{path:"/log/login",title:"登录日志"},...1==t.gid?[{path:"/log/clean",title:"日志清除"}]:[]]},...1==t.gid?[{path:"/set",iconClass:"iconfont icon-xitongshezhi",title:"系统设置",children:[{path:"/set/board",title:"后台设置"},{path:"/set/domin",title:"DNS设置"},{path:"/set/setup",title:"系统设置"},{path:"/set/pay",title:"支付设置"},{path:"/set/email",title:"邮箱设置"},{path:"/set/sms",title:"短信设置"},{path:"/set/httpdns",title:"HttpDNS"},...1==t.htis?[{path:"/set/doth",title:"DoTH"}]:[],{path:"/set/api",title:"api设置"}]}]:[]],(function(i){return[i.children?e("el-submenu",{staticClass:"xiao",attrs:{index:i.path}},[e("template",{slot:"title"},[e("i",{class:i.iconClass}),e("span",[t._v(t._s(i.title))])]),t._l(i.children,(function(i){return e("el-menu-item",{class:(i.iconClass||"dian")+("/domin/list"==t.$route.path?" active1":""),attrs:{index:i.path,"data-rout":i.path,"data-t":i.title},nativeOn:{click:function(e){return t.nav.apply(null,arguments)}}},[t._v(" "+t._s(i.title)+" ")])}))],2):e("el-menu-item",{attrs:{index:i.path}},[e("i",{class:i.iconClass+(t.$route.path==i.path?" active":"")}),e("span",{attrs:{slot:"title","data-rout":i.path,"data-t":i.title},on:{click:t.nav},slot:"title"},[t._v(t._s(i.title))])])]}))],2)],1),e("el-container",[e("el-header",[e("div",{staticClass:"header-left"},[t.isCollapse?e("i",{staticClass:"el-icon-s-unfold coll",on:{click:t.coll}}):e("i",{staticClass:"el-icon-s-fold coll",on:{click:t.coll1}}),e("div",{staticClass:"header-menu-container"},t._l(t.navContent,(function(i,a){return e("span",{key:a,class:t.$route.path==i.rout?"active":"",on:{click:function(e){return t.navMenu(i.rout)}}},[t._v(t._s(i.t))])})),0)]),e("div",[e("span",{staticStyle:{"margin-right":"26px",color:"#001734"}},[t._v(t._s(t.user))]),e("el-button",{staticClass:"exit",attrs:{type:"primary"},on:{click:t.exit}},[t._v("退出")])],1)]),e("el-scrollbar",{staticClass:"over"},[e("el-main",{style:"/panel"==t.$route.path?"background: linear-gradient(180deg, #EBF3FF 0%, rgba(211,227,255,0) 100%);":"background: #F6F7FB;"},[e("router-view"),e("div",{staticClass:"footer-"})],1)],1),e("el-dialog",{attrs:{title:"手机号绑定 (绑定后可正常使用)",visible:t.formVisible,"close-on-click-modal":!1,"show-close":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.formVisible=e}}},[e("el-form",{attrs:{model:t.form}},[e("el-form-item",{attrs:{label:"输入手机号","label-width":t.formLabelWidth}},[e("el-input",{staticStyle:{width:"200px"},attrs:{autocomplete:"off"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}}),t.cb?e("el-button",{staticStyle:{"margin-left":"10px",padding:"9px 20px"},attrs:{type:"primary"},on:{click:t.isreg}},[t._v("绑定查询")]):t._e()],1),t.code?e("el-form-item",{attrs:{label:"验证码","label-width":t.formLabelWidth}},[e("el-input",{staticStyle:{width:"200px"},attrs:{autocomplete:"off"},model:{value:t.code1,callback:function(e){t.code1=e},expression:"code1"}}),t._v(" 已发送到手机 ")],1):t._e(),t.code?e("el-form-item",{attrs:{label:"","label-width":t.formLabelWidth}},[e("div",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.terms,expression:"terms"}],attrs:{type:"checkbox",autocomplete:"off"},domProps:{checked:Array.isArray(t.terms)?t._i(t.terms,null)>-1:t.terms},on:{change:function(e){var i=t.terms,a=e.target,s=!!a.checked;if(Array.isArray(i)){var o=null,l=t._i(i,o);a.checked?l<0&&(t.terms=i.concat([o])):l>-1&&(t.terms=i.slice(0,l).concat(i.slice(l+1)))}else t.terms=s}}}),e("span",[t._v("阅读并同意《"),e("a",{attrs:{href:"https://www.wddns.net/user/terms?t=1",target:"_blank"}},[e("font",{attrs:{color:"#606266"}},[t._v("wdDNS服务条款")])],1),t._v("》")])])]):t._e(),t.code?e("el-form-item",{attrs:{label:"","label-width":t.formLabelWidth}},[e("el-button",{attrs:{type:"primary"},on:{click:t.zhuce}},[t._v("注册并绑定")])],1):t._e()],1)],1)],1)],1)],1)},s=[],o=(i("14d9"),i("ce8a")),l={name:"",components:{},data(){return{code1:"",terms:!0,code:!1,htis:0,cb:!0,phone:"",pw:"",form:{vn:"1",vt:"1m",phone:""},formLabelWidth:"120px",name:"",name1:"BM",path:"/panel",user:"",make:!0,aside:"220px",isCollapse:!1,formVisible:!1,navContent:[{t:"首页",rout:"/panel"},{t:"域名解析",rout:"/domin/list"},{t:"批量操作",rout:"/domin/operate"}]}},computed:{},watch:{},methods:{sfz(){this.$request({url:"/user/sfz/check"}).then(t=>{0==t.data.rec?(this.formVisible=!1,window.sessionStorage.setItem("info",0)):(window.sessionStorage.setItem("info",0),this.$router.push("/manage/verify?sfz=1"))})},zhuce(){this.$request({url:"/user/phone/verify",params:{phone:this.phone,pw:this.pw,code:this.code1,terms:this.terms}}).then(t=>{0==t.data.rec?(this.$message.success(t.data.msg),this.sfz()):this.$message.error(t.data.msg)})},isreg(){this.$request({url:"/user/phone/check",params:{phone:this.phone}}).then(t=>{1==t.data.rec?(this.$message.error(t.data.msg),-1!=t.data.msg.search("已发送")&&(this.code=!0,this.cb=!1)):(this.$message.success(t.data.msg),this.formVisible=!1,window.sessionStorage.setItem("info",0))})},zhan(t){this.path=t},exit(){this.$confirm("确认退出吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{localStorage.clear(),this.$router.push("/login")}).catch(t=>{})},navMenu(t){this.$router.push(t)},coll(){this.isCollapse=!this.isCollapse,this.aside="200px",this.make=!0},coll1(){this.isCollapse=!this.isCollapse,this.aside="64px",this.make=!1},nav(t){var e={};e.rout=t.target.dataset.rout,e.t=t.target.dataset.t;var i=this.navContent.some(e=>{if(e.t==t.target.dataset.t)return!0});this.navContent.length>6&&this.navContent.shift(),i||this.navContent.push(e)}},beforeRouteUpdate(t,e,i){this.info=sessionStorage.getItem("info"),1==this.info?this.formVisible=!0:this.formVisible=!1,i()},created(){this.gid=localStorage.getItem("gid"),this.user=localStorage.getItem("user"),this.htis=localStorage.getItem("htis")},mounted(){this.name=localStorage.getItem("win"),this.name1=this.name.slice(3);var t=this;o["a"].$on("show",e=>{t.zhan(e)}),o["a"].$on("pan",e=>{t.name=e,t.name1=this.name.slice(3)})}},n=l,r=(i("9f4a"),i("2877")),c=Object(r["a"])(n,a,s,!1,null,null,null);e["default"]=c.exports},"85ba":function(t,e,i){},"9f4a":function(t,e,i){"use strict";i("85ba")},ce8a:function(t,e,i){"use strict";var a=i("2b0e"),s=new a["default"]({});e["a"]=s}}]);