<template>
  <section class="table_container">
    <!--工具条-->
    <el-col :span="24" class="toolbar toolbar_title" style="padding-bottom: 0px; height: 100px;padding-top: 30px">
      <el-form :inline="true" :model="filters" class="toolbar_form">
        <el-form-item class="f-left search_input">
          <el-input v-model="filters.name" placeholder="患者姓名">
            <template slot="append" icon="el-icon-search">
              <el-button type="primary" v-on:click="getwVList" style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac"><i class="el-icon-search" style="margin-right: 5px"></i>搜索</el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="wvArray" :border="true" stripe highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column prop="patient" align="center" label="患者姓名" sortable>
      </el-table-column>
      <el-table-column prop="visitDate" align="center" label="随访时间" sortable>
      </el-table-column>
      <el-table-column prop="status" align="center" label="状态" :formatter="formatSatus" sortable>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="success"  style="background-color: #52d7ac; border-radius: 0; color: #fff; border: 1px solid #52d7ac;padding: 10px 30px"  @click="changelInfo(scope.$index, scope.row)">{{scope.row.status ==0?'已随访':'去随访'}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar toolbar_page" v-if="wvArray.length>10">
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

  </section>
</template>

<script>

  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        value:"",
        users: [
          {index:"1",name:"斯蒂芬",groupName:"出来打球",sex:1,idCard:"123456654321123456",age:20,phone:"18813104868",department:"内科",doctor:"蔡徐坤"},
          {index:"2",name:"史蒂夫",groupName:"出来打球",sex:2,idCard:"123456654321123456",age:21,phone:"18813104868",department:"内科",doctor:"蔡徐坤"},
          {index:"3",name:"阿庆嫂",groupName:"出来打球",sex:1,idCard:"123456654321123456",age:22,phone:"18813104868",department:"内科",doctor:"蔡徐坤"},
          {index:"4",name:"X森",groupName:"出来打球",sex:2,idCard:"123456654321123456",age:23,phone:"18813104868",department:"内科",doctor:"蔡徐坤"},
          {index:"5",name:"X森森",groupName:"出来打球",sex:1,idCard:"123456654321123456",age:24,phone:"18813104868",department:"内科",doctor:"蔡徐坤"},
          {index:"6",name:"X森森森",groupName:"出来打球",sex:2,idCard:"123456654321123456",age:25,phone:"18813104868",department:"内科",doctor:"蔡徐坤"},
          {index:"1",name:"斯蒂芬",groupName:"出来打球",sex:1,idCard:"123456654321123456",age:20,phone:"18813104868",department:"内科",doctor:"蔡徐坤"},
          {index:"2",name:"史蒂夫",groupName:"出来打球",sex:2,idCard:"123456654321123456",age:21,phone:"18813104868",department:"内科",doctor:"蔡徐坤"},
          {index:"3",name:"阿庆嫂",groupName:"出来打球",sex:1,idCard:"123456654321123456",age:22,phone:"18813104868",department:"内科",doctor:"蔡徐坤"},
          {index:"4",name:"X森",groupName:"出来打球",sex:2,idCard:"123456654321123456",age:23,phone:"18813104868",department:"内科",doctor:"蔡徐坤"},
          {index:"5",name:"X森森",groupName:"出来打球",sex:1,idCard:"123456654321123456",age:24,phone:"18813104868",department:"内科",doctor:"蔡徐坤"},
          {index:"6",name:"X森森森",groupName:"出来打球",sex:2,idCard:"123456654321123456",age:25,phone:"18813104868",department:"内科",doctor:"蔡徐坤"},
          {index:"1",name:"斯蒂芬",groupName:"出来打球",sex:1,idCard:"123456654321123456",age:20,phone:"18813104868",department:"内科",doctor:"蔡徐坤"},
          {index:"2",name:"史蒂夫",groupName:"出来打球",sex:2,idCard:"123456654321123456",age:21,phone:"18813104868",department:"内科",doctor:"蔡徐坤"},
          {index:"3",name:"阿庆嫂",groupName:"出来打球",sex:1,idCard:"123456654321123456",age:22,phone:"18813104868",department:"内科",doctor:"蔡徐坤"},
          {index:"4",name:"X森",groupName:"出来打球",sex:2,idCard:"123456654321123456",age:23,phone:"18813104868",department:"内科",doctor:"蔡徐坤"},
          {index:"5",name:"X森森",groupName:"出来打球",sex:1,idCard:"123456654321123456",age:24,phone:"18813104868",department:"内科",doctor:"蔡徐坤"},
          {index:"6",name:"X森森森",groupName:"出来打球",sex:2,idCard:"123456654321123456",age:25,phone:"18813104868",department:"内科",doctor:"蔡徐坤"},
        ],
        total: 20,
        page: 1,
        size:1,
        currentPage:1,
        listLoading: false,
        usersList:[],
        user:null,
        wvArray:[]
      }
    },
    methods: {
      //获取待随访列表
      getwVList() {
        var that = this;
        that.$http.get('/api'+`/visitRecord/getVisitRecordListByUserId?userId=${that.$store.state.user.user.id}&name=${that.filters.name}`)
          .then(res=>{
            console.log(res.data,"获取待随访列表")
            that.wvArray = res.data.list;
            that.total = res.data.total;
            that.size = res.data.size;
            that.currentPage = res.data.pages;
          })
          .catch(err=>{
            console.log(err);
          })
      },
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      formatSatus(row, column){
        return row.status == 0? '已随访':'未随访'
      },
      formBtnStatus(row,column){
        return row.status == 0? true: false;
      },
      changelInfo(s1,s2){
        var that = this;

        if (s2.status == 0){
          that.$message.warning("该患者已随访,请勿重复操作！");
          return
        }

        that.$router.replace({name:"createVisit",params:{patientiD:""}});

        console.log(s2)
      },
    },
    mounted() {
      var that = this;
      that.getwVList();
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

  .search_input>>>.el-form-item__content{
    width: 500px;
  }



</style>
