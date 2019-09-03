<template>
  <div class="cp_container">
    <tab-header :personInfo="personInfo"></tab-header>
    <el-form label-width="135px">
      <el-card>
        <div slot="header">
          <h2>疾病计划名称</h2>
        </div>
        <el-input v-model="name" placeholder="请输入名称" required></el-input>
      </el-card>
      <el-card>
        <div slot="header">
          <h2>管理随访总次数</h2>
        </div>
        <el-select
          v-model="dose"
          placeholder="请选择"
          @change="doseChange"
          style="margin-bottom:20px;"
          :disabled="isEdit"
        >
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
        <el-row :gutter="40" v-show="isVisit" v-for="item in visit" :key="item.id">
          <el-col :span="24">
            <el-form-item :label="'随访时间'+item.visitContent.id" style="width:100%;">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                style="margin-left:20px;"
                v-model="item.visitTime"
                placeholder="选择日期"
                :disabled="isEdit"
              ></el-date-picker>
              <el-button @click="openVisitAdvice(item.visitContent.id)">编辑具体建议内容</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-dialog :visible.sync="isVisitAdvice">
          <el-form-item label="用药建议">
            <el-input
              :disabled="isEdit"
              type="textarea"
              v-model="adviceDesc.drug"
              placeholder="请输入建议"
            ></el-input>
          </el-form-item>
          <el-form-item label="饮食建议">
            <el-input
              :disabled="isEdit"
              type="textarea"
              v-model="adviceDesc.diet"
              placeholder="请输入建议"
            ></el-input>
          </el-form-item>
          <el-form-item label="运动建议">
            <el-input
              :disabled="isEdit"
              type="textarea"
              v-model="adviceDesc.motion"
              placeholder="请输入建议"
            ></el-input>
          </el-form-item>
          <el-form-item label="戒烟限酒建议">
            <el-input
              :disabled="isEdit"
              type="textarea"
              v-model="adviceDesc.smok"
              placeholder="请输入建议"
            ></el-input>
          </el-form-item>
          <el-form-item label="心理建议">
            <el-input
              :disabled="isEdit"
              type="textarea"
              v-model="adviceDesc.psychology"
              placeholder="请输入建议"
            ></el-input>
          </el-form-item>
          <el-form-item label="康复建议">
            <el-input
              :disabled="isEdit"
              type="textarea"
              v-model="adviceDesc.recovery"
              placeholder="请输入建议"
            ></el-input>
          </el-form-item>
          <el-form-item label="其他">
            <el-input
              :disabled="isEdit"
              type="textarea"
              v-model="adviceDesc.other"
              placeholder="请输入建议"
            ></el-input>
          </el-form-item>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isVisitAdvice=false">取 消</el-button>
            <el-button type="primary" @click="confirmVisitAdvice">确 定</el-button>
          </div>
        </el-dialog>
      </el-card>
      <el-card>
        <div slot="header">
          <h2>疾病必测体征项</h2>
        </div>
        <el-checkbox-group v-model="slectedBodySignList">
          <el-checkbox
            v-for="item in bodySignList"
            :label="item.bodySignId"
            :key="item.bodySignId"
          >{{item.bodySignName}}</el-checkbox>
        </el-checkbox-group>
      </el-card>
      <el-button @click="back" style="margin-left:10px;" class="submitBtn">取消</el-button>
      <el-button type="success" @click="onSubmit" class="submitBtn">发布</el-button>
    </el-form>
  </div>
</template>


<script>
import ElCol from "element-ui/packages/col/src/col";
import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
import tabHeader from "../components/tabHeader";
import { constants } from "fs";

