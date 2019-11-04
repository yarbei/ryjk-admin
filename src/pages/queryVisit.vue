<template>
  <div class="cr_container">
    <el-tabs class="el_tab" v-model="templateName">
      <el-tab-pane label="通用模板" name="default" lazy :disabled="templateType==0?false:true">
        <default></default>
      </el-tab-pane>
      <el-tab-pane label="产后" name="postpartum" lazy :disabled="templateType==1?false:true">
        <postpartum></postpartum>
      </el-tab-pane>
      <el-tab-pane label="肝病" name="hepatopathy" lazy :disabled="templateType==2?false:true">
        <hepatopathy></hepatopathy>
      </el-tab-pane>
      <el-tab-pane label="类风湿" name="rheumatoid" lazy :disabled="templateType==3?false:true">
        <rheumatoid></rheumatoid>
      </el-tab-pane>
      <el-tab-pane label="慢阻肺" name="copd" lazy :disabled="templateType==4?false:true">
        <copd></copd>
      </el-tab-pane>
      <el-tab-pane label="脑卒中" name="apoplexy" lazy :disabled="templateType==5?false:true">
        <apoplexy></apoplexy>
      </el-tab-pane>
      <el-tab-pane label="内分泌" name="endocrine" lazy :disabled="templateType==6?false:true">
        <endocrine></endocrine>
      </el-tab-pane>
      <el-tab-pane label="痛风" name="gout" lazy :disabled="templateType==7?false:true">
        <gout></gout>
      </el-tab-pane>
      <el-tab-pane label="消化道出血" name="dige" lazy :disabled="templateType==8?false:true">
        <dige></dige>
      </el-tab-pane>
      <el-tab-pane label="心内科疾病" name="heart" lazy :disabled="templateType==9?false:true">
        <heart></heart>
      </el-tab-pane>
      <el-tab-pane label="肿瘤" name="tumour" lazy :disabled="templateType==10?false:true">
        <tumour></tumour>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import Default from "./echoDisplay/default.vue";
import Postpartum from "./echoDisplay/postpartum.vue";
import Hepatopathy from "./echoDisplay/hepatopathy.vue";
import Rheumatoid from "./echoDisplay/rheumatoid.vue";
import Copd from "./echoDisplay/copd.vue";
import Apoplexy from "./echoDisplay/apoplexy.vue";
import Endocrine from "./echoDisplay/endocrine.vue";
import Gout from "./echoDisplay/gout.vue";
import Dige from "./echoDisplay/dige.vue";
import Heart from "./echoDisplay/heart.vue";
import Tumour from "./echoDisplay/tumour.vue";

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
  data() {
    return {
      templateName: "default",
      templateType: ""
    };
  },
  created() {
    this.$http
      .get(
        "/api" + "/visitRecord/getVisitRecordById?id=" + this.$route.params.id
      )
      .then(res => {
        this.templateType = res.data.templateType;
        switch (res.data.templateType) {
          case 0:
            this.templateName = "default";
            break;
          case 1:
            this.templateName = "postpartum";
            break;
          case 2:
            this.templateName = "hepatopathy";
            break;
          case 3:
            this.templateName = "rheumatoid";
            break;
          case 4:
            this.templateName = "copd";
            break;
          case 5:
            this.templateName = "apoplexy";
            break;
          case 6:
            this.templateName = "endocrine";
            break;
          case 7:
            this.templateName = "gout";
            break;
          case 8:
            this.templateName = "dige";
            break;
          case 9:
            this.templateName = "heart";
            break;
          case 10:
            this.templateName = "tumour";
            break;
        }
      })
      .catch(err => {
        console.log(err);
      });
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
