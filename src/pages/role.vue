<template>
  <section class="table_container">
    <!--顶部工具条-->
    <el-col :span="24" class="toolbar toolbar_title" style="padding-bottom: 0px;">
      <h3>角色管理</h3>
      <el-form :inline="true" class="toolbar_form">
        <el-form-item>
          <el-button
            type="primary"
            @click="newRoles"
            style="background-color: #52d7ac; border: 0; font-size: 14px"
          >新建角色</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="roleList" :border="true" stripe highlight-current-row style="width: 100%;">
      <el-table-column prop="roleName" align="center" label="角色"></el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>
      <el-table-column align="center" label="操作" min-width="140">
        <template slot-scope="scope">
          <el-button
            round
            type="text"
            style="color: #f8b14b"
            @click="editRole(scope.$index, scope.row)"
          >
            <i class="el-icon-edit-outline" style="margin-right: 5px"></i>修改权限
          </el-button>
          <el-button
            round
            type="text"
            style="color: #7de1c1"
            @click="deleteRole(scope.$index, scope.row)"
          >
            <i class="el-icon-delete" style="margin-right: 5px"></i>删除该角色
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
    </el-row>-->
    <!--新建账号界面-->
    <el-dialog title="新建角色" :visible.sync="addFormVisible" :modal-append-to-body="false">
      <el-form :model="addRoleForm" label-width="120px">
        <el-form-item label="名称" required>
          <el-input v-model="addRoleForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择权限: " prop="doctorIds">
          <el-tree
            ref="tree"
            show-checkbox
            :data="jurisdiction"
            :props="defaultProps"
            node-key="id"
            @check-change="handleCheckChange"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addClose">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>



    <!--修改账号界面-->
    <el-dialog title="修改角色" :visible.sync="editFormVisible" :modal-append-to-body="false">
      <el-form :model="editRoleForm" label-width="120px">
        <el-form-item label="名称" required>
          <el-select
            v-model="editRoleForm.name"
            placeholder="请选择"
            >
            <el-option
              v-for="item in partList"
              :key="item.roleId"
              :value="item.roleId"
              :label="item.roleName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择权限: " prop="doctorIds">
          <el-tree
            ref="editTree"
            :data="jurisdiction"
            node-key="id"
            :default-checked-keys="newList"
            :props="defaultProps"
            show-checkbox
            @check-change="editCheckChange"
          ></el-tree>
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
      jurisdiction: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      roleList: [],
      partList: [],
      //新增角色界面数据
      addRoleForm: {},
      addFormVisible: false, //新增界面是否显示
      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      // 编辑界面数据
      editRoleForm: {
        name: '章'
      },
      addLoading: false,
      user: null,
      listArr: [],
      newList: []
    };
  },
  methods: {
    //分页查询方法
    handleSearch() {
      this.getUsers(1, this.page.size)
    },
    // 分页
    handlePageCurrentChange(val) {
      this.page.current = val
      this.getUsers(this.page.current, this.page.size)
    },
    // 删除角色
    deleteRole(index, row) {

      this.$confirm("此操作将删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // let formData = {roleId: row.roleId}
          // console.log(formData)
          this.$http
            .post("/api" + `/menu/deleteMenu?roleId=${row.roleId}`)
            .then((res) => {
              console.log(res.error)
              if(res.error == 0) {
                this.getRole()
                this.$message({
                  type: "success",
                  message: "删除成功!"
                })
              }
            })
            .catch((err) => {
              console.log(err)
              // console.log(err)
              this.$message({
                type: "warning",
                message: "删除失败!"
              })
            })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },
    // 显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row)
    },
    newRoles() {
      this.addFormVisible = true
    },
    // 显示新增界面
    addRole: function() {
      // this.addFormVisible = true;
      this.$http("/api" + "/menu/getMenuList")
        .then(res => {
          this.jurisdiction = res.data
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 新建角色
    addSubmit: function() {

      let o = {
        roleName: this.addRoleForm.name,
        menuIds: this.listArr.join(',')
      }

      if(this.addRoleForm.name == undefined) {
        this.$message.warning('请填写姓名')
      } else if(this.listArr.length < 1) {
        this.$message.warning('请选择权限')
      } else {
        this.$http
          .post("/api" + "/menu/addOrUpdateMenu", o)
          .then(res => {
            if (res.data == true) {
              this.$message.success(res.message)
              this.addFormVisible = false
              this.getRole()

              this.addRoleForm.name = ''

              this.listArr = []

              this.$refs.tree.setCheckedNodes([])
            } else {
              this.$message.warning(res.message)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }


    },
    // 显示修改界面
    editRole: function(index, row) {
      this.list()
      console.log(row)
      this.editFormVisible = true
      this.editRoleForm = row
      setTimeout(() => {
        this.editRoleForm.name = row.roleId
      }, 20)
      

      // console.log(this.editRoleForm.name)

      if(this.newList.length > 0) {
        this.$refs.editTree.setCheckedNodes([])
      }
      
      if(row.roleId) {
        this.$http
          .get("/api" + `/menu/getByRoleId?roleId=${row.roleId}`)
          .then(res => {
            this.newList = res.data
          })
          .catch(err => {
            console.log(err)
          })
      }


    },
    editClose() {
      this.newList = []
    },
    // 提交修改
    editSubmit: function() {

      let o = {
        roleName: this.editRoleForm.roleName,
        menuIds: this.listArr.join(','),
        roleId: this.editRoleForm.name
      }
      console.log(o)

      this.$http
        .post("/api" + "/menu/addOrUpdateMenu", o)
        .then(res => {
          if (res.data == true) {
            this.$message.success(res.message)
            this.addFormVisible = false

            this.getRole()

            this.addRoleForm.name = ''
            this.listArr = []
          } else {
            this.$message.warning(res.message)
          }
        })
        .catch(err => {
          console.log(err)
        })

    },
    // 关闭新增
    addClose() {
      this.addFormVisible = false;
      this.editFormVisible = false;
    },
    list() {
      this.$http(
        "/api" +
          "/user/getRoleList"
      )
        .then(res => {
          this.partList = res.data;
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    //获取账号列表
    getRole() {
      this.$http(
        "/api" +
          "/menu/getRoleList"
      )
        .then(res => {
          this.roleList = res.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCheckChange(data, checked, indeterminate) {
      let res = this.$refs.tree.getCheckedNodes()
      let arr = []
      res.forEach((item) => {
        arr.push(item.id)
      })
      this.listArr = arr
    },
    editCheckChange() {
      console.log(111111)
      let arr = []
      let res = this.$refs.editTree.getCheckedNodes()
      res.forEach((item) => {
        arr.push(item.id)
      })
      this.listArr = arr
    }
  },

  created() {
    this.getRole()
    this.addRole()
    this.list()
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
