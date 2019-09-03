<template>
  <div class="edit_container">
    <!--  新增时输入 -->
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
    <!-- 从数据库读取展示 -->
    <!-- <div v-html="str" class="ql-editor">
            {{str}}
    </div>-->
    <el-button type="success" style="float:right;margin-top:20px;" @click="submit">提交</el-button>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      content: ``,
      str: "",
      editorOption: {}
    };
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    // 转码
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    },
    //提交
    submit() {
      console.log(this.content);
      this.$http('/api/aptitude/updateAptitude',{id:0,content:this.content,imgPath:'',link:''}).then(res=>{
          console.log(res)
      }).catch(err=>{
          console.log(err)
      })
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    //获取内容
    this.$http("/api/aptitude/getAptitudeList")
      .then(res => {
          console.log(res)
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

