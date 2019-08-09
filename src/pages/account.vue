<template>
  <el-card class="box-card">
    <div>
      <h3>账号分配</h3>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input type="password" v-model="ruleForm.passWord"></el-input>
      </el-form-item>

      <el-form-item label="角色">
        <el-input v-model="roleName" disabled></el-input>
        <!-- <el-select v-model="ruleForm.roleId" placeholder="请选择角色">
          <el-option
            v-for="item in Rolelist"
            :label="item.roleName"
            :key="item.roleId"
            :value="item.roleId"
          ></el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item label="医院" prop="hospitalId" v-show="isHospital">
        <el-select v-model="ruleForm.hospitalId" placeholder="请选择医院">
          <el-option v-for="item in hospital" :label="item.name" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      isHospital: true,
      ruleForm: {},
      rules: {
        passWord: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        hospitalId: [
          { required: true, message: "请选择医院", trigger: "change" }
        ],
        // roleId: [{ required: true, message: "请选择角色", trigger: "change" }]
      },
      Rolelist: [],
      hospital: [],
      GroupList: [],
      roleName:''
    };
  },
  mounted() {
    if (this.$store.state.user.user.type == 3) {
      this.isHospital = false;
      this.ruleForm.roleId=2;
      this.roleName="医生"
    } else if(this.$store.state.user.user.type == 1){
      this.isHospital = true;
      this.ruleForm.roleId=3;
      this.roleName="医院管理员"
    }
    // 获取角色数据
    this.getRolelist();
    // 获取医院数据
    this.getHospital();
    // 获取组别数据
    this.getGroupList();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http.post("/api/user/addUser", this.ruleForm).then(res => {
            this.resetForm();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getRolelist() {
      this.$http.get("/api/user/getRoleList").then(res => {
        this.Rolelist = res.data;
      });
    },
    getHospital() {
      this.$http.get("/api/hospital/getHospitalListNoPage").then(res => {
        this.hospital = res.data;
      });
    },
    getGroupList() {
      this.$http.get("/api/groups/getGroupList").then(res => {
        this.GroupList = res.data;
      });
    }
  }
};
</script>

<style scoped>
h3 {
  height: 60px;
  line-height: 60px;
  background-color: #edfbf7;
  padding: 0 20px;
  margin: 0;
  font-size: 20px;
  margin-bottom: 30px;
}
</style>
