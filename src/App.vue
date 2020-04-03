<template>
  <div id="app">
    <lay-out></lay-out>
  </div>
</template>

<script>
import LayOut from 'views/layout.vue'
export default {
  components: {
    LayOut
  }
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  // overflow: hidden;
}
html {
  height: 100%;
  body,
  #app {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    font-family: "宋体";
  }
}
</style>
