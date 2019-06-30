<template>
  <section class="table_container">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers"><i class="el-icon-search" style="margin-right: 5px"></i>搜索</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="usersList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="name" align="center" label="名称" sortable>
      </el-table-column>
      <el-table-column prop="groupId.groupName" align="center" label="上级角色" sortable>
      </el-table-column>
      <el-table-column prop="idCard" align="center" label="别名" sortable>
      </el-table-column>


      <el-table-column align="center" label="操作" min-width="160">
        <template slot-scope="scope">
          <el-button round type="success"  @click="createPlan(scope.$index, scope.row)">修改</el-button>
          <el-button round type="primary"  @click="essentialInfo(scope.$index, scope.row)">删除</el-button>
          <el-button round type="warning" @click="createVisit(scope.$index, scope.row)">角色分配</el-button>
          <el-button round type="danger"  @click="handleDel(scope.$index, scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar toolbar_page" v-if="pageSize>10">
      <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="pageTotal">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="患者姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="editForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新建患者界面-->
    <el-dialog title="新建患者" :visible.sync="addFormVisible" :close-on-click-modal="false" >
      <div>sadsdsdsdadas</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addClose">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新建组别界面-->
    <el-dialog title="新建组别" :visible.sync="addFormVisible1" :close-on-click-modal="false">
      asdasd
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible1 = false">取消</el-button>
        <el-button type="primary" @click.native="addNewGroup" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>

  export default {
    data () {
      var checkIdCard = (rule, value, callback) => {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (!reg.test(value)) {
          callback(new Error('请输入正确的身份证号'))
          return false
        } else {
          console.log('66666')
          callback()
        }
      }
      var checkPhone = (rule, value, callback) => {
        var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        var telReg = reg.test(value)
        if (telReg == false) {
          callback(new Error('请输入正确的手机号'))
          return false
        } else {
          console.log('66666')
          callback()
        }
      }
      return {
        filters: {
          name: '',
          createTime: ''
        },
        groupNameList: [
          {
            groupId: '',
            groupName: ''
          }
        ],
        groupNameChoose: '',
        value: '',
        users: [
          {index: '1', name: '斯蒂芬', groupName: '出来打球', sex: 1, idCard: '123456654321123456', age: 20, phone: '18813104868', department: '内科', doctor: '蔡徐坤'},
          {index: '2', name: '史蒂夫', groupName: '出来打球', sex: 2, idCard: '123456654321123456', age: 21, phone: '18813104868', department: '内科', doctor: '蔡徐坤'},
          {index: '3', name: '阿庆嫂', groupName: '出来打球', sex: 1, idCard: '123456654321123456', age: 22, phone: '18813104868', department: '内科', doctor: '蔡徐坤'},
          {index: '4', name: 'X森', groupName: '出来打球', sex: 2, idCard: '123456654321123456', age: 23, phone: '18813104868', department: '内科', doctor: '蔡徐坤'},
          {index: '5', name: 'X森森', groupName: '出来打球', sex: 1, idCard: '123456654321123456', age: 24, phone: '18813104868', department: '内科', doctor: '蔡徐坤'},
          {index: '6', name: 'X森森森', groupName: '出来打球', sex: 2, idCard: '123456654321123456', age: 25, phone: '18813104868', department: '内科', doctor: '蔡徐坤'},
          {index: '1', name: '斯蒂芬', groupName: '出来打球', sex: 1, idCard: '123456654321123456', age: 20, phone: '18813104868', department: '内科', doctor: '蔡徐坤'},
          {index: '2', name: '史蒂夫', groupName: '出来打球', sex: 2, idCard: '123456654321123456', age: 21, phone: '18813104868', department: '内科', doctor: '蔡徐坤'},
          {index: '3', name: '阿庆嫂', groupName: '出来打球', sex: 1, idCard: '123456654321123456', age: 22, phone: '18813104868', department: '内科', doctor: '蔡徐坤'},
          {index: '4', name: 'X森', groupName: '出来打球', sex: 2, idCard: '123456654321123456', age: 23, phone: '18813104868', department: '内科', doctor: '蔡徐坤'},
          {index: '5', name: 'X森森', groupName: '出来打球', sex: 1, idCard: '123456654321123456', age: 24, phone: '18813104868', department: '内科', doctor: '蔡徐坤'},
          {index: '6', name: 'X森森森', groupName: '出来打球', sex: 2, idCard: '123456654321123456', age: 25, phone: '18813104868', department: '内科', doctor: '蔡徐坤'},
          {index: '1', name: '斯蒂芬', groupName: '出来打球', sex: 1, idCard: '123456654321123456', age: 20, phone: '18813104868', department: '内科', doctor: '蔡徐坤'},
          {index: '2', name: '史蒂夫', groupName: '出来打球', sex: 2, idCard: '123456654321123456', age: 21, phone: '18813104868', department: '内科', doctor: '蔡徐坤'},
          {index: '3', name: '阿庆嫂', groupName: '出来打球', sex: 1, idCard: '123456654321123456', age: 22, phone: '18813104868', department: '内科', doctor: '蔡徐坤'},
          {index: '4', name: 'X森', groupName: '出来打球', sex: 2, idCard: '123456654321123456', age: 23, phone: '18813104868', department: '内科', doctor: '蔡徐坤'},
          {index: '5', name: 'X森森', groupName: '出来打球', sex: 1, idCard: '123456654321123456', age: 24, phone: '18813104868', department: '内科', doctor: '蔡徐坤'},
          {index: '6', name: 'X森森森', groupName: '出来打球', sex: 2, idCard: '123456654321123456', age: 25, phone: '18813104868', department: '内科', doctor: '蔡徐坤'}
        ],
        total: 20,
        page: 1,
        listLoading: false,
        sels: [], // 列表选中列
        usersList: [],
        editFormVisible: false, // 编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        // 编辑界面数据
        editForm: {
          id: 0,
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: '',
          pgone: '',
          card: '',
          group: '',
          marks: ''
        },

        addFormVisible: false, // 新增权限界面是否显示
        addFormVisible1: false,
        addLoading: false,

        addFormRules: {
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          phone: [{ validator: checkPhone, trigger: 'blur' }],
          sex: [{ required: true, message: '请输选择性别', trigger: 'change' }],
          idCard: [{validator: checkIdCard, trigger: 'blur' }]
        },
        // 新增界面数据
        addForm: {
          name: '',
          sex: -1,
          age: 0,
          idCard: '',
          groupId: '',
          remark: '',
          phone: ''
        },
        user: null,
        pageTotal: 0,
        pageSize: 0,
        newGroupName: ''
      }
    },
    methods: {
      handleAdd1 () {
        this.addFormVisible1 = true
      },
      createPlan (s1, s2) {
        this.$router.push({name: 'createPlan', params: {id: s1, info: s2}})
      },
      essentialInfo (s1, s2) {
        sessionStorage.setItem('personInfo', JSON.stringify(s2))
        this.$router.push({name: 'EssentialInfo'})
      },
      createVisit (s1, s2) {
        sessionStorage.setItem('personInfo', JSON.stringify(s2))
        this.$router.push({name: 'createVisit', params: {id: s1, info: s2}})
      },
      // 性别显示转换
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 2 ? '女' : '未知'
      },
      handleCurrentChange (val) {
        var that = this
        console.log(val, '2333333333333')
      },
      // 获取用户列表
      getUsers () {
        var that = this
        that.user = JSON.parse(sessionStorage.getItem('loginUser'))
        console.log(that.user)
        that.$http.get('/api' + `/patient/getPatientList?hospitalId=${that.user.hospitalId.id}&keywords=${that.filters.name}`)
          .then(res => {
            that.pageTotal = res.data.total
            that.pageSize = res.data.size
            that.usersList = res.data.list
            console.log(res, '23333333333333333333333')
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          // NProgress.start();
          let para = { id: row.id }
          removeUser(para).then((res) => {
            this.listLoading = false
            // NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getUsers()
          })
        }).catch(() => {

        })
      },
      // 显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true
        this.editForm = Object.assign({}, row)
      },
      // 显示新增界面
      handleAdd: function () {
        this.addFormVisible = true
      },
      // 编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true
              // NProgress.start();
              let para = Object.assign({}, this.editForm)
              para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
              editUser(para).then((res) => {
                this.editLoading = false
                // NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.$refs['editForm'].resetFields()
                this.editFormVisible = false
                this.getUsers()
              })
            })
          }
        })
      },
      // 新增
      addSubmit: function () {
        var that = this

        that.$refs.addForm.validate((valid) => {
          if (valid) {
            that.addForm.hospitalId = that.user.hospitalId.id
            that.addForm.doctorId = that.user.id
            that.$confirm('确认提交吗？', '提示', {}).then(() => {
              if (that.addForm.sex == -1) {
                that.$message({
                  showClose: true,
                  message: '您还未选择性别',
                  type: 'error'
                })
                return
              }
              if (that.addForm.age == '') {
                that.$message({
                  showClose: true,
                  message: '您还未输入年龄',
                  type: 'error'
                })
                return
              }
              if (that.addForm.groupId == '') {
                that.$message({
                  showClose: true,
                  message: '您还未选择组别',
                  type: 'error'
                })
                return
              }
              that.addLoading = true
              that.$http.post('/api' + `/patient/addPatient`, that.addForm)
                .then(res => {
                  if (res.data) {
                    that.$message({
                      showClose: true,
                      message: '患者添加成功',
                      type: 'success'
                    })
                    that.getUsers()
                    that.addFormVisible = false
                    that.$refs.addForm.resetFields()
                  } else {
                    that.$message({
                      showClose: true,
                      message: '患者添加失败',
                      type: 'error'
                    })
                    that.addFormVisible = false
                    that.$refs.addForm.resetFields()
                  }
                })
                .catch(err => {
                  console.log(err)
                })
            })
          }
        })
      },
      addClose () {
        this.addFormVisible = false
        this.$refs.addForm.resetFields()
      },
      closeDialog () {
        this.$refs.addForm.resetFields()
      },
      selsChange: function (sels) {
        this.sels = sels
      },
      // 批量删除
      batchRemove: function () {
        var ids = this.sels.map(item => item.id).toString()
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          // NProgress.start();
          let para = { ids: ids }
          batchRemoveUser(para).then((res) => {
            this.listLoading = false
            // NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getUsers()
          })
        }).catch(() => {

        })
      },
      // 获取组名
      getGroupName () {
        var that = this
        that.$http.get('/api' + `/groups/getGroupListByDoctorId?doctorId=${that.user.id}`)
          .then(res => {
            that.groupNameList = res.data
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 新建组
      addNewGroup () {
        var that = this
        that.$http.post('/api' + `/groups/addGroup`, {groupName: that.newGroupName, doctorId: that.user.id})
          .then(res => {
            if (res.data) {
              that.$message({
                showClose: true,
                message: '新建组别成功',
                type: 'success'
              })
              that.addFormVisible1 = false
              that.getGroupName()
              that.newGroupName = ''
            } else {
              that.$message({
                showClose: true,
                message: '新建组别失败',
                type: 'error'
              })
              that.addFormVisible1 = false
            }
          })
          .catch(err => {
            console.log(err)
          })
      }

    },
    mounted () {
      var that = this
      that.getUsers()
      that.getGroupName()
  }
  }

</script>

<style scoped>
  .table_container{
    /*padding: 30px 50px 80px 50px;*/
    background-color: #fff;
  }

  .toolbar_page{
    margin-top: 20px;
    text-align: center;
  }

</style>
