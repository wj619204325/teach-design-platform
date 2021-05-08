<style lang="scss">
.teach-hard-wrap {
  height: 100%;
  width: 100%;
  .half-part {
    width: 100%;
  }
  .top-half {
    border-bottom: 1px solid #c2c5cb;
    height: 20%;
    margin-top: 30px;
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
  .edui-editor-iframeholder.edui-default {
    height: 340px !important;
  }
}
</style>
<template>
  <div class="teach-hard-wrap">
    <!-- 范例区 -->
    <div class="half-part top-half">
      <div class="example-content">
        <p>课程重难点列举教学计划部分中需要重点强调的内容，包括知识内容的重难点和课程活动推进与管理的重难点。</p>
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
import { saveContentToLocal, getContentFromLocal } from 'views/HtmlToWord.js'
import { UpdateModule } from '@/api'
export default {
  components: {
    VueUeditorWrap
  },
  data () {
    return {
      name: 'Teach_Hard',
      Content: getContentFromLocal('Teach_Hard'),
      observerDebounceTime: 1000,
      exampleDialogVisiable: false,
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
        setTimeout(() => {
          this.$store.commit('SAVED')
        }, 500);
      }).catch(err => {
        console.log(err)
        setTimeout(() => {
          this.$store.commit('SAVED')
        }, 500);
      })
    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>

