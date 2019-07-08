<template>
  <div>
    <el-table
      :data="diseaseRiskData"
      :border="true"
      stripe
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column prop="department" align="center" label="科室"></el-table-column>
      <el-table-column prop="mengzhen" align="center" label="门诊"></el-table-column>
      <el-table-column prop="zhuyuan" align="center" label="住院"></el-table-column>
      <el-table-column prop="ageGroup" align="center" label="40岁以上占比"></el-table-column>
      <el-table-column prop="ageGroupTatal" align="center" label="40岁以上人次"></el-table-column>
      <el-table-column prop="questionnaireTotal" align="center" label="风险评估总数"></el-table-column>
      <el-table-column prop="total" align="center" label="评估率"></el-table-column>
      <el-table-column prop="lungs" align="center" label="肺部疾病"></el-table-column>
      <el-table-column prop="colorectal" align="center" label="结直肠类疾病"></el-table-column>
      <el-table-column prop="upperGastrointestinalTract" align="center" label="上消化道疾病"></el-table-column>
      <el-table-column prop="cerebralApoplexy" align="center" label="脑卒中疾病"></el-table-column>
      <el-table-column prop="cardiovascular0" align="center" label="心血管疾病"></el-table-column>
      <el-table-column prop="cardiovascular1" align="center" label="心血管疾病"></el-table-column>
      <el-table-column prop="cardiovascularTotal0" align="center" label="心血管疾病"></el-table-column>
      <el-table-column prop="cardiovascularTotal1" align="center" label="心血管疾病低风险人次"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      diseaseRiskData: []
    };
  },
  created() {
    this.$http
      .get("/api" + "/analysis/questionnaire")
      .then(res => {
        this.diseaseRiskData = res.data;
        console.log(this.diseaseRiskData);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

