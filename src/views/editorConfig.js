const publicPath = process.env.BASE_URL
export default {
  // 编辑器不自动被内容撑高
  autoHeightEnabled: false,
  // 初始容器高度
  initialFrameHeight: 240,
  // 初始容器宽度
  initialFrameWidth: '100%',
  // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
  serverUrl: 'http://35.201.165.105:8000/controller.php',
  // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
  UEDITOR_HOME_URL: `${publicPath}static/UEditor/`,
  // 是否自动保存
  // enableAutoSave: true,
  // 自动保存间隔时间，单位ms
  // saveInterval: 10000,
  // 工具栏按钮
  toolbars: [
    [
      'source',
      'undo', //撤销
      'redo', //重做
      'formatmatch', //格式刷
      'removeformat', //清除格式
      '|',
      'fontfamily', //字体
      'fontsize', //字号
      'forecolor', //字体颜色
      'backcolor', //背景色
      'bold', //加粗
      'italic', //斜体
      'underline', //下划线
      'strikethrough', //删除线
      'superscript', //上标
      'subscript', //下标
      'fontborder', //字符边框
      'touppercase', //字母大写
      'tolowercase', //字母小写
      '|',
      'spechars', //特殊字符
      'horizontal', //分隔线
      'blockquote', //引用
      'anchor', //锚点
      'link', //超链接
      'unlink', //取消链接
      'time', //时间
      'date', //日期
      'emotion', //表情
      'simpleupload', //单图上传
      'snapscreen', //截图
      'background', //背景
      'attachment', //附件
      'preview', //预览
    ],
    [
      'directionalityltr', //从左向右输入
      'directionalityrtl', //从右向左输入
      'pasteplain', //纯文本粘贴模式
      'cleardoc', //清空文档
      '|',
      'paragraph', //段落格式
      'insertcode', //代码语言
      'insertorderedlist', //有序列表
      'insertunorderedlist', //无序列表
      'indent', //首行缩进  
      'rowspacingtop', //段前距
      'rowspacingbottom', //段后距
      'lineheight', //行间距
      'justifyleft', //居左对齐
      'justifycenter', //居中对齐
      'justifyright', //居右对齐
      'justifyjustify', //两端对齐
      '|',
      'inserttable', //插入表格
      'insertparagraphbeforetable', //"表格前插入行"
      'mergeright', //右合并单元格
      'mergedown', //下合并单元格
      'splittorows', //拆分成行
      'splittocols', //拆分成列
      'splittocells', //完全拆分单元格
      'mergecells', //合并多个单元格
      '|',
      'fullscreen', //全屏
      'autotypeset', //自动排版
      'pagebreak', //分页
      'searchreplace', //查询替换
      'help', //帮助
    ]
  ]
}