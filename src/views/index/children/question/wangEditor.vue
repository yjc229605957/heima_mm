<template>
  <div id="wangEditor">
    <!-- 富文本菜单栏 -->
    <div class="editor" id="editor" ref="editor"></div>
    <!-- 富文本编辑栏 -->
    <div class="editorBody" id="editorBody" ref="editorBody"></div>
  </div>
</template>

<script>
import E from "wangeditor";
var editor;
export default {
  name: "wang",
  methods: {
    opened() {
      editor = new E("#editor", "#editorBody");
      editor.customConfig.onchange = function(html) {
        // html 即编辑器中的内容
        window.console.log("onblur", html);
        // this.msg = html;
      };
      editor.create(); //以上配置完成之后调用其create()方法进行创建
      window.console.log(this.$parent.$parent.model.title);
      if (this.$parent.$parent.model.title == "") {
        editor.txt.html("<em>请在这里输入</em>"); //编辑区域初始内容
      } else {
        editor.txt.html(this.$parent.$parent.model.title);
      }
    },
    getData() {
      this.$parent.$parent.model.title = editor.txt.html();
    },
  },
  mounted() {
    this.opened();
  }
};
</script>

<style>
.editorBody .w-e-text {
  overflow: hidden;
}
</style>