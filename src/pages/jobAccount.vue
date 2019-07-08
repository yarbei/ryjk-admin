<template>
  <div>
    <h2>出院后疾病管理情况统计</h2>
    <el-row :gutter="30">
      <el-col :span="width">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>随访状态</span>
          </div>
          <ve-pie :data="visitStatus"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="width">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>体征预警</span>
          </div>
          <ve-pie :data="tiZhenYuJing"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="width">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>随访方式</span>
          </div>
          <ve-pie :data="visitType"></ve-pie>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      width:8,
      followUpMode:false,
      visitStatus:{
        columns:["name","value"],
        rows:[]
      },
      visitType: {
        columns: ["name", "value"],
        rows: []
      },
      tiZhenYuJing: {
        columns: ["name", "value"],
        rows: []
      }
    };
  },
  created() {
    this.$http
      .get("/api" + "/analysis/work/3?userRole="+0+"&userId="+this.$store.state.user.user.id)
      .then(res => {
        this.visitStatus.rows=res.data.visitStatus
        this.visitType.rows=res.data.visitType
        this.tiZhenYuJing.rows=[
          {name:'已处理',value:res.data.tiZhenYuJing.status_0},
          {name:'未处理',value:res.data.tiZhenYuJing.status_1}]
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

