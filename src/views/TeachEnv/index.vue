<style lang="scss">
.teach-env-wrap {
  height: 100%;
  width: 100%;
  .half-part {
    width: 100%;
    height: 50%;
  }
  .top-half {
    border-bottom: 1px solid #c2c5cb;
  }
  .content {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    position: relative;
    .env {
      height: 40%;
      padding-top: 25px;
      .el-divider {
        margin: auto;
      }
      .env-intro-wrap {
        height: 100%;
        width: 100%;
        padding-top: 10px;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: space-evenly;
        align-items: center;
      }
    }
  }

  .intro-content {
    width: 150px;
    height: 70px;
    padding: 20px 24px;
    cursor: pointer;
    background-color: #409eff;
    color: #fff;
    border-radius: 10px;
    border: 1px solid #ebeef5;
  }
  .intro-content:hover {
    box-shadow: 3px 3px 10px #888888;
  }
  .env-check-wrap {
    padding-top: 30px;
    padding-left: 10%;
    .checkgroup-input {
      margin-top: 20px;
      div {
        display: inline-block;
      }
      input {
        border: none;
        border-bottom: 1px solid grey;
        border-radius: 0;
        font-size: 16px;
        transform: translate(10px, -10px);
      }
    }
  }
}
</style>
<template>
  <div class="teach-env-wrap">
    <!-- 范例区 -->
    <div class="half-part top-half">
      <div class="content">
        <div class="env">
          <el-divider content-position="left">硬件环境</el-divider>
          <div class="env-intro-wrap">
            <el-popover v-for="(item,index) in envType.hardware"
                        :key="index"
                        :ref="item.id"
                        placement="top"
                        title="环境介绍"
                        width="300"
                        trigger="hover"
                        :content="item.value">
              <div class="intro-content"
                   slot="reference">{{item.type}}</div>
            </el-popover>
          </div>
        </div>
        <div class="env">
          <el-divider content-position="left">软件环境</el-divider>
          <div class="env-intro-wrap">
            <el-popover v-for="(item,index) in envType.software"
                        :key="index"
                        :ref="item.id"
                        placement="top"
                        title="环境介绍"
                        width="300"
                        trigger="hover"
                        :content="item.value">
              <div class="intro-content"
                   slot="reference">{{item.type}}</div>
            </el-popover>
          </div>
        </div>

      </div>
    </div>
    <!-- 编辑区 -->
    <div class="half-part bottom-half">
      <!-- 教师编辑区 -->
      <div class="content">
        <div class="env">
          <el-divider content-position="left">硬件环境</el-divider>
          <div class="env-check-wrap">
            <el-checkbox :indeterminate="isIndeterminate1"
                         v-model="checkAllHard"
                         @change="checkAllHardChange">全选</el-checkbox>
            <div class="checkgroup-input">
              <el-checkbox-group v-model="checkedHardTypes"
                                 @change="checkedHardTypesChange">
                <el-checkbox v-for="type in hardTypes"
                             :label="type"
                             :key="type">{{type}}</el-checkbox>

              </el-checkbox-group>
              <el-input style="width:auto;"
                        v-show="isOtherHard"
                        v-model="otherHardType"
                        placeholder="请输入其他环境"></el-input>
            </div>
          </div>
        </div>
        <div class="env">
          <el-divider content-position="left">软件环境</el-divider>
          <div class="env-check-wrap">
            <el-checkbox :indeterminate="isIndeterminate2"
                         v-model="checkAllSoft"
                         @change="checkAllSoftChange">全选</el-checkbox>
            <div class="checkgroup-input">
              <el-checkbox-group v-model="checkedSoftTypes"
                                 @change="checkedSoftTypesChange">
                <el-checkbox v-for="type in softTypes"
                             :label="type"
                             :key="type">{{type}}</el-checkbox>

              </el-checkbox-group>
              <el-input style="width:auto;"
                        v-show="isOtherSoft"
                        v-model="otherSoftType"
                        placeholder="请输入其他环境"></el-input>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
