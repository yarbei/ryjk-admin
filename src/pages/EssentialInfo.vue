<template>
  <el-tabs
    class="el_tab"
    v-model="activeName"
    :stretch="true"
    @tab-click="handleClick"
    style="padding: 30px; background-color: #fff"
  >
    <!--基本信息-->
    <el-tab-pane label="基本信息" name="jbxx">
      <tab-header :personInfo="personInfo"></tab-header>
      <el-form ref="form1" :model="form1" label-width="100px">
        <el-row :gutter="100">
          <el-col :span="8" :offset="4">
            <el-form-item label="姓名">
              <el-input v-model="form1.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号">
              <el-input v-model="form1.idCard" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8" :offset="4">
            <el-form-item label="性别">
              <el-radio-group v-model="form1.sex" disabled>
                <el-input :v-model="form1.sex==1 ? '男' : '女'" disabled></el-input>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="联系人名称">
              <el-input v-model="form1.telName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8" :offset="4">
            <el-form-item label="年龄">
              <el-input-number v-model="form1.age" :min="0" :max="150" disabled></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人电话">
              <el-input v-model="form1.relationPhone" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8" :offset="4">
            <el-form-item label="病人电话">
              <el-input v-model="form1.phone" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人关系">
              <el-input v-model="form1.relation" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8" :offset="4">
            <el-form-item label="责任医生">
              <el-input v-model="form1.doctorName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="疾病管理师">
              <el-input v-model="form1.diseaseManagerName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8" :offset="4">
            <el-form-item label="创建时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form1.createDate"
                style="width: 100%;"
                disabled
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人">
              <el-input v-model="form1.createUser" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-tab-pane>

    <!--出院小结-->
    <el-tab-pane label="出院小结" name="cyxj">
      <tab-header :personInfo="personInfo"></tab-header>
      <el-row v-for="item in cyxjArray" :key="item.id" style="margin: 0 0 20px">
        <el-col :span="16" :offset="4">
          <el-card :body-style="{ padding: '0px' }" class="cyxj_card">
            <iframe :src="item.summaryofdischarge" width="100%" height="400px" frameborder="0"></iframe>
            <!--<img :src="item.summaryofdischarge" class="image">-->
            <div style="padding: 14px;">
              <span>{{item.department}}</span>
              <div class="bottom clearfix">
                <time class="time">{{item.outhospitaldate}}</time>
                <!--<el-button type="text" class="button">操作按钮</el-button>-->
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-tab-pane>

    <!--随访计划-->
    <el-tab-pane label="随访计划" class="sfjh" name="sfjh">
      <tab-header :personInfo="personInfo"></tab-header>
      <el-col>
        <h2 style="margin-bottom: 30px" v-if="!getsfjhStatus">随访计划</h2>
        <el-card class="box-card grtz_box" v-for="item in sfjyArray" :key="item.sfjlId">
          <div slot="header" class="clearfix grtz_title">
            <span>
              {{item.visitDate}}
              <span class="f-right">{{item.status ==1?"已随访":"未随访"}}</span>
            </span>
          </div>
          <div class="text item grtz_content">
            <p>
              <span>随访建议 : {{item.visitRecord.content}}</span>
            </p>
          </div>
        </el-card>
        <el-card class="box-card jhxx_box" v-if="getsfjhStatus">
          <h2 style="text-align: center; color: #999; font-size: 21px; line-height: 60px">暂无数据！</h2>
        </el-card>
      </el-col>
    </el-tab-pane>

    <!--计划管理-->
    <el-tab-pane label="计划管理" name="jhxx">
      <tab-header :personInfo="personInfo"></tab-header>
      <div style="text-align:right;margin:30px 0;">
        <el-button type="primary" @click="jhxxAdd">追加计划</el-button>
      </div>

      <el-card class="box-card jhxx_box" v-for="item in jhglArray" :key="item.id">
        <div slot="header" class="clearfix jhxx_title">
          <span>
            {{item.name}}
            <span
              class="jhxx_titleTime"
              v-show="item.createDate && item.endDate"
            >({{item.createDate}} 至 {{item.endDate}} )</span>
          </span>
          <!--<el-tag type="success">{{item.description}}</el-tag>-->
          <ul class="suggest-list">
            <li v-for="(v,i) in item.item" :key="i">
              <span>{{v.detailType}}:</span>
              <span>{{v.content}}</span>
            </li>
          </ul>
          <el-button
            class="f-right"
            type="primary"
            round
            @click="createVisit"
            :disabled="item.status==1?true:false"
          >去随访</el-button>
        </div>
        <div class="text item">
          <!--<p>{{item.item[0].detailType}}</p>-->
          <!--<p>{{item.item[0].content}}</p>-->
        </div>
        <div class="jhxx_btn">
          <el-row>
            <el-button
              type="primary"
              :disabled="item.status==1?true:false"
              @click="jhxxEdit(item.planId)"
            >修改计划</el-button>
            <el-button
              type="danger"
              :disabled="item.status==1?true:false"
              @click="showjhxxStop(item.planId)"
            >{{item.status == 1?"已终止":"终止计划"}}</el-button>
          </el-row>
        </div>
      </el-card>



      <el-card class="box-card jhxx_box" v-if="getPlanStatus">
        <h2 style="text-align: center; color: #999;">暂无数据！</h2>
      </el-card>
      <el-pagination
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="page.current"
        :page-sizes="page.sizes"
        :page-size="page.size"
        :layout="page.layout"
        :total="page.total"
      ></el-pagination>
    </el-tab-pane>

    <!--随访记录-->
    <el-tab-pane label="随访记录" name="sfjl">
      <tab-header :personInfo="personInfo"></tab-header>
      <el-card class="box-card sfjl_box" v-for="item in sfjlArray" :key="item.sfjlId">
        <div slot="header" class="clearfix sfjl_title">
          <span>
            <span class="sfjlTime">{{item.patient}}</span>
            <span class="sfjlTime">{{item.visitDate}}</span>
            <span class="sfjlTime">{{item.type | type}}</span>
            <span class="sfjlTime">备注 : {{item.remark}}</span>
          </span>
          <el-button class="f-right" type="primary" @click="lookInfo(item.id)" round>查看随访详情</el-button>
        </div>
      </el-card>
      <el-card class="box-card jhxx_box" v-if="getsfjlStatus">
        <h2 style="text-align: center; color: #999; font-size: 21px;">暂无数据！</h2>
      </el-card>
    </el-tab-pane>

    <!--个人体征-->
    <el-tab-pane label="个人体征" name="grtz">
      <tab-header :personInfo="personInfo"></tab-header>

      <el-card class="box-card grtz_box" v-for="item in grtzArray" :key="item.bodySignTypeId">
        <div slot="header" class="clearfix grtz_title">
          <span>
            {{item.bodySignType}}
            <span
              class="grtz_titleTime"
              v-if="!(item.createTime == null)"
            >({{item.createTime}})</span>
          </span>
          <p>
            <span>初始{{item.bodySignType}}记录 : {{item.oldValue.value}}</span>
            <span>最新{{item.bodySignType}}记录 : {{item.value}}</span>
            <span class="f-right">{{item.sureUpdate == 0?"未更新":"已更新"}}</span>
          </p>
        </div>
        <div class="text item grtz_content" :id="'grtz_chart'+item.bodySignTypeId"></div>
      </el-card>

      <el-card class="box-card jhxx_box" v-if="getSignStatus">
        <h2 style="text-align: center; color: #999;">暂无数据！</h2>
      </el-card>
    </el-tab-pane>

    <!--终止计划弹窗-->
    <el-dialog title="提示" :visible.sync="jhxxStopdialog" width="30%">
      <span>是否终止计划</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="jhxxStopdialog = false">取 消</el-button>
        <el-button type="primary" @click="stopjhxx">确 定</el-button>
      </span>
    </el-dialog>
  </el-tabs>
