<template>
  <div class="fullscreen">
    <div class="login-box">
      <!--<p class="text-tips">你好，欢迎登录</p>-->
      <form action class="login-form">
        <div class="loginImg" style="text-align: center">
          <img src="../assets/logo.png" alt class="logo" />
        </div>
        <div class="m-list-group">
          <div
            class="m-list-group-item m-list-group-select"
            style="padding: 0 !important;"
            v-show="isselect"
          >
            <el-select v-model="roleType" size="medium" placeholder="选择角色">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>

          <div class="m-list-group-item">
            <input type="text" placeholder="请输入账户名" class="m-input" v-model="username" />
          </div>
          <div class="m-list-group-item">
            <input type="password" placeholder="请输入账户密码" class="m-input" v-model="password" />
          </div>
        </div>
        <button class="m-btn sub select-none" @click.prevent="userLogin" v-loading="isLoging">登录</button>
      </form>
      <div style="margin-top: 50px"></div>
      <p class="text-tips">
        <span class="footer-text">
          {{appName}} &nbsp;
          <el-tag size="mini">{{version}}</el-tag>
        </span>
      </p>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import utils from '../utils/utils';

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      selectStr: "",
      roleType: "",
      isLoging: false,
      isselect: false,
      author: window.APP_INFO.author,
      version: window.APP_INFO.version,
      appName: window.APP_INFO.appName,
      options: [
        {
          value: 2,
          label: "疾病管理师 "
        },
        {
          value: 3,
          label: "医生"
        }
      ]
    };
  },
  methods: {
    ...mapActions(["login", "admin"]),
    userLogin() {

      if (!this.username || !this.password) {
        return this.$message.error("用户名和密码不能为空");
      }
      if (this.roleType == null) {
        return this.$message.error("未选择角色");
      }

      this.isLoging = true;
      this.$http
        .get(
          "/api" +
            `/user/login?userAccount=${this.username}&password=${this.password}&roleType=${this.roleType}`
        )
        .then(res => {
          console.log(res)
          if (res.data) {
            this.$message.success("登录成功");
            sessionStorage.setItem("loginUser", JSON.stringify(res.data));
            this.$store.commit("SET_LOGIN_USER", res.data);
            this.$store.commit(
              "SET_LOGIN_TOKEN",
              "4eea90fd-2752-481d-ae67-c75f8641a94a"
            );
            this.isLoging = false;
            //todo 删除假信息
            res.data.yunXinAccount = 'test99';
            res.data.yunXinToken = '123456';
            this.loginIM(res.data.yunXinAccount,res.data.yunXinToken);
           
          } else {
            this.$message({
              message: "登录失败！",
              type: "error"
            });
            this.isLoging = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    loginIM(account,pwd){
      //todo 如果用接口返回的用户名密码，就不用md5加密
      let token = pwd == '123456' ? utils.MD5(pwd) : pwd;
      this.$http
      .get(
        "https://lbs.netease.im/lbs/webconf.jsp?" +`k=${token}&id=${account}`+"&sv=52&pv=1" 
      ).then(res => {
        utils.setCookie('uid', account.toLocaleLowerCase());
        utils.setCookie('sdktoken', token);
        sessionStorage.setItem('sdkuid',account.toLocaleLowerCase())
        sessionStorage.setItem('sdktoken',token)
        this.$router.push({ name: "home" });
      })
    }
  },
  created() {
    if (this.$route.name == "login") {
      this.isselect = true;
      this.roleType = '';
    } else if (this.$route.name == "admin") {
      this.isselect = false;
      this.roleType = 1;
    }
    sessionStorage.removeItem("loginUser");
    sessionStorage.removeItem("token");
    this.$store.commit("SET_LOGIN_USER", null);
  },
  watch: {
    $route(to, from) {
      if (this.$route.name == "login") {
        this.isselect = true;
        this.roleType = '';
      } else if (this.$route.name == "admin") {
        this.isselect = false;
        this.roleType = 1;
      }
    }
  }
};
</script>


<style type="text/css" scoped>
.m-list-group {
  border-radius: 3px;
  padding: 0;
  margin: 0 0 20px;
}
.m-list-group .m-list-group-item {
  position: relative;
  display: block;
  padding: 6px 10px;
  background-color: #fff;
  border: 1px solid #e7ecee;
  margin-bottom: 10px;
}
.m-list-group .m-list-group-select {
  padding: 0;
  border: 0;
}
.m-list-group .m-list-group-select .el-select {
  width: 100% !important;
  height: 50px !important;
}

.m-list-group .m-list-group-select .el-select >>> .el-input__inner {
  height: 50px;
}

.login-form {
  background-color: rgba(255, 255, 255, 0.45);
  padding: 15px;
  border-radius: 10px;
  height: 360px;
  position: relative;
  box-sizing: border-box;
  padding-top: 80px;
}

.loginImg {
  position: absolute;
  top: -80px;
  width: 100%;
  margin-left: -20px;
}

.m-list-group .m-list-group-item:first-child {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.m-list-group .m-list-group-item:last-child {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.fullscreen {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../assets/login_bg.png") no-repeat;
  background-color: rgba(0, 0, 0, 0.66);
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  position: relative;
  width: 360px;
  padding: 0px 15px;
}
.login-box .logo {
  max-width: 40%;
  margin-bottom: 30px;
}
.login-box .text-tips {
  text-align: center;
  color: #fff;
}
.login-box .m-input {
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  box-sizing: border-box;
}
.login-box .m-btn {
  font-size: 18px;
  width: 100%;
  color: #fff;
  background-color: #1bc19d;
  display: inline-block;
  padding: 10px 12px;
  margin-bottom: 5px;
  line-height: 1.42857143;
  text-align: center;
  cursor: pointer;
  outline: none;
  border-radius: 2px;
  border: 1px solid #82d7c0;
  box-sizing: border-box;
  text-decoration: none;
}
.login-box .m-btn.m-btn-text {
  background: #fff;
  color: #82d7c0;
}
.login-box .m-btn:hover {
  background-color: #82d7c0;
}
.login-box .m-btn.m-btn-text:hover {
  background-color: #f4f5f5;
}
.login-box .m-btn:active {
  opacity: 0.8;
}
@media (max-width: 768px) {
  .login-box {
    width: auto;
  }
}
</style>
