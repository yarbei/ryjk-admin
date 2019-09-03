<template>
  <div class="tb_container">
    <el-col :span="24" class="tb_title">
      <!--<el-col :span="2" class="tb_titleImg">-->
        <!--<img :src="personInfo.head?personInfo.head:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560381260690&di=b38e30b354bc5c88130b810f7c62d0ea&imgtype=0&src=http%3A%2F%2Fimgsa.baidu.com%2Fexp%2Fw%3D500%2Fsign%3D3874fd12cebf6c81f7372ce88c3fb1d7%2Fd53f8794a4c27d1e76ed22be19d5ad6edcc43884.jpg'"/>-->
      <!--</el-col>-->
      <el-col :span="22" class="tb_titleContent">
        <p>
          {{personInfo.name}}({{personInfo.sex==1?"男":"女"}})
          <el-tag size="mini" type="success" class="tb_titleTag" round>{{personInfo.departmentName}}</el-tag>
          <!--<el-button size="mini" type="primary" class="tb_titleTag f-right" icon="el-icon-edit-outline" round>编辑</el-button>-->
          <!--<el-button size="mini" type="primary" class="tb_titleTag f-right" icon="el-icon-delete" @click="dialogVisible = true" round>删除</el-button>-->
        </p>
        <p>手机号：{{personInfo.phone}}</p>
        <p>主治医生名：{{personInfo.doctorName}}</p>
      </el-col>
    </el-col>


    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>确认要删除该用户的信息么？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import ElCol from 'element-ui/packages/col/src/col'
  import ElButton from '../../node_modules/element-ui/packages/button/src/button.vue'
  import ElRow from 'element-ui/packages/row/src/row'

  export default {
    components: {
      ElRow,
      ElButton,
      ElCol
    },
    name: 'createPlan',
    props: [
      'personInfo'
    ],
    data () {
      return {
        personInfoId: '',
        dialogVisible: false
      }
    },
    mounted () {
      var that = this
    //      that.personInfoId = that.$route.params.id;
  },
    methods: {
      onSubmit () {
        console.log('submit!')
      }
    },
    created () {
    //      console.log(this.personInfoId);
    }

  }
</script>

<style type="text/css">
  .tb_container{
    width: 100%;
    height: auto;
    background-color: #fff;
    position: relative;
    z-index: 2;
  }

  .tb_title{
    /*height: 170px;*/
    /*background-color: #2DB7F5;*/
    border-bottom: 1px solid #eee;
    /*line-height: 170px;*/
    margin: 0 0 20px;
  }

  .tb_titleContent{
    /*height: 170px;*/
    padding: 0 10px;
  }

  .tb_titleContent p{
    height: 30px;
    line-height: 30px;
    position: relative;
    z-index: -1;
  }

  .tb_titleImg img{
    width: 100%;
    height: 135px;

    vertical-align: middle;
    margin-left: 10px;
  }

  .tb_titleTag{
    margin-left: 30px;
  }

</style>
