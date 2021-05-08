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
      <el-tabs value="template"
               type="card"
               @tab-click="handleClick">
        <el-tab-pane label="模板"
                     name="template">
          <div class="template-item-wrap"
               @click="handleCommand(templateFileList,$event)">
            <template-item v-for="(file,index) in templateFileList"
                           :key="file.id"
                           :fileId="file.id"
                           :imgUrl="IMG_DATA[index%4]"
                           :index="index"
                           :fileName="file.name"></template-item>
          </div>
          <el-card shadow="always"
                   class="create-tip"
                   v-if="templateFileList.length===0">
            <div class="create-tip-container">
              <span>
                <svg t="1587783058096"
                     class="icon"
                     viewBox="0 0 1024 1024"
                     version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     p-id="7101"
                     id="mx_n_1587783058097"
                     width="60"
                     height="60">
                  <path d="M0 0m146.285714 0l731.428572 0q146.285714 0 146.285714 146.285714l0 731.428572q0 146.285714-146.285714 146.285714l-731.428572 0q-146.285714 0-146.285714-146.285714l0-731.428572q0-146.285714 146.285714-146.285714Z"
                        fill="#67C23A"
                        p-id="7102"
                        data-spm-anchor-id="a313x.7781069.0.i12"
                        class="selected"></path>
                  <path d="M475.428571 475.428571V219.428571a36.571429 36.571429 0 0 1 73.142858 0v256H804.571429a36.571429 36.571429 0 1 1 0 73.142858H548.571429V804.571429a36.571429 36.571429 0 1 1-73.142858 0V548.571429H219.428571a36.571429 36.571429 0 0 1 0-73.142858h256z"
                        fill="#FFFFFF"
                        p-id="7103"></path>
                </svg>
              </span>
              <div class="create-tip-text">
                <h3>新建模板</h3>
                <p>模板可以重复使用</p>
                <p>您还没有一个模板，去新建一个吧~</p>
              </div>
            </div>
            <el-button type="success"
                       @click="createNewTemplate">新建模板</el-button>
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