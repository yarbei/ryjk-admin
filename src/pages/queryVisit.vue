<template>
  <div class="cr_container">

    <tab-header :personInfo="personInfo"></tab-header>

    <el-form ref="form" :model="form" label-width="135px" class="createVisit_form">

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="随访状态 : ">
            <el-select v-model="form.status" placeholder="请选择随访状态">
              <el-option label="已完成" :value="1"></el-option>
              <el-option label="未完成" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="随访结果 : ">
            <el-select v-model="form.result" placeholder="请选择随访结果">
              <el-option label="有效随访" :value="1"></el-option>
              <el-option label="非有效随访" :value="0"></el-option>
              <el-option label="勿访" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="随访方式 : ">
            <el-select v-model="form.type" placeholder="请选择随访方式">
              <el-option label="电话随访" :value="1"></el-option>
              <el-option label="在线随访" :value="2"></el-option>
              <el-option label="短信随访" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="出院/转出情况:">
            <el-select v-model="form.dischargeStatus" placeholder="请选择出院/转出情况">
              <el-option label="其他市级医院" :value="0"></el-option>
              <el-option label="乡镇卫生院治疗" :value="1"></el-option>
              <el-option label="村卫生室治疗" :value="2"></el-option>
              <el-option label="回家康复" :value="3"></el-option>
              <el-option label="痊愈回家" :value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="本次随访评估:">
            <!--<el-select v-model="form.assessment" placeholder="请选择本次随访评估">-->
              <!--<el-option label="控制满意" :value="4"></el-option>-->
              <!--<el-option label="控制不满意" :value="3"></el-option>-->
              <!--<el-option label="相关指标控制不佳" :value="2"></el-option>-->
              <!--<el-option label="并发症" :value="1"></el-option>-->
              <!--<el-option label="不良生活方式未改善" :value="0"></el-option>-->
            <!--</el-select>-->
            <el-cascader
              v-model="form.assessment"
              :options="bcsfpg"
              :props="{emitPath: false}"
              @change="handleChange"></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

      <h2>项目随访情况</h2>

      <el-row :gutter="80">
        <!--<el-col :span="1" style="line-height: 40px;text-align: left;white-space: nowrap ">-->
         <!--症状 :-->
        <!--</el-col>-->
        <el-col :span="8">
          <el-form-item label="请选择症状 : ">
            <el-cascader
              v-model="form.symptom"
              :options="zz"
              :props="{emitPath: false}"
              @change="handleChange"></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>


      <h2> 生活方式</h2>
      <el-row :gutter="80">
        <!--<el-col :span="1" style="line-height: 40px;text-align: left; white-space: nowrap">-->
        <!--</el-col>-->
        <el-col :span="8">
          <el-form-item label="总体评估 : ">
            <el-select v-model="form.lifeAssessment" placeholder="请选择">
              <el-option label="有改善" :value="1"></el-option>
              <el-option label="未改善" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row :gutter="80">
        <!--<el-col :span="1" style="line-height: 40px;text-align: left; white-space: nowrap">-->
          <!--&nbsp;-->
        <!--</el-col>-->
        <el-col :span="8">
          <el-form-item label="吸烟量 : ">
            <el-select v-model="form.smokingVolume" placeholder="请选择">
              <el-option label="已戒烟" :value="1"></el-option>
              <el-option label="未戒烟" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="支/天">
            <el-input-number v-model="form.smokingAmount"  :min="0" :max="9999" label="支/天"></el-input-number>
            <!--<el-input v-model="form.smokingAmount"></el-input>-->
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <!--<el-col :span="1" style="line-height: 40px;text-align: left; white-space: nowrap">-->
          <!--&nbsp;-->
        <!--</el-col>-->
        <el-col :span="8">
          <el-form-item label="饮酒量 : ">
            <el-select v-model="form.alcoholConsumption" placeholder="请选择">
              <el-option label="减量" :value="1"></el-option>
              <el-option label="未减量" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="ML/天">
            <el-input-number v-model="form.alcoholConsumptionAmount" :min="0" :max="9999" label="ML/天"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <!--<el-col :span="1" style="line-height: 40px;text-align: left; white-space: nowrap">-->
          <!--&nbsp;-->
        <!--</el-col>-->
        <el-col :span="8">
          <el-form-item label="膳食脂肪">
            <el-input v-model="form.dietaryFat"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <!--<el-col :span="1" style="line-height: 40px;text-align: left; white-space: nowrap">-->
          <!--&nbsp;-->
        <!--</el-col>-->
        <el-col :span="8">
          <el-form-item label="运动(次/周)">
            <el-input-number v-model="form.motionNum" :min="0" :max="9999" label="运动(次/周)"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="运动(分钟/次)">
            <el-input-number v-model="form.motionLength" :min="0" :max="9999" label="运动(分钟/次)"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="摄盐情况(克/天)">
            <el-input v-model="form.saltUptake"></el-input>
            <!--<el-input-number v-model="" :min="0" :max="9999" label="摄盐情况(克/天)"></el-input-number>-->
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="心理调整 : ">
            <el-select v-model="form.mentalSet" placeholder="请选择">
              <el-option label="良好" :value="2"></el-option>
              <el-option label="一般" :value="1"></el-option>
              <el-option label="差" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="医从性 : ">
            <el-select v-model="form.medicalCompliance" placeholder="请选择">
              <el-option label="良好" :value="2"></el-option>
              <el-option label="一般" :value="1"></el-option>
              <el-option label="差" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <h2>并发症</h2>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="是否有并发症状 : ">
            <!--<el-select v-model="form.complication" placeholder="请选择是否有症状">-->
              <!--<el-option label="无并发症" :value="1"></el-option>-->
              <!--<el-option label="有并发症" :value="0"></el-option>-->
            <!--</el-select>-->
            <el-cascader
              v-model="form.complication"
              :options="sfyzz"
              :props="{emitPath: false}"
              @change="handleChange"></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

      <h2>用药情况</h2>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="依从性 : ">
            <el-select v-model="form.medicationCompliance" placeholder="请选择">
              <el-option label="完全依从" :value="2"></el-option>
              <el-option label="部分依从" :value="1"></el-option>
              <el-option label="不服药" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="药物不良反应 : ">
            <el-select v-model="form.sideEffects" placeholder="请选择">
              <el-option label="无不良反应 " value="0"></el-option>
              <el-option label="有不良反应" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!--<el-col :span="8">-->
          <!--<el-form-item label="不良反应">-->
            <!--<el-input v-model="form.name3" placeholder="用药不良反应"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      </el-row>

      <h2>异常化验项目</h2>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="白细胞">
            <el-input v-model="form.whiteBloodCell" placeholder="自定义"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="血小板">
            <el-input v-model="form.platelet" placeholder="自定义"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="血钾">
            <el-input v-model="form.bloodPotassium" placeholder="自定义"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="血钙">
            <el-input v-model="form.bloodCalcium" placeholder="自定义"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="凝血">
            <el-input v-model="form.bloodCoagulation" placeholder="自定义"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="甘油三脂">
            <el-input v-model="form.threeFat" placeholder="自定义"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="其他">
            <el-input v-model="form.other" placeholder="自定义"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="随访备注 : ">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>

      <h2 >健康教育知晓</h2>

      <el-row :gutter="80">

        <el-col :span="8">
          <el-form-item label="是否进行健康指导 : ">
            <el-select v-model="form.healthGuidance" placeholder="请选择">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否 " :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="健康指导内容  : ">
            <el-select v-model="form.healthGuidanceContent" multiple placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

        </el-col>
      </el-row>

      <h2>随访记录</h2>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="已提醒复诊 : ">
            <el-select v-model="form.reminderRevisit" placeholder="请选择">
              <el-option label="已提醒" :value="1"></el-option>
              <el-option label="未提醒" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="已预约复诊 : ">
            <el-select v-model="form.appointmentRevisit" placeholder="请选择">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="预约科室 : ">
            <el-cascader
              v-model="form.department"
              placeholder="请选择"
              :options="yyks"
              :props="{emitPath: false}"
              @change="handleChange"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="复诊时间 : ">
            <el-date-picker
              v-model="form.revisitTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="健康知晓度 : ">
            <el-select v-model="form.healthAwareness" placeholder="请选择">
              <el-option label="优秀" :value="3"></el-option>
              <el-option label="良好" :value="2"></el-option>
              <el-option label="一般" :value="1"></el-option>
              <el-option label="差" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="满意度调研 : ">
            <el-select v-model="form.satisfactionSurvey" placeholder="请选择">
              <el-option label="非常满意" :value="3"></el-option>
              <el-option label="满意" :value="2"></el-option>
              <el-option label="基本满意" :value="1"></el-option>
              <el-option label="不满意" :value="0"></el-option>
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
  import ElCol from 'element-ui/packages/col/src/col'
  import ElButton from '../../node_modules/element-ui/packages/button/src/button.vue'
  import tabHeader from '../components/tabHeader'
  import ElInput from '../../node_modules/element-ui/packages/input/src/input.vue'

  export default {
    components: {
      ElInput,
      ElButton,
      ElCol,
      tabHeader
    },
    name: 'createPlan',
    data() {
      return {
        form: {
          visitAuthor:"",
          patientId:"",
          motionNum: 0,
          motionLength : 0,
          smokingAmount: 0,
          alcoholConsumption: 0
        },
        personInfo:{},
        dialogVisible: false,
        options: [{value: '1',label: '饮食指导'},
                  {
                  value: '2',
                  label: '用药指导'
                },{
                  value: '3',
                  label: '注意事项'
                },{
                  value: '4',
                  label: '心理指导'
                },{
                  value: '5',
                  label: '睡眠指导'
                },{
                  value: '6',
                  label: '康复指导'
                },{
                  value: '7',
                  label: '戒烟限酒指导'
                }
        ],
        value1:"",
        bcsfpg: [
          {value: 4, label: '控制满意',},
          {value: 3,label :"控制不满意",
            children: [
              {value: 5, label: '不良生活方式未改善'},
              {value: 1, label: '并发症 ',},
              {value: 2, label: '相关指标控制不佳 '},
              ]
          }],
        sfyzz: [
          {value: 1, label: '无并发症',},
          {value: 0,label :"有并发症 ",
            children: [
              {value: 2, label: '高血压',children:[
                {value: 3, label: '心脏并发症'},
                {value: 4, label: '脑卒中'},
                {value: 5, label: '动脉硬化'},
                {value: 6, label: '高血压性肾损害'},
                {value: 7, label: '眼底改变'},
              ]},
              {value: 8, label: '心绞痛 ',children:[
                {value: 9, label: '心律失常'},
                {value: 10, label: '心肌梗塞'},
                {value: 11, label: '心力衰竭'},
              ]},
              {value: 12, label: '心肌梗死 ',children:[
                {value: 13, label: '室壁瘤'},
                {value: 14, label: '附壁血栓形成'},
                {value: 15, label: '心律失常'},
                {value: 16, label: '心力衰竭'},
                {value: 17, label: '心包炎'},
                {value: 18, label: '胸膜炎'},
                {value: 19, label: '肺炎'},
              ]},
              {value: 20, label: '食管癌',children:[
                {value: 21, label: '功能性胃排空障碍'},
                {value: 22, label: '呼吸道感染'},
                {value: 23, label: '反流性食管炎'},
                {value: 24, label: '腹泻'},
              ]},
              {value: 25, label: '肺癌 ',children:[
                {value: 26, label: '胸膜感染'},
                {value: 27, label: '支气管胸膜瘘'},
                {value: 28, label: '呼吸衰竭'},
              ]},
              {value: 29, label: '妊娠并发症 ',children:[
                {value: 30, label: '妊娠期高血压疾病'},
                {value: 31, label: '妊娠期糖尿病'},
                {value: 32, label: '妊娠期心脏病'},
                {value: 33, label: '贫血'},
                {value: 34, label: '羊水过多'},
                {value: 35, label: '羊水过少'},
                {value: 36, label: '脐带脱垂'},
                {value: 37, label: '胎膜早破'},
                {value: 38, label: '胎盘早剥及前置胎盘'},
                {value: 39, label: '妊娠期肝内胆汁淤积症'},
                {value: 40, label: '宫缩乏力'},
                {value: 41, label: '胎位异常'},
                {value: 42, label: '流产'},
                {value: 43, label: '早产'},
                {value: 44, label: '死胎'},
                {value: 45, label: '胎儿生长受限'},
                {value: 46, label: '巨大儿'},
                {value: 47, label: '胎儿畸形'},
                {value: 48, label: '过期妊娠'},
              ]},
              {value: 49, label: '产后并发症 ',children:[
                {value: 50, label: '产后出血'},
                {value: 51, label: '产褥感染'},
                {value: 52, label: '产后便秘'},
                {value: 53, label: '产后抑郁症'},
                {value: 54, label: '产后脱发产'},
                {value: 55, label: '急性乳腺炎'},
              ]},
              {value: 56, label: '剖宫产手术并发症 ',children:[
                {value: 57, label: '子宫內膜炎'},
                {value: 58, label: '切口合并症'},
                {value: 59, label: '泌尿系统并发症'},
                {value: 60, label: '血栓'},
                {value: 61, label: '产后晚期大出血'},
              ]},
              {value: 62, label: '乙肝、肝功能异常 ',children:[
                {value: 63, label: '腹水'},
                {value: 64, label: '肝性脑病'},
                {value: 65, label: '肝昏迷'},
                {value: 66, label: '肾功能不全'},
              ]},
              {value: 67, label: '肺炎',children:[
                {value: 68, label: '肺水肿'},
                {value: 69, label: '败血症'},
                {value: 70, label: '心肺功能衰竭'},
                {value: 71, label: '支气管扩张'},
              ]},
              {value: 72, label: '上呼吸道感染 ',children:[
                {value: 73, label: '肺炎'},
                {value: 74, label: '心肌炎'},
                {value: 75, label: '肾炎'},
                {value: 76, label: '支气管扩张'},
                {value: 77, label: '急性鼻窦炎'},
                {value: 78, label: '急性中耳炎'},
                {value: 79, label: '风湿疾病'}
              ]},
              {value: 80, label: '胃炎 ',children:[
                {value: 81, label: '胃穿孔'},
                {value: 82, label: '上消化道出血'},
                {value: 83, label: '胃癌'},
                {value: 84, label: '幽门梗阻'},
              ]},
              {value: 85, label: '结肠炎',children:[
                {value: 86, label: '发热'},
                {value: 87, label: '出血'},
                {value: 88, label: '肠穿孔'},
                {value: 89, label: '结肠癌'},
              ]},
              {value: 90, label: '血液疾病 ',children:[
                {value: 13, label: '贫血加重'},
                {value: 14, label: '感染'},
                {value: 15, label: '出血'},
                {value: 14, label: '发热'},
                {value: 15, label: '关节炎'},
                {value: 14, label: '心力衰'},
              ]},
              {value: 91, label: '恶性肿瘤 ',children:[
                {value: 92, label: '腔静脉综合症'},
                {value: 93, label: '肺不张'},
                {value: 94, label: '呼吸功能不全'},
                {value: 95, label: '疼痛'},
                {value: 96, label: '感染'},
                {value: 97, label: '出血'},
                {value: 98, label: '恶性体腔积液'},
                {value: 99, label: '胸水'},
                {value: 100, label: '腹水'},
                {value: 101, label: '颅内压增高'},
                {value: 102, label: '昏迷'},
              ]},
              {value: 103, label: '脑卒中',children:[
                {value: 104, label: '急性消化道出血'},
                {value: 105, label: '脑心综合症'},
                {value: 106, label: '肺部感染和急性肺水肿'},
                {value: 107, label: '下肢深静脉'},
                {value: 108, label: '血栓'},
                {value: 109, label: '褥疮'},
                {value: 110, label: '中枢性呼吸困难'},
                {value: 111, label: '中枢性呃逆'},
                {value: 112, label: '脑卒中后抑郁'},
                {value: 113, label: '肩关节半脱位'},
                {value: 114, label: '肩痛'},
                {value: 115, label: '肩-手综合征'},
                {value: 116, label: '废用性肌萎缩'},
                {value: 117, label: '直立性低血压'},
                {value: 118, label: '肢体肿胀'},
                {value: 119, label: '肩-痉挛'},
                {value: 120, label: '误用综合征'},
                {value: 121, label: '关节挛缩'},
              ]},
              {value: 122, label: '口腔科和口腔外科 ',children:[
                {value: 123, label: '刀口感染'},
                {value: 124, label: '刀口不愈合'},
                {value: 125, label: '疼痛'},
                {value: 126, label: '有瘢痕'},
                {value: 127, label: '干槽症'},
                {value: 128, label: '肿瘤复发'},
                {value: 129, label: '恶变'},
                {value: 130, label: '转移'},
                {value: 131, label: '开口受限'},
                {value: 132, label: '外形不美观'},
                {value: 134, label: '颞颌关节强直'},
                {value: 135, label: '涎瘘'},
                {value: 136, label: '面瘫'},
                {value: 137, label: '面神经损伤'},
                {value: 138, label: '咬合关系错乱'},
                {value: 139, label: '发音不清'},
              ]},
              {value: 140, label: '内分泌 ',children:[
                {value: 142, label: '糖尿病酮症酸中毒'},
                {value: 142, label: '高血糖高渗综合征'},
                {value: 143, label: '糖尿病乳酸性酸中毒'},
                {value: 144, label: '视网膜病变'},
                {value: 145, label: '糖尿病肾病'},
                {value: 146, label: '心脑血管病变'},
                {value: 147, label: '神经病变'},
                {value: 148, label: '下肢血管病变'},
                {value: 149, label: '糖尿病足'},
              ]},
              {value: 150, label: '胃肠外和东区',children:[
                {value: 151, label: '道口不愈合'},
                {value: 152, label: '发热'},
                {value: 153, label: '肠瘘'},
              ]},
              {value: 154, label: '眼科 ',children:[
                {value: 155, label: '感染'},
                {value: 156, label: '疼痛'},
                {value: 157, label: '瘢痕形成'},
                {value: 158, label: '增生'},
                {value: 159, label: '视力下降'},
              ]},
              {value: 160, label: '两腺外科 ',children:[
                {value: 161, label: '皮下积液'},
                {value: 162, label: '皮缘坏死'},
                {value: 163, label: '刀口渗出'},
                {value: 164, label: '饮水呛咳'},
                {value: 165, label: '声音嘶哑'},
              ]},
              {value: 166, label: '耳鼻喉科',children:[
                {value: 167, label: '鼻出血'},
                {value: 168, label: '发热'},
                {value: 169, label: '听力下降'},
                {value: 170, label: '嗅觉减退'},
                {value: 171, label: '扁桃体术后出血'},
                {value: 172, label: '呼吸困难'},
              ]},
              {value: 173, label: '肝胆外科',  children:[
                {value: 174, label: '胆瘘'},
                {value: 175, label: '胰瘘'},
                {value: 176, label: '脾瘘'},
              ]},
              {value: 177, label: '风湿 ', children:[
                {value: 178, label: '肺炎'},
                {value: 179, label: '泌尿系感染'},
                {value: 180, label: '柯兴氏综合征'},
                {value: 181, label: '口腔溃疡'},
              ]},
              {value: 182, label: '外科 ',children:[
                {value: 183, label: '切口不愈合'},
                {value: 184, label: '裂开'},
                {value: 185, label: '液化'},
                {value: 186, label: '术后感染'},
                {value: 187, label: '血栓'},
                {value: 188, label: '尿路感染'},
              ]},
              {value: 189, label: '手足 ',children:[
                {value: 190, label: '肌腱粘连'},
                {value: 191, label: '肌腱二次断裂'},
                {value: 192, label: '伤口感染'},
                {value: 193, label: '骨折不愈合'},
                {value: 194, label: '畸形愈合'},
                {value: 195, label: '指间关节强直'},
                {value: 196, label: '手功能障碍'},
              ]},
              {value: 197, label: '肛肠  ',children:[
                {value: 198, label: '发热'},
                {value: 199, label: '感染'},
                {value: 200, label: '肛瘘'},
                {value: 201, label: '肛管上皮缺损'},
              ]},
              {value: 202, label: '肾内 ',children:[
                {value: 203, label: '感染'},
                {value: 204, label: '血栓及栓塞并发症'},
                {value: 205, label: '高血压'},
                {value: 206, label: '贫血'},
                {value: 207, label: '酸碱失衡'},
                {value: 208, label: '代谢紊乱'},
                {value: 209, label: '结石'},
                {value: 210, label: '肾功能衰竭'},
              ]}
            ]
          }],
        zz: [
          {value: 100, label: '无症状',},
          {value: 1,label :"有症状",
            children: [
              {value: 2, label: '头痛'},
              {value: 3, label: '头晕目眩 '},
              {value: 4, label: '视物模糊 '},
              {value: 5, label: '言语困难'},
              {value: 6, label: '步态不稳 '},
              {value: 7, label: '肢体麻木 '},
              {value: 8, label: '肢体瘫痪'},
              {value: 9, label: '胸痛 '},
              {value: 10, label: '胸闷 '},
              {value: 11, label: '心慌'},
              {value: 12, label: '腹痛 '},
              {value: 13, label: '黄疸 '},
              {value:14, label: '发热'},
              {value: 15, label: '血尿 '},
              {value: 16, label: '水肿 '},
              {value: 17, label: '关节疼痛'},
              {value: 18, label: '排尿困难 '},
              {value: 19, label: '咳嗽 '},
              {value: 20, label: '咳痰'},
              {value: 21, label: '乏力 '},
              {value: 22, label: '出汗 '},
              {value: 23, label: '饥饿感'},
              {value: 24, label: '阴道流血 '},
              {value: 25, label: '皮肤瘙痒 '},
              {value: 26, label: '便秘 '},
              {value: 27, label: '黑便 '},
              {value: 28, label: '腹泻 '},
              {value: 29, label: '其他'},
            ]
          }],
        yyks:[
          {value: "100", label: '否'},
          {value: "1", label: '是',children:[]}
        ],
        bcsfpgValue: null
      }
    },
    created(){
      var that = this;
      that.personInfo = JSON.parse(sessionStorage.getItem('personInfo'));
      that.getMedicalList();
      that.getFormList(that.$route.params.id)
    },
    mounted(){
      var that = this;
    },
    methods: {
      onSubmit() {
        var that = this;
        console.log(that.personInfo);
        if(that.form.type == undefined){
          that.$message.error("随访方式未选择！")
          return
        }

        var formData = that.form;
        formData.patientId = that.personInfo.id;
        formData.visitAuthor =  that.$store.state.user.user.id;

        //数组转字符串
        if (formData.healthGuidanceContent instanceof Array){
          formData.healthGuidanceContent = that.form.healthGuidanceContent.join(',');
        }
        that.$http.post('/api'+`/visitRecord/updateVisitRecord`,formData)
          .then(res=>{
            formData.healthGuidanceContent = [];
            if (res.data){
              if (res.data){
                that.$message.success("修改随访成功！");
                setTimeout(()=>{
                  that.$router.replace({name:"EssentialInfo",params:{selectId:"sfjl"}});
                },1500)
              }else {
                that.$message.error("修改随访失败！");
              }
            }
            console.log(res)
          })
          .catch(err=>{
            that.$message.error("随访新增失败！")
            formData.healthGuidanceContent = [];
            console.log(err);
          })
      },
      cancelBtn(){
        this.$router.go(-1);
      },

      handleChange(value){
        console.log(value)
      },
      getMedicalList(){
        var that = this;
        that.$http.get('/api'+`/medicalSections/getMedicalSectionsPage?hospitalId=${that.$store.state.user.user.hospitalId.id}`)
          .then(res=>{
            for (let i=0; i<res.data.list.length; i++){
              that.yyks[1].children.push({value: ``+i+2,label:res.data.list[i].name})
            }
            console.log(res.data);
          })
          .catch(err=>{
            console.log(err);
          })
      },
      getFormList(id){
        var that = this;
        that.$http.get('/api'+`/visitRecord/getVisitRecordById?id=${id}`)
          .then(res=>{
            that.form = res.data;
            that.form.healthGuidanceContent = res.data.healthGuidanceContent.split(',');
          })
          .catch(err=>{
            console.log(err);
          })
      }
    }
  }
</script>

<style type="text/css" scoped>
  .cr_container{
    width: 100%;
    height: auto;
    min-height: 100%;
    /*padding: 30px 50px 80px 50px;*/
    background-color: #fff;
    padding: 0 20px;
  }

  .createVisit_form .el-select{
    width: 100%;
  }

  .createVisit_form .el-cascader{
    width: 100%;
  }


  .cr_title{
    height: 170px;
    /*background-color: #2DB7F5;*/
    border-bottom: 1px solid #999;
    margin-bottom: 30px;
    line-height: 170px;
  }

  .cr_titleContent{
    height: 170px;
    padding: 20px 30px 0;
  }

  .cr_titleContent p{
    height: 30px;
    line-height: 30px;
  }

  .cr_titleImg img{
    width: 100%;
    vertical-align: middle;
    margin-left: 10px;
  }

  .cr_titleTag{
    margin-left: 30px;
  }

  .el-input-number{
    width: 100%;
  }

</style>
