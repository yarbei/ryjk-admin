<template>
  <div>
    <tab-header :personInfo="personInfo"></tab-header>
    <el-form ref="form" :model="form" label-width="135px" class="createVisit_form">
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="随访状态 : ">
            <el-cascader
              v-model="form.status"
              placeholder="请选择随访状态"
              :options="sfstatus"
              :props="{emitPath: false}"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="随访结果 : ">
            <el-cascader
              v-model="form.result"
              placeholder="请选择随访结果"
              :options="sfresult"
              :props="{emitPath: false}"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="随访方式 : ">
            <el-cascader
              v-model="form.type"
              placeholder="请选择随访方式"
              :options="sftype"
              :props="{emitPath: false}"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="出院/转出情况:">
            <el-cascader
              v-model="form.dischargeStatus"
              placeholder="请选择出院/转出情况"
              :options="sfdischargeStatus"
              :props="{emitPath: false}"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="本次随访评估:">
            <el-cascader
              v-model="form.assessment"
              placeholder="请选择本次随访评估"
              :options="sfassessment"
              :props="{emitPath: false}"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

      <h2>项目随访情况</h2>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="请选择症状 : ">
            <el-cascader
              v-model="form.symptom"
              :options="sfsymptom"
              :props="{emitPath: false}"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

      <h2>生活方式</h2>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="总体评估 : ">
            <el-select v-model="form.lifeAssessment" placeholder="请选择">
              <el-cascader
              v-model="form.lifeAssessment"
              :options="sflifeAssessment"
              :props="{emitPath: false}"
              @change="handleChange"
            ></el-cascader>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
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
            <el-input-number v-model="form.smokingAmount" :min="0" :max="9999" label="支/天"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
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
            <el-input-number
              v-model="form.alcoholConsumptionAmount"
              :min="0"
              :max="9999"
              label="ML/天"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="膳食脂肪">
            <el-input v-model="form.dietaryFat"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

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

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="摄盐情况(克/天)">
            <el-input v-model="form.saltUptake"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="心理调整 : ">
            <el-select v-model="form.region" placeholder="请选择">
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
            <el-cascader
              v-model="form.complication"
              :options="sfyzz"
              :props="bfz"
              @change="handleChange"
            ></el-cascader>
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
            <el-input v-model="form.blood_coagulation" placeholder="自定义"></el-input>
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

      <h2>健康教育知晓</h2>

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
                :value="item.value"
              ></el-option>
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
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="复诊时间 : ">
            <el-date-picker v-model="form.revisitTime" type="date" placeholder="选择日期"></el-date-picker>
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
import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue'
import tabHeader from '../../components/tabHeader'

