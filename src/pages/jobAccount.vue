<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>出院后疾病管理情况统计</span>
          </div>
          <ve-pie :data="leaveHospitalData"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>门诊疾病管理情况统计</span>
          </div>
          <ve-pie :data="clinicData"></ve-pie>
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
        columns: ["随访", "随访人次"],
        rows: [
          { 随访: "首访", 随访人次: 1393 },
          { 随访: "二访", 随访人次: 3530 },
          { 随访: "三坊及以上", 随访人次: 2923 },
          { 随访: "1/4", 随访人次: 1723 },
          { 随访: "1/5", 随访人次: 3792 },
          { 随访: "1/6", 随访人次: 4593 }
        ]
      },
      clinicData: {
        columns: ["随访", "随访人次"],
        rows: [
          { 随访: "首访", 随访人次: 1393 },
          { 随访: "二访", 随访人次: 3530 },
          { 随访: "三坊及以上", 随访人次: 2923 },
          { 随访: "1/4", 随访人次: 1723 },
          { 随访: "1/5", 随访人次: 3792 },
          { 随访: "1/6", 随访人次: 4593 }
        ]
      }
    };
  },
  created() {
    this.$http
      .get("/api" + "/analysis/work/1")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

