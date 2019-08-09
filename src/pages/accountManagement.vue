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
<!--         <el-form-item>
          <el-button
            type="primary"
            @click="addAccount"
            style="background-color: #52d7ac; border: 0; font-size: 14px"
          >新建账号</el-button>
        </el-form-item> -->
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="accountList" :border="true" stripe highlight-current-row style="width: 100%;">
      <el-table-column prop="name" align="center" label="姓名"></el-table-column>
      <el-table-column prop="jobNum" align="center" label="账号"></el-table-column>
      <el-table-column prop="roleName" align="center" label="角色"></el-table-column>
      <el-table-column prop="hospitalName.name" align="center" label="医院"></el-table-column>
<!--       <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column> -->
      <el-table-column align="center" label="操作" min-width="140">
        <template slot-scope="scope">
          <el-button
            round
            type="text"
            style="color: #f8b14b"
            @click="editAccount(scope.$index, scope.row)"
          >
            <i class="el-icon-edit-outline" style="margin-right: 5px"></i>分配角色
          </el-button>
<!--           <el-button
            round
            type="text"
            style="color: #7de1c1"
            @click="deleteGroup(scope.$index, scope.row)"
          >
            <i class="el-icon-delete" style="margin-right: 5px"></i>删除账号
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-row style="margin-top:20px;" :gutter="80">
      <el-col :span="24">
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
    </el-row>-->
    <!--新建账号界面-->
<!--     <el-dialog title="新建账号" :visible.sync="addFormVisible" :modal-append-to-body="false">
      <el-form :model="addAccountForm" label-width="120px">
        <el-form-item label="姓名" required>
          <el-select v-model="addAccountForm.userId" placeholder="请选择">
            <el-option
              v-for="item in doctorName"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择角色 : " required>
          <el-select v-model="addAccountForm.roleIds" placeholder="请选择" multiple>
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :value="item.roleId"
              :label="item.roleName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addclose">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog> -->

    <!--修改账号界面-->
    <el-dialog title="修改账号" :visible.sync="editFormVisible" :modal-append-to-body="false">
      <el-form :model="editAccountForm" label-width="120px">
        <el-form-item label="姓名" required>
          <el-select v-model="editAccountForm.id" placeholder="请选择" disabled>
            <el-option
              v-for="item in doctorName"
              :key="item.id"
              :value="item.id"
              :label="item.name"
              disabled
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择角色 : " required>
          <el-select
            v-model="editAccountForm.roleIds"
            @change="selectName"
            placeholder="请选择"
            multiple
          >
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :value="item.roleId"
              :label="item.roleName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editClose">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
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
      addAccountForm: {
        userId: "",
        roleIds: []
      },
      addFormVisible: false, //新增界面是否显示
      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      // 编辑界面数据
      editAccountForm: {
        id: "",
        roleIds: []
      },
      addLoading: false,
      user: null,
      ids: []
    };
  },
  created() {
    // 获取角色
    this.getUser();
    // 获取姓名
    this.getDoctor();

    this.getAccount();
  },
  methods: {
    // 获取角色
    getUser() {
      this.$http("/api" + "/doctor/getDoctorAll?hospitalId=1")
        .then(res => {
          console.log(res.date);
          this.doctorName = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取姓名
    getDoctor() {
      this.$http("/api" + "/user/getRoleList")
        .then(res => {
          console.log(res.data);
          this.roleList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // //分页查询方法
    // handleSearch() {
    //   this.getUsers(1, this.page.size)
    // },
    // // 分页
    // handlePageCurrentChange(val) {
    //   this.page.current = val
    //   this.getUsers(this.page.current, this.page.size)
    // },
    searchFn() {
      let str = this.filters.groupName;
      this.getAccount(str)
      // if (this.filters.groupName) {
      //   this.accountList = this.accountList.filter((v, i) => {
      //     if (v.jobNum == str || v.name == str) {
      //       return v
      //     }
      //   })
      // } else {
      //   this.getAccount();
      // }
    },
    selectName(event) {
      console.log(event);
      this.editAccountForm.roleIds = ["1"];
      this.editAccountForm.roleIds = event;
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
              console.log(res);
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
    // 显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    // 显示新增界面
    addAccount: function() {
      this.addFormVisible = true;
    },
    // 提交新增
    addSubmit: function() {
      let o = {
        userId: this.addAccountForm.userId,
        roleIds: this.addAccountForm.roleIds.join(",")
      };
      console.log(o);
      this.$http
        .post("/api" + "/user/userAssignmentRoles", o)
        .then(res => {
          console.log(res);
          if (res.data == true) {
            this.$message.success(res.message);
            this.addFormVisible = false;
            this.addAccountForm = {
              userId: "",
              roleIds: []
            };
            // this.getAccount();
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 显示修改界面
    editAccount: function(index, row) {
      this.editFormVisible = true;

      this.editAccountForm = {
        id: row.id,
        roleIds: row.roleName.split(",")
      }
      // console.log(this.editAccountForm.roleIds);
      // let ids;
      // for (let i = 0; i < this.editAccountForm.roleIds.length; i++) {
      //   ids = row.editAccountForm.roleIds[i];
      // }
      // console.log(ids);
      // for (let i = 0; i < this.editAccountForm.roleIds.length; i++) {
      //   this.roleList = [this.roleList[i]];
      // }
      // console.log(this.roleList);
      // if (this.roleList[ids]) {
      //   this.addAccountForm.roleIds.remove(
      //     0,
      //     ids.length
      //   );
      // }
      // this.$http("/api" + "/user/getRolesByUserId?userId=" + ids)
      //   .then(res => {
      //     console.log(res);
      //     // this.roleList = res.data;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      // this.$http
      //   .get("/api" + "/doctor/getDoctorList?hospitalId=1&type=2")
      //   .then(res => {
      //     this.doctorName = res.data.list;
      //     console.log(res);
      //   });
      // console.log(row.roleNames);
    },
    // 取消
    editClose() {
      this.editFormVisible = false;
      this.editAccountForm = {
        id: "",
        roleIds: []
      }
    },
    // 提交修改
    editSubmit: function() {
      let o = {
        userId: this.editAccountForm.id,
        roleIds: this.editAccountForm.roleIds.join(",")
      };
      this.$http
        .post("api" + "/user/userAssignmentRoles", o)
        .then(res => {
          console.log(res.data)
          if (res.data == true) {
            this.$message.success(res.message)
            this.editFormVisible = false
            this.getAccount()
          } else {
            this.$message.warning(res.message)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 关闭新增
    addclose() {
      this.addFormVisible = false;
      this.editFormVisible = false;
    },

    //获取账号列表
    getAccount(str) {
      let loginUser =  JSON.parse(sessionStorage.getItem('loginUser'))
      this.$http(
        "/api" + `/user/adminList?keywords=${str || ''}&roleType=${loginUser.userInfo.roleId}&hospitalId=${loginUser.userInfo.hospitalId}`
      )
        .then(res => {
          console.log(res.data);
          this.accountList = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  handleCheckChange(data, checked, indeterminate) {
    console.log(data, checked, indeterminate);
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
