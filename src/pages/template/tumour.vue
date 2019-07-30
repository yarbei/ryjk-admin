<template>
  <div>
    <tab-header :personInfo="personInfo"></tab-header>
    <el-form ref="form" :model="form" label-width="135px" class="createVisit_form">
      <el-card>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="随访状态 : ">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option
                v-for="item in sfstatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="随访结果 : ">
            <el-select v-model="form.result" placeholder="请选择">
              <el-option
                v-for="item in sfresult"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="随访方式 : ">
            <el-select v-model="form.type" placeholder="请选择">
              <el-option
                v-for="item in sftype"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="出院/转出情况:">
            <el-select v-model="form.dischargeStatus" placeholder="请选择">
              <el-option
                v-for="item in sfdischargeStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="本次随访评估:">
            <el-select v-model="form.assessment" placeholder="请选择">
              <el-option
                v-for="item in sfassessment"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card>
      <div slot="header">
        <h2>体征</h2>
      </div>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="体重(kg): ">
            <el-select v-model="form.visitRecordContent.weight" placeholder="请选择">
              <el-option
                v-for="item in sfweight"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="体温(℃)：">
            <el-input-number v-model="form.visitRecordContent.animalheat" :min="0" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="皮肤:">
            <el-select v-model="form.visitRecordContent.skin" placeholder="请选择">
              <el-option
                v-for="item in sftskin"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4" style="font-size:16px;text-align:center;line-height:3em;">血压</el-col>
        <el-col :span="10">
          <el-form-item label="高压(mmHg)">
            <el-input-number v-model="form.visitRecordContent.hypertension" :min="0" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="低压(mmHg)">
            <el-input-number v-model="form.visitRecordContent.hypotension" :min="0" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card>
        <div slot="header">
      <h2>化验数值</h2>
        </div>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="红细胞">
            <el-input v-model="form.visitRecordContent.redbloodcell" placeholder="自定义"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="血红蛋白">
            <el-input v-model="form.visitRecordContent.hemoglobin" placeholder="自定义"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="白细胞">
            <el-input v-model="form.visitRecordContent.whitebloodcell" placeholder="自定义"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="血小板">
            <el-input v-model="form.visitRecordContent.platelet" placeholder="自定义"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card>
      <div slot="header"> 
        <h2>异常指标</h2>
      </div>
      <el-row :gutter="0">
        <el-col :span="8">
          <el-form-item label="有无异常">
            <el-select v-model="form.visitRecordContent.anomalyIndex" placeholder="请选择">
              <el-option
                v-for="item in sfanomalyIndex"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="指标值">
            <el-input-number
              v-model="form.visitRecordContent.anomalyIndexValue"
              :min="0"
              :max="9999"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card>
      <div slot="header">
        <h2>生活自理情况</h2>
      </div>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="自理情况 : ">
            <el-select v-model="form.visitRecordContent.careLift" placeholder="请选择">
              <el-option
                v-for="item in sflife"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card>
        <div slot="header">
      <h2>生活方式</h2>
        </div>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="吸烟量 : ">
            <el-select v-model="form.smokingVolume" @change="smokingVolumeChange" placeholder="请选择">
              <el-option
                v-for="item in sfsmokingVolume"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-show="isSmokingAmount">
          <el-form-item label="支/天">
            <el-input-number v-model="form.visitRecordContent.smokingAmount" :min="0" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="饮酒量 : ">
            <el-select
              v-model="form.alcoholConsumption"
              @change="alcoholConsumptionChange"
              placeholder="请选择"
            >
              <el-option
                v-for="item in sfalcoholConsumption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-show="isAlcoholConsumptionAmount">
          <el-form-item label="ML/天">
            <el-input-number
              v-model="form.visitRecordContent.alcoholConsumptionAmount"
              :min="0"
              :max="9999"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card>
        <div slot="header">
      <h2>睡眠情况</h2>
        </div>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="睡眠情况 : ">
            <el-select v-model="form.visitRecordContent.sleepQuality" placeholder="请选择">
              <el-option
                v-for="item in sfsleep"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="饮食情况 : ">
            <el-select v-model="form.visitRecordContent.tumoureat" placeholder="请选择">
              <el-option
                v-for="item in sftumoureat"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="运动(次/周)">
            <el-input-number
              v-model="form.visitRecordContent.motionNum"
              :min="0"
              :max="9999"
              label="运动(次/周)"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="运动(分钟/次)">
            <el-input-number
              v-model="form.visitRecordContent.otionLength"
              :min="0"
              :max="9999"
              label="运动(次/周)"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="心理状况 : ">
            <el-select v-model="form.visitRecordContent.region" placeholder="请选择">
              <el-option
                v-for="item in sfregion"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>
      <el-card>
      <div slot="header">
        <h2>用药情况</h2>
      </div>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="依从性 : ">
            <el-select v-model="form.medicationCompliance">
              <el-option
                v-for="item in sfmedicationCompliance"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
       <!-- 药物不良反应 -->
      <select-input
        :selectInputData="reactionsData"
        @listenSelect="reactionsSelect"
        @listenInput="reactionsInput"
      ></select-input>
      </el-card>
      <el-card>
      <div slot="header">
        <h2>疼痛控制情况</h2>
      </div>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="疼痛性质 : ">
            <el-select v-model="form.visitRecordContent.painNature">
              <el-option
                v-for="item in sfpainNature"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="疼痛程度  : ">
            <el-select v-model="form.visitRecordContent.painDegree">
              <el-option
                v-for="item in sfpainDegree"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(dosage, index) in  form.visitRecordContent.dosages" :key="index">
        <el-col :span="6">
          <el-form-item label="阵痛药物">
            <el-input v-model="dosage.value"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="次/日">
            <el-input-number v-model="dosage.frequency" :min="0" :max="9999" label="次"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="mg/次">
            <el-input-number v-model="dosage.dose" :min="0" :max="9999" label="mg"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button @click.prevent="removeDosage(dosage)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="疼痛控制情况 : ">
            <el-select v-model="form.visitRecordContent.controlSituation">
              <el-option
                v-for="item in sfcontrolSituation"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card
      >
      <el-card>
        <div slot="header">
      <h2>健康教育知晓</h2>
        </div>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="是否进行健康指导 : ">
            <el-select
              v-model="form.visitRecordContent.healthGuidance"
              @change="healthGuidanceChange"
            >
              <el-option
                v-for="item in sfhealthGuidance"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-show="ishealthGuidanceContent">
          <el-form-item label="健康指导内容  : ">
            <el-select v-model="form.visitRecordContent.healthGuidanceContent">
              <el-option
                v-for="item in sfhealthGuidanceContent"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      </el-card>

      <el-card>
        <div slot="header">
          <h2>随访记录</h2>
        </div>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="已提醒复诊 : ">
            <el-select v-model="form.reminderRevisit">
              <el-option
                v-for="item in sfreminderRevisit"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="已预约复诊 : ">
            <el-select v-model="form.appointmentRevisit" @change="appointmentRevisitChange">
              <el-option
                v-for="item in sfappointmentRevisit"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80" v-show="isAppointmentRevisit">
        <el-col :span="8">
          <el-form-item label="预约科室 : ">
            <el-select v-model="form.department">
              <el-option
                v-for="item in sfdepartment"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="复诊时间 : ">
            <el-date-picker
              v-model="form.revisitTime"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="健康知晓度 : ">
            <el-select v-model="form.healthAwareness">
              <el-option
                v-for="item in sfhealthAwareness"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="满意度调研 : ">
            <el-select v-model="form.satisfactionSurvey">
              <el-option
                v-for="item in sfsatisfactionSurvey"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="随访备注 : ">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
      </el-card>

      <el-form-item style="text-align: center">
        <el-button type="success" @click="onSubmit(10)">完成随访</el-button>
        <el-button @click="cancelBtn">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import template from "./index";
