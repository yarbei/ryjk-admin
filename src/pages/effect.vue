<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>出院/转出归属情况</span>
          </div>
          <ve-pie :data="leaveHospitalData" :settings="chartSettings"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>管理效果评估</span>
          </div>
          <ve-pie :data="administrationData" :settings="administrationSettings"></ve-pie>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>复诊提醒率</span>
          </div>
          <ve-pie :data="reminderRevisit" :settings="chartSettings"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>复诊预约率</span>
          </div>
          <ve-pie :data="appointmentRevisit" :settings="chartSettings"></ve-pie>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="80">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span></span>
          </div>
          <table border="1" cellspacing="0" bordercolor="#eee" width="100%">
            <tr>
              <td>依从性好人次/占比</td>
              <td>已戒烟人次/占比</td>
              <td>不服药人次/占比</td>
              <td>服药部分依从人次/占比</td>
              <td>服药完全依从人次/占比</td>
              <td>已戒酒人次/占比</td>
            </tr>
            <tr>
              <td>{{tableData.compliance}}</td>
              <td>{{tableData.giveUpSmoking}}</td>
              <td>{{tableData.medicationCompliance0}}</td>
              <td>{{tableData.medicationCompliance1}}</td>
              <td>{{tableData.medicationCompliance2}}</td>
              <td>{{tableData.quitDrinking}}</td>
            </tr>
          </table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>患者有无症状</span>
          </div>
          <el-table
            :data="symptomData"
            :border="true"
            stripe
            highlight-current-row
            height="460"
            style="width: 100%;"
          >
            <el-table-column prop="name" align="center" label="症状名称"></el-table-column>
            <el-table-column prop="value" align="center" label="人次/占比"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>患者有无并发症</span>
          </div>
          <el-table
            :data="complicationData"
            :border="true"
            stripe
            highlight-current-row
            height="460"
            style="width: 100%;"
          >
            <el-table-column prop="name" align="center" label="症状名称"></el-table-column>
            <el-table-column prop="value" align="center" label="人次/占比"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
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
        ["并发症", "相关指标控制不佳", "不良生活方式未改善"],
        ["控制满意", "控制不满意"]
      ]
    };
    return {
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
      symptomData: [],
      complicationData: []
    };
  },
  created() {
    //获取饼状图数据
    this.$http
      .get("/api" + "/analysis/manager/1")
      .then(res => {
        this.leaveHospitalData.rows = res.data.discharge;
        this.administrationData.rows = res.data.assessment;
        this.administrationData.rows.push({
          name: "控制不满意",
          value:
            this.administrationData.rows[1].value +
            this.administrationData.rows[2].value +
            this.administrationData.rows[3].value
        });
        this.reminderRevisit.rows = res.data.reminderRevisit;
        this.reminderRevisit.rows.push({
          name: "未提醒",
          value: 100 - this.reminderRevisit.rows[0].value
        });
        this.appointmentRevisit.rows = res.data.appointmentRevisit;
        this.appointmentRevisit.rows.push({
          name: "未预约",
          value: 100 - this.appointmentRevisit.rows[0].value
        });
      })
      .catch(err => {
        console.log(err);
      });
    //获取列表数据
    this.$http
      .get("/api" + "/analysis/manager/2")
      .then(res => {
        this.symptomData = res.data.symptom;
        this.complicationData = res.data.complication;
      })
      .catch(err => {
        console.log(err);
      });
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


