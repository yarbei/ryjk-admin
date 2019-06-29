<template>
  <section class="table_container">
    <!--顶部工具条-->
    <el-col :span="24" class="toolbar toolbar_title" style="padding-bottom: 0px;">
      <h3>患者操作</h3>
      <el-form :inline="true" :model="filters" class="toolbar_form">
        <el-select
          v-model="groupNameChoose"
          clearable
          placeholder="选择组名"
          @change="getUsersByGroup"
          style="margin-right: 10px;"
        >
          <el-option
            v-for="item in groupNameList"
            :key="item.groupId"
            :label="item.groupName"
            :value="item.groupId"
          ></el-option>
        </el-select>

        <el-form-item class="f-right search_input">
          <el-input v-model="filters.name" placeholder="患者姓名/手机号/身份证号">
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

        <!--<el-form-item>-->
        <!--<el-button type="primary" v-on:click="getUsers"><i class="el-icon-search" style="margin-right: 5px"></i>搜索</el-button>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-button
            type="primary"
            @click="handleAdd1"
            style="background-color: #52a3d7; border: 0; font-size: 14px"
          >新建组别</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleAdd"
            style="background-color: #52d7ac; border: 0; font-size: 14px"
          >新建患者</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="background-color: #52a3d7; border: 0; font-size: 14px">
            <i class="el-icon-download" style="margin-right: 5px"></i>导出
          </el-button>
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
      @selection-change="selsChange"
      style="width: 100%;"
    >
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
      <el-table-column prop="departmentName" align="center" width="150" label="科室" sortable></el-table-column>
      <el-table-column prop="doctorName" align="center" width="120" label="责任医生" sortable></el-table-column>
      <el-table-column align="center" label="操作" min-width="140">
        <template slot-scope="scope">
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
            <i class="el-icon-edit-outline" style="margin-right: 5px"></i>修改组名
          </el-button>
          <el-button
            round
            type="text"
            style="color: #7de1c1"
            @click="createVisit(scope.$index, scope.row)"
          >
            <i class="el-icon-circle-plus-outline" style="margin-right: 5px"></i>新增随访
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页工具条-->
    <el-col :span="24" class="toolbar toolbar_page" v-if="pageSize>10">
      <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :total="pageTotal"
      ></el-pagination>
    </el-col>

    <!--修改患者界面-->
    <el-dialog
      title="修改患者"
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
        <el-form-item label="年龄">
          <el-input-number disabled v-model="editForm.age" :min="0" :max="200"></el-input-number>
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
          <el-input disabled v-model="editForm.diseaseManagerName" auto-complete="off"></el-input>
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

    <!--新建患者界面-->
    <el-dialog title="新建患者" :visible.sync="addFormVisible" :modal-append-to-body="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="患者性别" prop="sex">
          <el-radio-group v-model="addForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="患者年龄" prop="age">
          <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>

        <el-form-item label="患者电话" prop="phone">
          <el-input v-model="addForm.phone" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="addForm.idCard" auto-complete="off"></el-input>
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
export default {
  data() {
    var checkIdCard = (rule, value, callback) => {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的身份证号"));
        return false;
      } else {
        console.log("66666");
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      var telReg = reg.test(value);
      if (telReg == false) {
        callback(new Error("请输入正确的手机号"));
        return false;
      } else {
        console.log("66666");
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
      groupNameChoose: "",
      value: "",
      total: 20,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列
      usersList: [],
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {},
      addFormVisible: false, //新增界面是否显示
      addFormVisible1: false,
      addLoading: false,
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        sex: [{ required: true, message: "请输选择性别", trigger: "change" }],
        idCard: [{ validator: checkIdCard, trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        name: "",
        sex: -1,
        age: 0,
        idCard: "",
        groupId: "",
        remark: "",
        phone: ""
      },
      user: null,
      pageTotal: 0,
      pageSize: 0,
      newGroupName: "",
      getPatientId: null
    };
  },
  methods: {
    handleAdd1() {
      this.addFormVisible1 = true;
    },
    //新建计划
    createPlan(index, row) {
      this.$router.push({ name: "createPlan", params: { id: index, info: row } });
    },
    //查看详情
    essentialInfo(index, row) {
      sessionStorage.setItem("personInfo", JSON.stringify(row));
      this.$router.push({ name: "EssentialInfo" });
    },
    //修改组别获取组别id
    editGroup(value) {
      var that = this;
      that.editForm.groupId = value;
    },
    //获取修改患者信息
    editInfo(index, row) {
      var that = this;
      that.editFormVisible = true;
      that.getPatientId = row.id;

      that.editForm = Object.assign({}, row);
      if (row.groupId != null) {
        that.editForm.groupId = row.groupId.groupId;
      } else {
        that.editForm.groupId = row.groupId;
      }
    },
    //提交修改组别
    editSubmit() {
      var that = this;
      that.$confirm("确认提交吗？", "提示", {}).then(() => {
        that.editLoading = true;
        that.$http
          .post("/api" + `/patient/updateGroup`, {
            userId: that.getPatientId,
            groupId: that.editForm.groupId
          })
          .then(res => {
            if (res.data) {
              that.$message({
                showClose: true,
                message: "修改组别成功",
                type: "success"
              });
              that.editLoading = false;
              that.editFormVisible = false;
              that.getUsers();
            } else {
              that.$message({
                showClose: true,
                message: "修改组别失败",
                type: "error"
              });
              that.editLoading = false;
              that.editFormVisible = false;
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    //新增随访
    createVisit(index, row) {
      //旧版本为直接跳转新增随访页面，之后改为先跳转计划页面再选择去随访
      // sessionStorage.setItem("personInfo", JSON.stringify(row));
      // this.$router.push({ name: "createVisit", params: { id: index, info: row } });
      this.$router.replace({
        name: "EssentialInfo",
        params: { selectId: "jhxx" }
      });
    },
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 2 ? "女" : "未知";
    },
    handleCurrentChange(val) {
      var that = this;
      console.log(val, "2333333333333");
    },
    //获取患者列表
    getUsers() {
      var that = this;
      that.user = JSON.parse(sessionStorage.getItem("loginUser"));
      that.$http
        .get(
          "/api" +
            `/patient/getPatientList?hospitalId=${
              that.user.hospitalId.id
            }&keywords=${that.filters.name}`
        )
        .then(res => {
          that.pageTotal = res.data.total;
          that.pageSize = res.data.size;
          that.usersList = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          removeUser(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getUsers();
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      console.log(this.addFormVisible);
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
    //新增
    addSubmit: function() {
      var that = this;

      that.$refs.addForm.validate(valid => {
        if (valid) {
          that.addForm.hospitalId = that.user.hospitalId.id;
          that.addForm.doctorId = that.user.id;
          that.$confirm("确认提交吗？", "提示", {}).then(() => {
            if (that.addForm.sex == -1) {
              that.$message({
                showClose: true,
                message: "您还未选择性别",
                type: "error"
              });
              return;
            }
            if (that.addForm.age == "") {
              that.$message({
                showClose: true,
                message: "您还未输入年龄",
                type: "error"
              });
              return;
            }
            if (that.addForm.groupId == "") {
              that.$message({
                showClose: true,
                message: "您还未选择组别",
                type: "error"
              });
              return;
            }
            that.addLoading = true;
            that.$http
              .post("/api" + `/patient/addPatient`, that.addForm)
              .then(res => {
                if (res.data) {
                  that.$message({
                    showClose: true,
                    message: "患者添加成功",
                    type: "success"
                  });
                  that.getUsers();
                  that.addFormVisible = false;
                  that.$refs.addForm.resetFields();
                } else {
                  that.$message({
                    showClose: true,
                    message: "患者添加失败",
                    type: "error"
                  });
                  that.addFormVisible = false;
                  that.$refs.addForm.resetFields();
                }
              })
              .catch(err => {
                console.log(err);
              });
          });
        }
      });
    },
    //关闭新增
    addClose() {
      this.addFormVisible = false;
      this.editFormVisible = false;
      this.$refs.addForm.resetFields();
    },
    closeDialog() {
      this.$refs.addForm.resetFields();
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveUser(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getUsers();
          });
        })
        .catch(() => {});
    },
    //获取组名
    getGroupName() {
      var that = this;
      that.$http
        .get("/api" + `/groups/getGroupListByDoctorId?doctorId=${that.user.id}`)
        .then(res => {
          that.groupNameList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //新建组
    addNewGroup() {
      var that = this;
      that.$http
        .post("/api" + `/groups/addGroup`, {
          groupName: that.newGroupName,
          doctorId: that.user.id
        })
        .then(res => {
          if (res.data) {
            that.$message({
              showClose: true,
              message: "新建组别成功",
              type: "success"
            });
            that.addFormVisible1 = false;
            that.getGroupName();
            that.newGroupName = "";
          } else {
            that.$message({
              showClose: true,
              message: "新建组别失败",
              type: "error"
            });
            that.addFormVisible1 = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //根据组名查患者列表
    getUsersByGroup() {
      var that = this;
      if (that.groupNameChoose == "") {
        that.getUsers();
      } else {
        that.$http
          .get(
            "/api" +
              `/patient/getPatientList?hospitalId=${
                that.user.hospitalId.id
              }&groupId=${that.groupNameChoose}`
          )
          .then(res => {
            that.pageTotal = res.data.total;
            that.pageSize = res.data.size;
            that.usersList = res.data.list;
            console.log(res, "23333333333333333333333");
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    var that = this;
    that.getUsers();
    that.getGroupName();
  }
};
</script>

<style scoped>
.table_container {
  /*padding: 30px 30px 60px 30px;*/
}

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
