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
  data() {
    return {};
  },
  methods: {
    opened() {
      editor = new E("#editor", "#editorBody");
      //wang富文本配置
      editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "video", // 插入视频
        "code", // 插入代码
        "undo", // 撤销
        "redo" // 重复
      ];
      // 文字颜色配置
      editor.customConfig.colors = [
        "#000000",
        "#eeece0",
        "#1c487f",
        "#4d80bf",
        "#c24f4a",
        "#8baa4a",
        "#7b5ba1",
        "#46acc8",
        "#f9963b",
        "#ffffff",
        "#ff00ff"
      ];
      editor.create(); //以上配置完成之后调用其create()方法进行创建
      editor.txt.html("<em>请在这里输入</em>"); //编辑区域初始内容
    }
  },
  mounted() {
    this.opened();
  }
};
</script>

<style>
</style>