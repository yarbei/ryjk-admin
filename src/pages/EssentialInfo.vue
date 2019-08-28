<template>
  <el-tabs
    class="el_tab"
    v-model="activeName"
    :stretch="true"
    style="padding: 30px; background-color: #fff"
    @tab-click="handleClick"
  >
    <!--基本信息-->
    <el-tab-pane label="基本信息" name="jbxx" lazy>
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
                <el-radio :label="1" disabled>男</el-radio>
                <el-radio :label="2" disabled>女</el-radio>
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
    <!-- <el-tab-pane label="出院小结" name="cyxj" lazy>
      <tab-header :personInfo="personInfo"></tab-header>
      <el-row v-for="item in cyxjArray" :key="item.id" style="margin: 0 0 20px">
        <el-col :span="16" :offset="4">
          <el-card :body-style="{ padding: '0px' }" class="cyxj_card">
            <iframe :src="item.summaryofdischarge" width="100%" height="400px" frameborder="0"></iframe>
            <div style="padding: 14px;">
              <span>{{item.department}}</span>
              <div class="bottom clearfix">
                <time class="time">{{item.outhospitaldate}}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-tab-pane>-->

    <!--随访计划-->
    <!-- <el-tab-pane label="随访计划" class="sfjh" name="sfjh">
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
    </el-tab-pane>-->

    <!--计划管理-->
    <el-tab-pane label="计划管理" name="jhxx" lazy>
      <tab-header :personInfo="personInfo"></tab-header>
      <el-card class="box-card jhxx_box" v-for="item in jhglList" :key="item.id">
        <div slot="header" class="clearfix jhxx_title">
          <span>
            {{item.name}}
            <span
              class="jhxx_titleTime"
              v-show="item.createDate && item.endDate"
            >{{item.createDate}}</span>
            <span class="jhxx_titleTime" v-show="item.status==1?true:false"></span>
            <span
              class="tb_titleTag el-tag el-tag--success el-tag--mini el-tag--light"
            >{{item.patientType == 0 ? '门诊患者' : '出院患者'}}</span>
          </span>

          <!--<el-tag type="success">{{item.description}}</el-tag>-->
        </div>
        <div class="jhxx_btn">
          <el-row>
            <el-button type="primary" @click="jhxxAdd">追加计划</el-button>
            <el-button
              type="primary"
              :disabled="item.status==1?true:false"
              @click="jhxxEdit(item.planId)"
            >修改计划</el-button>
            <el-button
              type="danger"
              :disabled="item.status==1?true:false"
              @click="showjhxxStop(item.planId)"
            >{{item.status == 1?"已&nbsp;&nbsp;终&nbsp;&nbsp;止":"终止计划"}}</el-button>
            <el-button
              class="f-right"
              type="primary"
              @click="createVisit(item.planId,item.patientType)"
              :disabled="item.status==1?true:false"
            >去随访</el-button>
          </el-row>
        </div>
      </el-card>

      <el-card class="box-card jhxx_box" v-if="getPlanStatus">
        <h2 style="text-align: center; color: #999;">暂无数据！</h2>
        <div class="jhxx_btn">
          <el-row>
            <el-button class="f-right" type="primary" @click="jhxxAdd">追加计划</el-button>
          </el-row>
        </div>
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
    <el-tab-pane label="随访记录" name="sfjl" lazy>
      <tab-header :personInfo="personInfo"></tab-header>
      <el-card class="box-card sfjl_box" v-for="item in sfjlArray" :key="item.sfjlId">
        <div slot="header" class="clearfix sfjl_title">
          <span>
            <span class="sfjlTime">{{item.patient}}</span>
            <span class="sfjlTime">{{item.visitDate}}</span>
            <span class="sfjlTime">{{item.type | type}}</span>
            <span class="sfjlTime">备注 : {{item.remark == '' ? '无' : item.remark}}</span>
          </span>
          <el-button class="f-right" type="primary" @click="lookInfo(item.id)" round>查看随访详情</el-button>
        </div>
      </el-card>
      <el-card class="box-card jhxx_box" v-if="getsfjlStatus">
        <h2 style="text-align: center; color: #999; font-size: 21px;">暂无数据！</h2>
      </el-card>
    </el-tab-pane>

    <!--个人体征-->
    <el-tab-pane label="个人体征" name="grtz" lazy>
      <tab-header :personInfo="personInfo"></tab-header>
      <h1>请选择开始和结束日期进行查看</h1>
      <el-date-picker
        v-model="date"
        type="daterange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="selectDate"
      ></el-date-picker>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card grtz_box">
            <div slot="header" class="clearfix grtz_title">
              <p>
                <span>最新{{grtzArray[0].bodySignType}}记录 : {{grtzArray[0].value}}</span>
                <span
                  class="f-right"
                >{{grtzArray[0].sureUpdate == 0?"未更新":"更新时间："+grtzArray[0].createTime}}</span>
              </p>
            </div>
            <div class="text item grtz_content" :id="'grtz_chart'+grtzArray[0].bodySignTypeId">
              <ve-line :data="xueya" :extend="extend" :settings="xueyaSettings"></ve-line>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card grtz_box">
            <div slot="header" class="clearfix grtz_title">
              <p>
                <span>最新{{grtzArray[1].bodySignType}}记录 : {{grtzArray[1].value}}</span>
                <span
                  class="f-right"
                >{{grtzArray[1].sureUpdate == 0?"未更新":"更新时间："+grtzArray[1].createTime}}</span>
              </p>
            </div>
            <div class="text item grtz_content" :id="'grtz_chart'+grtzArray[1].bodySignTypeId">
              <ve-line :data="xuetang" :extend="extend" :settings="xuetangSettings"></ve-line>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card grtz_box">
            <div slot="header" class="clearfix grtz_title">
              <p>
                <span>最新{{grtzArray[2].bodySignType}}记录 : {{grtzArray[2].value}}</span>
                <span
                  class="f-right"
                >{{grtzArray[2].sureUpdate == 0?"未更新":"更新时间："+grtzArray[2].createTime}}</span>
              </p>
            </div>
            <div class="text item grtz_content" :id="'grtz_chart'+grtzArray[2].bodySignTypeId">
              <ve-line :data="shuimian" :extend="extend" :settings="shuimianSettings"></ve-line>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card grtz_box">
            <div slot="header" class="clearfix grtz_title">
              <p>
                <span>最新{{grtzArray[3].bodySignType}}记录 : {{grtzArray[3].value}}</span>
                <span
                  class="f-right"
                >{{grtzArray[3].sureUpdate == 0?"未更新":"更新时间："+grtzArray[3].createTime}}</span>
              </p>
            </div>
            <div class="text item grtz_content" :id="'grtz_chart'+grtzArray[3].bodySignTypeId">
              <ve-line :data="xinlv" :extend="extend" :settings="xinlvSettings"></ve-line>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card grtz_box">
            <div slot="header" class="clearfix grtz_title">
              <p>
                <span>最新{{grtzArray[4].bodySignType}}记录 : {{grtzArray[4].value}}</span>
                <span
                  class="f-right"
                >{{grtzArray[4].sureUpdate == 0?"未更新":"更新时间："+grtzArray[4].createTime}}</span>
              </p>
            </div>
            <div class="text item grtz_content" :id="'grtz_chart'+grtzArray[4].bodySignTypeId">
              <ve-line :data="tiwen" :extend="extend" :settings="tiwenSettings"></ve-line>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card grtz_box">
            <div slot="header" class="clearfix grtz_title">
              <p>
                <span>最新{{grtzArray[5].bodySignType}}记录 : {{grtzArray[0].value}}</span>
                <span
                  class="f-right"
                >{{grtzArray[5].sureUpdate == 0?"未更新":"更新时间："+grtzArray[5].createTime}}</span>
              </p>
            </div>
            <div class="text item grtz_content" :id="'grtz_chart'+grtzArray[5].bodySignTypeId">
              <ve-line :data="tizhong" :extend="extend" :settings="tizhongSettings"></ve-line>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card grtz_box">
            <div slot="header" class="clearfix grtz_title">
              <p>
                <span>最新{{grtzArray[6].bodySignType}}记录 : {{grtzArray[0].value}}</span>
                <span
                  class="f-right"
                >{{grtzArray[6].sureUpdate == 0?"未更新":"更新时间："+grtzArray[6].createTime}}</span>
              </p>
            </div>
            <div class="text item grtz_content" :id="'grtz_chart'+grtzArray[6].bodySignTypeId">
              <ve-line :data="yaowei" :extend="extend" :settings="yaoweiSettings"></ve-line>
            </div>
          </el-card>
        </el-col>
      </el-row>
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
import { connect } from "net";
import { get } from "http";
import merge from "webpack-merge";
import { constants } from "zlib";

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
    default:
      return "未知随访";
  }
});
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
    this.extend = {
      "xAxis.0.axisLabel.rotate": 45
    };
    this.xueyaSettings = {
      labelMap: {
        count: "高压",
        count2: "低压"
      }
    };
    this.xuetangSettings = {
      labelMap: {
        count: "空腹血糖",
        count2: "餐后2小时血糖"
      }
    };
    this.shuimianSettings = {
      labelMap: {
        count: "睡眠"
      }
    };
    this.xinlvSettings = {
      labelMap: {
        count: "心率"
      }
    };
    this.tiwenSettings = {
      labelMap: {
        count: "体温"
      }
    };
    this.tizhongSettings = {
      labelMap: {
        count: "体重"
      }
    };
    this.yaoweiSettings = {
      labelMap: {
        count: "腰围"
      }
    };
    return {
      //体征数据
      xueya: {
        columns: ["date", "count", "count2"],
        rows: []
      },
      xuetang: {
        columns: ["date", "count", "count2"],
        rows: []
      },
      shuimian: {
        columns: ["date", "count"],
        rows: []
      },
      xinlv: {
        columns: ["date", "count"],
        rows: []
      },
      tiwen: {
        columns: ["date", "count"],
        rows: []
      },
      tizhong: {
        columns: ["date", "count"],
        rows: []
      },
      yaowei: {
        columns: ["date", "count"],
        rows: []
      },
      date: ["2019-07-01T16:00:00.000Z", "2019-08-01T15:59:59.000Z"],
      personInfoId: "",
      personInfo: {},
      jhxxStopdialog: false,
      activeName: "sfjl",
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
      state: 0,
      cyxjArray: [],
      sfjyArray: [],
      jhxxArray: [],
      jhglList: [],
      sfjlArray: [],
      grtzArray: [
        {
          bodySignType: "血压",
          createTime: "2001-01-01",
          value: "0",
          sureUpdate: 0
        },
        {
          bodySignType: "血糖",
          createTime: "2001-01-01",
          value: "0",
          sureUpdate: 0
        },
        {
          bodySignType: "睡眠",
          createTime: "2001-01-01",
          value: "0",
          sureUpdate: 0
        },
        {
          bodySignType: "心率",
          createTime: "2001-01-01",
          value: "0",
          sureUpdate: 0
        },
        {
          bodySignType: "体温",
          createTime: "2001-01-01",
          value: "0",
          sureUpdate: 0
        },
        {
          bodySignType: "体重",
          createTime: "2001-01-01",
          value: "0",
          sureUpdate: 0
        },
        {
          bodySignType: "腰围",
          createTime: "2001-01-01",
          value: "0",
          sureUpdate: 0
        }
      ],
      getPlanStatus: false,
      getSignStatus: false,
      getsfjlStatus: false,
      planId: null,
      bodySignTypeIdArray: []
    };
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.$router.push({
        query: merge(this.$route.query, { name: tab.name })
      });
    },
    //获取随访列表以及随访图表
    selectDate(event) {
      //获取个人体征列表
      this.$http
        .get(
          "/api" +
            `/bodySignRecord/getBodySignListByPatientId?patientId=${
              this.personInfo.id
            }&startTime=${event[0]}&endTime=${event[1]}`
        )
        .then(res => {
          res.data.forEach(item => {
            this.bodySignTypeIdArray.push(item.bodySignTypeId);
          });
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
      // 获取个人体征图表数据
      this.$http
        .get(
          "/api" +
            `/bodySignRecord/getBodySignRecordByTime?openId=${
              this.personInfo.openId
            }&bodySignTypeId=1&beginDate=${event[0]}&endDate=${event[1]}`
        )
        .then(res => {
          this.xueya.rows = [];
          for (let i = 0; i < res.data.date.length; i++) {
            this.xueya.rows.push({
              date: res.data.date[i],
              count: res.data.count[i],
              count2: res.data.count2[i]
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.$http
        .get(
          "/api" +
            `/bodySignRecord/getBodySignRecordByTime?openId=${
              this.personInfo.openId
            }&bodySignTypeId=2&beginDate=${event[0]}&endDate=${event[1]}`
        )
        .then(res => {
          this.xuetang.rows = [];
          for (let i = 0; i < res.data.date.length; i++) {
            this.xuetang.rows.push({
              date: res.data.date[i],
              count: res.data.count[i],
              count2: res.data.count2[i]
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.$http
        .get(
          "/api" +
            `/bodySignRecord/getBodySignRecordByTime?openId=${
              this.personInfo.openId
            }&bodySignTypeId=3&beginDate=${event[0]}&endDate=${event[1]}`
        )
        .then(res => {
          this.shuimian.rows = [];
          for (let i = 0; i < res.data.date.length; i++) {
            this.shuimian.rows.push({
              date: res.data.date[i],
              count: res.data.count[i]
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.$http
        .get(
          "/api" +
            `/bodySignRecord/getBodySignRecordByTime?openId=${
              this.personInfo.openId
            }&bodySignTypeId=4&beginDate=${event[0]}&endDate=${event[1]}`
        )
        .then(res => {
          this.xinlv.rows = [];
          for (let i = 0; i < res.data.date.length; i++) {
            this.xinlv.rows.push({
              date: res.data.date[i],
              count: res.data.count[i]
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.$http
        .get(
          "/api" +
            `/bodySignRecord/getBodySignRecordByTime?openId=${
              this.personInfo.openId
            }&bodySignTypeId=5&beginDate=${event[0]}&endDate=${event[1]}`
        )
        .then(res => {
          this.tiwen.rows = [];
          for (let i = 0; i < res.data.date.length; i++) {
            this.tiwen.rows.push({
              date: res.data.date[i],
              count: res.data.count[i]
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.$http
        .get(
          "/api" +
            `/bodySignRecord/getBodySignRecordByTime?openId=${
              this.personInfo.openId
            }&bodySignTypeId=6&beginDate=${event[0]}&endDate=${event[1]}`
        )
        .then(res => {
          this.tizhong.rows = [];
          for (let i = 0; i < res.data.date.length; i++) {
            this.tizhong.rows.push({
              date: res.data.date[i],
              count: res.data.count[i]
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.$http
        .get(
          "/api" +
            `/bodySignRecord/getBodySignRecordByTime?openId=${
              this.personInfo.openId
            }&bodySignTypeId=7&beginDate=${event[0]}&endDate=${event[1]}`
        )
        .then(res => {
          this.yaowei.rows = [];
          for (let i = 0; i < res.data.date.length; i++) {
            this.yaowei.rows.push({
              date: res.data.date[i],
              count: res.data.count[i]
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
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
    // 终止疾病管理计划弹窗
    stopjhxx(event) {
      this.$http
        .post(
          "/api" + `/plan/updatePlanStatus`,
          { planId: this.planId },
          { status: 0 }
        )
        .then(res => {
          if (res.data) {
            this.jhxxStopdialog = false;
            this.$message.success("终止计划成功");
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
      this.$http
        .get(
          "/api" +
            `/visitRecord/getVisitRecordListByVisitAuthor?patientId=${this.personInfo.id}&visitAuthorId=${this.$store.state.user.user.id}`
        )
        .then(res => {
          if (res.data.list.length == 0) {
            this.getsfjlStatus = true;
          } else {
            this.getsfjlStatus = false;
            this.sfjlArray = res.data.list;
          }
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

    // 查看随访详情
    lookInfo(id) {
      this.$router.replace({
        name: "queryVisit",
        params: { routerForm: "EssentialInfo", id: id }
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
            this.jhglList = res.data.list;
            this.page.total = res.data.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 去随访 传递当前的计划ID和当前患者的类型
    createVisit(planId, patientType) {
      this.$router.push({
        path: "/followupplan",
        query: { planId: planId, patientType: patientType }
      });
    },
    //获取当前日期和三十天前的日期
    getDate() {
      //获取当前日期
      var myDate = new Date();
      var nowY = myDate.getFullYear();
      var nowM = myDate.getMonth() + 1;
      var nowD = myDate.getDate();
      var enddate =
        nowY +
        "-" +
        (nowM < 10 ? "0" + nowM : nowM) +
        "-" +
        (nowD < 10 ? "0" + nowD : nowD); //当前日期
      //获取三十天前日期
      var lw = new Date(myDate - 1000 * 60 * 60 * 24 * 30); //最后一个数字30可改，30天的意思
      var lastY = lw.getFullYear();
      var lastM = lw.getMonth() + 1;
      var lastD = lw.getDate();
      var startdate =
        lastY +
        "-" +
        (lastM < 10 ? "0" + lastM : lastM) +
        "-" +
        (lastD < 10 ? "0" + lastD : lastD); //三十天之前日期
      var date = [];
      date.push(startdate);
      date.push(enddate);
      return date;
    }
  },
  created() {
    this.activeName = this.$route.query.name;
    this.personInfoId = this.$route.params.id;
    this.getUsers();
    this.getVisitRecord();
    this.getSummary();
    this.getHealthPlan(this.page.current, this.page.size);
    this.date = this.getDate();
    this.selectDate(this.date);
  },
  mounted() {
    if (this.$route.params.selectId == "sfjl") {
      this.activeName = "sfjl";
    }
    if (this.$route.params.selectId == "jhxx") {
      this.activeName = "jhxx";
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
.jhxx_patientType {
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

.el_tab >>> .is-active {
  color: #4bd88a !important;
}

.el_tab >>> .el-tabs__item:hover {
  color: #4bd88a !important;
}

.el_tab >>> .el-tabs__active-bar {
  background-color: #4bd88a !important;
}

.suggest-list {
  font-size: 14px;
}
.el-range-editor.el-input__inner {
  text-align: right;
  margin-bottom: 30px;
}
</style>