</template>

<script>
import { pagination } from "@/mixins";
import ElCol from "element-ui/packages/col/src/col";
import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
import tabHeader from "../components/tabHeader";
import ElContainer from "../../node_modules/element-ui/packages/container/src/main.vue";
import ElRow from "element-ui/packages/row/src/row";
import Vue from "vue";
Vue.filter("type", function(value) {
  switch (value) {
    case 1:
      return "电话随访";
      break;
    case 2:
      return "在线随访";
      break;
    case 3:
      return "短信随访 ";
      break;
    case 4:
      return "电话随访";
      break;
    default:
      return "未知随访";
  }
});

var option = {
  backgroundColor: "#FFF",
  grid: {
    top: "9%",
    bottom: "19%",
    left: "6%",
    right: "4%"
  },
  tooltip: {
    trigger: "axis",
    label: {
      show: true
    }
  },
  xAxis: {
    boundaryGap: true, // 默认，坐标轴留白策略
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false,
      alignWithLabel: true
    },
    data: [
      "武汉",
      "襄阳",
      "黄冈",
      "荆门",
      "十堰",
      "随州",
      "鄂州",
      "恩施",
      "宜昌",
      "孝感",
      "咸宁",
      "仙桃",
      "潜江",
      "天门",
      "黄石",
      "荆州",
      "神农架"
    ]
  },
  yAxis: {
    axisLine: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        color: "rgba(33,148,246,0.2)"
      }
    },
    axisTick: {
      show: false
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: "rgb(245,250,254)"
      }
    }
  },
  series: [
    {
      type: "line",
      symbol: "circle",
      symbolSize: 7,
      lineStyle: {
        color: "rgb(33,148,246)",
        shadowBlur: 12,
        shadowColor: "rgb(33,148,246,0.9)",
        shadowOffsetX: 1,
        shadowOffsetY: 1
      },
      itemStyle: {
        color: "rgb(33,148,246)",
        borderWidth: 1,
        borderColor: "#FFF"
      },

      data: [
        2000,
        1800,
        2800,
        900,
        1600,
        2000,
        3000,
        2030,
        1356,
        1900,
        4000,
        3000,
        2000,
        3000,
        4200,
        3200,
        3800
      ]
    }
  ]
};

