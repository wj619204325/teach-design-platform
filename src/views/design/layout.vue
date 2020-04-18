<template>
  <el-container>
    <!-- 菜单栏 -->
    <el-aside width="15%"
              class="nav-inside">
      <div class="search">
        <el-input placeholder="搜索"
                  size="small"
                  v-model="filterText">
          <i slot="prefix"
             class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <el-menu default-active="/CourseBrief"
               class="menu"
               router
               background-color="#E4E4E4">
        <el-menu-item index="/design/CourseBrief">
          <i class="el-icon-document"></i>
          <span slot="title">课程简介
          </span>
        </el-menu-item>
        <el-menu-item index="/design/AcademicAnalysis">
          <i class="el-icon-data-analysis"></i>
          <span slot="title">学情分析
          </span>
        </el-menu-item>
        <el-menu-item index="/design/TeachDemand">
          <i class="el-icon-s-flag"></i>
          <span slot="title">教学目标
          </span>
        </el-menu-item>
        <el-menu-item index="/design/TeachHard">
          <i class="el-icon-question"></i>
          <span slot="title">教学重难点
          </span>
        </el-menu-item>
        <el-menu-item index="/design/TeachEnv">
          <i class="el-icon-s-claim"></i>
          <span slot="title">教学环境
          </span>
        </el-menu-item>

        <el-submenu index="/design/TeachFlow">
          <template slot="title">
            <i class="el-icon-s-promotion"></i>
            <span>教学流程</span>
          </template>
          <el-menu-item index="/design/TeachFlow">PBL</el-menu-item>

        </el-submenu>

        <el-submenu index="/design/TeachEvaluate">
          <template slot="title">
            <i class="el-icon-edit-outline"></i>
            <span>教学评价</span>
          </template>
          <el-menu-item index="/design/TeachEvaluate">教师评价</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 工作区 -->
    <el-main>
      <el-container>
        <el-header height="auto"
                   class="tabsNav">
          <el-tabs v-model="activeName"
                   type="card"
                   closable>
            <el-tab-pane name="first">
              <span slot="label"><i class="el-icon-s-promotion"></i> 我的模型一</span></el-tab-pane>
          </el-tabs>
          <div class="tool-left">
            <el-button icon="el-icon-video-play"
                       @click="exportWord"
                       round
                       :loading="exportLoading"
                       :disabled="isExportDisable"
                       size="small">导出word</el-button>
            <el-button icon="el-icon-refresh"
                       @click="reset"
                       round
                       size="small">重置</el-button>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>
<script>
import { html_to_word } from 'views/HtmlToWord'
export default {
  name: 'Layout',
  data () {
    return {
      filterText: '',
      activeName: 'first',
      isExportDisable: false,
      exportLoading: false,
    }
  },
  watch: {
    filterText (val) {
    }
  },
  methods: {
    exportWord: function () {
      this.exportLoading = true
      let content = localStorage.getItem('edit_content')
      let json = JSON.parse(content)
      let Teach_Hard_Env = localStorage.getItem('Teach_Hard_Env')
      let Teach_Soft_Env = localStorage.getItem('Teach_Soft_Env')
      if (Teach_Hard_Env) {
        let value = '硬件环境：' + Teach_Hard_Env
        json['Teach_Env'] = json['Teach_Env'].replace('硬件环境：', value)
      }
      if (Teach_Soft_Env) {
        let value = '软件环境：' + Teach_Soft_Env
        json['Teach_Env'] = json['Teach_Env'].replace('软件环境：', value)
      }
      console.log('json:', json['Teach_Env'])
      let modes = [
        'Course_Brief',
        'Academic_Analysis',
        'Teach_Demand',
        'Teach_Hard',
        'Teach_Env',
        'Teach_Flow'
      ]
      let html = ''
      for (let item of modes) {
        html += json[item]
      }
      html_to_word(html)

      setTimeout(() => {
        this.exportLoading = false
      }, 1000)
    },
    reset: function () {
      this.$confirm('重置之后，将无法保留所有编辑，确定重置？', '提示')
        .then(() => {
          import('@/initEditData').then(module => {
            module.default.reset()
            window.location.reload()
          })
        })
    },

  },
}
</script>