<template>
  <section class="table_container">
    <!--工具条-->
    <el-col :span="24" class="toolbar toolbar_title">
      <h3>医院管理</h3>
      <el-form :inline="true" :model="filters" class="toolbar_form">
        <el-form-item class="f-left search_input">
          <el-input v-model="filters.name" placeholder="医院名">
            <template slot="append" icon="el-icon-search">
              <el-button type="primary" v-on:click="getyyList(1,page.size)" style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac"><i class="el-icon-search" style="margin-right: 5px"></i>搜索</el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleAdd" style="background-color: #52d7ac; border: 0; font-size: 14px">新增医院</el-button>
        </el-form-item>

        <!-- <el-form-item>
          <el-button type="primary" style="background-color: #52d7ac; border: 0; font-size: 14px">导出</el-button>
        </el-form-item> -->
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="yyArray" :border="true"  stripe highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column prop="name" :show-overflow-tooltip="true" align="center" label="医院名称" sortable>
      </el-table-column>
      <el-table-column prop="address" :show-overflow-tooltip="true" align="center" label="医院地址" sortable>
      </el-table-column>
      <!--<el-table-column prop="description"  width="300" :show-overflow-tooltip="true" align="center" label="医院描述" sortable>-->
      <!--</el-table-column>-->
      <el-table-column prop="telephone" align="center" label="医院电话" width="130" sortable>
      </el-table-column>
      <!--<el-table-column prop="province"  width="100" align="center" label="	省" sortable>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="city"  width="100" align="center" label="市" sortable>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="area"  width="100" align="center" label="区" sortable>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="traffic"  width="300" align="center" :show-overflow-tooltip="true" label="交通指南" sortable>-->
      <!--</el-table-columncolumn>-->
      <el-table-column prop="buildTime" align="center" label="成立时间" width="110" sortable>
      </el-table-column>
      <el-table-column prop="grade" align="center" label="等级" width="120"  sortable>
      </el-table-column>
      <!-- <el-table-column prop="createTime" align="center" label="创建时间" sortable>
      </el-table-column> -->
      <el-table-column align="center" fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <!--<el-button round type="text" style="color: #52a3d7"  @click="essentialInfo(scope.$index, scope.row)"><i class="el-icon-search" style="margin-right: 5px"></i>查看详情</el-button>-->
          <el-button round type="text" style="color: #f8b14b"  @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit-outline"></i>修改医院</el-button>
          <el-button round type="text" style="color: #e15939" @click="delDepartment(scope.$index, scope.row)"><i class="el-icon-delete"></i>删除医院</el-button>
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
      yyArray: [],
      filters: {
        name: ''
      },
      listLoading: false,
      usersList: [],
      user: null
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
    // 获取医院医院列表
    getyyList (page, pageSize) {
      var that = this
      that.$http.get('/api' + `/hospital/getHospitalList?name=${this.filters.name}&pageNum=${page}&pageSize=${pageSize}`)
        .then(res => {
          console.log(res.data, '获取医院列表')
          that.yyArray = res.data.list
          this.page.total = res.data.total
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 新增
    handleAdd () {
      this.$router.push(`/addHospital`)
    },
    // 修改
    handleEdit (i, row) {
      this.$router.push(`/addHospital?id=${row.id}`)
    },
    // 删除医院
    delDepartment (s1, s2) {
      var that = this
      this.$confirm('此操作将删除该医院, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        that.$http.post('/api' + `/hospital/deleteHospital`, {id: s2.id})
          .then(res => {
            if (res.data) {
              that.$message.success('删除医院成功')
              that.getyyList(
                1,
                this.page.size
              )
              that.addFormVisible = false
            } else {
              that.$message.error('删除医院失败')
              that.addFormVisible = false
            }
          })
          .catch(err => {
            console.log(err)
          })
      }).catch(() => {
      })
    }
  },
  created () {
    this.getyyList(
      1,
      this.page.size
    )
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
