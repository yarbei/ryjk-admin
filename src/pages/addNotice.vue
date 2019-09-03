<template>
  <section class="table_container">
      <el-form :model="addForm" label-width="100px" ref="addForm">

        <el-form-item label="公告标题" prop="title">
          <el-input v-model="addForm.title" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="公告内容" prop="content">
          <el-input type="textarea" :rows="5" v-model="addForm.content" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="接收对象" prop="titleType">
            <el-select v-model="addForm.titleType" placeholder="接收对象">
                <el-option
                    v-for="item in objectList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="指定人群" prop="receiverUserId" v-show="addForm.titleType === 4">
            <el-select v-model="addForm.receiverUserId" multiple filterable remote placeholder="请搜索用户">
                <el-option
                    v-for="item in optionsList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId">
                    {{ item.userName }}
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="发送时间" prop="pushTime">
            <el-date-picker v-model="addForm.pushTime" type="datetime" placeholder="选择发送时间" value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click.native="cancel">取消</el-button>
        <el-button type="primary" @click.native="save">提交</el-button>
      </div>
  </section>
</template>

<script>

export default {
  data () {
    return {
      optionsList: [],
      filters: {
        title: ''
      },
      objectList: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '仅患者',
          value: 1
        },
        {
          label: '仅医生',
          value: 2
        },
        {
          label: '仅疾病管理师',
          value: 3
        },
        {
          label: '指定人群',
          value: 4
        }
      ],
      // 新增界面数据
      addForm: {
      }
    }
  },
  methods: {
    cancel () {
      console.log(1)
      this.$router.go(-1)
    },
    // 新增公告
    addDepartment: function () {
      const params = {
        ...this.addForm
      }
      if (params.titleType !== 4) {
        delete params.receiverUserId
      } else {
        let receiverUserId = this.addForm.receiverUserId.map((v, i) => {
          return {
            userId: v
          }
        })
        params.receiverUserId = JSON.stringify(receiverUserId)
      }
      console.log(params)
      this.$http.post('/api' + `/notice/addNoticeTask`, params)
        .then(res => {
          if (res.data) {
            this.$message({
              type: 'success',
              message: '新增公告成功',
              duration: 1000,
              onClose: () => {
                this.$router.push('/noticeManagement')
              }
            })
          } else {
            this.$message.error('新增公告失败')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 指定人群列表
    getUserList () {
      let loginUser =  JSON.parse(sessionStorage.getItem('loginUser'))
      this.$http.get('/api' + `/user/userList?hospitalId=${loginUser.hospitalId}`)
        .then(res => {
          if (res.data) {
            this.optionsList = res.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取公告详情
    getDetail (id) {
      this.$http.get('/api' + `/notice/noticeTask?noticeTaskId=${id}`)
        .then(res => {
          if (res.data) {

            let data = res.data
            this.addForm = {...data}
            this.addForm.receiverUserId = []
            console.log(data.receiverUserId)
            let list = JSON.parse(data.receiverUserId)
            console.log(list)
            list.map((v, i) => {
              this.addForm.receiverUserId.push(
                v.userId
              )
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 修改公告
    setDepartment (id) {
      const params = {
        ...this.addForm
      }

      if (params.titleType !== 4) {
        delete params.receiverUserId
      } else {
        let receiverUserId = this.addForm.receiverUserId.map((v, i) => {
          return {
            userId: v
          }
        })
        params.receiverUserId = JSON.stringify(receiverUserId)
      }
      params.noticeTaskId = Number(id)
      console.log(params)
      this.$http.post('/api' + `/notice/updateNoticeTask`, params)
        .then(res => {
          if (res.data) {
            this.$message({
              type: 'success',
              message: '修改公告成功',
              duration: 1000,
              onClose: () => {
                this.$router.push('/noticeManagement')
              }
            })
          } else {
            this.$message.error('修改公告失败')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    save () {
      const id = this.$route.query.id
      if (id) {
        this.setDepartment(id)
      } else {
        this.addDepartment()
      }
    }

  },
  mounted () {
    this.getUserList()
  },
  created () {
    // url存在医院id时表示修改，需要获取医院信息
    const id = this.$route.query.id
    this.id = id
    if (id) {
      this.getDetail(id)
    }
  }
}

</script>

<style scoped>


</style>
