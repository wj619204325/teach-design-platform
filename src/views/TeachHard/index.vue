<style lang="scss">
.teach-hard-wrap {
  height: 100%;
  width: 100%;
  p {
    font-size: 18px;
    line-height: 1.5;
    text-indent: 2em;
  }
  .half-part {
    width: 100%;
  }
  .top-half {
    border-bottom: 1px solid #c2c5cb;
    height: 35%;
    .example-content {
      width: 40%;
      height: 100%;
      margin: 0 auto;
      position: relative;
      .el-button {
        position: absolute;
        bottom: 20px;
        right: 10px;
      }
    }
  }
  .bottom-half {
    height: 65%;
    padding-top: 20px;
    .editor-container {
      height: 100%;
      width: 96%;
      margin: 0 auto;
    }
  }
}
</style>
<template>
  <div class="teach-hard-wrap">
    <!-- 范例区 -->
    <div class="half-part top-half">
      <div class="example-content">
        <p>课程重难点列举教学计划部分中需要重点强调的内容，包括知识内容的重难点和课程活动推进与管理的重难点。</p>
        <el-button type="primary"
                   @click="exampleDialogVisiable=true">范例</el-button>
        <el-dialog title="范例"
                   :visible.sync="exampleDialogVisiable"
                   width="50%"
                   center>
          <p>本课程教学重难点为：</p>
          <p>1、知识内容的重难点：</p>
          <p style="text-indent: 2em;">（1）知识内容的重点：学生利用美术基础，设计文化衫的外观；掌握数学中比例计算等相关知识；学会组合LED点阵屏、按钮、光线传感器、温度传感器、红外线遥控器和蓝牙等智能硬件；学会编写调试代码，实现Micro：bit智能硬件的功能，最后掌握拼装、组合等实际操作技能。</p>
          <p style="text-indent: 2em;">（2）知识内容的难点：学会组合LED点阵屏、按钮、光线传感器、温度传感器、红外线遥控器和蓝牙等智能硬件；学会编写调试代码，实现Micro：bit智能硬件的功能。</p>
          <p> 2、课程活动推进与管理的重难点：</p>
          <p style="text-indent: 2em;">（1）课程活动推进与管理的重点：在小组分工合作过程中注意合理组织和引导学生完成相应角色承担的任务。</p>
          <p style="text-indent: 2em;">（2）课程活动推进与管理的难点：在项目学习中合理协调分工，维持秩序等。</p>
          <span slot="footer"
                class="dialog-footer">
            <el-button type="primary"
                       @click="exampleDialogVisiable = false">关 闭</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <!-- 编辑区 -->
    <div class="half-part bottom-half">
      <!-- 教师编辑区 -->
      <div class="editor-container">
        <vue-ueditor-wrap v-model="editContent"
                          mode="observer"
                          :observerDebounceTime="observerDebounceTime"
                          :config="config"></vue-ueditor-wrap>
      </div>
    </div>

  </div>
</template>
<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import config from 'views/editorConfig.js'
import { set_localStorage_editContent, get_localStorage_editContent } from 'views/HtmlToWord.js'

export default {
  components: {
    VueUeditorWrap
  },
  data () {
    return {
      name: 'Teach_Hard',
      editContent: get_localStorage_editContent('Teach_Hard'),
      observerDebounceTime: 5000,
      exampleDialogVisiable: false,
      config: config
    }
  },
  watch: {
    editContent (newVal, oldVal) {
      set_localStorage_editContent(this.name, newVal)
      this.$message({
        message: '本地自动保存成功！',
        iconClass: 'el-icon-success',
        duration: 2000,
        customClass: 'message-class'
      })
    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>

