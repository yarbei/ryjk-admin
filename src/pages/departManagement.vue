<template>
  <section class="table_container">
    <!--工具条-->
    <el-col :span="24" class="toolbar toolbar_title">
      <h3>科室管理</h3>
      <el-form :inline="true" :model="filters" class="toolbar_form">
        <el-form-item class="f-left search_input">
          <el-input v-model="filters.name" placeholder="科室名">
            <template slot="append" icon="el-icon-search">
              <el-button type="primary" v-on:click="getksList" style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac"><i class="el-icon-search" style="margin-right: 5px"></i>搜索</el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleAdd" style="background-color: #52d7ac; border: 0; font-size: 14px">新增科室</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="ksArray" :border="true" stripe highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column prop="name" align="center" label="科室名称" sortable>
      </el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间" sortable>
      </el-table-column>
      <el-table-column prop="description" align="center" label="科室描述"  sortable>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="操作">
        <template slot-scope="scope">
          <!--<el-button round type="text" style="color: #52a3d7"  @click="essentialInfo(scope.$index, scope.row)"><i class="el-icon-search" style="margin-right: 5px"></i>科室详情</el-button>-->
          <el-button round type="text" style="color: #f8b14b"  @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit-outline" style="margin-right: 5px"></i>修改科室</el-button>
          <el-button round type="text" style="color: #e15939" @click="delDepartment(scope.$index, scope.row)"><i class="el-icon-delete" style="margin-right: 5px"></i>删除科室</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar toolbar_page" v-if="ksArray.length>10">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-col>

    <!--新增科室界面-->
    <el-dialog title="新增科室" :visible.sync="addFormVisible"  :modal-append-to-body="false">

      <el-form :model="addForm" label-width="80px" ref="addForm">

        <el-form-item label="	科室名称" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="	科室描述" prop="description">
          <el-input v-model="addForm.description" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addDepartment">提交</el-button>
      </div>
    </el-dialog>

    <!--修改科室"界面-->
    <el-dialog title="修改科室" :visible.sync="editFormVisible"  :modal-append-to-body="false">

      <el-form :model="editForm" label-width="80px" ref="editForm">

        <el-form-item label="	科室名称" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="	科室描述" prop="description">
          <el-input v-model="editForm.description" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="upDateDepartment">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>

export default {
  data () {
    return {
      filters: {
        name: ''
      },
      value: '',
      total: 20,
      page: 1,
      size: 1,
      currentPage: 1,
      listLoading: false,
      usersList: [],
      user: null,
      ksArray: [],
      addFormVisible: false, // 新增界面是否显示,
      // 新增界面数据
      addForm: {
        name: '',
        description: ''
      },

      editFormVisible: false, // 修改界面是否显示,
      // 修改界面数据
      editForm: {
        name: '',
        description: ''
      }
    }
  },
  methods: {
    // 获取医院科室列表
    getksList () {
      var that = this
      that.$http.get('/api' + `/medicalSections/getMedicalSectionsPage?hospitalId=${that.$store.state.user.user.hospitalId.id}&name=${that.filters.name}`)
        .then(res => {
          console.log(res.data, '获取医院科室列表')
          that.ksArray = res.data.list
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 新增科室弹窗
    handleAdd: function () {
      this.addFormVisible = true
    },
    // 新增科室
    addDepartment: function () {
      var that = this
      that.addForm.hospitalId = that.$store.state.user.user.hospitalId.id
      that.$http.post('/api' + `/medicalSections/addMedicalSections`, that.addForm)
        .then(res => {
          if (res.data) {
            that.$message.success('新增科室成功')
            that.getksList()
            that.addFormVisible = false
          } else {
            that.$message.error('新增科室失败')
            that.addFormVisible = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 删除科室
    delDepartment (s1, s2) {
      var that = this
      this.$confirm('此操作将删除该科室, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        that.$http.post('/api' + `/medicalSections/deleteMedicalSections`, {id: s2.id})
          .then(res => {
            if (res.data) {
              that.$message.success('删除科室成功')
              that.getksList()
              that.addFormVisible = false
            } else {
              that.$message.error('删除科室失败')
              that.addFormVisible = false
            }
          })
          .catch(err => {
            console.log(err)
          })
      }).catch(() => {
      })
    },
    // 修改科室弹窗
    handleEdit: function (s1, s2) {
      var that = this
      that.editFormVisible = true
      that.editForm = s2
    },
    // 修改科室
    upDateDepartment () {
      var that = this
      that.$http.post('/api' + `/medicalSections/updateMedicalSections`, that.editForm)
        .then(res => {
          if (res.data) {
            that.$message.success('修改科室成功')
            that.getksList()
            that.editFormVisible = false
          } else {
            that.$message.error('修改科室失败')
            that.editFormVisible = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSizeChange () {

    },
    handleCurrentChange () {

    },
    formatSatus (row, column) {

    },
    formBtnStatus (row, column) {

    },
    changelInfo (s1, s2) {

    }
  },
  mounted () {
    var that = this
    that.getksList()
  }
}

</script>

<style scoped>
  .table_container{
    /*padding: 30px 50px 80px 50px;*/
  }

  .toolbar_page{
    margin-top: 20px;
    text-align: center;
  }

  .toolbar_title{
    background-color: #fff;
    margin-bottom: 20px;
    box-sizing: border-box;
    padding: 0;
  }

  .toolbar_form{
    padding: 0 20px;
  }

  .toolbar_title h3{
    height: 60px;
    line-height: 60px;
    background-color: #edfbf7;
    padding: 0 20px;
    margin: 0;
    font-size: 20px;
    margin-bottom: 30px;
  }

  .table_container>>>.el-table__row--striped td{
    background-color: #edfbf7 !important;
  }

  .table_container>>>.el-table .el-table__header thead th{
    background-color: #edfbf7 !important;
  }

  .el-dialog__wrapper{
    position: absolute !important;
  }

  .toolbar >>>.el-input__inner{
    border: 1px solid #52d7ac;
  }

</style>
