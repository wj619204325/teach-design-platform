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
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-key"
                            command="modifyPwd">修改密码</el-dropdown-item>
          <el-dropdown-item icon="el-icon-switch-button"
                            command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside width="50px"
                class="nav-outside">
        <el-menu default-active="/MyTeachFile"
                 background-color="transparent"
                 text-color="#9aaeba"
                 active-text-color="#9aaeba"
                 :collapse="true">
          <el-menu-item index="/MyTeachFile">
            <i class="el-icon-s-home"></i>
            <span slot="title">我的教案</span>
          </el-menu-item>
          <el-menu-item index="/design/CourseBrief">
            <i class="el-icon-magic-stick"></i>
            <span slot="title">设计</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">社交</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Logout } from '@/api'
export default {
  data () {
    let login_name = localStorage.getItem('username')
    return {
      username: login_name || '用户名'
    }
  },
  methods: {
    logout: function () {
      Logout().then(() => {
        localStorage.removeItem('username')
        this.$router.push('/login')
      })
    },
    handleCommand: function (command) {
      switch (command) {
        case 'logout':
          this.logout()
          break;
        case 'modifyPwd':
          this.$alert('该功能尚未完善，敬请期待！', '开发者提示', {
            confirmButtonText: '确定'
          })
          break
      }
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
      font-size: 18px;
      cursor: pointer;
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
