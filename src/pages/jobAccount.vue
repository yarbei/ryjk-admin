<template>
  <div>
    <el-row :gutter="80">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2 style="float:left">出院后疾病管理情况统计</h2>
            <el-date-picker
              v-model="afterDischargeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="margin:12px;"
            ></el-date-picker>
            <el-button
              @click="exportsHospital"
              type="primary"
              style="background-color: #52a3d7; border: 0; font-size: 14px; float:right; margin-top: 12px"
            >
              <i class="el-icon-download" style="margin-right: 5px"></i>导出
            </el-button>
          </div>
          <el-table
            :data="hospitalData"
            :border="true"
            stripe
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column prop="departmentName" align="center" label="科室" width="150"></el-table-column>
            <el-table-column prop="rzzCount" align="center" width="150" label="出院总人次"></el-table-column>
            <el-table-column prop="successCount" align="center" label="抓取成功" width="100"></el-table-column>
            <el-table-column prop="failireCount" align="center" label="失败" width="100"></el-table-column>
            <el-table-column prop="schedulingCount" align="center" label="排期人次" width="100"></el-table-column>
            <el-table-column prop="overdueCount" align="center" label="排期过期人次" width="100"></el-table-column>
            <el-table-column prop="firstVisit" align="center" label="首访" width="100"></el-table-column>
            <el-table-column prop="secondVisit" align="center" label="二访" width="120"></el-table-column>
            <el-table-column prop="thirdVisit" align="center" label="三访及以上" width="150"></el-table-column>
            <el-table-column prop="totalVisit" align="center" label="随访总人次" width="150"></el-table-column>
            <el-table-column prop="terminationVisit" align="center" label="终止随访" width="150"></el-table-column>
            <el-table-column prop="validVisitRate" align="center" label="有效随访人次" width="150"></el-table-column>
            <el-table-column prop="notCount" align="center" label="勿访人次" width="150"></el-table-column>
            <el-table-column prop="timelyRate" align="center" label="排期率" width="150"></el-table-column>
            <el-table-column prop="validVisitRate" align="center" label="有效随访率" width="150"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="80">
      <el-col :span="24">
        <el-card class="box-card" style="margin-top:30px;">
          <div slot="header" class="clearfix">
            <h2 style="float:left">门诊疾病管理情况统计</h2>
            <el-button
              @click="exportDepartData"
              type="primary"
              style="background-color: #52a3d7; border: 0; font-size: 14px; float:right; margin-top: 12px"
            >
              <i class="el-icon-download" style="margin-right: 5px"></i>导出
            </el-button>
          </div>
          <el-table
            :data="departData"
            :border="true"
            stripe
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column prop="departmentName" align="center" label="科室" width="150"></el-table-column>
            <el-table-column prop="mzCount" align="center" width="150" label="就诊人次"></el-table-column>
            <el-table-column prop="successCount" align="center" label="抓取成功" width="100"></el-table-column>
            <el-table-column prop="schedulingCount" align="center" label="排期人次" width="100"></el-table-column>
            <el-table-column prop="validVisit" align="center" label="有效随访人次" width="150"></el-table-column>
            <el-table-column prop="totalVisit" align="center" label="随访总人次" width="150"></el-table-column>
            <el-table-column prop="firstVisit" align="center" label="首访" width="100"></el-table-column>
            <el-table-column prop="secondVisit" align="center" label="二访" width="120"></el-table-column>
            <el-table-column prop="satisfactionSurvey" align="center" label="满意率" width="150"></el-table-column>
            <el-table-column prop="timelyRate" align="center" label="排期率" width="150"></el-table-column>
            <el-table-column prop="validVisitRate" align="center" label="有效随访率" width="150"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <div slot="header" class="clearfix" style="margin-top:30px;">
      <h2 style="float:left">随访情况统计</h2>
      <el-form :inline="true" :model="filters" class="toolbar_form">
        <el-select
          v-show="this.$store.state.user.user.type===4||this.$store.state.user.user.type===1 ? true : false"
          v-model="dorctorNameChoose"
          clearable
          placeholder="选择疾病管理师"
          @change="getVisitByDoctorId"
          style="margin-right: 10px;float: left;margin-top: 12px;margin-left: 14px"
        >
          <el-option v-for="item in doctoArray" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form>
      <el-button
        @click="exports"
        type="primary"
        style="background-color: #52a3d7; border: 0; font-size: 14px; float:right; margin-top: 12px"
      >
        <i class="el-icon-download" style="margin-right: 5px"></i>导出
      </el-button>
    </div>
    <el-row :gutter="30">
      <el-col :span="width">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>随访人次</span>

            <el-button
              type="success"
              style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac;padding: 10px 20px; float: right;"
              @click="cutTable(btnText1, 1)"
              v-text="btnText1"
            ></el-button>
          </div>
          <ve-pie :data="visitStatus" v-show="flag1 == true"></ve-pie>
          <el-table
            :border="true"
            :data="visitStatusTable"
            stripe
            highlight-current-row
            height="400"
            style="width: 100%;"
            v-show="flag1 == false"
          >
            <el-table-column prop="name" align="center" label="随访情况"></el-table-column>
            <el-table-column prop="value" align="center" label="所占人次"></el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="width">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>体征预警</span>
            <el-button
              type="success"
              style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac;padding: 10px 20px; float: right;"
              @click="cutTable(btnText2, 2)"
              v-text="btnText2"
            ></el-button>
          </div>
          <ve-pie :data="tiZhenYuJing" v-show="flag2 == true"></ve-pie>
          <el-table
            :border="true"
            :data="tiZhenYuJingTable"
            stripe
            highlight-current-row
            height="400"
            style="width: 100%;"
            v-show="flag2 == false"
          >
            <el-table-column prop="name" align="center" label="体征预警"></el-table-column>
            <el-table-column prop="value" align="center" label="所占人次"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="width" v-show="ismode">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>随访方式</span>
            <el-button
              type="success"
              style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac;padding: 10px 20px; float: right;"
              @click="cutTable(btnText3, 3)"
              v-text="btnText3"
            ></el-button>
          </div>
          <ve-pie :data="visitType" v-show="flag3 == true"></ve-pie>
          <el-table
            :border="true"
            :data="visitTypeTable"
            stripe
            highlight-current-row
            height="400"
            style="width: 100%;"
            v-show="flag3 == false"
          >
            <el-table-column prop="name" align="center" label="随访方式"></el-table-column>
            <el-table-column prop="value" align="center" label="所占人次"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { lchown } from "fs";
