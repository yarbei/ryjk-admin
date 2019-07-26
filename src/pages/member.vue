<template>
  <section class="table_container">
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar toolbar_title"
      style="padding-bottom: 0px; height: 100px;padding-top: 30px"
    >
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
      <el-table-column prop="patientName" align="center" label="患者姓名" sortable></el-table-column>
      <el-table-column prop="publishDate" align="center" label="随访时间" sortable></el-table-column>
      <el-table-column prop="status" align="center" label="状态" :formatter="formatSatus" sortable></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac;padding: 10px 30px"
            @click="changelInfo(scope.$index, scope.row)"
            :disabled="scope.row.status ==0?true:false"
          >{{scope.row.status ==1?'去随访':'已随访'}}</el-button>
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
      wvArray: [],
      personInfo:{} //患者信息
    };
  },
  methods: {
    handleSearch() {
      this.getwVList();
    },
    // 获取待随访列表
    getwVList() {
      this.$http
        .get(
          "/api" +
            `/notice/getWaitForVisitList?userId=${this.$store.state.user.user.id}&name=${this.filters.name}&startTime=${this.filters.date[0]}&endTime=${this.filters.date[1]}&status=${this.filters.status}&receiverRole=${this.$store.state.user.user.type}&noticeType=1`    
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
      return row.status == 1 ? "待随访" : "已随访";
    },

    changelInfo(index, row) {
      this.$http
        .get(
          "/api" +
            `/patient/getPatientInfoByUserId?userId=${row.patientId}`
        )
        .then(res => {
          this.personInfo = res.data;
        })
        .catch(err => {
          console.log(err);
        });

      setTimeout(() => {
        sessionStorage.setItem("personInfo",JSON.stringify(this.personInfo)); //将患者信息存进session缓存中
        this.$router.replace({ 
          name: 'EssentialInfo',
          params: { selectId: 'jhxx'}
        }); 
      }, 1500)
    }
  },
  created() {
    this.getwVList();
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
