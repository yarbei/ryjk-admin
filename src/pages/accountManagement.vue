<template>
  <section class="table_container">
    <!--顶部工具条-->
    <el-col :span="24" class="toolbar toolbar_title" style="padding-bottom: 0px;">
      <h3>账号管理</h3>
      <el-form :inline="true" :model="filters" class="toolbar_form">
        <el-form-item class="f-right search_input">
          <el-input v-model="filters.groupName" placeholder="请输入姓名/账号">
            <template slot="append" icon="el-icon-search">
              <el-button
                type="primary"
                v-on:click="getAccount"
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
      <el-table-column prop="name" align="center" label="姓名"></el-table-column>
      <el-table-column prop="jobNum" align="center" label="账号"></el-table-column>
      <el-table-column prop="roleNames" align="center" label="角色"></el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>
      <el-table-column align="center" label="操作" min-width="140">
        <template slot-scope="scope">
          <el-button
            round
            type="text"
            style="color: #f8b14b"
            @click="editAccount(scope.$index, scope.row)"
          >
            <i class="el-icon-edit-outline" style="margin-right: 5px"></i>修改账号
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
    </el-row> -->
    <!--新建账号界面-->
    <el-dialog title="新建账号" :visible.sync="addFormVisible" :modal-append-to-body="false">
      <el-form :model="addAccountForm" label-width="120px">
        <el-form-item label="姓名" required>
          <el-input v-model="addAccountForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" required>
          <el-input v-model="addAccountForm.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input v-model="addAccountForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择角色 : " required>
          <el-select v-model="addAccountForm.role" placeholder="请选择" multiple>
            <el-option value="0" label="疾病管理师"></el-option>
            <el-option value="1" label="医生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择权限: " prop="doctorIds">
          <el-tree
            :data="jurisdiction"
            :props="defaultProps"
            show-checkbox
            @check-change="handleCheckChange"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addClose">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--修改工作组界面-->
    <el-dialog title="修改账号" :visible.sync="editFormVisible" :modal-append-to-body="false">
      <el-form :model="editAccountForm" label-width="120px">
        <el-form-item label="姓名" required>
          <el-input v-model="editAccountForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" required>
          <el-input v-model="editAccountForm.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input v-model="editAccountForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择角色 : " required>
          <el-select v-model="editAccountForm.role" placeholder="请选择" multiple>
            <el-option value="0" label="疾病管理师"></el-option>
            <el-option value="1" label="医生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择权限: " prop="doctorIds">
          <el-tree
            :data="jurisdiction"
            :props="defaultProps"
            show-checkbox
            @check-change="handleCheckChange"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addClose">取消</el-button>
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
      jurisdiction: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      filters: {
        name: "",
        jobNum: ""
      },
      accountList: [],
      //新增账号界面数据
      addAccountForm: {},
      addFormVisible: false, //新增界面是否显示
      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      // 编辑界面数据
      editAccountForm: {},
      addLoading: false,
      user: null
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
    // 删除分组
    deleteGroup(index, row) {
      this.$confirm("此操作将删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let formData = { groupId: row.groupId };
          this.$http
            .post("/api" + "/groups/delWorkGroup", formData)
            .then(res => {
              console.log(res);
              this.getAccount();
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
    },
    // 显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    // 显示新增界面
    addAccount: function() {
      this.addFormVisible = true;
      this.$http("/api" + "/user/users?userType=2")
        .then(res => {
          this.diseaseManagerList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      this.$http("/api" + "/user/users?userType=3")
        .then(res => {
          this.doctorList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 提交新增
    addSubmit: function() {
      if (this.addAccountForm.groupName == "") {
        this.$message.warning("请填写工作组名称！");
        return;
      }
      let arr = this.addAccountForm.diseaseManagerIds.join(",");
      this.addAccountForm.diseaseManagerIds = arr;
      let arr1 = this.addAccountForm.doctorIds.join(",");
      this.addAccountForm.doctorIds = arr1;
      this.addAccountForm.userId = this.$store.state.user.user.id;
      this.addAccountForm.hospitalId = 1;
      this.$http
        .post("api" + "/groups/addWorkGroup", this.addAccountForm)
        .then(res => {
          if (res.data == true) {
            this.$message.success(res.message);
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
      this.$http("/api" + "/groups/getWorkGroupDetails?groupId=" + row.groupId)
        .then(res => {
          this.editGroupForm = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      this.$http("/api" + "/user/users?userType=2")
        .then(res => {
          this.diseaseManagerList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      this.$http("/api" + "/user/users?userType=3")
        .then(res => {
          this.doctorList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 提交修改
    editSubmit: function() {
      if (this.editGroupForm.groupName == "") {
        this.$message.warning("请填写工作组名称！");
        return;
      }
      let arr = this.editGroupForm.diseaseManagerIds.join(",");
      this.editGroupForm.diseaseManagerIds = arr;
      let arr1 = this.editGroupForm.doctorIds.join(",");
      this.editGroupForm.doctorIds = arr1;
      this.editGroupForm.userId = this.$store.state.user.user.id;
      this.editGroupForm.hospitalId = 1;
      this.$http
        .post("api" + "/groups/updateWorkGroup", this.editGroupForm)
        .then(res => {
          if (res.data == true) {
            this.$message.success(res.message);
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 关闭新增
    addClose() {
      this.addFormVisible = false;
      this.editFormVisible = false;
    },
    //获取账号列表
    getAccount() {
      this.$http(
        "/api" +
          "/user/userList?name=" +
          this.filters.name +
          "&jobNum=" +
          this.filters.jobNum
      )
        .then(res => {
          this.accountList=res.data
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    }
  },
  created() {
    this.getAccount();
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