export default {
  components: template.components,
  data: template.data,
  created: template.created,
  methods: template.methods
};
</script>

<style type="text/css" scoped>
.cr_container {
  width: 100%;
  height: auto;
  min-height: 100%;
  /*padding: 30px 50px 80px 50px;*/
  background-color: #fff;
  padding: 0 20px;
}

.createVisit_form .el-select {
  width: 100%;
}

.createVisit_form .el-cascader {
  width: 100%;
}

.cr_title {
  height: 170px;
  /*background-color: #2DB7F5;*/
  border-bottom: 1px solid #999;
  margin-bottom: 30px;
  line-height: 170px;
}

.cr_titleContent {
  height: 170px;
  padding: 20px 30px 0;
}

.cr_titleContent p {
  height: 30px;
  line-height: 30px;
}

.cr_titleImg img {
  width: 100%;
  vertical-align: middle;
  margin-left: 10px;
}

.cr_titleTag {
  margin-left: 30px;
}

.el-input-number {
  width: 100%;
}
.el-card {
  margin: 30px;
}
.el-card h2{
  font-size: 16px;
}
.el-card h2::before{
  content:'';
  width: 5px;
  height:5px;
  border-radius: 50%;
  font-size: 16px;
}
.el-card >>>.el-card__header{
  padding: 0px 20px;
}
</style>