export default {
  data() {
    return {
      filters: {},
      ismode: false,
      width: 8,
      followUpMode: false,
      visitStatus: {
        columns: ["name", "value"],
        rows: []
      },
      visitType: {
        columns: ["name", "value"],
        rows: []
      },
      doctoArray: [
        {
          id: "",
          name: ""
        }
      ],
      tiZhenYuJing: {
        columns: ["name", "value"],
        rows: []
      },
      visitStatusTable: [],
      visitTypeTable: [],
      tiZhenYuJingTable: [],
      dorctorNameChoose: "", //选择疾病管理师名字
      flag1: true,
      flag2: true,
      flag3: true,
      btnText1: "表格",
      btnText2: "表格",
      btnText3: "表格",
      hospitalData: [], //出院后疾病管理情况
      departData: [], //门诊疾病管理情况
      userId: "", //用户ID
      isTemplateTypeShow: false, //是否显示选择模板下拉框
      afterDischargeDate:[], //出院后疾病管理情况统计选择时间

    };
  },
  methods: {
    cutTable(btnText, index) {
      this["flag" + index] = !this["flag" + index];
      this["btnText" + index] = this["flag" + index] ? "表格" : "图表";
    },
    //随访情况统计
    visitData() {
      if (this.$store.state.user.user.type != 3) {
        this.userId = this.$store.state.user.user.id;
      }
      this.$http
        .get(
          "/api" +
            "/analysis/work/3?userRole=" +
            this.$store.state.user.user.type +
            "&userId=" +
            this.userId
        )
        .then(res => {
          this.visitStatus.rows = res.data.visitStatus;
          this.visitType.rows = res.data.visitType;
          this.tiZhenYuJing.rows = [
            { name: "已处理", value: res.data.tiZhenYuJing.status_0 },
            { name: "未处理", value: res.data.tiZhenYuJing.status_1 }
          ];
          this.visitStatusTable = res.data.visitStatus;
          this.visitTypeTable = res.data.visitType;
          this.tiZhenYuJingTable = [
            { name: "已处理", value: res.data.tiZhenYuJing.status_0 },
            { name: "未处理", value: res.data.tiZhenYuJing.status_1 }
          ];
        })
        .catch(err => {
          console.log(err);
        });
    },
    //出院后疾病管理情况
    hospitalDataList() {
      this.$http
        .post(
          "/api" +
            "/analysis/work/sinknessManager?patientType=0&page=1&rows=100&startTime=1970-01-01&endTime=2099-01-01"
        )
        .then(res => {
          this.hospitalData = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //门诊疾病管理情况
    departDataList() {
      this.$http
        .post(
          "/api" +
            "/analysis/work/outpatientService?page=1&rows=100&startTime=1970-01-01&endTime=2099-01-01"
        )
        .then(res => {
          this.departData = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 根据疾病管理师筛选随访情况
    getVisitByDoctorId() {
      if (this.dorctorNameChoose == "") {
        this.visitData();
      } else {
        this.$http
          .get(
            "/api" +
              "/analysis/work/3?userRole=" +
              this.$store.state.user.user.type +
              "&userId=" +
              this.dorctorNameChoose
          )
          .then(res => {
            this.visitStatus.rows = res.data.visitStatus;
            this.visitType.rows = res.data.visitType;
            this.tiZhenYuJing.rows = [
              { name: "已处理", value: res.data.tiZhenYuJing.status_0 },
              { name: "未处理", value: res.data.tiZhenYuJing.status_1 }
            ];
            this.visitStatusTable = res.data.visitStatus;
            this.visitTypeTable = res.data.visitType;
            this.tiZhenYuJingTable = [
              { name: "已处理", value: res.data.tiZhenYuJing.status_0 },
              { name: "未处理", value: res.data.tiZhenYuJing.status_1 }
            ];
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //获取医生列表
    dorctorList() {
      this.$http
        .get("/api" + `/doctor/getDoctorAll?hospitalId=1`)
        .then(res => {
          this.doctoArray = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出出院后疾病管理情况表格
    exportsHospital() {
      this.$http({
        url:
          "/api" +
          "/excel/exprotHospitalData?patientType=0&rows=100&startTime=1970-01-01&endTime=2099-01-01",
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "出院后疾病管理情况统计");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出门诊疾病管理情况表格
    exportDepartData() {
      this.$http({
        url:
          "/api" +
          "/excel/exportDepartData?page=1&rows=100&startTime=1970-01-01&endTime=2099-01-01",
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "门诊疾病管理情况统计");
        })
        .catch(err => {
          console.log(err);
        });
    },

    //导出表格
    exports() {
      this.$http({
        url:
          "/api" +
          "/excel/exportWorkList?userRole=" +
          0 +
          "&userId=" +
          this.$store.state.user.user.id,
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "随访情况统计");
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 下载文件
    download(data, name) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", name + ".xls");

      document.body.appendChild(link);
      link.click();
    }
  },
  created() {
    this.hospitalDataList();
    this.departDataList();
    this.visitData();
    this.dorctorList();
    if (this.$store.state.user.user.type == 1) {
      this.ismode = true;
      this.width = 8;
    } else {
      this.ismode = false;
      this.width = 12;
    }
  }
};
</script>
