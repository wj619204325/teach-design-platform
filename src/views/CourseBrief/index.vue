<style lang="scss" >
.brief-wrap {
  height: 100%;
  width: 100%;
  .top-half {
    border-bottom: 1px solid #c2c5cb;
    height: 35%;
    width: 100%;
    .example-content {
      padding-top: 20px;
      width: 40%;
      height: 100%;
      margin: 0 auto;
      position: relative;
      font-size: 18px;
      line-height: 1.5;
      .el-button {
        position: absolute;
        bottom: 20px;
        right: 10px;
      }
      p {
        text-indent: 2em;
        -webkit-margin-before: 0;
        margin-block-start: 0;
        -webkit-margin-after: 0;
        margin-block-end: 0;
      }
    }
  }
  .bottom-half {
    width: 100%;
    .editor-container {
      width: 96%;
      margin: 0 auto;
    }
  }

  .course-msg {
    .el-form-item {
      margin-bottom: 10px;
    }
  }
}
</style>
<template>
  <div class="brief-wrap">
    <!-- 范例区 -->
    <div class="top-half">
      <div class="example-content">
        <p>课程所依托的教材/平台/软件，课程的学习内容为，通过本单元课程学习者将产出什么成果，在课程中有哪些具体体现，单元课程中每节课程的重点。本单元课程完成后期望学习者达到的学习目标。</p>

        <el-button type="primary"
                   @click="exampleDialogVisiable=true">范例</el-button>
        <el-dialog title="范例"
                   :visible.sync="exampleDialogVisiable"
                   width="30%"
                   center>
          <p>本课程依托七年级下册美术课程，结合Mind+编程采用基于设计的STEM教学模型进行本次课程的设计和开发，项目主要围绕“智能可穿戴文化衫的设计与制作”。课程内容包含信息搜集、文化衫的文字图象色彩设计，Micro：bit智能硬件的综合使用、刻纸机的图案切割、镂印方法的学习、Mind+环境下智能硬件的编程等内容，内容涉及技术、工程、数学、艺术、编程等学科知识，目的在于通过基于设计的STEM+C课程的学习，期望学生在提高计算思维的同时提升美学素养。</p>
          <span slot="footer"
                class="dialog-footer">
            <el-button type="primary"
                       @click="exampleDialogVisiable = false">关 闭</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <!-- 编辑区 -->
    <div class="bottom-half">
      <!-- 课程信息 -->
      <!-- <div class="course-msg">
        <el-form :model="form"
                 inline-message
                 label-width="80px"
                 :inline="true">
          <el-row>
            <el-col :span="6"
                    :offset="4">
              <el-form-item label="课程名称"
                            prop="courseName">
                <el-input v-model="form.courseName"
                          clearable
                          size="small"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6"
                    :offset="2">
              <el-form-item label="科目"
                            prop="subject">
                <el-input v-model="form.subject"
                          clearable
                          size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6"
                    :offset="4">
              <el-form-item label="任课教师"
                            prop="teacherName">
                <el-input v-model="form.teacherName"
                          clearable
                          size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6"
                    :offset="2">
              <el-form-item label="年级"
                            prop="grade">
                <el-input v-model="form.grade"
                          clearable
                          size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div> -->
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
import {
  set_localStorage_editContent,
  get_localStorage_editContent
} from 'views/HtmlToWord.js'

export default {
  components: {
    VueUeditorWrap
  },
  data () {
    return {
      name: 'Course_Brief',
      editContent: get_localStorage_editContent('Course_Brief'),
      observerDebounceTime: 5000,
      exampleDialogVisiable: false,
      form: {
        teacherName: '',
        courseName: '',
        subject: '',
        grade: ''
      },
      rules: {
        teacherName: { required: true, message: '请填写任课老师', trigger: 'blur' },
        courseName: { required: true, message: '请填写课程名称', trigger: 'blur' },
        subject: { required: true, message: '请填写科目', trigger: 'blur' },
        grade: { required: true, message: '请填写年级', trigger: 'blur' },
      },
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

  }
}
</script>