export default {
  mixins: [pagination],
  components: {
    ElRow,
    ElContainer,
    ElButton,
    ElCol,
    tabHeader
  },
  name: "EssentialInfo",
  data() {
    return {
      personInfoId: "",
      personInfo: {},
      jhxxStopdialog: false,
      activeName: "jbxx",
      form1: {
        name: "",
        sex: -1,
        age: 0,
        idCard: "",
        groupId: "",
        remark: "",
        phone: "",
        q1: ""
      },
      myddcForm: {
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        q5: "",
        q6: ""
      },
      currentDate: "2018/06/07",
      cyxjArray: [],
      sfjyArray: [],
      jhxxArray: [],
      jhglArray: [],
      sfjlArray: [],
      grtzArray: [],
      cyxjImgSrc:
        "http://www.tianya999.com/uploads/allimg/190423/2313-1Z423140328.gif",
      getPlanStatus: false,
      getSignStatus: false,
      getsfjhStatus: false,
      getsfjlStatus: false,
      planId: null
    };
  },
  created() {
    this.personInfoId = this.$route.params.id;
    this.getUsers();
    this.getVisitRecord();
    this.getSummary();
    this.getSign();
    this.getPlan();
    this.getHealthPlan(this.page.current, this.page.size);
  },
  mounted() {
    if (this.$route.params.selectId == "sfjl") {
      this.activeName = "sfjl";
    }
    if (this.$route.params.selectId == "jhxx") {
      this.activeName = "jhxx";
    }
  },
  methods: {
    handleSearch() {
      this.getHealthPlan(1, this.page.size);
    },
    // 分页
    handlePageCurrentChange(val) {
      this.page.current = val;
      this.getHealthPlan(this.page.current, this.page.size);
    },
    // 追加计划
    jhxxAdd() {
      this.$router.push("/createPlan");
    },
    // 修改计划
    jhxxEdit(id) {
      this.$router.push({
        path: "/createPlan",
        query: {
          planId: id
        }
      });
    },
    showjhxxStop(id) {
      this.jhxxStopdialog = true;
      this.planId = id;
    },
    // 终止随访计划弹窗
    stopjhxx(event) {
      this.$http
        .post("/api" + `/plan/updatePlanStatus`, { planId: this.planId })
        .then(res => {
          if (res.data) {
            this.$message.success("终止计划成功");
            this.jhxxStopdialog = false;
            this.getHealthPlan(this.page.current, this.page.size);
          } else {
            this.$message.error("终止计划失败");
            this.jhxxStopdialog = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 终止随访计划
    jhxxStop(id) {
      this.$http
        .post("/api" + `/plan/updatePlanStatus?`, { planId: id })
        .then(res => {
          if (res.data) {
            this.$message.success("随访计划终止成功");
            this.getPlan();
          } else {
            this.$message.error("随访计划终止失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 获取患者基本信息
    getUsers() {
      this.personInfo = JSON.parse(sessionStorage.getItem("personInfo"));
      this.$http
        .get(
          "/api" +
            `/patient/getPatientInfoByUserId?userId=${this.personInfo.id}`
        )
        .then(res => {
          this.form1 = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取随访记录列表
    getVisitRecord() {
      console.log(this.$store.state);
      this.$http
        .get(
          "/api" +
            `/visitRecord/getVisitRecordListByVisitAuthor?patientId=${
              this.personInfo.id
            }&visitAuthorId=${
              this.$store.state.user.user.id
            }&pageNum=${1}&pageSize=${5}`
        )
        .then(res => {
          if (res.data.list.length == 0) {
            this.getsfjlStatus = true;
          } else {
            this.getsfjlStatus = false;
            this.sfjlArray = res.data.list;
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取出院小结
    getSummary() {
      this.$http
        .get(
          "/api" +
            `/patient/getSummaryList?userId=${
              this.personInfo.id
            }&pageNum=${1}&pageSize=${100}`
        )
        .then(res => {
          this.cyxjArray = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取个人体征列表数据
    getSign() {
      this.$http
        .get(
          "/api" +
            `/bodySignRecord/getBodySignListByPatientId?patientId=${this.personInfo.id}`
        )
        .then(res => {
          console.log(res);
          if (res.data.length === 0) {
            this.getSignStatus = true;
          } else {
            this.grtzArray = res.data;
            this.getSignStatus = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取个人体征图表数据
    getSignEchart() {
      this.$http
        .get(
          "/api" +
            `/bodySignRecord/getBackBodySignRecordByTime?patientId=${this.personInfo.id}&bodySignTypeId=${this}`
        )
        .then(res => {
          console.log(res);
          if (res.data.length == 0) {
            this.getSignStatus = true;
          } else {
            this.grtzArray = res.data;
            this.getSignStatus = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查看随访详情
    lookInfo(id) {
      this.$router.replace({
        name: "queryVisit",
        params: { routerForm: "EssentialInfo", id: id }
      });
    },
    // 获取随访计划(随访建议)
    getPlan() {
      this.$http
        .get(
          "/api" +
            `/visitRecord/getVisitRecordListByUserIdAndPatientId?userId=${
              this.$store.state.user.user.id
            }&patientId=${this.personInfo.id}&pageNum=${1}&pageSize=${5}`
        )
        .then(res => {
          if (res.data.list.length === 0) {
            this.getsfjhStatus = true;
          } else {
            this.getsfjhStatus = false;
            this.sfjyArray = res.data.list;
          }
          console.log(res.data, "随访计划");
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取健康计划列表
    getHealthPlan(page, pageSize) {
      this.$http
        .get(
          "/api" +
            `/plan/getPlanByPatientId?patientId=${this.personInfo.id}&pageNum=${page}&pageSize=${pageSize}`
        )
        .then(res => {
          if (res.data.list.length === 0) {
            this.getPlanStatus = true;
            this.page.total = 0;
          } else {
            this.jhglArray = res.data.list;
            this.page.total = res.data.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 去随访
    createVisit() {
      this.$router.push("/createVisit");
    }
  }
};
</script>

<style type="text/css" scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.cyxj_card img {
}

.sfjh h2 {
  text-align: center;
  font-size: 28px;
  margin: 0;
  padding: 0;
  line-height: 28px;
}

.sfjh p {
  font-size: 16px;
  line-height: 30px;
}

.sfjl_box {
  box-shadow: none;
}

.sfjl_title {
  line-height: 40px;
  font-size: 16px;
}

.sfjl_box >>> .el-card__body {
  display: none;
}

.sfjlTime {
  margin: 0 20px;
}

.sfjl_btn {
  text-align: center;
  margin: 30px 0 0;
}

.jhxx_box {
  margin-bottom: 15px;
}

.jhxx_title {
  line-height: 40px;
  font-size: 22px;
}

.jhxx_titleTime {
  font-size: 16px;
  margin: 0 10px;
}

.jhxx_btn {
  text-align: right;
}

.grtz_box {
  margin-bottom: 15px;
}

.grtz_title {
  line-height: 40px;
  font-size: 20px;
}

.grtz_title p {
  font-size: 18px;
  display: inline;
  margin-left: 50px;
}

.grtz_title p span {
  margin-left: 100px;
}

.grtz_titleTime {
  font-size: 16px;
  margin: 0 10px;
}
.grtz_content p span {
  margin-right: 150px;
}

.grtz_content p span:last-child {
  margin-right: 15px;
}

.grtz_echarts {
  width: 100%;
  height: 400px;
  background-color: #2db7f5;
  position: relative;
}

.el-tabs {
  width: 100%;
  padding: 10px 30px !important;
  /*margin: 20px auto;*/
}

.el_tab > .is-active {
  color: #4bd88a !important;
}

.el_tab > .el-tabs__item:hover {
  color: #4bd88a !important;
}

.el_tab > .el-tabs__active-bar {
  background-color: #4bd88a !important;
}

.suggest-list {
  font-size: 14px;
}
</style>
