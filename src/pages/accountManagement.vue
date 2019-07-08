<template>
  <section class="table_container">
    <!--顶部工具条-->
    <el-col :span="24" class="toolbar toolbar_title" style="padding-bottom: 0px;">
      <h3>账号管理</h3>
      <el-form :inline="true" :model="filters" class="toolbar_form">
        <el-form-item>
          <el-button
            type="primary"
            @click="addPatient"
            style="background-color: #52d7ac; border: 0; font-size: 14px"
          >添加账号</el-button>
        </el-form-item>
        <el-form-item class="f-right search_input">
          <el-input v-model="filters.name" placeholder="姓名/手机号/身份证号">
            <template slot="append" icon="el-icon-search">
              <el-button
                type="primary"
                v-on:click="getUsers"
                style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac"
              >
                <i class="el-icon-search" style="margin-right: 5px"></i>搜索
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="usersList"
      :border="true"
      stripe
      highlight-current-row
      v-loading="listLoading"
      @selection-change="handleSelectionChange"
      style="width: 100%;"
    >
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column prop="name" align="center" label="姓名" width="80" sortable></el-table-column>
      <el-table-column prop="groupId.groupName" align="center" width="100" label="组名" sortable></el-table-column>
      <el-table-column prop="idCard" align="center" label="身份证号" width="200"></el-table-column>
      <el-table-column
        prop="sex"
        align="center"
        label="性别"
        width="80"
        :formatter="formatSex"
        sortable
      ></el-table-column>
      <el-table-column prop="age" align="center" label="年龄" width="80" sortable></el-table-column>
      <el-table-column prop="phone" align="center" label="电话" width="150"></el-table-column>
      <el-table-column prop="departmentName" align="center" width="120" label="科室" sortable></el-table-column>
      <el-table-column prop="doctorName" align="center" width="120" label="责任医生" sortable></el-table-column>
      <el-table-column align="center" label="操作" min-width="140">
        <!-- <template slot-scope="scope">
          <el-button
            round
            type="text"
            style="color: #52a3d7"
            @click="createPlan(scope.$index, scope.row)"
          >
            <i class="el-icon-circle-plus-outline" style="margin-right: 5px"></i>创建计划
          </el-button>
          <el-button
            round
            type="text"
            style="color: #52a3d7"
            @click="essentialInfo(scope.$index, scope.row)"
          >
            <i class="el-icon-search" style="margin-right: 5px"></i>查看详情
          </el-button>
          <el-button
            round
            type="text"
            style="color: #f8b14b"
            @click="editInfo(scope.$index, scope.row)"
          >
            <i class="el-icon-edit-outline" style="margin-right: 5px"></i>修改分组
          </el-button>
          <el-button
            round
            type="text"
            style="color: #7de1c1"
            @click="createVisit(scope.$index, scope.row)"
          >
            <i class="el-icon-circle-plus-outline" style="margin-right: 5px"></i>新增随访
          </el-button>
          <el-button
            round
            type="text"
            style="color: #7de1c1"
            @click="deletePatient(scope.$index, scope.row)"
          >
            <i class="el-icon-delete" style="margin-right: 5px"></i>删除患者
          </el-button>
        </template>-->
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="查看详情" placement="top">
            <i
              class="el-icon-search"
              @click="essentialInfo(scope.$index, scope.row)"
              style="margin-right: 5px;color: #52a3d7"
            ></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="创建计划" placement="top">
            <i
              class="el-icon-circle-plus-outline"
              @click="createPlan(scope.$index, scope.row)"
              style="margin-right: 5px;color: #52a3d7"
            ></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="修改分组" placement="top">
            <i
              class="el-icon-edit-outline"
              @click="editInfo(scope.$index, scope.row)"
              style="margin-right: 5px;color: #7de1c1"
            ></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="新增随访" placement="top">
            <i
              class="el-icon-circle-plus-outline"
              @click="createVisit(scope.$index, scope.row)"
              style="margin-right: 5px;color: #7de1c1"
            ></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除患者" placement="top">
            <i
              class="el-icon-delete"
              @click="deletePatient(scope.$index, scope.row)"
              style="margin-right: 5px;color:red;"
            ></i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin-top:20px;" :gutter="80">
      <el-col :span="8">
        <el-button
          type="primary"
          @click="batchEditGroup"
          style="background-color: #52a3d7; border: 0; font-size: 14px"
        >修改分组</el-button>
      </el-col>
      <!-- <el-col :span="4">
        <el-button>批量删除</el-button>
      </el-col>-->
      <el-col :span="16">
        <el-pagination
          @size-change="handlePageSizeChange"
          @current-change="handlePageCurrentChange"
          :current-page="page.current"
          :page-sizes="page.sizes"
          :page-size="page.size"
          :layout="page.layout"
          :total="page.total"
        ></el-pagination>
      </el-col>
    </el-row>

    <!--修改患者分组界面-->
    <el-dialog
      title="修改患者分组"
      :visible.sync="editFormVisible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
        <el-form-item label="患者姓名" prop="name">
          <el-input disabled v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group disabled v-model="editForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="患者手机号">
          <el-input disabled v-model="editForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="患者身份证">
          <el-input disabled v-model="editForm.idCard" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="患者科室">
          <el-input disabled v-model="editForm.departmentName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="患者责任医生">
          <el-input disabled v-model="editForm.doctorName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="患者分组">
          <el-select v-model="editForm.groupId" placeholder="请选择" @change="editGroup">
            <el-option
              v-for="item in groupNameList"
              :key="item.groupId"
              :label="item.groupName"
              :value="item.groupId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
    <!-- 批量修改患者分组页面 -->
    <el-dialog title="批量修改分组" :visible.sync="dialogFormVisible">
      <el-form :model="batchEditGroupForm">
        <el-form-item label="选择分组">
          <el-select v-model="batchEditGroupForm.groupId">
            <el-option
              v-for="item in groupNameList"
              :key="item.groupId"
              :label="item.groupName"
              :value="item.groupId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitBatchEditGroup" :loading="editLoading">确 定</el-button>
      </div>
    </el-dialog>
    <!--新建患者界面-->
    <el-dialog title="新建患者" :visible.sync="addFormVisible" :modal-append-to-body="false">
      <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="患者性别" prop="sex">
          <el-radio-group v-model="addForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="患者电话" prop="phone">
          <el-input v-model="addForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="addForm.idCard" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择科室 : " prop="departmentName">
          <el-select v-model="addForm.departmentName" placeholder="请选择">
            <el-option
              v-for="item in ksdepartmentName"
              :key="item.value"
              :value="item.label"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="telName">
          <el-input v-model="addForm.telName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="relationPhone">
          <el-input v-model="addForm.relationPhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="与患者关系" prop="relation">
          <el-select v-model="addForm.relation" placeholder="请选择">
            <el-option value="父母" label="父母"></el-option>
            <el-option value="子女" label="子女"></el-option>
            <el-option value="配偶" label="配偶"></el-option>
            <el-option value="朋友" label="朋友"></el-option>
            <el-option value="同事" label="同事"></el-option>
            <el-option value="同学" label="同学"></el-option>
            <el-option value="其他" label="其他"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分组" prop="groupId">
          <el-select v-model="addForm.groupId" placeholder="请选择">
            <el-option
              v-for="item in groupNameList"
              :key="item.groupId"
              :label="item.groupName"
              :value="item.groupId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="addForm.remark"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addClose">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新建组别界面-->
    <el-dialog
      title="新建组别"
      :visible.sync="addFormVisible1"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <el-form>
        <el-form-item class="new_group" label="组名" label-width="80px">
          <el-input v-model="newGroupName" placeholder="请输入组别名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible1 = false">取消</el-button>
        <el-button type="primary" @click.native="addNewGroup" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { pagination } from "@/mixins";
