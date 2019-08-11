<template>
  <div id="template">
    <tab-header :personInfo="personInfo"></tab-header>
    <el-form ref="form" :model="form" label-width="135px" class="createVisit_form" disabled>
      <el-card>
        <el-row :gutter="0">
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

        <el-row :gutter="0">
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
              <el-cascader
                v-model="form.assessment"
                :options="sfassessment"
                :show-all-levels="false"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <h2>目前症状</h2>
        </div>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="有无症状 : ">
              <el-select
                v-model="form.visitRecordContent.issymptom"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in sfsymptom"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="请选择症状 : ">
              <el-select v-model="form.symptom" multiple placeholder="请选择">
                <el-option
                  v-for="item in sfsymptomName"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h2>生活方式</h2>
        </div>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="总体评估 : ">
              <el-select v-model="form.visitRecordContent.lifeAssessment" placeholder="请选择">
                <el-option
                  v-for="item in sflifeAssessment"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="是否戒烟 : ">
              <el-select
                v-model="form.smokingVolume"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in sfsmokingVolume"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="吸烟量">
              <el-input-number v-model="form.visitRecordContent.smokingAmount" :min="0" :max="9999"></el-input-number>
            </el-form-item>
            <span class="unit">支/天</span>
          </el-col>
        </el-row>

        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="是否戒酒 : ">
              <el-select
                v-model="form.alcoholConsumption"
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
          <el-col :span="8">
            <el-form-item label="饮酒量">
              <el-input-number
                v-model="form.visitRecordContent.alcoholConsumptionAmount"
                :min="0"
                :max="9999"
              ></el-input-number>
            </el-form-item>
            <span class="unit">ML/天</span>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="膳食脂肪">
              <el-input v-model="form.visitRecordContent.dietaryFat"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="摄盐情况">
              <el-input v-model="form.visitRecordContent.saltUptake"></el-input>
            </el-form-item>
            <span class="unit">克/天</span>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="运动">
              <el-input-number v-model="form.visitRecordContent.motionNum" :min="0" :max="9999"></el-input-number>
            </el-form-item>
            <span class="unit">次/周</span>
          </el-col>

          <el-col :span="8">
            <el-form-item label>
              <el-input-number v-model="form.visitRecordContent.otionLength" :min="0" :max="9999"></el-input-number>
            </el-form-item>
            <span class="unit">分钟/次</span>
          </el-col>
        </el-row>
        <el-row :gutter="0">
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
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="医从性 : ">
              <el-select v-model="form.medicalCompliance" placeholder="请选择">
                <el-option
                  v-for="item in sfmedicalCompliance"
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
          <h2>并发症</h2>
        </div>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="是否有并发症 : ">
              <el-select
                v-model="form.visitRecordContent.iscomplication"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in sfcomplication"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="并发症 : ">
              <el-select v-model="form.complicationCategory">
                <el-option
                  v-for="item in sfbfz"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="具体症状：">
              <el-select v-model="form.complication" multiple>
                <el-option
                  v-for="item in sfbfzName"
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
          <h2>用药情况</h2>
        </div>
        <el-row :gutter="0">
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
          <el-col :span="8">
            <el-form-item label="是否需要用药 : ">
              <el-select v-model="form.visitRecordContent.isNeed">
                <el-option
                  v-for="item in sfisNeed"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          :gutter="0"
          v-for="(dosage, index) in  form.visitRecordContent.dosages"
          :key="index"
        >
          <el-col :span="8">
            <el-form-item label="药物名称">
              <el-input v-model="dosage.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:-50px;">
            <el-form-item>
              <el-input-number v-model="dosage.frequency" :min="0" :max="9999" label="次"></el-input-number>
            </el-form-item>
            <span class="unit">次/日</span>
          </el-col>
          <el-col :span="6" style="margin-left:-50px;">
            <el-form-item>
              <el-input-number v-model="dosage.dose" :min="0" :max="9999" label="mg"></el-input-number>
            </el-form-item>
            <span class="unit">mg/次</span>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button @click.prevent="removeDosage(dosage)">删除</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button @click.prevent="addDosage">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row></el-row>
        <!-- 药物不良反应 -->
        <select-input
          :selectInputData="reactionsData"
          @listenSelect="reactionsSelect"
          @listenInput="reactionsInput"
        ></select-input>
      </el-card>
      <el-card>
        <div slot="header">
          <h2>异常化验项目</h2>
        </div>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="白细胞">
              <el-input v-model="form.visitRecordContent.whiteBloodCell" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="血小板">
              <el-input v-model="form.visitRecordContent.platelet" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="血钾">
              <el-input v-model="form.visitRecordContent.bloodPotassium" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="血钙">
              <el-input v-model="form.visitRecordContent.bloodCalcium" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凝血">
              <el-input v-model="form.visitRecordContent.blood_coagulation" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甘油三脂">
              <el-input v-model="form.visitRecordContent.threeFat" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="其他">
              <el-input v-model="form.visitRecordContent.other" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <div slot="header">
          <h2>健康教育知晓</h2>
        </div>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="是否进行健康指导 : ">
              <el-select
                v-model="form.visitRecordContent.healthGuidance"
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
          <el-col :span="8">
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
        <el-row :gutter="0">
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
              <el-select v-model="form.appointmentRevisit">
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

        <el-row :gutter="0">
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

        <el-row :gutter="0">
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
    </el-form>
    <el-button type="success" style="float:right" @click="cancelBtn">返回</el-button>
  </div>
</template>
<script>
import "./echoDisplaycss.less"
import ehcoDisplay from "./index";
export default {
  components: ehcoDisplay.components,
  data: ehcoDisplay.data,
  created: ehcoDisplay.created,
  methods: ehcoDisplay.methods
};
</script>
