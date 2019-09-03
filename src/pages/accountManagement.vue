<template>
  <section class="table_container">
    <!--顶部工具条-->
    <el-col :span="24" class="toolbar toolbar_title" style="padding-bottom: 0px;">
      <h3>账号管理</h3>
      <el-form :inline="true" :model="filters" class="toolbar_form">
        <el-form-item class="f-right search_input">
          <el-input v-model="filters.groupName" placeholder="请输入关键字">
            <template slot="append" icon="el-icon-search">
              <el-button
                type="primary"
                v-on:click="searchFn"
                style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac"
              >
                <i class="el-icon-search" style="margin-right: 5px"></i>搜索
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="addAccount"
            style="background-color: #52d7ac; border: 0; font-size: 14px"
          >新建账号</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="accountList" :border="true" stripe highlight-current-row style="width: 100%;">
      <el-table-column v-if="isName"  prop="userName" align="center" label="姓名"></el-table-column>
      <el-table-column :prop="account" align="center" label="账号"></el-table-column>
      <el-table-column prop="roleName" align="center" label="角色"></el-table-column>
      <el-table-column prop="hospitalName" align="center" label="医院"></el-table-column>
      <!-- <el-table-column align="center" label="操作" min-width="140">
        <template slot-scope="scope">
          <el-button
            round
            type="text"
            style="color: #f8b14b"
            @click="editAccount(scope.$index, scope.row)"
          >
            <i class="el-icon-edit-outline" style="margin-right: 5px"></i>分配角色
          </el-button>
                    <el-button
            round
            type="text"
            style="color: #7de1c1"
            @click="deleteGroup(scope.$index, scope.row)"
          >
            <i class="el-icon-delete" style="margin-right: 5px"></i>删除账号
          </el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <!--新建账号界面-->
    <el-dialog title="新建账号" :visible.sync="addFormVisible" :modal-append-to-body="false">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input type="password" v-model="ruleForm.passWord"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <!-- <el-input v-model="roleName" disabled></el-input> -->
          <el-select v-model="ruleForm.roleId" placeholder="请选择角色">
            <el-option
              v-for="item in Rolelist"
              :label="item.roleName"
              :key="item.roleId"
              :value="item.roleId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院" prop="hospitalId" v-show="isHospital">
          <el-select v-model="ruleForm.hospitalId" placeholder="请选择医院">
            <el-option v-for="item in hospital" :label="item.name" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            style="float:right;margin-right:20px;"
            type="primary"
            @click="submitForm('ruleForm')"
          >确定</el-button>
          <el-button style="float:right;margin-right:20px;" @click="addFormVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
import { pagination } from "@/mixins";
export default {
  mixins: [pagination],
  data() {
    return {
      filters: {
        name: "",
        jobNum: ""
      },
      doctorName: [],
      accountList: [],
      roleList: [],
      //新增账号界面数据
      ruleForm: {},
      rules: {
        passWord: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        roleId: [{ required: true, message: "请选择角色", trigger: "change" }]
      },
      Rolelist: [],
      hospital: [],
      GroupList: [],
      addFormVisible: false, //新增界面是否显示
      editLoading: false,
      // 编辑界面数据
      user: null,
      ids: [],
      isHospital: true,
      isName:true,
      account:''
    };
  },
  created() {
    this.getUser();
    // 获取姓名
    this.getDoctor();
    this.getAccount();
  },
  mounted() {
    if (this.$store.state.user.user.type == 3) {
      this.isHospital = false;
      this.ruleForm.roleId = 2;
      this.account='jobNum'
    } else if (this.$store.state.user.user.type == 1) {
      this.isHospital = true;
      this.isName=false;
      this.ruleForm.roleId = 3;
      this.account='account'
    }
    // 获取角色数据
    this.getRolelist();
    // 获取医院数据
    this.getHospital();
    // 获取组别数据
    this.getGroupList();
  },
  methods: {
    // 获取用户信息
    getUser() {
      this.$http("/api" + "/doctor/getDoctorAll?hospitalId=1")
        .then(res => {
          this.doctorName = res.data;
          ;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取姓名
    getDoctor() {
      this.$http("/api" + "/user/getRoleList")
        .then(res => {
          this.roleList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //搜索
    searchFn() {
      let str = this.filters.groupName;
      this.getAccount(str);
    },
    // 删除账号
    deleteGroup(index, row) {
      this.$confirm("此操作将删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("/api" + "/user/deleteUserRole?userId=" + row.id)
            .then(res => {
              ;
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              // this.getAccount();
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
    },

    // 显示新增界面
    addAccount: function() {
      this.addFormVisible = true;
      this.ruleForm = {};
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http.post("/api/user/addUser", this.ruleForm).then(res => {
            this.$message.success("添加成功！");
            this.addFormVisible = false;
            getAccount();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getRolelist() {
      this.$http
        .get("/api/user/getRoleList?type=" + this.$store.state.user.user.type)
        .then(res => {
          this.Rolelist = res.data;
        });
    },

    getHospital() {
      this.$http.get("/api/hospital/getHospitalListNoPage").then(res => {
        this.hospital = res.data;
      });
    },

    getGroupList() {
      this.$http.get("/api/groups/getGroupList").then(res => {
        this.GroupList = res.data;
      });
    },
    // 取消
    editClose() {
      this.editFormVisible = false;
      this.editAccountForm = {
        id: "",
        roleIds: []
      };
    },
    // 关闭新增
    addclose() {
      this.addFormVisible = false;
      this.editFormVisible = false;
    },
    //获取账号列表
    getAccount(str) {
      this.$http(
        "/api" +
          `/user/adminList?keywords=${str || ""}&roleType=${
            this.$store.state.user.user.type
          }&hospitalId=${this.$store.state.user.user.hospitalId || ""}`
      )
        .then(res => {
          this.accountList = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    }
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
