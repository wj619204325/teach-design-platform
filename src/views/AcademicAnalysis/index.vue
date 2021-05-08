<style lang="scss">
.analysis-wrap {
  height: 100%;
  width: 100%;
  .top-half {
    border-bottom: 1px solid #c2c5cb;
    height: 40%;
  }
  .bottom-half {
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
  <div class="analysis-wrap">
    <!-- 范例区 -->
    <div class="half-part top-half">
      <div class="example-content">
        <p>学情分析包括整体学习情况和已有知识和经验。</p>
        <p>（1）整体学习情况包括参与本次课程的学生学习情况，班级整体学习氛围，学生课堂表现，学习者特点以及课程实施过程中潜在的问题等。</p>
        <p>（2）已有的知识和经验：在开始课程时学生已具备哪些先验知识和学习经验，哪些知识经验不足，需要教师特别注意。</p>
      </div>
    </div>
    <!-- 编辑区 -->
    <div class="half-part bottom-half">
      <!-- 教师编辑区 -->
      <div class="editor-container">
        <vue-ueditor-wrap v-model="Content"
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
import { UpdateModule } from '@/api'
import { saveContentToLocal, getContentFromLocal } from 'views/HtmlToWord.js'
export default {
  components: {
    VueUeditorWrap
  },
  data () {
    return {
      exampleDialogVisiable: false,
      name: 'Academic_Analysis',
      Content: getContentFromLocal('Academic_Analysis'),
      observerDebounceTime: 1000,
      config: config
    }
  },
  watch: {
    Content (newVal, oldVal) {
      this.$store.commit('SAVED')
      saveContentToLocal(this.name, newVal)
      let id = localStorage.getItem('file_id')
      UpdateModule({
        id,
        module: this.name,
        value: newVal
      }).then(() => {
        this.$store.commit('SAVED')
      }).catch(err => {
        console.log(err)
        this.$store.commit('SAVED')
      })
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

