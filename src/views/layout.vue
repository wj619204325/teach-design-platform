<template>
  <el-container class="wrap">
    <el-header class="fy_el-header"
               height="42px">
      <img src=".././assets/logo.png"
           alt="">
      <span class="logoFont">教学设计软件平台</span>
      <router-link class="navItem"
                   active-class="active"
                   to="/">工作流</router-link>
      <el-dropdown>
        <span class="el-dropdown-link">
          更多<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-s-tools">修改密码</el-dropdown-item>
          <el-dropdown-item icon="el-icon-warning">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside width="50px"
                class="nav-outside">
        <el-menu default-active="2"
                 background-color="transparent"
                 text-color="#9aaeba"
                 active-text-color="#9aaeba"
                 :collapse="true">
          <el-menu-item index="1">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-magic-stick"></i>
            <span slot="title">设计</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
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
              <el-menu-item index="/CourseBrief">
                <i class="el-icon-document"></i>
                <span slot="title">课程简介
                </span>
              </el-menu-item>
              <el-menu-item index="/AcademicAnalysis">
                <i class="el-icon-data-analysis"></i>
                <span slot="title">学情分析
                </span>
              </el-menu-item>
              <el-menu-item index="/TeachDemand">
                <i class="el-icon-s-flag"></i>
                <span slot="title">教学目标
                </span>
              </el-menu-item>
              <el-menu-item index="/TeachHard">
                <i class="el-icon-question"></i>
                <span slot="title">教学重难点
                </span>
              </el-menu-item>
              <el-menu-item index="/TeachEnv">
                <i class="el-icon-s-claim"></i>
                <span slot="title">教学环境
                </span>
              </el-menu-item>

              <el-submenu index="/TeachFlow">
                <template slot="title">
                  <i class="el-icon-s-promotion"></i>
                  <span>教学流程</span>
                </template>
                <el-menu-item index="/TeachFlow">PBL</el-menu-item>

              </el-submenu>

              <el-submenu index="/TeachEvaluate">
                <template slot="title">
                  <i class="el-icon-edit-outline"></i>
                  <span>教学评价</span>
                </template>
                <el-menu-item index="/TeachEvaluate">教师评价</el-menu-item>
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
                <keep-alive>
                  <router-view></router-view>
                </keep-alive>
              </el-main>
            </el-container>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { html_to_word } from './HtmlToWord'
export default {
  data () {
    return {
      filterText: '',
      activeName: 'first',
      isExportDisable: false,
      exportLoading: false
    }
  },
  watch: {
    filterText (val) {
    }
  },
  methods: {
    exportWord () {
      this.exportLoading = true
      let content = localStorage.getItem('edit_content')
      let json = JSON.parse(content)
      let Teach_Hard_Env = localStorage.getItem('Teach_Hard_Env')
      let Teach_Soft_Env = localStorage.getItem('Teach_Soft_Env')
      if (Teach_Hard_Env) {
        let value = '硬件环境：' + Teach_Hard_Env
        json['Teach_Env'].replace('硬件环境：', value)
      }
      if (Teach_Soft_Env) {
        let value = '软件环境：' + Teach_Soft_Env
        json['Teach_Env'].replace('软件环境：', value)
      }
      console.log('json:', json)
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
    reset () {
      this.$confirm('重置之后，将无法保留所有编辑，确定重置？', '提示')
        .then(() => {
          import('@/initEditData').then(module => {
            module.default.reset()
            window.location.reload()
          })
        })
    }
  }
};
</script>

<style lang="scss">
.wrap {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-main {
    padding: 0;
  }
  .fy_el-header {
    background: #212528;
    color: #fff;
    z-index: 1000;
    font-size: 14px;
    line-height: 50px;
    padding-left: 5px;
    img {
      height: 36px;
      position: relative;
      top: 4px;
    }
    span.logoFont {
      font-size: 16px;
      margin-left: 20px;
      position: relative;
      top: -9px;
      margin-right: 100px;
    }
    .navItem {
      color: #fff;
      display: inline-block;
      height: 42px;
      line-height: 42px;
      padding: 0 20px;
      position: relative;
      top: -10px;
      text-decoration: none;
      &.active {
        background: hsla(0, 0%, 100%, 0.2);
      }
    }
    .el-dropdown {
      float: right;
      height: 42px;
      .el-dropdown-link {
        color: #fff;
      }
    }
  }
  // 外部导航栏
  .nav-outside {
    background: #21232b;
    overflow-x: hidden;
    .el-menu--collapse {
      width: 50px;
      .el-menu-item {
        padding-left: 0 !important;
        padding: 0px !important;
        height: 48px;
        text-align: center;
        line-height: 48px;
        &:first-child {
          i {
            color: #fff !important;
          }
        }
        &.is-active {
          .el-tooltip {
            background: #121319;
            &::after {
              content: "";
              width: 3px;
              background: #00c1de;
              height: 48px;
              display: block;
              position: absolute;
              top: 0;
            }
          }
        }
        .el-tooltip {
          padding: 0 !important;
        }
      }
    }
  }
  //内部导航栏
  .nav-inside {
    background: #e4e4e4;
    .search {
      height: 40px;
      background-color: #f8f8f8;
      padding: 8px 12px;
      border-bottom: 1px solid #e5e5e5;
      .el-input {
        height: 24px;
        .el-input__inner {
          height: 24px;
        }
      }
      .el-input--small .el-input__icon {
        line-height: 24px;
      }
    }
    .el-menu {
      border-right: none;
      .el-menu-item:hover,
      .el-menu-item:active {
        background-color: #fff !important;
      }
    }
    .el-menu-item.is-active {
      background-color: #fff !important;
    }
  }
  .tabsNav {
    padding: 0;
    .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border-top: 3px solid #01c1de;
      border-radius: 0;
    }
    .el-tabs--card > .el-tabs__header {
      margin: 0;
    }
    .el-tabs__item.is-active {
      color: #333 !important;
    }
    .el-tabs__item {
      font-size: 12px;
    }
    .el-tabs__item:focus.is-active.is-focus:not(:active) {
      box-shadow: none !important;
    }
    .tool-left {
      float: left;
      width: 100%;
      border-bottom: 1px solid #e4e7ed;
      .el-button {
        &:first-child {
          margin-left: 10px;
        }
        border: none;
        margin-top: 8px;
      }
    }
  }
}
.el-dialog__wrapper {
  z-index: 99999 !important ;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.06);
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.12);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
