<template>
  <section class="table_container">
    <!--工具条-->
    <el-col :span="24" class="toolbar toolbar_title">
      <h3>广告管理</h3>
    </el-col>

    <!--列表-->
    <el-table :data="ggArray" :border="true"  stripe highlight-current-row v-loading="listLoading" style="width: 100%;">

      <el-table-column prop="content"  :show-overflow-tooltip="true" align="center" label="广告名称">
      </el-table-column>
      <el-table-column label="广告地址">
        <template width="90" scope="scope">
        <img style="width:160px;height:80px;border:none;" :src="scope.row.link">
        </template> 
      </el-table-column>

      <el-table-column prop="createAuthor"  :show-overflow-tooltip="true" align="center" label="创建人">
      </el-table-column>

      <el-table-column prop="createDate"   align="center" label="创建时间" sortable>
      </el-table-column>

      <el-table-column align="center" width="420" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            round
            type="text"
            style="color: #f8b14b"
            @click="handleEdit(scope.$index, scope.row)"
          >
            <i class="el-icon-edit-outline" style="margin-right: 5px"></i>修改广告
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar toolbar_page" v-if="ggArray !== undefined  &&  ggArray.length > 0 ">
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-col>


    <!--修改广告"界面-->
    <el-dialog title="修改广告" :visible.sync="editFormVisible" :modal-append-to-body="false">
      <el-form :model="editForm" label-width="100px" ref="editForm">
        <el-form-item label="	广告名称" prop="content">
          <el-input v-model="editForm.content" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="外部链接" prop="imgPath">
          <el-input v-model="editForm.imgPath" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="	广告地址" prop="link">
          <el-upload
              action='/api/common/upload'
              :show-file-list="true"
              :file-list="linkPic"
              :v-model="editForm.linkPic"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-success="handleAvatarSuccess"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
              :limit='1'
            >
          <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="创建人" prop="createAuthor">
          <el-input v-model="editForm.createAuthor" auto-complete="off"></el-input>
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
  data() {
    return {
      name: "",
      imgPath: "",
      link: "",
      createAuth: "",
      value: "",
      total: 20,
      page: 1,
      headers: {
        "Content-Type": "multipart/form-data"
      },
      size: 1,
      currentPage: 1,
      listLoading: false,
      ggArray: [],
      linkPic: "",
      path: "",
      dialogImageUrl: "",
      dialogVisible: false,
      editFormVisible: false, // 修改界面是否显示,
      // 修改界面数据
      editForm: {},
    };
  },
  methods: {
    // 获取广告广告列表
    getyyList () {
      var that = this
      that.$http.get('/api' + `/advertisement/getAdvertisementList`)
        .then(res => {
          console.log(res.data, '获取广告列表')
          that.ggArray = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 修改广告弹窗
    handleEdit: function(s1, s2) {
      console.log("修改数据:---->" + s2.link); 
      this.editFormVisible = true
      this.editForm = s2;    
    },
    // 修改广告
    upDateDepartment() {
      
      this.$http
        .post("/api" + `/advertisement/updateAdvertisement`, this.editForm)
        .then(res => {
          if (res.data) {
            this.$message.success("修改广告成功");
            this.getyyList();
            this.editFormVisible = false;
          } else {
            this.$message.error("修改广告失败");
            this.editFormVisible = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleAvatarSuccess (res, file, fileList) {
      this.linkPic = fileList;
      this.editForm.link = fileList;
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove (file, fileList) {
      this.linkPic = fileList
    },
    handleExceed  (files, fileList) {
      this.$message.warning(`列表图最多上传1张`)
    },
    handlePreview(file) {
      console.log(file);
    }
  },
  mounted () {
    
    
  },
  created () {
    this.getyyList()
  }
}

</script>

<style scoped>
.table_container {
  /*padding: 30px 50px 80px 50px;*/
}

.toolbar_page {
  margin-top: 20px;
  text-align: center;
}

.toolbar_title {
  background-color: #fff;
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 0;
}

.toolbar_form {
  padding: 0 20px;
}

.toolbar_title h3 {
  height: 60px;
  line-height: 60px;
  background-color: #edfbf7;
  padding: 0 20px;
  margin: 0;
  font-size: 20px;
  margin-bottom: 30px;
}

.table_container >>> .el-table__row--striped td {
  background-color: #edfbf7 !important;
}

.table_container >>> .el-table .el-table__header thead th {
  background-color: #edfbf7 !important;
}

.el-dialog__wrapper {
  position: absolute !important;
}

.toolbar >>> .el-input__inner {
  border: 1px solid #52d7ac;
}
</style>
