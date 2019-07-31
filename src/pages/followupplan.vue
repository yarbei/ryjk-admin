<template>
  <div>
    <tab-header :personInfo="personInfo"></tab-header>
    <el-col>
      <h2 style="margin-bottom: 30px" v-if="!getsfjhStatus">随访计划</h2>
      <el-card class="box-card grtz_box" v-for="item in sfjyArray" :key="item.sfjlId">
        <div slot="header" class="clearfix grtz_title">
          <span>
            {{item.visitTime}}
            <span class="f-right">{{item.status ==1?"已随访":"未随访"}}</span>
          </span>
        </div>
        <div class="text item grtz_content">
            <h2>随访建议 : {{item.content}}</h2>
            <span v-for="index in item.content" :key="index.id">{{index.content}}</span>
        </div>
        <div class="jhxx_btn">
          <el-row>
            <el-button
              class="f-right"
              type="primary"
              @click="createVisit(item.id)"
              :disabled="item.status==1?true:false"
            >去随访</el-button>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card jhxx_box" v-show="getsfjhStatus">
        <h2 style="text-align: center; color: #999; font-size: 21px; line-height: 60px">暂无数据！</h2>
        <div class="jhxx_btn">
          <el-row>
            <el-button
              class="f-right"
              type="primary"
              @click="createVisit"
            >去随访</el-button>
          </el-row>
        </div>
      </el-card>
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
  </div>
</template>
<script>
import { pagination } from "@/mixins";
import ElCol from "element-ui/packages/col/src/col";
import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
import tabHeader from "../components/tabHeader";
import ElContainer from "../../node_modules/element-ui/packages/container/src/main.vue";
import ElRow from "element-ui/packages/row/src/row";
export default {
  mixins: [pagination],
  components: {
    ElRow,
    ElContainer,
    ElButton,
    ElCol,
    tabHeader
  },
  name: "followupplan",
  data() {
    return {
      personInfoId: "",
      personInfo: {},
      sfjyArray: [],
      planId: "",
      getsfjhStatus: false
    };
  },
  created() {
    this.personInfoId = this.$route.params.id;
    this.getUsers();
    this.getPlan();
  },
  methods: {
    handleSearch() {
      this.getPlan(1, this.page.size);
    },
    // 分页
    handlePageCurrentChange(val) {
      this.page.current = val;
      this.getPlan(this.page.current, this.page.size);
    },
    showjhxxStop(id) {
      this.jhxxStopdialog = true;
      this.planId = id;
    },
    // 获取患者基本信息
    getUsers() {
      this.personInfo = JSON.parse(sessionStorage.getItem("personInfo"));
      this.$http
        .get(
          "/api" +
            `/patient/getPatientInfoByUserId?userId=${this.personInfo.id}`
        )
        .then(res => {
          this.form1 = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取随访计划(随访建议)
    getPlan() {
      this.$http
        .get(
          "/api" +
            "/visitRecord/getVisistManagerList?planId=" +
            this.$route.query.planId
        )
        .then(res => {
          console.log(res)
          if (res.data.length === 0) {
            this.getsfjhStatus = true;
          } else {
            this.getsfjhStatus = false;
            this.page.total = res.data.total;
            this.sfjyArray = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 去随访
    createVisit(managerId) {
      this.$router.push({path:"/createVisit",query:{managerId:managerId,planId:this.$route.query.planId,patientType:this.$route.query.patientType}});
    }
  }
};
</script>

<style type="text/css" scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.sfjh h2 {
  text-align: center;
  font-size: 28px;
  margin: 0;
  padding: 0;
  line-height: 28px;
}

.sfjh p {
  font-size: 16px;
  line-height: 30px;
}

.sfjl_box {
  box-shadow: none;
}

.sfjl_title {
  line-height: 40px;
  font-size: 16px;
}

.sfjl_box >>> .el-card__body {
  display: none;
}

.sfjlTime {
  margin: 0 20px;
}

.sfjl_btn {
  text-align: center;
  margin: 30px 0 0;
}

.jhxx_box {
  margin-bottom: 15px;
}

.jhxx_title {
  line-height: 40px;
  font-size: 22px;
}

.jhxx_titleTime {
  font-size: 16px;
  margin: 0 10px;
}

.jhxx_btn {
  text-align: right;
}

.grtz_box {
  margin-bottom: 15px;
}

.grtz_title {
  line-height: 40px;
  font-size: 20px;
}

.grtz_title p {
  font-size: 18px;
  display: inline;
  margin-left: 50px;
}

.grtz_title p span {
  margin-left: 100px;
}

.grtz_titleTime {
  font-size: 16px;
  margin: 0 10px;
}
.grtz_content p span {
  margin-right: 150px;
}

.grtz_content p span:last-child {
  margin-right: 15px;
}

.grtz_echarts {
  width: 100%;
  height: 400px;
  background-color: #2db7f5;
  position: relative;
}

.el-tabs {
  width: 100%;
  padding: 10px 30px !important;
}

.el_tab >>> .is-active {
  color: #4bd88a !important;
}

.el_tab >>> .el-tabs__item:hover {
  color: #4bd88a !important;
}

.el_tab >>> .el-tabs__active-bar {
  background-color: #4bd88a !important;
}

.suggest-list {
  font-size: 14px;
}
</style>
