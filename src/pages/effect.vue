<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>出院/转出归属情况</span>
          </div>
          <ve-pie :data="leaveHospitalData" :settings="chartSettings"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>管理效果评估</span>
          </div>
          <ve-pie :data="administrationData" :settings="administrationSettings"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>复诊提醒率</span>
          </div>
          <ve-pie :data="reminderRevisit" :settings="chartSettings"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>复诊预约率</span>
          </div>
          <ve-pie :data="appointmentRevisit" :settings="chartSettings"></ve-pie>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用药依从性</span>
          </div>
          <ve-pie :data="leaveHospitalData" :settings="chartSettings"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>戒烟情况</span>
          </div>
          <ve-pie :data="administrationData" :settings="administrationSettings"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>戒酒情况</span>
          </div>
          <ve-pie :data="reminderRevisit" :settings="chartSettings"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>健康知晓率</span>
          </div>
          <ve-pie :data="appointmentRevisit" :settings="chartSettings"></ve-pie>
        </el-card>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      :border="true"
      stripe
      highlight-current-row
      height="460"
      style="width: 100%;"
    >
      <el-table-column prop="department" align="center" label="科室"></el-table-column>
      <el-table-column prop="mengzhen" align="center" label="门诊"></el-table-column>
      <el-table-column prop="zhuyuan" align="center" label="住院"></el-table-column>
      <el-table-column prop="ageGroup" align="center" label="40岁以上人次/占比"></el-table-column>
      <el-table-column prop="questionnaire" align="center" label="风险评估总数/评估率"></el-table-column>
      <el-table-column prop="lungs" align="center" label="肺部疾病人次/占比"></el-table-column>
      <el-table-column prop="colorectal" align="center" label="结直肠类疾病人次/占比"></el-table-column>
      <el-table-column prop="upperGastrointestinalTract" align="center" label="上消化道疾病人次/占比"></el-table-column>
      <el-table-column prop="cerebralApoplexy1" align="center" label="脑卒中疾病高危人次/占比"></el-table-column>
      <el-table-column prop="cerebralApoplexy2" align="center" label="脑卒中疾病中危人次/占比"></el-table-column>
      <el-table-column prop="cerebralApoplexy3" align="center" label="脑卒中疾病非常高危人次/占比"></el-table-column>
      <el-table-column prop="cardiovascular0" align="center" label="心血管疾病低风险人次/占比"></el-table-column>
      <el-table-column prop="cardiovascular1" align="center" label="心血管疾病非常高危人次/占比"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    this.chartSettings = {
      radius: 60,
      offsetY: 200
    };
    this.administrationSettings = {
      radius: 60,
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
      tableData: []
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
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    //获取列表数据
    this.$http
      .get("/api" + "/analysis/manager/2")
      .then(res => {
        console.log(res);
        this.$http
          .get("/api" + "/analysis/manager/3")
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
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
.el-card {
  height: 400px;
}
</style>


