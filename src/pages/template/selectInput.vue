<template>
  <el-row :gutter="80">
    <el-col :span="8">
      <el-form-item :label="selectInputData.selectLabel">
        <el-select v-model="selectData" @change="selectChange($event,'isshow')">
          <el-option
            v-for="item in selectInputData.option"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="8" v-show="isshow">
      <el-form-item :label="selectInputData.inputLabel">
        <el-input v-model="inputData" placeholder="请输入内容" @change="inputChange"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      isshow: false,
      selectData: "",
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
};
</script>

