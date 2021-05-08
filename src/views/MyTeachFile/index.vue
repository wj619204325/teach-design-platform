<style lang="scss">
.template-tabs-container {
  margin-top: 50px;
  height: 100%;
  background-color: #ffffff;
  .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
    background-color: #e9e9e9;
    .el-tabs__nav .is-top {
      background-color: #ffffff;
    }
  }
  .template-item-wrap {
    width: 88%;
    margin: 0 auto;
    padding-top: 30px;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
  }
}
.create-tip {
  width: 400px;
  margin: 40px auto;
  background-color: rgb(248, 249, 250);
  .el-card__body {
    padding: 30px;
  }
  .create-tip-container {
    .create-tip-text {
      display: inline-block;
      margin-left: 18px;
      h3 {
        margin: 10px 0;
      }
      p {
        margin: 0;
      }
    }
  }
  .el-button {
    margin-top: 12px;
    display: block;
    width: 100%;
  }
}
</style>
<template>
  <div style="overflow:hidden;background-color:#e9e9e9;">
    <div class="template-tabs-container">
      <el-tabs value="collect"
               type="card"
               @tab-click="handleClick">
        <el-tab-pane label="收藏"
                     name="collect">
          <div class="template-item-wrap"
               @click="handleCommand(collectFileList,$event)">
            <template-item v-for="(file,index) in collectFileList"
                           :key="file.id"
                           :index="index"
                           :imgUrl="IMG_DATA[index%4]"
                           :fileId="file.id"
                           :fileName="file.name"></template-item>
          </div>
          <el-card shadow="always"
                   class="create-tip"
                   v-if="collectFileList.length===0">
            <div class="create-tip-container">
              <span>
                <svg t="1587783622518"
                     class="icon"
                     viewBox="0 0 1024 1024"
                     version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     p-id="8109"
                     data-spm-anchor-id="a313x.7781069.0.i19"
                     width="60"
                     height="60">
                  <path d="M767.789762 988.960307a70.920339 70.920339 0 0 1-32.516836-8.970162l-224.254037-116.051464-224.254038 116.051464a66.154941 66.154941 0 0 1-72.04161-5.326033 75.125103 75.125103 0 0 1-28.031755-71.480975l46.252396-250.32357-174.91815-171.834656a80.451136 80.451136 0 0 1-19.061593-74.844785 69.238434 69.238434 0 0 1 56.06351-50.176841l245.838488-46.532713 109.604161-232.383247a70.079387 70.079387 0 0 1 62.230496-41.206679 67.556529 67.556529 0 0 1 61.66986 41.206679l110.164796 232.383247 245.558172 44.57049a67.276211 67.276211 0 0 1 56.063509 50.176841 74.844785 74.844785 0 0 1-17.09937 75.125103l-176.880373 173.516561 44.57049 250.32357a73.723515 73.723515 0 0 1-28.031754 71.480975 58.30605 58.30605 0 0 1-39.524774 14.296195z"
                        fill="#F56C6C"
                        p-id="8110"
                        data-spm-anchor-id="a313x.7781069.0.i17"
                        class="selected"></path>
                  <path d="M770.31262 1024h-3.644128a107.922256 107.922256 0 0 1-48.214618-13.174925l-206.594033-107.641938-208.836572 107.922256a101.194635 101.194635 0 0 1-109.604161-8.409527 112.127019 112.127019 0 0 1-40.646045-105.399397l42.888585-233.2242L32.236518 505.412538a115.771147 115.771147 0 0 1-28.031755-108.763209 104.558445 104.558445 0 0 1 84.095264-76.246373l226.776896-42.888584 102.315905-216.405147a105.960033 105.960033 0 0 1 93.065425-61.109225 103.437175 103.437175 0 0 1 94.747331 62.230495l101.75527 215.283877 227.898166 41.206679a101.75527 101.75527 0 0 1 84.095264 75.966055 108.482891 108.482891 0 0 1-25.789214 107.922256l-165.107036 161.462907 41.486997 232.102929a108.482891 108.482891 0 0 1-40.646044 105.399398 92.504791 92.504791 0 0 1-57.745415 21.584451zM768.070079 953.920613a24.107309 24.107309 0 0 0 16.258418-5.886668 39.805092 39.805092 0 0 0 15.697783-38.683822l-47.934301-268.54421 190.055297-186.691487a38.403504 38.403504 0 0 0 8.409527-38.964139 32.797153 32.797153 0 0 0-28.031755-26.349849l-264.339447-47.934301-117.453052-248.921982a33.638106 33.638106 0 0 0-30.554613-21.023816 35.039693 35.039693 0 0 0-29.993978 20.463181l-117.733369 249.2023-263.218177 49.896523a34.479058 34.479058 0 0 0-28.031755 24.948262 44.57049 44.57049 0 0 0 10.932384 41.767315l188.934027 183.607993-49.616206 268.824528a40.085409 40.085409 0 0 0 14.85683 37.562551 31.115248 31.115248 0 0 0 33.357788 2.24254l241.914044-125.021626 239.671503 124.460991a36.441281 36.441281 0 0 0 16.819052 5.045716z"
                        fill="#F56C6C"
                        p-id="8111"
                        data-spm-anchor-id="a313x.7781069.0.i18"
                        class="selected"></path>
                </svg>
              </span>
              <div class="create-tip-text">
                <h3>收藏夹</h3>
                <p>收藏优秀的教案，方便借鉴</p>
                <p>收藏夹空空如也，去广场看一看吧~</p>
              </div>
            </div>
            <el-button type="danger"
                       @click="goTeachPublic">前往教案广场</el-button>
          </el-card>
        </el-tab-pane>
      </el-tabs>
      <el-dialog title="重命名-文件名"
                 :visible.sync="renameDialogVisible"
                 width="30%">
        <el-input type="text"
                  v-model="changeName"
                  ref="renameInput"
                  @focus="focus($event)"
                  clearable>{{initChangeName}}</el-input>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="renameDialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     :disabled="changeName===initChangeName||changeName===''"
                     :loading="renameBtnLoading"
                     @click="handleRename">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog :title="`新建${fileType==='design'?'教案':'模板'}-文件名`"
                 :visible.sync="createNewFileDialog"
                 :show-close="false"
                 width="30%">
        <el-input type="text"
                  v-model="fileName"
                  clearable></el-input>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="cancelCreate">取 消</el-button>
          <el-button type="primary"
                     :disabled="fileName===''"
                     @click="createNewFile">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="分享到教案广场"
                 :visible.sync="shareFileDialog"
                 :show-close="false"
                 :close-on-click-modal="false"
                 width="30%">
        <el-input v-model="shareTitle"
                  placeholder="请输入分享的标题"
                  maxlength="10"
                  show-word-limit
                  clearable>
        </el-input>
        <el-input type="textarea"
                  placeholder="请输入分享的理由或对教案的简要说明"
                  v-model="shareDesc"
                  maxlength="200"
                  style="margin-top:30px;"
                  show-word-limit>
        </el-input>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="cancelShare">取 消</el-button>
          <el-button type="primary"
                     :disabled="!shareTitle || !shareDesc"
                     @click="share">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import TemplateItem from './component/TemplateItem.vue'
