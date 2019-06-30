webpackJsonp([27],{V1zS:function(e,t){},ixzl:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("mvHQ"),l=a.n(o),s=a("kMct"),n=a("EMXe"),i=a("Q338"),r={components:{ElButton:n.a,ElCol:s.a,tabHeader:i.a},name:"default",data:function(){return{form:{visitAuthor:"",patientId:"",motionNum:0,motionLength:0,visitRecordContent:{reactions:{},dosages:[{value:"",frequency:0,dose:0}]}},sfstatus:[{value:"0",label:"未完成"},{value:"1",label:"已完成"}],sfresult:[{value:"0",label:"非有效随访"},{value:"1",label:"有效随访"},{value:"2",label:"勿访"},{value:"3",label:"终止随访"}],sftype:[{value:"1",label:"电话随访"},{value:"2",label:"在线随访"},{value:"3",label:"短信随访"}],sfdischargeStatus:[{value:"0",label:"其他市级医院"},{value:"1",label:"乡镇卫生医院治疗"},{value:"2",label:"村卫生室治疗"},{value:"3",label:"回家康复"},{value:"4",label:"痊愈回家"}],sfassessment:[{value:"1",label:"并发症"},{value:"2",label:"相关指标控制不住"},{value:"3",label:"控制不满意"},{value:"4",label:"控制满意"},{value:"5",label:"不良生活方式未改善"}],sfsymptom:[{value:"0",label:"无症状"},{value:"1",label:"有症状",children:[]}],sflifeAssessment:[{value:"0",label:"无改善"},{value:"1",label:"有改善"}],sfsmokingVolume:[{value:"0",label:"未戒烟"},{value:"1",label:"已戒烟"}],sfalcoholConsumption:[{value:"0",label:"未减量"},{value:"1",label:"已减量"}],sfregion:[{value:"0",label:"差"},{value:"1",label:"一般"},{value:"2",label:"良好"}],sfmedicalCompliance:[{value:"0",label:"差"},{value:"1",label:"一般"},{value:"2",label:"良好"}],sfcomplication:[{value:"0",label:"无并发症"},{value:"1",label:"有并发症 "}],sfbfz:[],sfbfzName:[],bfz:{multiple:!0},sfmedicationCompliance:[{value:"0",label:"不服药"},{value:"1",label:"部分依从"},{value:"2",label:"完全依从"}],sfreactions:[{value:"0",label:"无不良反应"},{value:"1",label:"有不良反应"}],sfhealthGuidance:[{value:"1",label:"是"},{value:"0",label:"否"}],sfhealthGuidanceContent:[{value:"1",label:"饮食指导"},{value:"2",label:"用药指导"},{value:"3",label:"注意事项"},{value:"4",label:"心理指导"},{value:"5",label:"睡眠指导"},{value:"6",label:"康复指导"},{value:"7",label:"戒烟限酒指导"}],sfreminderRevisit:[{value:"1",label:"已提醒"},{value:"0",label:"未提醒"}],sfappointmentRevisit:[{value:"1",label:"已预约"},{value:"0",label:"未预约"}],sfdepartment:[{value:"0",label:"否"},{value:"1",label:"是",children:[]}],sfhealthAwareness:[{value:"0",label:"差"},{value:"1",label:"一般"},{value:"2",label:"良好"},{value:"3",label:"优秀"}],sfsatisfactionSurvey:[{value:"0",label:"不满意"},{value:"1",label:"基本满意"},{value:"2",label:"满意"},{value:"3",label:"非常满意"}],isReactions:!1,isSmokingAmount:!1,isAlcoholConsumptionAmount:!1,isAppointmentRevisit:!1,ishealthGuidanceContent:!1,iscomplication:!1,iscomplicationName:!1,bfzClassify:"",complicationName:"",personInfoId:"",personInfo:{}}},created:function(){this.personInfoId=this.$route.params.id,this.personInfo=JSON.parse(sessionStorage.getItem("personInfo")),this.getMedicalList(),this.getSymptomList()},mounted:function(){},methods:{reactionsChange:function(e){this.isReactions=1==e},smokingVolumeChange:function(e){this.isSmokingAmount=0==e},alcoholConsumptionChange:function(e){this.isAlcoholConsumptionAmount=0==e},appointmentRevisitChange:function(e){this.isAppointmentRevisit=1==e},healthGuidanceChange:function(e){this.ishealthGuidanceContent=1==e},complicationChange:function(e){1==e?(this.iscomplication=!0,this.getComplicationList()):this.iscomplication=!1},addDosage:function(){this.form.visitRecordContent.dosages.push({value:"",frequency:0,dose:0})},removeDosage:function(e){var t;-1!==(t=this.form.visitRecordContent.dosages.indexOf(e))&&this.form.visitRecordContent.dosages.splice(t,1),-1!==(t=this.form.visitRecordContent.dosages.indexOf(e))&&this.form.visitRecordContent.dosages.splice(t,1)},bfzChange:function(e){var t=this;this.iscomplicationName=!!e,this.$http.get("/api/common/getDataList?dataType=2&dataNum="+e).then(function(e){t.sfbfzName=e.data}).catch(function(e){console.log(e)})},onSubmit:function(){var e=this;if(""!==this.form.type){var t=this.form;if(t.patientId=this.personInfo.id,t.visitAuthor=this.$store.state.user.user.id,t.motionLength=Number(this.form.motionLength),t.motionNum=Number(this.form.motionNum),t.healthGuidanceContent instanceof Array&&(t.healthGuidanceContent=this.form.healthGuidanceContent.join(",")),t.complication instanceof Array){t.complication=this.form.complication.join(",");var a=l()(t.visitRecordContent);t.visitRecordContent=a}this.$http.post("/api/visitRecord/insertVisitRecord",t).then(function(a){t.healthGuidanceContent=[],a.data?(e.$message.success("新增随访成功！"),setTimeout(function(){e.$router.replace({name:"EssentialInfo",params:{selectId:"sfjl"}})},1500)):e.$message.error("新增随访失败！")}).catch(function(a){e.$message.error("随访新增失败！"),t.healthGuidanceContent=[],console.log(a)})}else this.$message.warning("随访方式未选择！")},cancelBtn:function(){this.$router.go(-1)},handleClose:function(e){this.$confirm("确认关闭？").then(function(t){e()}).catch(function(e){})},handleChange:function(e){console.log(e)},getMedicalList:function(){var e=this;this.$http.get("/api/medicalSections/getMedicalSectionsList?hospitalId="+this.$store.state.user.user.hospitalId.id).then(function(t){e.sfdepartment[1].children=t.data}).catch(function(e){console.log(e)})},getSymptomList:function(){var e=this;this.$http.get("/api/common/getDataList?dataType=1").then(function(t){e.sfsymptom[1].children=t.data}).catch(function(e){console.log(e)})},getComplicationList:function(){var e=this;this.$http.get("/api/common/getDataList?dataType=2").then(function(t){e.sfbfz=t.data}).catch(function(e){console.log(e)})},handleClick:function(e,t){console.log(e,t)}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h1",[e._v("8痛风模板")]),e._v(" "),a("tab-header",{attrs:{personInfo:e.personInfo}}),e._v(" "),a("el-form",{ref:"form",staticClass:"createVisit_form",attrs:{model:e.form,"label-width":"135px"}},[a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"随访状态 : "}},[a("el-cascader",{attrs:{options:e.sfstatus,props:{emitPath:!1}},on:{change:e.handleChange},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"随访结果 : "}},[a("el-cascader",{attrs:{options:e.sfresult,props:{emitPath:!1}},on:{change:e.handleChange},model:{value:e.form.result,callback:function(t){e.$set(e.form,"result",t)},expression:"form.result"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"随访方式 : "}},[a("el-cascader",{attrs:{options:e.sftype,props:{emitPath:!1}},on:{change:e.handleChange},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"出院/转出情况:"}},[a("el-cascader",{attrs:{placeholder:"请选择出院/转出情况",options:e.sfdischargeStatus,props:{emitPath:!1}},on:{change:e.handleChange},model:{value:e.form.dischargeStatus,callback:function(t){e.$set(e.form,"dischargeStatus",t)},expression:"form.dischargeStatus"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"本次随访评估:"}},[a("el-cascader",{attrs:{options:e.sfassessment,props:{emitPath:!1}},on:{change:e.handleChange},model:{value:e.form.assessment,callback:function(t){e.$set(e.form,"assessment",t)},expression:"form.assessment"}})],1)],1)],1),e._v(" "),a("h2",[e._v("项目随访情况")]),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"请选择症状 : "}},[a("el-cascader",{attrs:{options:e.sfsymptom,props:{emitPath:!1}},on:{change:e.handleChange},model:{value:e.form.symptom,callback:function(t){e.$set(e.form,"symptom",t)},expression:"form.symptom"}})],1)],1)],1),e._v(" "),a("h2",[e._v("生活方式")]),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"总体评估 : "}},[a("el-cascader",{attrs:{options:e.sflifeAssessment,props:{emitPath:!1}},on:{change:e.handleChange},model:{value:e.form.visitRecordContent.lifeAssessment,callback:function(t){e.$set(e.form.visitRecordContent,"lifeAssessment",t)},expression:"form.visitRecordContent.lifeAssessment"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"吸烟量 : "}},[a("el-cascader",{attrs:{options:e.sfsmokingVolume,props:{emitPath:!1}},on:{change:e.smokingVolumeChange},model:{value:e.form.smokingVolume,callback:function(t){e.$set(e.form,"smokingVolume",t)},expression:"form.smokingVolume"}})],1)],1),e._v(" "),a("el-col",{directives:[{name:"show",rawName:"v-show",value:e.isSmokingAmount,expression:"isSmokingAmount"}],attrs:{span:8}},[a("el-form-item",{attrs:{label:"支/天"}},[a("el-input-number",{attrs:{min:0,max:9999},model:{value:e.form.visitRecordContent.smokingAmount,callback:function(t){e.$set(e.form.visitRecordContent,"smokingAmount",t)},expression:"form.visitRecordContent.smokingAmount"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"饮酒量 : "}},[a("el-cascader",{attrs:{options:e.sfalcoholConsumption,props:{emitPath:!1}},on:{change:e.alcoholConsumptionChange},model:{value:e.form.alcoholConsumption,callback:function(t){e.$set(e.form,"alcoholConsumption",t)},expression:"form.alcoholConsumption"}})],1)],1),e._v(" "),a("el-col",{directives:[{name:"show",rawName:"v-show",value:e.isAlcoholConsumptionAmount,expression:"isAlcoholConsumptionAmount"}],attrs:{span:8}},[a("el-form-item",{attrs:{label:"ML/天"}},[a("el-input-number",{attrs:{min:0,max:9999},model:{value:e.form.visitRecordContent.alcoholConsumptionAmount,callback:function(t){e.$set(e.form.visitRecordContent,"alcoholConsumptionAmount",t)},expression:"form.visitRecordContent.alcoholConsumptionAmount"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"膳食脂肪"}},[a("el-input",{model:{value:e.form.dietaryFat,callback:function(t){e.$set(e.form,"dietaryFat",t)},expression:"form.dietaryFat"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"运动(次/周)"}},[a("el-input-number",{attrs:{min:0,max:9999,label:"运动(次/周)"},model:{value:e.form.motionNum,callback:function(t){e.$set(e.form,"motionNum",t)},expression:"form.motionNum"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"运动(分钟/次)"}},[a("el-input-number",{attrs:{min:0,max:9999,label:"运动(次/周)"},model:{value:e.form.motionLength,callback:function(t){e.$set(e.form,"motionLength",t)},expression:"form.motionLength"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"摄盐情况(克/天)"}},[a("el-input",{model:{value:e.form.saltUptake,callback:function(t){e.$set(e.form,"saltUptake",t)},expression:"form.saltUptake"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"心理调整 : "}},[a("el-cascader",{attrs:{options:e.sfregion,props:{emitPath:!1}},on:{change:e.handleChange},model:{value:e.form.region,callback:function(t){e.$set(e.form,"region",t)},expression:"form.region"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"医从性 : "}},[a("el-cascader",{attrs:{options:e.sfmedicalCompliance,props:{emitPath:!1}},on:{change:e.handleChange},model:{value:e.form.medicalCompliance,callback:function(t){e.$set(e.form,"medicalCompliance",t)},expression:"form.medicalCompliance"}})],1)],1)],1),e._v(" "),a("h2",[e._v("并发症")]),e._v(" "),a("el-row",{attrs:{gutter:0}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"是否有并发症状 : "}},[a("el-cascader",{attrs:{options:e.sfcomplication},on:{change:e.complicationChange}})],1)],1),e._v(" "),a("el-col",{directives:[{name:"show",rawName:"v-show",value:e.iscomplication,expression:"iscomplication"}],attrs:{span:8}},[a("el-form-item",{attrs:{label:"并发症 : "}},[a("el-select",{on:{change:e.bfzChange},model:{value:e.bfzClassify,callback:function(t){e.bfzClassify=t},expression:"bfzClassify"}},e._l(e.sfbfz,function(e){return a("el-option",{key:e.value,attrs:{value:e.value,label:e.label}})}),1)],1)],1),e._v(" "),a("el-col",{directives:[{name:"show",rawName:"v-show",value:e.iscomplicationName,expression:"iscomplicationName"}],attrs:{span:8}},[a("el-form-item",{attrs:{label:"具体症状："}},[a("el-cascader",{attrs:{options:e.sfbfzName,props:e.bfz},model:{value:e.form.complication,callback:function(t){e.$set(e.form,"complication",t)},expression:"form.complication"}})],1)],1)],1),e._v(" "),a("h2",[e._v("用药情况")]),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"依从性 : "}},[a("el-cascader",{attrs:{options:e.sfmedicationCompliance,props:{emitPath:!1}},on:{change:e.handleChange},model:{value:e.form.medicationCompliance,callback:function(t){e.$set(e.form,"medicationCompliance",t)},expression:"form.medicationCompliance"}})],1)],1)],1),e._v(" "),e._l(e.form.visitRecordContent.dosages,function(t,o){return a("el-row",{key:o},[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"药物名称"}},[a("el-input",{model:{value:t.value,callback:function(a){e.$set(t,"value",a)},expression:"dosage.value"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"次/日"}},[a("el-input-number",{attrs:{min:0,max:9999,label:"次"},model:{value:t.frequency,callback:function(a){e.$set(t,"frequency",a)},expression:"dosage.frequency"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"mg/次"}},[a("el-input-number",{attrs:{min:0,max:9999,label:"mg"},model:{value:t.dose,callback:function(a){e.$set(t,"dose",a)},expression:"dosage.dose"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",[a("el-button",{on:{click:function(a){return a.preventDefault(),e.removeDosage(t)}}},[e._v("删除")])],1)],1)],1)}),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:24}},[a("el-form-item",[a("el-button",{on:{click:function(t){return t.preventDefault(),e.addDosage(t)}}},[e._v("新增")])],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"药物不良反应 : "}},[a("el-cascader",{attrs:{options:e.sfreactions,props:{emitPath:!1}},on:{change:e.reactionsChange},model:{value:e.form.visitRecordContent.reactions.value,callback:function(t){e.$set(e.form.visitRecordContent.reactions,"value",t)},expression:"form.visitRecordContent.reactions.value"}})],1)],1),e._v(" "),a("el-col",{directives:[{name:"show",rawName:"v-show",value:e.isReactions,expression:"isReactions"}],attrs:{span:16}},[a("el-form-item",{attrs:{label:"不良反应："}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.form.visitRecordContent.reactions.desc,callback:function(t){e.$set(e.form.visitRecordContent.reactions,"desc",t)},expression:"form.visitRecordContent.reactions.desc"}})],1)],1)],1),e._v(" "),a("h2",[e._v("异常化验项目")]),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"白细胞"}},[a("el-input",{attrs:{placeholder:"自定义"},model:{value:e.form.visitRecordContent.whiteBloodCell,callback:function(t){e.$set(e.form.visitRecordContent,"whiteBloodCell",t)},expression:"form.visitRecordContent.whiteBloodCell"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"血小板"}},[a("el-input",{attrs:{placeholder:"自定义"},model:{value:e.form.visitRecordContent.platelet,callback:function(t){e.$set(e.form.visitRecordContent,"platelet",t)},expression:"form.visitRecordContent.platelet"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"血钾"}},[a("el-input",{attrs:{placeholder:"自定义"},model:{value:e.form.visitRecordContent.bloodPotassium,callback:function(t){e.$set(e.form.visitRecordContent,"bloodPotassium",t)},expression:"form.visitRecordContent.bloodPotassium"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"血钙"}},[a("el-input",{attrs:{placeholder:"自定义"},model:{value:e.form.visitRecordContent.bloodCalcium,callback:function(t){e.$set(e.form.visitRecordContent,"bloodCalcium",t)},expression:"form.visitRecordContent.bloodCalcium"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"凝血"}},[a("el-input",{attrs:{placeholder:"自定义"},model:{value:e.form.visitRecordContent.blood_coagulation,callback:function(t){e.$set(e.form.visitRecordContent,"blood_coagulation",t)},expression:"form.visitRecordContent.blood_coagulation"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"甘油三脂"}},[a("el-input",{attrs:{placeholder:"自定义"},model:{value:e.form.visitRecordContent.threeFat,callback:function(t){e.$set(e.form.visitRecordContent,"threeFat",t)},expression:"form.visitRecordContent.threeFat"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"其他"}},[a("el-input",{attrs:{placeholder:"自定义"},model:{value:e.form.visitRecordContent.other,callback:function(t){e.$set(e.form.visitRecordContent,"other",t)},expression:"form.visitRecordContent.other"}})],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"随访备注 : "}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1),e._v(" "),a("h2",[e._v("健康教育知晓")]),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"是否进行健康指导 : "}},[a("el-cascader",{attrs:{options:e.sfhealthGuidance,props:{emitPath:!1}},on:{change:e.healthGuidanceChange},model:{value:e.form.visitRecordContent.healthGuidance,callback:function(t){e.$set(e.form.visitRecordContent,"healthGuidance",t)},expression:"form.visitRecordContent.healthGuidance"}})],1)],1),e._v(" "),a("el-col",{directives:[{name:"show",rawName:"v-show",value:e.ishealthGuidanceContent,expression:"ishealthGuidanceContent"}],attrs:{span:8}},[a("el-form-item",{attrs:{label:"健康指导内容  : "}},[a("el-cascader",{attrs:{options:e.sfhealthGuidanceContent,props:{emitPath:!1}},on:{change:e.handleChange},model:{value:e.form.visitRecordContent.healthGuidanceContent,callback:function(t){e.$set(e.form.visitRecordContent,"healthGuidanceContent",t)},expression:"form.visitRecordContent.healthGuidanceContent"}})],1)],1)],1),e._v(" "),a("h2",[e._v("随访记录")]),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"已提醒复诊 : "}},[a("el-cascader",{attrs:{options:e.sfreminderRevisit,props:{emitPath:!1}},on:{change:e.handleChange},model:{value:e.form.reminderRevisit,callback:function(t){e.$set(e.form,"reminderRevisit",t)},expression:"form.reminderRevisit"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"已预约复诊 : "}},[a("el-cascader",{attrs:{options:e.sfappointmentRevisit,props:{emitPath:!1}},on:{change:e.appointmentRevisitChange},model:{value:e.form.appointmentRevisit,callback:function(t){e.$set(e.form,"appointmentRevisit",t)},expression:"form.appointmentRevisit"}})],1)],1)],1),e._v(" "),a("el-row",{directives:[{name:"show",rawName:"v-show",value:e.isAppointmentRevisit,expression:"isAppointmentRevisit"}],attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"预约科室 : "}},[a("el-cascader",{attrs:{options:e.sfdepartment,props:{emitPath:!1}},on:{change:e.handleChange},model:{value:e.form.department,callback:function(t){e.$set(e.form,"department",t)},expression:"form.department"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"复诊时间 : "}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",required:""},model:{value:e.form.revisitTime,callback:function(t){e.$set(e.form,"revisitTime",t)},expression:"form.revisitTime"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:80}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"健康知晓度 : "}},[a("el-cascader",{attrs:{options:e.sfhealthAwareness,props:{emitPath:!1}},on:{change:e.handleChange},model:{value:e.form.healthAwareness,callback:function(t){e.$set(e.form,"healthAwareness",t)},expression:"form.healthAwareness"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"满意度调研 : "}},[a("el-cascader",{attrs:{options:e.sfsatisfactionSurvey,props:{emitPath:!1}},on:{change:e.handleChange},model:{value:e.form.satisfactionSurvey,callback:function(t){e.$set(e.form,"satisfactionSurvey",t)},expression:"form.satisfactionSurvey"}})],1)],1)],1),e._v(" "),a("el-form-item",{staticStyle:{"text-align":"center"}},[a("el-button",{attrs:{type:"success"},on:{click:e.onSubmit}},[e._v("完成随访")]),e._v(" "),a("el-button",{on:{click:e.cancelBtn}},[e._v("取消")])],1)],2)],1)},staticRenderFns:[]};var m=a("VU/8")(r,c,!1,function(e){a("V1zS")},"data-v-3a1fdd76",null);t.default=m.exports}});