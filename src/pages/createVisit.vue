<template>
  <div class="cr_container">
    <el-tabs class="el_tab" v-model="templateName" @tab-click="handleClick">
      <el-tab-pane label="通用模板" name="default">
        <default></default>
      </el-tab-pane>
      <el-tab-pane label="产后" name="postpartum">
        <default></default>
      </el-tab-pane>
      <el-tab-pane label="肝病" name="hepatopathy">
        <default></default>
      </el-tab-pane>
      <el-tab-pane label="类风湿" name="rheumatoid">
        <default></default>
      </el-tab-pane>
      <el-tab-pane label="慢阻肺" name="copd">
        <default></default>
      </el-tab-pane>
      <el-tab-pane label="脑卒中" name="apoplexy">
        <default></default>
      </el-tab-pane>
      <el-tab-pane label="内分泌" name="endocrine">
        <default></default>
      </el-tab-pane>
      <el-tab-pane label="痛风" name="gout">
        <default></default>
      </el-tab-pane>
      <el-tab-pane label="消化道出血" name="dige">
        <default></default>
      </el-tab-pane>
      <el-tab-pane label="心内科疾病" name="heart">
        <default></default>
      </el-tab-pane>
      <el-tab-pane label="肿瘤" name="tumour">
        <default></default>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import Default from './template/default.vue'

export default {
  components: {
    Default
  },
  name: 'createVisit',
  data () {
    return {
      templateName: 'default'
    }
  },
  created () {},
  mounted () {},
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style type="text/css" scoped>
.el-tabs{
    width: 100%;
    padding: 10px 30px !important;
    /*margin: 20px auto;*/
  }

  .el_tab>>>.is-active{
    color: #4bd88a !important;
  }

  .el_tab>>>.el-tabs__item:hover{
    color: #4bd88a !important;
  }

  .el_tab>>>.el-tabs__active-bar{
    background-color: #4bd88a !important;
  }
</style>
