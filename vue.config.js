const path = require('path');

const resolve = (dir) => {
  return path.join(__dirname, dir)
}
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/teach-design-platform/' : '/',
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(CompressionPlugin, [{
        test: /\.js$|\.html$|\.css$/,
        algorithm: 'gzip',
        threshold: 100000, //对超过100000字节的文件进行压缩
        minRatio: 0.8,
        deleteOriginalAssets: false //是否删除原文件，不删除则原文件和.gz文件并存
      }])
    }
  },
  devServer: {
    hot: true,
    compress: true
  }
}