export default {
  components: {
    ElButton,
    ElCol,
    tabHeader
  },
  name: "createPlan",
  data() {
    return {
      isVisitAdvice: false, //随访建议弹窗是否显示
      visitDescId: "", //点击查看随访详情的Id
      adviceDesc: {}, //点击查看随访详情弹窗绑定的数据
      isEdit: false, //根据planId是否存在决定是否可修改
      planId: "", //根据是否存在planId判断是新增还是修改
      dose: "",
      name: "",
      user: {},
      bodySignList: [],
      slectedBodySignList: [],
      personInfo: {},
      visit: [], //随访时间，内容
      isVisit: false //随访时间、内容是否显示
    };
  },
  created() {
    // url存在planId时表示修改计划，没有则为新增计划
    this.planId = this.$route.query.planId;
    if (this.planId) {
      this.getPlanInfo(this.planId);
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
    this.personInfo = JSON.parse(sessionStorage.getItem("personInfo"));
    this.user = JSON.parse(sessionStorage.getItem("loginUser"));
  },
  mounted() {
    this.getBodySignList();
  },
  methods: {
    //查看随访建议
    openVisitAdvice(id) {
      this.isVisitAdvice = true;
      this.visitDescId = id;
      this.adviceDesc = this.visit[id - 1].visitContent;
    },
    //确认随访建议
    confirmVisitAdvice() {
      this.isVisitAdvice = false;
      this.visit[this.visitDescId - 1].visitContent = this.adviceDesc;
    },
    //选择随访总数
    doseChange(event) {
      if (event) {
        this.isVisit = true;
        this.visit = [];
        for (let i = 1; i <= event; i++) {
          this.visit.push({
            visitTime: "",
            visitContent: {
              id: i
            }
          });
        }
      } else {
        this.isVisit = false;
      }
    },
    //获取计划详情
    getPlanInfo(id) {
      this.$http
        .get(`/api/plan/getPlanDetail?planId=${id}`)
        .then(res => {
          this.name = res.data.name;
          this.dose = res.data.dose;
          this.doseChange(this.dose);
          this.visit = res.data.visitManager;
          this.visit.forEach(item => {
            item.visitContent = JSON.parse(item.visitContent);
          });
          this.slectedBodySignList = res.data.monitorItem;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取体征列表
    getBodySignList() {
      this.$http
        .get(`/api/bodySignRecord/getBodySignList`)
        .then(res => {
          this.bodySignList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击取消
    back() {
      this.$router.go(-1);
    },
    //点击发布
    onSubmit() {
      if (this.name === "") {
        this.$message.warning("请填写计划名称！");
        return;
      }
      if (this.dose === "") {
        this.$message.warning("请选择随访总数！");
        return;
      } else {
        for (let i = 0; i < this.visit.length; i++) {
          if (this.visit[i].visitTime === "") {
            this.$message.warning("请选择随访时间！");
            break;
            return;
          }
        }
      }
      if (this.slectedBodySignList == "") {
        this.$message.warning("请选择必测体征项！");
        return;
      }
      console.log(this.selectedBodySignList)
      var visitManager=JSON.parse(JSON.stringify(this.visit));
      const params = {
        departmentName: this.personInfo.departmentName,
        id: this.planId ? Number(this.planId) : null,
        name: this.name || "",
        dose: Number(this.dose),
        visitManager: visitManager,
        patientId: this.personInfo.id,
        doctorId: this.user.id == undefined ? 0 : this.user.id,
        monitorItem: this.slectedBodySignList.join(",")
      };
      params.visitManager.forEach(item => {
        item.visitContent = JSON.stringify(item.visitContent);
      });

      if (this.planId) {
        this.$http
          .post(`/api/plan/updatePlan`, params)
          .then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "修改计划成功",
                duration: 1000,
                onClose: () => {
                  this.$router.push({
                    name: "EssentialInfo",
                    query: { name: "jhxx" }
                  });
                }
              });
            } else {
              this.$message.error("修改计划失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$http
          .post(`/api/plan/addPlan`, params)
          .then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "新增计划成功",
                duration: 1000
                // onClose: () => {
                //   this.$router.push({
                //     name: "EssentialInfo",
                //     query: { name: "jhxx" }
                //   });
                // }
              });
              this.$router.push({
                name: "EssentialInfo",
                query: { name: "jhxx" }
              });
            } else {
              this.$message.error("新增计划失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style type="text/css">
.closeAdvise {
  float: right;
  cursor: pointer;
}
.box {
  position: absolute;
  top: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
}
.cp_container {
  width: 100%;
  height: auto;
  min-height: 100%;
  /*padding: 30px 50px 80px 50px;*/
  background-color: #fff;
}

.cp_title {
  height: 170px;
  /*background-color: #2DB7F5;*/
  border-bottom: 1px solid #999;
  margin-bottom: 30px;
  line-height: 170px;
}

.cp_titleContent {
  height: 170px;
  padding: 20px 30px 0;
}

.cp_titleContent p {
  height: 30px;
  line-height: 30px;
}

.cp_titleImg img {
  width: 100%;
  vertical-align: middle;
  margin-left: 10px;
}

.cp_titleTag {
  margin-left: 30px;
}

.submitBtn {
  margin-top: 30px;
  margin-bottom: 30px;
  float: right;
}
.el-card {
  margin-top: 10px;
}
  .el-form-item label:after {
    content: " ";
    display: inline-block;
    width: 100%;
  }

  .el-form-item__label {
    padding-left: 20px;
    text-align: justify;
  }
  /* 这里去除必选字段的*,这个符号会造成一定影响,去掉之后我用了li列表进行定位,在前面加上" * ". */
  .el-form-item.is-required .el-form-item__label:before {
    content: none !important;
  }
</style>
