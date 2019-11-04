import ElCol from 'element-ui/packages/col/src/col'
import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue'
import tabHeader from '../../components/tabHeader'
import SelectInput from './selectInput.vue'
export default {
  components: {
    ElButton,
    ElCol,
    tabHeader,
    SelectInput
  },
  data () {
    return {
      show: false,
      form: {
        visitAuthor: '',
        patientId: '',
        visitRecordContent: {
          reactions: { value: '', desc: '' }, // 药物不良反应
          rheumatoid: { value: '', desc: '' }, // 类风湿结节触及部位
          dosages: [{ value: '', frequency: 0, dose: 0 }] // 用药情况
        },
        // complicationCategory: ''
      },
      personInfoId: '', // 患者Id
      personInfo: {}, // 患者信息
      planId: '', // 计划Id
      // 药物不良反应传入子组件的数据
      reactionsData: {
        selectLabel: '药物不良反应', // select选择框的label值
        inputLabel: '不良反应情况', // input输入框的label值
        // select下拉框的内容
        option: [
          { value: 0, label: '无不良反应' },
          { value: 1, label: '有不良反应' }
        ]
      },
      inputData3: null,
      inputData4: "",
      // 类风湿结节触及部位传入子组件的数据
      rheumatoidData: {
        selectLabel: '类风湿结节部位', // select选择框的label值
        inputLabel: '触及部位：', // input输入框的label值
        // select下拉框的内容
        option: [
          { value: 0, label: '未触及' },
          { value: 1, label: '已触及' }
        ],
        
      },
      inputData: null,
      inputData1: "",
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
        { value: 4, label: '控制满意' },
        {
          value: 3,
          label: '控制不满意',
          children: [
            { value: 1, label: '并发症' },
            { value: 2, label: '相关指标控制不佳' },
            { value: 5, label: '不良生活方式未改善' }
          ]
        }
      ],
      // 症状
      sfsymptom: [{ value: 0, label: '无症状' }, { value: 1, label: '有症状' }],
      sfsymptomName: [],
      // 痛风模板部位
      sfposition: [{ value: 0, label: '无' }, { value: 1, label: '有' }],
      sfpositionName: [
        { value: 0, label: '大拇指' },
        { value: 1, label: '踝关节' },
        { value: 2, label: '膝关节' },
        { value: 3, label: '足跟' },
        { value: 4, label: '腕关节' },
        { value: 5, label: '手指关节' },
        { value: 6, label: '肘关节' },
        { value: 7, label: '其他' }
      ],
      // 糖尿病分型
      sfdiabetes: [
        { value: 0, label: '1型糖尿病' },
        { value: 1, label: '2型糖尿病' },
        { value: 2, label: '妊娠期糖尿病' }
      ],
      // 皮肤
      sftskin: [
        { value: 0, label: '正常' },
        { value: 1, label: '破损' },
        { value: 2, label: '出血点' },
        { value: 3, label: '其他' }
      ],
      // 肿瘤模板饮食情况
      sftumoureat: [
        { value: 0, label: '流质饮食' },
        { value: 1, label: '半流质饮食' },
        { value: 2, label: '普通饮食' },
        { value: 3, label: '鼻饲饮食' },
        { value: 4, label: '其他' }
      ],
      // 肿瘤模板疼痛性质
      sfpainNature: [
        { value: 0, label: '无' },
        { value: 1, label: '酸痛' },
        { value: 2, label: '胀痛' },
        { value: 3, label: '刺痛' },
        { value: 4, label: '痉挛痛' },
        { value: 5, label: '麻刺痛' },
        { value: 6, label: '钝痛' },
        { value: 7, label: '电击痛' },
        { value: 8, label: '刀割痛' },
        { value: 9, label: '牵拉痛' },
        { value: 10, label: '灼烧痛' },
        { value: 11, label: '搏动性疼痛' },
        { value: 12, label: '其他' }
      ],
      // 肿瘤模板疼痛程度
      sfpainDegree: [
        { value: 0, label: '不影响睡眠' },
        { value: 1, label: '影响睡眠' }
      ],
      // 肿瘤模板疼痛控制情况
      sfcontrolSituation: [
        { value: 0, label: '满意' },
        { value: 1, label: '一般' },
        { value: 2, label: '不满意' }
      ],
      // 异常指标
      sfanomalyIndex: [
        { value: 0, label: '无' },
        { value: 1, label: '有' }
      ],
      // 体重
      sfweight: [
        { value: 0, label: '超重' },
        { value: 1, label: '普通' },
        { value: 2, label: '消瘦' },
        { value: 3, label: '其他' }
      ],
      inputData2: 0,
      // 慢阻肺饮食情况
      sfbiteAndSup: [
        { value: 0, label: '普通饮食' },
        { value: 1, label: '低盐饮食' },
        { value: 2, label: '低脂饮食' },
        { value: 3, label: '高燕饮食' },
        { value: 4, label: '其他' }
      ],
      // 康复治疗方式
      sftherapy: [
        { value: 1, label: '按摩' },
        { value: 2, label: '针灸' },
        { value: 3, label: '运动训练' },
        { value: 4, label: '其他方式' }
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
      // 是否运动
      sfsportSituation: [
        { value: 0, label: '无运动' },
        { value: 1, label: '有运动' }
      ],
      // 运动强度
      sfexerciseIntensity: [
        { value: 0, label: '低' },
        { value: 1, label: '中' },
        { value: 2, label: '高' }
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
      // 吸烟史
      sfsmokingHistory: [
        { value: 0, label: '无' },
        { value: 1, label: '有' }
      ],
      // 吸烟量
      sfsmokingVolume: [
        { value: 0, label: '未戒烟' },
        { value: 1, label: '已戒烟' }
      ],
      // 饮酒史
      sfdrinkingHistory: [
        { value: 0, label: '无' },
        { value: 1, label: '有' }
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

      // 药物剂量
      dosage: {},
      // 用药次数
      sfpharmacy: [
        { value: 0, label: '减少' },
        { value: 1, label: '增加' }
      ],
      // 是否需要用药
      sfisNeed: [
        { value: 0, label: '不需要服药' },
        { value: 1, label: '需要服药' }
      ],
      // 用药剂量
      sfdosage: [
        { value: 0, label: '不足剂量' },
        { value: 1, label: '超过剂量' }
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
        { value: 7, label: '戒烟限酒指导' },
        { value: 8, label: '并发症' },
        { value: 9, label: '其他' }
      ],
      // 疾病指导
      sfsickness: [
        { value: 1, label: '饮食指导' },
        { value: 2, label: '运动指导' },
        { value: 3, label: '注意事项指导' },
        { value: 4, label: '并发症指导' },
        { value: 5, label: '预防措施指导' }
      ],
      // 是否按时复诊
      sfisOnSchedule: [
        { value: 1, label: '是' },
        { value: 0, label: '否' }
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
      // 疾病知晓状况
      sfsicknessKnow: [
        { value: 0, label: '差' },
        { value: 1, label: '一般' },
        { value: 2, label: '良好' }
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
    // 类风湿结节部位输入框父组件接受子组件的值并放入
    rheumatoidSelect (data) {
      this.form.visitRecordContent.rheumatoid.value = data
    },
    rheumatoidInput (data) {
      this.form.visitRecordContent.rheumatoid.desc = data
    },
    // 药物不良反应输入框父组件接受子组件的值并放入
    reactionsSelect (data) {
      this.form.visitRecordContent.reactions.value = data
    },
    reactionsInput (data) {
      this.form.visitRecordContent.reactions.desc = data
    },
    // 返回按钮
    cancelBtn () {
      // this.$router.go(-1)
      this.$router.push({
        path: '/EssentialInfo',
        query: {
          name: 'sfjl'
        }
      })
    },
    // 获取随访详情
    getFormList (id) {
      this.$http
        .get('/api' + '/visitRecord/getVisitRecordById?id=' + id)
        .then(res => {
          if(res.error == 0) {
            this.form = res.data
            this.form.visitRecordContent = JSON.parse(
              res.data.visitRecordContent
            )// 将visitRecordContent解析为object类型
            console.log(this.form.visitRecordContent, '99')
            
            if(this.form.visitRecordContent.rheumatoid) {
              this.inputData1 = this.form.visitRecordContent.rheumatoid.desc
              this.inputData = this.form.visitRecordContent.rheumatoid.value
            }
            // debugger
            // if(res.error == 0) {
              if(this.form.visitRecordContent.weightType) {
                this.inputData2 = this.form.visitRecordContent.weightType
              }
              if(this.form.visitRecordContent.reactions) {
                this.inputData3 = this.form.visitRecordContent.reactions.value
                this.inputData4 = this.form.visitRecordContent.reactions.desc
              }
            // }
            if (res.data.department) {
              this.form.department = Number(res.data.department)// 将科室由str变为num
            }
            
            if (res.data.complication != null) {
              this.form.complication = res.data.complication
                .split(',')// 将并发症由str数组变为num数组
            }
            if (res.data.complicationCategory != null) {
              res.data.complicationCategory = String(res.data.complicationCategory)
            }
            // 如果有症状将请求症状数据symptom
            // if(res.error ==  0) {
              // if (this.form.visitRecordContent.issymptom === 1) {
              //     this.$http
              //       .get('/api' + `/common/getCommonDataList?dataType=0&sourceType=${this.form.templateType}`)
              //       .then(res => {
              //         if(res.error == 0) {
              //           this.sfsymptomName = res.data
              //           if (this.form.symptom != null) {
              //             this.$set(this.form, 'symptom', this.form.symptom.split(','))
              //             // this.form.symptom = this.form.symptom.split(',')// 将症状由str数组变为num数组
              //           }
              //         }
              //       })
              //       .catch(err => {
              //         console.log(err)
              //       })
              //   }
            // }
            // 有症状和并发症
            if (this.form.visitRecordContent.issymptom === 1 && this.form.visitRecordContent.iscomplication === 1) {
              this.$http
                .get('/api' + `/common/getCommonDataList?dataType=0&sourceType=${this.form.templateType}`)
                .then(res => {
                  if(res.error == 0) {
                    this.sfsymptomName = res.data
                    if (this.form.symptom != null) {
                      this.$set(this.form, 'symptom', this.form.symptom.split(','))
                      // this.form.symptom = this.form.symptom.split(',')// 将症状由str数组变为num数组
                    }
                    // 如果有并发症将请求并发症的分类数据
                    if (this.form.visitRecordContent.iscomplication === 1) {
                      this.$http
                        .get('/api' + `/common/getCommonDataList?dataType=1&sourceType=${this.form.templateType}`)
                        .then(res => {
                          this.sfbfz = res.data
                        })
                        .catch(err => {
                          console.log(err)
                        })
                      // 请求并发症具体数据
                      if (this.form.complicationCategory) {
                        this.$http
                          .get(
                            '/api' +
                            `/common/getCommonDataList?dataType=1&sourceType=${this.form.templateType}&dataNum=${
                            this.form.complicationCategory}`
                          )
                          .then(res => {
                            this.sfbfzName = res.data

                          })
                          .catch(err => {
                            console.log(err)
                          })
                      }else {
                        this.$http
                          .get(
                            '/api' +
                            `/common/getCommonDataList?dataType=1&sourceType=${this.form.templateType}`
                          )
                          .then(res => {
                            this.sfbfzName = res.data

                          })
                          .catch(err => {
                            console.log(err)
                          })
                      }
                    }
                  }
                })
                .catch(err => {
                  console.log(err)
                })
            }else if(this.form.visitRecordContent.issymptom === 1) {
              // 有症状
              this.$http
                .get('/api' + `/common/getCommonDataList?dataType=0&sourceType=${this.form.templateType}`)
                .then(res => {
                  if(res.error == 0) {
                    this.sfsymptomName = res.data
                    if (this.form.symptom != null) {
                      this.$set(this.form, 'symptom', this.form.symptom.split(','))
                      // this.form.symptom = this.form.symptom.split(',')// 将症状由str数组变为num数组
                    }
                  }
                })
                .catch(err => {
                  console.log(err)
                })
          }else if(this.form.visitRecordContent.iscomplication === 1) {
            //  如果有并发症将请求并发症的分类数据
            if (this.form.visitRecordContent.iscomplication === 1) {
              this.$http
                .get('/api' + `/common/getCommonDataList?dataType=1&sourceType=${this.form.templateType}`)
                .then(res => {
                  this.sfbfz = res.data
                })
                .catch(err => {
                  console.log(err)
                })
              // 请求并发症具体数据
              if (this.form.complicationCategory) {
                this.$http
                  .get(
                    '/api' +
                    `/common/getCommonDataList?dataType=1&sourceType=${this.form.templateType}&dataNum=${
                    this.form.complicationCategory}`
                  )
                  .then(res => {
                    this.sfbfzName = res.data

                  })
                  .catch(err => {
                    console.log(err)
                  })
              }else {
                this.$http
                  .get(
                    '/api' +
                    `/common/getCommonDataList?dataType=1&sourceType=${this.form.templateType}`
                  )
                  .then(res => {
                    this.sfbfzName = res.data

                  })
                  .catch(err => {
                    console.log(err)
                  })
              }
            }
          }
          }
          
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 请求科室数据
    getMedicalSectionsList () {
      this.$http.get(' /api' + `/medicalSections/getMedicalSectionsList?hospitalId=${this.$store.state.user.user.hospitalId.id}`)
        .then(res => {
          this.sfdepartment = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }

  },
  created () {
    this.planId = this.$route.query.planId // 获取计划Id
    this.personInfo = JSON.parse(sessionStorage.getItem('personInfo')) // 从session中获取患者信息
    this.getMedicalSectionsList()
    this.getFormList(this.$route.params.id) // 获取随访详情
  }
}
