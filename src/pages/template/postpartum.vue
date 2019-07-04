<template>
  <div>
    <tab-header :personInfo="personInfo"></tab-header>
    <el-form ref="form" :model="form" label-width="135px" class="createVisit_form">
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
      <h2>体征</h2>
      <el-row :gutter="0">
        <el-col :span="4" style="font-size:16px;text-align:center;line-height:3em;">血压</el-col>
        <el-col :span="8">
          <el-form-item label="高压(mmHg)">
            <el-input-number v-model="form.visitRecordContent.hypertension" :min="0" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="低压(mmHg)">
            <el-input-number v-model="form.visitRecordContent.hypotension" :min="0" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4" style="font-size:16px;text-align:center;line-height:3em;">血糖</el-col>
        <el-col :span="8">
          <el-form-item label="餐前(mmol/l)">
            <el-input-number v-model="form.visitRecordContent.bmbs" :min="0" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="餐后(mmol/l)">
            <el-input-number v-model="form.visitRecordContent.ambs" :min="0" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <h2>目前症状</h2>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="有无症状 : ">
            <el-select
              v-model="form.visitRecordContent.issymptom"
              @change="sfsymptomChange"
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
        <el-col :span="8" v-show="issfsymptomName">
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
      <h2>专科指导</h2>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="个人卫生 : ">
            <el-select v-model="form.visitRecordContent.hygiene" placeholder="请选择">
              <el-option
                v-for="item in sfhygiene"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="心理状况 : ">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option
                v-for="item in sfregion"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="母乳喂养 : ">
            <el-select v-model="form.visitRecordContent.breastFeeding" placeholder="请选择">
              <el-option
                v-for="item in sfbreastFeeding"
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
          <el-form-item label="睡眠情况 : ">
            <el-select v-model="form.visitRecordContent.sleep" placeholder="请选择">
              <el-option
                v-for="item in sfsleep"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生活自理情况 : ">
            <el-select v-model="form.visitRecordContent.life" placeholder="请选择">
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
      <h2>新生儿护理</h2>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="新生儿黄疸 : ">
            <el-select v-model="form.visitRecordContent.jaundice" placeholder="请选择">
              <el-option
                v-for="item in sfjaundice"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="脐带脱落 : ">
            <el-select v-model="form.visitRecordContent.funicle" placeholder="请选择">
              <el-option
                v-for="item in sffunicle"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="疫苗接种 : ">
            <el-select v-model="form.visitRecordContent.vaccine" placeholder="请选择">
              <el-option
                v-for="item in sfvaccine"
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
          <el-form-item label="皮肤清洁 : ">
            <el-select v-model="form.visitRecordContent.skin" placeholder="请选择">
              <el-option
                v-for="item in sfskin"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <h2>饮食情况</h2>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="营养均衡 : ">
            <el-select v-model="form.visitRecordContent.nutrition" placeholder="请选择">
              <el-option
                v-for="item in sfnutrition"
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
          <el-form-item label="饮食习惯 : ">
            <el-select v-model="form.visitRecordContent.diet" placeholder="请选择">
              <el-option
                v-for="item in sfdiet"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="水果蔬菜 : ">
            <el-select v-model="form.visitRecordContent.fruits" placeholder="请选择">
              <el-option
                v-for="item in sffruits"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="奶豆 : ">
            <el-select v-model="form.visitRecordContent.milk" placeholder="请选择">
              <el-option
                v-for="item in sfmilk"
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
          <el-form-item label="饮食次数 : ">
            <el-select v-model="form.visitRecordContent.eat" placeholder="请选择">
              <el-option
                v-for="item in sfeat"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="低盐饮食 : ">
            <el-select v-model="form.visitRecordContent.lsalt" placeholder="请选择">
              <el-option
                v-for="item in sflsalt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="低脂饮食 : ">
            <el-select v-model="form.visitRecordContent.lfat" placeholder="请选择">
              <el-option
                v-for="item in sflfat"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <h2>运动情况</h2>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="运动(次/周)">
            <el-input-number v-model="form.motionNum" :min="0" :max="9999" label="运动(次/周)"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="运动(分钟/次)">
            <el-input-number v-model="form.motionLength" :min="0" :max="9999" label="运动(次/周)"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <h2>并发症</h2>
      <el-row :gutter="0">
        <el-col :span="8">
          <el-form-item label="是否有并发症状 : ">
            <el-select
              v-model="form.visitRecordContent.iscomplication"
              @change="complicationChange"
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
        <el-col :span="8" v-show="iscomplication">
          <el-form-item label="并发症 : ">
            <el-select v-model="form.visitRecordContent.bfzClassify" @change="bfzChange">
              <el-option
                v-for="item in sfbfz"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-show="iscomplicationName">
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
      <h2>用药情况</h2>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="依从性 : ">
            <el-select v-model="form.medicationCompliance" placeholder="请选择">
              <el-option
                v-for="item in sfmedicationCompliance"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(dosage, index) in  form.visitRecordContent.dosages" :key="index">
        <el-col :span="6">
          <el-form-item label="药物名称">
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
        <el-col :span="24">
          <el-form-item>
            <el-button style="width:95%;background:#eee;" @click.prevent="addDosage">新增</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="药物不良反应 : ">
            <el-select v-model="form.visitRecordContent.reactions.value" @change="reactionsChange">
              <el-option
                v-for="item in sfreactions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16" v-show="isReactions">
          <el-form-item label="不良反应：">
            <el-input v-model="form.visitRecordContent.reactions.desc" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <h2>健康教育知晓</h2>

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
      <h2>随访记录</h2>
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
              format="yyyy - MM - dd "
              value-format="yyyy-MM-dd"
              required
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
      <el-form-item style="text-align: center">
        <el-button type="success" @click="onSubmit">完成随访</el-button>
        <el-button @click="cancelBtn">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import ElCol from "element-ui/packages/col/src/col";
