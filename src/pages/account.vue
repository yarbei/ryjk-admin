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
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roleId" required>
        <el-select v-model="ruleForm.roleId" placeholder="请选择角色">
          <el-option
            v-for="item in Rolelist"
            :label="item.roleName"
            :key="item.roleId"
            :value="item.roleId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组名" prop="deptId" required>
        <el-select v-model="ruleForm.deptId" placeholder="请选择角色">
          <el-option
            v-for="item in GroupList"
            :label="item.groupName"
            :key="item.groupId"
            :value="item.groupName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医院" prop="hospitalId">
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
      ruleForm: {},
      rules: {
        passWord: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          { required: true, message: "请输入正确的手机号", trigger: "blur" }
        ],
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        deptId: [{ required: true, message: "请选择组名", trigger: "change" }],
        hospitalId: [
          { required: true, message: "请选择医院", trigger: "change" }
        ],
        roleId: [{ required: true, message: "请选择角色", trigger: "change" }]
      },
      Rolelist: [],
      hospital: [],
      GroupList: []
    };
  },
  mounted() {
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
            console.log(res.data);
            this.resetForm()
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
