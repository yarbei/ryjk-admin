<template>
  <div>
    <el-table
      :data="diseaseRiskData"
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

