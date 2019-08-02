<template>
  <section class="table_container">
    <!--顶部工具条-->
    <el-col :span="24" class="toolbar toolbar_title" style="padding-bottom: 0px;">
        <h3>会员管理</h3>
        <el-form :inline="true" :model="filters" class="toolbar_form">
          <el-form-item>
          <el-button
            @click="exports"
            type="primary"
            style="background-color: #52a3d7; border: 0; font-size: 14px"
          >
            <i class="el-icon-download" style="margin-right: 5px"></i>导出
          </el-button>
        </el-form-item>
        </el-form>
    </el-col>
    <!--列表-->
    <el-table
      :data="wchatArray"
      :border="true"
      stripe
      highlight-current-row
      v-loading="listLoading"
      style="width: 100%;"
    >
      <el-table-column prop="nickName" align="center" label="用户名称" ></el-table-column>
      <el-table-column label="用户头像">
        <template width="90" slot-scope="scope">
        <img style="width:80px;height:80px;border:none;" :src="scope.row.avatarUrl">
        </template> 
      </el-table-column>
      <el-table-column prop="phone" align="center" label="手机号" sortable></el-table-column>
      <el-table-column prop="gender" align="center" label="性别" ></el-table-column>
      <el-table-column prop="country" align="center" label="所在国家" ></el-table-column>
      <el-table-column prop="province" align="center" label="所在省份" ></el-table-column>
      <el-table-column prop="city" align="center" label="所在城市" ></el-table-column>
      <el-table-column prop="language" align="center" label="语言" ></el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar toolbar_page" v-if="wchatArray.length>10">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-col>
  </section>
</template>

<script>
import { connect } from 'net';
export default {
  data() {
    return {

      filters: {
        name: "",
        date: ["",""],
        status: ""
      },
      date: "",
      total: 20,
      page: 1,
      size: 1,
      currentPage: 1,
      listLoading: false,
      usersList: [],
      user: null,
      wchatArray: [],
      personInfo:{} //患者信息
    };
  },
  methods: {
    handleSearch() {
      this.getWechatUserList();
    },
    // 获取待随访列表
    getWechatUserList() {
      this.$http
        .get(
          "/api" +
            `/user/wechatUserList`    
        )
        .then(res => {
          this.wchatArray = res.data.list;
          this.total = res.data.total;
          this.size = res.data.size;
          this.currentPage = res.data.pages;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    //导出表格
    exports() {
      this.$http({
        url: "/api/excel/exportWechatUserList",
        responseType: "blob",
        method: "get"
      })
        .then(res => {
          this.download(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 下载文件
    download(data) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "会员列表.xlsx");

      document.body.appendChild(link);
      link.click();
    }

  },
  created() {
    this.getWechatUserList();
  }
};
</script>

<style scoped>
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

.search_input >>> .el-form-item__content {
  width: 500px;
}
</style>
