<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>出院/转出归属情况</span>
          </div>
          <ve-pie :data="leaveHospitalData"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>管理效果评估</span>
          </div>
          <ve-pie :data="administrationData"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>复诊提醒率/复诊预约率</span>
          </div>
          <ve-pie :data="leaveHospitalData"></ve-pie>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      leaveHospitalData: {
        columns: ["name", "value"],
        rows: []
      },
      administrationData: {
        columns: ["name", "value"],
        rows: []
      }
    };
  },
  created(){
      this.$http
      .get("/api" + "/analysis/manager/1")
      .then(res => {
          this.leaveHospitalData.rows=res.data.discharge
            this.administrationData.rows=res.data.assessment

        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

