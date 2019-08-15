<template>
  <div>
    <div slot="header" class="clearfix">
      <h2 style="float:left">疾病风险筛查统计与分析</h2>
      <el-button
        @click="exportRisk"
        type="primary"
        style="background-color: #52a3d7; border: 0; font-size: 14px; float:right; margin-top: 12px"
      >
        <i class="el-icon-download" style="margin-right: 5px"></i>导出
      </el-button>
    </div>
    <el-table
      :data="diseaseRiskData"
      stripe
      highlight-current-row
      height="460"
      style="width: 100%;"
      class="el-table-cyn"
    >
      <el-table-column prop="department" align="center" label="科室"></el-table-column>
      <el-table-column label="本季度调研数" align="center">
        <el-table-column prop="mengzhen" align="center" label="门诊"></el-table-column>
        <el-table-column prop="zhuyuan" align="center" label="住院"></el-table-column>
        <el-table-column prop="other" align="center" label="其他"></el-table-column>
      </el-table-column>
      <el-table-column label="40岁以上" align="center">
        <el-table-column prop="ageGroupTatal" align="center" label="人次"></el-table-column>
        <el-table-column prop="ageGroup" align="center" label="占比"></el-table-column>
      </el-table-column>
      <el-table-column prop="questionnaireTotal" align="center" label="风险评估总数" width="110px"></el-table-column>
      <el-table-column prop="total" align="center" label="评估率" width="80px"></el-table-column>
      <el-table-column label="评估结果" align="center">
        <el-table-column label="肺部疾病" align="center">
          <el-table-column prop="lungsTotal" align="center" label="高风险"></el-table-column>
          <el-table-column prop="lungs" align="center" label="占比"></el-table-column>
        </el-table-column>
        <el-table-column label="结直肠类疾病" align="center">
          <el-table-column prop="colorectalTotal" align="center" label="高风险"></el-table-column>
          <el-table-column prop="colorectal" align="center" label="占比"></el-table-column>
        </el-table-column>
        <el-table-column label="上消化道疾病" align="center">
          <el-table-column prop="upperGastrointestinalTractTotal" align="center" label="高风险"></el-table-column>
          <el-table-column prop="upperGastrointestinalTract" align="center" label="占比"></el-table-column>
        </el-table-column>
        <el-table-column label="脑卒中" align="center">
          <el-table-column prop="cerebralApoplexyTotal1" align="center" label="高危"></el-table-column>
          <el-table-column prop="cerebralApoplexy1" align="center" label="占比"></el-table-column>
          <el-table-column prop="cerebralApoplexyTotal2" align="center" label="中危"></el-table-column>
          <el-table-column prop="cerebralApoplexy2" align="center" label="占比"></el-table-column>
          <el-table-column prop="cerebralApoplexyTotal3" align="center" label="非常高危"></el-table-column>
          <el-table-column prop="cerebralApoplexy3" align="center" label="占比"></el-table-column>
        </el-table-column>
        <el-table-column label="心血管疾病" align="center">
          <el-table-column prop="cardiovascularTotal1" align="center" label="高危"></el-table-column>
          <el-table-column prop="cardiovascular1" align="center" label="占比"></el-table-column>
          <el-table-column prop="cardiovascularTotal0" align="center" label="中危"></el-table-column>
          <el-table-column prop="cardiovascular0" align="center" label="占比"></el-table-column>
        </el-table-column>
      </el-table-column>
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
  methods: {
    //导出疾病风险筛查统计与分析表格
    exportRisk() {
      this.$http({
        url: "/api" + "/excel/exportRisk",
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 下载文件
    download(data) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "疾病风险筛查统计与分析");

      document.body.appendChild(link);
      link.click();
    }
  },
  created() {
    this.$http
      .get("/api" + "/analysis/questionnaire")
      .then(res => {
        this.diseaseRiskData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>

.el-table-cyn /deep/ table tr th{
  border-bottom:1px solid #d3d3d3 !important;
  border-right:1px solid #d3d3d3 !important;
}
.el-table-cyn /deep/ table tr:nth-child(1) th{
  border-top:1px solid #d3d3d3 !important;
}


</style>

