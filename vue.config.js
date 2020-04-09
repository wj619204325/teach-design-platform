const path = require('path');

const resolve = (dir) => {
  return path.join(__dirname, dir)
}
const CompressionPlugin = require('compression-webpack-plugin')
const ParalleeUglifyPlugin = require('webpack-parallel-uglify-plugin')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/teach-design-platform/' : '/',
  lintOnSave: false,

  configureWebpack: {
    externals: {
      /**
       * 这里采用Object的形式
       * 更多的形式参考(https://webpack.js.org/configuration/externals/#src/components/Sidebar/Sidebar.jsx)
       * key: 指的是在import xxx from 'xxx'中 from后面的'xxx'
       * value: 指的是模块对外暴露的变量名，一般是固定的
       */
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'element-ui': 'ELEMENT'
    }
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('compressionPlugin')
        .use(CompressionPlugin, [{
          test: /\.js$|\.html$|\.css$/,
          algorithm: 'gzip',
          threshold: 100000, //对超过100000字节的文件进行压缩
          minRatio: 0.8,
          deleteOriginalAssets: false //是否删除原文件，不删除则原文件和.gz文件并存
        }])
    }
    config
      .plugin('ParalleeUglifyPlugin')
      .use(ParalleeUglifyPlugin, [{
        test: /\.js$/,
        cacheDir: '.cache/',
        //传递给UglifyJS的参数
        uglifyJS: {
          output: {
            //最紧凑的输出
            beautify: false,
            // 删除所有注释
            comments: false
          },
          compress: {
            // 删除所有的`console`语句
            drop_console: true,
            //内嵌已定义但是只用到一次的变量
            collapse_vars: true
          },
          // 在UglifyJS删除没有用到的代码时不输出警告
          warnings: false,
        }
      }])
    if (process.env.use_analyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        .end()
    }
  },

  devServer: {
    hot: true,
    compress: true
  },
  productionSourceMap: false,
}