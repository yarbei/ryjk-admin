<template>
  <div>
    <h1>1通用模板</h1>
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

      <h2>项目随访情况</h2>

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
        <el-col :span="8">
          <el-form-item label="请选择症状 : ">
            <el-select v-model="form.symptom" multiple collapse-tags placeholder="请选择">
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

      <h2>生活方式</h2>
      <el-row :gutter="80">
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
        <el-col :span="8">
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
        <el-col :span="8">
          <el-form-item label="ML/天">
            <el-input-number
              v-model="form.visitRecordContent.alcoholConsumptionAmount"
              :min="0"
              :max="9999"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="膳食脂肪">
            <el-input v-model="form.visitRecordContent.dietaryFat"></el-input>
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
          <el-form-item label="摄盐情况(克/天)">
            <el-input v-model="form.visitRecordContent.saltUptake"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="心理调整 : ">
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

      <el-row :gutter="80">
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
        <el-col :span="8">
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
        <el-col :span="8">
          <el-form-item label="具体症状：">
            <el-select v-model="form.complication" multiple collapse-tags>
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
            <el-button @click.prevent="addDosage">新增</el-button>
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
        <el-col :span="16">
          <el-form-item label="不良反应：">
            <el-input v-model="form.visitRecordContent.reactions.desc" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <h2>异常化验项目</h2>
      <el-row :gutter="80">
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

      <el-row :gutter="80">
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

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="其他">
            <el-input v-model="form.visitRecordContent.other" placeholder="自定义"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="随访备注 : ">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>

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

      <el-row :gutter="80">
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
            <el-date-picker v-model="form.revisitTime" type="date" placeholder="选择日期" required></el-date-picker>
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

      <el-form-item style="text-align: center">
        <el-button type="success" @click="onSubmit">完成随访</el-button>
        <el-button @click="cancelBtn">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import ElCol from "element-ui/packages/col/src/col";
import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
import tabHeader from "../components/tabHeader";

export default {
  components: {
    ElButton,
    ElCol,
    tabHeader
  },
  name: "createPlan",
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
      // 总体评估
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
      bfz: { multiple: true },
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
      personInfoId: "",
      personInfo: {}
    };
  },
  created() {
    this.personInfoId = this.$route.params.id;
    this.personInfo = JSON.parse(sessionStorage.getItem("personInfo")); //从session中获取患者信息
    this.getMedicalList(); //获取科室列表
    this.getSymptomList(); //获取症状列表
    this.getFormList(this.personInfoId); //获取随访详情
  },
  mounted() {},
  methods: {
    //选择是否有症状决定是否弹出症状选择框
    sfsymptomChange(val) {
      if (val == 1) {
        this.issfsymptomName = true;
        this.$http
          .get("/api" + "/common/getDataList?dataType=1")
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
    // 选择是否有药物不良反应决定是否弹出不良反应输入框
    reactionsChange(val) {
      if (val == 1) {
        this.isReactions = true;
      } else {
        this.isReactions = false;
      }
    },
    // 选择是否戒烟决定是否弹出抽烟情况输入框
    smokingVolumeChange(val) {
      if (val == 0) {
        this.isSmokingAmount = true;
      } else {
        this.isSmokingAmount = false;
      }
    },
    // 选择是否戒酒决定是否弹出饮酒情况输入框
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
        this.getComplicationList(); //获取并发症列表
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
    // 删除一条用药情况
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
        .get("/api" + "/common/getDataList?dataType=2&dataNum=" + val)
        .then(res => {
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
      formData.patientId = this.personInfo.id; // 患者ID，必传
      formData.visitAuthor = this.$store.state.user.user.id; // 从store中获取用户ID，在这被作为随访人员ID
      //如果有随访时间，将他格式化yyyy-MM-dd
      if (formData.revisitTime) {
        var date = formData.revisitTime;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        var nowDate = year + "-" + month + "-" + day;
        formData.revisitTime = nowDate;
      }

      // 数组转字符串complication
      if (formData.complication instanceof Array) {
        formData.complication = Number(this.form.complication.join(","));
      }
      if (formData.symptom instanceof Array) {
        formData.symptom = Number(this.form.symptom.join(","));
      }
      var str = JSON.stringify(formData.visitRecordContent);
      formData.visitRecordContent = str;
      // 发送新增随访请求
      this.$http
        .post("/api" + `/visitRecord/updateVisitRecord`, formData)
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
          console.log(this.sfdepartment)
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
          this.sfsymptomName = res.data;
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
    },
    //获取随访详情
    getFormList(id) {
      this.$http
        .get("/api" + "/visitRecord/getVisitRecordById?id=" + id)
        .then(res => {
          console.log(res);
          this.form = res.data;
          this.form.visitRecordContent = JSON.parse(
            res.data.visitRecordContent
          );
          if(res.data.department){
            this.form.department=Number(res.data.department)
          }
          if (res.data.symptom != null) {
            this.form.symptom = res.data.symptom.split(",").map(Number);
          }
          if (res.data.complication != null) {
            this.form.complication = res.data.complication
              .split(",")
              .map(Number);
          }
          if (this.form.visitRecordContent.issymptom == 1) {
            this.$http
              .get("/api" + `/common/getDataList?dataType=1`)
              .then(res => {
                this.sfsymptomName = res.data;
              })
              .catch(err => {
                console.log(err);
              });
          }
          if (this.form.visitRecordContent.iscomplication == 1) {
            this.$http
              .get("/api" + `/common/getDataList?dataType=2`)
              .then(res => {
                this.sfbfz = res.data;
              })
              .catch(err => {
                console.log(err);
              });
            if (this.form.visitRecordContent.bfzClassify) {
              this.$http
                .get(
                  "/api" +
                    "/common/getDataList?dataType=2&dataNum=" +
                    this.form.visitRecordContent.bfzClassify
                )
                .then(res => {
                  this.sfbfzName = res.data;
                })
                .catch(err => {
                  console.log(err);
                });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
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
</style>
