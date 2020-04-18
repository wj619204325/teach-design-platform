<style lang="scss">
.template-tabs-container {
  margin-top: 50px;
  .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
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
</style>
<template>
  <div class="template-tabs-container">
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="我的教案"
                   name="first">
        <div class="template-item-wrap"
             @click="handleCommand(designFileList,$event)">
          <template-item v-for="(file,index) in designFileList"
                         :key="file.id"
                         :index="index"
                         :fileId="file.id"
                         :fileName="file.name"></template-item>
        </div>
      </el-tab-pane>
      <el-tab-pane label="模板"
                   name="second">
        <div class="template-item-wrap"
             @click="handleCommand(templateFileList,$event)">
          <template-item v-for="(file,index) in templateFileList"
                         :key="file.id"
                         :fileId="file.id"
                         :index="index"
                         :fileName="file.name"></template-item>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏"
                   name="third">
        <div class="template-item-wrap"
             @click="handleCommand(collectFileList,$event)">
          <template-item v-for="(file,index) in collectFileList"
                         :key="file.id"
                         :index="index"
                         :fileId="file.id"
                         :fileName="file.name"></template-item>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="文件名"
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
                   :disabled="changeName===initChangeName||changeName"
                   :loading="renameBtnLoading"
                   @click="handleRename">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import TemplateItem from './component/TemplateItem.vue'
import { GetFile, RenameFile, DownloadFile, ShareFile } from '@/api'
export default {
  components: {
    TemplateItem
  },
  data () {
    return {
      designFileList: Array.from({ length: 5 }).map((item, index) => {
        return {
          id: 'file_id_' + index,
          name: 'file_name' + index,
        }
      }),
      templateFileList: Array.from({ length: 5 }).map((item, index) => {
        return {
          id: 'file_id_' + index,
          name: 'file_name' + index,
        }
      }),
      collectFileList: Array.from({ length: 5 }).map((item, index) => {
        return {
          id: 'file_id_' + index,
          name: 'file_name' + index,
        }
      }),
      activeName: 'first',
      renameDialogVisible: false,
      initChangeName: '',
      changeName: '',
      renameBtnLoading: false,
      curList: null,
      curId: '',
      curIndex: ''
    };
  },
  watch: {
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event);
    },
    open: function (id) {
      const loading = this.$loading({})
      GetFile(id)
        .then(data => {
          const { id, name, content } = data
          localStorage.setItem('file_id', id)
          localStorage.setItem('file_name', name)
          localStorage.setItem('edit_content', JSON.stringify(content))
          this.$router.push({
            name: 'CourseBrief'
          })
            .then(() => {
              loading.close()
            })
        })
        .catch(() => {
          loading.close()
        })
    },
    share: function (id) {
      console.log("share:", id)
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
      console.log(ev)
      ev.currentTarget.select()
    },
    handleRename: function () {
      this.renameBtnLoading = true
      let name = this.changeName
      let index = this.curIndex
      let id = this.curId
      // RenameFile({ id, name })
      Promise.resolve({ id, name })
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
      console.log("download:", id)
    },
    handleCommand: function (list, ev) {
      console.log("ev", ev)
      let { id, index } = ev.target.dataset
      let title = ev.target.title
      switch (title) {
        case '打开':
          this.open(id);
          break;
        case '分享':
          this.share(id);
          break;
        case '重命名':
          this.rename(id, list, index)
          break;
        case '下载':
          this.download(id)
          break;
      }
    }
  }


}
</script>