import { RenameFile, GetOneFile, ShareFile, GetFileList, CreateNewPost } from '@/api'
import { download_word, create_new_file, init_file } from '@/utils/index'
import { mapMutations } from 'vuex'
const IMG_1 = require('@/assets/myFile/blue.png')
const IMG_2 = require('@/assets/myFile/green.png')
const IMG_3 = require('@/assets/myFile/orange.png')
const IMG_4 = require('@/assets/myFile/purple.png')
export default {
  components: {
    TemplateItem
  },
  data () {
    return {
      designFileList: [],
      templateFileList: [],
      collectFileList: [],
      activeName: 'design',
      renameDialogVisible: false,
      initChangeName: '',
      changeName: '',
      renameBtnLoading: false,
      curList: null,
      curId: '',
      curIndex: '',
      fileName: '',
      fileType: '',
      IMG_DATA: [IMG_1, IMG_2, IMG_3, IMG_4],
      createNewFileDialog: false,
      shareFileDialog: false,
      shareTitle: '',
      shareDesc: ''
    };
  },
  watch: {
    '$route.query': function (newVal, oldVal) {
      this.activeName = newVal.tag || 'design'
    }
  },

  created () {
    this.init()
    let tag = this.$route.query['tag']
    if (tag) {
      this.activeName = tag
    }
  },
  methods: {
    ...mapMutations([
      'FILENAME',
      'FILETYPE'
    ]),
    handleClick (tab, event) {
      // console.log(tab, event);
    },
    init: function () {
      let username = localStorage.getItem('username')
      GetFileList(username).then(data => {
        data.forEach(file => {
          switch (file.type) {
            case 'design':
              this.designFileList.push(file)
              break;
            case 'template':
              this.templateFileList.push(file)
              break;
            case 'collect':
              this.collectFileList.push(file)
              break;
          }
        })
      })
    },
    open: function (id) {
      const loading = this.$loading({})
      GetOneFile(id)
        .then(data => {
          const { name, content, type } = data
          localStorage.setItem('file_id', id)
          this.FILENAME(name)
          this.FILETYPE(type)
          localStorage.setItem('content', JSON.stringify(content))
          this.$router.push({
            name: 'CourseBrief',
            query: {
              id
            }
          })
            .then(() => {
              loading.close()
            })
        })
        .catch(() => {
          loading.close()
        })
    },
    cancelShare: function () {
      this.shareFileDialog = false
      this.shareTitle = ''
      this.shareDesc = ''
    },
    share: function () {
      let username = localStorage.getItem('username')
      let id = this.curId
      CreateNewPost({
        fileId: id,
        author: username,
        title: this.shareTitle,
        description: this.shareDesc
      })
        .finally(() => {
          this.shareFileDialog = false
          this.shareTitle = ''
          this.shareDesc = ''
        })
    },
    rename: function (id, list, index) {
      this.curList = list
      this.curId = id
      this.curIndex = index
      this.initChangeName = list[index]["name"]
      this.changeName = this.initChangeName
      this.renameDialogVisible = true
      this.$nextTick(() => {
        this.$refs["renameInput"].select()
      })
    },
    focus: function (ev) {
      ev.currentTarget.select()
    },
    handleRename: function () {
      this.renameBtnLoading = true
      let name = this.changeName
      let index = this.curIndex
      let id = this.curId
      // Promise.resolve({ id, name })
      RenameFile({ id, name })
        .then(() => {
          this.initChangeName = ''
          this.changeName = ''
          this.$set(this.curList, index, { id, name })
          this.curList = null
          this.renameBtnLoading = false
          this.renameDialogVisible = false
        })
        .catch(() => {
          this.renameBtnLoading = false
          this.renameDialogVisible = false

        })
    },
    download: function (id) {
      GetOneFile(id)
        .then(data => {
          const { name, content, type } = data
          const { Teach_Hard_Env, Teach_Soft_Env } = content
          download_word(content, name, Teach_Hard_Env, Teach_Soft_Env)
        })
    },
    handleCommand: function (list, ev) {
      let { id, index } = ev.target.dataset
      let title = ev.target.title
      switch (title) {
        case '打开':
          this.open(id);
          break;
        case '分享':
          this.curId = id
          this.shareFileDialog = true
          break;
        case '重命名':
          this.rename(id, list, index)
          break;
        case '下载':
          this.download(id)
          break;
      }
    },
    cancelCreate: function () {
      this.createNewFileDialog = false
      this.fileName = ''
    },
    createNewDesign: function () {
      this.fileType = 'design'
      this.createNewFileDialog = true
    },
    createNewTemplate: function () {
      this.fileType = 'template'
      this.createNewFileDialog = true
    },
    createNewFile: function () {
      const loading = this.$loading({})
      let name = this.fileName,
        username = localStorage.getItem('username'),
        type = this.fileType
      const content = init_file()
      create_new_file({ name, type, username, content }).then((id) => {
        this.cancelCreate()
        this.$router.push({
          name: 'CourseBrief',
          query: {
            id
          }
        }).then(() => {
          loading.close()
        })

      })
    },
    goTeachPublic: function () {
      this.$router.push('/TeachPost')
    }
  },
  mounted () {
  },

}
</script>