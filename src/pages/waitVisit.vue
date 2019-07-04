<template>
  <section class="table_container">
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar toolbar_title"
      style="padding-bottom: 0px; height: 100px;padding-top: 30px"
    >
      <el-form :inline="true" :model="filters" class="toolbar_form">
        <el-form-item class="f-left search_input">
          <el-input v-model="filters.name" placeholder="患者姓名">
            <template slot="append" icon="el-icon-search">
              <el-button
                type="primary"
                v-on:click="getwVList"
                style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac"
              >
                <i class="el-icon-search" style="margin-right: 5px"></i>搜索
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-date-picker
        v-model="filters.date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy - MM - dd"
        @change="getwVList"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <el-select v-model="filters.status" placeholder="请选择状态" @change="getwVList">
        <el-option :value="1" label="未随访"></el-option>
        <el-option :value="0" label="已随访"></el-option>
      </el-select>
    </el-col>

    <!--列表-->
    <el-table
      :data="wvArray"
      :border="true"
      stripe
      highlight-current-row
      v-loading="listLoading"
      style="width: 100%;"
    >
      <el-table-column prop="patient" align="center" label="患者姓名" sortable></el-table-column>
      <el-table-column prop="visitDate" align="center" label="随访时间" sortable></el-table-column>
      <el-table-column prop="status" align="center" label="状态" :formatter="formatSatus" sortable></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac;padding: 10px 30px"
            @click="changelInfo(scope.$index, scope.row)"
          >{{scope.row.status ==0?'已随访':'去随访'}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar toolbar_page" v-if="wvArray.length>10">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-col>
  </section>
</template>

<script>
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
      wvArray: []
    };
  },
  methods: {
    // 获取待随访列表
    getwVList() {
      this.$http
        .get(
          "/api" +
            `/visitRecord/getVisitRecordListByUserId?userId=${this.$store.state.user.user.id}&name=${this.filters.name}&startTime=${this.filters.date[0]}&endTime=${this.filters.date[1]}&status=${this.filters.status}`
        )
        .then(res => {
          this.wvArray = res.data.list;
          this.total = res.data.total;
          this.size = res.data.size;
          this.currentPage = res.data.pages;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange() {},
    handleCurrentChange() {},

    formatSatus(row, column) {
      return row.status == 0 ? "已随访" : "未随访";
    },
    formBtnStatus(row, column) {
      return row.status == 0;
    },
    changelInfo(s1, s2) {
      if (s2.status == 0) {
        this.$message.warning("该患者已随访,请勿重复操作！");
        return;
      }

      this.$router.replace({ name: "createVisit", params: { patientiD: "" } });

      console.log(s2);
    }
  },
  mounted() {
    this.getwVList();
  }
};
</script>

<style scoped>
.table_container {
  /*padding: 30px 50px 80px 50px;*/
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
