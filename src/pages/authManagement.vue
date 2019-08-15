<template>
  <div class="aM_container">

    <h2>账号权限管理</h2>

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="">
      <el-tab-pane label="员工角色分配" name="first">
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane label="管理员" class="aM_content">
            <!--<span slot="label"><i class="el-icon-star-off" style="margin-right: 10px"></i>管理员</span>-->

            <el-row>
              <el-col :span="24">
                <h2 style="font-size: 26px">管理员</h2>
              </el-col>
            </el-row>

            <el-row>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span class="aM_CardTitle">分配角色</span>
                  <el-button class="f-right" type="success" round @click="submitAuth">提交</el-button>
                </div>
                <div>
                  <el-form>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="选择账户 : ">
                          <el-select v-model="accountValue" filterable placeholder="请选择账户" @change="chooseUser">
                            <el-option
                              v-for="item in accountOptions"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                               >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="选择用户 : ">
                          <el-select v-model="roleValue" filterable placeholder="请选择用户" @change="chooseRole">
                            <el-option
                              v-for="item in roleOptions"
                              :ruleKey="item.roleKey"
                              :key="item.roleId"
                              :label="item.roleName"
                              :value="[item.menus,item.roleId]">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
              </el-card>

              <el-card class="box-card" v-if="showCard">
                <div slot="header" class="clearfix">
                  <span class="aM_CardTitle">权限设置</span>
                </div>
                <div>
                  <div style="margin: 15px 0;"></div>
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox border v-for="item in roleCheckOptions" :label="item.label" :key="item.id" :value="item.id" :checked="true" disabled>{{item.label}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-card>

            </el-row>
          </el-tab-pane>

          <el-tab-pane label="医院管理者">
            <h2>暂无数据</h2>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <!--<el-tab-pane label="角色权限设置" name="second">-->
        <!--<el-tabs :tab-position="tabPosition">-->
          <!--<el-tab-pane label="管理员">管理员</el-tab-pane>-->
        <!--</el-tabs>-->
      <!--</el-tab-pane>-->
    </el-tabs>
  </div>
</template>


<script>
  import ElCol from 'element-ui/packages/col/src/col'
  import ElButton from '../../node_modules/element-ui/packages/button/src/button.vue'
  import tabHeader from '../components/tabHeader'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElForm from '../../node_modules/element-ui/packages/form/src/form.vue'

  export default {
    components: {
      ElForm,
      ElRow,
      ElButton,
      ElCol,
      tabHeader
    },
    name: 'createPlan',
    data () {
      return {
        activeName: 'first',
        tabPosition: 'left',
        accountValue: '',
        roleValue: '',
        accountOptions: [],
        roleOptions: [
          {value: '1', label: 'test1'},
          {value: '2', label: 'test2'},
          {value: '3', label: 'test3'},
          {value: '4', label: 'test4'},
          {value: '5', label: 'test5'}
        ],
        roleCheckOptions: [
          {id: '1', label: '患者管理', checkd: true},
          {id: '2', label: '待办事项', checkd: true},
          {id: '3', label: '统计分析', checkd: true},
          {id: '4', label: '权限管理', checkd: true}
        ],
        checkList: [],
        showCard: false,
        chooseUserId: null,
        chooseRoleId: null
      }
    },
    created () {
      var that = this
      that.getRoleList()
      that.getAccountList()
  },
    mounted () {

    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      getAccountList () {
        var that = this
        that.$http.get('/api' + `/doctor/getDoctorList`)
          .then(res => {
            that.accountOptions = res.data.list

          })
          .catch(err => {
            console.log(err)
          })
      },
      getRoleList () {
        var that = this
        that.$http.get('/api' + `/user/getRolesByUserId?userId=${that.$store.state.user.user.id}`)
          .then(res => {
            that.roleOptions = res.data
          })
          .catch(err => {
            console.log(err)
          })
      },
      chooseUser (value) {
        var that = this
        that.chooseUserId = value
      },
      chooseRole (value) {
        var that = this
        that.showCard = true
        that.roleCheckOptions = value[0]
        that.chooseRoleId = value[1]
      },
      submitAuth () {
        var that = this
        if (that.chooseUserId == null) {
          that.$message.error('您未选择账户')
          return
        }

        if (that.chooseRoleId == null) {
          that.$message.error('您未选择角色')
          return
        }

        that.$http.post('/api' + `/user/userAssignmentRoles`, {userId: that.chooseUserId, roleIds: `${that.chooseRoleId}`})
          .then(res => {
            if (res.data) {
              that.$message.success('操作成功！')
            } else {
              that.$message.error('操作失败！')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }


    }

  }
</script>

<style type="text/css" scoped>
  .aM_container{
    width: 100%;
    height: auto;
    min-height: 100%;
    padding: 30px 20px 80px 20px;
    background-color: #fff;
    box-sizing: border-box;
  }

  .aM_more{
    font-size: 14px;
    color: #4a6aff;
    margin-left: 30px;
  }

  .box-card{
    margin-bottom: 40px;
  }

  .box-card>>>.el-card__body{
    padding: 20px;
  }

  .box-card>>>.el-checkbox{
    margin: 10px;
  }

  .aM_content{
    width: 100%;
    height: 100%;
    padding: 10px 30px;
  }

  .aM_CardTitle{
    font-size: 22px;
  }


  .aM_title{
    height: 170px;
    /*background-color: #2DB7F5;*/
    border-bottom: 1px solid #999;
    margin-bottom: 30px;
    line-height: 170px;
  }

  .aM_titleContent{
    height: 170px;
    padding: 20px 30px 0;
  }

  .aM_titleContent p{
    height: 30px;
    line-height: 30px;
  }

  .aM_titleImg img{
    width: 100%;
    vertical-align: middle;
    margin-left: 10px;
  }

  .aM_titleTag{
    margin-left: 30px;
  }



</style>
