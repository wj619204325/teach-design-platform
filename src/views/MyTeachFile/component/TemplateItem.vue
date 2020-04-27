<style lang="scss">
.template-item {
  margin: 10px 40px;
  width: 130px;
  cursor: pointer;
  transition: margin 0.2s;
  position: relative;
  &:hover {
    margin-top: -10px;
  }
  &:hover &-content {
    box-shadow: 0 6px 24px 0 rgba(31, 35, 41, 0.1);
  }
  &-content {
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #fff;
    margin: 0 auto;
    height: 170px;
    border: 1px solid #dee0e3;
    padding: 11px 11px 10px;
    border-radius: 4px;
    -webkit-box-shadow: 0 6px 12px 0 rgba(31, 35, 41, 0.04);
    box-shadow: 0 6px 12px 0 rgba(31, 35, 41, 0.04);
    --top-border-bg-color: #14c0ff;
    .hover-btn {
      width: 100%;
      height: 100%;
      background: rgba(13, 10, 49, 0.9);
      position: absolute;
      top: 0;
      left: 0;
      display: none;
      overflow: hidden;
      vertical-align: middle;
      border-radius: 5px;
      span {
        width: 100%;
        height: 25%;
        line-height: 35px;
        text-align: center;
        color: #fff;
        font-size: 22px;
        display: inline-block;
        cursor: pointer;
      }
      span:hover {
        background: #0d0a31;
        color: red;
      }
    }
    &:before {
      position: absolute;
      height: 3px;
      width: 100%;
      left: 0;
      top: 0;
      content: " ";
      background-color: var(--top-border-bg-color);
    }
    &:hover .hover-btn {
      display: block;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-filename {
    text-align: center;
    color: #646a73;
    font-size: 16px;
  }
}
</style>
<template>
  <div class="template-item">
    <div class="template-item-content">
      <img src="./filePage.png">
      <div class="hover-btn">
        <!-- <span v-for="(item,index) in btnTitleIcon"
              :title="item.title"
              :data-id="fileId"
              :class="item.icon"></span> -->
        <span title="打开"
              :data-id="fileId"
              :data-index="index"
              class="el-icon-folder-opened"></span>
        <span title="分享"
              :data-id="fileId"
              :data-index="index"
              class="el-icon-share">
        </span>
        <span title="重命名"
              :data-id="fileId"
              :data-index="index"
              class="el-icon-edit">
        </span>
        <span title="下载"
              :data-id="fileId"
              :data-index="index"
              class="el-icon-download">
        </span>
      </div>
    </div>
    <p class="template-item-filename">{{fileName}}</p>
  </div>
</template>
<script>
export default {
  name: 'TemplateItem',
  data () {
    return {

    }
  },
  props: {
    fileId: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    btnTitleIcon: {
      type: Array,
      default: () => [
        {
          title: '打开',
          icon: 'el-icon-folder-opened'
        },
        {
          title: '分享',
          icon: 'el-icon-share'
        },
        {
          title: '重命名',
          icon: 'el-icon-edit'
        },
        {
          title: '下载',
          icon: 'el-icon-download'
        },
      ]
    }
  },
  methods: {

  },
}
</script>

