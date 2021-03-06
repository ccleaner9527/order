const path = require('path')
const resolve = dir => path.join(__dirname, '.', dir)

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    port: 9000,
    open: true,
    proxy: {
      '/api': {
        // 接口
        target: 'http://api.dispatch-32102.p.onecode.ict.cmcc',
        changeOrigin: true // 是否跨域
        // pathRewrite: {
        //   '^/api': '' //请求的时候使用这个api就可以
        // }
      }
    }
  },
  productionSourceMap: process.env.NODE_ENV !== 'production',
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons/svg'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('iview-loader')
      .loader('iview-loader')
      .options({
        prefix: true
      })

    const addLessResource = rule => {
      rule
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
          patterns: [resolve('src/themes/variables.less')]
        })
    }
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addLessResource(config.module.rule('less').oneOf(type)))

    // SplitChunksPlugin https://webpack.js.org/plugins/split-chunks-plugin/
    const splitOptions = config.optimization.get('splitChunks')
    config.optimization.splitChunks(
      Object.assign({}, splitOptions, {
        // （缺省值5）按需加载时的最大并行请求数
        maxAsyncRequests: 16,
        // （默认值3）入口点上的最大并行请求数
        maxInitialRequests: 16,
        // （默认值：1）分割前共享模块的最小块数
        minChunks: 1,
        // （默认值：30000）块的最小大小
        minSize: 30000,
        // webpack 将使用块的起源和名称来生成名称: `vendors~main.js`,如项目与"~"冲突，则可通过此值修改，Eg: '-'
        automaticNameDelimiter: '~',
        // cacheGroups is an object where keys are the cache group names.
        name: true,
        cacheGroups: {
          default: false,
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          },
          cesium: {
            name: 'chunk-cesium',
            test: /[\\/]node_modules[\\/]cesium[\\/]/,
            chunks: 'all',
            // 默认组的优先级为负数，以允许任何自定义缓存组具有更高的优先级（默认值为0）
            priority: -5
          },
          components: {
            name: 'chunk-components',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 0,
            reuseExistingChunk: true
          }
        }
      })
    )
  },
  configureWebpack: config => {
    const plugins = []
    return {
      plugins: plugins
    }
  },
  // 显示favicon图标
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  }
}
