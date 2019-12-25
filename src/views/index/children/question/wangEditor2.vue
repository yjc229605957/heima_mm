<template>
  <div id="wangEditor2">
    <!-- 富文本菜单栏 -->
    <div class="editor2" id="editor2" ref="editor2"></div>
    <!-- 富文本编辑栏 -->
    <div class="editorBody2" id="editorBody2" ref="editorBody2"></div>
  </div>
</template>

<script>
import E from "wangeditor";
var editor2;
export default {
  name: "wang2",
  methods: {
    opened() {
      editor2 = new E("#editor2", "#editorBody2");
      //wang富文本配置
      editor2.create(); //以上配置完成之后调用其create()方法进行创建
      // editor2.txt.html("<em>请在这里输入</em>"); //编辑区域初始内容
      window.console.log(this.$parent.$parent.model.answer_analyze);
      if (this.$parent.$parent.model.title == "") {
        editor2.txt.html("<em>请在这里输入</em>") //编辑区域初始内容
      } else {
        editor2.txt.html(this.$parent.$parent.model.answer_analyze);
      }
    },
    getData() {
      return editor2.txt.html();
    }
  },
  mounted() {
    this.opened();
  }
};
</script>

<style>
.editorBody2 .w-e-text {
  overflow: hidden;
}
</style>