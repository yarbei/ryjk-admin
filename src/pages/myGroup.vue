<template>
  <section class="table_container">
    <!--顶部工具条-->
    <el-col :span="24" class="toolbar toolbar_title" style="padding-bottom: 0px;">
      <h3>我的工作组</h3>
      <el-form :inline="true" :model="filters" class="toolbar_form">
        <el-form-item class="f-right search_input">
          <el-input v-model="filters.groupName" placeholder="请输入工作组名称">
            <template slot="append" icon="el-icon-search">
              <el-button
                type="primary"
                v-on:click="getGroup"
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
            @click="addGroup"
            style="background-color: #52d7ac; border: 0; font-size: 14px"
          >新建工作组</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="groupList"
      :border="true"
      :cell-style="{'padding':'0'}"
      stripe
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column align="center" type="index" label="编号" width="80"></el-table-column>
      <el-table-column prop="groupName" align="center" label="工作组名称" width="500" sortable></el-table-column>
      <el-table-column align="center" label="操作" min-width="140">
        <template slot-scope="scope">
          <el-button
            round
            type="text"
            style="color: #f8b14b"
            @click="editGroup(scope.$index, scope.row)"
          >
            <i class="el-icon-edit-outline" style="margin-right: 5px"></i>修改工作组
          </el-button>
          <el-button
            round
            type="text"
            style="color: #7de1c1"
            @click="deleteGroup(scope.$index, scope.row)"
          >
            <i class="el-icon-delete" style="margin-right: 5px"></i>删除工作组
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-row style="margin-top:10px;" :gutter="80">
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
    <!--新建工作组界面-->
    <el-dialog title="新建工作组" :visible.sync="addFormVisible" :modal-append-to-body="false">
      <el-form :model="addGroupForm" label-width="120px">
        <el-form-item label="工作组名称" prop="groupName">
          <el-input v-model="addGroupForm.groupName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择疾病管理师 : " prop="diseaseManagerIds">
          <el-select v-model="addGroupForm.diseaseManagerIds" placeholder="请选择" multiple>
            <el-option
              v-for="item in diseaseManagerList"
              :key="item.userId"
              :value="item.userId"
              :label="item.userName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择医生: " prop="doctorIds">
          <el-select v-model="addGroupForm.doctorIds" placeholder="请选择" multiple>
            <el-option
              v-for="item in doctorList"
              :key="item.userId"
              :value="item.userId"
              :label="item.userName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addClose">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--修改工作组界面-->
    <el-dialog title="修改工作组" :visible.sync="editFormVisible" :modal-append-to-body="false">
      <el-form :model="editGroupForm" label-width="120px">
        <el-form-item label="工作组名称" prop="groupName">
          <el-input v-model="editGroupForm.groupName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择疾病管理师 : " prop="diseaseManagerIds">
          <el-select v-model="editGroupForm.diseaseManagerIds" placeholder="请选择" multiple>
            <el-option
              v-for="item in diseaseManagerList"
              :key="item.userId"
              :value="item.userId"
              :label="item.userName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择医生: " prop="doctorIds">
          <el-select v-model="editGroupForm.doctorIds" placeholder="请选择" multiple>
            <el-option
              v-for="item in doctorList"
              :key="item.userId"
              :value="item.userId"
              :label="item.userName"
            ></el-option>
          </el-select>
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
      filters: {
        groupName: ""
      },
      groupList: [],
      //新增界面数据
      addGroupForm: {
        groupName: "",
        diseaseManagerIds: [],
        doctorIds: []
      },
      diseaseManagerList: [],
      doctorList: [],
      addFormVisible: false, //新增界面是否显示
      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      // 编辑界面数据
      editGroupForm: {
        groupName: "",
        diseaseManagerIds: [],
        doctorIds: []
      },
      edit: false, // 新增界面是否显示
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
      this.$confirm("此操作将删除该工作组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let formData = { groupId: row.groupId };
          this.$http
            .post("/api" + "/groups/delWorkGroup", formData)
            .then(res => {
              this.getGroup();
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
    addGroup: function() {
      this.addGroupForm={groupName: "",diseaseManagerIds: [],doctorIds: []},
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
      if (this.addGroupForm.groupName == "") {
        this.$message.warning("请填写工作组名称！");
        return;
      }
      let arr = this.addGroupForm.diseaseManagerIds.join(",");
      this.addGroupForm.diseaseManagerIds = arr;
      let arr1 = this.addGroupForm.doctorIds.join(",");
      this.addGroupForm.doctorIds = arr1;
      this.addGroupForm.userId = this.$store.state.user.user.id;
      this.addGroupForm.hospitalId = 1;
      this.$http
        .post("api" + "/groups/addWorkGroup", this.addGroupForm)
        .then(res => {
          if (res.data == true) {
            this.getGroup();
            this.$message.success(res.message);
          } else {
            this.$message.warning(res.message);
          }
          this.addClose();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 显示修改界面
    editGroup: function(index, row) {
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
            this.getGroup();
            this.$message.success(res.message);
          } else {
            this.$message.warning(res.message);
          }
          this.editGroupForm = {};
          this.addClose();
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
    //获取工作组列表
    getGroup() {
      this.$http(
        "/api" +
          "/groups/getWorkGroupList?userId=" +
          this.$store.state.user.user.id +
          "&groupName=" +
          this.filters.groupName
      )
        .then(res => {
          this.groupList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.$http(
      "/api" +
        "/groups/getWorkGroupList?userId=" +
        this.$store.state.user.user.id +
        "&groupName=" +
        this.filters.groupName
    )
      .then(res => {
        this.groupList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
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
