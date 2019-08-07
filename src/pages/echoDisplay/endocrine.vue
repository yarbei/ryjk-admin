<template>
  <div>
    <tab-header :personInfo="personInfo"></tab-header>
    <el-form ref="form" :model="form" label-width="135px" class="createVisit_form">
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
          <h2>目前症状</h2>
        </div>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="有无症状 : ">
              <el-select
                v-model="form.visitRecordContent.issymptom"
                @change="sfsymptomChange($event,6)"
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
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="糖尿病分型 : ">
              <el-select v-model="form.visitRecordContent.diabetes" placeholder="请选择">
                <el-option
                  v-for="item in sfdiabetes"
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
        <el-row>
          <h3>血糖</h3>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="10">
            <el-form-item label="空腹血糖">
              <el-input-number v-model="form.visitRecordContent.bmbs" :min="0" :max="9999"></el-input-number>
            </el-form-item>
            <span class="unit">mmol/l</span>
          </el-col>
          <el-col :span="10">
            <el-form-item label="餐后两小时血糖">
              <el-input-number v-model="form.visitRecordContent.ambs" :min="0" :max="9999"></el-input-number>
            </el-form-item>
            <span class="unit">mmol/l</span>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="10">
            <el-form-item label="随机血糖">
              <el-input-number v-model="form.visitRecordContent.smbs" :min="0" :max="9999"></el-input-number>
            </el-form-item>
            <span class="unit">mmol/l</span>
          </el-col>
          <el-col :span="10">
            <el-form-item label="糖化血红蛋白">
              <el-input-number v-model="form.visitRecordContent.smbs" :min="0" :max="9999"></el-input-number>
            </el-form-item>
            <span class="unit">mmol/l</span>
          </el-col>
        </el-row>
        <el-row>
          <h3>血压</h3>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="10">
            <el-form-item label="高压">
              <el-input-number v-model="form.visitRecordContent.hypertension" :min="0" :max="9999"></el-input-number>
            </el-form-item>
            <span class="unit">mmHg</span>
          </el-col>
          <el-col :span="10">
            <el-form-item label="低压">
              <el-input-number v-model="form.visitRecordContent.hypotension" :min="0" :max="9999"></el-input-number>
            </el-form-item>
            <span class="unit">mmHg</span>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <div slot="header">
          <h2>生活方式</h2>
        </div>
        <el-row :gutter="0">
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
              <el-select
                v-model="form.smokingVolume"
                @change="smokingVolumeChange"
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
          <el-col :span="6">
            <el-form-item label="吸烟量">
              <el-input-number v-model="form.visitRecordContent.smokingAmount" :min="0" :max="9999"></el-input-number>
            </el-form-item>
            <span class="unit">支/天</span>
          </el-col>
        </el-row>

        <el-row :gutter="0">
          <el-col :span="8">
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
          <el-col :span="6">
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
        <el-row :gutter="0">
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
            <span style="float:right">（每日食盐摄入＜6克，为低盐饮食）</span>
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
            <span style="float:right">（每人每日摄入量＜25克[半两]）</span>
          </el-col>
        </el-row>
        <h2>早餐</h2>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="谷薯类">
              <el-input v-model="form.visitRecordContent.mcerealsPotatoes" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="蔬菜类">
              <el-input v-model="form.visitRecordContent.mvegetables" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="水果类">
              <el-input v-model="form.visitRecordContent.mfruits" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="豆乳类">
              <el-input v-model="form.visitRecordContent.msoybeanMilk" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="肉蛋类">
              <el-input v-model="form.visitRecordContent.mmeatEgg" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="油脂类">
              <el-input v-model="form.visitRecordContent.mgrease" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="其他">
              <el-input v-model="form.visitRecordContent.mother" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h2>午餐</h2>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="谷薯类">
              <el-input v-model="form.visitRecordContent.ncerealsPotatoes" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="蔬菜类">
              <el-input v-model="form.visitRecordContent.nvegetables" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="水果类">
              <el-input v-model="form.visitRecordContent.nfruits" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="豆乳类">
              <el-input v-model="form.visitRecordContent.nsoybeanMilk" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="肉蛋类">
              <el-input v-model="form.visitRecordContent.nmeatEgg" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="油脂类">
              <el-input v-model="form.visitRecordContent.ngrease" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="其他">
              <el-input v-model="form.visitRecordContent.nother" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h2>晚餐</h2>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="谷薯类">
              <el-input v-model="form.visitRecordContent.ecerealsPotatoes" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="蔬菜类">
              <el-input v-model="form.visitRecordContent.evegetables" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="水果类">
              <el-input v-model="form.visitRecordContent.efruits" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="豆乳类">
              <el-input v-model="form.visitRecordContent.esoybeanMilk" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="肉蛋类">
              <el-input v-model="form.visitRecordContent.emeatEgg" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="油脂类">
              <el-input v-model="form.visitRecordContent.egrease" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="其他">
              <el-input v-model="form.visitRecordContent.eother" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h2>加餐</h2>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="谷薯类">
              <el-input v-model="form.visitRecordContent.acerealsPotatoes" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="蔬菜类">
              <el-input v-model="form.visitRecordContent.avegetables" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="水果类">
              <el-input v-model="form.visitRecordContent.afruits" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="豆乳类">
              <el-input v-model="form.visitRecordContent.asoybeanMilk" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="肉蛋类">
              <el-input v-model="form.visitRecordContent.ameatEgg" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="油脂类">
              <el-input v-model="form.visitRecordContent.agrease" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="其他">
              <el-input v-model="form.visitRecordContent.aother" placeholder="自定义"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
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
          <el-col :span="8">
            <el-form-item label="运动强度 : ">
              <el-select v-model="form.visitRecordContent.exerciseIntensity" placeholder="请选择">
                <el-option
                  v-for="item in sfexerciseIntensity"
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
      </el-card>
      <el-card>
        <div slot="header">
          <h2>并发症</h2>
        </div>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-form-item label="是否有并发症状 : ">
              <el-select
                v-model="form.visitRecordContent.iscomplication"
                @change="complicationChange($event,6)"
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
              <el-select v-model="form.complicationCategory" @change="bfzChange($event,6)">
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
          <el-col :span="8" style="margin-left:-50px;">
            <el-form-item>
              <el-input-number v-model="dosage.frequency" :min="0" :max="9999" label="次"></el-input-number>
            </el-form-item>
            <span class="unit">次/日</span>
          </el-col>
          <el-col :span="8" style="margin-left:-50px;">
            <el-form-item>
              <el-input-number v-model="dosage.dose" :min="0" :max="9999" label="mg"></el-input-number>
            </el-form-item>
            <span class="unit">mg/次</span>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button
                style="float:right;background:#fff;"
                @click.prevent="removeDosage(dosage)"
              >删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button style="float:right;background:#fff;" @click.prevent="addDosage">新增</el-button>
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
          <h2>健康教育知晓</h2>
        </div>
        <el-row :gutter="0">
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
                format="yyyy-MM-dd "
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

      <el-form-item style="text-align: center">
        <el-button type="success" @click="onSubmit(6)">完成随访</el-button>
        <el-button @click="cancelBtn">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import "./index.css";
import echoDisplay from './index';
export default {
  components: echoDisplay.components,
  data: echoDisplay.data,
  created: echoDisplay.created,
  methods: echoDisplay.methods
};
</script>