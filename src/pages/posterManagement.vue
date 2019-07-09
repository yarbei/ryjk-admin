<template>
  <section class="table_container">
    <!--工具条-->
    <el-col :span="24" class="toolbar toolbar_title">
      <h3>广告管理</h3>
      <el-form :inline="true" :model="filters" class="toolbar_form">
        <el-form-item class="f-left search_input">
          <el-input v-model="filters.name" placeholder="广告名">
            <template slot="append" icon="el-icon-search">
              <el-button type="primary" v-on:click="getyyList" style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac"><i class="el-icon-search" style="margin-right: 5px"></i>搜索</el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleAdd" style="background-color: #52d7ac; border: 0; font-size: 14px">新增广告</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="ggArray" :border="true"  stripe highlight-current-row v-loading="listLoading" style="width: 100%;">

      <el-table-column prop="content"  :show-overflow-tooltip="true" align="center" label="广告名称" sortable>
      </el-table-column>

      <el-table-column prop="link"  :show-overflow-tooltip="true" align="center" label="广告地址" sortable>
      </el-table-column>

      <el-table-column prop="createAuthor"  :show-overflow-tooltip="true" align="center" label="广告地址" sortable>
      </el-table-column>

      <el-table-column prop="createDate"   align="center" label="创建时间" sortable>
      </el-table-column>

      <el-table-column align="center" width="360" fixed="right" label="操作">
        <template slot-scope="scope">
          <!--<el-button round type="text" style="color: #52a3d7"  @click="essentialInfo(scope.$index, scope.row)"><i class="el-icon-search" style="margin-right: 5px"></i>查看详情</el-button>-->
          <el-button round type="text" style="color: #f8b14b"  @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit-outline" style="margin-right: 5px"></i>修改广告</el-button>
          <el-button round type="text" style="color: #e15939" @click="delDepartment(scope.$index, scope.row)"><i class="el-icon-delete" style="margin-right: 5px"></i>删除广告</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar toolbar_page" v-if="ggArray !== undefined  &&  ggArray.length > 0 ">
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


    <!--新增广告界面-->
    <el-dialog title="新增广告"  :visible.sync="addFormVisible"  :modal-append-to-body="false">

      <el-form :model="addForm" label-width="100px" ref="addForm">

        <!--<el-form-item label="	广告名称" prop="name">-->
          <!--<el-input v-model="addForm.name" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->

        <el-form-item label="	广告地址" prop="description">
          <el-upload
            :action="uploadUrl()"
            :multiple='true'
            :headers="headers"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :show-file-list ="true"
            :auto-upload="true"
            :before-upload="beforeUpload"
            enctype="multipart/form-data"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <!--<el-button type="primary" @click.native="addDepartment">提交</el-button>-->
      </div>
    </el-dialog>


    <!--修改广告"界面-->
    <el-dialog title="修改广告" :visible.sync="editFormVisible"  :modal-append-to-body="false">

      <el-form :model="editForm" label-width="100px" ref="editForm">

        <el-form-item label="	广告名称" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="	广告地址" prop="description">
          <el-input v-model="editForm.link" auto-complete="off"></el-input>
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
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      size: 1,
      currentPage: 1,
      listLoading: false,
      ggArray: [],
      addFormVisible: false, // 新增界面是否显示,
      // 新增界面数据
      addForm: {
        pca: null
      },

      editFormVisible: false, // 修改界面是否显示,
      // 修改界面数据
      editForm: {}
    }
  },
  methods: {
    // 生产环境和开发环境的判断
    uploadUrl () {
      var url = process.env.apiUrl + '/common/upload'
      console.log(url)
      return url
    },
    // 上传失败

    // 上传成功ß
    uploadSuccess (res, file) {
      if (this.activeName == '1') {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.showNoticeUploading = false
        this.noticeImageUrl = res
        this.noteInform.templatePicture = res
      } else if (this.activeName == '3') {
        this.markingpic = URL.createObjectURL(file.raw)
        this.showMarkingUploading = false
        this.marketImageUrl = res
        this.marketingInform.templatePicture = res
      }
    },
    // 上传之前
    beforeUpload (file) {
      var that = this
      that.showNoticeUploading = true
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return
      }

      event.preventDefault()
      let formData = new FormData()
      formData.append('file', file)
      console.log(formData, '文件！')
      that.$http.post('/api' + '/common/upload', formData)
        .then(res => {
          if (res.data != null) {
            that.$message.success('上传成功！')
          } else {
            that.$message.error('上传失败！')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 获取广告广告列表
    getyyList () {
      var that = this
      that.$http.get('/api' + `/advertisement/getAdvertisementList`)
        .then(res => {
          console.log(res.data, '获取广告列表')
          that.ggArray = res.data.list;
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 新增广告弹窗
    handleAdd: function () {
      this.addFormVisible = true
    },
    // 新增广告
    addDepartment: function () {
      var that = this
      that.$http.post('/api' + `/common/upload`, that.addForm)
        .then(res => {

        })
        .catch(err => {
          console.log(err)
        })
    },
    // 删除广告
    delDepartment (s1, s2) {
      var that = this
      this.$confirm('此操作将删除该广告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        that.$http.post('/api' + `/hospital/deleteHospital`, {id: s2.id})
          .then(res => {
            if (res.data) {
              that.$message.success('删除广告成功')
              that.getyyList()
              that.addFormVisible = false
            } else {
              that.$message.error('删除广告失败')
              that.addFormVisible = false
            }
          })
          .catch(err => {
            console.log(err)
          })
      }).catch(() => {
      })
    },
    // 修改广告弹窗
    handleEdit: function (s1, s2) {
      var that = this
      that.editFormVisible = true
      that.editForm = s2
      that.editForm.pca = [s2.province, s2.city, s2.area]
    },
    // 修改广告
    upDateDepartment () {
      var that = this
      that.editForm.province = that.editForm.pca[0]
      that.editForm.city = that.editForm.pca[1]
      that.editForm.area = that.editForm.pca[2]
      that.$http.post('/api' + `/hospital/updateHospital`, that.editForm)
        .then(res => {
          if (res.data) {
            that.$message.success('修改广告成功')
            that.getyyList()
            that.editFormVisible = false
          } else {
            that.$message.error('修改广告失败')
            that.editFormVisible = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSizeChange () {},
    handleCurrentChange () {},
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    }
  },
  mounted () {
    var that = this
    that.uploadUrl()
    
  },
  created () {
    this.getyyList()
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
