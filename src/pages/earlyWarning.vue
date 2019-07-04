<template>
  <section class="table_container">
    <el-col
      :span="24"
      class="toolbar toolbar_title"
      style="padding-bottom: 0px; height: 100px;padding-top: 30px"
    >
      <el-form  :inline="true" :model="filters" class="toolbar_form">
        <el-form-item class="f-left search_input">
          <el-input v-model="filters.name" placeholder="患者姓名">
            <template slot="append" icon="el-icon-search">
              <el-button
                type="primary"
                v-on:click="getEwList"
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
      :data="ewArray"
      :border="true"
      stripe
      highlight-current-row
      v-loading="listLoading"
      style="width: 100%;"
    >
      <el-table-column prop="patientName" align="center" label="患者姓名" sortable></el-table-column>
      <el-table-column prop="content" align="center" label="提醒信息" sortable></el-table-column>
      <el-table-column prop="status" align="center" label="状态" :formatter="formatSatus" sortable></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac;padding: 10px 30px"
            @click="changelInfo(scope.$index, scope.row)"
            :disabled="formatSatus==1?true:false"
          >完成</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-pagination
      @size-change="handlePageSizeChange"
      @current-change="handlePageCurrentChange"
      :current-page="page.current"
      :page-sizes="page.sizes"
      :page-size="page.size"
      :layout="page.layout"
      :total="page.total"
    ></el-pagination>
  </section>
</template>

<script>
import { pagination } from "@/mixins";
export default {
  mixins: [pagination],
  data() {
    return {
      status: "",
      filters: {
        name: ""
      },
      value: "",
      listLoading: false,
      usersList: [],
      user: null,
      ewArray: []
    };
  },
  methods: {
    handleSearch() {
      this.getEwList();
    },
    // 分页
    handlePageCurrentChange(val) {
      this.page.current = val;
      this.getEwList();
    },
    // 获取体征预警列表
    getEwList() {
      this.$http
        .get(
          "/api" +
            `/notice/getDoctorNoticeList?userId=${this.$store.state.user.user.id}&titleType=1&receiverRole=${this.$store.state.user.user.type}&noticeType=1`
        )
        .then(res => {
          console.log(res)
          this.ewArray = res.data.list;
          this.page.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    formatSatus(row, column) {
      return row.status == 0 ? "已完成" : row.status == 1 ? "未完成" : "无";
    },
    changelInfo(s1, s2) {
      if (s2.status == 0) {
        this.$message.warning("状态已更改,请勿重复操作！");
        return;
      }

      this.$http
        .post("/api" + `/notice/updateStatus`, { messageId: s2.id })
        .then(res => {
          if (res.data) {
            this.$message.success("操作成功");
            this.getEwList();
          } else {
            this.$message.error("操作失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
      console.log(s2);
    },
    statusSearch(val) {
      console.log(val);
    }
  },
  created() {
    this.getEwList();
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
