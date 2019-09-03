<template>
  <section class="table_container">
    <!--工具条-->
    <el-col :span="24" class="toolbar toolbar_title">
      <h3>公告管理</h3>
      <el-form :inline="true" :model="filters" class="toolbar_form">
        <el-form-item class="f-left search_input">
          <el-input v-model="filters.title" placeholder="公告标题">
            <template slot="append" icon="el-icon-search">
              <el-button type="primary" v-on:click="getyyList(1,page.size)" style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac"><i class="el-icon-search" style="margin-right: 5px"></i>搜索</el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleAdd" style="background-color: #52d7ac; border: 0; font-size: 14px">新增公告</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="ggArray" :border="true"  stripe highlight-current-row v-loading="listLoading">

      <el-table-column prop="title" :show-overflow-tooltip="true" align="center" label="公告标题" sortable>
      </el-table-column>

      <el-table-column prop="content" :show-overflow-tooltip="true" align="center" label="公告内容" sortable>
      </el-table-column>


      <el-table-column prop="pushTime" align="center" label="发送时间" sortable>
      </el-table-column>

      <el-table-column align="center" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button round type="text" style="color: #f8b14b"  @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit-outline"></i>修改公告</el-button>
          <el-button round type="text" style="color: #e15939" @click="delDepartment(scope.$index, scope.row)"><i class="el-icon-delete"></i>删除公告</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="page.current"
        :page-sizes="page.sizes"
        :page-size="page.size"
        :layout="page.layout"
        :total="page.total"
    ></el-pagination>

  </section>
</template>

<script>
import { pagination } from '@/mixins'
export default {
  mixins: [pagination],
  data () {
    return {
      filters: {
        title: ''
      },
      listLoading: false,
      ggArray: []
    }
  },
  methods: {
    handleSearch () {
      this.getyyList(
        1,
        this.page.size
      )
    },
    // 分页
    handlePageCurrentChange (val) {
      this.page.current = val
      this.getyyList(
        this.page.current,
        this.page.size
      )
    },
    // 获取公告列表
    getyyList (page, pageSize) {
      this.$http.get('/api' + `/notice/noticeTaskList?title=${this.filters.title}&pageNum=${page}&pageSize=${pageSize}`)
        .then(res => {

          this.ggArray = res.data.list
          this.page.total = res.data.total
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 删除公告
    delDepartment (index, row) {
      this.$confirm('此操作将删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.$http.post('/api' + `/notice/delNoticeTask`, {noticeTaskId: row.noticeTaskId})
          .then(res => {
            if (res.data) {
              this.$message.success('删除公告成功')
              this.getyyList(
                1,
                this.page.size
              )
            } else {
              this.$message.error('删除公告失败')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }).catch(() => {
      })
    },
    handleAdd () {
      this.$router.push('/addNotice')
    },
    handleEdit (index, row) {
      this.$router.push(`/addNotice?id=${row.noticeTaskId}`)
    }
  },
  mounted () {
    this.getyyList(
      1,
      this.page.size
    )
  },
  created () {}
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
