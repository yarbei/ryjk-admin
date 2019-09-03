
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
              value-format="yyyy-MM-dd"
              @change="afterDischargeSelectDate"
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
            <el-date-picker
              v-model="outpatientDepartmentDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="margin:12px;"
              value-format="yyyy-MM-dd"
              @change="outpatientDepartmentSelectDate"
            ></el-date-picker>
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
    <div class="clearfix" style="margin-top:30px;">
      <h2 style="float:left">随访情况统计</h2>
    </div>
    <el-row :gutter="30">
      <el-col :span="width">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-row>
              <span style="font-weight:700;margin-top:10px;float:left;">随访人次</span>
              <el-button @click="cutTable(btnText1, 1)" v-text="btnText1"></el-button>
              <el-button @click="followUpPersonnelDerivation">导出</el-button>
            </el-row>
            <el-select
              v-show="this.$store.state.user.user.type==4||this.$store.state.user.user.type==1 ? true : false"
              v-model="followUpVisitsDoctor"
              clearable
              placeholder="选择疾病管理师"
              @change="followUpPersonnelDoctorId"
              style="width:100%;margin-top:10px;"
            >
              <el-option
                v-for="item in doctoArray"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-date-picker
              v-model="followUpVisitsDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:100%;margin-top:10px;"
              value-format="yyyy-MM-dd"
              @change="followUpVisitsSelectDate"
            ></el-date-picker>
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
            <el-table-column prop="proportion" align="center" label="占比"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="width">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-row>
              <span style="font-weight:700;margin-top:10px;float:left;">体征预警</span>
              <el-button @click="cutTable(btnText2, 2)" v-text="btnText2"></el-button>
              <el-button @click="earlyWarningExport">导出</el-button>
            </el-row>
            <el-select
              v-show="this.$store.state.user.user.type==4||this.$store.state.user.user.type==1 ? true : false"
              v-model="earlyWarningDorctor"
              clearable
              placeholder="选择疾病管理师"
              @change="earlyWarningDoctorId"
              style="width:100%;margin-top:10px;"
            >
              <el-option
                v-for="item in doctoArray"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-date-picker
              v-model="earlyWarningDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:100%;margin-top:10px;"
              value-format="yyyy-MM-dd"
              @change="earlyWarningSelectDate"
            ></el-date-picker>
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
            <el-table-column prop="proportion" align="center" label="占比"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="width" v-show="ismode">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-row>
              <span style="font-weight:700;margin-top:10px;float:left;">随访方式</span>
              <el-button @click="cutTable(btnText3, 3)" v-text="btnText3"></el-button>
              <el-button @click="visitTypeExport">导出</el-button>
            </el-row>
            <el-select
              v-show="this.$store.state.user.user.type==4||this.$store.state.user.user.type==1 ? true : false"
              v-model="visitTypeDorctor"
              clearable
              placeholder="选择疾病管理师"
              @change="visitTypeDoctorId"
              style="width:100%;margin-top:10px;"
            >
              <el-option
                v-for="item in doctoArray"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-date-picker
              v-model="visitTypeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:100%;margin-top:10px;"
              value-format="yyyy-MM-dd"
              @change="visitTypeSelectDate"
            ></el-date-picker>
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
            <el-table-column prop="proportion" align="center" label="占比"></el-table-column>
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
      followUpVisitsDoctor: "", //随访人次选择疾病管理师名字
      earlyWarningDorctor: "", //体征预警选择疾病管理师名字
      visitTypeDorctor: "", //随访方式选择疾病管理师名字
      flag1: true,
      flag2: true,
      flag3: true,
      btnText1: "切换表格",
      btnText2: "切换表格",
      btnText3: "切换表格",
      hospitalData: [], //出院后疾病管理情况
      departData: [], //门诊疾病管理情况
      userId: "", //用户ID
      isTemplateTypeShow: false, //是否显示选择模板下拉框
      afterDischargeDate: this.getDate(), //出院后疾病管理情况统计选择时间
      outpatientDepartmentDate: this.getDate(), //门诊疾病管理选择时间
      followUpVisitsDate: this.getDate(), //随访人次选择时间
      earlyWarningDate: this.getDate(), //体征预警选择时间
      visitTypeDate: this.getDate() //随访方式选择时间
    };
  },
  methods: {
    //随访人次导出功能
    followUpPersonnelDerivation() {
      this.$http({
        url:
          "/api" +
          "/analysis/work/3/sfrc?userRole=" +
          this.$store.state.user.user.type +
          "&userId=" +
          this.$store.state.user.user.id +
          "&startTime=" +
          this.followUpVisitsDate[0] +
          "&endTime=" +
          this.followUpVisitsDate[1],
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "随访人次");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //随访人次选择疾病管理师获取数据
    followUpPersonnelDoctorId(doctorId) {
      this.userId = doctorId;
      this.followUpVisitsData();
    },
    //随放人次选择时间
    followUpVisitsSelectDate(event) {
      this.followUpVisitsDate = event;
      this.followUpVisitsData();
    },
    //体征预警导出功能
    earlyWarningExport() {
      this.$http({
        url:
          "/api" +
          "/analysis/work/3/tzyj?userRole=" +
          this.$store.state.user.user.type +
          "&userId=" +
          this.$store.state.user.user.id +
          "&startTime=" +
          this.followUpVisitsDate[0] +
          "&endTime=" +
          this.followUpVisitsDate[1],
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "体征预警");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //体征预警选择疾病管理师获取数据
    earlyWarningDoctorId(doctorId) {
      this.userId = doctorId;
      this.earlyWarningData();
    },
    //体征预警选择时间获取数据
    earlyWarningSelectDate(event) {
      this.earlyWarningDate = event;
      this.earlyWarningData();
    },
    //随访方式导出功能
    visitTypeExport() {
      this.$http({
        url:
          "/api" +
          "/analysis/work/3/sffs?userRole=" +
          this.$store.state.user.user.type +
          "&userId=" +
          this.$store.state.user.user.id +
          "&startTime=" +
          this.visitTypeDate[0] +
          "&endTime=" +
          this.visitTypeDate[1],
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "随访方式");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //随访方式选择疾病管理师获取数据
    visitTypeDoctorId(doctorId) {
      this.userId = doctorId;
      this.visitTypeData();
    },
    //随访方式选择时间获取数据
    visitTypeSelectDate(event) {
      this.visitTypeDate = event;
      this.visitTypeData();
    },
    //选择出院后疾病管理情况统计时间
    afterDischargeSelectDate(event) {
      this.afterDischargeDate = event;
      this.hospitalDataList();
    },
    //选择门诊疾病管理情况统计时间
    outpatientDepartmentSelectDate(event) {
      this.outpatientDepartmentDate = event;
      this.departDataList();
    },
    //切换表格，图表
    cutTable(btnText, index) {
      this["flag" + index] = !this["flag" + index];
      this["btnText" + index] = this["flag" + index] ? "切换表格" : "切换图表";
    },
    //获取随访人次数据
    followUpVisitsData() {
      if (this.followUpVisitsDoctor == "") {
        this.userId = this.$store.state.user.user.id;
      }
      this.$http
        .get(
          "/api" +
            "/analysis/work/3/sfrc?userRole=" +
            this.$store.state.user.user.type +
            "&userId=" +
            this.followUpVisitsDoctor +
            "&startTime=" +
            this.followUpVisitsDate[0] +
            "&endTime=" +
            this.followUpVisitsDate[1]
        )
        .then(res => {
          this.visitStatus.rows = res.data;
          this.visitStatusTable = res.data;
          // this.visitType.rows = res.data;
          // this.visitTypeTable = res.data;
          // this.tiZhenYuJing.rows = res.data.tiZhenYuJing;
          // this.tiZhenYuJingTable = res.data.tiZhenYuJing;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取体征预警数据
    earlyWarningData() {
      if (this.earlyWarningDorctor == "") {
        this.userId = this.$store.state.user.user.id;
      }
      this.$http
        .get(
          "/api" +
            "/analysis/work/3/tzyj?userRole=" +
            this.$store.state.user.user.type +
            "&userId=" +
            this.earlyWarningDorctor +
            "&startTime=" +
            this.earlyWarningDate[0] +
            "&endTime=" +
            this.earlyWarningDate[1]
        )
        .then(res => {
          // this.visitType.rows = res.data;
          // this.visitTypeTable = res.data;
          this.tiZhenYuJing.rows = res.data;
          this.tiZhenYuJingTable = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取随访方式数据
    visitTypeData() {
      if (this.visitTypeDorctor == "") {
        this.userId = this.$store.state.user.user.id;
      }
      this.$http
        .get(
          "/api" +
            "/analysis/work/3/sffs?userRole=" +
            this.$store.state.user.user.type +
            "&userId=" +
            this.visitTypeDorctor +
            "&startTime=" +
            this.visitTypeDate[0] +
            "&endTime=" +
            this.visitTypeDate[1]
        )
        .then(res => {
          this.visitType.rows = res.data;
          this.visitTypeTable = res.data;
        })
        .catch(err => {
          console.log(err);
        });
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
    //出院后疾病管理情况数据
    hospitalDataList() {
      this.$http
        .post(
          "/api" +
            "/analysis/work/sinknessManager?patientType=0&page=1&rows=100&startTime=" +
            this.afterDischargeDate[0] +
            "&endTime=" +
            this.afterDischargeDate[1]
        )
        .then(res => {
          this.hospitalData = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //门诊疾病管理情况数据
    departDataList() {
      this.$http
        .post(
          "/api" +
            "/analysis/work/outpatientService?page=1&rows=100&startTime=" +
            this.outpatientDepartmentDate[0] +
            "&endTime=" +
            this.outpatientDepartmentDate[1]
        )
        .then(res => {
          this.departData = res;
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
          "/excel/exprotHospitalData?patientType=0&rows=100&startTime=" +
          this.afterDischargeDate[0] +
          "&endTime=" +
          this.afterDischargeDate[1],
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
          "/excel/exportDepartData?page=1&rows=100&startTime=" +
          this.outpatientDepartmentDate[0] +
          "&endTime=" +
          this.outpatientDepartmentDate[1],
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
    },
    //获取当前日期和三十天前的日期
    getDate() {
      //获取当前日期
      var myDate = new Date();
      var nowY = myDate.getFullYear();
      var nowM = myDate.getMonth() + 1;
      var nowD = myDate.getDate();
      var enddate =
        nowY +
        "-" +
        (nowM < 10 ? "0" + nowM : nowM) +
        "-" +
        (nowD < 10 ? "0" + nowD : nowD); //当前日期
      //获取三十天前日期
      var lw = new Date(myDate - 1000 * 60 * 60 * 24 * 30); //最后一个数字30可改，30天的意思
      var lastY = lw.getFullYear();
      var lastM = lw.getMonth() + 1;
      var lastD = lw.getDate();
      var startdate =
        lastY +
        "-" +
        (lastM < 10 ? "0" + lastM : lastM) +
        "-" +
        (lastD < 10 ? "0" + lastD : lastD); //三十天之前日期
      var date = [];
      date.push(startdate);
      date.push(enddate);
      return date;
    }
  },
  created() {
    this.hospitalDataList();
    this.departDataList();
    this.followUpVisitsData(); //获取随访人次数据
    this.earlyWarningData(); //获取体征预警数据
    this.visitTypeData(); //获取随访方式数据
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
<style scoped>
.el-button {
  background-color: #52d7ac;
  border-radius: 0;
  color: #fff;
  border: 1px solid #52d7ac;
  padding: 10px 20px;
  margin-left: 10px;
  float: right;
  border-radius: 5px;
}
</style>
<<<<<<< HEAD
=======
>>>>>>> 72e295baa15f9744ccc8021f7459c25f9a17f543
>>>>>>> master
