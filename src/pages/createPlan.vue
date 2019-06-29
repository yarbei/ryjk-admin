<template>
  <div class="cp_container">

    <tab-header :personInfo="personInfo"></tab-header>

    <h2></h2>

    <el-form ref="form" :model="form" label-width="80px">

      <h2 >健康计划内容</h2>

      <el-row :gutter="15">
        <el-col :span="2" style="line-height: 40px;text-align: left ">
          用药情况 :
        </el-col>
        <el-col :span="7">
          <el-form-item label="请选择 : ">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="请选择 : ">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="请选择 : ">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="2" style="line-height: 40px;text-align: left ">
          限烟限酒 :
        </el-col>
        <el-col :span="7">
          <el-form-item label="请选择 : ">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="请选择 : ">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="请选择 : ">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="2" style="line-height: 40px;text-align: left ">
          运动情况 :
        </el-col>
        <el-col :span="7">
          <el-form-item label="请选择 : ">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="请选择 : ">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="请选择 : ">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="2" style="line-height: 40px;text-align: left ">
          饮食情况 :
        </el-col>
        <el-col :span="7">
          <el-form-item label="请选择 : ">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="请选择 : ">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="请选择 : ">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-form-item label="请选择 : ">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="2" style="line-height: 40px;text-align: left ">
          用药情况 :
        </el-col>
        <el-col :span="7">
          <el-form-item label="请选择 : ">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="请选择 : ">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="2" style="line-height: 40px;text-align: left ">
          并发症 :
        </el-col>
        <el-col :span="8">
          <el-form-item label="请选择 : ">
            <el-radio-group v-model="form.resource">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="健康教育:" :label-position="top" label-width="80px">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>

      <el-form-item label="注意事项:">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>

      <h2>其他项目</h2>

      <el-form-item label="随访备注:">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>

      <el-form-item style="text-align: center">
        <el-button type="success" @click="onSubmit">完成随访</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
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
  import tabHeader from '../components/tabHeader'

  export default {
    components: {
      ElButton,
      ElCol,
      tabHeader
    },
    name: 'createPlan',
    data() {
      return {
        form: {
          name1: '',
          name2: '',
          name3: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        personInfoId:"",
        personInfo:{},
        dialogVisible: false
      }
    },
    created(){
      var that = this;
      console.log( that.$route.params.info);
      that.personInfoId = that.$route.params.id;
      that.personInfo = that.$route.params.info;
    },
    mounted(){

    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }

  }
</script>

<style type="text/css">
  .cp_container{
    width: 100%;
    height: auto;
    min-height: 100%;
    /*padding: 30px 50px 80px 50px;*/
    background-color: #fff;
  }

  .cp_title{
    height: 170px;
    /*background-color: #2DB7F5;*/
    border-bottom: 1px solid #999;
    margin-bottom: 30px;
    line-height: 170px;
  }

  .cp_titleContent{
    height: 170px;
    padding: 20px 30px 0;
  }

  .cp_titleContent p{
    height: 30px;
    line-height: 30px;
  }

  .cp_titleImg img{
    width: 100%;
    vertical-align: middle;
    margin-left: 10px;
  }

  .cp_titleTag{
    margin-left: 30px;
  }

</style>
