<template>
  <section class="table_container">
    <!--顶部工具条-->
    <el-col :span="24" class="toolbar toolbar_title" style="padding-bottom: 0px;">
      <h3>医生管理</h3>
    </el-col>
    <!--列表-->
    <el-table
      :data="doctorArray"
      :border="true"
      stripe
      highlight-current-row
      v-loading="listLoading"
      style="width: 100%;"
    >
      <el-table-column prop="name" align="center" label="名称" ></el-table-column>
      <!-- <el-table-column label="头像">
        <template width="90" slot-scope="scope">
        <img style="width:80px;height:80px;border:none;" :src="scope.row.head">
        </template>
      </el-table-column> -->
      <el-table-column prop="jobNum" align="center" label="工号"  ></el-table-column>
      <el-table-column prop="phone" align="center" label="手机号" sortable></el-table-column>

      <el-table-column prop="hospitalName.name" align="center" label="所在医院" ></el-table-column>
      <el-table-column prop="description" align="center" label="简介" ></el-table-column>
      <!--<el-table-column align="center" width="420" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button round type="text" style="color: #52a3d7"  @click="essentialInfo(scope.$index, scope.row)"><i class="el-icon-search" style="margin-right: 5px"></i>查看详情</el-button>
          <el-button
            round
            type="text"
            style="color: #f8b14b"
            @click="openOnline(scope.$index, scope.row)"
          >
            <i class="el-icon-circle-plus" style="margin-right: 5px"></i>开启即时通讯
          </el-button>
        </template>
      </el-table-column>-->
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar toolbar_page" v-if="doctorArray.length>10">
    </el-col>
  </section>
</template>

<script>
import { connect } from 'net';
export default {
  data() {
    return {

      filters: {
        name: "",
        date: ["",""],
        status: ""
      },
      date: "",
      total: 20,
      page: 1,
      size: 1,
      currentPage: 1,
      listLoading: false,
      usersList: [],
      user: null,
      doctorArray: [],
      personInfo:{} //患者信息
    };
  },
  methods: {
    handleSearch() {
      this.getDoctorList();
    },
    // 获取医生列表
    getDoctorList() {
      this.$http
        .get(
          "/api" +
            `/doctor/getDoctorAll?hospitalId=1`
        )
        .then(res => {
          this.doctorArray = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange() {},
    handleCurrentChange() {},

  },
  created() {
    this.getDoctorList();
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
