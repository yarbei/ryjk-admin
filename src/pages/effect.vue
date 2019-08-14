<template>
  <div>
    <div slot="header" class="clearfix">
      <h2 style="float:left">效果统计与分析</h2>
      <el-button
        @click="exportSubsequentVisit"
        type="primary"
        style="background-color: #52a3d7; border: 0; font-size: 14px; float:right; margin-top: 12px"
      >
        <i class="el-icon-download" style="margin-right: 5px"></i>导出
      </el-button>
    </div>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>出院/转出归属情况</span>
            <el-button
              type="success"
              style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac;padding: 10px 30px; float: right;"
              @click="cutTable(btnText1, 1)"
              v-text="btnText1"
            ></el-button>
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
            <el-button
              type="success"
              style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac;padding: 10px 30px; float: right;"
              @click="cutTable(btnText1, 2)"
              v-text="btnText1"
            ></el-button>
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
            <el-button
              type="success"
              style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac;padding: 10px 30px; float: right;"
              @click="cutTable(btnText1, 3)"
              v-text="btnText1"
            ></el-button>
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
            <el-button
              type="success"
              style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac;padding: 10px 30px; float: right;"
              @click="cutTable(btnText1, 4)"
              v-text="btnText1"
            ></el-button>
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
            <el-button
              @click="exportCompliance"
              type="primary"
              style="background-color: #52a3d7; border: 0; font-size: 14px; float:right; margin-top: 12px"
            >
              <i class="el-icon-download" style="margin-right: 5px"></i>导出
            </el-button>
            <span></span>
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
            <el-button
              @click="exportSymptom"
              type="primary"
              style="background-color: #52a3d7; border: 0; font-size: 14px; margin-top: 2px;float:right;"
            >
              <i class="el-icon-download" style="margin-right: 5px"></i>导出
            </el-button>
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
            <el-button
              @click="exportComplication"
              type="primary"
              style="background-color: #52a3d7; border: 0; font-size: 14px; margin-top: 2px;float:right;"
            >
              <i class="el-icon-download" style="margin-right: 5px"></i>导出
            </el-button>
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
      offsetY: 200,
      level: [
        ["并发症人次", "相关指标控制不佳人次", "不良生活方式未改善人次"],
        ["控制满意人次", "控制不满意人次"]
      ]
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
      btnText1: "表格",
      btnText2: "表格",
      btnText3: "表格",
      btnText4: "表格"
    };
  },
  methods: {
    //获取症状列表数据
    getSymptomList() {
      this.$http
        .get(
          "/api" +
            `/analysis/symptom?templateType=${this.filters.templateType1}`
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
      this.$http
        .get(
          "/api" +
            `/analysis/complication?templateType=${this.filters.templateType2}`
        )
        .then(res => {
          this.complicationData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    cutTable(btnText, index) {
      this["flag" + index] = !this["flag" + index];
      this["btnText" + index] = this["flag" + index] ? "表格" : "图表";
    },
    //导出管理效果复诊统计与分析表格
    exportSubsequentVisit() {
      this.$http({
        url: "/api" + "/excel/exportSubsequentVisit",
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res, "管理效果复诊统计与分析");
        })
        .catch(err => {
          console.log(err);
        });
    },

    //导出管理效果依从性类统计分析表格
    exportCompliance() {
      this.$http({
        url: "/api" + "/excel/exportCompliance",
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

    //导出症状统计分析表格
    exportSymptom() {
      this.$http({
        url:
          "/api" +
          "/excel/exportSymptom?templateType=" +
          this.filters.templateType1,
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
    //导出并发症统计分析表格
    exportComplication() {
      this.$http({
        url:
          "/api" +
          "/excel/exportComplication?templateType=" +
          this.filters.templateType1,
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
    this.getComplicationList();
    this.getSymptomList();
    //获取饼状图数据
    this.$http
      .get("/api" + "/analysis/manager/1")
      .then(res => {
        this.leaveHospitalTable = res.data.discharge; //出院/转出归属情况表格赋值
        this.administrationTable = res.data.assessment; //管理效果评估表格赋值
        this.reminderRevisitTable = res.data.reminderRevisit; //复诊提醒率表格赋值
        this.appointmentRevisitTable = res.data.appointmentRevisit; //复诊预约率表格赋值
        this.leaveHospitalData.rows = res.data.discharge;
        this.administrationData.rows = res.data.assessment;
        this.administrationData.rows.push({
          name: "控制不满意人次",
          value:
            this.administrationData.rows[0].value +
            this.administrationData.rows[2].value +
            this.administrationData.rows[3].value,
          proportion:(100-(this.administrationData.rows[1]).proportion.replace("%","")).toFixed(2)+'%'
        });
        this.reminderRevisit.rows = res.data.reminderRevisit;
        this.appointmentRevisit.rows = res.data.appointmentRevisit;
      })
      .catch(err => {
        console.log(err);
      });

    //获取管理统计依从性列表
    this.$http
      .get("/api" + "/analysis/manager/3")
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
</style>


