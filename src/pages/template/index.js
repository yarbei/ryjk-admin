import ElCol from 'element-ui/packages/col/src/col'
import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue'
import tabHeader from '../../components/tabHeader'
export default {
  components: {
    ElButton,
    ElCol,
    tabHeader
  },
  data () {
    return {
      form: {
        visitAuthor: '',
        patientId: '',
        visitRecordContent: {
          reactions: {value: '', desc: ''}, // 药物不良反应
          rheumatoid: {value: '', desc: ''}, // 类风湿结节触及部位
          dosages: [{ value: '', frequency: 0, dose: 0 }] // 用药情况
        }
      },
      isReactions: false, // 药物不良反应输入框
      isSmokingAmount: false, // 抽烟情况输入框
      isAlcoholConsumptionAmount: false, // 饮酒情况输入框
      isAppointmentRevisit: false, // 预约科室及复诊时间输入框
      ishealthGuidanceContent: false, // 健康指导内容输入框
      iscomplication: false, // 并发症选择框
      iscomplicationName: false, // 具体并发症选择框
      issfsymptomName: false, // 症状名称
      isrheumatoid: false, // 类风湿结节触及部位输入框
      personInfoId: '', // 患者Id
      personInfo: {}, // 患者信息
      planId: '', // 计划Id
      // 随访状态
      sfstatus: [{ value: 0, label: '未完成' }, { value: 1, label: '已完成' }],
      // 随访结果
      sfresult: [
        { value: 0, label: '非有效随访' },
        { value: 1, label: '有效随访' },
        { value: 2, label: '勿访' },
        { value: 3, label: '终止随访' }
      ],
      // 随访方式
      sftype: [
        { value: 1, label: '电话随访' },
        { value: 2, label: '在线随访' },
        { value: 3, label: '短信随访' }
      ],
      // 出院/转院情况
      sfdischargeStatus: [
        { value: 0, label: '其他市级医院' },
        { value: 1, label: '乡镇卫生医院治疗' },
        { value: 2, label: '村卫生室治疗' },
        { value: 3, label: '回家康复' },
        { value: 4, label: '痊愈回家' }
      ],
      // 随访评估
      sfassessment: [
        { value: 1, label: '并发症' },
        { value: 2, label: '相关指标控制不住' },
        { value: 3, label: '控制不满意' },
        { value: 4, label: '控制满意' },
        { value: 5, label: '不良生活方式未改善' }
      ],
      // 症状
      sfsymptom: [{ value: 0, label: '无症状' }, { value: 1, label: '有症状' }],
      sfsymptomName: [],
      // 类风湿结节触及部位
      sfrheumatoid: [
        { value: 0, label: '未触及' },
        { value: 1, label: '已触及' }
      ],
      // 个人卫生
      sfhygiene: [
        { value: 0, label: '会阴护理' },
        { value: 1, label: '刷牙' },
        { value: 2, label: '洗脚' },
        { value: 3, label: '淋浴' }
      ],
      // 心理状况
      sfpsychology: [
        { value: 0, label: '愉悦' },
        { value: 1, label: '低落' },
        { value: 2, label: '感觉身心疲惫' }
      ],
      // 母乳喂养
      sfbreastFeeding: [
        { value: 0, label: '纯母乳喂养' },
        { value: 1, label: '混合喂养' },
        { value: 2, label: '人工喂养' }
      ],
      // 新生儿黄疸
      sfjaundice: [
        { value: 0, label: '已退' },
        { value: 1, label: '轻' },
        { value: 2, label: '重' }
      ],
      // 脐带脱落
      sffunicle: [{ value: 1, label: '是' }, { value: 0, label: '否' }],
      // 疫苗接种
      sfvaccine: [
        { value: 1, label: '正常接种' },
        { value: 0, label: '需要补种' }
      ],
      // 皮肤清洁
      sfskin: [{ value: 1, label: '是' }, { value: 0, label: '否' }],
      // 睡眠情况
      sfsleep: [
        { value: 2, label: '良好' },
        { value: 1, label: '一般' },
        { value: 0, label: '差' }
      ],
      // 生活自理情况
      sflife: [
        { value: 0, label: '完全自理' },
        { value: 1, label: '部分自理' },
        { value: 2, label: '完全不能自理' }
      ],
      // 营养均衡
      sfnutrition: [{ value: 1, label: '是' }, { value: 0, label: '否' }],
      // 饮食习惯
      sfdiet: [
        { value: 0, label: '喜甜' },
        { value: 1, label: '喜咸' },
        { value: 2, label: '喜烫食' },
        { value: 3, label: '喜油炸' }
      ],
      // 水果蔬菜
      sffruits: [{ value: 0, label: '少' }, { value: 1, label: '多' }],
      // 奶豆
      sfmilk: [{ value: 0, label: '少' }, { value: 1, label: '多' }],
      // 饮食次数
      sfeat: [{ value: 0, label: '3次' }, { value: 1, label: '多于3次' }],
      // 低盐饮食
      sflsalt: [{ value: 1, label: '是' }, { value: 0, label: '否' }],
      // 低脂饮食
      sflfat: [{ value: 1, label: '是' }, { value: 0, label: '否' }],
      // 总体评估
      sflifeAssessment: [
        { value: 0, label: '无改善' },
        { value: 1, label: '有改善' }
      ],
      // 吸烟量
      sfsmokingVolume: [
        { value: 0, label: '未戒烟' },
        { value: 1, label: '已戒烟' }
      ],
      // 饮酒量
      sfalcoholConsumption: [
        { value: 0, label: '未减量' },
        { value: 1, label: '已减量' }
      ],
      // 心理调整
      sfregion: [
        { value: 0, label: '差' },
        { value: 1, label: '一般' },
        { value: 2, label: '良好' }
      ],
      // 医从性
      sfmedicalCompliance: [
        { value: 0, label: '差' },
        { value: 1, label: '一般' },
        { value: 2, label: '良好' }
      ],
      // 并发症
      sfcomplication: [
        { value: 0, label: '无并发症' },
        { value: 1, label: '有并发症 ' }
      ],
      sfbfz: [], // 并发症分类
      sfbfzName: [], // 并发症具体名字
      // 依从性
      sfmedicationCompliance: [
        { value: 0, label: '不服药' },
        { value: 1, label: '间断' },
        { value: 2, label: '规律' }
      ],
      // 药物不良反应
      sfreactions: [
        { value: 0, label: '无不良反应' },
        { value: 1, label: '有不良反应' }
      ],
      // 健康指导
      sfhealthGuidance: [{ value: 1, label: '是' }, { value: 0, label: '否' }],
      // 健康指导内容
      sfhealthGuidanceContent: [
        { value: 1, label: '饮食指导' },
        { value: 2, label: '用药指导' },
        { value: 3, label: '注意事项' },
        { value: 4, label: '心理指导' },
        { value: 5, label: '睡眠指导' },
        { value: 6, label: '康复指导' },
        { value: 7, label: '戒烟限酒指导' }
      ],
      // 已提醒复诊
      sfreminderRevisit: [
        { value: 1, label: '已提醒' },
        { value: 0, label: '未提醒' }
      ],
      // 已预约复诊
      sfappointmentRevisit: [
        { value: 1, label: '已预约' },
        { value: 0, label: '未预约' }
      ],
      // 预约科室
      sfdepartment: [],
      // 健康知晓度
      sfhealthAwareness: [
        { value: 0, label: '差' },
        { value: 1, label: '一般' },
        { value: 2, label: '良好' },
        { value: 3, label: '优秀' }
      ],
      // 满意度调研
      sfsatisfactionSurvey: [
        { value: 0, label: '不满意' },
        { value: 1, label: '基本满意' },
        { value: 2, label: '满意' },
        { value: 3, label: '非常满意' }
      ]
    }
  },
  methods: {
    // 选择是否有症状决定是否弹出症状选择框
    sfsymptomChange (event, sourceType) {
      if (event === 1) {
        this.issfsymptomName = true
        this.$http
          .get('/api' + '/common/getDataList?dataType=1&sourceType=' + sourceType)
          .then(res => {
            this.sfsymptomName = res.data
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.issfsymptomName = false
      }
    },
    // 选择是否有药物不良反应决定是否弹出不良反应输入框
    reactionsChange (event) {
      if (event === 1) {
        this.isReactions = true
      } else {
        this.isReactions = false
      }
    },
    // 选择是否戒烟决定是否弹出抽烟情况输入框
    smokingVolumeChange (event) {
      if (event === 0) {
        this.isSmokingAmount = true
      } else {
        this.isSmokingAmount = false
      }
    },
    // 选择是否戒酒决定是否弹出饮酒情况输入框
    alcoholConsumptionChange (event) {
      if (event === 0) {
        this.isAlcoholConsumptionAmount = true
      } else {
        this.isAlcoholConsumptionAmount = false
      }
    },
    // 选择是否预约复诊决定是否弹出预约科室及复诊时间输入框
    appointmentRevisitChange (event) {
      if (event === 1) {
        this.isAppointmentRevisit = true
        this.$http
          .get(
            ' /api' +
            `/medicalSections/getMedicalSectionsList?hospitalId=${this.$store.state.user.user.hospitalId.id}`
          )
          .then(res => {
            this.sfdepartment = res.data
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.isAppointmentRevisit = false
      }
    },
    // 选择是否进行健康指导决定是否显示健康指导内容输入框
    healthGuidanceChange (event) {
      if (event === 1) {
        this.ishealthGuidanceContent = true
      } else {
        this.ishealthGuidanceContent = false
      }
    },
    // 选择是否有并发症决定是否弹出并发症选择框
    complicationChange (event, sourceType) {
      if (event === 1) {
        this.iscomplication = true
        this.$http
          .get('/api' + '/common/getDataList?dataType=2&sourceType=' + sourceType)
          .then(res => {
            this.sfbfz = res.data
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.iscomplication = false
      }
    },
    // 选择并发症类型决定是否弹出并发症名字选择框
    bfzChange (event, sourceType) {
      if (event) {
        this.iscomplicationName = true
      } else {
        this.iscomplicationName = false
      }
      this.$http
        .get('/api' + '/common/getDataList?dataType=2&dataNum=' + event + '&sourceType=' + sourceType)
        .then(res => {
          this.sfbfzName = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 新增一条用药情况
    addDosage () {
      this.form.visitRecordContent.dosages.push({
        eventue: '',
        frequency: 0,
        dose: 0
      })
    },
    // 删除一条用药情况
    removeDosage (item) {
      var index = this.form.visitRecordContent.dosages.indexOf(item)
      if (index !== -1) {
        this.form.visitRecordContent.dosages.splice(index, 1)
      }
      if (index !== -1) {
        this.form.visitRecordContent.dosages.splice(index, 1)
      }
    },

    // 点击完成随访
    onSubmit (templateType) {
      if (this.form.status === undefined) {
        this.$message.warning('随访状态未选择！')
        return
      }
      if (this.form.result === undefined) {
        this.$message.warning('随访结果未选择！')
        return
      }
      if (this.form.type === undefined) {
        this.$message.warning('随访方式未选择！')
        return
      }
      if (this.form.dischargeStatus === undefined) {
        this.$message.warning('出院/转院情况未选择！')
        return
      }
      if (this.form.assessment === undefined) {
        this.$message.warning('本次随访评估未选择！')
        return
      }
      var formData = this.form
      formData.patientId = this.personInfo.id // 患者ID，必传
      formData.visitAuthor = this.$store.state.user.user.id // 从store中获取用户ID，在这被作为随访人员ID
      formData.planId = this.planId // 计划Id
      formData.templateType = templateType // 模板Id
      // 数组转字符串complication
      if (formData.complication && formData.complication instanceof Array) {
        formData.complication = this.form.complication.join(',')
      }
      if (formData.symptom && formData.symptom instanceof Array) {
        formData.symptom = this.form.symptom.join(',')
      }
      var str = JSON.stringify(formData.visitRecordContent)
      formData.visitRecordContent = str
      // 发送新增随访请求
      this.$http
        .post(
          '/api' + '/visitRecord/insertVisitRecord',
          formData
        )
        .then(res => {
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
          console.log(err)
        })
    },
    // 返回按钮
    cancelBtn () {
      this.$router.go(-1)
    }
  },
  created () {
    this.planId = this.$route.query.planId // 获取计划Id
    this.personInfo = JSON.parse(sessionStorage.getItem('personInfo')) // 从session中获取患者信息
  }
}
