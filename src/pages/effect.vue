<<<<<<< HEAD
<template>
  <div>
    <div slot="header" class="clearfix">
      <h2 style="float:left">效果统计与分析</h2>
    </div>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>出院/转出归属情况</span>
            <el-date-picker
              v-model="leaveHospitalDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:230px;"
              value-format="yyyy-MM-dd"
              @change="leaveHospitalSelectDate"
            ></el-date-picker>
            <el-button type="success" @click="cutTable(btnText1, 1)" v-text="btnText1"></el-button>
            <el-button @click="leaveHospitalExport">导出</el-button>
          </div>
          <ve-pie :data="leaveHospitalData" :settings="chartSettings" v-show="flag1 == true"></ve-pie>
          <el-table
            :border="true"
            :data="leaveHospitalTable"
            stripe
            highlight-current-row
            height="400"
            style="width: 100%;"
            v-show="flag1 == false"
          >
            <el-table-column prop="name" align="center" label="出院情况"></el-table-column>
            <el-table-column prop="value" align="center" label="人次"></el-table-column>
            <el-table-column prop="proportion" align="center" label="占比"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>管理效果评估</span>
            <el-date-picker
              v-model="administrationDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:230px;"
              value-format="yyyy-MM-dd"
              @change="administrationSelectDate"
            ></el-date-picker>
            <el-button type="success" @click="cutTable(btnText1, 2)" v-text="btnText1"></el-button>
            <el-button @click="administrationExport">导出</el-button>
          </div>
          <ve-pie
            :data="administrationData"
            :settings="administrationSettings"
            v-show="flag2 == true"
          ></ve-pie>
          <el-table
            :border="true"
            :data="administrationTable"
            stripe
            highlight-current-row
            height="400"
            style="width: 100%;"
            v-show="flag2 == false"
          >
            <el-table-column prop="name" align="center" label="随访评估"></el-table-column>
            <el-table-column prop="value" align="center" label="人次"></el-table-column>
            <el-table-column prop="proportion" align="center" label="占比"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>复诊提醒</span>
            <el-date-picker
              v-model="reminderRevisitDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:230px;"
              value-format="yyyy-MM-dd"
              @change="reminderRevisitSelectDate"
            ></el-date-picker>
            <el-button type="success" @click="cutTable(btnText1, 3)" v-text="btnText1"></el-button>
            <el-button @click="reminderRevisitExport">导出</el-button>
          </div>
          <ve-pie :data="reminderRevisit" :settings="chartSettings" v-show="flag3 == true"></ve-pie>
          <el-table
            :border="true"
            :data="reminderRevisitTable"
            stripe
            highlight-current-row
            height="400"
            style="width: 100%;"
            v-show="flag3 == false"
          >
            <el-table-column prop="name" align="center" label="提醒情况"></el-table-column>
            <el-table-column prop="value" align="center" label="人次"></el-table-column>
            <el-table-column prop="proportion" align="center" label="占比"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>复诊预约</span>
            <el-date-picker
              v-model="appointmentRevisitDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:230px;"
              value-format="yyyy-MM-dd"
              @change="appointmentRevisitSelectDate"
            ></el-date-picker>
            <el-button type="success" @click="cutTable(btnText1, 4)" v-text="btnText1"></el-button>
            <el-button @click="appointmentRevisitExport">导出</el-button>
          </div>
          <ve-pie :data="appointmentRevisit" :settings="chartSettings" v-show="flag4 == true"></ve-pie>
          <el-table
            :border="true"
            :data="appointmentRevisitTable"
            stripe
            highlight-current-row
            height="400"
            style="width: 100%;"
            v-show="flag4 == false"
          >
            <el-table-column prop="name" align="center" label="预约情况"></el-table-column>
            <el-table-column prop="value" align="center" label="人次"></el-table-column>
            <el-table-column prop="proportion" align="center" label="占比"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="80">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2 style="float:left">管理效果依从性统计分析</h2>
            <el-date-picker
              v-model="ComplianceDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="margin:10px;"
              value-format="yyyy-MM-dd"
              @change="ComplianceSelectDate"
            ></el-date-picker>
            <el-button
              @click="exportCompliance"
              type="primary"
              style="background-color: #52a3d7; border: 0; font-size: 14px; margin-top: 12px;float:right"
            >
              <i class="el-icon-download" style="margin-right: 5px"></i>导出
            </el-button>
          </div>
          <el-table
            :data="tableData"
            :border="true"
            stripe
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column prop="healthAwareness" align="center" label="健康知晓率" width="150"></el-table-column>
            <el-table-column prop align="center" label="依从性好" width="150">
              <el-table-column prop="compliance" align="center" label="人次" width="150"></el-table-column>
              <el-table-column prop="medicalCompliance" align="center" width="150" label="占比"></el-table-column>
            </el-table-column>
            <el-table-column align="center" label="已戒烟">
              <el-table-column prop="giveUpSmoking" align="center" label="人次" width="100"></el-table-column>
              <el-table-column prop="smokingVolume" align="center" label="占比" width="100"></el-table-column>
            </el-table-column>
            <el-table-column align="center" label="已戒酒">
              <el-table-column prop="quitDrinking" align="center" label="人次" width="100"></el-table-column>
              <el-table-column prop="alcoholConsumption" align="center" label="占比" width="100"></el-table-column>
            </el-table-column>
            <el-table-column align="center" label="用药依从性">
              <el-table-column align="center" label="不服药">
                <el-table-column
                  prop="medicationComplianceTotal0"
                  align="center"
                  label="人次"
                  width="100"
                ></el-table-column>
                <el-table-column prop="medicationCompliance0" align="center" label="占比" width="120"></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="服药部分依从">
                <el-table-column
                  prop="medicationComplianceTotal1"
                  align="center"
                  label="人次"
                  width="150"
                ></el-table-column>
                <el-table-column prop="medicationCompliance1" align="center" label="占比" width="150"></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="服药完全依从">
                <el-table-column
                  prop="medicationComplianceTotal2"
                  align="center"
                  label="人次"
                  width="150"
                ></el-table-column>
                <el-table-column prop="medicationCompliance2" align="center" label="占比" width="150"></el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>
              <b>症状</b>
            </span>
            <span style="margin-left: 100px">模版类型</span>
            <el-select v-model="filters.templateType1" placeholder="请选择模版" @change="getSymptomList">
              <el-option :value="0" label="通用"></el-option>
              <el-option :value="1" label="产后"></el-option>
              <el-option :value="2" label="肝病"></el-option>
              <el-option :value="3" label="类风湿"></el-option>
              <el-option :value="4" label="慢阻肺"></el-option>
              <el-option :value="5" label="脑卒中"></el-option>
              <el-option :value="6" label="内分泌"></el-option>
              <el-option :value="7" label="痛风"></el-option>
              <el-option :value="8" label="消化道出血"></el-option>
              <el-option :value="9" label="心内科疾病"></el-option>
              <el-option :value="10" label="肿瘤"></el-option>
            </el-select>
            <el-button @click="exportSymptom">导出</el-button>
            <el-date-picker
              v-model="symptomDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:100%;margin-top:10px;"
              value-format="yyyy-MM-dd"
              @change="symptomSelectDate"
            ></el-date-picker>
          </div>
          <el-table
            :data="symptomData"
            :border="true"
            stripe
            highlight-current-row
            height="460"
            style="width: 100%;"
          >
            <el-table-column prop="label" align="center" label="症状名称"></el-table-column>
            <el-table-column prop="symptomTotal" align="center" label="人次"></el-table-column>
            <el-table-column prop="proportion" align="center" label="占比"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>
              <b>并发症</b>
            </span>
            <span style="margin-left: 100px">模版类型</span>
            <el-select
              v-model="filters.templateType2"
              placeholder="请选择模版"
              @change="getComplicationList"
            >
              <el-option :value="0" label="通用"></el-option>
              <el-option :value="1" label="产后"></el-option>
              <el-option :value="2" label="肝病"></el-option>
              <el-option :value="3" label="类风湿"></el-option>
              <el-option :value="4" label="慢阻肺"></el-option>
              <el-option :value="5" label="脑卒中"></el-option>
              <el-option :value="6" label="内分泌"></el-option>
              <el-option :value="7" label="痛风"></el-option>
              <el-option :value="8" label="消化道出血"></el-option>
              <el-option :value="9" label="心内科疾病"></el-option>
              <el-option :value="10" label="肿瘤"></el-option>
            </el-select>
            <el-button @click="exportComplication" type="primary">导出</el-button>
            <el-date-picker
              v-model="complicationDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:100%;margin-top:10px;"
              value-format="yyyy-MM-dd"
              @change="complicationSelectDate"
            ></el-date-picker>
          </div>
          <el-table
            :data="complicationData"
            :border="true"
            stripe
            highlight-current-row
            height="460"
            style="width: 100%;"
          >
            <el-table-column prop="label" align="center" label="症状名称"></el-table-column>
            <el-table-column prop="complicationTotal" align="center" label="人次"></el-table-column>
            <el-table-column prop="proportion" align="center" label="占比"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { constants } from "fs";
