webpackJsonp([10],{JQJK:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("msXN"),n=a("kMct"),r=a("EMXe"),i=a("Q338"),o={name:"ElContainer",componentName:"ElContainer",props:{direction:String},computed:{isVertical:function(){return"vertical"===this.direction||"horizontal"!==this.direction&&(!(!this.$slots||!this.$slots.default)&&this.$slots.default.some(function(t){var e=t.componentOptions&&t.componentOptions.tag;return"el-header"===e||"el-footer"===e}))}}},l={render:function(){var t=this.$createElement;return(this._self._c||t)("section",{staticClass:"el-container",class:{"is-vertical":this.isVertical}},[this._t("default")],2)},staticRenderFns:[]},c=a("VU/8")(o,l,!1,null,null,null).exports,d=a("DoGJ");a("7+uW").default.filter("type",function(t){switch(t){case 1:return"电话随访";case 2:return"在线随访";case 3:return"短信随访 ";case 4:return"电话随访";default:return"未知随访"}});var p={mixins:[s.a],components:{ElRow:d.a,ElContainer:c,ElButton:r.a,ElCol:n.a,tabHeader:i.a},name:"EssentialInfo",data:function(){return{personInfoId:"",personInfo:{},jhxxStopdialog:!1,activeName:"jbxx",form1:{name:"",sex:-1,age:0,idCard:"",groupId:"",remark:"",phone:"",q1:""},myddcForm:{q1:"",q2:"",q3:"",q4:"",q5:"",q6:""},currentDate:"2018/06/07",cyxjArray:[],sfjyArray:[],jhxxArray:[],jhglArray:[],sfjlArray:[],grtzArray:[],cyxjImgSrc:"http://www.tianya999.com/uploads/allimg/190423/2313-1Z423140328.gif",getPlanStatus:!1,getSignStatus:!1,getsfjhStatus:!1,getsfjlStatus:!1,planId:null}},created:function(){this.personInfoId=this.$route.params.id,this.getUsers(),this.getVisitRecord(),this.getSummary(),this.getSign(),this.getPlan(),this.getHealthPlan(this.page.current,this.page.size)},mounted:function(){"sfjl"==this.$route.params.selectId&&(this.activeName="sfjl"),"jhxx"==this.$route.params.selectId&&(this.activeName="jhxx")},methods:{handleSearch:function(){this.getHealthPlan(1,this.page.size)},handlePageCurrentChange:function(t){this.page.current=t,this.getHealthPlan(this.page.current,this.page.size)},jhxxAdd:function(){this.$router.push("/createPlan")},jhxxEdit:function(t){this.$router.push({path:"/createPlan",query:{planId:t}})},showjhxxStop:function(t){this.jhxxStopdialog=!0,this.planId=t},stopjhxx:function(t){var e=this;this.$http.post("/api/plan/updatePlanStatus",{planId:this.planId}).then(function(t){t.data?(e.$message.success("终止计划成功"),e.jhxxStopdialog=!1,e.getHealthPlan(e.page.current,e.page.size)):(e.$message.error("终止计划失败"),e.jhxxStopdialog=!1)}).catch(function(t){console.log(t)})},jhxxStop:function(t){var e=this;this.$http.post("/api/plan/updatePlanStatus?",{planId:t}).then(function(t){t.data?(e.$message.success("随访计划终止成功"),e.getPlan()):e.$message.error("随访计划终止失败")}).catch(function(t){console.log(t)})},handleClick:function(t,e){},handleClose:function(t){this.$confirm("确认关闭？").then(function(e){t()}).catch(function(t){})},getUsers:function(){var t=this;this.personInfo=JSON.parse(sessionStorage.getItem("personInfo")),this.$http.get("/api/patient/getPatientInfoByUserId?userId="+this.personInfo.id).then(function(e){t.form1=e.data}).catch(function(t){console.log(t)})},getVisitRecord:function(){var t=this;this.$http.get("/api/visitRecord/getVisitRecordListByVisitAuthor?patientId="+this.personInfo.id+"&visitAuthorId="+this.$store.state.user.user.id+"&pageNum=1&pageSize=5").then(function(e){0==e.data.list.length?t.getsfjlStatus=!0:(t.getsfjlStatus=!1,t.sfjlArray=e.data.list),console.log(e)}).catch(function(t){console.log(t)})},getSummary:function(){var t=this;this.$http.get("/api/patient/getSummaryList?userId="+this.personInfo.id+"&pageNum=1&pageSize=100").then(function(e){t.cyxjArray=e.data}).catch(function(t){console.log(t)})},getSign:function(){var t=this;this.$http.get("/api/bodySignRecord/getBodySignListByPatientId?patientId="+this.personInfo.id).then(function(e){0===e.data.length?t.getSignStatus=!0:(t.grtzArray=e.data,t.getSignStatus=!1)}).catch(function(t){console.log(t)})},getSignEchart:function(){var t=this;this.$http.get("/api/bodySignRecord/getBackBodySignRecordByTime?patientId="+this.personInfo.id+"&bodySignTypeId="+this).then(function(e){console.log(e),0==e.data.length?t.getSignStatus=!0:(t.grtzArray=e.data,t.getSignStatus=!1)}).catch(function(t){console.log(t)})},lookInfo:function(t){this.$router.replace({name:"queryVisit",params:{routerForm:"EssentialInfo",id:t}})},getPlan:function(){var t=this;this.$http.get("/api/visitRecord/getVisitRecordListByUserIdAndPatientId?userId="+this.$store.state.user.user.id+"&patientId="+this.personInfo.id+"&pageNum=1&pageSize=5").then(function(e){0===e.data.list.length?t.getsfjhStatus=!0:(t.getsfjhStatus=!1,t.sfjyArray=e.data.list)}).catch(function(t){console.log(t)})},getHealthPlan:function(t,e){var a=this;this.$http.get("/api/plan/getPlanByPatientId?patientId="+this.personInfo.id+"&pageNum="+t+"&pageSize="+e).then(function(t){0===t.data.list.length?(a.getPlanStatus=!0,a.page.total=0):(a.jhglArray=t.data.list,a.page.total=t.data.total)}).catch(function(t){console.log(t)})},createVisit:function(){this.$router.push("/createVisit")}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-tabs",{staticClass:"el_tab",staticStyle:{padding:"30px","background-color":"#fff"},attrs:{stretch:!0},on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"基本信息",name:"jbxx"}},[a("tab-header",{attrs:{personInfo:t.personInfo}}),t._v(" "),a("el-form",{ref:"form1",attrs:{model:t.form1,"label-width":"100px"}},[a("el-row",{attrs:{gutter:100}},[a("el-col",{attrs:{span:8,offset:4}},[a("el-form-item",{attrs:{label:"姓名"}},[a("el-input",{attrs:{disabled:""},model:{value:t.form1.name,callback:function(e){t.$set(t.form1,"name",e)},expression:"form1.name"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"身份证号"}},[a("el-input",{attrs:{disabled:""},model:{value:t.form1.idCard,callback:function(e){t.$set(t.form1,"idCard",e)},expression:"form1.idCard"}})],1)],1)],1),t._v(" "),a("el-row",{attrs:{gutter:100}},[a("el-col",{attrs:{span:8,offset:4}},[a("el-form-item",{attrs:{label:"性别"}},[a("el-radio-group",{attrs:{disabled:""},model:{value:t.form1.sex,callback:function(e){t.$set(t.form1,"sex",e)},expression:"form1.sex"}},[a("el-input",{attrs:{"v-model":1==t.form1.sex?"男":"女",disabled:""}})],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"联系人名称"}},[a("el-input",{attrs:{disabled:""},model:{value:t.form1.telName,callback:function(e){t.$set(t.form1,"telName",e)},expression:"form1.telName"}})],1)],1)],1),t._v(" "),a("el-row",{attrs:{gutter:100}},[a("el-col",{attrs:{span:8,offset:4}},[a("el-form-item",{attrs:{label:"年龄"}},[a("el-input-number",{attrs:{min:0,max:150,disabled:""},model:{value:t.form1.age,callback:function(e){t.$set(t.form1,"age",e)},expression:"form1.age"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"联系人电话"}},[a("el-input",{attrs:{disabled:""},model:{value:t.form1.relationPhone,callback:function(e){t.$set(t.form1,"relationPhone",e)},expression:"form1.relationPhone"}})],1)],1)],1),t._v(" "),a("el-row",{attrs:{gutter:100}},[a("el-col",{attrs:{span:8,offset:4}},[a("el-form-item",{attrs:{label:"病人电话"}},[a("el-input",{attrs:{disabled:""},model:{value:t.form1.phone,callback:function(e){t.$set(t.form1,"phone",e)},expression:"form1.phone"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"联系人关系"}},[a("el-input",{attrs:{disabled:""},model:{value:t.form1.relation,callback:function(e){t.$set(t.form1,"relation",e)},expression:"form1.relation"}})],1)],1)],1),t._v(" "),a("el-row",{attrs:{gutter:100}},[a("el-col",{attrs:{span:8,offset:4}},[a("el-form-item",{attrs:{label:"责任医生"}},[a("el-input",{attrs:{disabled:""},model:{value:t.form1.doctorName,callback:function(e){t.$set(t.form1,"doctorName",e)},expression:"form1.doctorName"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"疾病管理师"}},[a("el-input",{attrs:{disabled:""},model:{value:t.form1.diseaseManagerName,callback:function(e){t.$set(t.form1,"diseaseManagerName",e)},expression:"form1.diseaseManagerName"}})],1)],1)],1),t._v(" "),a("el-row",{attrs:{gutter:100}},[a("el-col",{attrs:{span:8,offset:4}},[a("el-form-item",{attrs:{label:"创建时间"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期",disabled:""},model:{value:t.form1.createDate,callback:function(e){t.$set(t.form1,"createDate",e)},expression:"form1.createDate"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"创建人"}},[a("el-input",{attrs:{disabled:""},model:{value:t.form1.createUser,callback:function(e){t.$set(t.form1,"createUser",e)},expression:"form1.createUser"}})],1)],1)],1)],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"出院小结",name:"cyxj"}},[a("tab-header",{attrs:{personInfo:t.personInfo}}),t._v(" "),t._l(t.cyxjArray,function(e){return a("el-row",{key:e.id,staticStyle:{margin:"0 0 20px"}},[a("el-col",{attrs:{span:16,offset:4}},[a("el-card",{staticClass:"cyxj_card",attrs:{"body-style":{padding:"0px"}}},[a("iframe",{attrs:{src:e.summaryofdischarge,width:"100%",height:"400px",frameborder:"0"}}),t._v(" "),a("div",{staticStyle:{padding:"14px"}},[a("span",[t._v(t._s(e.department))]),t._v(" "),a("div",{staticClass:"bottom clearfix"},[a("time",{staticClass:"time"},[t._v(t._s(e.outhospitaldate))])])])])],1)],1)})],2),t._v(" "),a("el-tab-pane",{staticClass:"sfjh",attrs:{label:"随访计划",name:"sfjh"}},[a("tab-header",{attrs:{personInfo:t.personInfo}}),t._v(" "),a("el-col",[t.getsfjhStatus?t._e():a("h2",{staticStyle:{"margin-bottom":"30px"}},[t._v("随访计划")]),t._v(" "),t._l(t.sfjyArray,function(e){return a("el-card",{key:e.sfjlId,staticClass:"box-card grtz_box"},[a("div",{staticClass:"clearfix grtz_title",attrs:{slot:"header"},slot:"header"},[a("span",[t._v("\n            "+t._s(e.visitDate)+"\n            "),a("span",{staticClass:"f-right"},[t._v(t._s(1==e.status?"已随访":"未随访"))])])]),t._v(" "),a("div",{staticClass:"text item grtz_content"},[a("p",[a("span",[t._v("随访建议 : "+t._s(e.visitRecord.content))])])])])}),t._v(" "),t.getsfjhStatus?a("el-card",{staticClass:"box-card jhxx_box"},[a("h2",{staticStyle:{"text-align":"center",color:"#999","font-size":"21px","line-height":"60px"}},[t._v("暂无数据！")])]):t._e()],2)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"计划管理",name:"jhxx"}},[a("tab-header",{attrs:{personInfo:t.personInfo}}),t._v(" "),a("div",{staticStyle:{"text-align":"right",margin:"30px 0"}},[a("el-button",{attrs:{type:"primary"},on:{click:t.jhxxAdd}},[t._v("追加计划")])],1),t._v(" "),t._l(t.jhglArray,function(e){return a("el-card",{key:e.id,staticClass:"box-card jhxx_box"},[a("div",{staticClass:"clearfix jhxx_title",attrs:{slot:"header"},slot:"header"},[a("span",[t._v("\n          "+t._s(e.name)+"\n          "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.createDate&&e.endDate,expression:"item.createDate && item.endDate"}],staticClass:"jhxx_titleTime"},[t._v("("+t._s(e.createDate)+" 至 "+t._s(e.endDate)+" )")])]),t._v(" "),a("ul",{staticClass:"suggest-list"},t._l(e.item,function(e,s){return a("li",{key:s},[a("span",[t._v(t._s(e.detailType)+":")]),t._v(" "),a("span",[t._v(t._s(e.content))])])}),0),t._v(" "),a("el-button",{staticClass:"f-right",attrs:{type:"primary",round:"",disabled:1==e.status},on:{click:t.createVisit}},[t._v("去随访")])],1),t._v(" "),a("div",{staticClass:"text item"}),t._v(" "),a("div",{staticClass:"jhxx_btn"},[a("el-row",[a("el-button",{attrs:{type:"primary",disabled:1==e.status},on:{click:function(a){return t.jhxxEdit(e.planId)}}},[t._v("修改计划")]),t._v(" "),a("el-button",{attrs:{type:"danger",disabled:1==e.status},on:{click:function(a){return t.showjhxxStop(e.planId)}}},[t._v(t._s(1==e.status?"已终止":"终止计划"))])],1)],1)])}),t._v(" "),t.getPlanStatus?a("el-card",{staticClass:"box-card jhxx_box"},[a("h2",{staticStyle:{"text-align":"center",color:"#999"}},[t._v("暂无数据！")])]):t._e(),t._v(" "),a("el-pagination",{attrs:{"current-page":t.page.current,"page-sizes":t.page.sizes,"page-size":t.page.size,layout:t.page.layout,total:t.page.total},on:{"size-change":t.handlePageSizeChange,"current-change":t.handlePageCurrentChange}})],2),t._v(" "),a("el-tab-pane",{attrs:{label:"随访记录",name:"sfjl"}},[a("tab-header",{attrs:{personInfo:t.personInfo}}),t._v(" "),t._l(t.sfjlArray,function(e){return a("el-card",{key:e.sfjlId,staticClass:"box-card sfjl_box"},[a("div",{staticClass:"clearfix sfjl_title",attrs:{slot:"header"},slot:"header"},[a("span",[a("span",{staticClass:"sfjlTime"},[t._v(t._s(e.patient))]),t._v(" "),a("span",{staticClass:"sfjlTime"},[t._v(t._s(e.visitDate))]),t._v(" "),a("span",{staticClass:"sfjlTime"},[t._v(t._s(t._f("type")(e.type)))]),t._v(" "),a("span",{staticClass:"sfjlTime"},[t._v("备注 : "+t._s(e.remark))])]),t._v(" "),a("el-button",{staticClass:"f-right",attrs:{type:"primary",round:""},on:{click:function(a){return t.lookInfo(e.id)}}},[t._v("查看随访详情")])],1)])}),t._v(" "),t.getsfjlStatus?a("el-card",{staticClass:"box-card jhxx_box"},[a("h2",{staticStyle:{"text-align":"center",color:"#999","font-size":"21px"}},[t._v("暂无数据！")])]):t._e(),t._v(" "),a("el-pagination",{attrs:{"current-page":t.page.current,"page-sizes":t.page.sizes,"page-size":t.page.size,layout:t.page.layout,total:t.page.total},on:{"size-change":t.handlePageSizeChange,"current-change":t.handlePageCurrentChange}})],2),t._v(" "),a("el-tab-pane",{attrs:{label:"个人体征",name:"grtz"}},[a("tab-header",{attrs:{personInfo:t.personInfo}}),t._v(" "),t._l(t.grtzArray,function(e){return a("el-card",{key:e.bodySignTypeId,staticClass:"box-card grtz_box"},[a("div",{staticClass:"clearfix grtz_title",attrs:{slot:"header"},slot:"header"},[a("span",[t._v("\n          "+t._s(e.bodySignType)+"\n          "),null!=e.createTime?a("span",{staticClass:"grtz_titleTime"},[t._v("("+t._s(e.createTime)+")")]):t._e()]),t._v(" "),a("p",[a("span",[t._v("初始"+t._s(e.bodySignType)+"记录 : "+t._s(e.oldValue.value))]),t._v(" "),a("span",[t._v("最新"+t._s(e.bodySignType)+"记录 : "+t._s(e.value))]),t._v(" "),a("span",{staticClass:"f-right"},[t._v(t._s(0==e.sureUpdate?"未更新":"已更新"))])])]),t._v(" "),a("div",{staticClass:"text item grtz_content",attrs:{id:"grtz_chart"+e.bodySignTypeId}})])}),t._v(" "),t.getSignStatus?a("el-card",{staticClass:"box-card jhxx_box"},[a("h2",{staticStyle:{"text-align":"center",color:"#999"}},[t._v("暂无数据！")])]):t._e()],2),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.jhxxStopdialog,width:"30%"},on:{"update:visible":function(e){t.jhxxStopdialog=e}}},[a("span",[t._v("是否终止计划")]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.jhxxStopdialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.stopjhxx}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};var f=a("VU/8")(p,u,!1,function(t){a("QORG")},"data-v-9a641086",null);e.default=f.exports},QORG:function(t,e){}});