import {
  set_localStorage_checkedEnv
} from 'views/HtmlToWord.js'
export default {
  data () {
    return {
      exampleDialogVisiable: false,
      envType: {
        hardware: [
          {
            id: '1',
            type: '视频会议系统',
            value: '可用于知识探究类课程，运用视频会议系统连线相关领域工作人员/专家，与专家进行面对面交谈，交流疑问，带给学生最真实的学习体验。'
          },
          {
            id: '2',
            type: '基础网络系统',
            value: '用于自主学习类课程，基础网略系统支撑学习者的线上学习，鼓励学习者自主学习与搜索，培养新时代下学习者的信息素。'
          },
          {
            id: '3',
            type: '智能交互系统',
            value: '用于各类课程，要求教室中装有智能交互系统，课上教师对学习者课堂作业进行及时展示与评价，多屏展示学生作业，进行对比学习，促进学习者合作能力与批判能力的发展。'
          }
        ],
        software: [
          {
            id: '4',
            type: '教学辅助应用软件',
            value: '运用问卷星等工具实现及时评价与分析，运用IBOOK等软件实现教材的立体化，动画版的学习资料增加学习者的学习兴趣与动机。'
          },
          {
            id: '5',
            type: '数据存储系统',
            value: '用于各类教学相关人员上传数据（学习、讨论、交流等），常见的有三通两平台、云课堂等，以实现校校通、人人通，存储学生、老师长传的学习、讨论、交流等各种资料。'
          },
          {
            id: '6',
            type: '学习资源系统',
            value: '常见的资源系统包括MOOC、百度学术、中学学科网，国家教育资源公共服务平台、教师培训中心等，网站或软件中包括课件、案例、试卷、电子文献等各种资料，实现优质资源的传播与共享。'
          }
        ]
      },
      checkAllHard: false,
      checkAllSoft: false,
      checkedHardTypes: [],
      checkedSoftTypes: [],
      hardTypes: ['视频会议系统', '基础网络系统', '智能交互系统', '其他'],
      softTypes: ['iBook', '问卷星', '几何画板', 'MOOC', '网络学习空间', '其他'],
      isIndeterminate1: true,
      isIndeterminate2: true,
      isOtherHard: false,
      otherHardType: '',
      isOtherSoft: false,
      otherSoftType: ''
    }
  },
  watch: {
    'checkedHardTypes': function (newVal, oldVal) {
      let clone = newVal.filter(item => item !== '其他')
      set_localStorage_checkedEnv('Teach_Hard_Env', clone)
    },
    'checkedSoftTypes': function (newVal, oldVal) {
      let clone = newVal.filter(item => item !== '其他')
      set_localStorage_checkedEnv('Teach_Soft_Env', clone)
    },
    'otherHardType': function (newVal, oldVal) {
      if (this.isOtherHard) {
        let cur_Env = this.checkedHardTypes.filter(item => item !== '其他')
        cur_Env.push(newVal)
        set_localStorage_checkedEnv('Teach_Hard_Env', cur_Env)
      }
    },
    'otherSoftType': function (newVal, oldVal) {
      if (this.isOtherSoft) {
        let cur_Env = this.checkedSoftTypes.filter(item => item !== '其他')
        cur_Env.push(newVal)
        set_localStorage_checkedEnv('Teach_Soft_Env', cur_Env)
      }
    },
    'isOtherHard': function (newVal, oldVal) {
      if (!newVal) {
        this.otherHardType = ''
      }
    },
    'isOtherSoft': function (newVal, oldVal) {
      if (!newVal) {
        this.otherSoftType = ''
      }
    }
  },
  methods: {
    checkAllHardChange (val) {
      if (val) {
        this.checkedHardTypes = this.hardTypes
        this.isOtherHard = true
      }
      else {
        this.checkedHardTypes = []
        this.isOtherHard = false
      }
      // 一旦点击“全选”框，则状态就确定了
      this.isIndeterminate1 = false;
    },
    checkedHardTypesChange (value) {
      let checkedCount = value.length;
      this.checkAllHard = checkedCount === this.hardTypes.length;
      //如果选择了其他，则显示输入框
      this.isOtherHard = this.checkedHardTypes.findIndex(item => item === '其他') !== -1
      //如果没有选完则“全选”框为不确定状态
      this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.hardTypes.length;
    },
    checkAllSoftChange (val) {
      if (val) {
        this.checkedSoftTypes = this.softTypes
        this.isOtherSoft = true
      }
      else {
        this.checkedSoftTypes = []
        this.isOtherSoft = false
      }
      // 一旦点击“全选”框，则状态就确定了
      this.isIndeterminate2 = false;
    },
    checkedSoftTypesChange (value) {
      let checkedCount = value.length;
      this.checkAllSoft = checkedCount === this.softTypes.length;
      this.isOtherSoft = this.checkedSoftTypes.findIndex(item => item === '其他') !== -1
      //如果没有选完则“全选”框为不确定状态
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.softTypes.length;
    }
  },
  mounted () {

  }
}
</script>