export default {
  data() {
    this.chartSettings = {
      radius: 120,
      offsetY: 200
    };
    this.administrationSettings = {
      radius: 120,
      offsetY: 200
    };
    return {
      filters: {
        templateType1: 0,
        templateType2: 0
      },
      leaveHospitalData: {
        columns: ["name", "value"],
        rows: []
      },
      administrationData: {
        columns: ["name", "value"],
        rows: []
      },
      reminderRevisit: {
        columns: ["name", "value"],
        rows: []
      },
      appointmentRevisit: {
        columns: ["name", "value"],
        rows: []
      },
      tableData: [],
      listLoading: false,
      symptomData: [],
      complicationData: [],
      leaveHospitalTable: [], //出院/转出归属情况表格
      administrationTable: [], //管理效果评估表格
      reminderRevisitTable: [], //复诊提醒率表格
      appointmentRevisitTable: [], //复诊预约率表格
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: true,
      btnText1: "切换表格",
      leaveHospitalDate: this.getDate(), //出院/转出归属情况时间
      administrationDate: this.getDate(), //管理效果评估时间
      reminderRevisitDate: this.getDate(), //复诊提醒率时间
      appointmentRevisitDate: this.getDate(), //复诊预约时间
      ComplianceDate: this.getDate(), //管理效果依从性统计分析时间
      symptomDate: this.getDate(), //症状时间
      complicationDate: this.getDate() //并发症时间
    };
  },
  methods: {
    //出院转出归属情况选择时间
    leaveHospitalSelectDate(event) {
      this.leaveHospitalDate = event;
      this.getleaveHospitalData();
    },
    //管理效果评估时间
    administrationSelectDate(event) {
      this.administrationDate = event;
      this.getadministrationData();
    },
    //复诊提醒时间
    reminderRevisitSelectDate(event) {
      this.reminderRevisitDate = event;
      this.getreminderRevisitData();
    },
    //复诊预约时间
    appointmentRevisitSelectDate(event) {
      this.appointmentRevisitDate = event;
      this.getappointmentRevisitData();
    },
    //获取出院转出归属情况数据
    getleaveHospitalData() {
      this.$http(
        "/api" +
          "/analysis/manager/1/discharge?startTime=" +
          this.leaveHospitalDate[0] +
          "&endTime=" +
          this.leaveHospitalDate[1]
      )
        .then(res => {
          this.leaveHospitalTable = res.data; //出院/转出归属情况表格赋值
          this.leaveHospitalData.rows = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取管理效果评估数据
    getadministrationData() {
      this.$http(
        "/api" +
          "/analysis/manager/1/assessment?startTime=" +
          this.administrationDate[0] +
          "&endTime=" +
          this.administrationDate[1]
      )
        .then(res => {
          if (res.data != null) {
            [res.data[0], res.data[1]] = [res.data[1], res.data[0]];
            this.administrationTable = res.data; //管理效果评估表格赋值
            this.administrationData.rows = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取复诊提醒数据
    getreminderRevisitData() {
      this.$http(
        "/api" +
          "/analysis/manager/1/reminderRevisit?startTime=" +
          this.reminderRevisitDate[0] +
          "&endTime=" +
          this.reminderRevisitDate[1]
      )
        .then(res => {
          this.reminderRevisitTable = res.data; //复诊提醒率表格赋值
          this.reminderRevisit.rows = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取复诊预约数据
    getappointmentRevisitData() {
      this.$http(
        "/api" +
          "/analysis/manager/1/appointmentRevisit?startTime=" +
          this.appointmentRevisitDate[0] +
          "&endTime=" +
          this.appointmentRevisitDate[1]
      )
        .then(res => {
          this.appointmentRevisitTable = res.data; //复诊预约率表格赋值
          this.appointmentRevisit.rows = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取症状列表数据
    getSymptomList() {
      this.$http(
        "/api" +
          `/analysis/symptom?templateType=${this.filters.templateType1}&startTime=` +
          this.symptomDate[0] +
          "&endTime=" +
          this.symptomDate[1]
      )
        .then(res => {
          this.symptomData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取并发症列表数据
    getComplicationList() {
      this.$http(
        "/api" +
          `/analysis/complication?templateType=${this.filters.templateType2}&startTime=` +
          this.complicationDate[0] +
          "&endTime=" +
          this.complicationDate[1]
      )
        .then(res => {
          this.complicationData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //切换表格，图表
    cutTable(btnText, index) {
      this["flag" + index] = !this["flag" + index];
      this["btnText" + index] = this["flag" + index] ? "切换表格" : "切换图表";
    },
    //管理效果依从性选择时间
    ComplianceSelectDate(event) {
      this.ComplianceDate = event;
      //获取管理效果依从性列表
      this.$http(
        "/api" +
          "/analysis/manager/3?startTime=" +
          this.ComplianceDate[0] +
          "&endTime=" +
          this.ComplianceDate[1]
      )
        .then(res => {
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出管理效果依从性类统计分析表格
    exportCompliance() {
      this.$http({
        url:
          "/api" +
          "/excel/exportCompliance?startTime=" +
          this.ComplianceDate[0] +
          "&endTime=" +
          this.ComplianceDate[1],
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "管理效果依从性类统计分析");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //症状选择时间
    symptomSelectDate(event){
      this.symptomDate=event;
      this.getSymptomList();
    },
    //导出症状统计分析表格
    exportSymptom() {
      this.$http({
        url:
          "/api" +
          "/excel/exportSymptom?templateType=" +
          this.filters.templateType1 +
          "&startTime=" +
          this.symptomDate[0] +
          "&endTime=" +
          this.symptomDate[1],
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "症状统计分析");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //并发症选择时间
    complicationSelectDate(event){
      this.complicationDate=event;
      this.getComplicationList();
    },
    //导出并发症统计分析表格
    exportComplication() {
      this.$http({
        url:
          "/api" +
          "/excel/exportComplication?templateType=" +
          this.filters.templateType1 +
          "&startTime=" +
          this.complicationDate[0] +
          "&endTime=" +
          this.complicationDate[1],
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "并发症统计分析");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出出院/转出归属情况表格
    leaveHospitalExport() {
      this.$http({
        url:
          "/api" +
          "/analysis/manager/1/discharge?startTime=" +
          this.leaveHospitalDate[0] +
          "&endTime=" +
          this.leaveHospitalDate[1],
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "出院/转出归属情况");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出管理效果评估表格
    administrationExport() {
      this.$http({
        url:
          "/api" +
          "/analysis/manager/1/assessment?startTime=" +
          this.administrationDate[0] +
          "&endTime=" +
          this.administrationDate[1],
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "管理效果评估");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出复诊提醒情况表格
    reminderRevisitExport() {
      this.$http({
        url:
          "/api" +
          "/analysis/manager/1/reminderRevisit?startTime=" +
          this.reminderRevisitDate[0] +
          "&endTime=" +
          this.reminderRevisitDate[1],
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "复诊提醒情况");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出复诊预约情况表格
    appointmentRevisitExport() {
      this.$http({
        url:
          "/api" +
          "/analysis/manager/1/appointmentRevisit?startTime=" +
          this.appointmentRevisitDate[0] +
          "&endTime=" +
          this.appointmentRevisitDate[1],
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "复诊提醒情况");
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
    this.getComplicationList();
    this.getSymptomList();
    this.getleaveHospitalData(); //获取出院转出归属情况数据
    this.getadministrationData(); //获取管理效果评估数据
    this.getreminderRevisitData(); //获取复诊提醒数据
    this.getappointmentRevisitData(); //获取复诊预约数据
    //获取管理效果依从性列表
    this.$http(
      "/api" +
        "/analysis/manager/3?startTime=" +
        this.ComplianceDate[0] +
        "&endTime=" +
        this.ComplianceDate[1]
    )
      .then(res => {
        this.tableData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
.el-row {
  margin-bottom: 30px;
}
table tr {
  width: 100%;
  height: 50px;
}
table tr td {
  width: 16.666%;
  height: 100%;
  text-align: center;
  line-height: 50px;
}
.el-button {
  background-color: #52d7ac;
  border-radius: 0;
  color: #fff;
  border: 1px solid #52d7ac;
  padding: 10px;
  margin-left: 10px;
  float: right;
  border-radius: 5px;
}
</style>


=======
<template>
  <div>
    <div slot="header" class="clearfix">
      <h2 style="float:left">效果统计与分析</h2>
    </div>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>出院/转出归属情况</span>
            <el-date-picker
              v-model="leaveHospitalDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:230px;"
              value-format="yyyy-MM-dd"
              @change="leaveHospitalSelectDate"
            ></el-date-picker>
            <el-button type="success" @click="cutTable(btnText1, 1)" v-text="btnText1"></el-button>
            <el-button @click="leaveHospitalExport">导出</el-button>
          </div>
          <ve-pie :data="leaveHospitalData" :settings="chartSettings" v-show="flag1 == true"></ve-pie>
          <el-table
            :border="true"
            :data="leaveHospitalTable"
            stripe
            highlight-current-row
            height="400"
            style="width: 100%;"
            v-show="flag1 == false"
          >
            <el-table-column prop="name" align="center" label="出院情况"></el-table-column>
            <el-table-column prop="value" align="center" label="人次"></el-table-column>
            <el-table-column prop="proportion" align="center" label="占比"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>管理效果评估</span>
            <el-date-picker
              v-model="administrationDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:230px;"
              value-format="yyyy-MM-dd"
              @change="administrationSelectDate"
            ></el-date-picker>
            <el-button type="success" @click="cutTable(btnText1, 2)" v-text="btnText1"></el-button>
            <el-button @click="administrationExport">导出</el-button>
          </div>
          <ve-pie
            :data="administrationData"
            :settings="administrationSettings"
            v-show="flag2 == true"
          ></ve-pie>
          <el-table
            :border="true"
            :data="administrationTable"
            stripe
            highlight-current-row
            height="400"
            style="width: 100%;"
            v-show="flag2 == false"
          >
            <el-table-column prop="name" align="center" label="随访评估"></el-table-column>
            <el-table-column prop="value" align="center" label="人次"></el-table-column>
            <el-table-column prop="proportion" align="center" label="占比"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>复诊提醒</span>
            <el-date-picker
              v-model="reminderRevisitDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:230px;"
              value-format="yyyy-MM-dd"
              @change="reminderRevisitSelectDate"
            ></el-date-picker>
            <el-button type="success" @click="cutTable(btnText1, 3)" v-text="btnText1"></el-button>
            <el-button @click="reminderRevisitExport">导出</el-button>
          </div>
          <ve-pie :data="reminderRevisit" :settings="chartSettings" v-show="flag3 == true"></ve-pie>
          <el-table
            :border="true"
            :data="reminderRevisitTable"
            stripe
            highlight-current-row
            height="400"
            style="width: 100%;"
            v-show="flag3 == false"
          >
            <el-table-column prop="name" align="center" label="提醒情况"></el-table-column>
            <el-table-column prop="value" align="center" label="人次"></el-table-column>
            <el-table-column prop="proportion" align="center" label="占比"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>复诊预约</span>
            <el-date-picker
              v-model="appointmentRevisitDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:230px;"
              value-format="yyyy-MM-dd"
              @change="appointmentRevisitSelectDate"
            ></el-date-picker>
            <el-button type="success" @click="cutTable(btnText1, 4)" v-text="btnText1"></el-button>
            <el-button @click="appointmentRevisitExport">导出</el-button>
          </div>
          <ve-pie :data="appointmentRevisit" :settings="chartSettings" v-show="flag4 == true"></ve-pie>
          <el-table
            :border="true"
            :data="appointmentRevisitTable"
            stripe
            highlight-current-row
            height="400"
            style="width: 100%;"
            v-show="flag4 == false"
          >
            <el-table-column prop="name" align="center" label="预约情况"></el-table-column>
            <el-table-column prop="value" align="center" label="人次"></el-table-column>
            <el-table-column prop="proportion" align="center" label="占比"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="80">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2 style="float:left">管理效果依从性统计分析</h2>
            <el-date-picker
              v-model="ComplianceDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="margin:10px;"
              value-format="yyyy-MM-dd"
              @change="ComplianceSelectDate"
            ></el-date-picker>
            <el-button
              @click="exportCompliance"
              type="primary"
              style="background-color: #52a3d7; border: 0; font-size: 14px; margin-top: 12px;float:right"
            >
              <i class="el-icon-download" style="margin-right: 5px"></i>导出
            </el-button>
          </div>
          <el-table
            :data="tableData"
            :border="true"
            stripe
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column prop="healthAwareness" align="center" label="健康知晓率" width="150"></el-table-column>
            <el-table-column prop align="center" label="依从性好" width="150">
              <el-table-column prop="compliance" align="center" label="人次" width="150"></el-table-column>
              <el-table-column prop="medicalCompliance" align="center" width="150" label="占比"></el-table-column>
            </el-table-column>
            <el-table-column align="center" label="已戒烟">
              <el-table-column prop="giveUpSmoking" align="center" label="人次" width="100"></el-table-column>
              <el-table-column prop="smokingVolume" align="center" label="占比" width="100"></el-table-column>
            </el-table-column>
            <el-table-column align="center" label="已戒酒">
              <el-table-column prop="quitDrinking" align="center" label="人次" width="100"></el-table-column>
              <el-table-column prop="alcoholConsumption" align="center" label="占比" width="100"></el-table-column>
            </el-table-column>
            <el-table-column align="center" label="用药依从性">
              <el-table-column align="center" label="不服药">
                <el-table-column
                  prop="medicationComplianceTotal0"
                  align="center"
                  label="人次"
                  width="100"
                ></el-table-column>
                <el-table-column prop="medicationCompliance0" align="center" label="占比" width="120"></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="服药部分依从">
                <el-table-column
                  prop="medicationComplianceTotal1"
                  align="center"
                  label="人次"
                  width="150"
                ></el-table-column>
                <el-table-column prop="medicationCompliance1" align="center" label="占比" width="150"></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="服药完全依从">
                <el-table-column
                  prop="medicationComplianceTotal2"
                  align="center"
                  label="人次"
                  width="150"
                ></el-table-column>
                <el-table-column prop="medicationCompliance2" align="center" label="占比" width="150"></el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>
              <b>症状</b>
            </span>
            <span style="margin-left: 100px">模版类型</span>
            <el-select v-model="filters.templateType1" placeholder="请选择模版" @change="getSymptomList">
              <el-option :value="0" label="通用"></el-option>
              <el-option :value="1" label="产后"></el-option>
              <el-option :value="2" label="肝病"></el-option>
              <el-option :value="3" label="类风湿"></el-option>
              <el-option :value="4" label="慢阻肺"></el-option>
              <el-option :value="5" label="脑卒中"></el-option>
              <el-option :value="6" label="内分泌"></el-option>
              <el-option :value="7" label="痛风"></el-option>
              <el-option :value="8" label="消化道出血"></el-option>
              <el-option :value="9" label="心内科疾病"></el-option>
              <el-option :value="10" label="肿瘤"></el-option>
            </el-select>
            <el-button @click="exportSymptom">导出</el-button>
            <el-date-picker
              v-model="symptomDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:100%;margin-top:10px;"
              value-format="yyyy-MM-dd"
              @change="symptomSelectDate"
            ></el-date-picker>
          </div>
          <el-table
            :data="symptomData"
            :border="true"
            stripe
            highlight-current-row
            height="460"
            style="width: 100%;"
          >
            <el-table-column prop="label" align="center" label="症状名称"></el-table-column>
            <el-table-column prop="symptomTotal" align="center" label="人次"></el-table-column>
            <el-table-column prop="proportion" align="center" label="占比"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>
              <b>并发症</b>
            </span>
            <span style="margin-left: 100px">模版类型</span>
            <el-select
              v-model="filters.templateType2"
              placeholder="请选择模版"
              @change="getComplicationList"
            >
              <el-option :value="0" label="通用"></el-option>
              <el-option :value="1" label="产后"></el-option>
              <el-option :value="2" label="肝病"></el-option>
              <el-option :value="3" label="类风湿"></el-option>
              <el-option :value="4" label="慢阻肺"></el-option>
              <el-option :value="5" label="脑卒中"></el-option>
              <el-option :value="6" label="内分泌"></el-option>
              <el-option :value="7" label="痛风"></el-option>
              <el-option :value="8" label="消化道出血"></el-option>
              <el-option :value="9" label="心内科疾病"></el-option>
              <el-option :value="10" label="肿瘤"></el-option>
            </el-select>
            <el-button @click="exportComplication" type="primary">导出</el-button>
            <el-date-picker
              v-model="complicationDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:100%;margin-top:10px;"
              value-format="yyyy-MM-dd"
              @change="complicationSelectDate"
            ></el-date-picker>
          </div>
          <el-table
            :data="complicationData"
            :border="true"
            stripe
            highlight-current-row
            height="460"
            style="width: 100%;"
          >
            <el-table-column prop="label" align="center" label="症状名称"></el-table-column>
            <el-table-column prop="complicationTotal" align="center" label="人次"></el-table-column>
            <el-table-column prop="proportion" align="center" label="占比"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { constants } from "fs";
export default {
  data() {
    this.chartSettings = {
      radius: 120,
      offsetY: 200
    };
    this.administrationSettings = {
      radius: 120,
      offsetY: 200
    };
    return {
      filters: {
        templateType1: 0,
        templateType2: 0
      },
      leaveHospitalData: {
        columns: ["name", "value"],
        rows: []
      },
      administrationData: {
        columns: ["name", "value"],
        rows: []
      },
      reminderRevisit: {
        columns: ["name", "value"],
        rows: []
      },
      appointmentRevisit: {
        columns: ["name", "value"],
        rows: []
      },
      tableData: [],
      listLoading: false,
      symptomData: [],
      complicationData: [],
      leaveHospitalTable: [], //出院/转出归属情况表格
      administrationTable: [], //管理效果评估表格
      reminderRevisitTable: [], //复诊提醒率表格
      appointmentRevisitTable: [], //复诊预约率表格
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: true,
      btnText1: "切换表格",
      leaveHospitalDate: this.getDate(), //出院/转出归属情况时间
      administrationDate: this.getDate(), //管理效果评估时间
      reminderRevisitDate: this.getDate(), //复诊提醒率时间
      appointmentRevisitDate: this.getDate(), //复诊预约时间
      ComplianceDate: this.getDate(), //管理效果依从性统计分析时间
      symptomDate: this.getDate(), //症状时间
      complicationDate: this.getDate() //并发症时间
    };
  },
  methods: {
    //出院转出归属情况选择时间
    leaveHospitalSelectDate(event) {
      this.leaveHospitalDate = event;
      this.getleaveHospitalData();
    },
    //管理效果评估时间
    administrationSelectDate(event) {
      this.administrationDate = event;
      this.getadministrationData();
    },
    //复诊提醒时间
    reminderRevisitSelectDate(event) {
      this.reminderRevisitDate = event;
      this.getreminderRevisitData();
    },
    //复诊预约时间
    appointmentRevisitSelectDate(event) {
      this.appointmentRevisitDate = event;
      this.getappointmentRevisitData();
    },
    //获取出院转出归属情况数据
    getleaveHospitalData() {
      this.$http(
        "/api" +
          "/analysis/manager/1/discharge?startTime=" +
          this.leaveHospitalDate[0] +
          "&endTime=" +
          this.leaveHospitalDate[1]+
          "&userId=" +
          this.$store.state.user.user.id
      )
        .then(res => {
          this.leaveHospitalTable = res.data; //出院/转出归属情况表格赋值
          this.leaveHospitalData.rows = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取管理效果评估数据
    getadministrationData() {
      this.$http(
        "/api" +
          "/analysis/manager/1/assessment?startTime=" +
          this.administrationDate[0] +
          "&endTime=" +
          this.administrationDate[1]+
          "&userId=" +
          this.$store.state.user.user.id
      )
        .then(res => {
          if (res.data != null) {
            [res.data[0], res.data[1]] = [res.data[1], res.data[0]];
            this.administrationTable = res.data; //管理效果评估表格赋值
            this.administrationData.rows = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取复诊提醒数据
    getreminderRevisitData() {
      this.$http(
        "/api" +
          "/analysis/manager/1/reminderRevisit?startTime=" +
          this.reminderRevisitDate[0] +
          "&endTime=" +
          this.reminderRevisitDate[1]+
          "&userId=" +
          this.$store.state.user.user.id
      )
        .then(res => {
          this.reminderRevisitTable = res.data; //复诊提醒率表格赋值
          this.reminderRevisit.rows = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取复诊预约数据
    getappointmentRevisitData() {
      this.$http(
        "/api" +
          "/analysis/manager/1/appointmentRevisit?startTime=" +
          this.appointmentRevisitDate[0] +
          "&endTime=" +
          this.appointmentRevisitDate[1]+
          "&userId=" +
          this.$store.state.user.user.id
      )
        .then(res => {
          this.appointmentRevisitTable = res.data; //复诊预约率表格赋值
          this.appointmentRevisit.rows = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取症状列表数据
    getSymptomList() {
      this.$http(
        "/api" +
          `/analysis/symptom?templateType=${this.filters.templateType1}&startTime=` +
          this.symptomDate[0] +
          "&endTime=" +
          this.symptomDate[1]+
          "&userId=" +
          this.$store.state.user.user.id
      )
        .then(res => {
          this.symptomData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取并发症列表数据
    getComplicationList() {
      this.$http(
        "/api" +
          `/analysis/complication?templateType=${this.filters.templateType2}&startTime=` +
          this.complicationDate[0] +
          "&endTime=" +
          this.complicationDate[1]+
          "&userId=" +
          this.$store.state.user.user.id
      )
        .then(res => {
          this.complicationData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //切换表格，图表
    cutTable(btnText, index) {
      this["flag" + index] = !this["flag" + index];
      this["btnText" + index] = this["flag" + index] ? "切换表格" : "切换图表";
    },
    //管理效果依从性选择时间
    ComplianceSelectDate(event) {
      this.ComplianceDate = event;
      //获取管理效果依从性列表
      this.$http(
        "/api" +
          "/analysis/manager/3?startTime=" +
          this.ComplianceDate[0] +
          "&endTime=" +
          this.ComplianceDate[1]+
          "&userId=" +
          this.$store.state.user.user.id
      )
        .then(res => {
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出管理效果依从性类统计分析表格
    exportCompliance() {
      this.$http({
        url:
          "/api" +
          "/excel/exportCompliance?startTime=" +
          this.ComplianceDate[0] +
          "&endTime=" +
          this.ComplianceDate[1]+
          "&userId=" +
          this.$store.state.user.user.id,
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "管理效果依从性类统计分析");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //症状选择时间
    symptomSelectDate(event){
      this.symptomDate=event;
      this.getSymptomList();
    },
    //导出症状统计分析表格
    exportSymptom() {
      this.$http({
        url:
          "/api" +
          "/excel/exportSymptom?templateType=" +
          this.filters.templateType1 +
          "&startTime=" +
          this.symptomDate[0] +
          "&endTime=" +
          this.symptomDate[1]+
          "&userId=" +
          this.$store.state.user.user.id,
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "症状统计分析");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //并发症选择时间
    complicationSelectDate(event){
      this.complicationDate=event;
      this.getComplicationList();
    },
    //导出并发症统计分析表格
    exportComplication() {
      this.$http({
        url:
          "/api" +
          "/excel/exportComplication?templateType=" +
          this.filters.templateType1 +
          "&startTime=" +
          this.complicationDate[0] +
          "&endTime=" +
          this.complicationDate[1]+
          "&userId=" +
          this.$store.state.user.user.id,
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "并发症统计分析");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出出院/转出归属情况表格
    leaveHospitalExport() {
      this.$http({
        url:
          "/api" +
          "/analysis/manager/1/discharge?startTime=" +
          this.leaveHospitalDate[0] +
          "&endTime=" +
          this.leaveHospitalDate[1]+
          "&userId=" +
          this.$store.state.user.user.id,
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "出院/转出归属情况");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出管理效果评估表格
    administrationExport() {
      this.$http({
        url:
          "/api" +
          "/analysis/manager/1/assessment?startTime=" +
          this.administrationDate[0] +
          "&endTime=" +
          this.administrationDate[1]+
          "&userId=" +
          this.$store.state.user.user.id,
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "管理效果评估");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出复诊提醒情况表格
    reminderRevisitExport() {
      this.$http({
        url:
          "/api" +
          "/analysis/manager/1/reminderRevisit?startTime=" +
          this.reminderRevisitDate[0] +
          "&endTime=" +
          this.reminderRevisitDate[1]+
          "&userId=" +
          this.$store.state.user.user.id,
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "复诊提醒情况");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导出复诊预约情况表格
    appointmentRevisitExport() {
      this.$http({
        url:
          "/api" +
          "/analysis/manager/1/appointmentRevisit?startTime=" +
          this.appointmentRevisitDate[0] +
          "&endTime=" +
          this.appointmentRevisitDate[1]+
          "&userId=" +
          this.$store.state.user.user.id,
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "复诊提醒情况");
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
    this.getComplicationList();
    this.getSymptomList();
    this.getleaveHospitalData(); //获取出院转出归属情况数据
    this.getadministrationData(); //获取管理效果评估数据
    this.getreminderRevisitData(); //获取复诊提醒数据
    this.getappointmentRevisitData(); //获取复诊预约数据
    //获取管理效果依从性列表
    this.$http(
      "/api" +
        "/analysis/manager/3?startTime=" +
        this.ComplianceDate[0] +
        "&endTime=" +
        this.ComplianceDate[1]+
          "&userId=" +
          this.$store.state.user.user.id
    )
      .then(res => {
        this.tableData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
.el-row {
  margin-bottom: 30px;
}
table tr {
  width: 100%;
  height: 50px;
}
table tr td {
  width: 16.666%;
  height: 100%;
  text-align: center;
  line-height: 50px;
}
.el-button {
  background-color: #52d7ac;
  border-radius: 0;
  color: #fff;
  border: 1px solid #52d7ac;
  padding: 10px;
  margin-left: 10px;
  float: right;
  border-radius: 5px;
}
</style>


>>>>>>> 72e295baa15f9744ccc8021f7459c25f9a17f543
