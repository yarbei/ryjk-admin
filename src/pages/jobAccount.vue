<template>
  <div>
    <div slot="header" class="clearfix">
      <h2 style="float:left">出院后疾病管理情况统计</h2>
      <el-button
      @click="exportsTable1"
      type="primary"
      style="background-color: #52a3d7; border: 0; font-size: 14px; float:right; margin-top: 12px"
      >
      <i class="el-icon-download" style="margin-right: 5px"></i>导出
      </el-button>
    </div>
    <el-row :gutter="80">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
          </div>
          <el-table
          :data="hospitalData"
          :border="true"
          stripe
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column prop="depName" align="center" label="科室" width="150" ></el-table-column>
          <el-table-column prop="rzzCount" align="center" width="150" label="出院总人次"></el-table-column>
          <el-table-column prop="successCount" align="center" label="抓取成功" width="100"></el-table-column>
          <el-table-column prop="failireCount" align="center" label="失败" width="100" ></el-table-column>
          <el-table-column prop="schedulingCount" align="center" label="排期人次" width="100"></el-table-column>
          <el-table-column prop="overdueCount" align="center" label="排期过期人次" width="100" ></el-table-column>
          <el-table-column prop="firstVisit" align="center" label="首访" width="100"></el-table-column>
          <el-table-column prop="secondVisit" align="center" label="二访" width="120"></el-table-column>
          <el-table-column prop="thirdVisit" align="center" label="三访及以上" width="150"></el-table-column>
          <el-table-column prop="totalVisit" align="center" label="随访总人次" width="150"></el-table-column>
          <el-table-column prop="terminationVisit" align="center" label="终止随访" width="150"></el-table-column>
          <el-table-column prop="validVisitRate" align="center" label="有效随访人次" width="150"></el-table-column>
          <el-table-column prop="notCount" align="center" label="勿访人次" width="150"></el-table-column>
          <el-table-column prop="timelyRate" align="center" label="排期率" width="150"></el-table-column>
          <el-table-column prop="validVisitRate" align="center" label="有效随访率" width="150"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>




    <div slot="header" class="clearfix">
      <h2 style="float:left">随访情况统计</h2>
      <el-button
      @click="exports"
      type="primary"
      style="background-color: #52a3d7; border: 0; font-size: 14px; float:right; margin-top: 12px"
      >
      <i class="el-icon-download" style="margin-right: 5px"></i>导出
      </el-button>
    </div>
    <el-row :gutter="30">

      <el-col :span="width">

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>随访人次</span>

            <el-button
            type="success" 
            style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac;padding: 10px 20px; float: right;"
            @click="cutTable(btnText1, 1)"
            v-text="btnText1"
            ></el-button>
          </div>
          <ve-pie :data="visitStatus" v-show="flag1 == true"></ve-pie>
          <el-table
            :border="true"
            :data="visitStatusTable"
            stripe
            highlight-current-row
            height="400"
            style="width: 100%;"
            v-show="flag1 == false"
          >
          <el-table-column prop="name" align="center" label="随访情况"></el-table-column>
          <el-table-column prop="value" align="center" label="所占人次"></el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="width">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>体征预警</span>
            <el-button
            type="success"
            style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac;padding: 10px 20px; float: right;"
            @click="cutTable(btnText2, 2)"
            v-text="btnText2"
            ></el-button>
          </div>
          <ve-pie :data="tiZhenYuJing" v-show="flag2 == true"></ve-pie>
          <el-table
            :border="true"
            :data="tiZhenYuJingTable"
            stripe
            highlight-current-row
            height="400"
            style="width: 100%;"
            v-show="flag2 == false"
          >
          <el-table-column prop="name" align="center" label="体征预警"></el-table-column>
          <el-table-column prop="value" align="center" label="所占人次"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="width" >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>随访方式</span>
            <el-button
            type="success"
            style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac;padding: 10px 20px; float: right;"
            @click="cutTable(btnText3, 3)"
            v-text="btnText3"
            ></el-button>
          </div>
          <ve-pie :data="visitType" v-show="flag3 == true"></ve-pie>
          <el-table
            :border="true"
            :data="visitTypeTable"
            stripe
            highlight-current-row
            height="400"
            style="width: 100%;"
            v-show="flag3 == false"
          >
          <el-table-column prop="name" align="center" label="随访方式"></el-table-column>
          <el-table-column prop="value" align="center" label="所占人次"></el-table-column>
          </el-table>
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
      },
      visitStatusTable : [],
      visitTypeTable : [],
      tiZhenYuJingTable : [],
      flag1 : true,
      flag2 : true,
      flag3 : true,
      btnText1: '表格',
      btnText2: '表格',
      btnText3: '表格',
      hospitalData:[], //出院后疾病管理情况
    };
  },
  methods: {
    cutTable(btnText, index) {
      this['flag' + index] = !this['flag' + index]
      this['btnText' + index] = this['flag' + index] ? '表格' : '图表'
    },
    hospitalDataList(){
      this.$http
      .get("/api" + "/analysis/work/work/sinknessManager?patientType=1&page=1&rows=100&startTime=1970-01-01&endTime=2099-01-01")
      .then(res => {
        this.hospitalData = res;
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    },
    //导出表格
    exports() {
      this.$http({
        url: "/api" + "/excel/exportWorkList?userRole="+0+"&userId="+this.$store.state.user.user.id,
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
      link.setAttribute("download", "出院后疾病管理情况统计.xlsx");

      document.body.appendChild(link);
      link.click();
    }
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
        this.visitStatusTable = res.data.visitStatus
        this.visitTypeTable = res.data.visitType
        this.tiZhenYuJingTable = [
          {name:'已处理',value:res.data.tiZhenYuJing.status_0},
          {name:'未处理',value:res.data.tiZhenYuJing.status_1}]
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
      this.hospitalDataList();
  }
};
</script>

<style>

</style>