export default {
  components: {
    ElButton,
    ElCol,
    tabHeader
  },
  name: 'default',
  data () {
    return {
      form: {
        visitAuthor: '',
        patientId: '',
        motionNum: 0,
        motionLength: 0
      },
      // 随访状态
      sfstatus: [
        { value: '0', label: '未完成' },
        { value: '1', label: '已完成' }
      ],
      // 随访结果
      sfresult: [
        { value: '0', label: '非有效随访' },
        { value: '1', label: '有效随访' },
        { value: '2', label: '勿访' },
        { value: '3', label: '终止随访' }
      ],
      // 随访方式
      sftype: [
        { value: '1', label: '电话随访' },
        { value: '2', label: '在线随访' },
        { value: '3', label: '短信随访' }
      ],
      // 出院/转院情况
      sfdischargeStatus: [
        { value: '0', label: '其他市级医院' },
        { value: '1', label: '乡镇卫生医院治疗' },
        { value: '2', label: '村卫生室治疗' },
        { value: '3', label: '回家康复' },
        { value: '4', label: '痊愈回家' }
      ],
      // 随访评估
      sfassessment: [
        { value: '1', label: '并发症' },
        { value: '2', label: '相关指标控制不住' },
        { value: '3', label: '控制不满意' },
        { value: '4', label: '控制满意' },
        { value: '5', label: '不良生活方式未改善' }
      ],
      // 症状
      sfsymptom: [
        { value: 0, label: '无症状' },
        { value: 1, label: '有症状', children: [] }
      ],
      // 总体评估
      sflifeAssessment: [
        { value: 0, label: '无改善' },
        { value: 1, label: '有改善' }
      ],
      personInfoId: '',
      personInfo: {},
      dialogVisible: false,
      options: [
        { value: '1', label: '饮食指导' },
        {
          value: '2',
          label: '用药指导'
        },
        {
          value: '3',
          label: '注意事项'
        },
        {
          value: '4',
          label: '心理指导'
        },
        {
          value: '5',
          label: '睡眠指导'
        },
        {
          value: '6',
          label: '康复指导'
        },
        {
          value: '7',
          label: '戒烟限酒指导'
        }
      ],
      value1: '',
      bcsfpg: [
        { value: 4, label: '控制满意' },
        {
          value: 3,
          label: '控制不满意',
          children: [
            { value: 5, label: '不良生活方式未改善' },
            { value: 1, label: '并发症 ' },
            { value: 2, label: '相关指标控制不佳 ' }
          ]
        }
      ],
      bfz: { multiple: true },
      sfyzz: [
        { value: 0, label: '无并发症' },
        {
          value: 1,
          label: '有并发症 ',
          children: []
        }
      ],
      yyks: [
        { value: 0, label: '否' },
        { value: 1, label: '是', children: [] }
      ],
      bcsfpgValue: null
    }
  },
  created () {
    this.personInfoId = this.$route.params.id
    this.personInfo = JSON.parse(sessionStorage.getItem('personInfo')) // 从session中获取患者信息
    this.getMedicalList() // 获取科室列表
    this.getSymptomList() // 获取症状列表
    this.getComplicationList() // 获取并发症列表
  },
  mounted () {},
  methods: {
    // 点击完成随访
    onSubmit () {
      console.log(this.personInfo)
      if (this.form.type === '') {
        this.$message.warning('随访方式未选择！')
        return
      }

      var formData = this.form
      formData.patientId = this.personInfo.id // 患者ID，必传
      formData.visitAuthor = this.$store.state.user.user.id // 从store中获取用户ID，在这被作为随访人员ID

      // int类型转换
      formData.motionLength = Number(this.form.motionLength)
      formData.motionNum = Number(this.form.motionNum)

      // 数组转字符串
      if (formData.healthGuidanceContent instanceof Array) {
        formData.healthGuidanceContent = this.form.healthGuidanceContent.join(
          ','
        )
      }
      // 发送新增随访请求
      this.$http
        .post('/api' + `/visitRecord/insertVisitRecord`, formData)
        .then(res => {
          formData.healthGuidanceContent = []
          if (res.data) {
            this.$message.success('新增随访成功！')
            setTimeout(() => {
              this.$router.replace({
                name: 'EssentialInfo',
                params: { selectId: 'sfjl' }
              })
            }, 1500)
          } else {
            this.$message.error('新增随访失败！')
          }
        })
        .catch(err => {
          this.$message.error('随访新增失败！')
          formData.healthGuidanceContent = []
          console.log(err)
        })
    },
    // 返回按钮
    cancelBtn () {
      this.$router.go(-1)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleChange (value) {
      console.log(value)
    },
    // 获取科室方法
    getMedicalList () {
      this.$http
        .get(
          '/api' +
            `/medicalSections/getMedicalSectionsList?hospitalId=${this.$store.state.user.user.hospitalId.id}`
        )
        .then(res => {
          this.yyks[1].children = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取症状方法
    getSymptomList () {
      this.$http
        .get('/api' + `/common/getDataList?dataType=1`)
        .then(res => {
          this.sfsymptom[1].children = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取并发症方法
    getComplicationList () {
      this.$http
        .get('/api' + `/common/getDataList?dataType=2`)
        .then(res => {
          console.log(res)
          this.sfyzz[1].children = res.data
          console.log(this.sfyzz)
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
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
