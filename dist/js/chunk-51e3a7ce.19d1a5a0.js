(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51e3a7ce"],{"4dff":function(t,i,e){"use strict";e("94fe")},"94fe":function(t,i,e){},b98f:function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t._self._c;return i("div",{},[i("div",{staticClass:"domin-manage"},[t._v("查询统计")]),i("div",{staticClass:"header-container"},[1==t.gid?i("el-select",{attrs:{placeholder:"选择节点",filterable:"","allow-create":""},on:{change:t.selectNid},model:{value:t.nid,callback:function(i){t.nid=i},expression:"nid"}},[i("el-option",{attrs:{label:"全部",value:""}}),t._l(t.nidlist,(function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],2):t._e(),i("el-select",{attrs:{placeholder:"选择域名",filterable:"","allow-create":""},on:{change:t.selectDom},model:{value:t.domain,callback:function(i){t.domain=i},expression:"domain"}},[i("el-option",{attrs:{label:"全部(域名)",value:""}}),t._l(t.domlist,(function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.name}})}))],2),i("el-button",{style:"30m"==t.isActive?t.styCss:"",on:{click:t.t30m}},[t._v("实时")]),i("el-button",{style:"3h"==t.isActive?t.styCss:"",on:{click:t.t3h}},[t._v("三小时")]),i("el-button",{style:"1d"==t.isActive?t.styCss:"",on:{click:t.t1d}},[t._v("当天")]),i("el-button",{style:"yd"==t.isActive?t.styCss:"",on:{click:t.tyd}},[t._v("昨天")]),i("el-button",{style:"1w"==t.isActive?t.styCss:"",on:{click:t.t1w}},[t._v("一周")]),i("el-button",{style:"1m"==t.isActive?t.styCss:"",on:{click:t.t1m}},[t._v("当月")])],1),i("el-row",{attrs:{gutter:25}},[i("el-col",{attrs:{span:24}},[i("el-card",{staticClass:"box-card tab"},[i("div",{ref:"main",staticStyle:{width:"100%",height:"330px",top:"10px"}})])],1)],1)],1)},a=[],n=e("313e"),l=e.n(n),o={name:"",components:{},data(){return{data:{},nidlist:[],domlist:[],gid:0,nid:"",domain:"",times:"",inv:1e3,otimer:null,isActive:"30m",styCss:{color:"#fff",background:"#0164F6",color:"#FFF!important"}}},computed:{},watch:{},methods:{echart(){var t=l.a.init(this.$refs.main),i={xAxis:{type:"category",data:[]},grid:{x:80,x2:30,y:50,y2:38},yAxis:{type:"value",min:0,max:this.data.max,interval:this.data.inv,axisLabel:{show:!0},axisTick:{show:!0},axisLine:{show:!0}},title:{left:"35px",text:`查询统计  最大${this.data.max} - 最小${this.data.min}`,subtext:"单位（次）"},tooltip:{trigger:"axis"},legend:{data:["查询量"]},series:[{data:[],name:"查询量",type:"line",showSymbol:!0,hoverAnimation:!0,data:[],symbolSize:8,showSymbol:!0,itemStyle:{normal:{color:"blue",lineStyle:{color:"blue"}}}}]};i.xAxis.data=this.data.list.map(t=>t.ds),i.series[0].data=this.data.list.map(t=>t.dc),t.setOption(i)},count(){this.$request({url:"/domain/flow",params:{nid:this.nid,domain:this.domain,ts:this.times}}).then(t=>{0==t.data.rec?(this.data=t.data.data,this.echart()):(this.$message.error(t.data.msg),clearInterval(this.otimer))}),this.otimer=setInterval(()=>{this.$request({url:"/domain/flow",params:{nid:this.nid,domain:this.domain,ts:this.times}}).then(t=>{0==t.data.rec?(this.data=t.data.data,this.echart()):clearInterval(this.otimer)})},this.inv)},getNidDom(){this.$request({url:"/domain/flow/nid/dom",params:{}}).then(t=>{0==t.data.rec?(this.domlist=t.data.data.dom,this.nidlist=t.data.data.nid):(this.$message.error(t.data.msg),clearInterval(this.otimer))})},selectNid(){"30m"==this.isActive?this.inv=1e3:this.inv=6e5,clearInterval(this.otimer),this.count()},selectDom(){"30m"==this.isActive?this.inv=1e3:this.inv=6e5,clearInterval(this.otimer),this.count()},t30m(){this.isActive="30m",clearInterval(this.otimer),this.times="30m",this.inv=1e3,this.count()},t3h(){this.isActive="3h",clearInterval(this.otimer),this.times="3h",this.inv=6e5,this.count()},t1d(){this.isActive="1d",clearInterval(this.otimer),this.times="1d",this.inv=6e5,this.count()},tyd(){this.isActive="yd",clearInterval(this.otimer),this.times="yd",this.inv=6e5,this.count()},t1w(){this.isActive="1w",clearInterval(this.otimer),this.times="1w",this.inv=6e5,this.count()},t1m(){this.isActive="1m",clearInterval(this.otimer),this.times="1m",this.inv=6e5,this.count()}},created(){this.gid=localStorage.getItem("gid"),this.nid=this.$route.query.nid},mounted(){this.getNidDom(),this.count(),this.$once("hook:beforeDestroy",()=>{clearInterval(this.otimer)})}},r=o,c=(e("4dff"),e("2877")),d=Object(c["a"])(r,s,a,!1,null,"0cfeb172",null);i["default"]=d.exports}}]);