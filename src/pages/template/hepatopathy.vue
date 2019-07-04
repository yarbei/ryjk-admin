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
        <el-col :span="3" style="font-size:16px;text-align:center;line-height:3em;">血压</el-col>
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
        <el-col :span="3" style="font-size:16px;text-align:center;line-height:3em;">化验数值</el-col> 
        <el-col :span="8">
          <el-form-item label="谷丙转氨酶(U/L)">
            <el-input-number v-model="form.visitRecordContent.transaminase" :min="0" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="谷草转氨酶(U/L)">
            <el-input-number v-model="form.visitRecordContent.transaminase" :min="0" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="3" style="font-size:16px;text-align:center;line-height:3em;">体温</el-col>
        <el-col :span="8">
          <el-form-item label="体温(℃)">
            <el-input-number v-model="form.visitRecordContent.animalheat" :min="0" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="3" style="font-size:16px;text-align:center;line-height:3em;">异常指标</el-col>
        <el-col :span="8">
          <el-form-item label="有无异常" @change="anomalyIndexChange">
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
          <el-form-item label="指标值" v-show="isanomalyIndex">
            <el-input-number v-model="form.visitRecordContent.animalheat" :min="0" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      
      <h2>生活自理情况</h2>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="自理情况 : ">
            <el-select
              v-model="form.visitRecordContent.careLift"
              placeholder="请选择"
            >
              <el-option
                v-for="item in sfcareLift"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <h2>吸烟情况</h2>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="吸烟史 : ">
            <el-select v-model="form.visitRecordContent.smokingHistory" placeholder="请选择">
              <el-option
                v-for="item in sfsmokingHistory"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否戒烟 : ">
            <el-select v-model="form.visitRecordContent.isQuitSmoking" placeholder="请选择">
              <el-option
                v-for="item in sfisQuitSmoking"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="现状(支/日)：">
            <el-input-number v-model="form.visitRecordContent.smokingMeasure" :min="0" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <h2>饮酒情况</h2>
      <el-row :gutter="80">
        <el-col :span="6">
          <el-form-item label="饮酒史 : ">
            <el-select v-model="form.visitRecordContent.drinkingHistory" placeholder="请选择">
              <el-option
                v-for="item in sfdrinkingHistory"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
          <el-col :span="8">
          <el-form-item label="是否戒酒 : ">
            <el-select v-model="form.visitRecordContent.isAbstinence" placeholder="请选择">
              <el-option
                v-for="item in sfisAbstinence"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="现状(支/日)：">
            <el-input-number v-model="form.visitRecordContent.drinkingMeasure" :min="0" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <h2>睡眠情况</h2>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="睡眠情况 : ">
            <el-select v-model="form.visitRecordContent.sleepQuality" placeholder="请选择">
              <el-option
                v-for="item in sfsleepQuality"
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
          <el-form-item label="运动情况 : ">
            <el-select v-model="form.visitRecordContent.sportSituation" placeholder="请选择">
              <el-option
                v-for="item in sfsportSituation"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <h2>心理情况</h2>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="心理状况 : ">
            <el-select v-model="form.visitRecordContent.psychologicSituation" placeholder="请选择">
              <el-option
                v-for="item in sfpsychologicSituation"
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
          <el-form-item label="是否需要 : ">
            <el-select v-model="form.visitRecordContent.isNeed" placeholder="请选择">
              <el-option
                v-for="item in sfisNeed"
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
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="剂量 : ">
            <el-select v-model="form.visitRecordContent.dosage" placeholder="请选择">
              <el-option
                v-for="item in sfdosage"
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
          <el-form-item label="用药次数 : ">
            <el-select v-model="form.visitRecordContent.dosage" placeholder="请选择">
              <el-option
                v-for="item in sfdosage"
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
          <el-form-item label="备注：">
            <el-input v-model="form.remark" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="是否按时复诊 : ">
            <el-select v-model="form.visitRecordContent.isOnSchedule">
              <el-option
                v-for="item in sfisOnSchedule"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否预约复诊 : ">
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
      <el-row>
      <el-col :span="8">
          <el-form-item label="上次复诊情况 : ">
            <el-select v-model="form.visitRecordContent.subsequentVisit" @change="appointmentRevisitChange">
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

      <el-row>
      <el-col :span="8">
          <el-form-item label="疾病指导 : ">
            <el-select v-model="form.visitRecordContent.sickness" >
              <el-option
                v-for="item in sfsickness"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="疾病知晓度 : ">
            <el-select v-model="form.sicknessKnow">
              <el-option
                v-for="item in sfsickness"
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
          <el-form-item label="满意度情况 : ">
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
        <el-col :span="8">
          <el-form-item label="患者提出的问题 : ">
            <el-input v-model="form.visitRecordContent.question"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="此次随访分类 : ">
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
      <el-form-item label="此次随访建议 : ">
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
      //异常指标
      anomalyIndex: [{value: 0, label: "无"}, {value: 1, label: "有"}],
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
    this.getSymptomList(); //获取症状列表
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
    //选择有无异常指标决定是否弹出指标值输入框
    isanomalyIndex(val){
      if (val == 1) {
        this.isanomalyIndex = true;
      } else {
        this.isanomalyIndex = false;
      }
    },
    //选择是否有药物不良反应决定是否弹出要不不良反应输入框
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