import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
import tabHeader from "../../components/tabHeader";

export default {
  components: {
    ElButton,
    ElCol,
    tabHeader
  },
  name: "default",
  data() {
    return {
      form: {
        visitAuthor: "",
        patientId: "",
        motionNum: 0,
        motionLength: 0,
        visitRecordContent: {
          reactions: {}, //药物不良反应
          dosages: [{ value: "", frequency: 0, dose: 0 }] //用药情况
        }
      },
      // 随访状态
      sfstatus: [{ value: 0, label: "未完成" }, { value: 1, label: "已完成" }],
      // 随访结果
      sfresult: [
        { value: 0, label: "非有效随访" },
        { value: 1, label: "有效随访" },
        { value: 2, label: "勿访" },
        { value: 3, label: "终止随访" }
      ],
      // 随访方式
      sftype: [
        { value: 1, label: "电话随访" },
        { value: 2, label: "在线随访" },
        { value: 3, label: "短信随访" }
      ],
      // 出院/转院情况
      sfdischargeStatus: [
        { value: 0, label: "其他市级医院" },
        { value: 1, label: "乡镇卫生医院治疗" },
        { value: 2, label: "村卫生室治疗" },
        { value: 3, label: "回家康复" },
        { value: 4, label: "痊愈回家" }
      ],
      // 随访评估
      sfassessment: [
        { value: 1, label: "并发症" },
        { value: 2, label: "相关指标控制不住" },
        { value: 3, label: "控制不满意" },
        { value: 4, label: "控制满意" },
        { value: 5, label: "不良生活方式未改善" }
      ],
      // 症状
      sfsymptom: [{ value: 0, label: "无症状" }, { value: 1, label: "有症状" }],
      sfsymptomName: [],
      //个人卫生
      sfhygiene: [
        { value: 0, label: "会阴护理" },
        { value: 1, label: "刷牙" },
        { value: 2, label: "洗脚" },
        { value: 3, label: "淋浴" }
      ],
      //心理状况
      sfpsychology: [
        { value: 0, label: "愉悦" },
        { value: 1, label: "低落" },
        { value: 2, label: "感觉身心疲惫" }
      ],
      //母乳喂养
      sfbreastFeeding: [
        { value: 0, label: "纯母乳喂养" },
        { value: 1, label: "混合喂养" },
        { value: 2, label: "人工喂养" }
      ],
      //新生儿黄疸
      sfjaundice: [
        { value: 0, label: "已退" },
        { value: 1, label: "轻" },
        { value: 2, label: "重" }
      ],
      //脐带脱落
      sffunicle: [{ value: 1, label: "是" }, { value: 0, label: "否" }],
      //疫苗接种
      sfvaccine: [
        { value: 1, label: "正常接种" },
        { value: 0, label: "需要补种" }
      ],
      //皮肤清洁
      sfskin: [{ value: 1, label: "是" }, { value: 0, label: "否" }],
      //睡眠情况
      sfsleep: [
        { value: 2, label: "良好" },
        { value: 1, label: "一般" },
        { value: 0, label: "差" }
      ],
      //生活自理情况
      sflife: [
        { value: 0, label: "完全自理" },
        { value: 1, label: "部分自理" },
        { value: 2, label: "完全不能自理" }
      ],
      //营养均衡
      sfnutrition: [{ value: 1, label: "是" }, { value: 0, label: "否" }],
      //饮食习惯
      sfdiet: [
        { value: 0, label: "喜甜" },
        { value: 1, label: "喜咸" },
        { value: 2, label: "喜烫食" },
        { value: 3, label: "喜油炸" }
      ],
      //水果蔬菜
      sffruits: [{ value: 0, label: "少" }, { value: 1, label: "多" }],
      //奶豆
      sfmilk: [{ value: 0, label: "少" }, { value: 1, label: "多" }],
      //饮食次数
      sfeat: [{ value: 0, label: "3次" }, { value: 1, label: "多于3次" }],
      //低盐饮食
      sflsalt: [{ value: 1, label: "是" }, { value: 0, label: "否" }],
      //低脂饮食
      sflfat: [{ value: 1, label: "是" }, { value: 0, label: "否" }],
      //总体评估
      sflifeAssessment: [
        { value: 0, label: "无改善" },
        { value: 1, label: "有改善" }
      ],
      // 吸烟量
      sfsmokingVolume: [
        { value: 0, label: "未戒烟" },
        { value: 1, label: "已戒烟" }
      ],
      // 饮酒量
      sfalcoholConsumption: [
        { value: 0, label: "未减量" },
        { value: 1, label: "已减量" }
      ],
      // 心理调整
      sfregion: [
        { value: 0, label: "差" },
        { value: 1, label: "一般" },
        { value: 2, label: "良好" }
      ],
      // 医从性
      sfmedicalCompliance: [
        { value: 0, label: "差" },
        { value: 1, label: "一般" },
        { value: 2, label: "良好" }
      ],
      // 并发症
      sfcomplication: [
        { value: 0, label: "无并发症" },
        { value: 1, label: "有并发症 " }
      ],
      sfbfz: [], //并发症分类
      sfbfzName: [], //并发症具体名字
      // 依从性
      sfmedicationCompliance: [
        { value: 0, label: "不服药" },
        { value: 1, label: "部分依从" },
        { value: 2, label: "完全依从" }
      ],
      // 药物不良反应
      sfreactions: [
        { value: 0, label: "无不良反应" },
        { value: 1, label: "有不良反应" }
      ],
      // 健康指导
      sfhealthGuidance: [{ value: 1, label: "是" }, { value: 0, label: "否" }],
      // 健康指导内容
      sfhealthGuidanceContent: [
        { value: 1, label: "饮食指导" },
        { value: 2, label: "用药指导" },
        { value: 3, label: "注意事项" },
        { value: 4, label: "心理指导" },
        { value: 5, label: "睡眠指导" },
        { value: 6, label: "康复指导" },
        { value: 7, label: "戒烟限酒指导" }
      ],
      // 已提醒复诊
      sfreminderRevisit: [
        { value: 1, label: "已提醒" },
        { value: 0, label: "未提醒" }
      ],
      // 已预约复诊
      sfappointmentRevisit: [
        { value: 1, label: "已预约" },
        { value: 0, label: "未预约" }
      ],
      // 预约科室
      sfdepartment: [],
      // 健康知晓度
      sfhealthAwareness: [
        { value: 0, label: "差" },
        { value: 1, label: "一般" },
        { value: 2, label: "良好" },
        { value: 3, label: "优秀" }
      ],
      // 满意度调研
      sfsatisfactionSurvey: [
        { value: 0, label: "不满意" },
        { value: 1, label: "基本满意" },
        { value: 2, label: "满意" },
        { value: 3, label: "非常满意" }
      ],
      isReactions: false, //药物不良反应输入框
      isSmokingAmount: false, //抽烟情况输入框
      isAlcoholConsumptionAmount: false, //饮酒情况输入框
      isAppointmentRevisit: false, //预约科室及复诊时间输入框
      ishealthGuidanceContent: false, //健康指导内容输入框
      iscomplication: false, //并发症选择框
      iscomplicationName: false, //具体并发症选择框
      issfsymptomName: false, //症状选择框
      bfzClassify: "", //并发症类型
      complicationName: "", //并发症名字
      personInfoId: "",
      personInfo: {}
    };
  },
  created() {
    this.personInfoId = this.$route.params.id;
    this.personInfo = JSON.parse(sessionStorage.getItem("personInfo")); //从session中获取患者信息
    this.getMedicalList(); //获取科室列表
  },
  mounted() {},
  methods: {
    //选择是否有症状决定是否弹出症状选择框
    sfsymptomChange(val) {
      if (val == 1) {
        this.issfsymptomName = true;
        this.$http
          .get("/api" + "/common/getDataList?dataType=1&sourceType=1")
          .then(res => {
            this.sfsymptomName = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.issfsymptomName = false;
      }
    },
    //选择是否有药物不良反应决定是否弹出药物不良反应输入框
    reactionsChange(val) {
      if (val == 1) {
        this.isReactions = true;
      } else {
        this.isReactions = false;
      }
    },
    //选择是否戒烟决定是否弹出抽烟情况输入框
    smokingVolumeChange(val) {
      if (val == 0) {
        this.isSmokingAmount = true;
      } else {
        this.isSmokingAmount = false;
      }
    },
    //选择是否戒酒决定是否弹出饮酒情况输入框
    alcoholConsumptionChange(val) {
      if (val == 0) {
        this.isAlcoholConsumptionAmount = true;
      } else {
        this.isAlcoholConsumptionAmount = false;
      }
    },
    //选择是否预约复诊决定是否弹出预约科室及复诊时间输入框
    appointmentRevisitChange(val) {
      if (val == 1) {
        this.isAppointmentRevisit = true;
      } else {
        this.isAppointmentRevisit = false;
      }
    },
    //选择是否进行健康指导决定是否显示健康指导内容输入框
    healthGuidanceChange(val) {
      if (val == 1) {
        this.ishealthGuidanceContent = true;
      } else {
        this.ishealthGuidanceContent = false;
      }
    },
    //选择是否有并发症决定是否弹出并发症选择框
    complicationChange(val) {
      if (val == 1) {
        this.iscomplication = true;
        this.$http
          .get("/api" + "/common/getDataList?dataType=2&sourceType=1")
          .then(res => {
            this.sfbfz = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.iscomplication = false;
      }
    },
    //新增一条用药情况
    addDosage() {
      this.form.visitRecordContent.dosages.push({
        value: "",
        frequency: 0,
        dose: 0
      });
    },
    //删除一条用药情况
    removeDosage(item) {
      var index = this.form.visitRecordContent.dosages.indexOf(item);
      if (index !== -1) {
        this.form.visitRecordContent.dosages.splice(index, 1);
      }
      var index = this.form.visitRecordContent.dosages.indexOf(item);
      if (index !== -1) {
        this.form.visitRecordContent.dosages.splice(index, 1);
      }
    },
    //选择并发症类型决定是否弹出并发症名字选择框
    bfzChange(val) {
      if (val) {
        this.iscomplicationName = true;
      } else {
        this.iscomplicationName = false;
      }
      this.$http
        .get(
          "/api" + "/common/getDataList?dataType=2&sourceType=1&dataNum=" + val
        )
        .then(res => {
          console.log(res)
          this.sfbfzName = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击完成随访
    onSubmit() {
      if (this.form.type === undefined) {
        this.$message.warning("随访方式未选择！");
        return;
      }
      var formData = this.form;
      formData.patientId = this.personInfo.id; //患者ID，必传
      formData.visitAuthor = this.$store.state.user.user.id; //从store中获取用户ID，在这被作为随访人员ID
      // 数组转字符串complication
      if (formData.complication instanceof Array) {
        formData.complication = this.form.complication.join(",");
      }
      if (formData.symptom instanceof Array) {
        formData.symptom = this.form.symptom.join(",");
      }
      var str = JSON.stringify(formData.visitRecordContent);
      formData.visitRecordContent = str;
      // 发送新增随访请求
      this.$http
        .post(
          "/api" + `/visitRecord/insertVisitRecord?template_type=1`,
          formData
        )
        .then(res => {
          if (res.data) {
            this.$message.success("新增随访成功！");
            setTimeout(() => {
              this.$router.replace({
                name: "EssentialInfo",
                params: { selectId: "sfjl" }
              });
            }, 1500);
          } else {
            this.$message.error("新增随访失败！");
          }
        })
        .catch(err => {
          this.$message.error("随访新增失败！");
          console.log(err);
        });
    },
    // 返回按钮
    cancelBtn() {
      this.$router.go(-1);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 获取科室方法
    getMedicalList() {
      this.$http
        .get(
          "/api" +
            `/medicalSections/getMedicalSectionsList?hospitalId=${this.$store.state.user.user.hospitalId.id}`
        )
        .then(res => {
          this.sfdepartment = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取症状方法
    getSymptomList() {
      this.$http
        .get("/api" + `/common/getDataList?dataType=1`)
        .then(res => {
          this.sfsymptom[1].children = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取并发症方法
    getComplicationList() {
      this.$http
        .get("/api" + `/common/getDataList?dataType=2`)
        .then(res => {
          this.sfbfz = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
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
</style>
