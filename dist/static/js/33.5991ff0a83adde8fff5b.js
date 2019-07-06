webpackJsonp([33],{gyGN:function(t,e){},xnkQ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={data:function(){return{filters:{name:""},value:"",total:20,page:1,size:1,currentPage:1,listLoading:!1,usersList:[],user:null,ksArray:[],addFormVisible:!1,addForm:{name:"",description:""},editFormVisible:!1,editForm:{name:"",description:""}}},methods:{getksList:function(){var t=this;t.$http.get("/api/medicalSections/getMedicalSectionsPage?hospitalId="+t.$store.state.user.user.hospitalId.id+"&name="+t.filters.name).then(function(e){console.log(e.data,"获取医院科室列表"),t.ksArray=e.data.list}).catch(function(t){console.log(t)})},handleAdd:function(){this.addFormVisible=!0},addDepartment:function(){var t=this;t.addForm.hospitalId=t.$store.state.user.user.hospitalId.id,t.$http.post("/api/medicalSections/addMedicalSections",t.addForm).then(function(e){e.data?(t.$message.success("新增科室成功"),t.getksList(),t.addFormVisible=!1):(t.$message.error("新增科室失败"),t.addFormVisible=!1)}).catch(function(t){console.log(t)})},delDepartment:function(t,e){var a=this;this.$confirm("此操作将删除该科室, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"error"}).then(function(){a.$http.post("/api/medicalSections/deleteMedicalSections",{id:e.id}).then(function(t){t.data?(a.$message.success("删除科室成功"),a.getksList(),a.addFormVisible=!1):(a.$message.error("删除科室失败"),a.addFormVisible=!1)}).catch(function(t){console.log(t)})}).catch(function(){})},handleEdit:function(t,e){this.editFormVisible=!0,this.editForm=e},upDateDepartment:function(){var t=this;t.$http.post("/api/medicalSections/updateMedicalSections",t.editForm).then(function(e){e.data?(t.$message.success("修改科室成功"),t.getksList(),t.editFormVisible=!1):(t.$message.error("修改科室失败"),t.editFormVisible=!1)}).catch(function(t){console.log(t)})},handleSizeChange:function(){},handleCurrentChange:function(){},formatSatus:function(t,e){},formBtnStatus:function(t,e){},changelInfo:function(t,e){}},mounted:function(){this.getksList()}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"table_container"},[a("el-col",{staticClass:"toolbar toolbar_title",attrs:{span:24}},[a("h3",[t._v("科室管理")]),t._v(" "),a("el-form",{staticClass:"toolbar_form",attrs:{inline:!0,model:t.filters}},[a("el-form-item",{staticClass:"f-left search_input"},[a("el-input",{attrs:{placeholder:"科室名"},model:{value:t.filters.name,callback:function(e){t.$set(t.filters,"name",e)},expression:"filters.name"}},[a("template",{attrs:{icon:"el-icon-search"},slot:"append"},[a("el-button",{staticStyle:{"background-color":"#52d7ac","border-radius":"0",color:"#fff",border:"1px solid #52d7ac"},attrs:{type:"primary"},on:{click:t.getksList}},[a("i",{staticClass:"el-icon-search",staticStyle:{"margin-right":"5px"}}),t._v("搜索")])],1)],2)],1),t._v(" "),a("el-form-item",[a("el-button",{staticStyle:{"background-color":"#52d7ac",border:"0","font-size":"14px"},attrs:{type:"primary"},on:{click:t.handleAdd}},[t._v("新增科室")])],1)],1)],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.ksArray,border:!0,stripe:"","highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"name",align:"center",label:"科室名称",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",align:"center",label:"创建时间",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"description",align:"center",label:"科室描述",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"80",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticStyle:{color:"#f8b14b"},attrs:{round:"",type:"text"},on:{click:function(a){return t.handleEdit(e.$index,e.row)}}},[a("i",{staticClass:"el-icon-edit-outline",staticStyle:{"margin-right":"5px"}}),t._v("修改科室")]),t._v(" "),a("el-button",{staticStyle:{color:"#e15939"},attrs:{round:"",type:"text"},on:{click:function(a){return t.delDepartment(e.$index,e.row)}}},[a("i",{staticClass:"el-icon-delete",staticStyle:{"margin-right":"5px"}}),t._v("删除科室")])]}}])})],1),t._v(" "),t.ksArray.length>10?a("el-col",{staticClass:"toolbar toolbar_page",attrs:{span:24}},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,30,40],"page-size":t.size,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e(),t._v(" "),a("el-dialog",{attrs:{title:"新增科室",visible:t.addFormVisible,"modal-append-to-body":!1},on:{"update:visible":function(e){t.addFormVisible=e}}},[a("el-form",{ref:"addForm",attrs:{model:t.addForm,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"\t科室名称",prop:"name"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addForm.name,callback:function(e){t.$set(t.addForm,"name",e)},expression:"addForm.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"\t科室描述",prop:"description"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addForm.description,callback:function(e){t.$set(t.addForm,"description",e)},expression:"addForm.description"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{nativeOn:{click:function(e){t.addFormVisible=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},nativeOn:{click:function(e){return t.addDepartment(e)}}},[t._v("提交")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"修改科室",visible:t.editFormVisible,"modal-append-to-body":!1},on:{"update:visible":function(e){t.editFormVisible=e}}},[a("el-form",{ref:"editForm",attrs:{model:t.editForm,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"\t科室名称",prop:"name"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.editForm.name,callback:function(e){t.$set(t.editForm,"name",e)},expression:"editForm.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"\t科室描述",prop:"description"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.editForm.description,callback:function(e){t.$set(t.editForm,"description",e)},expression:"editForm.description"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{nativeOn:{click:function(e){t.editFormVisible=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},nativeOn:{click:function(e){return t.upDateDepartment(e)}}},[t._v("提交")])],1)],1)],1)},staticRenderFns:[]};var n=a("VU/8")(i,o,!1,function(t){a("gyGN")},"data-v-0823a068",null);e.default=n.exports}});