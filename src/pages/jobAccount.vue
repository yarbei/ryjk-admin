<template>
  <div>
    <h2>出院后疾病管理情况统计</h2>
    <el-row :gutter="30">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>排期</span>
          </div>
          <ve-pie :data="schedulingData"></ve-pie>
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
      schedulingData: {
        columns: ["name", "value"],
        rows: []
      },
      clinicData: {
        columns: ["随访", "随访人次"],
        rows: [
          { name: "排期人次", value: 1393 },
          { name: "排期过期人次", value: 3530 },
          { name:"", value: 2923 },
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

