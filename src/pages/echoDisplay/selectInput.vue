<template>
  <el-row :gutter="0">
    <el-col :span="6">
      <el-form-item :label="selectInputData.selectLabel">
        <el-select v-model="selectData">
          <el-option
            v-for="item in selectInputData.option"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item v-if="isshow" :label="selectInputData.inputLabel">
        <el-input v-model="inputData" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      isshow: true,
      selectData: null,
      inputData: ""
    };
  },
  props: {
    selectInputData: {
      type: Object,
      required: true
    }
  },
  methods: {
    selectChange(event, isshow) {
      this.$emit("listenSelect", event);
      if (event === 1) {
        this.isshow = true;
      } else {
        this.isshow = false;
      }
    },
    inputChange(val) {
      this.$emit("listenInput", val);
    }
  },
  mounted() {
    // var arr = []
    // this.isshow = false;
    // this.$nextTick(() => {
    //   this.isshow = true;
    // //   if(this.selectInputData.inputData) {
    // //   this.selectData = this.selectInputData.inputData.rheumatoid.value
    // //   this.inputData = this.selectInputData.inputData.rheumatoid.desc
    // // }
    // if(this.selectInputData.inputData) {
    //   this.inputData = this.selectInputData.inputData
    //   console.log(this.selectInputData.inputData, '000')
    // }
    
    // })
    
  }
};
</script>

