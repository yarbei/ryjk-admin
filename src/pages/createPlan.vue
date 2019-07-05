<template>
  <div class="cp_container">
    <tab-header :personInfo="personInfo"></tab-header>
    <el-form ref="form" label-width="100px">
      <h2>疾病计划名称</h2>
      <el-input v-model="name" placeholder="请输入名称"></el-input>
      <h2>疾病计划时间</h2>
      <el-date-picker
        v-model="createDate"
        type="datetime"
        placeholder="选择时间"
        value-format="yyyy-MM-dd HH:mm:ss"
        :disabled="disabled"
      ></el-date-picker>
      <h2>管理随访总数</h2>
      <el-select v-model="dose" placeholder="请选择">
        <el-option v-for="item in number" :key="item.value" :label="item.value" :value="item.value"></el-option>
      </el-select>
      <h2>疾病计划分类</h2>
      <el-row>
        <el-col :span="24" v-for="(v,i) in planList" :key="i">
          <el-form-item :label="v.label">
            <el-input type="textarea" v-model="v.content" placeholder="请输入建议"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <h2>疾病必测体征项</h2>
      <el-checkbox-group v-model="slectedBodySignList">
        <el-checkbox
          v-for="item in bodySignList"
          :label="item.bodySignId"
          :key="item.bodySignId"
        >{{item.bodySignName}}</el-checkbox>
      </el-checkbox-group>
      <el-button @click="back" style="margin-left:10px;" class="submitBtn">取消</el-button>
      <el-button type="success" @click="onSubmit" class="submitBtn">发布</el-button>
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
      planId: null,
      dose: "",
      createDate: "", //新建计划时间
      disabled: false, //计划时间是否可以修改
      number: [
        {
          value: 1
        },
        {
          value: 2
        },
        {
          value: 3
        },
        {
          value: 4
        },
        {
          value: 5
        }
      ],
      name: "",
      date: "",
      user: {},
      planList: [
        {
          value: 1,
          label: "用药建议"
        },
        {
          value: 2,
          label: "饮食建议"
        },
        {
          value: 3,
          label: "运动建议"
        },
        {
          value: 4,
          label: "戒烟限酒建议"
        },
        {
          value: 5,
          label: "心理建议"
        },
        {
          value: 6,
          label: "康复建议"
        },
        {
          value: 7,
          label: "其他"
        }
      ],
      bodySignList: [],
      slectedBodySignList: [],
      form: {},
      // 患者信息
      personInfo: {}
    };
  },
  created() {
    // url存在planId时表示修改计划，没有则为新增计划
    const planId = this.$route.query.planId;
    this.planId = planId;
    if (planId) {
      this.disabled = true;
      this.getPlanInfo(planId);
    } else {
      this.getPlanList();
    }
    this.personInfo = JSON.parse(sessionStorage.getItem("personInfo"));
    this.user = JSON.parse(sessionStorage.getItem("loginUser"));
  },
  mounted() {
    this.getBodySignList();
  },
  methods: {
    //获取必测体征项
    getPlanInfo(id) {
      this.$http
        .get(`/api/plan/getPlanDetail?planId=${id}`)
        .then(res => {
          const data = res.data;
          this.name = data.name;
          this.dose = data.dose;
          const list = this.planList;
          this.planList = data.item.map((v, i) => {
            return {
              label: v.detailType,
              value: list[i].value,
              content: v.content
            };
          });
          this.slectedBodySignList = data.monitorItem;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取计划分类
    getPlanList() {
      this.$http
        .get(`/api/plan/getPlanItem`)
        .then(res => {
          this.planList = res.data;
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
      let list = this.planList.map((v, i) => {
        return {
          detailType: v.value,
          content: v.content
        };
      });

      const params = {
        departmentName: this.personInfo.departmentName,
        id: this.planId ? Number(this.planId) : null,
        dose: this.dose || 0,
        createDate: this.createDate || new Date(),
        name: this.name || "",
        patientId: this.personInfo.id,
        doctorId: this.user.id,
        monitorItem: this.slectedBodySignList.join(","),
        item: list
      };
      if (params.name == "") {
        this.$$message.warning("请填写计划名称！");
        return;
      }
      if (params.createDate == "") {
        this.$$message.warning("请选择计划时间！");
        return;
      }
      if (params.monitorItem == "") {
        this.$$message.warning("请选择必测体征项！");
        return;
      }
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
                    params: { selectId: "jhxx" }
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
                duration: 1000,
                onClose: () => {
                  this.$router.push({
                    name: "EssentialInfo",
                    params: { selectId: "jhxx" }
                  });
                }
              });
            } else {
              this.$message.error("新增计划失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style type="text/css">
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
</style>