export default {
  mixins: [pagination],
  data() {
    var checkIdCard = (rule, value, callback) => {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的身份证号"));
        return false;
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      var telReg = reg.test(value);
      if (telReg === false) {
        callback(new Error("请输入正确的手机号"));
        return false;
      } else {
        callback();
      }
    };
    return {
      filters: {
        name: ""
      },
      groupNameList: [
        {
          groupId: "",
          groupName: ""
        }
      ],
      ksdepartmentName: [], // 科室
      groupNameChoose: "",
      value: "",
      listLoading: false,
      multipleSelection: [], // 列表选中列
      usersList: [],
      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      // 编辑界面数据
      editForm: {},
      addFormVisible: false, // 新增界面是否显示
      addFormVisible1: false,
      addLoading: false,
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        idCard: [{ required: true, validator: checkIdCard, trigger: "blur" }],
        departmentName: [
          { required: true, message: "请选择科室", trigger: "change" }
        ],
        doctorName: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" }
        ],
        telName: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" }
        ],
        relationPhone: [
          { required: true, validator: checkPhone, trigger: "blur" }
        ],
        relation: [
          { required: true, message: "请选择与患者关系", trigger: "change" }
        ],
        groupId: [{ required: true, message: "请选择分组", trigger: "change" }]
      },
      // 新增界面数据
      addForm: {
        departmentName: []
      },
      user: null,
      newGroupName: "",
      getPatientId: null,
      batchEditGroupForm: {}, //批量修改患者分组
      dialogFormVisible: false //批量修改患者分组显示
    };
  },
  methods: {
    //分页查询方法
    handleSearch() {
      this.getUsers(1, this.page.size);
    },
    // 分页
    handlePageCurrentChange(val) {
      this.page.current = val;
      this.getUsers(this.page.current, this.page.size);
    },
    // 新建分组
    addGroup() {
      this.addFormVisible1 = true;
    },
    // 新建计划
    createPlan(index, row) {
      sessionStorage.setItem("personInfo", JSON.stringify(row));
      this.$router.push({
        name: "createPlan",
        params: { id: index, info: row }
      });
    },
    // 查看详情
    essentialInfo(index, row) {
      sessionStorage.setItem("personInfo", JSON.stringify(row));
      this.$router.push({ name: "EssentialInfo" });
    },
    // 修改组别获取组别id
    editGroup(value) {
      this.editForm.groupId = value;
    },
    // 修改分组
    editInfo(index, row) {
      this.editFormVisible = true;
      this.getPatientId = row.id;
      this.editForm = Object.assign({}, row);
      if (row.groupId != null) {
        this.editForm.groupId = row.groupId.groupId;
      } else {
        this.editForm.groupId = row.groupId;
      }
    },
    // 提交修改组别
    editSubmit() {
      this.$http
        .post("/api" + `/patient/updateGroup`, {
          userId: this.getPatientId,
          groupId: this.editForm.groupId
        })
        .then(res => {
          if (res.data) {
            this.$message({
              showClose: true,
              message: "修改组别成功",
              type: "success"
            });
            this.editLoading = false;
            this.editFormVisible = false;
            this.getUsers();
          } else {
            this.$message({
              showClose: true,
              message: "修改组别失败",
              type: "error"
            });
            this.editLoading = false;
            this.editFormVisible = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击批量修改分组按钮
    batchEditGroup() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请选择需要批量修改分组的患者！");
      } else {
        this.dialogFormVisible = true;
      }
    },
    //提交批量修改分组
    submitBatchEditGroup() {
      let patientIdListId = "";
      this.multipleSelection.forEach(item => {
        patientIdListId += item.id + ",";
      });
      let patientIdList = patientIdListId.substring(
        0,
        patientIdListId.length - 1
      );
      console.log(this.multipleSelection, patientIdList);
      this.$http
        .post("/api" + `/groups/batchGroups`, {
          groupId: this.batchEditGroupForm.groupId,
          patientIdList: patientIdList
        })
        .then(res => {
          if (res.data) {
            this.$message({
              showClose: true,
              message: "修改组别成功",
              type: "success"
            });
            this.editLoading = false;
            this.dialogFormVisible = false;
            this.getUsers();
          } else {
            this.$message({
              showClose: true,
              message: "修改组别失败",
              type: "error"
            });
            this.editLoading = false;
            this.dialogFormVisible = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 新增随访
    createVisit(index, row) {
      sessionStorage.setItem("personInfo", JSON.stringify(row));
      this.$router.replace({
        name: "EssentialInfo",
        params: { selectId: "jhxx" }
      });
    },
    // 删除患者
    deletePatient(index, row) {
      console.log(index, row);
      if (row.sourceType === 1) {
        this.$confirm("此操作将删除该患者, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$http
              .post("/api" + "patient/deletePatientById?id=" + row.id)
              .then(res => {
                this.getUsers();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              })
              .catch(err => {
                console.log(err);
                this.$message({
                  type: "warning",
                  message: "删除失败!"
                });
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message.warning("该患者不可删除！");
      }
    },
    // 性别显示转换
    formatSex: function(row, column) {
      return row.sex === 1 ? "男" : row.sex === 2 ? "女" : "未知";
    },

    handleCurrentChange(val) {
      console.log(val);
    },
    // 获取科室方法
    getMedicalList() {
      this.$http
        .get(
          "/api" +
            `/medicalSections/getMedicalSectionsList?hospitalId=${this.$store.state.user.user.hospitalId.id}`
        )
        .then(res => {
          this.ksdepartmentName = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取患者列表
    getUsers(page, pageSize) {
      this.user = JSON.parse(sessionStorage.getItem("loginUser"));
      this.$http
        .get(
          "/api" +
            `/patient/getPatientList?hospitalId=${this.user.hospitalId.id}&keywords=${this.filters.name}&uniqueAccountId=${this.$store.state.user.user.uniqueAccountId}&type=${this.$store.state.user.user.type}`
        )
        .then(res => {
          this.page.total = res.data.total;
          this.usersList = res.data.list;
          this.usersList.forEach(item => {
            if (item.doctorName == null) {
              item.doctorName = item.diseaseManagerName;
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    // 显示新增界面
    addPatient: function() {
      this.addFormVisible = true;
      this.addForm = {
        name: "",
        sex: -1,
        age: 0,
        idCard: "",
        groupId: "",
        remark: "",
        phone: ""
      };
    },
    // 新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.addForm.hospitalId = this.user.hospitalId.id;
          this.addForm.doctorId = this.user.id;
          if (this.addForm.sex === -1) {
            this.$message({
              showClose: true,
              message: "您还未选择性别",
              type: "error"
            });
            return;
          }
          if (this.addForm.groupId == "") {
            this.$message({
              showClose: true,
              message: "您还未选择组别",
              type: "error"
            });
            return;
          }
          this.addLoading = true;
          this.$http
            .post(
              "/api" +
                `/patient/addPatient?doctorId=${this.$store.state.user.user.id}&type=${this.$store.state.user.user.type}`,
              this.addForm
            )
            .then(res => {
              if (res.data) {
                this.$message({
                  showClose: true,
                  message: "患者添加成功",
                  type: "success"
                });
                this.getUsers();
                this.addFormVisible = false;
                this.$refs.addForm.resetFields();
              } else {
                this.$message({
                  showClose: true,
                  message: "患者添加失败",
                  type: "error"
                });
                this.addFormVisible = false;
                this.$refs.addForm.resetFields();
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    // 关闭新增
    addClose() {
      this.addFormVisible = false;
      this.editFormVisible = false;
      this.$refs.addForm.resetFields();
    },
    closeDialog() {
      this.$refs.addForm.resetFields();
    },
    handleSelectionChange: function(val) {
      this.multipleSelection = val;
    },
    // 获取组名
    getGroupName() {
      this.$http
        .get("/api" + `/groups/getGroupListByDoctorId?doctorId=${this.user.id}`)
        .then(res => {
          this.groupNameList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 新建组
    addNewGroup() {
      this.$http
        .post("/api" + `/groups/addGroup`, {
          groupName: this.newGroupName,
          doctorId: this.user.id
        })
        .then(res => {
          if (res.data) {
            this.$message({
              showClose: true,
              message: "新建组别成功",
              type: "success"
            });
            this.addFormVisible1 = false;
            this.getGroupName();
            this.newGroupName = "";
          } else {
            this.$message({
              showClose: true,
              message: "新建组别失败",
              type: "error"
            });
            this.addFormVisible1 = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 根据组名查患者列表
    getUsersByGroup() {
      if (this.groupNameChoose === "") {
        this.getUsers();
      } else {
        this.$http
          .get(
            "/api" +
              `/patient/getPatientList?hospitalId=${this.user.hospitalId.id}&groupId=${this.groupNameChoose}`
          )
          .then(res => {
            this.usersList = res.data.list;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  created() {
    this.getMedicalList();
    this.getUsers(this.page.current, this.page.size);
    this.getGroupName();
  }
};
</script>

<style scoped>
.toolbar_page {
  margin-top: 20px;
  text-align: center;
}

.toolbar_title {
  background-color: #fff;
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 0;
}

.toolbar_form {
  padding: 0 20px;
}

.toolbar_title h3 {
  height: 60px;
  line-height: 60px;
  background-color: #edfbf7;
  padding: 0 20px;
  margin: 0;
  font-size: 20px;
  margin-bottom: 30px;
}
.el-tooltip {
  cursor: pointer;
}
.table_container >>> .el-table__row--striped td {
  background-color: #edfbf7 !important;
}

.table_container >>> .el-table .el-table__header thead th {
  background-color: #edfbf7 !important;
}

.el-dialog__wrapper {
  position: absolute !important;
}

.toolbar >>> .el-input__inner {
  border: 1px solid #52d7ac;
}

.search_input >>> .el-form-item__content {
  width: 500px;
}
</style>
