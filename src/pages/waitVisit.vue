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
      <el-table-column prop="patientName" align="center" label="患者姓名" sortable width="200"></el-table-column>
      <el-table-column prop="publishDate" align="center" label="随访时间" sortable width="200"></el-table-column>
      <el-table-column
        prop="status"
        align="center"
        label="状态"
        :formatter="formatSatus"
        sortable
        width="200"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac;padding: 10px 30px"
            @click="changelInfo(scope.$index, scope.row)"
            :disabled="scope.row.status ==0?true:false"
          >{{scope.row.status ==1?'去随访':'已随访'}}</el-button>
          <el-button
            type="success"
            style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac;padding: 10px 30px"
            @click="openIM(scope.$index, scope.row)"
          >联系患者</el-button>
          <el-button
            type="success"
            style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac;padding: 10px 30px"
            @click="complete(scope.$index, scope.row)"
          >完成</el-button>
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
import { connect } from "net";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      filters: {
        name: "",
        date: ["", ""],
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
      personInfo: {} //患者信息
    };
  },
  computed: {
    s() {
      return this.$store.state.status.status;
    }
  },
  methods: {
    //点击完成随访
   complete(index, row) {
      this.$http.post('/api/user/completeOperation',{id:row.id}).then(res=>{
        this.editStorage(res.data)
      }).catch(err=>{
        console.log(err)
      })
      this.$http
        .post("/api" + `/notice/updateStatus`, { messageId: row.id })
        .then(res => {
          if (res.data) {
            this.$message.success("操作成功")
            this.getwVList()
          } else {
            this.$message.error("操作失败")
          }
        })
        .catch(err => {
          console.log(err);
        });
      console.log(row)
    },
    // 打开聊天窗口
    openIM(index, row) {
      //location.href="../../static/IM/im/main.html";
      sessionStorage.setItem("openIMPersonInfo", JSON.stringify(row));
      //获取计划列表
      this.$http({
        url: "/api/plan/getPlanByPatientId?patientId=" + row.id
      })
        .then(res => {
          sessionStorage.setItem(
            "openIMPlanList",
            JSON.stringify(res.data.list)
          );
          var openIMVisitList = {};
          res.data.list.forEach(item => {
            // 获取随访列表
            this.$http({
              url:
                "/api" +
                "/visitRecord/getVisistManagerList?planId=" +
                item.planId
            })
              .then(res => {
                sessionStorage.setItem(item.planId, JSON.stringify(res.data));
              })
              .catch(err => {
                console.log(err);
              });
          });
        })
        .catch(err => {
          console.log(err);
        });
      let account = row.yunXinAccount;
      if (account) {
        window.open("../../static/IM/im/main.html?account=" + account);
      } else {
        //todo  删除
        account = "test99";
        window.open("../../static/IM/im/main.html?account=" + account);
        this.$message.warning("患者云信账号信息为空，无法打开聊天界面！");
      }
    },
    ...mapActions(["setStatus"]),
    handleSearch() {
      this.getwVList();
    },
    // 获取待随访列表
    getwVList() {
      // debugger;
      this.$http
        .get(
          "/api" +
            `/notice/getWaitForVisitList?userId=${
              this.$store.state.user.user.id
            }&name=${this.filters.name}&startTime=${
              this.filters.date[0]
            }&endTime=${this.filters.date[1]}&status=${
              this.filters.status
            }&receiverRole=${this.$store.state.user.user.type}&noticeType=1`
        )
        .then(res => {
          // debugger
          this.wvArray = res.data.list;
           //this.page.total = res.data.total
          var count = res.data.total

          this.editStorage(count)
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange() {},
    handleCurrentChange() {},

     formatSatus(row) {
      return row.status == 0 ? "已完成" : row.status == 1 ? "未完成" : "无";
    },

    editStorage(waitForCount) {
      let loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

      let menu = loginUser.menu;

      let arr = menu.map((v, i) => {
        if (v.id === 4) {
          v.submenu[0].waitForCount = waitForCount;
          return v;
        } else {
          return v;
        }
      });

      loginUser.menu = arr;

      console.log(loginUser.menu);

      sessionStorage.setItem("loginUser", JSON.stringify(loginUser));

      this.setStatus(this.s + 1);
    },

    changelInfo(index, row) {
      this.$http
        .get("/api" + `/patient/getPatientInfoByUserId?userId=${row.patientId}`)
        .then(res => {
          this.personInfo = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      setTimeout(() => {
        sessionStorage.setItem("personInfo", JSON.stringify(this.personInfo)); //将患者信息存进session缓存中
        this.$router.replace({
          name: "EssentialInfo",
          query: {
            name: "jhxx"
          }
        });
      }, 1500);
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
