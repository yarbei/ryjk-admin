<template>
  <div class="cr_container">
    <el-tabs class="el_tab" v-model="templateName">
      <el-tab-pane label="通用模板" name="default">
        <default></default>
      </el-tab-pane>
      <el-tab-pane label="产后" name="postpartum">
        <postpartum></postpartum>
      </el-tab-pane>
      <el-tab-pane label="肝病" name="hepatopathy">
        <hepatopathy></hepatopathy>
      </el-tab-pane>
      <el-tab-pane label="类风湿" name="rheumatoid">
        <rheumatoid></rheumatoid>
      </el-tab-pane>
      <el-tab-pane label="慢阻肺" name="copd">
        <copd></copd>
      </el-tab-pane>
      <el-tab-pane label="脑卒中" name="apoplexy">
        <apoplexy></apoplexy>
      </el-tab-pane>
      <el-tab-pane label="内分泌" name="endocrine">
        <endocrine></endocrine>
      </el-tab-pane>
      <el-tab-pane label="痛风" name="gout">
        <gout></gout>
      </el-tab-pane>
      <el-tab-pane label="消化道出血" name="dige">
        <dige></dige>
      </el-tab-pane>
      <el-tab-pane label="心内科疾病" name="heart">
        <heart></heart>
      </el-tab-pane>
      <el-tab-pane label="肿瘤" name="tumour">
        <tumour></tumour>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import Default from "./template/default.vue";
import Postpartum from "./template/postpartum.vue";
import Hepatopathy from "./template/hepatopathy.vue";
import Rheumatoid from "./template/rheumatoid.vue";
import Copd from "./template/copd.vue";
import Apoplexy from "./template/apoplexy.vue";
import Endocrine from "./template/endocrine.vue";
import Gout from "./template/gout.vue";
import Dige from "./template/dige.vue";
import Heart from "./template/heart.vue";
import Tumour from "./template/tumour.vue";

export default {
  components: {
    Default,
    Postpartum,
    Hepatopathy,
    Rheumatoid,
    Copd,
    Apoplexy,
    Endocrine,
    Gout,
    Dige,
    Heart,
    Tumour
  },
  name: "createVisit",
  data() {
    return {
      templateName: "default"
    };
  },
};
</script>

<style type="text/css" scoped>
.el-tabs {
  width: 100%;
  padding: 10px 30px !important;
}

.el_tab >>> .is-active {
  color: #4bd88a !important;
}

.el_tab >>> .el-tabs__item:hover {
  color: #4bd88a !important;
}

.el_tab >>> .el-tabs__active-bar {
  background-color: #4bd88a !important;
}
</style>
