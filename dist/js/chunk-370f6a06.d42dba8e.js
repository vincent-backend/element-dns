(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-370f6a06"],{"0b4e":function(t,s,a){},"8e2f":function(t,s,a){"use strict";a("0b4e")},be6a:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t._self._c;return s("div",{},[s("div",{staticClass:"control"},[t._v("权威DNS设置")]),s("el-card",{staticStyle:{"padding-left":"50px"}},[s("el-alert",{attrs:{title:"备注说明",type:"error",description:"此项设置只在用于互联网域名权威解析时需设置，如用于内网或转发时可忽略。"}}),s("div",{staticClass:"domin-list bottom"},[s("span",{staticStyle:{width:"100px",display:"inline-block"}},[t._v("主域名：")]),s("el-input",{staticClass:"shuru",attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.form.domain,callback:function(s){t.$set(t.form,"domain",s)},expression:"form.domain"}}),s("span",{staticClass:"gray"},[t._v("DNS域名(替换为您自己的域名)")])],1),s("div",{staticClass:"domin-list bottom"},[s("span",{staticStyle:{width:"100px",display:"inline-block"}},[t._v("NS地址：")]),s("el-input",{staticClass:"shuru",attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.form.ns,callback:function(s){t.$set(t.form,"ns",s)},expression:"form.ns"}}),s("span",{staticClass:"gray"},[t._v("域名解析服务的NS地址(替换为您自己的域名或实际设置,该地址需在域名商后台注册，并在后台添加相应记录)")])],1),s("div",{staticClass:"domin-list bottom"},[s("span",{staticStyle:{width:"100px",display:"inline-block"}},[t._v("TTL时间：")]),s("el-input",{staticClass:"shuru",attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.form.ttl,callback:function(s){t.$set(t.form,"ttl",s)},expression:"form.ttl"}}),s("span",{staticClass:"gray"},[t._v("默认ttl值，即默认TTL缓存或生效时间")])],1),s("div",{staticClass:"domin-list bottom"},[s("span",{staticStyle:{width:"100px",display:"inline-block"}},[t._v("监控间隔")]),s("el-input",{staticClass:"shuru",attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.form.freq,callback:function(s){t.$set(t.form,"freq",s)},expression:"form.freq"}}),s("span",{staticClass:"gray"},[t._v("监控检测的时间间隔,多个用逗号隔开(m代表分钟,s代表秒,如1m即1分钟)")])],1),s("el-button",{staticStyle:{width:"100px",margin:"10px 120px"},attrs:{type:"primary"},on:{click:t.submit}},[t._v("保存")])],1)],1)},i=[],l={name:"",components:{},data(){return{form:{domain:"",ns:"",ttl:"",freq:"",reg:!1}}},computed:{},watch:{},methods:{submit(){var{domain:t,ns:s,ttl:a,freq:e,reg:i}=this.form;this.$request({url:"/sys/dns/setup",params:{domain:t,ns:s,ttl:a,reg:i,freq:e}}).then(t=>{0==t.data.rec?(this.$request({url:"/sys/dns/view"}).then(t=>{this.form=t.data.data}),this.$message.success("设置成功")):this.$message.error(t.data.msg)})}},created(){this.$request({url:"/sys/dns/view"}).then(t=>{0==t.data.rec?this.form=t.data.data:this.$message.error(t.data.msg)})},mounted(){}},r=l,n=(a("8e2f"),a("2877")),o=Object(n["a"])(r,e,i,!1,null,"49b3bf40",null);s["default"]=o.exports}}]);